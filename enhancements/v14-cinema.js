/* V15 · Intro cinematográfica desde el anillo y control estable de música. */
(()=>{
  'use strict';
  const enter=document.getElementById('enterBtn');
  const opening=document.getElementById('opening');
  const hero=document.querySelector('.hero');
  if(!enter||!opening||!hero)return;
  const body=document.body;
  const photoUrl='assets/images/rocio-ivan-hero.webp';
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Una sola fuente y un solo controlador para toda la invitación.
  const audio=document.getElementById('music');
  const musicBtn=document.getElementById('musicBtn');
  let wantsMusic=false;
  let fadeFrame=0;
  let playSequence=0;
  const syncMusic=()=>{
    if(!musicBtn||!audio)return;
    const playing=!audio.paused;
    musicBtn.classList.toggle('on',playing);
    musicBtn.textContent=playing?'♪':'♫';
    musicBtn.setAttribute('aria-label',playing?'Pausar música':'Reanudar música');
    musicBtn.setAttribute('aria-pressed',String(playing));
  };
  const cancelFade=()=>{
    if(fadeFrame)cancelAnimationFrame(fadeFrame);
    fadeFrame=0;
  };
  const fadeTo=(target=.65,duration=1650)=>{
    if(!audio)return;
    cancelFade();
    const from=audio.volume;
    const start=performance.now();
    const tick=now=>{
      const p=Math.min(1,(now-start)/duration);
      audio.volume=Math.min(1,Math.max(0,from+(target-from)*(1-Math.pow(1-p,3))));
      if(p<1&&wantsMusic&&!audio.paused)fadeFrame=requestAnimationFrame(tick);
      else fadeFrame=0;
    };
    fadeFrame=requestAnimationFrame(tick);
  };
  function startMusic(){
    if(!audio)return;
    wantsMusic=true;
    const seq=++playSequence;
    audio.loop=true;
    audio.preload='auto';
    // Nunca reiniciamos la canción al cambiar escenas o volver de fullscreen.
    if(audio.paused)audio.volume=0;
    let p;
    try{p=audio.play()}catch(_e){wantsMusic=false;syncMusic();return}
    Promise.resolve(p).then(()=>{
      if(seq!==playSequence||!wantsMusic)return;
      syncMusic();
      fadeTo(.65,1800);
    }).catch(()=>{
      if(seq!==playSequence)return;
      wantsMusic=false;
      syncMusic(); // El icono permite reintentar con un toque si el navegador bloquea el audio.
    });
  }
  function pauseMusic(){
    if(!audio)return;
    wantsMusic=false;
    ++playSequence;
    cancelFade();
    audio.pause();
    syncMusic();
  }
  if(audio&&musicBtn){
    // Sustituye los controladores heredados v10/v13 por uno solo.
    musicBtn.onclick=()=>wantsMusic&&!audio.paused?pauseMusic():startMusic();
    ['play','pause','playing','ended'].forEach(ev=>audio.addEventListener(ev,syncMusic));
    document.addEventListener('visibilitychange',()=>{
      // El fullscreen puede disparar hidden: NO se pausa nunca de forma artificial.
      if(!document.hidden&&wantsMusic&&audio.paused)startMusic();
      else syncMusic();
    });
    document.addEventListener('fullscreenchange',()=>{
      if(wantsMusic&&audio.paused)startMusic();
    });
    window.addEventListener('pageshow',()=>{
      if(wantsMusic&&audio.paused)startMusic();
    });
    syncMusic();
  }

  const overlay=document.createElement('div');
  overlay.className='v14-cinema';
  overlay.setAttribute('aria-hidden','true');
  const img=document.createElement('img');
  img.className='v14-cinema__photo';
  img.src=photoUrl;
  img.alt='';
  img.decoding='async';
  img.fetchPriority='high';
  img.draggable=false;
  overlay.append(img);
  const veil=document.createElement('div');
  veil.className='v14-cinema__veil';
  overlay.append(veil);
  document.body.append(overlay);

  let entered=false,started=false,completed=false;
  let completionTimer=0;
  function positionRing(){
    const w=overlay.clientWidth||window.innerWidth;
    const h=overlay.clientHeight||window.innerHeight;
    const iw=img.naturalWidth||1200;
    const ih=img.naturalHeight||1800;
    const fit=Math.min(w/iw,h/ih);
    const dw=iw*fit,dh=ih*fit;
    const fx=(w-dw)/2+dw*.65;
    const fy=(h-dh)/2+dh*.53;
    overlay.style.setProperty('--v14-focus-x',fx+'px');
    overlay.style.setProperty('--v14-focus-y',fy+'px');
    overlay.style.setProperty('--v14-shift-x',(w/2-fx)+'px');
    overlay.style.setProperty('--v14-shift-y',(h/2-fy)+'px');
  }
  img.addEventListener('load',positionRing,{once:true});
  window.addEventListener('resize',()=>{
    if(entered&&!completed)positionRing();
  },{passive:true});
  function finish(){
    if(completed)return;
    completed=true;
    clearTimeout(completionTimer);
    body.classList.add('v14-cinema-finished','v14-cinema-fading');
    // Desplazamiento suave foto -> tarjeta, con solape de las dos transiciones.
    window.setTimeout(()=>body.classList.add('v15-hero-settle'),420);
    window.setTimeout(()=>{
      body.classList.remove('v14-cinema-active','v14-cinema-playing','v14-cinema-fading');
      overlay.remove();
    },950);
  }
  function start(){
    if(started)return;
    started=true;
    positionRing();
    if(reduced){completionTimer=window.setTimeout(finish,300);return}
    requestAnimationFrame(()=>{
      positionRing();
      body.classList.add('v14-cinema-playing');
      completionTimer=window.setTimeout(finish,7300);
    });
  }
  // Se anulan únicamente las aperturas antiguas; la navegación no cambia.
  enter.onclick=null;
  enter.addEventListener('click',()=>{
    if(entered)return;
    entered=true;
    enter.disabled=true;
    enter.textContent='Abriendo…';
    window.scrollTo(0,0);
    body.classList.add('v14-cinema-active');
    opening.classList.add('hide');

    // Reproducción y fullscreen se solicitan directamente en el gesto del usuario.
    startMusic();
    let fullScreen;
    try{
      const root=document.documentElement;
      if(!document.fullscreenElement&&!document.webkitFullscreenElement){
        if(root.requestFullscreen)fullScreen=root.requestFullscreen({navigationUI:'hide'});
        else if(root.webkitRequestFullscreen)fullScreen=root.webkitRequestFullscreen();
      }
    }catch(_e){ /* Webviews y algunos navegadores móviles lo bloquean. */ }

    let once=false;
    const proceed=()=>{
      if(once)return;
      once=true;
      if(img.complete&&img.naturalWidth>0){start();return}
      const ready=()=>start();
      img.addEventListener('load',ready,{once:true});
      img.addEventListener('error',ready,{once:true});
      window.setTimeout(ready,1200);
    };
    if(fullScreen&&typeof fullScreen.then==='function')fullScreen.then(proceed,proceed);
    else requestAnimationFrame(proceed);
    window.setTimeout(proceed,650);
  });
  img.addEventListener('error',()=>{if(entered)finish()},{once:true});
})();
