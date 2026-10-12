const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const wide = matchMedia('(min-width: 900px)');
const body = document.body;
const hero = document.querySelector<HTMLElement>('.hero');
const sculpture = document.querySelector<HTMLElement>('.sculpture');
const image = document.querySelector<HTMLElement>('.hero-image img');
const heading = document.querySelector<HTMLElement>('h1');
const gallery = document.querySelector<HTMLElement>('.project-grid');
const projectSection = document.querySelector<HTMLElement>('.project-section');
const manifesto = document.querySelector<HTMLElement>('.manifesto h2');
if (manifesto) {
  const words = manifesto.textContent?.trim().split(/\s+/) || [];
  manifesto.replaceChildren(...words.map(word => {
    const span = document.createElement('span');
    span.textContent = `${word} `;
    span.className = 'motion-word';
    return span;
  }));
}
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  entry.target.classList.add('revealed');
  if (!reduced.matches) {
    const projects = entry.target.querySelectorAll<HTMLElement>('.project');
    projects.forEach((el, index) => el.animate([
      {clipPath:'inset(18% 0 82% 0)',transform:`translateY(${60 + index * 15}px)`},
      {clipPath:'inset(0 0 0 0)',transform:'translateY(0)'},
    ],{duration:1100,delay:index*140,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'}));
  }
  observer.unobserve(entry.target);
}),{threshold:.08});
document.querySelectorAll('.manifesto,.project-section,.services,.demo-contact').forEach(el => {
  el.classList.add('reveal'); observer.observe(el);
});
let pending = false;
const clamp = (n:number) => Math.max(0,Math.min(1,n));
function paint() {
  pending=false;
  if (reduced.matches) return;
  const heroProgress = hero ? clamp(-hero.getBoundingClientRect().top / hero.offsetHeight) : 0;
  if (sculpture) sculpture.style.transform = `rotate(${ -25 + heroProgress * 150 }deg) scale(${1 - heroProgress * .15})`;
  if (image) image.style.transform = `scale(${1.06 + heroProgress * .12}) translateY(${heroProgress * 5}%)`;
  if (heading) {
    const lines = heading.querySelectorAll<HTMLElement>('span');
    lines.forEach((line,index) => line.style.transform=`translateX(${(index ? 1 : -1)*heroProgress*(wide.matches?85:18)}px)`);
  }
  if(manifesto) {
    const progress = clamp((innerHeight*.85 - manifesto.getBoundingClientRect().top)/(innerHeight*.65));
    const words=manifesto.querySelectorAll<HTMLElement>('.motion-word');
    words.forEach((word,index)=>word.style.opacity=String(.18+.82*clamp(progress*words.length-index)));
  }
  if(gallery && projectSection && body.matches('.decorateur.variant-2') && wide.matches) {
    const progress=clamp(-projectSection.getBoundingClientRect().top/(projectSection.offsetHeight-innerHeight));
    gallery.style.transform=`translateX(${-progress*Math.max(0,gallery.scrollWidth-projectSection.clientWidth)}px)`;
  } else if(gallery) gallery.style.transform='';
}
function schedule(){if(!pending){pending=true;requestAnimationFrame(paint);}}
window.addEventListener('scroll',schedule,{passive:true});
window.addEventListener('resize',schedule,{passive:true});
reduced.addEventListener('change',()=>{
  if(reduced.matches){[sculpture,image,gallery,...(heading?.querySelectorAll<HTMLElement>('span')||[])].forEach(el=>el?.style.removeProperty('transform'));manifesto?.querySelectorAll<HTMLElement>('.motion-word').forEach(el=>el.style.opacity='1');}
  schedule();
});
paint();
const reports = document.querySelectorAll('.accord-report,.accord-chart');
if (reports.length) { const reportObserver = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-animated');reportObserver.unobserve(entry.target);}}),{threshold:.2}); reports.forEach(report=>reportObserver.observe(report)); }
const grainMaterials=document.querySelector('.grain-materials');
if(grainMaterials){const materialObserver=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){grainMaterials.classList.add('grain-visible');materialObserver.disconnect();}},{threshold:.15});materialObserver.observe(grainMaterials);}
