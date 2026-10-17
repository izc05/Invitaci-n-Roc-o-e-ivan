/* V14 · Apertura estable: carta -> anuncio -> portada, sin foto duplicada ni zoom. */
(()=>{
  'use strict';
  const enter=document.getElementById('enterBtn');
  const opening=document.getElementById('opening');
  const hero=document.querySelector('.hero');
  if(!enter||!opening||!hero) return;

  const body=document.body;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sleep=ms=>new Promise(resolve=>window.setTimeout(resolve,ms));
  let entered=false;

  /* Sustituir el manejador heredado sin tocar el resto de la invitación. */
  enter.onclick=null;
  enter.addEventListener('click',()=>{
    if(entered) return;
    entered=true;
    enter.disabled=true;
    enter.textContent='Abriendo…';
    window.scrollTo(0,0);

    const pre=document.getElementById('v105Prelude');
    const p=document.getElementById('v105PreludeText');

    /* Mostrar cobertura opaca ANTES de ocultar la carta: sin flash del hero. */
    if(pre&&p){
      body.classList.add('v105-prelude-lock');
      p.textContent='';
      pre.classList.remove('hide');
      pre.classList.add('show');
    }
    opening.classList.add('hide');

    /* Audio y pantalla completa dentro del gesto real del usuario. */
    const audio=document.getElementById('music');
    if(audio?.paused) document.getElementById('musicBtn')?.click();
    try{
      const root=document.documentElement;
      let fs;
      if(!document.fullscreenElement&&!document.webkitFullscreenElement){
        if(root.requestFullscreen) fs=root.requestFullscreen({navigationUI:'hide'});
        else if(root.webkitRequestFullscreen) fs=root.webkitRequestFullscreen();
      }
      if(fs&&typeof fs.catch==='function') fs.catch(()=>{});
    }catch(_e){/* Algunos navegadores rechazan fullscreen; el anuncio sigue. */}

    const showAnnouncement=async()=>{
      if(!pre||!p) return;
      await sleep(900);
      const msg='Hay historias que se escriben entre dos, pero que no serían las mismas sin quienes las acompañan.';
      if(reduced) p.textContent=msg;
      else for(const c of msg){
        p.textContent+=c;
        await sleep(40);
      }
      const end=document.createElement('strong');
      end.textContent='¡Nos casamos!';
      end.className='v14-marriage';
      p.appendChild(end);

      /* Cuatro segundos adicionales respecto a la pausa original. */
      await sleep(5600);

      /* Revelar directamente el hero definitivo, sin overlay de otra foto. */
      pre.classList.add('hide');
      await sleep(reduced?0:1150);
      pre.classList.remove('show');
      body.classList.remove('v105-prelude-lock');
    };
    void showAnnouncement();
  });
})();
