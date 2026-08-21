import http from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, resolve } from 'node:path'
const root=resolve(import.meta.dirname), port=Number(process.env.PORT||4173)
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json'}
http.createServer(async(req,res)=>{try{let path=decodeURIComponent((req.url||'/').split('?')[0]); let file=join(root,path==='/'?'index.html':path); try{if(!(await stat(file)).isFile()) throw 0}catch{file=join(root,'index.html')} const data=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data)}catch{res.writeHead(500);res.end('Server error')}}).listen(port,'127.0.0.1',()=>console.log(`Bramble Heart v0.1 at http://127.0.0.1:${port}`))
