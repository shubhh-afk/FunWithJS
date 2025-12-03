const btn = document.querySelector('.button');
btn.addEventListener('mouseover', (dets)=>{
    const x = (dets.pageX - btn.offsetLeft);
    const y = (dets.pageY - btn.offsetTop);
    
    btn.style.setProperty('--xPos', x + 'px');
    btn.style.setProperty('--yPos', y + 'px');
})