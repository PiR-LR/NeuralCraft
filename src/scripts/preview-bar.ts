import { inspirations } from '../data/inspirations';
const bar=document.querySelector<HTMLElement>('[data-preview-bar]');
if(bar){
  const site=bar.querySelector<HTMLSelectElement>('[data-preview-site]')!;
  const model=bar.querySelector<HTMLSelectElement>('[data-preview-direction]')!;
  const palette=bar.querySelector<HTMLSelectElement>('[data-preview-palette]')!;
  const back=bar.querySelector<HTMLAnchorElement>('[data-preview-back]')!;
  const current=inspirations.find(item=>item.id===site.value)!;
  const sync=(id:string|null)=>{palette.value=current.palettes.find(p=>p.id===id)?.id||current.palettes[0].id;back.href=`/inspirations/${site.value}?direction=${model.value}&palette=${palette.value}`;};
  sync(new URLSearchParams(location.search).get('palette'));
  const resize=new ResizeObserver(()=>document.documentElement.style.setProperty('--preview-height',`${bar.getBoundingClientRect().height}px`));resize.observe(bar);
  site.addEventListener('change',()=>{const next=inspirations.find(item=>item.id===site.value)!;if(parent!==window)window.top!.location.href=`/inspirations/${next.id}?direction=${next.directions[0].id}&palette=${next.palettes[0].id}`;else location.href=`/demos/${next.id}/${next.directions[0].id}?palette=${next.palettes[0].id}`;});
  model.addEventListener('change',()=>{if(parent!==window)window.top!.location.href=`/inspirations/${site.value}?direction=${model.value}&palette=${palette.value}`;else location.href=`/demos/${site.value}/${model.value}?palette=${palette.value}`;});
  palette.addEventListener('change',()=>{const url=new URL(location.href);url.searchParams.set('palette',palette.value);history.replaceState(null,'',url);window.postMessage({type:'neuralcraft:palette',palette:palette.value},location.origin);sync(palette.value);if(parent!==window)parent.postMessage({type:'neuralcraft:selection',metier:site.value,direction:model.value,palette:palette.value},location.origin);});
  window.addEventListener('message',event=>{if(event.origin===location.origin&&event.source===parent&&event.data?.type==='neuralcraft:palette')sync(event.data.palette);});
}
