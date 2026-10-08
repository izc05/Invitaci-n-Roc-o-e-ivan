/* V15 · Ajuste de fotografías móviles sin afectar al diseño de escritorio. */
(()=>{
  'use strict';
  document.body.classList.add('v15-polish');
  for(const article of document.querySelectorAll('.story .chapter')){
    const photo=article.querySelector('.chapter-photo');
    const bg=photo?.querySelector('.bg');
    if(!photo||!bg||photo.querySelector('.v15-story-photo'))continue;
    const imageStyle=getComputedStyle(bg).backgroundImage;
    const match=imageStyle.match(/url\((?:"|')?([^"')]+)(?:"|')?\)/);
    if(!match)continue;
    const img=document.createElement('img');
    img.className='v15-story-photo';
    img.src=match[1];
    img.alt='';
    img.setAttribute('aria-hidden','true');
    img.loading='lazy';
    img.decoding='async';
    photo.append(img);
  }
})();
