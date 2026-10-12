const rail=document.querySelector<HTMLElement>('[data-scroll-ruler]');
if(rail){
  const ticks=[...rail.querySelectorAll<HTMLElement>('[data-tick]')];
  const links=[...rail.querySelectorAll<HTMLAnchorElement>('[data-ruler-section]')];
  const indicator=rail.querySelector<HTMLElement>('[data-ruler-progress]')!;
  const percentage=rail.querySelector<HTMLElement>('[data-ruler-percent]')!;
  const thumb=rail.querySelector<HTMLElement>('[data-ruler-window]')!;
  const range=rail.querySelector<HTMLInputElement>('[data-ruler-range]')!;
  const toggle=rail.querySelector<HTMLButtonElement>('[data-ruler-toggle]')!;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let hover=false,focus=false,pinned=false,zoom=0,frame=0,last=0;
  function schedule(){if(!frame)frame=requestAnimationFrame(paint);}
  function paint(time:number){
    frame=0;const dt=Math.min(.05,(time-last)/1000||.016);last=time;
    const expanded=hover||focus||pinned;const target=expanded?1:0;
    zoom=reduced.matches?target:zoom+(target-zoom)*(1-Math.exp(-12*dt));
    if(Math.abs(target-zoom)<.001)zoom=target;
    rail!.classList.toggle('is-expanded',expanded);toggle.setAttribute('aria-expanded',String(expanded));
    const h=rail!.clientHeight,doc=document.documentElement.scrollHeight,max=Math.max(1,doc-innerHeight),y=scrollY,progress=Math.max(0,Math.min(1,y/max)),top=24,span=h-48;
    rail!.style.setProperty('--ruler-zoom',String(zoom));
    ticks.forEach((tick,index)=>{const reading=top+index/100*doc-y;const overview=top+index/100*span;tick.style.transform=`translateY(${reading+(overview-reading)*zoom}px)`;});
    links.forEach(link=>{const el=document.getElementById(link.dataset.rulerSection!);if(!el)return;const docY=el.getBoundingClientRect().top+y;const reading=top+docY-y;const overview=top+Math.min(1,docY/doc)*span;link.style.transform=`translateY(${reading+(overview-reading)*zoom}px) rotate(${-90*(1-zoom)}deg)`;});
    indicator.style.transform=`translateY(${top+progress*span}px)`;
    percentage.textContent=`${String(Math.round(progress*100)).padStart(3,'0')}%`;
    range.value=String(progress*100);
    thumb.style.top=`${top+y/doc*span}px`;thumb.style.height=`${h/doc*span}px`;thumb.style.opacity=String(zoom);
    if(zoom!==target)schedule();
  }
  rail.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hover=true;schedule();}});
  rail.addEventListener('pointerleave',()=>{hover=false;schedule();});
  rail.addEventListener('focusin',()=>{focus=true;schedule();});
  rail.addEventListener('focusout',e=>{if(!rail.contains(e.relatedTarget as Node)){focus=false;schedule();}});
  toggle.addEventListener('click',()=>{pinned=!pinned;focus=false;schedule();});
  rail.addEventListener('keydown',e=>{if(e.key==='Escape'){pinned=false;focus=false;hover=false;(document.activeElement as HTMLElement)?.blur();schedule();}});
  links.forEach(link=>link.addEventListener('click',()=>{pinned=false;schedule();}));
  range.addEventListener('input',()=>window.scrollTo({top:Number(range.value)/100*(document.documentElement.scrollHeight-innerHeight),behavior:'instant'}));
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});
  const resize=new ResizeObserver(schedule);resize.observe(document.body);schedule();
}
