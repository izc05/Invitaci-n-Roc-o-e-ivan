(()=>{
  'use strict';
  document.body.classList.add('v105');
  document.title='Rocío & Iván · Nuestra historia';
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));

  async function slowType(el,text,base=46,html=false){
    if(!el)return;
    if(reduce){el.innerHTML=html?text:text.replace(/</g,'&lt;');return;}
    const plain=html?text.replace(/<[^>]*>/g,''):text;
    el.textContent='';
    for(let i=0;i<plain.length;i++){
      el.textContent+=plain[i];
      const c=plain[i];
      let wait=base+Math.random()*16;
      if(c===','||c===';'||c===':')wait+=95;
      if(c==='.'||c==='?'||c==='!')wait+=230;
      await sleep(wait);
    }
    if(html)el.innerHTML=text;
  }

  // La escritura sigue siendo solo letras: sin pluma, nib ni guía visual.
  window.typeInto=slowType;
  try{ typeInto=slowType; }catch(e){}

  const opening=$('#opening');
  if(opening){
    opening.insertAdjacentHTML('afterend',`<div class="v105-prelude" id="v105Prelude"><div class="v105-prelude__inner"><small>Antes de darte una fecha</small><h2>Queríamos contarte algo.</h2><p id="v105PreludeText"></p><div class="v105-prelude__mark" aria-hidden="true"></div></div></div>`);
  }

  const story=$('.story');
  const emotion=$('.emotion');
  if(story && emotion && !$('#v105Moments')){
    const block=document.createElement('div');
    block.id='v105Moments';
    block.innerHTML=`
      <section class="v105-moments-head">
        <small>Pequeños momentos</small>
        <h2>Hay recuerdos que no hacen ruido,<em>pero se quedan.</em></h2>
      </section>
      <section class="v105-moment" data-v105-moment>
        <div class="v105-moment__sticky"><img class="v105-moment__photo" src="assets/images/story_path.webp" alt="Un camino compartido"><div class="v105-moment__shade"></div><div class="v105-moment__copy"><small>Momento I</small><p data-v105-text="Sin darnos cuenta, empezamos a construir un nosotros."></p></div></div>
      </section>
      <section class="v105-moment" data-v105-moment>
        <div class="v105-moment__sticky"><img class="v105-moment__photo" src="assets/images/story_start.webp" alt="Un atardecer compartido"><div class="v105-moment__shade"></div><div class="v105-moment__copy"><small>Momento II</small><p data-v105-text="Lo extraordinario terminó siendo compartir lo cotidiano."></p></div></div>
      </section>
      <section class="v105-cats" data-v105-cats>
        <div class="v105-cats__sticky"><img class="v105-cats__photo" src="assets/images/story_cats.webp" alt="Dos gatos juntos"><div class="v105-cats__shade"></div><div class="v105-cats__copy"><small>Un rincón muy nuestro</small><h3>La casa también encontró su propia historia.</h3><p>Entre todos esos días llegaron también nuestros dos gatos. Ellos vieron cómo dos rutinas se mezclaban, cómo aparecían nuevas costumbres y cómo, casi sin darnos cuenta, una casa empezó a sentirse de verdad como nuestro hogar.</p></div></div>
      </section>
      <section class="v105-moment" data-v105-moment>
        <div class="v105-moment__sticky"><img class="v105-moment__photo" src="assets/images/story_proposal.webp" alt="Una promesa al atardecer"><div class="v105-moment__shade"></div><div class="v105-moment__copy"><small>Momento III</small><p data-v105-text="Y entonces supimos que queríamos seguir eligiéndonos."></p></div></div>
      </section>`;
    emotion.parentNode.insertBefore(block,emotion);
  }

  function fadeMusicTo(target=.70,duration=2400){
    const audio=$('#music'); if(!audio)return;
    const start=audio.volume||0,t0=performance.now();
    const tick=now=>{const p=Math.min(1,(now-t0)/duration);audio.volume=start+(target-start)*p;if(p<1)requestAnimationFrame(tick)};
    requestAnimationFrame(tick);
  }

  function startMusicFrom20(){
    const audio=$('#music'),btn=$('#musicBtn'); if(!audio)return;
    try{
      audio.volume=0;
      const seek=()=>{try{if(!Number.isFinite(audio.duration)||audio.duration>20)audio.currentTime=20}catch(e){}};
      if(audio.readyState>=1)seek(); else audio.addEventListener('loadedmetadata',seek,{once:true});
      const p=audio.play();
      if(p&&typeof p.then==='function')p.then(()=>{btn?.classList.add('on');if(btn)btn.textContent='♪';fadeMusicTo(.70,2400)}).catch(()=>{btn?.classList.remove('on')});
    }catch(e){}
  }

  const enter=$('#enterBtn');
  if(enter){
    enter.onclick=()=>{
      enter.disabled=true;
      opening?.classList.add('hide');
      startMusicFrom20();
      const pre=$('#v105Prelude');
      pre?.classList.add('show');
      slowType($('#v105PreludeText'),'Si estás aquí es porque formas parte de nuestra historia. Antes de enseñarte el día que hemos imaginado, queríamos compartir contigo algunos de los pequeños momentos que nos trajeron hasta él.',48).then(()=>{
        setTimeout(()=>pre?.classList.add('hide'),3300);
      });
      setTimeout(()=>slowType($('#heroType'),'Después de tantos momentos compartidos, ha llegado uno que no queremos vivir sin ti. Gracias por formar parte de nuestra historia.',46),5400);
      petals(7);
    };
  }

  const musicBtn=$('#musicBtn'),audio=$('#music');
  if(musicBtn&&audio){
    musicBtn.onclick=()=>{
      if(audio.paused){
        try{if(audio.currentTime<1&&audio.readyState>=1)audio.currentTime=20}catch(e){}
        const p=audio.play();if(p&&p.then)p.then(()=>{musicBtn.classList.add('on');musicBtn.textContent='♪'}).catch(()=>{});
      }else{audio.pause();musicBtn.classList.remove('on');musicBtn.textContent='♫'}
    };
  }

  // Texto de los momentos: entra tarde para dejar respirar primero la imagen.
  const momentIO=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(!e.isIntersecting||e.target.dataset.v105Written)return;
    e.target.dataset.v105Written='1';
    const p=e.target.querySelector('[data-v105-text]');
    if(p)setTimeout(()=>slowType(p,p.dataset.v105Text,54),650);
  }),{threshold:.35});
  $$('[data-v105-moment]').forEach(x=>momentIO.observe(x));

  // Reescribe el mensaje central con más pausa cuando llega a pantalla.
  const emotional=$('#emotionType');
  if(emotional){
    let done=false;
    new IntersectionObserver(([e])=>{
      if(!e.isIntersecting||done)return;done=true;
      emotional.textContent='';
      slowType(emotional,'Si estás leyendo esto es porque formas parte de nuestra vida. Nos haría muchísima ilusión que estuvieras allí cuando digamos «sí». ¿Nos acompañas?',50);
      goldDrift(6);
    },{threshold:.38}).observe(emotional);
  }

  let ticking=false;
  function clamp(v,min,max){return Math.max(min,Math.min(max,v))}
  function progressFor(sec,vh){const r=sec.getBoundingClientRect(),span=Math.max(1,sec.offsetHeight-vh);return clamp(-r.top/span,0,1)}
  function parallax(){
    const vh=innerHeight;
    const hero=$('.hero'),heroBg=$('#heroBg');
    if(hero&&heroBg&&!reduce){
      const p=progressFor(hero,vh);
      heroBg.style.setProperty('transform',`translate3d(0,${-82*p}px,0) scale(${1.18-.09*p})`,'important');
    }

    $$('.story .chapter').forEach(sec=>{
      const p=progressFor(sec,vh),bg=sec.querySelector('.chapter-photo .bg'),copy=sec.querySelector('.chapter-copy');
      if(bg&&!reduce)bg.style.setProperty('transform',`translate3d(0,${-105+210*p}px,0) scale(${1.19-.11*p})`,'important');
      if(copy){
        const opacity=clamp((p-.06)/.28,.18,1);
        copy.style.opacity=opacity;
        copy.style.transform=`translate3d(0,${54-94*p}px,0)`;
      }
    });

    $$('[data-v105-moment]').forEach(sec=>{
      const p=progressFor(sec,vh),img=sec.querySelector('.v105-moment__photo'),copy=sec.querySelector('.v105-moment__copy');
      if(img&&!reduce)img.style.transform=`translate3d(0,${-120+240*p}px,0) scale(${1.20-.13*p})`;
      if(copy){const o=clamp((p-.14)/.28,0,1);copy.style.opacity=o;copy.style.transform=`translate3d(0,${82-132*p}px,0)`}
    });

    const cats=$('[data-v105-cats]');
    if(cats){const p=progressFor(cats,vh),img=cats.querySelector('.v105-cats__photo');if(img&&!reduce)img.style.transform=`translate3d(0,${-95+190*p}px,0) scale(${1.18-.10*p})`}

    $$('.event-img').forEach(box=>{if(!reduce){const r=box.getBoundingClientRect();box.style.backgroundPosition=`center ${50+clamp((vh/2-r.top)*.035,-9,9)}%`}});

    const max=document.documentElement.scrollHeight-vh;
    const bar=$('#progress');if(bar)bar.style.width=(scrollY/Math.max(1,max)*100)+'%';
    ticking=false;
  }
  addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(parallax);ticking=true}},{passive:true});
  addEventListener('resize',parallax,{passive:true});
  parallax();

  function petals(n){
    if(reduce)return;
    for(let i=0;i<n;i++)setTimeout(()=>{const p=document.createElement('i');p.className='petal';p.style.left=Math.random()*100+'vw';p.style.setProperty('--dx',(Math.random()*150-75)+'px');p.style.animationDuration=(4.4+Math.random()*2.4)+'s';document.body.appendChild(p);setTimeout(()=>p.remove(),7600)},i*120);
  }
  function goldDrift(n){
    if(reduce)return;
    for(let i=0;i<n;i++){const s=document.createElement('i');s.className='glint';s.style.left=(18+Math.random()*64)+'vw';s.style.top=(30+Math.random()*35)+'vh';document.body.appendChild(s);s.animate([{transform:'translate3d(0,0,0) scale(1)',opacity:.35},{transform:`translate3d(${Math.random()*60-30}px,-95px,0) scale(.3)`,opacity:0}],{duration:3000+Math.random()*1600,easing:'ease-out'});setTimeout(()=>s.remove(),5000)}
  }
})();
