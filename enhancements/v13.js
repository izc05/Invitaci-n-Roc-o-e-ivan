(()=>{
  'use strict';
  document.body.classList.add('v13');
  const $=s=>document.querySelector(s);
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const opening=$('#opening');
  const sheet=opening?.querySelector('.sheet');
  const enter=$('#enterBtn');
  const hero=$('.hero');

  /* Carta 3D: inclinación muy suave siguiendo el puntero o el dedo. */
  if(opening && sheet && !reduce){
    const reset=()=>{
      sheet.style.setProperty('--v13-rx','0deg');
      sheet.style.setProperty('--v13-ry','0deg');
    };
    opening.addEventListener('pointermove',ev=>{
      if(ev.pointerType==='touch' && ev.buttons===0) return;
      const r=sheet.getBoundingClientRect();
      const x=Math.max(0,Math.min(1,(ev.clientX-r.left)/Math.max(1,r.width)));
      const y=Math.max(0,Math.min(1,(ev.clientY-r.top)/Math.max(1,r.height)));
      sheet.style.setProperty('--v13-rx',((.5-y)*5.5).toFixed(2)+'deg');
      sheet.style.setProperty('--v13-ry',((x-.5)*7.5).toFixed(2)+'deg');
    },{passive:true});
    opening.addEventListener('pointerleave',reset,{passive:true});
    opening.addEventListener('pointercancel',reset,{passive:true});
  }

  /* Capturamos antes del manejador existente: la carta avanza en profundidad al abrirse. */
  enter?.addEventListener('click',()=>{
    sheet?.classList.add('v13-open');
    setTimeout(()=>hero?.classList.add('v13-awake'),520);
  },true);

  /* Pantalla completa real cuando el navegador la soporta. */
  const canFullscreen=!!(document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen);
  if(canFullscreen && !$('#v13Fullscreen')){
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='v13-fullscreen';
    btn.id='v13Fullscreen';
    btn.setAttribute('aria-label','Ver invitación a pantalla completa');
    btn.setAttribute('title','Pantalla completa');
    btn.textContent='⛶';
    document.body.appendChild(btn);

    const request=()=>document.documentElement.requestFullscreen?.() || document.documentElement.webkitRequestFullscreen?.();
    const exit=()=>document.exitFullscreen?.() || document.webkitExitFullscreen?.();
    const isFull=()=>!!(document.fullscreenElement || document.webkitFullscreenElement);

    btn.addEventListener('click',async()=>{
      try{
        if(isFull()) await exit();
        else await request();
      }catch(e){}
    });
    const sync=()=>{
      const on=isFull();
      btn.classList.toggle('on',on);
      btn.setAttribute('aria-label',on?'Salir de pantalla completa':'Ver invitación a pantalla completa');
      btn.setAttribute('title',on?'Salir de pantalla completa':'Pantalla completa');
    };
    document.addEventListener('fullscreenchange',sync);
    document.addEventListener('webkitfullscreenchange',sync);
    sync();
  }

  /* Si la pantalla inicial se salta por cualquier razón, el hero conserva el efecto de entrada. */
  if(opening?.classList.contains('hide')) hero?.classList.add('v13-awake');
})();