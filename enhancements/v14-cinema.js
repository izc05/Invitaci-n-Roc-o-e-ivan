/* V14 · Entrada desde el anillo + fullscreen por gesto directo. */
(()=>{
  'use strict';
  const enter=document.getElementById('enterBtn');
  const opening=document.getElementById('opening');
  const hero=document.querySelector('.hero');
  if(!enter||!opening||!hero) return;
  const photoUrl='assets/images/rocio-ivan-hero.webp';
  const overlay=document.createElement('div');
  overlay.className='v14-cinema';
  overlay.setAttribute('aria-hidden','true');
  const img=document.createElement('img');
  img.className='v14-cinema__photo';
  img.src=photoUrl;
  img.alt='';
  img.draggable=false;
  img.decoding='async';
  img.fetchPriority='high';
  overlay.append(img);
  const veil=document.createElement('div');
  veil.className='v14-cinema__veil';
  overlay.append(veil);
  document.body.append(overlay);

  const body=document.body;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let entered=false,started=false,completed=false;
  let completionTimer=null;
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
  function positionRing(){
    const w=overlay.clientWidth||window.innerWidth;
    const h=overlay.clientHeight||window.innerHeight;
    const iw=img.naturalWidth||1200;
    const ih=img.naturalHeight||1800;
    const fit=Math.min(w/iw,h/ih);
    const dw=iw*fit,dh=ih*fit;
    /* Punto medido sobre la fotografía real: anillo en primer plano. */
    const fx=(w-dw)/2+dw*.625;
    const fy=(h-dh)/2+dh*.53;
    overlay.style.setProperty('--v14-focus-x',fx+'px');
    overlay.style.setProperty('--v14-focus-y',fy+'px');
    overlay.style.setProperty('--v14-shift-x',(w/2-fx)+'px');
    overlay.style.setProperty('--v14-shift-y',(h/2-fy)+'px');
  }
  img.addEventListener('load',positionRing,{once:true});
  window.addEventListener('resize',()=>{if(entered&&!completed) positionRing()},{passive:true});

  function finish(){
    if(completed) return;
    completed=true;
    clearTimeout(completionTimer);
    body.classList.add('v14-cinema-finished','v14-cinema-fading');
    window.setTimeout(()=>{
      body.classList.remove('v14-cinema-active','v14-cinema-playing','v14-cinema-fading');
      overlay.remove();
    },950);
  }
  function start(){
    if(started) return;
    started=true;
    positionRing();
    if(reduced){
      completionTimer=window.setTimeout(finish,650);
      return;
    }
    requestAnimationFrame(()=>{
      positionRing();
      body.classList.add('v14-cinema-playing');
      completionTimer=window.setTimeout(finish,7300);
    });
  }

  /* El antiguo manejador escribía el título durante varios segundos antes
     de mostrar la foto. Se sustituye solo la apertura; el resto de la web
     (música, historias, confirmación, navegación) se conserva intacto. */
  enter.onclick=null;
  enter.addEventListener('click',()=>{
    if(entered) return;
    entered=true;
    enter.disabled=true;
    enter.textContent='Abriendo…';
    window.scrollTo(0,0);
    opening.classList.add('hide');

    /* Pedir fullscreen dentro del propio click mantiene la activación de usuario.
       En navegadores que lo bloqueen, la escena usa un overlay 100dvh. */
    let fs;
    try{
      const root=document.documentElement;
      if(!document.fullscreenElement&&!document.webkitFullscreenElement){
        if(root.requestFullscreen) fs=root.requestFullscreen({navigationUI:'hide'});
        else if(root.webkitRequestFullscreen) fs=root.webkitRequestFullscreen();
      }
    }catch(_e){}
    /* Música después de solicitar pantalla completa para no consumir el gesto. */
    document.querySelector('.music')?.click();
    let settled=false;
    const proceed=async()=>{
      if(settled)return;
      settled=true;
      const pre=document.getElementById('v105Prelude');
      const p=document.getElementById('v105PreludeText');
      if(pre&&p){
        body.classList.add('v105-prelude-lock');
        pre.classList.remove('hide');
        pre.classList.add('show');
        p.textContent='';
        await new Promise(resolve=>setTimeout(resolve,900));
        const msg='Hay historias que se escriben entre dos, pero que no serían las mismas sin quienes las acompañan.';
        if(reduced)p.textContent=msg;
        else for(const c of msg){p.textContent+=c;await new Promise(resolve=>setTimeout(resolve,40));}
        const end=document.createElement('strong');
        end.textContent='¡Nos casamos!';
        end.className='v14-marriage';
        p.appendChild(end);
        await new Promise(resolve=>setTimeout(resolve,1600));
        pre.classList.add('hide');
        await new Promise(resolve=>setTimeout(resolve,750));
        body.classList.remove('v105-prelude-lock');
      }
      body.classList.add('v14-cinema-active');
      start();
    };
    if(fs && typeof fs.then==='function') fs.then(proceed,proceed);
    else requestAnimationFrame(proceed);
    window.setTimeout(proceed,700);
  });
  img.addEventListener('error',()=>{
    if(entered) finish();
  },{once:true});
})();
