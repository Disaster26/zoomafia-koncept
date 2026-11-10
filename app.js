(function(){
  var rok=document.getElementById('rok'); if(rok) rok.textContent=new Date().getFullYear();

  // menu mobilne
  var menu=document.getElementById('menu'), burger=document.querySelector('.burger');
  function ustaw(otw){
    if(!menu) return;
    menu.classList.toggle('otw',otw); menu.setAttribute('aria-hidden',otw?'false':'true');
    if(burger) burger.setAttribute('aria-expanded',otw?'true':'false');
    document.documentElement.style.overflow=otw?'hidden':'';
  }
  if(burger) burger.addEventListener('click',function(){ustaw(true)});
  document.querySelectorAll('[data-zamknij]').forEach(function(el){el.addEventListener('click',function(){ustaw(false)})});
  if(menu) menu.querySelectorAll('nav a,.dol a').forEach(function(a){a.addEventListener('click',function(){ustaw(false)})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape') ustaw(false)});

  // toast
  var toast=document.getElementById('toast'), tt;
  function pokaz(t){ if(!toast) return; toast.textContent=t; toast.classList.add('widac'); clearTimeout(tt); tt=setTimeout(function(){toast.classList.remove('widac')},2600); }
  document.querySelectorAll('[data-demo]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();pokaz('To podgląd strony - ta funkcja zadziała w gotowym sklepie.')})});
  document.querySelectorAll('[data-demoform]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();pokaz('Podgląd: formularz nie wysyła danych.')})});

  // koszyk pokazowy
  var ile=document.getElementById('ile'), n=0;
  document.querySelectorAll('.dokosza,[data-dokosza]').forEach(function(b){b.addEventListener('click',function(e){
    e.preventDefault(); var q=parseInt(b.getAttribute('data-ilosc')||'1',10); var inp=document.getElementById('ilosc'); if(inp&&b.hasAttribute('data-dokosza')) q=Math.max(1,parseInt(inp.value,10)||1);
    n+=q; if(ile) ile.textContent=n; pokaz('Dodano do koszyka (podgląd).');
  })});
  var minus=document.getElementById('minus'), plus=document.getElementById('plus'), il=document.getElementById('ilosc');
  if(minus&&plus&&il){
    minus.addEventListener('click',function(){il.value=Math.max(1,(parseInt(il.value,10)||1)-1)});
    plus.addEventListener('click',function(){il.value=Math.min(99,(parseInt(il.value,10)||1)+1)});
  }

  // karuzele: palec (natywnie), mysz (przeciaganie), strzalki
  document.querySelectorAll('.tor').forEach(function(tor){
    var dn=false,sx=0,sl=0,ruch=0;
    tor.addEventListener('pointerdown',function(e){ if(e.pointerType!=='mouse') return; dn=true; ruch=0; sx=e.clientX; sl=tor.scrollLeft; });
    window.addEventListener('pointermove',function(e){ if(!dn) return; var d=e.clientX-sx; if(Math.abs(d)>4){ tor.classList.add('ciag'); } ruch=Math.max(ruch,Math.abs(d)); tor.scrollLeft=sl-d; });
    window.addEventListener('pointerup',function(){ if(!dn) return; dn=false; if(tor.classList.contains('ciag')){ var s=tor.scrollLeft; tor.classList.remove('ciag'); tor.scrollLeft=s; } });
    tor.addEventListener('click',function(e){ if(ruch>6){ e.preventDefault(); e.stopPropagation(); ruch=0; } },true);
    tor.addEventListener('dragstart',function(e){e.preventDefault()});
    var nav=document.querySelector('.tor-nav[data-tor="'+tor.id+'"]');
    if(nav){
      var bs=nav.querySelectorAll('button');
      function stan(){ bs[0].disabled=tor.scrollLeft<=4; bs[1].disabled=tor.scrollLeft+tor.clientWidth>=tor.scrollWidth-4; }
      bs.forEach(function(b){b.addEventListener('click',function(){ var k=parseInt(b.getAttribute('data-k'),10); var el=tor.firstElementChild; var w=el?el.getBoundingClientRect().width+14:300; tor.scrollBy({left:k*w,behavior:'smooth'}); })});
      tor.addEventListener('scroll',stan,{passive:true}); window.addEventListener('resize',stan); stan();
    }
  });
})();
