import { createHmac, createSign, randomBytes, timingSafeEqual } from 'node:crypto'

const DRIVE_SCOPE='https://www.googleapis.com/auth/drive'
const TOKEN_URL='https://oauth2.googleapis.com/token'
const DRIVE_API='https://www.googleapis.com/drive/v3'
const DRIVE_UPLOAD='https://www.googleapis.com/upload/drive/v3'
const FOLDER_MIME='application/vnd.google-apps.folder'
const LINK_PREFIX='BH-LINK:'
const APP_LINK_KEY='brambleheartLinkNonce'

function send(res,status,value){
  res.statusCode=status
  res.setHeader('Content-Type','application/json; charset=utf-8')
  res.setHeader('Cache-Control','no-store')
  res.end(JSON.stringify(value))
}
function b64url(value){return Buffer.from(value).toString('base64url')}
function serviceConfig(){
  const email=String(process.env.BH_DRIVE_SERVICE_ACCOUNT_EMAIL||'').trim()
  const privateKey=String(process.env.BH_DRIVE_SERVICE_ACCOUNT_PRIVATE_KEY||'').replace(/\\n/g,'\n').trim()
  const linkSecret=String(process.env.BH_DRIVE_LINK_SECRET||'').trim()
  return{email,privateKey,linkSecret,configured:Boolean(email&&privateKey&&linkSecret)}
}
function requireConfig(){
  const config=serviceConfig()
  if(!config.configured)throw new Error('Google Drive sync is not configured on this Brambleheart deployment. See the downloadable setup instructions in Settings → Character Data.')
  return config
}
function parseFolderId(input){
  const raw=String(input||'').trim()
  if(/^[A-Za-z0-9_-]{10,}$/.test(raw))return raw
  try{
    const url=new URL(raw)
    const folderMatch=url.pathname.match(/\/folders\/([A-Za-z0-9_-]+)/)
    if(folderMatch)return folderMatch[1]
    const id=url.searchParams.get('id')
    if(id&&/^[A-Za-z0-9_-]{10,}$/.test(id))return id
  }catch{}
  return''
}
function validLinkCode(code){return /^BH-[A-Z2-9]{24}$/.test(String(code||''))}
function folderHasCode(folder,code){
  const line=`${LINK_PREFIX}${code}`
  return String(folder.description||'').split(/\r?\n/).map(value=>value.trim()).includes(line)
}
function signLink(folderId,nonce,secret){
  const body=b64url(JSON.stringify({v:1,folderId,nonce,iat:Date.now()}))
  const signature=createHmac('sha256',secret).update(body).digest('base64url')
  return`${body}.${signature}`
}
function verifyLink(link,secret){
  const folderId=parseFolderId(link?.folderId)
  const token=String(link?.token||'')
  const [body,signature,...extra]=token.split('.')
  if(!folderId||!body||!signature||extra.length)throw new Error('The saved Drive link is invalid. Disconnect it and link the folder again.')
  const expected=createHmac('sha256',secret).update(body).digest()
  let actual
  try{actual=Buffer.from(signature,'base64url')}catch{throw new Error('The saved Drive link is invalid. Disconnect it and link the folder again.')}
  if(actual.length!==expected.length||!timingSafeEqual(actual,expected))throw new Error('The saved Drive link could not be verified. Disconnect it and link the folder again.')
  let payload
  try{payload=JSON.parse(Buffer.from(body,'base64url').toString('utf8'))}catch{throw new Error('The saved Drive link is invalid. Disconnect it and link the folder again.')}
  if(payload?.v!==1||payload.folderId!==folderId||typeof payload.nonce!=='string'||!/^[A-Za-z0-9_-]{24,64}$/.test(payload.nonce))throw new Error('The saved Drive link is invalid. Disconnect it and link the folder again.')
  return{folderId,nonce:payload.nonce}
}
async function requestJson(url,options={}){
  const response=await fetch(url,options)
  const text=await response.text()
  let value={}
  if(text){try{value=JSON.parse(text)}catch{value={message:text}}}
  if(!response.ok){
    const message=value?.error?.message||value?.error_description||value?.message||`HTTP ${response.status}`
    throw new Error(`Google Drive request failed: ${message}`)
  }
  return value
}
async function accessToken(config){
  const now=Math.floor(Date.now()/1000)
  const header=b64url(JSON.stringify({alg:'RS256',typ:'JWT'}))
  const claims=b64url(JSON.stringify({iss:config.email,scope:DRIVE_SCOPE,aud:TOKEN_URL,iat:now,exp:now+3600}))
  const unsigned=`${header}.${claims}`
  const signer=createSign('RSA-SHA256')
  signer.update(unsigned)
  signer.end()
  const assertion=`${unsigned}.${signer.sign(config.privateKey).toString('base64url')}`
  const body=new URLSearchParams({grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion})
  const token=await requestJson(TOKEN_URL,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body})
  if(!token.access_token)throw new Error('Google Drive did not return an access token for the configured service account.')
  return token.access_token
}
function authHeaders(token,extra={}){return{Authorization:`Bearer ${token}`,...extra}}
async function getFolder(folderId,token){
  const fields='id,name,mimeType,driveId,description,appProperties,capabilities(canAddChildren,canEdit)'
  return requestJson(`${DRIVE_API}/files/${encodeURIComponent(folderId)}?supportsAllDrives=true&fields=${encodeURIComponent(fields)}`,{headers:authHeaders(token)})
}
function validateSharedFolder(folder){
  if(folder.mimeType!==FOLDER_MIME)throw new Error('The supplied Google Drive link does not point to a folder.')
  if(!folder.driveId)throw new Error('This folder is in My Drive. Service-account two-way sync can only create files in a Google Workspace Shared Drive. Create the Brambleheart folder inside a Shared Drive and link that folder instead.')
  if(!folder.capabilities?.canEdit||!folder.capabilities?.canAddChildren)throw new Error('The Brambleheart service account does not have enough access to this Shared Drive folder. Share this exact folder directly with the service account using an edit-capable role that can add and edit files.')
}
function descriptionWithoutLinkCodes(description){
  const proofLine=/^BH-LINK:BH-[A-Z2-9]{24}$/
  return String(description||'').split(/\r?\n/).filter(line=>!proofLine.test(line.trim())).join('\n').trim()
}
async function establishFolderLink(folderId,folder,code,token){
  if(!folderHasCode(folder,code))throw new Error(`The Shared Drive folder description must contain this exact line before linking: ${LINK_PREFIX}${code}`)
  const existingNonce=String(folder.appProperties?.[APP_LINK_KEY]||'')
  const nonce=/^[A-Za-z0-9_-]{24,64}$/.test(existingNonce)?existingNonce:randomBytes(24).toString('base64url')
  const metadata={description:descriptionWithoutLinkCodes(folder.description),appProperties:{...(folder.appProperties||{}),[APP_LINK_KEY]:nonce}}
  await requestJson(`${DRIVE_API}/files/${encodeURIComponent(folderId)}?supportsAllDrives=true`,{method:'PATCH',headers:authHeaders(token,{'Content-Type':'application/json'}),body:JSON.stringify(metadata)})
  return nonce
}
async function validateLinkedFolder(link,config,token){
  const verified=verifyLink(link,config.linkSecret)
  const folder=await getFolder(verified.folderId,token)
  validateSharedFolder(folder)
  if(String(folder.appProperties?.[APP_LINK_KEY]||'')!==verified.nonce)throw new Error('This Drive folder link has been revoked or replaced. Disconnect it and link the folder again.')
  return{folderId:verified.folderId,folder}
}
async function listBhFiles(folderId,token){
  const files=[]
  let pageToken=''
  do{
    const query=`'${folderId.replace(/'/g,"\\'")}' in parents and trashed = false and name contains '_BH'`
    const params=new URLSearchParams({q:query,corpora:'user',includeItemsFromAllDrives:'true',supportsAllDrives:'true',pageSize:'1000',fields:'nextPageToken,files(id,name,mimeType,modifiedTime)'})
    if(pageToken)params.set('pageToken',pageToken)
    const result=await requestJson(`${DRIVE_API}/files?${params}`,{headers:authHeaders(token)})
    for(const file of result.files||[]){
      if(!/_BH\.json$/i.test(String(file.name||'')))continue
      files.push(file)
      if(files.length>250)throw new Error('The linked folder contains more than 250 _BH.json files. Split the character files into a smaller dedicated Brambleheart folder before syncing.')
    }
    pageToken=String(result.nextPageToken||'')
  }while(pageToken)
  return files
}
async function downloadJsonFile(fileId,token){
  const response=await fetch(`${DRIVE_API}/files/${encodeURIComponent(fileId)}?alt=media&supportsAllDrives=true`,{headers:authHeaders(token)})
  const text=await response.text()
  if(!response.ok)throw new Error(`Google Drive request failed while reading a character file (${response.status}).`)
  try{return JSON.parse(text)}catch{return null}
}
function validCharacterPayload(value){
  return Boolean(value&&typeof value==='object'&&value.format==='brambleheart-character'&&value.character&&typeof value.character==='object'&&typeof value.character.id==='string'&&value.character.id.trim()&&typeof value.character.name==='string'&&value.character.name.trim()&&value.character.attributes&&typeof value.character.attributes==='object')
}
async function indexedRemoteFiles(folderId,token){
  const files=await listBhFiles(folderId,token)
  const byId=new Map()
  const valid=[]
  const skipped=[]
  for(const file of files){
    const payload=await downloadJsonFile(file.id,token)
    if(!validCharacterPayload(payload)){skipped.push(file.name);continue}
    const id=payload.character.id.trim()
    if(byId.has(id))throw new Error(`The linked folder contains more than one _BH.json file for character ID ${id}. Remove the duplicate before syncing.`)
    const entry={file,payload}
    byId.set(id,entry)
    valid.push(entry)
  }
  return{byId,valid,skipped,totalFiles:files.length}
}
function safeCharacterFilename(name){
  const stem=String(name||'Character').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[<>:"/\\|?*\u0000-\u001F]/g,' ').replace(/\s+/g,'_').replace(/_+/g,'_').replace(/^[_\.]+|[_\.]+$/g,'').slice(0,90)||'Character'
  return`${stem}_BH.json`
}
async function updateFile(file,filename,content,token){
  let renamed=false
  if(file.name!==filename){
    await requestJson(`${DRIVE_API}/files/${encodeURIComponent(file.id)}?supportsAllDrives=true`,{method:'PATCH',headers:authHeaders(token,{'Content-Type':'application/json'}),body:JSON.stringify({name:filename})})
    renamed=true
  }
  const response=await fetch(`${DRIVE_UPLOAD}/files/${encodeURIComponent(file.id)}?uploadType=media&supportsAllDrives=true`,{method:'PATCH',headers:authHeaders(token,{'Content-Type':'application/json; charset=utf-8'}),body:content})
  if(!response.ok){const text=await response.text();throw new Error(`Google Drive request failed while updating ${filename}: ${text||response.status}`)}
  return renamed
}
async function createFile(folderId,filename,content,token){
  const boundary=`bh_${Date.now()}_${Math.random().toString(36).slice(2)}`
  const metadata=JSON.stringify({name:filename,mimeType:'application/json',parents:[folderId]})
  const body=`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${content}\r\n--${boundary}--`
  const response=await fetch(`${DRIVE_UPLOAD}/files?uploadType=multipart&supportsAllDrives=true`,{method:'POST',headers:authHeaders(token,{'Content-Type':`multipart/related; boundary=${boundary}`}),body})
  if(!response.ok){const text=await response.text();throw new Error(`Google Drive request failed while creating ${filename}: ${text||response.status}`)}
}
async function parseBody(req){
  if(req.body&&typeof req.body==='object')return req.body
  if(typeof req.body==='string'){try{return JSON.parse(req.body)}catch{return{}}}
  const chunks=[]
  for await(const chunk of req)chunks.push(Buffer.from(chunk))
  if(!chunks.length)return{}
  try{return JSON.parse(Buffer.concat(chunks).toString('utf8'))}catch{return{}}
}

export default async function handler(req,res){
  try{
    if(req.method==='GET'){
      const config=serviceConfig()
      return send(res,200,{configured:config.configured,serviceAccountEmail:config.email||''})
    }
    if(req.method!=='POST')return send(res,405,{error:'Method not allowed.'})
    const body=await parseBody(req)
    const action=String(body.action||'')
    const config=requireConfig()
    const token=await accessToken(config)

    if(action==='link'){
      const folderId=parseFolderId(body.folderUrl||body.folderId)
      const code=String(body.linkCode||'').trim()
      if(!folderId)throw new Error('Paste a valid Google Drive folder link.')
      if(!validLinkCode(code))throw new Error('Generate a valid Brambleheart folder link code before linking.')
      const folder=await getFolder(folderId,token)
      validateSharedFolder(folder)
      const nonce=await establishFolderLink(folderId,folder,code,token)
      return send(res,200,{folderId,folderName:folder.name,token:signLink(folderId,nonce,config.linkSecret),serviceAccountEmail:config.email})
    }

    if(action==='pull'){
      const linked=await validateLinkedFolder(body.link,config,token)
      const remote=await indexedRemoteFiles(linked.folderId,token)
      return send(res,200,{characters:remote.valid.map(entry=>entry.payload),skipped:remote.skipped,totalFiles:remote.totalFiles})
    }

    if(action==='push'){
      const linked=await validateLinkedFolder(body.link,config,token)
      const incoming=Array.isArray(body.characters)?body.characters:[]
      if(incoming.length>250)throw new Error('A single Drive upload is limited to 250 characters.')
      if(incoming.some(value=>!validCharacterPayload(value)))throw new Error('One or more local character records are not valid Brambleheart character exports.')
      const incomingIds=incoming.map(value=>value.character.id.trim())
      if(new Set(incomingIds).size!==incomingIds.length)throw new Error('Local character data contains duplicate internal character IDs. Resolve the duplicate records before uploading to Drive.')
      const remote=await indexedRemoteFiles(linked.folderId,token)
      let created=0,updated=0,renamed=0
      for(const payload of incoming){
        const id=payload.character.id.trim()
        const filename=safeCharacterFilename(payload.character.name)
        const content=JSON.stringify(payload,null,2)
        const existing=remote.byId.get(id)
        if(existing){if(await updateFile(existing.file,filename,content,token))renamed+=1;updated+=1}
        else{await createFile(linked.folderId,filename,content,token);created+=1}
      }
      return send(res,200,{created,updated,renamed,skipped:remote.skipped})
    }

    return send(res,400,{error:'Unknown Drive sync action.'})
  }catch(error){
    const message=error instanceof Error?error.message:'Google Drive sync failed.'
    return send(res,400,{error:message})
  }
}
