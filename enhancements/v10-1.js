(()=>{
  'use strict';
  document.title='Rocío & Iván · Nuestra historia se escribe';
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));

  if(typeof window.typeInto==='function'){
    window.typeInto=async function(el,text,speed=38,html=false){
      if(reduce){el.innerHTML=html?text:text.replace(/</g,'&lt;');return;}
      el.innerHTML='';
      const plain=html?text.replace(/<[^>]*>/g,''):text;
      const node=document.createTextNode('');
      el.appendChild(node);
      const showNib=el.classList.contains('type-paragraph')||el.classList.contains('sheet-copy')||el.id==='heroType';
      const nib=document.createElement('span');nib.className='nib';nib.textContent='✒';
      if(showNib)el.appendChild(nib);
      for(let i=0;i<plain.length;i++){node.nodeValue+=plain[i];await sleep(speed+Math.random()*18);}
      nib.remove();
      if(html)el.innerHTML=text;
    };
  }

  const oliveMarkup=`<div class="olive-divider" aria-hidden="true"><svg viewBox="0 0 330 62"><path class="stem" d="M8 40C80 14 120 50 165 31c46-20 89 18 157-9"/><ellipse class="leaf" cx="67" cy="26" rx="6" ry="14" transform="rotate(-54 67 26)"/><ellipse class="leaf" cx="111" cy="38" rx="6" ry="14" transform="rotate(48 111 38)"/><ellipse class="leaf" cx="157" cy="27" rx="6" ry="14" transform="rotate(-48 157 27)"/><ellipse class="leaf" cx="204" cy="28" rx="6" ry="14" transform="rotate(52 204 28)"/><ellipse class="leaf" cx="252" cy="34" rx="6" ry="14" transform="rotate(-52 252 34)"/></svg></div>`;
  const catMarkup=`<div class="cat-cameo" aria-label="Dos gatos, un pequeño guiño de nuestra historia"><svg viewBox="0 0 140 86" aria-hidden="true"><g fill="currentColor"><ellipse cx="48" cy="63" rx="20" ry="24"/><circle cx="48" cy="38" r="15"/><path d="M36 29 31 15 44 25ZM60 29 66 15 53 25Z"/><ellipse cx="91" cy="65" rx="18" ry="21" opacity=".82"/><circle cx="91" cy="43" r="14" opacity=".82"/><path d="M80 34 76 21 88 30ZM102 34 107 21 95 30Z" opacity=".82"/></g><path class="tail" d="M30 70C7 72 9 43 25 51" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><path class="tail" d="M108 69c23 2 22-22 7-18" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" opacity=".82"/><path class="heart-mini" d="M67 42c-6-7-14 2 0 12 14-10 6-19 0-12Z"/></svg></div>`;

  const story=document.querySelector('.story');
  if(story){
    story.querySelector('.wrap')?.insertAdjacentHTML('beforeend',catMarkup);
    story.insertAdjacentHTML('afterend',oliveMarkup);
  }
  document.getElementById('dia')?.insertAdjacentHTML('afterend',oliveMarkup);

  const vio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('v10-show')}),{threshold:.18});
  document.querySelectorAll('.chapter-photo,.olive-divider,.cat-cameo').forEach(el=>vio.observe(el));

  function glints(n){
    if(reduce)return;
    for(let i=0;i<n;i++)setTimeout(()=>{
      const g=document.createElement('i');g.className='glint';
      g.style.left=(8+Math.random()*84)+'vw';g.style.top=(28+Math.random()*58)+'vh';
      g.style.setProperty('--gx',(Math.random()*90-45)+'px');g.style.setProperty('--dur',(1.8+Math.random()*1.6)+'s');
      document.body.appendChild(g);setTimeout(()=>g.remove(),3800);
    },i*80);
  }
  document.getElementById('enterBtn')?.addEventListener('click',()=>setTimeout(()=>glints(14),180));
  let emotionGlow=false;
  const emotion=document.querySelector('.emotion');
  if(emotion)new IntersectionObserver(([e])=>{if(e.isIntersecting&&!emotionGlow){emotionGlow=true;glints(18)}},{threshold:.35}).observe(emotion);

  let ticking=false;
  const parallax=()=>{
    if(!reduce)document.querySelectorAll('.chapter-photo .bg').forEach(bg=>{
      const box=bg.parentElement.getBoundingClientRect();
      const offset=Math.max(-12,Math.min(12,(innerHeight/2-(box.top+box.height/2))*.025));
      bg.style.setProperty('transform',`translate3d(0,${offset}px,0) scale(1.09)`,'important');
    });
    ticking=false;
  };
  addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(parallax);ticking=true}},{passive:true});
  parallax();

  const success=document.getElementById('success');
  if(success){
    const h=success.querySelector('h3'),p=success.querySelector('p');
    document.getElementById('sendBtn')?.addEventListener('click',()=>setTimeout(()=>{
      if(getComputedStyle(success).display==='none')return;
      const full=document.getElementById('guestName')?.value.trim()||'';
      const first=full.split(/\s+/)[0]||'';
      if(h)h.textContent=first?`Gracias, ${first} ♡`:'Gracias ♡';
      const attending=document.querySelector('.att.active')?.dataset.value!=='no';
      if(p)p.textContent=attending?'Nos hace muchísima ilusión que formes parte de este día.':'Gracias por contárnoslo. Te llevaremos con nosotros ese día.';
      glints(12);
    },40));
  }

  const audio=document.getElementById('music'),footer=document.querySelector('footer');
  if(audio&&footer)new IntersectionObserver(([e])=>{if(!audio.paused)audio.volume=e.isIntersecting?.48:.78},{threshold:.28}).observe(footer);
})();
