import { cp, mkdir, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
const root=resolve(import.meta.dirname,'..'), dist=resolve(root,'dist')
await rm(dist,{recursive:true,force:true}); await mkdir(dist,{recursive:true})
for (const file of ['index.html','app.js','styles.css','data.js','rules-engine.js']) await cp(resolve(root,file),resolve(dist,file))
await cp(resolve(root,'assets'), resolve(dist,'assets'), { recursive:true })
await writeFile(resolve(dist,'404.html'), await (await import('node:fs/promises')).readFile(resolve(root,'index.html')))
console.log('Built static v0.01 into dist/')
