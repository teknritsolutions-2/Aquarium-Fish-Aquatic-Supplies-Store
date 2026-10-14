import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {join,dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const walk=(dir)=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(dir,e.name)):[join(dir,e.name)]);
const html=walk(root).filter(f=>f.endsWith('.html')&&!f.includes('/dist/'));
const failures=[];
for(const file of html){
  const source=readFileSync(file,'utf8');
  if(!/<title>[^<]+<\/title>/.test(source))failures.push(`${file}: missing title`);
  if(file!==join(root,'index.html')&&!source.includes('data-page='))failures.push(`${file}: missing page renderer`);
  for(const match of source.matchAll(/(?:src|href)="([^"?#]+)"/g)){
    const ref=match[1];
    if(/^(https?:|#|mailto:|tel:)/.test(ref)||ref.endsWith('.html'))continue;
    const target=resolve(dirname(file),ref);
    if(!existsSync(target))failures.push(`${file}: broken local reference ${ref}`);
  }
}
const dataSource=readFileSync(join(root,'assets/js/catalog-data.js'),'utf8');
const context={window:{}};
new Function('window',dataSource)(context.window);
const data=context.window.BlueCurrentData;
if(data.fish.length<18)failures.push('Fish catalog has fewer than 18 records');
if(data.plants.length<12)failures.push('Plant catalog has fewer than 12 records');
if(data.equipment.length<12)failures.push('Equipment catalog has fewer than 12 records');
if(data.guides.length<6)failures.push('Guide catalog has fewer than 6 records');
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log(`Validated ${html.length} HTML files, ${data.fish.length} fish, ${data.plants.length} plants, ${data.equipment.length} equipment items and ${data.guides.length} guides.`);
