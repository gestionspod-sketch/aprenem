/* Aprenem - làmina interactiva: el sistema nerviós (Medi, 6è)
   Part de l'app d'estudi. Vegeu CLAUDE.md i contingut/lamines/medi-base.js.
   Dibuix original: cap i cos de perfil amb l'encèfal, la medul·la espinal i els nervis, i una neurona augmentada.
   S'associa al tema md_nervios (contingut/medi-natural-6.js), que conserva la seva clau de progrés. */
lamReg('nervios',{nom:'El sistema nerviós',desc:'Encèfal, medul·la, nervis i neurones',ic:'brain',vb:'0 0 820 660',mw:640,fs:1.15,
 intro:'Toca cada part del sistema nerviós per saber què fa. A la dreta hi ha una neurona vista amb el microscopi.',llista:'Les parts del sistema nerviós',camp:'Nom de la part',
 pregunta:'Quina part del sistema nerviós',recorda:'Sistema nerviós central: encèfal (cervell, cerebel i tronc encefàlic) i medul·la espinal. Perifèric: els nervis.',
 parts:{
  cervell:{n:1,nom:'Cervell',p:[285,105],l:[190,80],s:'l',f:'És la part més grossa de l\'encèfal. Pensa, recorda, aprèn, sent les emocions i dona les ordres dels moviments voluntaris.',q:'pensa, recorda i dona les ordres dels moviments voluntaris'},
  cerebel:{n:2,nom:'Cerebel',p:[405,212],l:[490,200],s:'r',f:'És a la part de darrere i de baix del cap. Coordina els moviments i ens ajuda a mantenir l\'equilibri.',q:'coordina els moviments i ens ajuda a mantenir l\'equilibri'},
  tronc:{n:3,nom:'Tronc encefàlic',a:'tronc|bulb raquidi',p:[340,240],l:[190,250],s:'l',lv:1,f:'Uneix el cervell amb la medul·la. Controla les funcions automàtiques, com el batec del cor i la respiració.',q:'controla el batec del cor i la respiració sense que hi pensem'},
  medulla:{n:4,nom:'Medul·la espinal',a:'medul·la',p:[344,430],l:[490,420],s:'r',f:'Cordó nerviós que baixa per dins la columna vertebral. Porta els missatges entre l\'encèfal i el cos i controla els actes reflexos.',q:'baixa per dins la columna vertebral i controla els actes reflexos'},
  nervis:{n:5,nom:'Nervis',a:'nervi',p:[290,392],l:[190,400],s:'l',f:'Són el sistema nerviós perifèric. Els nervis sensitius porten la informació dels sentits; els motors porten les ordres als músculs.',q:'porten la informació dels sentits i les ordres als músculs'},
  neurona:{n:6,nom:'Neurona',a:'neurones|cèl·lula nerviosa',p:[602,392],l:[700,360],s:'r',f:'És la cèl·lula del sistema nerviós. Transmet missatges elèctrics (impulsos nerviosos) molt de pressa.',q:'és la cèl·lula que transmet els impulsos nerviosos'},
  dendrites:{n:7,nom:'Dendrites',a:'dendrita',p:[566,346],l:[700,312],s:'r',lv:1,f:'Són les branques curtes de la neurona. Reben els missatges d\'altres neurones.',q:'són les branques curtes de la neurona que reben els missatges'},
  axo:{n:8,nom:'Axó',p:[676,470],l:[730,470],s:'r',lv:1,f:'És la prolongació llarga de la neurona. Per ell surt el missatge cap a una altra neurona o cap a un múscul.',q:'és la prolongació llarga per on surt el missatge de la neurona'}},
 draw(H){const nerv=[300,345,395,445,495,545,595].map((y,i)=>`<path d="M343 ${y} Q300 ${y+8} ${262-(i%2)*6} ${y+34}M343 ${y} Q388 ${y+8} ${424+(i%2)*6} ${y+34}" fill="none" stroke="#F2B705" stroke-width="3.5" stroke-linecap="round"/>`).join('');
  const vert=Array.from({length:16},(_,i)=>`<rect x="328" y="${266+i*23}" width="30" height="19" rx="5" fill="#ECEFF1" stroke="#B0BEC5" stroke-width="1.5"/>`).join('');
  return`<rect x="250" y="285" width="190" height="370" rx="70" fill="#FFE3D3" stroke="#E0A88A" stroke-width="3"/>
 <rect x="300" y="250" width="80" height="60" fill="#FFE3D3"/><ellipse cx="330" cy="160" rx="128" ry="118" fill="#FFE3D3" stroke="#E0A88A" stroke-width="3"/>
 <path d="M206 150 L184 196 L210 200" fill="#FFE3D3" stroke="#E0A88A" stroke-width="3" stroke-linejoin="round"/><circle cx="238" cy="132" r="7" fill="#5D4037"/>
 ${vert}
 <g ${H('nervis')}>${nerv}<path d="M343 300 Q270 300 232 340" fill="none" stroke="#F2B705" stroke-width="3.5"/></g>
 <g ${H('medulla')}><rect x="336" y="258" width="15" height="390" rx="7" fill="#FFA726" stroke="#E65100" stroke-width="2"/></g>
 <g ${H('tronc')}><path d="M330 192 L354 192 L352 266 L334 266Z" fill="#BA68C8" stroke="#7B1FA2" stroke-width="2"/></g>
 <g ${H('cerebel')}><ellipse cx="390" cy="212" rx="40" ry="25" fill="#E57373" stroke="#B71C1C" stroke-width="2.5"/><path d="M358 206h62M356 214h68M362 222h56" stroke="#B71C1C" stroke-width="1.5"/></g>
 <g ${H('cervell')}><ellipse cx="322" cy="128" rx="100" ry="72" fill="#F8BBD0" stroke="#C2185B" stroke-width="3"/>
  <path d="M245 110q15-25 35-8t30-12 35 6 35-4M240 140q20-10 35 4t35-6 30 8 40-6M265 175q15-12 30 0t30-4 30 6M320 60q-6 30 6 60t-4 70" fill="none" stroke="#C2185B" stroke-width="2"/></g>
 <rect x="530" y="290" width="275" height="320" fill="#fff" stroke="#B0BEC5" stroke-width="2"/><text x="667" y="598" font-size="16" font-weight="700" text-anchor="middle" fill="#607D8B">Augmentat al microscopi</text>
 <g ${H('dendrites')}><path d="M590 375 L566 346 L548 332M566 346 L572 324M588 392 L554 398 L538 390M554 398 L544 414M596 410 L580 440 L568 452M612 372 L622 340 L616 326M622 340 L640 330" fill="none" stroke="#7E57C2" stroke-width="4" stroke-linecap="round"/></g>
 <g ${H('axo')}><path d="M622 400 C655 430 690 470 735 545" fill="none" stroke="#7E57C2" stroke-width="7" stroke-linecap="round"/><path d="M622 400 C655 430 690 470 735 545" fill="none" stroke="#D1C4E9" stroke-width="4" stroke-dasharray="16 7"/>
  <path d="M735 545 l22 14M735 545 l6 26M735 545 l-14 20" stroke="#7E57C2" stroke-width="4" stroke-linecap="round"/></g>
 <g ${H('neurona')}><circle cx="602" cy="392" r="25" fill="#9575CD" stroke="#5E35B1" stroke-width="3"/><circle cx="600" cy="390" r="9" fill="#4527A0"/></g>`}});
lamWrap('nervios','md_nervios');
// Icona de la làmina (IC es defineix a programa/icones.js, que es carrega després)
document.addEventListener('DOMContentLoaded',()=>{if(typeof ICO==='function')IC.brain=ICO('<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2 2 0 0 0-3-1Z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>')});
