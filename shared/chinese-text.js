// Display-only glossary: never rewrites catalogue identities or saved progress.
export function createChineseText(glossary){
 const key=value=>value.normalize('NFKC').replace(/[’‘]/g,"'").toLocaleLowerCase();
 const terms=new Map(Object.entries(glossary.terms).map(([original,zh])=>[key(original),{original,zh}]));
 const escape=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const names=[...terms.values()].filter(row=>row.original!==row.zh).map(row=>row.original).sort((a,b)=>b.length-a.length);
 const pattern=new RegExp('https?:\\/\\/[^\\s<>]+|\\bcq[23]-[a-z0-9-]+\\b|(?<![A-Za-z0-9])(?:'+names.map(name=>escape(name).replace(/[’‘']/g,"[’‘']")).join('|')+')(?![A-Za-z0-9])','giu');
 const lookup=word=>terms.get(key(word));
 const plain=value=>String(value??'').replace(pattern,word=>lookup(word)?.zh||word);
 function decorate(root){
  if(!root)return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];
  while(walker.nextNode()){
   const node=walker.currentNode;
   if(!node.parentElement.closest('script,style,textarea,input,pre,.localized-name,[data-preserve-original]'))nodes.push(node);
  }
  const seenByBlock=new WeakMap();
  for(const node of nodes){
   const value=node.nodeValue;
   if(node.parentElement.closest('option')){node.nodeValue=value.replace(pattern,word=>{const row=lookup(word);return row&&row.zh!==word?row.zh+'（'+word+'）':word;});continue;}
   const block=node.parentElement.closest('p,li,label,h1,h2,h3,h4,summary,a,button')||node.parentElement;
   if(!seenByBlock.has(block))seenByBlock.set(block,new Set());
   const seen=seenByBlock.get(block),fragment=document.createDocumentFragment();let at=0,changed=false;
   for(const match of value.matchAll(pattern)){
    const row=lookup(match[0]);if(!row||row.zh===match[0])continue;
    fragment.append(document.createTextNode(value.slice(at,match.index)));
    const span=document.createElement('span');span.className='localized-name';span.dataset.translationStatus=glossary.officialNames?.[row.original]?'official':glossary.status;
    const zh=document.createElement('span');zh.className='name-zh';zh.lang='zh-Hant';zh.textContent=row.zh;span.append(zh);
    if(!seen.has(row.original)){
     const original=document.createElement('small');original.className='original-name';original.lang=/[\u3040-\u30ff]/u.test(match[0])?'ja':'en';original.textContent='（'+match[0]+'）';span.append(original);seen.add(row.original);
    }
    fragment.append(span);at=match.index+match[0].length;changed=true;
   }
   if(changed){fragment.append(document.createTextNode(value.slice(at)));node.replaceWith(fragment);}
  }
 }
 return {plain,decorate};
}
