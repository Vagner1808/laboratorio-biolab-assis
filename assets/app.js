'use strict';
const WA_NUMBER='5544999713688';
const WA_TEXT='Olá! Vim pelo site do Laboratório Biolab e gostaria de atendimento.';
const WA_URL=`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT)}`;
const ICONS={
  whatsapp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.7 7L4 20l1.5-4.3a8 8 0 1 1 14.5-4.2Z"/><path d="M9 8.5c.1 2.7 3.2 5.9 6.1 6.1l1.4-1.5-2.1-1-1 1c-1.3-.5-2.6-1.8-3.1-3.1l1-1-1-2.1L9 8.5Z"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>',
  beaker:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3h8M10 3v7L4.8 19a1.4 1.4 0 0 0 1.2 2h12a1.4 1.4 0 0 0 1.2-2L14 10V3M8 15h8"/></svg>',
  heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 8.5c0 4-8.5 10-8.5 10s-8.5-6-8.5-10a4.6 4.6 0 0 1 8.5-2.2 4.6 4.6 0 0 1 8.5 2.2Z"/></svg>',
  target:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
  vision:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3h4l2 5-2 2a15 15 0 0 0 5 5l2-2 5 2v4a2 2 0 0 1-2 2C10 21 3 14 3 5a2 2 0 0 1 2-2Z"/></svg>',
  clipboard:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="5" width="14" height="17" rx="2"/><rect x="9" y="2" width="6" height="5" rx="1"/><path d="M8 12h8m-8 4h6"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 2 8 4v6c0 5-3.5 8.2-8 10-4.5-1.8-8-5-8-10V6l8-4Z"/><path d="m8 12 3 3 5-6"/></svg>',
  clock:'<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5a11 11 0 1 1-10 15M15 5v11l6 4M3 11h8M1 16h8M4 21h7"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>'
};
function applyWhatsApp(){document.querySelectorAll('[data-whatsapp]').forEach(el=>{el.setAttribute('href',WA_URL);el.setAttribute('target','_blank');el.setAttribute('rel','noopener noreferrer')})}
function examCarousel(){
  const grid=document.getElementById('exam-grid');
  const controls=document.querySelector('.exam-dots');
  if(!grid||!controls)return;
  const cards=[...grid.querySelectorAll('.exam-card')];
  let pages=1;
  let visibleCards=1;
  let scheduled=false;
  let timer;
  function currentPage(){
    const max=grid.scrollWidth-grid.clientWidth;
    return max<=1?0:Math.min(pages-1,Math.round(grid.scrollLeft/max*(pages-1)));
  }
  function updateDots(){
    const active=currentPage();
    [...controls.children].forEach((dot,index)=>dot.setAttribute('aria-current',String(index===active)));
  }
  function showPage(index){
    const max=grid.scrollWidth-grid.clientWidth;
    const target=cards[index*visibleCards]?.offsetLeft-cards[0].offsetLeft||0;
    grid.scrollTo({left:index===pages-1?max:Math.min(target,max),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    [...controls.children].forEach((item,i)=>item.setAttribute('aria-current',String(i===index)));
  }
  function startTimer(){
    clearInterval(timer);
    timer=setInterval(()=>{
      if(!document.hidden&&pages>1)showPage((currentPage()+1)%pages);
    },8000);
  }
  function setupDots(){
    const width=cards[0]?.getBoundingClientRect().width||grid.clientWidth;
    const gap=parseFloat(getComputedStyle(grid).columnGap)||0;
    const visible=Math.max(1,Math.floor((grid.clientWidth+gap+2)/(width+gap)));
    const count=Math.max(1,Math.ceil(cards.length/visible));
    visibleCards=visible;
    if(count===pages&&controls.children.length===count){updateDots();return}
    pages=count;
    controls.replaceChildren();
    for(let index=0;index<count;index++){
      const dot=document.createElement('button');
      dot.type='button';
      dot.className='exam-dot';
      dot.setAttribute('aria-label',`Mostrar grupo de exames ${index+1} de ${count}`);
      dot.addEventListener('click',()=>{
        showPage(index);
        startTimer();
      });
      controls.append(dot);
    }
    updateDots();
  }
  grid.addEventListener('scroll',()=>{
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(()=>{updateDots();scheduled=false});
  },{passive:true});
  window.addEventListener('resize',setupDots);
  setupDots();
  startTimer();
}
function menu(){const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');if(!toggle||!nav)return;toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}})}
document.addEventListener('DOMContentLoaded',()=>{applyWhatsApp();examCarousel();menu();document.querySelectorAll('[data-icon]').forEach(el=>{const name=el.dataset.icon;if(ICONS[name])el.innerHTML=ICONS[name]})});
