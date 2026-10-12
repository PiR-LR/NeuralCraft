function initConfigurator() {
  const root = document.querySelector<HTMLElement>('[data-configurator]');
  if (!root || root.dataset.ready) return;
  root.dataset.ready = 'true';
  const directions: {id:string;label:string}[] = JSON.parse(root.dataset.directions!);
  const palettes: {id:string;label:string}[] = JSON.parse(root.dataset.palettes!);
  const frame = root.querySelector<HTMLIFrameElement>('[data-preview]')!;
  const holder = root.querySelector<HTMLElement>('[data-preview-holder]')!;
  const full = root.querySelector<HTMLAnchorElement>('[data-full-demo]')!;
  const status = root.querySelector<HTMLElement>('[data-status]')!;
  const label = root.querySelector<HTMLElement>('[data-preview-label]')!;
  const contact = root.querySelector<HTMLButtonElement>('[data-inspiration-contact]')!;
  const abort = new AbortController();
  const options = {signal:abort.signal};
  let direction = directions[0].id, palette = palettes[0].id, viewport = 'desktop';
  function update(reload = false, writeURL = true) {
    const url = `/demos/${root!.dataset.metier}/${direction}?palette=${palette}`;
    if(reload) {holder.setAttribute('aria-busy','true'); frame.src=url;} else frame.contentWindow?.postMessage({type:'neuralcraft:palette',palette},location.origin);
    full.href = url;
    root!.querySelectorAll<HTMLButtonElement>('[data-direction]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.direction===direction)));
    root!.querySelectorAll<HTMLButtonElement>('[data-palette]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.palette===palette)));
    root!.querySelectorAll<HTMLButtonElement>('[data-viewport]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.viewport===viewport)));
    holder.classList.toggle('is-mobile',viewport==='mobile');
    const description = `${root!.dataset.brand} / ${directions.find(d=>d.id===direction)!.label} / ${palettes.find(p=>p.id===palette)!.label}`;
    label.textContent=description;
    contact.dataset.contactContext=`Inspiration : ${description}\n${location.origin}/inspirations/${root!.dataset.metier}?direction=${direction}&palette=${palette}`;
    if(writeURL){const next=new URL(location.href);next.searchParams.set('direction',direction);next.searchParams.set('palette',palette);history.replaceState(null,'',next);}
  }
  function fromURL(){const params=new URLSearchParams(location.search); direction=directions.find(d=>d.id===params.get('direction'))?.id||directions[0].id;palette=palettes.find(p=>p.id===params.get('palette'))?.id||palettes[0].id;update(true,false);}
  root.querySelectorAll<HTMLButtonElement>('[data-direction]').forEach(btn=>btn.addEventListener('click',()=>{direction=btn.dataset.direction!;update(true);status.textContent=`Ambiance ${directions.find(d=>d.id===direction)!.label} sélectionnée.`;},options));
  root.querySelectorAll<HTMLButtonElement>('[data-palette]').forEach(btn=>btn.addEventListener('click',()=>{palette=btn.dataset.palette!;update();status.textContent=`Palette ${palettes.find(p=>p.id===palette)!.label} appliquée.`;},options));
  root.querySelectorAll<HTMLButtonElement>('[data-viewport]').forEach(btn=>btn.addEventListener('click',()=>{viewport=btn.dataset.viewport!;update();},options));
  frame.addEventListener('load',()=>{holder.removeAttribute('aria-busy');frame.contentWindow?.postMessage({type:'neuralcraft:palette',palette},location.origin);},options);
  window.addEventListener('message',event=>{if(event.origin!==location.origin||event.source!==frame.contentWindow||event.data?.type!=='neuralcraft:selection')return;const next=palettes.find(p=>p.id===event.data.palette);if(next){palette=next.id;update();}},options);
  window.addEventListener('popstate',fromURL,options);
  document.addEventListener('astro:before-swap',()=>abort.abort(),{once:true});
  fromURL();
}
initConfigurator();
document.addEventListener('astro:page-load',initConfigurator);
