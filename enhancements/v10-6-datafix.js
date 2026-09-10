(()=>{
  'use strict';
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const eventSection=$('.events')?.closest('.section');
  const cards=$$('.events .event');

  const chapterSigns=$$('.story .hand-sign');
  if(chapterSigns.length>=3) chapterSigns[2].textContent='27 · febrero · 2027';

  const chapters=$$('.story .chapter');
  if(chapters[2]) chapters[2].classList.add('v106-banquet-chapter');

  const eventLead=eventSection?.querySelector('.lead');
  if(eventLead) eventLead.textContent='Ceremonia, banquete y celebración en el mismo lugar: Finca Los Olivos, El Vellón.';

  if(cards[0]){
    const tags=cards[0].querySelector('.tags');
    if(tags) tags.innerHTML='<span class="tag">12:30 h aprox.</span><span class="tag">Mismo lugar</span><span class="tag">Autobús</span>';
  }
  if(cards[1]){
    const tags=cards[1].querySelector('.tags');
    if(tags) tags.innerHTML='<span class="tag">Cóctel</span><span class="tag">Banquete</span><span class="tag">Celebración</span>';
  }

  const realTimeline=[
    ['12:30','Ceremonia','El momento del “sí”. Hora aproximada.'],
    ['Después','Cóctel','Primer brindis juntos, sin salir de la finca.'],
    ['A continuación','Banquete','Nos sentaremos a la mesa para seguir celebrando.'],
    ['Sobremesa','Brindis','Tiempo para abrazos, palabras y recuerdos.'],
    ['Luego','Fiesta','Y desde aquí, disfrutaremos sin mirar demasiado el reloj.']
  ];
  $$('.timeline-list .stop').forEach((stop,i)=>{
    const data=realTimeline[i]; if(!data) return;
    const time=stop.querySelector('time'),h=stop.querySelector('h4'),p=stop.querySelector('p');
    if(time) time.textContent=data[0]; if(h) h.textContent=data[1]; if(p) p.textContent=data[2];
  });
  const timeline=$('.timeline');
  if(timeline&&!timeline.querySelector('.v106-schedule-note')){
    timeline.querySelector('.title')?.insertAdjacentHTML('afterend','<p class="lead v106-schedule-note" style="text-align:center;max-width:650px;margin:16px auto 0">Salvo la ceremonia, los horarios definitivos se confirmarán más adelante.</p>');
  }

  const stableText='Si estás leyendo esto es porque formas parte de nuestra vida. Nos haría muchísima ilusión que estuvieras allí cuando digamos «sí». ¿Nos acompañas?';
  const oldEmotion=$('#emotionType') || $('#quoteType');
  if(oldEmotion){
    const clean=oldEmotion.cloneNode(false);
    clean.id=oldEmotion.id;
    clean.className=(oldEmotion.className||'') + ' v106-stable-emotion';
    clean.textContent=stableText;
    oldEmotion.replaceWith(clean);
    const show=()=>clean.classList.add('in');
    if('IntersectionObserver' in window){
      const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){show();io.disconnect();}},{threshold:.32});
      io.observe(clean);
    }else show();
  }

  const footerDate=$('footer p');
  if(footerDate) footerDate.textContent='27 de febrero de 2027 · Finca Los Olivos';

  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let raf=false;
  function fixPlaceParallax(){
    const place=$('#v106Place'), photo=place?.querySelector('.v106-place__photo');
    if(!place||!photo||reduce){raf=false;return;}
    const r=place.getBoundingClientRect();
    const span=Math.max(1,place.offsetHeight-innerHeight);
    const p=Math.max(0,Math.min(1,-r.top/span));
    photo.style.transform=`translate3d(0,${-12+24*p}px,0) scale(${1.035-.015*p})`;
    raf=false;
  }
  addEventListener('scroll',()=>{if(!raf){raf=true;requestAnimationFrame(fixPlaceParallax)}},{passive:true});
  addEventListener('resize',fixPlaceParallax,{passive:true});
  requestAnimationFrame(fixPlaceParallax);
})();
