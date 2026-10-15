const dictionary=window.SITE_EN;
const storageKey='life-chapters-language';
const textBindings=[],attributeBindings=[];
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
while(walker.nextNode()){
 const node=walker.currentNode;
 if(node.parentElement.closest('script,style'))continue;
 const key=node.nodeValue.trim();
 if(Object.hasOwn(dictionary,key))textBindings.push({node,zh:node.nodeValue,key});
}
for(const element of document.querySelectorAll('[aria-label],[alt],[title],meta[name="description"]')){
 for(const name of ['aria-label','alt','title','content']){
  const value=element.getAttribute(name);
  if(value&&Object.hasOwn(dictionary,value))attributeBindings.push({element,name,zh:value});
 }
}
let current='zh';
try{current=localStorage.getItem(storageKey)==='en'?'en':'zh';}catch{}
const shared=new URL(location.href).searchParams.get('lang');if(shared==='en'||shared==='zh')current=shared;
function t(value){return current==='en'?(dictionary[value]??value):value;}
function setLanguage(language){
 current=language==='en'?'en':'zh';
 document.documentElement.lang=current==='en'?'en':'zh-CN';
 for(const {node,zh,key} of textBindings){node.nodeValue=current==='en'?zh.replace(key,dictionary[key]):zh;}
 for(const {element,name,zh} of attributeBindings)element.setAttribute(name,t(zh));
 document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===current)));
 try{localStorage.setItem(storageKey,current);}catch{}
}
window.SiteI18n={t,setLanguage,get language(){return current;}};
setLanguage(current);
