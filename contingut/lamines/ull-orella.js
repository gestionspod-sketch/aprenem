/* Aprenem - làmina interactiva: l'ull i l'orella (Medi, 6è)
   Part de l'app d'estudi. Vegeu CLAUDE.md i contingut/lamines/medi-base.js.
   Dibuix original: tall de l'ull (amb el camí de la llum) i tall de l'orella (externa, mitjana i interna).
   S'associa al tema md_sentits (contingut/medi-natural-6.js), que conserva la seva clau de progrés. */
lamReg('sentits',{nom:'L\'ull i l\'orella',desc:'Com veim i com sentim',ic:'eye',vb:'0 0 1150 500',mw:860,fs:1.15,
 intro:'Segueix el camí de la llum dins l\'ull i el del so dins l\'orella. Toca cada part per saber què fa.',llista:'Les parts de l\'ull i de l\'orella',camp:'Nom de la part',
 pregunta:'Quina part de l\'ull o de l\'orella',recorda:'Llum: còrnia → pupil·la → cristal·lí → retina → nervi òptic. So: pavelló → conducte → timpà → ossets → cargol → nervi auditiu.',
 parts:{
  cornia:{n:1,nom:'Còrnia',p:[201,212],l:[150,130],s:'l',lv:1,f:'Capa transparent de la part de davant de l\'ull. Protegeix l\'ull i deixa entrar la llum.',q:'és la capa transparent de davant de l\'ull'},
  pupilla:{n:2,nom:'Pupil·la',a:'nineta',p:[241,240],l:[150,215],s:'l',f:'És el forat negre del centre de l\'ull per on entra la llum. Es fa petita quan hi ha molta llum i grossa quan n\'hi ha poca.',q:'és el forat per on entra la llum a l\'ull'},
  iris:{n:3,nom:'Iris',p:[240,280],l:[150,300],s:'l',f:'És la part de color de l\'ull (blava, verda, marró...). És un múscul que fa més gran o més petita la pupil·la.',q:'és la part de color que fa més gran o més petita la pupil·la'},
  cristalli:{n:4,nom:'Cristal·lí',p:[257,275],l:[150,385],s:'l',f:'És una lent transparent que enfoca la imatge sobre la retina, com la lent d\'una càmera de fotos.',q:'és la lent que enfoca la imatge sobre la retina'},
  retina:{n:5,nom:'Retina',p:[426,160],l:[480,95],s:'r',f:'És la capa del fons de l\'ull. Té cèl·lules sensibles a la llum, on es forma la imatge (al revés!).',q:'és la capa del fons de l\'ull on es forma la imatge'},
  nervi_optic:{n:6,nom:'Nervi òptic',a:'òptic',p:[492,250],l:[480,400],s:'r',f:'Porta la imatge de la retina fins al cervell, que la gira i ens la fa veure del dret.',q:'porta la imatge de l\'ull fins al cervell'},
  pavello:{n:7,nom:'Pavelló auditiu',a:'pavelló|orella externa|aurícula',p:[628,200],l:[660,70],s:'r',f:'És la part de fora de l\'orella, la que veim. Recull els sons com un embut.',q:'és la part de fora de l\'orella, que recull els sons'},
  conducte:{n:8,nom:'Conducte auditiu',a:'conducte|canal auditiu',p:[722,248],l:[690,440],s:'r',f:'És el tub que porta el so fins al timpà. Hi ha pèls i cera que atrapen la pols.',q:'és el tub que porta el so fins al timpà'},
  timpa:{n:9,nom:'Timpà',p:[773,232],l:[790,125],s:'r',f:'És una membrana prima com la pell d\'un tambor. Vibra quan hi arriba el so.',q:'és la membrana que vibra quan hi arriba el so'},
  ossets:{n:10,nom:'Ossets',a:'cadena d\'ossets|martell enclusa i estrep|martell, enclusa i estrep',p:[800,252],l:[830,395],s:'r',f:'Són tres ossos petitíssims: el martell, l\'enclusa i l\'estrep (el més petit del cos). Transmeten les vibracions del timpà a l\'orella interna.',q:'són els tres ossos petits que transmeten les vibracions del timpà'},
  cargol:{n:11,nom:'Cargol',a:'còclea',p:[900,282],l:[960,445],s:'r',f:'Té forma de closca de caragol i és ple de líquid. Transforma les vibracions en missatges nerviosos.',q:'té forma de closca i transforma les vibracions en missatges nerviosos'},
  canals:{n:12,nom:'Canals semicirculars',a:'conductes semicirculars',p:[880,198],l:[900,70],s:'r',lv:1,f:'Són tres tubs en forma d\'arc plens de líquid. No serveixen per sentir: ens ajuden a mantenir l\'equilibri.',q:'ens ajuden a mantenir l\'equilibri'},
  nervi_auditiu:{n:13,nom:'Nervi auditiu',a:'auditiu',p:[990,262],l:[1000,140],s:'r',f:'Porta els missatges del cargol fins al cervell, que els interpreta com a sons.',q:'porta els missatges del so fins al cervell'}},
 draw(H){return`<path d="M40 205 L245 228 L420 240 M40 275 L245 252 L420 240" fill="none" stroke="#FBC02D" stroke-width="2.5" stroke-dasharray="8 6"/>
 <circle cx="330" cy="240" r="125" fill="#FAFAFA" stroke="#90A4AE" stroke-width="4"/>
 <g ${H('retina')}><path d="M314 116 A125 125 0 0 1 314 364" fill="none" stroke="#E53935" stroke-width="9"/><path d="M425 160 A125 125 0 0 1 455 240" fill="none" stroke="#E53935" stroke-width="9"/></g>
 <g ${H('nervi_optic')}><path d="M452 232 C480 236 505 250 540 262 L536 278 C500 268 478 256 452 252Z" fill="#FFD54F" stroke="#F9A825" stroke-width="2"/></g>
 <g ${H('cornia')}><path d="M220 181 Q170 240 220 299" fill="#E1F5FE" stroke="#4FC3F7" stroke-width="5"/></g>
 <g ${H('cristalli')}><ellipse cx="257" cy="240" rx="15" ry="40" fill="#B3E5FC" stroke="#0288D1" stroke-width="2.5"/></g>
 <g ${H('iris')}><rect x="236" y="186" width="10" height="38" fill="#6D4C41"/><rect x="236" y="256" width="10" height="38" fill="#6D4C41"/></g>
 <g ${H('pupilla')}><rect x="236" y="224" width="10" height="32" fill="#263238"/></g>
 <text x="330" y="490" font-size="20" font-weight="800" text-anchor="middle" fill="#455A64">L'ull</text>
 <path d="M590 245 h40 M590 225 l40 10 M590 265 l40 -10" stroke="#81D4FA" stroke-width="2.5" stroke-dasharray="5 5"/>
 <g ${H('pavello')}><path d="M682 150 C612 130 598 228 640 258 C606 300 636 352 684 334 L676 268 L676 226Z" fill="#FFCCBC" stroke="#BF7A5A" stroke-width="3"/></g>
 <g ${H('conducte')}><path d="M674 226 L770 232 L770 264 L674 268Z" fill="#FFE0D2" stroke="#BF7A5A" stroke-width="2"/></g>
 <g ${H('timpa')}><ellipse cx="773" cy="248" rx="5" ry="24" fill="#F06292" stroke="#AD1457" stroke-width="2"/></g>
 <g ${H('ossets')}><circle cx="789" cy="238" r="8" fill="#FFF59D" stroke="#8D6E63" stroke-width="2"/><path d="M795 244 L808 256" stroke="#8D6E63" stroke-width="5"/><path d="M806 262 l12 -6 l4 10 l-12 4Z" fill="#FFF59D" stroke="#8D6E63" stroke-width="2"/></g>
 <g ${H('canals')}><circle cx="852" cy="205" r="18" fill="none" stroke="#81C784" stroke-width="7"/><circle cx="877" cy="188" r="17" fill="none" stroke="#66BB6A" stroke-width="7"/><circle cx="890" cy="214" r="15" fill="none" stroke="#43A047" stroke-width="7"/></g>
 <g ${H('cargol')}><path d="M870 278 m-32 0 a32 32 0 1 1 64 0 a26 26 0 1 1 -52 0 a20 20 0 1 1 40 0 a14 14 0 1 1 -28 0 a8 8 0 1 1 16 0" fill="none" stroke="#4DB6AC" stroke-width="7"/></g>
 <g ${H('nervi_auditiu')}><path d="M904 270 C940 262 960 250 1010 240 L1012 256 C966 266 944 276 906 286Z" fill="#FFD54F" stroke="#F9A825" stroke-width="2"/></g>
 <path d="M826 230 L838 260" stroke="#B0BEC5" stroke-width="3"/>
 <text x="830" y="490" font-size="20" font-weight="800" text-anchor="middle" fill="#455A64">L'orella</text>`}});
lamWrap('sentits','md_sentits');
document.addEventListener('DOMContentLoaded',()=>{if(typeof ICO==='function')IC.eye=ICO('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>')});
