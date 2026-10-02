var v=document.getElementById('v'),b=document.getElementById('snd'),rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!rm&&window.Lenis){new Lenis({autoRaf:true,autoToggle:true,anchors:true,allowNestedScroll:true,naiveDimensions:true,stopInertiaOnNavigate:true});}
if(rm){v.removeAttribute('autoplay');v.pause();}
b.onclick=function(){v.muted=!v.muted;if(!v.muted)v.play();b.textContent=v.muted?'Sound off':'Sound on';b.setAttribute('aria-pressed',String(!v.muted));};
var d=document.getElementById('dev');
if(!rm){d.parentNode.addEventListener('pointermove',function(e){var r=d.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;d.style.transform='rotateY('+x*22+'deg) rotateX('+-y*18+'deg)';});
d.parentNode.addEventListener('pointerleave',function(){d.style.transform='rotateY(-14deg) rotateX(8deg)';});}
d.style.transform='rotateY(-14deg) rotateX(8deg)';
document.getElementById('f').addEventListener('submit',function(e){e.preventDefault();var f=e.target,s=encodeURIComponent('Project enquiry: '+f.type.value),t=encodeURIComponent('Name: '+f.name.value+'\nEmail: '+f.email.value+'\n\n'+f.msg.value);document.getElementById('ok').style.display='block';location.href='mailto:hello@yourdomain.com?subject='+s+'&body='+t;});

window.__CC=[{"src": "assets/scene-01.jpg", "title": "Brand site", "sub": "Sample concept"}, {"src": "assets/scene-02.jpg", "title": "Online store", "sub": "Sample concept"}, {"src": "assets/scene-03.jpg", "title": "Web app", "sub": "Sample concept"}, {"src": "assets/scene-04.jpg", "title": "Portfolio", "sub": "Sample concept"}, {"src": "assets/scene-05.jpg", "title": "Landing page", "sub": "Sample concept"}, {"src": "assets/scene-06.jpg", "title": "Booking system", "sub": "Sample concept"}, {"src": "assets/scene-07.jpg", "title": "Dashboard", "sub": "Sample concept"}, {"src": "assets/scene-08.jpg", "title": "3D showcase", "sub": "Sample concept"}];
(function(){
var root=document.getElementById('cc');if(!root)return;
var D=window.__CC,n=D.length,cw=230,ch=290,gap=22,step=360/n,T=8,OV=2.5,P=2500,TILT=-5,TAU=Math.PI/180,ready=false;
var R=Math.max(n*(cw+gap)/(2*Math.PI),cw*.6),len=cw/T,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
var css='';D.forEach(function(d,i){css+='.cci'+i+'{background-image:url('+d.src+')}';});
var sty=document.createElement('style');sty.textContent=css;document.head.appendChild(sty);
var tiles=[];for(var i=0;i<T;i++){var s=i*len-(i?OV/2:0),e=(i+1)*len+(i<T-1?OV/2:0),a=((s+e)/2-cw/2)/R;tiles.push({i:i,s:s,e:e,m:'translate3d('+R*Math.sin(a)+'px,0,'+(-R*(1-Math.cos(a)))+'px) rotateY('+a/TAU+'deg)'});}
root.innerHTML='<div class="cc-view"><div class="cc-stage"><div class="cc-cam"><div class="cc-ring"></div></div></div></div><div class="cc-cap" aria-hidden="true"></div><div class="cc-live" aria-live="polite"></div>';
var stage=root.querySelector('.cc-stage'),cam=root.querySelector('.cc-cam'),ring=root.querySelector('.cc-ring'),cap=root.querySelector('.cc-cap'),live=root.querySelector('.cc-live');
var cards=D.map(function(d,idx){var c=document.createElement('div');c.className='cc-card';c.setAttribute('data-i',idx);c.setAttribute('role','group');c.setAttribute('aria-label',d.title+', '+(idx+1)+' of '+n);var h='';
[0,1].forEach(function(back){tiles.forEach(function(t){var k=back?T-1-t.i:t.i,f=k===0,l=k===T-1,br=(f?'var(--r)':'0')+' '+(l?'var(--r)':'0')+' '+(l?'var(--r)':'0')+' '+(f?'var(--r)':'0'),off=back?cw-t.e:t.s,w=t.e-t.s;
h+='<div class="cc-tile" style="left:'+(-w/2)+'px;top:'+(-ch/2)+'px;width:'+w+'px;height:'+ch+'px;transform:'+t.m+(back?' rotateY(180deg)':'')+'"><div class="cc-frame" style="border-radius:'+br+'"><div class="cc-photo cci'+idx+'" style="left:'+(-off)+'px;width:'+cw+'px;height:'+ch+'px"></div>'+(back?'<div class="cc-inner"></div>':'')+'<div class="cc-shade"></div></div></div>';});});
c.innerHTML=h;ring.appendChild(c);return c;});
var S={a:0,v:0,t:null,dir:-1,drag:false,hover:false,press:null,yaw:0,pit:0,px:0,py:0,inside:false,hold:0,fit:1,last:0,start:0,sup:false,active:-1},vis=true,raf=0;
function nearest(a){return Math.round(a/step)*step}
function wrap(d){return((d+180)%360+360)%360-180}
function pad(x){return String(x).padStart(2,'0')}
function measure(){var r=root.getBoundingClientRect();if(!r.width)return;var w=r.width*.94,h=(r.height-76)*.92,mx=0;
for(var a=-180;a<=180;a+=7.5){[-1,1].forEach(function(sg){var rad=a*TAU,x=R*Math.sin(rad)+sg*cw/2*Math.cos(rad),z=R*Math.cos(rad)-sg*cw/2*Math.sin(rad)-R;if(z<P*.95)mx=Math.max(mx,Math.abs(x)*P/(P-z));});}
S.fit=Math.min(1,w/(2*mx),h/(ch*1.08));stage.style.perspective=P+'px';stage.style.transform='translate3d(0,-38px,0) scale('+S.fit+')';}
function setActive(i){S.active=i;var d=D[i];cap.innerHTML='<span class="cc-title">'+d.title+'<small>'+d.sub+'</small></span><span class="cc-count">'+pad(i+1)+' / '+pad(n)+'</span>';live.textContent=d.title+', '+(i+1)+' of '+n;}
function frame(now){raf=0;var dt=S.last?Math.min((now-S.last)/1000,.05):1/60;S.last=now;
var intro=false,spin=0;if(ready&&!rm){if(!S.start)S.start=now;var p=Math.min((now-S.start)/1800,1);intro=p<1;spin=-260*S.dir*Math.pow(1-p,4);}
var paused=S.hover||S.drag||now<S.hold,cruise=(!paused&&!rm&&ready&&!intro)?14*S.dir:0;
if(S.drag){}else if(S.t!==null){var rem=dt,dmp=2*Math.sqrt(118);while(rem>0){var h=Math.min(rem,1/240);S.v+=(118*(S.t-S.a)-dmp*S.v)*h;S.a+=S.v*h;rem-=h;}if(Math.abs(S.t-S.a)<.004&&Math.abs(S.v)<.03){S.a=S.t;S.v=0;S.t=null;}}
else{S.v+=(cruise-S.v)*(1-Math.exp(-dt/1.08));S.a+=S.v*dt;if(cruise===0&&!intro&&Math.abs(S.v)<9)S.t=nearest(S.a);}
var ease=1-Math.exp(-dt/.35);S.yaw+=((S.inside&&!rm?S.px*2.7:0)-S.yaw)*ease;S.pit+=((S.inside&&!rm?-S.py*1.8:0)-S.pit)*ease;
var R2=R*(1+.06*Math.min(1,Math.abs(S.v)/420)),ang=S.a+spin;
cam.style.transform='translate3d(0,0,'+(-R2)+'px) rotateX('+(TILT+S.pit)+'deg) rotateY('+S.yaw+'deg)';ring.style.transform='rotateY('+ang+'deg)';
for(var i=0;i<n;i++){var b=i*step;cards[i].style.transform='rotateY('+b+'deg) translateZ('+R2+'px)';cards[i].style.setProperty('--d',(.55*Math.pow((1-Math.cos(wrap(b+ang)*TAU))/2,1.25)).toFixed(3));}
var idx=((Math.round(-S.a/step)%n)+n)%n;if(idx!==S.active)setActive(idx);
if(vis&&!document.hidden)raf=requestAnimationFrame(frame);else S.last=0;}
function wake(){if(!raf&&vis&&!document.hidden)raf=requestAnimationFrame(frame);}
function go(i){var t=-i*step;t+=360*Math.round((S.a-t)/360);S.t=t;S.hold=performance.now()+2800;wake();}
function stepBy(d){var b=S.t!==null?S.t:nearest(S.a);S.t=b-d*step;S.hold=performance.now()+2800;wake();}
new ResizeObserver(function(){measure();wake();}).observe(root);
new IntersectionObserver(function(en){vis=en[0].isIntersecting;if(vis)wake();}).observe(root);
document.addEventListener('visibilitychange',wake);
root.addEventListener('pointerenter',function(e){if(e.pointerType==='mouse')S.hover=true;});
root.addEventListener('pointerleave',function(e){if(e.pointerType==='mouse'){S.hover=false;S.inside=false;}});
root.addEventListener('pointerdown',function(e){if(e.button!==0)return;S.sup=false;S.press={id:e.pointerId,x:e.clientX,a:S.a,moved:false,o:0,s:[{t:performance.now(),a:S.a}]};});
root.addEventListener('pointermove',function(e){if(e.pointerType==='mouse'){var r=root.getBoundingClientRect();S.inside=true;S.px=Math.max(-1,Math.min(1,(e.clientX-r.left)/r.width*2-1));S.py=Math.max(-1,Math.min(1,(e.clientY-r.top)/r.height*2-1));}
var pr=S.press;if(!pr||pr.id!==e.pointerId)return;var dx=e.clientX-pr.x,cr=e.clientY-(pr.y||e.clientY);
if(!pr.moved){if(Math.abs(dx)<5)return;pr.moved=true;pr.o=dx;S.drag=true;S.t=null;S.v=0;root.classList.add('drag');try{root.setPointerCapture(e.pointerId)}catch(_){}}
S.a=pr.a+(dx-pr.o)*180/(Math.PI*R*S.fit);var now=performance.now();pr.s.push({t:now,a:S.a});while(pr.s.length>2&&now-pr.s[0].t>110)pr.s.shift();wake();});
function rel(e){var pr=S.press;if(!pr||pr.id!==e.pointerId)return;S.press=null;if(!pr.moved)return;S.drag=false;root.classList.remove('drag');S.sup=true;
var f=pr.s[0],l=pr.s[pr.s.length-1],sp=(l.t-f.t)/1000,v=sp>.008?Math.max(-1400,Math.min(1400,(l.a-f.a)/sp)):0;S.v=v;if(Math.abs(v)>60)S.dir=Math.sign(v);
if(S.hover&&e.pointerType==='mouse')S.t=Math.round((S.a+v*1.08*.55)/step)*step;wake();}
root.addEventListener('pointerup',rel);root.addEventListener('pointercancel',rel);
root.addEventListener('click',function(e){if(S.sup){S.sup=false;return;}var c=e.target.closest('[data-i]');if(c)go(+c.getAttribute('data-i'));});
root.addEventListener('keydown',function(e){if(e.key==='ArrowRight')stepBy(1);else if(e.key==='ArrowLeft')stepBy(-1);else return;e.preventDefault();});
measure();setActive(0);wake();setTimeout(function(){ready=true;root.classList.add('ready');wake();},150);
})();
document.querySelectorAll('.head,.grid>div,.steps li,.demo>*,form').forEach(function(el){el.classList.add('rv');});
var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:.12});
document.querySelectorAll('.rv').forEach(function(el){io.observe(el);});
