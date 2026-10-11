(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const root=document.documentElement,KEY='vantora.cfg.v1',LAST='vantora.last',RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const NAV=['home','explore','discover','gallery','videos','features','tools','updates','about','credits','settings'];
// key|category|label|type|default|options|description
const SET=`theme|Appearance|Theme|sel|dark|dark,light,system|System follows your device.
accent|Appearance|Accent color|col|#4d7cff||Buttons, focus and glow color.
scale|Appearance|Interface scale (%)|rng|100|85,125,5|Scales all text and spacing.
font|Appearance|Font|sel|sans|sans,serif,mono|Body typeface.
lineh|Appearance|Line spacing|rng|1.6|1.3,2,.1|Paragraph line height.
maxw|Appearance|Content width (px)|rng|1200|900,1500,50|Maximum page width.
radius|Appearance|Corner radius (px)|rng|10|0,28,1|Cards, inputs and dialogs.
density|Appearance|Layout density|sel|cozy|compact,cozy,roomy|Spacing between sections.
bo|Appearance|Border intensity|rng|.14|0,.5,.02|Visibility of outlines.
shadow|Appearance|Shadow intensity|rng|.5|0,1,.1|Card shadows.
btnshape|Appearance|Button shape|sel|pill|pill,round,square|Button corners.
motion|Motion|Animations|tog|true||Master switch for all animation.
spd|Motion|Animation speed|rng|1|.5,2,.1|Higher is faster.
reveal|Motion|Scroll reveal|tog|true||Fade items in as they scroll into view.
parallax|Motion|Parallax|tog|true||Hero glow moves slower than scroll.
particles|Motion|Particles|tog|true||Drifting dust field.
glow|Motion|Cursor light|tog|true||Light follows pointer on desktop.
hover|Motion|Hover lift|tog|true||Cards rise on hover.
smooth|Motion|Smooth scrolling|tog|true||Animated anchor and top scrolling.
intro|Motion|Intro on load|tog|true||Short decorative intro (not a loader).
anim|Motion|Animated gradient|tog|true||Slow background drift.
grain|Background|Noise overlay|rng|.06|0,.3,.01|Film grain strength.
grid|Background|Grid visibility|rng|.06|0,.3,.01|Background grid lines.
aurora|Background|Ambient glow|rng|.5|0,1,.05|Glow behind content.
pcount|Background|Particle density|rng|70|10,150,5|Number of particles.
pspeed|Background|Particle speed|rng|1|.2,3,.1|Particle drift speed.
sticky|Navigation|Sticky header|tog|true||Header stays at top.
hdralpha|Navigation|Header opacity|rng|.6|0,1,.05|Header background after scroll.
hdrblur|Navigation|Header blur (px)|rng|12|0,30,1|Backdrop blur.
progress|Navigation|Scroll progress bar|tog|true||Thin bar at top.
totop|Navigation|Back-to-top button|tog|true||Shows after scrolling.
footer|Navigation|Footer|tog|true||Show page footer.
gcols|Navigation|Gallery columns|rng|3|2,5,1|Desktop gallery columns.
remember|Behavior|Restore last page|tog|true||Reopen where you left off.
mute|Media|Videos start muted|tog|true||Applies to the video modal.
loop|Media|Loop videos|tog|false||Applies to the video modal.
caps|Media|Lightbox captions|tog|true||Show captions under images.
hc|Accessibility|High contrast|tog|false||Brighter text, stronger borders.
bigtext|Accessibility|Larger text|tog|false||Raises base text size.
focus|Accessibility|Enhanced focus ring|tog|false||Thicker keyboard focus outline.
underline|Accessibility|Underline links|tog|false||Always underline links.
simple|Accessibility|Simplified visuals|tog|false||Hides glow, grain, grid, particles.
lowfx|Performance|Low-effects mode|tog|false||Halves particles, removes blur.
canvas|Performance|Canvas effects|tog|true||Allows the particle canvas.`.split('\n').map(l=>{const [k,c,n,t,d,o,desc]=l.split('|');const v=t=='tog'?d=='true':t=='rng'?+d:d;return{k,c,n,t,d:v,o:o?o.split(','):[],desc}});
let cfg=Object.fromEntries(SET.map(s=>[s.k,s.d]));if(RM)cfg.motion=false,cfg.intro=false;
try{const j=JSON.parse(localStorage.getItem(KEY)||'{}');for(const s of SET)if(ok(s,j[s.k]))cfg[s.k]=j[s.k]}catch(e){}
function ok(s,v){return s.t=='tog'?typeof v=='boolean':s.t=='rng'?typeof v=='number'&&v>=+s.o[0]&&v<=+s.o[1]:s.t=='sel'?s.o.includes(v):typeof v=='string'&&/^#[0-9a-f]{6}$/i.test(v)}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(cfg))}catch(e){}};
function apply(){const dark=cfg.theme=='system'?matchMedia('(prefers-color-scheme:dark)').matches:cfg.theme=='dark';root.dataset.theme=dark?'dark':'light';
 for(const s of SET){const x=cfg[s.k];if(s.t=='rng'||s.t=='col')root.style.setProperty('--'+s.k,x);else root.dataset[s.k]=s.t=='tog'?(x?'1':'0'):x}
 root.style.setProperty('--dim',cfg.simple?0:.3);window.kick&&window.kick()}
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.i);toast.i=setTimeout(()=>t.classList.remove('on'),2600)};
const art=(h,t)=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><radialGradient id="g" cx=".7" cy=".3"><stop offset="0" stop-color="hsl(${h} 80% 60%)"/><stop offset="1" stop-color="hsl(${h} 55% 7%)"/></radialGradient></defs><rect width="800" height="600" fill="url(#g)"/><path d="M0 430L800 330M0 480L800 410M0 530L800 480" stroke="#fff" stroke-opacity=".2" fill="none"/><circle cx="560" cy="180" r="70" fill="none" stroke="#fff" stroke-opacity=".55"/></svg>`);
const ITEMS=`Glass Meridian|Architecture|215|A tower façade at dusk, reduced to line and reflection.
Ion Trail|Orbit|230|Long-exposure arc of a satellite pass.
Basalt Study|Material|260|Volcanic stone under a single cold light.
Night Relay|Signal|200|A transmitter mast above a sleeping valley.
Quiet Hangar|Architecture|245|Empty aircraft hangar, one open door.
Perihelion|Orbit|280|Orbital geometry drawn as thin concentric light.
Carbon Weave|Material|220|Macro fibre texture with a blue edge light.
Static Bloom|Signal|250|Interference pattern from an analog capture.
Slate Atrium|Architecture|210|Stairwell void in graphite concrete.
Lagrange|Orbit|270|A point where two gravities cancel.
Frost Lattice|Material|205|Crystal growth on cold glass.
Carrier Wave|Signal|235|Waveform study in silver on midnight.`.split('\n').map((l,i)=>{const [t,c,h,cap]=l.split('|');return{i,t,c,h:+h,cap,img:art(h,t)}});
const CATS=['All',...new Set(ITEMS.map(x=>x.c))];
const VIDEOS=[{t:'Opening Sequence',src:'',h:215},{t:'Orbit Reel',src:'',h:260},{t:'Signal Walk',src:'',h:235}]; // set src to e.g. "assets/videos/clip.mp4"
const UPD=`2.4.0|2026-09-20|Feature|Settings center now exports and imports JSON.
2.3.2|2026-08-30|Fix|Gallery lightbox keyboard focus no longer escapes.
2.3.0|2026-08-02|Feature|Tools hub adds gradient and JSON utilities.
2.2.1|2026-07-11|Performance|Particle field pauses when the tab is hidden.
2.2.0|2026-06-18|Design|New menu transition and silver type scale.`.split('\n').map(l=>{const [v,d,c,t]=l.split('|');return{v,d,c,t}});
const card=(x,m)=>`<button class="card rv" data-act="lb" data-i="${x.i}" aria-label="Open ${esc(x.t)}"><img src="${x.img}" width="800" height="600" loading="lazy" alt="${esc(x.cap)}"><div><b>${esc(x.t)}</b><br><small>${esc(x.c)}${m?' — '+esc(x.cap):''}</small></div></button>`;
const gridView=(m)=>`<section><h1>${m?'Explore':'Gallery'}</h1><p class="lead">${m?'Search every piece in the collection.':'Open any image full screen. Use arrow keys to move, Esc to close.'}</p><input id="q" type="search" placeholder="Search titles and captions" aria-label="Search"><div class="row chips" role="group" aria-label="Category">${CATS.map(c=>`<button data-act="cat" data-c="${c}" aria-pressed="${c=='All'}">${c}</button>`).join('')}</div><div id="grid" class="grid ${m?'':'g'}" data-m="${m?1:''}"></div></section>`;
let cat='All',list=[];
function draw(){const q=($('#q')||{value:''}).value.toLowerCase(),g=$('#grid');if(!g)return;list=ITEMS.filter(x=>(cat=='All'||x.c==cat)&&(x.t+x.cap).toLowerCase().includes(q));g.innerHTML=list.length?list.map(x=>card(x,g.dataset.m)).join(''):'<p class="mut">No results. Clear the search or choose another category.</p>';reveal()}
const V={home:()=>`<section class="hero"><div class="hero-art" aria-hidden="true"></div><h1>Cinema for the screen in your hand.</h1><p class="lead">VANTORA is a visual studio of orbital, architectural and signal photography — with a toolbox and a full settings center built in.</p><div class="row"><a class="btn pri" href="#/discover">Discover the collection</a><a class="btn" href="#/tools">Open tools</a></div></section>
<h2>Featured</h2><div class="grid">${ITEMS.slice(0,3).map(x=>card(x)).join('')}</div>
<h2>Latest updates</h2>${UPD.slice(0,3).map(u=>`<p><b>v${u.v}</b> <span class="mut">${u.d}</span> — ${u.t}</p>`).join('')}<p class="mut">Sample content, not connected to a live update service.</p>
<h2>FAQ</h2><details><summary>Is anything sent to a server?</summary><p>No. VANTORA is static; settings live in your browser's localStorage.</p></details><details><summary>Why are the images illustrations?</summary><p>No external photos are bundled. Drop real files into assets/images and edit ITEMS in js/app.js.</p></details>
<h2>Newsletter (demo)</h2><div class="row"><label for="em" class="mut">Email</label><input id="em" type="email" placeholder="you@example.com" style="max-width:320px"><button data-act="sub" class="pri">Check address</button></div><p class="mut">Demo only: nothing is stored or delivered.</p>`,
explore:()=>gridView(1),gallery:()=>gridView(0),
discover:()=>`<h1>Discover</h1><p class="lead">A curated set of six pieces.</p><div class="feat"><div class="grid" style="grid-template-columns:1fr">${card(ITEMS[5],1)}</div><div class="grid" style="grid-template-columns:1fr">${[1,6].map(i=>card(ITEMS[i],1)).join('')}</div></div><div class="grid" style="margin-top:1rem">${[9,3,10].map(i=>card(ITEMS[i],1)).join('')}</div>`,
videos:()=>`<h1>Videos</h1><p class="lead">No video files are bundled. Add an MP4 to assets/videos and set its src in VIDEOS (js/app.js).</p><div class="grid">${VIDEOS.map((v,i)=>`<button class="card" data-act="vid" data-i="${i}"><img src="${art(v.h)}" width="800" height="600" loading="lazy" alt="Poster for ${esc(v.t)}"><div><b>${esc(v.t)}</b><br><small>${v.src?'Play':'Source not configured'}</small></div></button>`).join('')}</div>`,
features:()=>`<h1>Features</h1><div class="grid">${[['Settings center','45 live settings, search, per-category reset, JSON import/export.'],['Gallery lightbox','Keyboard navigation, captions, fallback artwork.'],['Tools','Color, gradient, case, counter, JSON and ratio utilities.'],['Accessible by default','Focus management, reduced motion, high contrast.'],['Offline-first','No dependencies, no network calls.'],['Static hosting','Works on GitHub Pages as-is.']].map(f=>`<div class="card rv"><div><h3>${f[0]}</h3><p class="mut">${f[1]}</p></div></div>`).join('')}</div>`,
tools:()=>`<h1>Tools</h1><div class="grid">
<div class="card"><div><h3>Color converter</h3><input data-t="hex" value="#4d7cff" aria-label="Hex color"><div class="sw" id="sw1" style="margin:.6rem 0"></div><output id="o1"></output></div></div>
<div class="card"><div><h3>Gradient generator</h3><input data-t="gr" type="color" value="#4d7cff" aria-label="From"><input data-t="gr" type="color" value="#7a5ac8" aria-label="To"><input data-t="gr" type="range" min="0" max="360" value="135" aria-label="Angle"><div class="sw" id="sw2" style="margin:.6rem 0"></div><output id="o2"></output></div></div>
<div class="card"><div><h3>Text tools</h3><textarea data-t="tx" aria-label="Text"></textarea><div class="row"><button data-act="case" data-m="u">UPPER</button><button data-act="case" data-m="l">lower</button><button data-act="case" data-m="t">Title</button></div><output id="o3">0 words · 0 characters</output></div></div>
<div class="card"><div><h3>JSON formatter</h3><textarea data-t="js" aria-label="JSON"></textarea><output id="o4">Paste JSON to validate.</output></div></div>
<div class="card"><div><h3>Aspect ratio</h3><input data-t="ar" id="aw" type="number" min="1" value="1920" aria-label="Width"><input data-t="ar" id="ah" type="number" min="1" value="1080" aria-label="Height"><output id="o5"></output></div></div>
<div class="card"><div><h3>Date and time</h3><output id="o6"></output></div></div></div>`,
updates:()=>`<h1>Updates</h1><p class="mut">Sample changelog — not connected to a real update service.</p><input id="uq" type="search" placeholder="Search updates" aria-label="Search updates"><div id="ul"></div>`,
about:()=>`<h1>About</h1><p class="lead">VANTORA explores how quiet, cinematic design can still be fast, accessible and fully under the user's control. Everything runs in your browser; every preference is yours to change, export or reset.</p>`,
credits:()=>{const S=window.VANTORA_SOCIAL||{};return`<section class="cr"><h1>Made By ForWarodH28</h1><p class="mut">Thanks for visiting VANTORA.</p><div class="soc">${Object.keys(S).map(k=>/^https?:\/\//.test(S[k])?`<a class="btn" href="${esc(S[k])}" target="_blank" rel="noopener noreferrer">${esc(k)}</a>`:`<span class="btn mut" aria-disabled="true">${esc(k)}: Link coming soon</span>`).join('')}</div><div class="row" style="justify-content:center"><button data-act="menu">Back to menu</button></div></section>`},
settings:()=>{const C=[...new Set(SET.map(s=>s.c))];return`<h1>Settings</h1><p class="lead">${SET.length} settings, saved automatically on this device.</p><input id="sq" type="search" placeholder="Search settings" aria-label="Search settings"><div class="row"><button data-act="exp">Export JSON</button><label class="btn">Import JSON<input type="file" id="imp" accept="application/json" hidden></label><button data-act="resetall">Reset all</button></div>${C.map(c=>`<details open><summary>${c}</summary><div class="row"><button data-act="rc" data-c="${c}">Reset ${c}</button></div>${SET.filter(s=>s.c==c).map(ctl).join('')}</details>`).join('')}`}};
function ctl(s){const v=cfg[s.k];const inp=s.t=='tog'?`<input type="checkbox" role="switch" data-k="${s.k}" ${v?'checked':''} aria-labelledby="l-${s.k}">`:s.t=='sel'?`<select data-k="${s.k}" aria-labelledby="l-${s.k}">${s.o.map(o=>`<option ${o==v?'selected':''}>${o}</option>`).join('')}</select>`:s.t=='col'?`<input type="color" data-k="${s.k}" value="${v}" aria-labelledby="l-${s.k}">`:`<input type="range" data-k="${s.k}" min="${s.o[0]}" max="${s.o[1]}" step="${s.o[2]}" value="${v}" aria-labelledby="l-${s.k}">`;
 return`<div class="set" data-s="${esc(s.n+' '+s.desc)}"><span id="l-${s.k}">${s.n}<span class="chg" data-c="${s.k}">${v!==s.d?'Changed':''}</span></span>${inp}<p>${s.desc}</p></div>`}
const hex2=h=>{h=h.replace('#','');if(h.length==3)h=[...h].map(c=>c+c).join('');return/^[0-9a-f]{6}$/i.test(h)?[0,2,4].map(i=>parseInt(h.substr(i,2),16)):null};
const hsl=([r,g,b])=>{r/=255;g/=255;b/=255;const M=Math.max(r,g,b),m=Math.min(r,g,b),l=(M+m)/2,d=M-m;let h=0,s=0;if(d){s=d/(1-Math.abs(2*l-1));h=M==r?((g-b)/d)%6:M==g?(b-r)/d+2:(r-g)/d+4;h=Math.round((h*60+360)%360)}return`hsl(${h}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)`};
function tool(t){const q=i=>$(i);try{
 if(t=='hex'){const c=hex2(q('[data-t=hex]').value),o=q('#o1');if(!c){o.textContent='Enter a valid hex like #4d7cff';return}q('#sw1').style.background=`rgb(${c})`;o.textContent=`rgb(${c.join(', ')})\n${hsl(c)}`}
 if(t=='gr'){const a=$$('[data-t=gr]'),css=`linear-gradient(${a[2].value}deg, ${a[0].value}, ${a[1].value})`;q('#sw2').style.background=css;q('#o2').textContent='background: '+css+';'}
 if(t=='tx'){const x=q('[data-t=tx]').value;q('#o3').textContent=`${(x.match(/\S+/g)||[]).length} words · ${x.length} characters`}
 if(t=='js'){const x=q('[data-t=js]').value,o=q('#o4');if(!x.trim()){o.textContent='Paste JSON to validate.';return}try{q('[data-t=js]').value=JSON.stringify(JSON.parse(x),null,2);o.textContent='Valid JSON.'}catch(e){o.textContent='Invalid JSON: '+e.message}}
 if(t=='ar'){const w=+q('#aw').value,h=+q('#ah').value,o=q('#o5');if(!(w>0&&h>0)){o.textContent='Enter positive numbers.';return}const g=(a,b)=>b?g(b,a%b):a,d=g(w,h);o.textContent=`${w/d}:${h/d} (${(w/h).toFixed(3)})`}}catch(e){}}
function upd(){const q=($('#uq')||{}).value.toLowerCase(),l=UPD.filter(u=>(u.v+u.c+u.t).toLowerCase().includes(q));$('#ul').innerHTML=l.length?l.map(u=>`<p class="card" style="padding:1rem;margin:.6rem 0"><b>v${u.v}</b> · ${u.d} · <b>${u.c}</b><br>${u.t}</p>`).join(''):'<p class="mut">No updates match your search.</p>'}
const dlg=$('#dlg');let lb=-1,vf=null;
const modal=h=>{dlg.innerHTML='<button class="x" data-act="close" aria-label="Close dialog">✕</button>'+h;if(!dlg.open)dlg.showModal()};
function showLb(i){lb=(i+list.length)%list.length;const x=list[lb]||ITEMS[lb];modal(`<img src="${x.img}" alt="${esc(x.cap)}" width="800" height="600">${cfg.caps?`<p><b>${esc(x.t)}</b> — ${esc(x.cap)}</p>`:''}<div class="lbn"><button data-act="prev">← Previous</button><button data-act="next">Next →</button></div>`)}
dlg.addEventListener('close',()=>{lb=-1;const v=$('video',dlg);if(v)v.pause();if(vf)vf.focus()});
dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
let io;function reveal(){io&&io.disconnect();io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});$$('.rv').forEach(n=>io.observe(n))}
function menu(open){document.body.classList.toggle('lock',open);root.classList.toggle('open',open);const b=$('#burger');b.setAttribute('aria-expanded',open);b.setAttribute('aria-label',open?'Close menu':'Open menu');$('#menu').inert=!open;if(open)$('#menu a').focus();else b.focus()}
function buildMenu(n){$('#menu').innerHTML=NAV.map(k=>`<a href="#/${k}" ${k==n?'aria-current="page"':''}>${k[0].toUpperCase()+k.slice(1)}</a>`).join('')}
function route(){const n=location.hash.replace(/^#\/?/,'')||'home',f=V[n];buildMenu(n);menu(false);$('#view').innerHTML=f?f():`<section class="cr"><h1>Page not found</h1><p class="mut">“${esc(n)}” doesn't exist.</p><a class="btn pri" href="#/home">Go home</a></section>`;document.title=(f?n[0].toUpperCase()+n.slice(1)+' · ':'404 · ')+'VANTORA';scrollTo(0,0);$('#view').focus({preventScroll:true});cat='All';if($('#grid'))draw();if($('#ul'))upd();if(n=='tools')['hex','gr','tx','ar'].forEach(tool),clock();reveal();if(f&&cfg.remember)try{localStorage.setItem(LAST,n)}catch(e){}}
let ck;function clock(){clearInterval(ck);const f=()=>{const o=$('#o6');if(!o)return clearInterval(ck);o.textContent=new Date().toLocaleString()};f();ck=setInterval(f,1000)}
const exp=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(cfg,null,2)],{type:'application/json'}));a.download='vantora-settings.json';a.click();URL.revokeObjectURL(a.href)};
const resetKeys=ks=>{SET.filter(s=>ks.includes(s.k)).forEach(s=>cfg[s.k]=s.d);save();apply();route();toast('Settings reset')};
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b){if(e.target.closest('#burger'))menu(!root.classList.contains('open'));if(e.target.closest('#top'))scrollTo({top:0});return}
 const a=b.dataset.act;vf=b;
 if(a=='close')dlg.close();else if(a=='lb'){if(!list.length)list=ITEMS;showLb(list.findIndex(x=>x.i==b.dataset.i))}else if(a=='prev')showLb(lb-1);else if(a=='next')showLb(lb+1);
 else if(a=='cat'){cat=b.dataset.c;$$('[data-act=cat]').forEach(x=>x.setAttribute('aria-pressed',x==b));draw()}
 else if(a=='vid'){const v=VIDEOS[b.dataset.i];modal(`<h3>${esc(v.t)}</h3>`+(v.src?`<video controls playsinline ${cfg.mute?'muted':''} ${cfg.loop?'loop':''} poster="${art(v.h)}" src="${esc(v.src)}"></video><p class="mut" id="ve" hidden>This video could not be loaded.</p>`:`<img src="${art(v.h)}" alt="Poster"><p class="mut">No video source configured. See README → Adding video.</p>`));const el=$('video',dlg);if(el)el.onerror=()=>{el.hidden=true;$('#ve').hidden=false}}
 else if(a=='sub'){const m=$('#em').value.trim();/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m)?toast('Looks valid. Demo only — nothing was sent.'):toast('Enter a valid email address.')}
 else if(a=='case'){const t=$('[data-t=tx]'),m=b.dataset.m;t.value=m=='u'?t.value.toUpperCase():m=='l'?t.value.toLowerCase():t.value.toLowerCase().replace(/(^|\s)\S/g,c=>c.toUpperCase())}
 else if(a=='menu'){menu(true)}else if(a=='exp'){exp();toast('Settings exported')}
 else if(a=='rc')resetKeys(SET.filter(s=>s.c==b.dataset.c).map(s=>s.k));
 else if(a=='resetall')modal('<h3>Reset all settings?</h3><p>This restores every default.</p><div class="row"><button data-act="close">Cancel</button><button class="pri" data-act="doreset">Reset all</button></div>');
 else if(a=='doreset'){dlg.close();resetKeys(SET.map(s=>s.k))}});
document.addEventListener('input',e=>{const t=e.target;if(t.dataset.k){const s=SET.find(x=>x.k==t.dataset.k);cfg[s.k]=s.t=='tog'?t.checked:s.t=='rng'?+t.value:t.value;save();apply();const c=$(`[data-c=${s.k}]`);if(c)c.textContent=cfg[s.k]!==s.d?'Changed':''}
 else if(t.dataset.t)tool(t.dataset.t);else if(t.id=='q')draw();else if(t.id=='uq')upd();else if(t.id=='sq')$$('.set').forEach(n=>n.hidden=!n.dataset.s.toLowerCase().includes(t.value.toLowerCase()))});
document.addEventListener('change',e=>{if(e.target.id!='imp'||!e.target.files[0])return;const r=new FileReader();r.onload=()=>{try{const j=JSON.parse(r.result);let n=0;if(!j||typeof j!='object'||Array.isArray(j))throw 0;for(const s of SET)if(s.k in j&&ok(s,j[s.k]))cfg[s.k]=j[s.k],n++;save();apply();route();toast(n?`Imported ${n} settings`:'No valid settings found in that file')}catch(x){toast('Import failed: not a valid settings file')}};r.readAsText(e.target.files[0])});
document.addEventListener('keydown',e=>{if(e.key=='Escape'&&root.classList.contains('open'))menu(false);if(lb>=0){if(e.key=='ArrowRight')showLb(lb+1);if(e.key=='ArrowLeft')showLb(lb-1)}});
addEventListener('hashchange',route);
if(matchMedia('(hover:hover)').matches)addEventListener('pointermove',e=>{if(cfg.glow&&cfg.motion){root.style.setProperty('--mx',e.clientX+'px');root.style.setProperty('--my',e.clientY+'px')}},{passive:true});
let tk=0;addEventListener('scroll',()=>{if(tk)return;tk=requestAnimationFrame(()=>{tk=0;const y=scrollY,h=document.body.scrollHeight-innerHeight;$('#prog').style.width=(h>0?y/h*100:0)+'%';$('#hd').classList.toggle('sc',y>40);$('#top').classList.toggle('on',y>600);const a=$('.hero-art');if(a&&cfg.parallax&&cfg.motion)a.style.transform=`translate3d(0,${y*.18}px,0)`})},{passive:true});
(function(){const c=$('#fx'),x=c.getContext('2d');let P=[],raf=0;const on=()=>cfg.motion&&cfg.particles&&cfg.canvas&&!cfg.simple&&!document.hidden;
 const seed=()=>{c.width=innerWidth;c.height=innerHeight;const n=cfg.pcount*(innerWidth<700||cfg.lowfx?.5:1);P=Array.from({length:n|0},()=>({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.4+.4,v:Math.random()+.2}))};
 const loop=()=>{raf=0;x.clearRect(0,0,c.width,c.height);if(!on())return;x.fillStyle='rgba(190,205,235,.5)';for(const p of P){p.y-=p.v*cfg.pspeed*.4;if(p.y<0){p.y=c.height;p.x=Math.random()*c.width}x.fillRect(p.x,p.y,p.r,p.r)}raf=requestAnimationFrame(loop)};
 window.kick=()=>{seed();if(!raf)raf=requestAnimationFrame(loop)};addEventListener('resize',seed);document.addEventListener('visibilitychange',window.kick)})();
apply();$('#menu').inert=true;
if(!location.hash&&cfg.remember){try{const l=localStorage.getItem(LAST);if(V[l])location.hash='#/'+l}catch(e){}}
route();setTimeout(()=>{const i=$('#intro');i&&i.remove()},1600);
})();
