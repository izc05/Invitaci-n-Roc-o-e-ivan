(()=>{
  'use strict';
  document.body.classList.add('v14');

  const $=s=>document.querySelector(s);
  const opening=$('#opening');
  const enter=$('#enterBtn');
  const hero=$('.hero');
  const footer=$('footer');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isFull=()=>!!(document.fullscreenElement || document.webkitFullscreenElement);
  const requestFull=()=>{
    if(isFull()) return Promise.resolve();
    const el=document.documentElement;
    try{
      if(el.requestFullscreen) return el.requestFullscreen({navigationUI:'hide'}).catch(()=>el.requestFullscreen());
      if(el.webkitRequestFullscreen) return Promise.resolve(el.webkitRequestFullscreen());
    }catch(e){}
    return Promise.resolve();
  };

  /* El clic de abrir es un gesto del usuario: aprovechamos ese instante para entrar en fullscreen. */
  enter?.addEventListener('click',()=>{
    requestFull();
  },true);

  /* Empezar el zoom justo cuando desaparece la carta, no mientras aún la tapa. */
  const startHeroZoom=()=>{
    if(!hero || reduce || hero.classList.contains('v14-zoom-first')) return;
    hero.classList.add('v14-zoom-first');
  };
  if(opening){
    const mo=new MutationObserver(()=>{
      if(opening.classList.contains('hide')){
        startHeroZoom();
        mo.disconnect();
      }
    });
    mo.observe(opening,{attributes:true,attributeFilter:['class']});
    if(opening.classList.contains('hide')) startHeroZoom();
  }else startHeroZoom();

  /* Zoom final una sola vez, cuando la última foto se vuelve visible. */
  if(footer && !reduce){
    const io=new IntersectionObserver(entries=>{
      const e=entries[0];
      if(!e?.isIntersecting) return;
      footer.classList.add('v14-zoom-last');
      io.disconnect();
    },{threshold:.22});
    io.observe(footer);
  }

  /* Sincroniza el botón ya existente para que sea claramente de salida al entrar automáticamente. */
  const syncButton=()=>{
    const btn=$('#v13Fullscreen');
    if(!btn) return;
    const on=isFull();
    btn.classList.toggle('on',on);
    btn.setAttribute('aria-label',on?'Salir de pantalla completa':'Ver invitación a pantalla completa');
    btn.setAttribute('title',on?'Salir de pantalla completa':'Pantalla completa');
  };
  document.addEventListener('fullscreenchange',syncButton);
  document.addEventListener('webkitfullscreenchange',syncButton);
  setTimeout(syncButton,0);
})();