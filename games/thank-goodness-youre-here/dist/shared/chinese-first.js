// Display and search only. Catalogue identities and saved player text stay unchanged.
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function createChineseFirst(terms){
 const key=value=>value.normalize('NFKC').replace(/[’‘]/g,"'").toLowerCase();
 const entries=new Map(Object.entries(terms).map(([en,zh])=>[key(en),zh]));
 const quote=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const names=Object.keys(terms).filter(en=>en!==terms[en]).sort((a,b)=>b.length-a.length);
 const pattern=new RegExp('https?:\\/\\/[^\\s<>]+|\\b(?:cq[23]|dq3|alttl|tgyh|weapon|char|chapter|trial|enemy|skill|mission|step|artifact|source|puzzle|region)-[a-z0-9_.:-]+\\b|(?<![A-Za-z0-9])(?:'+names.map(en=>quote(en).replace(/[’‘']/g,"[’‘']")).join('|')+')(?![A-Za-z0-9])','giu');
 const plain=value=>String(value??'').replace(pattern,en=>entries.get(key(en))||en);
 const name=(original,zh=plain(original))=>zh===original?escape(zh):'<span class="cf-name"><span class="cf-zh" lang="zh-Hant">'+escape(zh)+'</span><small class="cf-original" lang="'+(/[\u3040-\u30ff]/u.test(original)?'ja':'en')+'">（'+escape(original)+'）</small></span>';
 function decorate(root){
  if(!root)return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];
  while(walker.nextNode()){const node=walker.currentNode;if(!node.parentElement.closest('script,style,input,textarea,pre,svg,.cf-name,.cf-original,.original-name,[data-preserve-original],a[target="_blank"]'))nodes.push(node);}
  const blocks=new WeakMap();
  for(const node of nodes){
   const text=node.nodeValue;
   if(node.parentElement.closest('option')){node.nodeValue=text.replace(pattern,en=>{const zh=entries.get(key(en));return zh&&zh!==en?zh+'（'+en+'）':en;});continue;}
   const block=node.parentElement.closest('p,li,label,h1,h2,h3,h4,summary,a,button')||node.parentElement;if(!blocks.has(block))blocks.set(block,new Set());const seen=blocks.get(block);
   const fragment=document.createDocumentFragment();let at=0,changed=false;
   for(const match of text.matchAll(pattern)){const en=match[0],zh=entries.get(key(en));if(!zh||zh===en)continue;fragment.append(document.createTextNode(text.slice(at,match.index)));const span=document.createElement('span');span.className='cf-name';const primary=document.createElement('span');primary.className='cf-zh';primary.lang='zh-Hant';primary.textContent=zh;span.append(primary);if(!seen.has(key(en))){const original=document.createElement('small');original.className='cf-original';original.lang=/[\u3040-\u30ff]/u.test(en)?'ja':'en';original.textContent='（'+en+'）';span.append(original);seen.add(key(en));}fragment.append(span);at=match.index+en.length;changed=true;}
   if(changed){fragment.append(document.createTextNode(text.slice(at)));node.replaceWith(fragment);}
  }
 }
 function notice(root){if(!root||root.querySelector('.cf-notice'))return;const p=document.createElement('p');p.className='cf-notice';p.textContent='中文優先，原文供遊戲與攻略對照；新增譯名為本站參考翻譯，未逐項核對官方中文，不改變原攻略的查證狀態。';const heading=root.querySelector('h1,h2');if(heading)heading.insertAdjacentElement('afterend',p);else root.prepend(p);}
 return {plain,name,decorate,notice,search:value=>String(value??'')+' '+plain(value)};
}

// Existing bilingual templates can keep their source data and interactive nodes.
export function prioritizeBilingual(root){
 if(!root)return;
 const pair=(en,zh)=>{
  const span=document.createElement('span');span.className='cf-name';
  const primary=document.createElement('span');primary.className='cf-zh';primary.lang='zh-Hant';primary.textContent=zh;
  const original=document.createElement('small');original.className='cf-original';original.lang='en';original.textContent='（'+en+'）';span.append(primary,original);return span;
 };
 root.querySelectorAll('.dual,.bilingual-copy').forEach(box=>{const en=box.querySelector(':scope > [lang="en"]'),zh=box.querySelector(':scope > [lang="zh-Hant"]');if(en&&zh){box.prepend(zh);zh.classList.add('cf-primary');en.classList.add('cf-original','cf-original-block');}});
 root.querySelectorAll('p').forEach(p=>{if(p.closest('.cf-name,.cf-original'))return;const nodes=[...p.childNodes];if(nodes.length===3&&nodes[0].nodeType===3&&nodes[1].nodeName==='BR'&&nodes[2].nodeType===3&&/[A-Za-z]/.test(nodes[0].textContent)&&!/[\u3400-\u9fff]/u.test(nodes[0].textContent)&&/[\u3400-\u9fff]/u.test(nodes[2].textContent)){const en=document.createElement('small');en.className='cf-original cf-original-block';en.lang='en';en.textContent=nodes[0].textContent;p.replaceChildren(document.createTextNode(nodes[2].textContent),en);}});
 root.querySelectorAll('h1>span,h2>span,h3>span').forEach(span=>{if(/[\u3400-\u9fff]/u.test(span.textContent)&&span.previousSibling?.nodeType===3&&/[A-Za-z]/.test(span.previousSibling.textContent))span.classList.add('zh-copy');});
 root.querySelectorAll('.zh-copy').forEach(zh=>{
  if(zh.closest('.cf-name,.dual,.bilingual-copy')||!/[\u3400-\u9fff]/u.test(zh.textContent))return;
  let previous=zh.previousSibling;while(previous&&(previous.nodeType===3&&!previous.textContent.trim()||previous.nodeName==='BR'))previous=previous.previousSibling;
  if(!previous)return;const text=previous.textContent.trim();if(!/[A-Za-z]/.test(text)||/[\u3400-\u9fff]/u.test(text))return;
  if(previous.nodeType===3){previous.replaceWith(pair(text,zh.textContent.trim()));zh.remove();}
  else if(/^(H[1-6]|P|B|STRONG|SPAN)$/.test(previous.nodeName)&&!previous.querySelector('button,input,select,a,img,svg,.cf-name')){previous.replaceChildren(pair(text,zh.textContent.trim()));zh.remove();}
 });
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode()){const node=walker.currentNode;if(!node.parentElement.closest('script,style,input,textarea,pre,svg,.cf-name,.cf-original,.original-name,[data-preserve-original],a[target="_blank"]'))nodes.push(node);}
 const localizedPair=text=>{const match=text.match(/^\s*([^\u3400-\u9fff\n]+?)\s*\/\s*([^\n]*[\u3400-\u9fff][^\n]*)$/u);if(!match||!/[A-Za-z]{2}/.test(match[1]))return;let zh=match[2].trim();const number=match[1].match(/^(\d+(?:[,./]\d+)*)\s+/);if(number&&!/\d/.test(zh)&&/^(項|筆|種|格)/u.test(zh))zh=number[1]+' '+zh;return [match[1].trim(),zh];};
 for(const node of nodes){const parts=localizedPair(node.nodeValue);if(!parts)continue;if(node.parentElement.closest('option'))node.nodeValue=parts[1]+'（'+parts[0]+'）';else node.replaceWith(pair(...parts));}
 root.querySelectorAll('[placeholder],[aria-label],[title]').forEach(el=>{if(el.closest('pre,textarea,[data-preserve-original]'))return;for(const attr of ['placeholder','aria-label','title']){const parts=localizedPair(el.getAttribute(attr)||'');if(parts)el.setAttribute(attr,parts[1]+'（'+parts[0]+'）');}});
}
