const header = document.querySelector<HTMLElement>('[data-demo-header]');
const dialog = document.querySelector<HTMLDialogElement>('[data-demo-menu]');
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-open]');
const progress = document.querySelector<HTMLElement>('[data-reading-progress]');
if(header && dialog && toggle) {
  toggle.addEventListener('click',()=>{dialog.showModal();toggle.setAttribute('aria-expanded','true');});
  const close = ()=>dialog.close();
  dialog.querySelector('[data-menu-close]')?.addEventListener('click',close);
  dialog.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));
  dialog.addEventListener('click',e=>{if(e.target===dialog){const rect=dialog.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)close();}});
  dialog.addEventListener('close',()=>toggle.setAttribute('aria-expanded','false'));
  const editorial = header.dataset.mode === 'editorial';
  let spacer: HTMLDivElement | null = null;
  if (editorial) {
    spacer = document.createElement('div');
    spacer.setAttribute('aria-hidden','true');
    spacer.style.height = header.getBoundingClientRect().height + 'px';
    header.before(spacer);
    header.classList.add('has-reserved-space');
  }
  let compact = false;
  let pending=false;
  function paint(){pending=false;if (scrollY > 90) compact = true; else if (scrollY < 20) compact = false; header!.classList.toggle('is-scrolled',compact); if(editorial) header!.style.setProperty('--masthead-top', Math.max(0, (document.querySelector('.concept-bar')?.getBoundingClientRect().bottom || 0))+'px');const range=document.documentElement.scrollHeight-innerHeight;progress?.style.setProperty('transform',`scaleX(${range>0?Math.min(1,Math.max(0,scrollY/range)):0})`);}
  const schedule=()=>{if(!pending){pending=true;requestAnimationFrame(paint);}};
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',()=>{if(spacer){header!.classList.remove('is-scrolled');spacer.style.height=header!.getBoundingClientRect().height+'px';header!.classList.toggle('is-scrolled',compact);}schedule();},{passive:true});paint();
  const links=header.querySelectorAll<HTMLAnchorElement>('[data-section-link]');
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(link=>{const active=link.dataset.sectionLink===entry.target.id;link.classList.toggle('is-active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}});
  },{rootMargin:'-10% 0px -55% 0px',threshold:0});
  links.forEach(link=>{const section=document.getElementById(link.dataset.sectionLink!);if(section)observer.observe(section);});
}
