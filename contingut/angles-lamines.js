/* Aprenem - ANGLÈS: làmines il·lustrades (diccionari visual) i material d'estudi
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes.

   Làmines originals (SVG + emoticones) inspirades en el format de les fitxes de vocabulari il·lustrat
   habituals de 6è: una escena amb números, mode «amb noms» / «sense noms (prova)», toc a cada element
   per veure la paraula, el català i sentir-la, i un tema d'exercicis per a cada làmina.
     en_lam_house  la casa (habitacions i mobles)      en_lam_town     la ciutat
     en_lam_body   el cos                              en_lam_clothes  la roba
     en_lam_weather el temps
   Material (pàgina d'Anglès): pronoms i possessius, preposicions de lloc amb dibuix, l'hora amb
   rellotge interactiu, dies, mesos, ordinals i dates.
   Es carrega després d'angles-a2.js (fa servir enAlt, enClock, enTimeMain, EN_ORD, EN_MONTHS, EN_DAYS). */
const ELAM={};
// Una part: {n, en:'paraula|alternativa', ca:'català|alternativa', p:[x,y], em (emoticona), fs (mida),
//   tag (etiqueta d'una zona: el text va a la dreta del número), l:[x,y] i s:'l'|'r' (etiqueta amb línia), ly (alçada del text), lv, ex (frase d'exemple)}
function elamSVG(id,{mode='labels',hi=null}={}){const L=ELAM[id],show=mode==='labels';
 const ps=Object.entries(L.parts).map(([k,r])=>{const[px,py]=r.p,fs=r.fs||L.fs||34,h=hi===k,en=r.en.split('|')[0];
  const lbl=(x,y,an)=>show?`<text x="${x}" y="${y}" text-anchor="${an}" class="lt" style="font-size:${L.lfs||14}px;paint-order:stroke;stroke:#fff;stroke-width:4px;stroke-linejoin:round${h?';fill:#1E3FD0':''}">${esc(en)}</text>`:'';
  const badge=(x,y)=>`<circle cx="${x}" cy="${y}" r="11" class="bd" style="${h?'fill:#1E3FD0':''}"/><text x="${x}" y="${y+4}" class="bn" text-anchor="middle">${r.n}</text>`;
  let g='';
  if(r.l){const[lx,ly]=r.l,left=r.s==='l',bx=left?lx+16:lx-16,x1=left?lx+27:lx-27;
   g=`<line x1="${x1}" y1="${ly-4}" x2="${px}" y2="${py}" class="ld" style="${h?'stroke:#1E3FD0;stroke-width:2':''}"/><circle cx="${px}" cy="${py}" r="3" class="pt"/>${badge(bx,ly-4)}${lbl(lx,ly,left?'end':'start')}`}
  else if(r.tag)g=`${badge(px,py)}${lbl(px+15,py+5,'start')}`;
  else g=`${r.em?`<text x="${px}" y="${py}" font-size="${fs}" text-anchor="middle" dominant-baseline="central"${h?' style="filter:drop-shadow(0 0 4px rgba(30,63,208,.95))"':''}>${r.em}</text>`:''}${badge(px-fs*.55,py-fs*.5)}${lbl(px,r.ly||py+fs*.5+14,'middle')}`;
  return`<g data-part="${k}">${g}</g>`}).join('');
 return`<svg class="lamsvg" viewBox="${L.vb}" style="max-width:${L.mw||620}px" role="img" aria-label="Làmina: ${esc(L.nom)}">${L.draw()}${ps}</svg>`}
const elamAns=r=>enAlt(r.en.split('|'));
function elamGen(id,lv){const L=ELAM[id],ids=Object.keys(L.parts).filter(k=>lv>0||!L.parts[k].lv),k=pick(ids),r=L.parts[k],en=r.en.split('|')[0],ca=r.ca.split('|'),ans=elamAns(r);
 const err=v=>{if(ans.includes(v[0]))return null;if(Object.entries(L.parts).some(([o,x])=>o!==k&&elamAns(x).includes(v[0])))return'en_lam_altre';return Math.min(...ans.map(a=>lev(v[0],a)))<=2?'en_lletrejat':null};
 const hl=[`Comença per «${en[0]}»${en.includes(' ')?` i són ${en.split(' ').length} paraules`:` i té ${en.length} lletres`}.`,en.split(' ').map(x=>x[0]+' _'.repeat(Math.max(0,x.length-1))).join('   ')];
 const ro=Math.random();
 if(ro<.6)return{text:`Observa la làmina. <b>What's number ${r.n}?</b> Escriu-ho en anglès.`,fig:elamSVG(id,{mode:'numbers',hi:k}),fields:[{label:'En anglès',txt:ans,wide:en.includes(' ')}],vis:null,pron:en,
  hints:[`En català és «${ca[0]}».`,hl[0]],steps:[`El número ${r.n} és <b>${esc(r.en.split('|').join(' / '))}</b> (${ca.join(' / ')}).`,r.ex?`Exemple: <i>${r.ex}</i>`:'Digues-ho en veu alta tres vegades.'],err};
 if(lv===0||ro<.85)return{text:`${r.em?`<div style="font-size:56px;line-height:1.2">${r.em}</div>`:''}Com es diu «<b>${esc(ca.join(' / '))}</b>» en anglès?`,fields:[{label:'En anglès',txt:ans,wide:en.includes(' ')}],vis:null,pron:en,
  hints:hl,steps:[`«${ca[0]}» en anglès és <b>${esc(r.en.split('|').join(' / '))}</b>.`,r.ex?`Exemple: <i>${r.ex}</i>`:'Escriu-la una vegada al quadern.'],err};
 return{text:`Què vol dir «<b>${esc(en)}</b>»?`,fields:[{label:'En català',txt:ca.map(norm),loose:true,wide:true}],vis:null,pron:en,
  hints:[`Comença per «${ca[0][0].toUpperCase()}».`,`Té ${[...ca[0]].length} lletres.`],steps:[`«${en}» vol dir <b>${ca.join(' / ')}</b>.`]}}
function elamScreen(id){endSession();const L=ELAM[id];let mode='labels',hi=null;const ids=Object.keys(L.parts).sort((a,b)=>L.parts[a].n-L.parts[b].n);
 app(`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><div class="eyebrow" style="color:var(--s-angles)">Làmina · Anglès</div><h2>${L.nom}</h2><p class="muted">${L.intro}</p></div><button class="ghost" onclick="subject('angles')">← Tornar</button></div>
 <div class="lam"><div class="card lam-fig"><div class="tabs" style="margin:0 0 12px"><button id="lm1" class="on">Amb noms</button><button id="lm2">Sense noms (posa't a prova)</button></div><div id="lsvg"></div></div>
 <div><div class="card" id="linfo"></div>
 <div class="row"><button id="la">Aprendre el tema</button><button class="sec" id="lp">Practicar amb la làmina</button></div></div></div>`);
 const info=()=>{const r=hi&&L.parts[hi];
  $('#linfo').innerHTML=r?`<div class="eyebrow" style="color:var(--s-angles)">Número ${r.n} de ${ids.length}</div>
   <h3 style="margin:4px 0 6px;font-size:28px">${mode==='labels'?`${r.em?r.em+' ':''}${esc(r.en.split('|').join(' / '))}`:'What\'s this?'}</h3>
   <p style="margin:0">${mode==='labels'?`En català: <b>${r.ca.split('|').join(' / ')}</b>${r.ex?`<br><i>${r.ex}</i>`:''}`:'Mode prova: digues la paraula en anglès en veu alta i després canvia a «Amb noms» per comprovar-ho.'}</p>
   <div class="row" style="margin-top:12px"><button class="sec" id="lsay" style="min-height:42px;padding:8px 14px">🔊 Escoltar</button><a href="#" id="lall" style="align-self:center">Veure la llista</a></div>`
  :`<h3 style="margin-top:0">${L.llista}</h3><ol class="steps" style="margin:0;columns:2;column-gap:18px">${ids.map(k=>`<li><a href="#" data-go="${k}">${mode==='labels'?esc(L.parts[k].en.split('|')[0]):'Número '+L.parts[k].n}</a></li>`).join('')}</ol>`;
  $('#linfo').querySelectorAll('[data-go]').forEach(a=>a.onclick=e=>{e.preventDefault();hi=a.dataset.go;draw()});
  const all=$('#lall');if(all)all.onclick=e=>{e.preventDefault();hi=null;draw()};
  const s=$('#lsay');if(s)s.onclick=()=>say(r.ex&&mode==='labels'?r.ex:r.en.split('|')[0],.85,'en-GB')};
 const draw=()=>{$('#lsvg').innerHTML=elamSVG(id,{mode,hi});$('#lsvg').querySelectorAll('[data-part]').forEach(g=>g.onclick=()=>{hi=g.dataset.part;draw();if(mode==='labels')say(L.parts[hi].en.split('|')[0],.85,'en-GB')});info()};
 $('#lm1').onclick=()=>{mode='labels';$('#lm1').className='on';$('#lm2').className='';draw()};
 $('#lm2').onclick=()=>{mode='numbers';$('#lm2').className='on';$('#lm1').className='';draw()};
 $('#la').onclick=()=>start('professor',[L.skill],15);$('#lp').onclick=()=>start('exercicis',[L.skill],15);draw()}
function elamReg(id,def){ELAM[id]=def;def.skill='en_lam_'+id;
 const rows=Object.values(def.parts).sort((a,b)=>a.n-b.n).map(r=>`<tr><td>${r.n}</td><td>${r.em?r.em+' ':''}<b>${esc(r.en.split('|').join(' / '))}</b></td><td>${r.ca.split('|').join(' / ')}</td></tr>`).join('');
 SK[def.skill]={mat:'angles',ab:def.ab,curs:[6],bloc:'Vocabulari i comprensió',nom:'Làmina: '+def.nom.toLowerCase(),fig:()=>elamSVG(id),
  teoria:[def.teoria,'Mira la làmina, toca cada número i digues la paraula en veu alta. Després tapa-la i prova de recordar-la.',`<table class="mini"><tr><th>Núm.</th><th>Anglès</th><th>Català</th></tr>${rows}</table>`],
  gen(lv){return elamGen(id,lv)}};
 (LAMINES.angles=LAMINES.angles||[]).push({obre:`elamScreen('${id}')`,nom:def.nom,desc:def.desc,ic:def.ic})}
Object.assign(ERR,{en_lam_altre:{kid:'Aquesta paraula és d\'una altra cosa de la làmina. Mira bé quin número és.',par:'Confon paraules del mateix camp (vocabulari de la làmina)'}});

/* ================= La casa ================= */
elamReg('house',{nom:'La casa (The house)',desc:'Habitacions i mobles, amb números',ic:'grid',ab:'Ho',vb:'0 0 640 420',mw:640,llista:'Parts de la casa',
 intro:'Toca cada número per veure com es diu en anglès i sentir-ho.',teoria:'Per parlar de casa teva: <i>There are three bedrooms. The sofa is in the living room.</i>',
 draw:()=>`<rect width="640" height="420" fill="#E8F4FF"/><rect y="380" width="640" height="40" fill="#9BD48B"/>
  <rect x="380" y="45" width="30" height="70" fill="#B4485F"/><polygon points="40,132 260,30 480,132" fill="#E25563"/>
  <rect x="60" y="130" width="400" height="250" fill="#FFF6E8" stroke="#C9A27E" stroke-width="3"/><path d="M60 255h400M260 130v250" stroke="#C9A27E" stroke-width="3"/>
  <rect x="185" y="150" width="44" height="38" fill="#BFE3FF" stroke="#7A4E22" stroke-width="3"/><path d="M207 150v38M185 169h44" stroke="#7A4E22" stroke-width="2"/>
  <rect x="62" y="298" width="20" height="82" fill="#A0652E"/><circle cx="77" cy="340" r="2.5" fill="#FFD54A"/>
  <rect x="300" y="336" width="80" height="7" fill="#8D5A2B"/><rect x="306" y="343" width="6" height="36" fill="#8D5A2B"/><rect x="368" y="343" width="6" height="36" fill="#8D5A2B"/>
  <rect x="420" y="282" width="34" height="97" fill="#F8FAFC" stroke="#94A3B8" stroke-width="2"/><path d="M420 312h34M448 290v16M448 320v20" stroke="#94A3B8" stroke-width="2"/>`,
 parts:{roof:{n:1,en:'roof',ca:'teulada',p:[260,98],ly:121,ex:'The roof is red.'},chimney:{n:2,en:'chimney',ca:'xemeneia',p:[395,78],ly:38,lv:1,ex:'There\'s smoke coming out of the chimney.'},
  window:{n:3,en:'window',ca:'finestra',p:[207,169],ly:204,ex:'Open the window, please.'},door:{n:4,en:'door|front door',ca:'porta',p:[72,340],ly:292,ex:'Close the door, please.'},
  bedroom:{n:5,en:'bedroom',ca:'dormitori|habitació|cambra',p:[76,146],tag:1,ex:'My bedroom is upstairs.'},bed:{n:6,en:'bed',ca:'llit',p:[128,212],em:'🛏️',fs:40,ex:'I go to bed at nine o\'clock.'},
  bathroom:{n:7,en:'bathroom',ca:'bany|cambra de bany',p:[276,146],tag:1,ex:'The bathroom is next to my bedroom.'},bath:{n:8,en:'bath|bathtub',ca:'banyera',p:[312,214],em:'🛁',fs:38},
  shower:{n:9,en:'shower',ca:'dutxa',p:[382,186],em:'🚿',fs:32,ex:'I have a shower every morning.'},toilet:{n:10,en:'toilet',ca:'vàter|wàter|inodor',p:[432,222],em:'🚽',fs:30},
  living:{n:11,en:'living room|sitting room|lounge',ca:'menjador|sala d\'estar|saló',p:[96,272],tag:1,ex:'We watch TV in the living room.'},sofa:{n:12,en:'sofa|couch',ca:'sofà',p:[122,345],em:'🛋️',fs:38},
  tv:{n:13,en:'television|TV',ca:'televisió|tele',p:[215,345],em:'📺',fs:34},picture:{n:14,en:'picture|painting',ca:'quadre',p:[118,302],em:'🖼️',fs:28,lv:1},
  clock:{n:15,en:'clock',ca:'rellotge',p:[214,298],em:'🕰️',fs:28},kitchen:{n:16,en:'kitchen',ca:'cuina',p:[276,272],tag:1,ex:'Dad is cooking in the kitchen.'},
  table:{n:17,en:'table',ca:'taula',p:[340,355],fs:30,ly:372},chair:{n:18,en:'chair',ca:'cadira',p:[398,352],em:'🪑',fs:30},fridge:{n:19,en:'fridge',ca:'nevera|gelera|frigorífic',p:[437,330],fs:28,ly:276,ex:'The milk is in the fridge.'},
  garden:{n:20,en:'garden',ca:'jardí|hort',p:[500,404],tag:1,ex:'We play in the garden.'},tree:{n:21,en:'tree',ca:'arbre',p:[565,318],em:'🌳',fs:56},flowers:{n:22,en:'flowers|flower',ca:'flors|flor',p:[512,360],em:'🌷',fs:26}}});

/* ================= La ciutat ================= */
const EL_B=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" stroke="#fff" stroke-width="3"/>`;
elamReg('town',{nom:'La ciutat (The town)',desc:'Edificis, carrer i transport',ic:'map',ab:'To',vb:'0 0 640 440',mw:640,llista:'Llocs i coses de la ciutat',fs:36,
 intro:'Toca cada número per veure com es diu en anglès i sentir-ho.',teoria:'Per dir on són els llocs: <i>The bank is next to the school. The hospital is opposite the park.</i>',
 draw:()=>`<rect width="640" height="440" fill="#EAF6FF"/>${[['#FFE1A8'],['#FFD6D6'],['#D9E8FF'],['#E3F0D2'],['#FBE3C4'],['#E6DDF7']].map((c,i)=>EL_B(14+i*103,28,96,120,c[0])).join('')}
  ${['#FCE7F3','#FEF3C7','#E0F2FE','#F1F5F9','#EDE9FE'].map((c,i)=>EL_B(14+i*103,166,96,110,c)).join('')}<rect x="529" y="166" width="96" height="110" fill="#BFE6A8" stroke="#fff" stroke-width="3"/>
  <rect y="296" width="640" height="64" fill="#7C8796"/><path d="M0 328h640" stroke="#fff" stroke-width="3" stroke-dasharray="22 16"/>
  ${[0,1,2,3,4,5].map(i=>`<rect x="${296+i*9}" y="296" width="5" height="64" fill="#fff"/>`).join('')}<rect y="360" width="640" height="80" fill="#E5E7EB"/>`,
 parts:{school:{n:1,en:'school',ca:'escola|col·legi',p:[62,82],em:'🏫',ex:'I go to school by bus.'},hospital:{n:2,en:'hospital',ca:'hospital',p:[165,82],em:'🏥'},
  library:{n:3,en:'library',ca:'biblioteca',p:[268,82],em:'📚',ex:'You can borrow books at the library.'},bank:{n:4,en:'bank',ca:'banc',p:[371,82],em:'🏦'},
  post:{n:5,en:'post office',ca:'oficina de correus|correus',p:[474,82],em:'🏤',lv:1},supermarket:{n:6,en:'supermarket',ca:'supermercat',p:[577,82],em:'🛒'},
  cinema:{n:7,en:'cinema|movie theater',ca:'cinema',p:[62,212],em:'🎬',ex:'Let\'s go to the cinema!'},restaurant:{n:8,en:'restaurant',ca:'restaurant',p:[165,212],em:'🍽️'},
  hotel:{n:9,en:'hotel',ca:'hotel',p:[268,212],em:'🏨',lv:1},church:{n:10,en:'church',ca:'església',p:[371,212],em:'⛪'},museum:{n:11,en:'museum',ca:'museu',p:[474,212],em:'🏛️',lv:1},
  park:{n:12,en:'park',ca:'parc',p:[577,212],em:'🌳',ex:'The children are playing in the park.'},road:{n:13,en:'road|street',ca:'carretera|carrer',p:[230,312],tag:1},
  crossing:{n:14,en:'zebra crossing|pedestrian crossing|crosswalk',ca:'pas de vianants|pas de zebra',p:[318,312],tag:1,lv:1,ex:'Cross the street at the zebra crossing.'},
  lights:{n:15,en:'traffic lights',ca:'semàfor|semàfors',p:[440,385],em:'🚦',fs:30,ex:'Stop at the traffic lights.'},bus:{n:16,en:'bus',ca:'autobús|bus',p:[110,330],em:'🚌',fs:38},
  car:{n:17,en:'car',ca:'cotxe',p:[540,330],em:'🚗',fs:36},bike:{n:18,en:'bike|bicycle',ca:'bicicleta|bici',p:[590,392],em:'🚲',fs:32},
  stop:{n:19,en:'bus stop',ca:'parada d\'autobús|parada de l\'autobús',p:[50,392],em:'🚏',fs:32},fountain:{n:20,en:'fountain',ca:'font',p:[200,392],em:'⛲',fs:32,lv:1},
  police:{n:21,en:'police officer|policeman|policewoman',ca:'policia',p:[320,392],em:'👮',fs:32}}});

/* ================= El cos ================= */
elamReg('body',{nom:'El cos (The body)',desc:'Les parts del cos, amb números',ic:'target',ab:'Bo',vb:'0 0 600 470',mw:560,llista:'Parts del cos',lfs:15,
 intro:'Toca cada número per veure la part del cos en anglès i sentir-la.',teoria:'Per descriure i dir què et fa mal: <i>She\'s got long hair. My knee hurts.</i> En plural: one foot → two <b>feet</b>, one tooth → two <b>teeth</b>.',
 draw:()=>{const sk='#F6D5C0',ln='#C9A27E';return`<rect width="600" height="470" fill="#FFF8F0"/>
  <path d="M248 150 L215 225 L200 292" fill="none" stroke="${sk}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/><path d="M352 150 L385 225 L400 292" fill="none" stroke="${sk}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="199" cy="300" r="14" fill="${sk}" stroke="${ln}"/><circle cx="401" cy="300" r="14" fill="${sk}" stroke="${ln}"/><path d="M394 310v14M400 312v16M406 312v15M412 308v12" stroke="${sk}" stroke-width="5" stroke-linecap="round"/>
  <path d="M270 330 L268 390 L264 440" fill="none" stroke="${sk}" stroke-width="26" stroke-linecap="round"/><path d="M330 330 L332 390 L336 440" fill="none" stroke="${sk}" stroke-width="26" stroke-linecap="round"/>
  <ellipse cx="254" cy="450" rx="24" ry="11" fill="${sk}" stroke="${ln}"/><ellipse cx="346" cy="450" rx="24" ry="11" fill="${sk}" stroke="${ln}"/>${[0,1,2,3].map(i=>`<circle cx="${358+i*-6}" cy="${443-i*.5}" r="3.2" fill="#F2C2A6" stroke="${ln}" stroke-width=".8"/>`).join('')}
  <path d="M245 145 L355 145 L362 292 L238 292 Z" fill="#4A90D9"/><rect x="238" y="288" width="124" height="48" fill="#2E3B66"/>
  <rect x="290" y="120" width="20" height="28" fill="${sk}"/><ellipse cx="255" cy="86" rx="8" ry="13" fill="${sk}" stroke="${ln}"/><ellipse cx="345" cy="86" rx="8" ry="13" fill="${sk}" stroke="${ln}"/>
  <circle cx="300" cy="82" r="45" fill="${sk}" stroke="${ln}" stroke-width="2"/><path d="M255 78 Q256 32 300 32 Q344 32 345 78 Q332 52 300 54 Q268 52 255 78Z" fill="#6B4226"/>
  <circle cx="284" cy="84" r="4.5" fill="#1E293B"/><circle cx="316" cy="84" r="4.5" fill="#1E293B"/><path d="M300 88 l-4 10 h7" fill="none" stroke="${ln}" stroke-width="2"/><path d="M287 106 Q300 115 313 106" fill="none" stroke="#B4485F" stroke-width="3" stroke-linecap="round"/>`},
 parts:{hair:{n:1,en:'hair',ca:'cabells|pèl|cabell',p:[290,40],l:[180,34],s:'l',ex:'She\'s got long brown hair.'},head:{n:2,en:'head',ca:'cap',p:[335,60],l:[430,40],s:'r',ex:'I\'ve got a headache: my head hurts.'},
  eye:{n:3,en:'eye|eyes',ca:'ull|ulls',p:[284,84],l:[180,82],s:'l',ex:'He\'s got blue eyes.'},ear:{n:4,en:'ear|ears',ca:'orella|orelles',p:[347,90],l:[430,92],s:'r'},
  nose:{n:5,en:'nose',ca:'nas',p:[299,96],l:[180,122],s:'l'},mouth:{n:6,en:'mouth',ca:'boca',p:[306,110],l:[430,138],s:'r'},
  neck:{n:7,en:'neck',ca:'coll',p:[296,136],l:[180,162],s:'l'},shoulder:{n:8,en:'shoulder|shoulders',ca:'espatlla|espatlles|muscle',p:[350,152],l:[450,184],s:'r',lv:1},
  arm:{n:9,en:'arm|arms',ca:'braç|braços',p:[230,195],l:[130,212],s:'l'},elbow:{n:10,en:'elbow',ca:'colze',p:[385,225],l:[470,232],s:'r',lv:1},
  stomach:{n:11,en:'stomach|tummy|belly',ca:'panxa|estómac|ventre',p:[305,250],l:[470,272],s:'r'},hand:{n:12,en:'hand|hands',ca:'mà|mans',p:[195,302],l:[120,300],s:'l'},
  finger:{n:13,en:'fingers|finger',ca:'dits|dit',p:[406,322],l:[480,318],s:'r'},leg:{n:14,en:'leg|legs',ca:'cama|cames',p:[268,370],l:[150,368],s:'l'},
  knee:{n:15,en:'knee',ca:'genoll',p:[333,390],l:[470,382],s:'r',ex:'I fell and hurt my knee.'},foot:{n:16,en:'foot|feet',ca:'peu|peus',p:[245,452],l:[150,442],s:'l',ex:'One foot, two feet.'},
  toes:{n:17,en:'toes|toe',ca:'dits dels peus|dit del peu',p:[352,443],l:[470,440],s:'r',lv:1}}});

/* ================= La roba ================= */
const EL_CL=[['tshirt','T-shirt|tshirt|t shirt','camiseta','👕'],['shirt','shirt','camisa','👔'],['jeans','jeans|trousers','texans|pantalons texans|pantalons','👖'],['dress','dress','vestit','👗'],['coat','coat|jacket','abric|jaqueta','🧥'],
 ['scarf','scarf','bufanda','🧣'],['gloves','gloves','guants','🧤'],['socks','socks','calcetins|mitjons','🧦'],['shorts','shorts','pantalons curts','🩳'],['swimsuit','swimsuit|swimming costume|bathing suit','banyador','🩱'],
 ['cap','cap','gorra','🧢'],['hat','hat','barret','👒'],['glasses','glasses','ulleres','👓'],['sunglasses','sunglasses','ulleres de sol','🕶️'],['watch','watch','rellotge de polsera|rellotge','⌚'],
 ['shoes','shoes','sabates','👞'],['trainers','trainers|sneakers','sabatilles d\'esport|bambes|vambes','👟'],['boots','boots','botes','👢'],['sandals','sandals','sandàlies','👡'],['bag','bag|handbag','bossa|bolso','👜']];
elamReg('clothes',{nom:'La roba (Clothes)',desc:'L\'armari: roba, calçat i complements',ic:'layers',ab:'Cl',vb:'0 0 620 430',mw:620,llista:'Roba i complements',fs:46,
 intro:'Toca cada peça de roba per veure com es diu en anglès i sentir-ho.',teoria:'Per dir què portes: <i>I\'m wearing a red T-shirt and jeans.</i> Algunes paraules sempre van en plural: <b>jeans, trousers, shorts, glasses</b> (<i>My jeans <b>are</b> new</i>).',
 draw:()=>`<rect x="6" y="6" width="608" height="418" fill="#F3E6D6" stroke="#9A6B3F" stroke-width="6"/><path d="M14 34h592" stroke="#9A6B3F" stroke-width="5"/>${[0,1,2,3,4].map(i=>`<path d="M${70+i*120} 34v18" stroke="#64748B" stroke-width="2"/>`).join('')}<path d="M14 135h592M14 235h592M14 335h592" stroke="#E2CDB4" stroke-width="3"/>`,
 parts:Object.fromEntries(EL_CL.map(([k,en,ca,em],i)=>[k,{n:i+1,en,ca,em,p:[70+(i%5)*120,80+Math.floor(i/5)*100],lv:['swimsuit','sunglasses','sandals','scarf','gloves'].includes(k)?1:0}]))});
ELAM.clothes.parts.tshirt.ex='I\'m wearing a blue T-shirt.';ELAM.clothes.parts.jeans.ex='My jeans are new.';ELAM.clothes.parts.trainers.ex='Put on your trainers for PE.';

/* ================= El temps ================= */
const EL_W=[['sunny','sunny','fa sol|assolellat|sol','☀️','#BFE6FF'],['cloudy','cloudy','ennuvolat|nuvolat|està ennuvolat','☁️','#D7DEE8'],['rainy','rainy|raining','plou|plujós|plujós','🌧️','#B9C6D6'],['snowy','snowy|snowing','neva|nevat','🌨️','#E6EEF8'],
 ['windy','windy','fa vent|ventós','🌬️','#CDEBF2'],['stormy','stormy','hi ha tempesta|tempestuós|tempesta','⛈️','#9AA6B8'],['foggy','foggy','fa boira|hi ha boira|boirós','🌫️','#E2E2E2'],['hot','hot','fa calor|calor','🥵','#FFD9A8'],
 ['cold','cold','fa fred|fred','🥶','#D3E4FF'],['rainbow','rainbow','arc de Sant Martí|arc iris','🌈','#DDF1FF'],['lightning','lightning','llamp|llampec','⚡','#C9C2E8'],['temperature','temperature','temperatura','🌡️','#FFE4E4']];
elamReg('weather',{nom:'El temps (The weather)',desc:'Quin temps fa? Sol, pluja, vent...',ic:'globe',ab:'We',vb:'0 0 620 420',mw:620,llista:'El temps',fs:48,lfs:16,
 intro:'Toca cada quadre per veure com es diu el temps que fa i sentir-ho.',teoria:'Per dir quin temps fa: <i>What\'s the weather like? — <b>It\'s</b> sunny / cloudy / windy.</i> També: <i>It\'s raining. It\'s snowing.</i>',
 draw:()=>EL_W.map((w,i)=>`<rect x="${12+(i%4)*152}" y="${12+Math.floor(i/4)*135}" width="144" height="126" fill="${w[4]}"/>`).join(''),
 parts:Object.fromEntries(EL_W.map(([k,en,ca,em],i)=>[k,{n:i+1,en,ca,em,p:[84+(i%4)*152,64+Math.floor(i/4)*135],ly:117+Math.floor(i/4)*135,lv:['lightning','temperature','foggy'].includes(k)?1:0,
  ex:{sunny:'It\'s sunny today.',cloudy:'It\'s cloudy.',rainy:'It\'s raining. Take an umbrella!',snowy:'It\'s snowing!',windy:'It\'s windy.',stormy:'It\'s stormy.',foggy:'It\'s foggy.',hot:'It\'s very hot.',cold:'It\'s cold. Put on your coat.',rainbow:'Look! A rainbow!',lightning:'There\'s thunder and lightning.',temperature:'The temperature is 25 degrees.'}[k]}]))});

/* ================= Material d'estudi ================= */
const EM_HEAD=(t,sub)=>`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><div class="eyebrow" style="color:var(--s-angles)">Material · Anglès</div><h2>${t}</h2><p class="muted">${sub}</p></div><button class="ghost" onclick="subject('angles')">← Tornar</button></div>`;
const EM_TBL=(h,rows)=>`<div class="tablewrap"><table class="mini"><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</table></div>`;
const EM_PRAC=(ks,t)=>`<div class="row" style="margin-top:6px">${ks.map(([k,l])=>`<button class="sec" onclick="start('exercicis',['${k}'],15)">${l}</button>`).join('')}</div>`;
function enMatPronoms(){endSession();
 app(`${EM_HEAD('Pronoms i possessius','Qui fa l\'acció, a qui, de qui és.')}
 <div class="card">${EM_TBL(['Subjecte<br><small>fa l\'acció</small>','Complement<br><small>després del verb</small>','Possessiu<br><small>+ nom</small>','Pronom possessiu<br><small>sense nom</small>','En català'],
  [['I','me','my','mine','jo · em · el meu'],['you','you','your','yours','tu · et · el teu'],['he','him','his','his','ell · el · el seu (d\'ell)'],['she','her','her','hers','ella · la · el seu (d\'ella)'],['it','it','its','—','ell/ella (cosa, animal) · el seu'],['we','us','our','ours','nosaltres · ens · el nostre'],['you','you','your','yours','vosaltres · us · el vostre'],['they','them','their','theirs','ells/elles · els · el seu (d\'ells)']].map(r=>r.map((x,i)=>i<4?`<b>${x}</b>`:x)))}</div>
 <div class="card"><h3>Exemples</h3><p><i><b>She</b> likes <b>me</b>.</i> (Ella m'aprecia.) · <i>This is <b>my</b> bike. It's <b>mine</b>.</i> · <i>Is this <b>your</b> pencil? — No, it's <b>his</b>.</i></p>
 <p><b>De qui és?</b> Amb noms de persona fem servir <b>'s</b>: <i>Laura<b>'s</b> bike</i> (la bici de la Laura). En plural acabat en -s, només l'apòstrof: <i>my parents<b>'</b> car</i>.</p>
 <p style="margin-bottom:0"><b>Compte!</b> <i>its</i> (possessiu) no porta apòstrof; <i>it's</i> vol dir «it is». I els pronoms possessius tampoc: <i>hers, yours, ours, theirs</i>.</p></div>
 ${EM_PRAC([['en_poss','Practicar possessius'],['en_want_obj','Practicar me, him, us...']])}`)}
const EM_PREP=[['in','dins','<rect x="40" y="40" width="80" height="60" fill="#C98B4B" stroke="#7A4E22" stroke-width="3"/><circle cx="80" cy="80" r="14" fill="#E25563"/><rect x="40" y="62" width="80" height="38" fill="#C98B4B" fill-opacity=".85"/>'],
 ['on','damunt','<rect x="40" y="58" width="80" height="50" fill="#C98B4B" stroke="#7A4E22" stroke-width="3"/><circle cx="80" cy="43" r="14" fill="#E25563"/>'],
 ['under','davall · sota','<rect x="30" y="40" width="100" height="10" fill="#8D5A2B"/><rect x="36" y="50" width="8" height="58" fill="#8D5A2B"/><rect x="116" y="50" width="8" height="58" fill="#8D5A2B"/><circle cx="80" cy="94" r="14" fill="#E25563"/>'],
 ['next to','al costat de','<rect x="30" y="50" width="70" height="56" fill="#C98B4B" stroke="#7A4E22" stroke-width="3"/><circle cx="122" cy="92" r="14" fill="#E25563"/>'],
 ['behind','darrere','<circle cx="96" cy="50" r="14" fill="#E25563"/><rect x="40" y="52" width="80" height="56" fill="#C98B4B" stroke="#7A4E22" stroke-width="3"/>'],
 ['in front of','davant','<rect x="40" y="40" width="80" height="56" fill="#C98B4B" stroke="#7A4E22" stroke-width="3"/><circle cx="80" cy="92" r="17" fill="#E25563"/>'],
 ['between','entre','<rect x="14" y="52" width="48" height="56" fill="#C98B4B" stroke="#7A4E22" stroke-width="3"/><rect x="98" y="52" width="48" height="56" fill="#C98B4B" stroke="#7A4E22" stroke-width="3"/><circle cx="80" cy="94" r="14" fill="#E25563"/>'],
 ['above','per damunt (sense tocar)','<rect x="40" y="70" width="80" height="40" fill="#C98B4B" stroke="#7A4E22" stroke-width="3"/><circle cx="80" cy="30" r="14" fill="#E25563"/><path d="M70 52h20M74 58h12" stroke="#94A3B8" stroke-width="2"/>'],
 ['opposite','davant per davant · enfront','<rect x="10" y="20" width="44" height="40" fill="#FFD6D6" stroke="#B4485F" stroke-width="2"/><rect x="0" y="62" width="160" height="22" fill="#7C8796"/><rect x="106" y="86" width="44" height="34" fill="#D9E8FF" stroke="#3B6FD6" stroke-width="2"/><text x="32" y="46" font-size="18" text-anchor="middle">🏦</text><text x="128" y="110" font-size="18" text-anchor="middle">🏫</text>'],
 ['near','a prop de','<rect x="20" y="56" width="60" height="50" fill="#C98B4B" stroke="#7A4E22" stroke-width="3"/><circle cx="112" cy="92" r="14" fill="#E25563"/><path d="M84 100h12" stroke="#94A3B8" stroke-width="2" stroke-dasharray="3 3"/>']];
function enMatPrep(){endSession();
 app(`${EM_HEAD('Preposicions de lloc','On és la pilota? Mira cada dibuix.')}
 <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px">${EM_PREP.map(([en,ca,d])=>`<div class="card" role="button" tabindex="0" style="margin:0;text-align:center;cursor:pointer" onclick="say('The ball is ${en} the box.',.85,'en-GB')"><svg viewBox="0 0 160 120" width="100%" style="max-width:160px" role="img" aria-label="${en}">${d}</svg><b style="display:block;font-size:22px;color:var(--s-angles)">${en}</b><small class="muted">${ca}</small></div>`).join('')}</div>
 <div class="card" style="margin-top:14px"><p style="margin:0">Exemple: <i>The ball is <b>under</b> the table.</i> Per preguntar: <i><b>Where</b> is the ball? — It's <b>next to</b> the box.</i> Toca un dibuix per sentir la frase.</p></div>
 ${EM_PRAC([['en_prep','Practicar preposicions']])}`)}
function enMatHora(){endSession();let h=3,m=15;
 app(`${EM_HEAD('L\'hora en anglès','Mou les busques i mira com es diu.')}
 <div class="lam"><div class="card" style="text-align:center"><div id="hclk"></div><div style="font-size:34px;font-weight:800;margin:6px 0" id="hdig"></div><div style="font-size:24px" id="hwd"></div>
  <div class="row" style="justify-content:center;margin-top:12px"><button class="sec" id="hm1">− 1 h</button><button class="sec" id="hm5">− 5 min</button><button class="sec" id="hp5">+ 5 min</button><button class="sec" id="hp1">+ 1 h</button></div>
  <div class="row" style="justify-content:center"><button class="sec" id="hrnd">Una hora a l'atzar</button><button class="sec" id="hsay">🔊 Escoltar</button></div></div>
 <div><div class="card"><h3 style="margin-top:0">Com es diu</h3>${EM_TBL(['Rellotge','Anglès','Català'],[['3:00','three <b>o\'clock</b>','les tres en punt'],['3:05','five <b>past</b> three','les tres i cinc'],['3:15','(a) <b>quarter past</b> three','les tres i quart'],['3:30','<b>half past</b> three','les tres i mitja'],['3:40','twenty <b>to</b> four','les quatre menys vint'],['3:45','(a) <b>quarter to</b> four','tres quarts de quatre']])}
  <p style="margin-bottom:0">Busca llarga a la <b>dreta</b> → <b>past</b> · a l'<b>esquerra</b> → <b>to</b> + l'hora següent.<br>Per preguntar: <i>What time is it?</i> · Per dir quan: <i>at</i> six o'clock.</p></div>
  ${EM_PRAC([['en_time','Practicar l\'hora']])}</div></div>`);
 const draw=()=>{$('#hclk').innerHTML=enClock(h,m,220);$('#hdig').textContent=`${h}:${String(m).padStart(2,'0')}`;$('#hwd').innerHTML=`It's <b>${enTimeMain(h,m)}</b>.`};
 const add=d=>{let t=((h%12)*60+m+d+720)%720;h=Math.floor(t/60)||12;m=t%60;draw()};
 $('#hm1').onclick=()=>add(-60);$('#hp1').onclick=()=>add(60);$('#hm5').onclick=()=>add(-5);$('#hp5').onclick=()=>add(5);
 $('#hrnd').onclick=()=>{h=1+Math.floor(Math.random()*12);m=5*Math.floor(Math.random()*12);draw()};$('#hsay').onclick=()=>say(`It's ${enTimeMain(h,m)}.`,.85,'en-GB');draw()}
function enMatDates(){endSession();
 app(`${EM_HEAD('Dies, mesos i dates','Sempre amb majúscula: Monday, May.')}
 <div class="lam"><div class="card"><h3 style="margin-top:0">Days · Dies</h3>${EM_TBL(['Anglès','Català'],EN_DAYS.map(([e,c])=>[`<b>${e}</b>`,c]))}
  <h3>Months · Mesos</h3>${EM_TBL(['Anglès','Català'],EN_MONTHS.map(([e,c])=>[`<b>${e}</b>`,c]))}</div>
 <div><div class="card"><h3 style="margin-top:0">Ordinals (1st - 31st)</h3><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:4px 12px;font-size:15px">${EN_ORD.slice(1).map((o,i)=>`<span><b>${i+1}${['th','st','nd','rd'][(i+1)%100>=11&&(i+1)%100<=13?0:(i+1)%10]||'th'}</b> ${o}</span>`).join('')}</div></div>
 <div class="card"><h3 style="margin-top:0">Com es diu una data</h3><p>Escrivim <b>12th May</b> (o May 12th) i llegim <i>the twelfth of May</i>.</p><p><i>When's your birthday? — It's <b>on</b> the 3rd of June.</i></p>
  <p style="margin-bottom:0"><b>in</b> + mes o any (<i>in May, in 2026</i>) · <b>on</b> + dia o data (<i>on Monday, on 3rd June</i>) · <b>at</b> + hora (<i>at five o'clock</i>).</p></div>
 ${EM_PRAC([['en_dates','Practicar dates'],['en_prep_t','Practicar in / on / at']])}</div></div>`)}
MATERIAL.angles.push({obre:'enMatPronoms()',ic:'grid',nom:'Pronoms i possessius',desc:'I, me, my, mine... i el genitiu \'s'},{obre:'enMatPrep()',ic:'map',nom:'Preposicions de lloc',desc:'In, on, under, between... amb dibuixos'},
 {obre:'enMatHora()',ic:'target',nom:'L\'hora en anglès',desc:'Rellotge interactiu: past, to, o\'clock'},{obre:'enMatDates()',ic:'list',nom:'Dies, mesos i dates',desc:'Majúscules, ordinals i com es diu una data'});
