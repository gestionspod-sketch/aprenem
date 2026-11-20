/* Aprenem - làmina interactiva: el sistema solar, i el tema «L'Univers i el sistema solar» (Medi, 6è)
   Part de l'app d'estudi. Vegeu CLAUDE.md i contingut/lamines/medi-base.js.
   Dibuix original (les mides dels planetes són aproximades i les distàncies no són a escala). */
const PLANETES=[['mercuri','Mercuri',190,6,'#B0A9A0',1],['venus','Venus',250,11,'#E8C07D',0],['terra','Terra',315,12,'#4A90D9',1],['mart','Mart',375,8,'#D2603A',0],
 ['jupiter','Júpiter',500,40,'#D9A066',1],['saturn','Saturn',640,32,'#E5C88F',0],['ura','Urà',760,20,'#8FD3E0',1],['neptu','Neptú',870,19,'#4C6FD8',0]];
const PL_INFO={mercuri:['És el planeta més petit i el més proper al Sol. No té atmosfera: de dia crema i de nit es gela.','és el planeta més proper al Sol'],
 venus:['És el planeta més calent, per l\'efecte hivernacle de la seva atmosfera. Des de la Terra es veu molt brillant: li diuen l\'estel del matí.','és el planeta més calent, que veim brillar al cel com un estel'],
 terra:['El nostre planeta. És l\'únic on sabem que hi ha vida, gràcies a l\'aigua líquida i a l\'atmosfera amb oxigen. Té un satèl·lit: la Lluna.','és l\'únic planeta on sabem que hi ha vida'],
 mart:['El planeta vermell, pel ferro rovellat de la seva terra. Té el volcà més alt del sistema solar i dos satèl·lits petits.','és el planeta vermell'],
 jupiter:['El planeta més gran: hi cabrien més de 1.000 Terres. És un gegant de gas amb una gran taca vermella, que és una tempesta enorme.','és el planeta més gran del sistema solar'],
 saturn:['Gegant de gas famós pels seus anells, fets de trossos de gel i roca.','és el planeta dels anells grossos de gel i roca'],
 ura:['Gegant de gel de color blau verdós. Gira tombat, com una pilota que rodola.','és el gegant de gel que gira tombat'],
 neptu:['El planeta més llunyà del Sol. És un gegant de gel blau, amb els vents més forts del sistema solar.','és el planeta més llunyà del Sol']};
lamReg('solar',{nom:'El sistema solar',desc:'El Sol, els vuit planetes i els asteroides',ic:'planet',vb:'0 0 1000 400',mw:900,fs:1.5,
 intro:'El Sol i els vuit planetes, en ordre. Les mides són aproximades i les distàncies no són a escala (en realitat són moltíssim més grans!).',llista:'El Sol i els planetes',camp:'Nom',que:'l\'astre',
 pregunta:'Quin astre del sistema solar',recorda:'Ordre dels planetes: Mercuri, Venus, Terra, Mart, Júpiter, Saturn, Urà i Neptú.',
 parts:Object.assign({sol:{n:1,nom:'Sol',p:[50,345],l:[50,345],s:'c',f:'És una estrella: una bola enorme de gas molt calent que fa llum i calor. És al centre del sistema solar i tots els planetes hi giren al voltant.',q:'és l\'estrella del centre del sistema solar'}},
  Object.fromEntries(PLANETES.map(([k,nom,x,r,c,top],i)=>[k,{n:i+2,nom,p:[x,top?62:282],l:[x,top?62:282],s:'c',f:PL_INFO[k][0],q:PL_INFO[k][1]}])),
  {asteroides:{n:10,nom:'Cinturó d\'asteroides',a:'asteroides|cinturó|cinturó principal',p:[432,345],l:[432,345],s:'c',lv:1,f:'Milers de roques que giren al voltant del Sol entre Mart i Júpiter. Separa els planetes rocosos (interiors) dels gegants gasosos (exteriors).',q:'és el conjunt de roques que hi ha entre Mart i Júpiter'}}),
 draw(H){const orb=PLANETES.map(([,,x])=>`<circle cx="-40" cy="180" r="${x+40}" fill="none" stroke="#CFD8DC" stroke-width="1.5" stroke-dasharray="4 6"/>`).join('');
  const ast=Array.from({length:40},(_,i)=>{const a=(i*37%100)/100*1.2-.6,r=468+(i*53%30);return`<circle cx="${(-40+r*Math.cos(a)).toFixed(1)}" cy="${(180+r*Math.sin(a)).toFixed(1)}" r="${1.5+i%3}" fill="#8D8D8D"/>`}).join('');
  return`<rect x="0" y="0" width="1000" height="400" fill="#0E1A33"/>${orb}
 <g ${H('sol')}><circle cx="-40" cy="180" r="130" fill="#FFC107"/><circle cx="-40" cy="180" r="112" fill="#FFD54F"/></g>
 <g ${H('asteroides')}>${ast}</g>
 ${PLANETES.map(([k,,x,r,c])=>`<g ${H(k)}>${k==='saturn'?`<ellipse cx="${x}" cy="180" rx="${r*1.9}" ry="${r*.45}" fill="none" stroke="#C9B27C" stroke-width="7"/>`:''}<circle cx="${x}" cy="180" r="${r}" fill="${c}"/>${k==='jupiter'?`<path d="M${x-36} 168h72M${x-38} 190h76" stroke="#B5794A" stroke-width="5"/><ellipse cx="${x+12}" cy="196" rx="8" ry="5" fill="#C0392B"/>`:''}${k==='terra'?`<path d="M${x-5} ${180-8}q6 4 2 9t5 6" fill="none" stroke="#5DBB63" stroke-width="4"/>`:''}</g>`).join('')}
 <circle cx="336" cy="166" r="3.5" fill="#E0E0E0"/>`}});
// Tema: l'Univers i el sistema solar
function md_universGen(lv){const t=Math.random();
 if(t<.4){const i=rnd(0,7),P=PLANETES[i];
  if(Math.random()<.5)return{text:`Quin planeta ocupa el lloc número <b>${i+1}</b> començant a comptar des del Sol?`,fields:[{label:'Planeta',txt:[P[1]],loose:true,wide:true}],vis:null,
   hints:['Recorda l\'ordre: Mercuri, Venus, Terra, Mart, Júpiter, Saturn, Urà, Neptú.',`Comença per «${P[1][0]}».`],steps:[PLANETES.map((p,j)=>`${j+1}. ${j===i?'<b>'+p[1]+'</b>':p[1]}`).join(', '),`El número ${i+1} és <b>${P[1]}</b>.`],
   err:v=>PLANETES.some(p=>p!==P&&fold(p[1])===fold(v[0]))?'md_planetes':null};
  return{text:`Quin lloc ocupa <b>${P[1]}</b> en l'ordre dels planetes, començant a comptar des del Sol?`,fields:[{label:'Lloc (nombre)',ans:R(i+1)}],vis:null,
   hints:['Recorda l\'ordre: Mercuri, Venus, Terra, Mart, Júpiter, Saturn, Urà, Neptú.','Compta amb els dits des de Mercuri.'],steps:[PLANETES.map((p,j)=>`${j+1}. ${j===i?'<b>'+p[1]+'</b>':p[1]}`).join(', '),`${P[1]} és el planeta número <b>${i+1}</b>.`]}}
 if(t<.7){const n=lv>0?rnd(3,12):rnd(2,7);
  return{text:`La Terra tarda <b>24 hores</b> a fer una volta sobre si mateixa (rotació). Quantes hores tarda a fer-ne <b>${n}</b>?`,fields:[{label:'Hores',ans:R(24*n)}],vis:null,
   hints:['Cada volta sobre si mateixa és un dia: 24 hores.',`Multiplica 24 × ${n}.`],steps:[`Una rotació = 24 hores.`,`24 × ${n} = ${24*n}.`,`${n} rotacions són <b>${24*n} hores</b>, és a dir, ${n} dies.`],err:v=>req(v[0],R(24+n))?'md_rotacio':null}}
 const a=lv>0?rnd(2,9):rnd(2,4),d=365*a;
 return{text:`La Terra tarda uns <b>365 dies</b> a fer una volta al voltant del Sol (translació). Quants dies tarda, més o menys, a fer-ne <b>${a}</b>? (No tenguis en compte els anys de traspàs.)`,fields:[{label:'Dies',ans:R(d)}],vis:null,
  hints:['Cada volta al voltant del Sol és un any: 365 dies.',`Multiplica 365 × ${a}.`],steps:[`Una translació = 365 dies (un any).`,`365 × ${a} = ${d}.`,`${a} voltes són <b>${d} dies</b>.`],err:v=>req(v[0],R(365+a))?'md_rotacio':null}}
SK.md_univers=lamSkill('solar',{nom:'L\'Univers i el sistema solar',ab:'Us',errT:'md_planetes',gen:md_universGen,pGen:.35,pBank:.4,
 teoria:['L\'<b>Univers</b> és tot el que existeix: milers de milions de <b>galàxies</b>. Una galàxia és un grup enorme d\'estrelles, planetes, gas i pols. La nostra és la <b>Via Làctia</b>, de forma espiral.','Les <b>estrelles</b> són astres que fan llum pròpia. El <b>Sol</b> és l\'estrella més propera. Els <b>planetes</b> giren al voltant d\'una estrella i no fan llum: reflecteixen la del Sol. Els <b>satèl·lits</b> giren al voltant d\'un planeta (la <b>Lluna</b> és el satèl·lit de la Terra).','El <b>sistema solar</b> té 8 planetes: els <b>interiors o rocosos</b> (Mercuri, Venus, Terra i Mart) i els <b>exteriors o gegants gasosos</b> (Júpiter, Saturn, Urà i Neptú). Entre Mart i Júpiter hi ha el <b>cinturó d\'asteroides</b>. També hi ha planetes nans (com Plutó) i cometes.','<b>Moviments de la Terra</b>: la <b>rotació</b> (una volta sobre si mateixa en 24 hores) fa el <b>dia i la nit</b>; la <b>translació</b> (una volta al Sol en 365 dies i 6 hores) fa l\'<b>any</b>. Com que l\'eix de la Terra és inclinat, hi ha les <b>estacions</b>. Cada 4 anys hi ha un any de <b>traspàs</b> (366 dies).','La Lluna canvia d\'aspecte: són les <b>fases</b> (nova, quart creixent, plena, quart minvant). Hi ha un <b>eclipsi de Sol</b> quan la Lluna es posa entre el Sol i la Terra, i un <b>eclipsi de Lluna</b> quan la Terra es posa entre el Sol i la Lluna.','La Terra té capes: la <b>geosfera</b> (escorça, mantell i nucli), la <b>hidrosfera</b> (l\'aigua) i l\'<b>atmosfera</b> (l\'aire). On hi ha vida en diem <b>biosfera</b>. Mira la làmina:'],
 bank:mkBank([['Com es diu la galàxia on vivim?','Via Làctia','Té nom de llet.','La <b>Via Làctia</b> és una galàxia espiral.','Andròmeda'],
  ['Quants planetes té el sistema solar?','8|vuit','Plutó ja no compta: és un planeta nan.','El sistema solar té <b>8 planetes</b>.','9'],
  ['Com es diu el moviment de la Terra sobre si mateixa, que fa el dia i la nit?','rotació','Dura 24 hores.','La <b>rotació</b> fa el dia i la nit.','translació'],
  ['Com es diu el moviment de la Terra al voltant del Sol, que dura un any?','translació','Dura 365 dies i 6 hores.','La <b>translació</b> fa l\'any; amb la inclinació de l\'eix, fa les estacions.','rotació'],
  ['Com es diu un astre que gira al voltant d\'un planeta, com la Lluna?','satèl·lit|satèl·lit natural','La Lluna ho és de la Terra.','La <b>Lluna</b> és el <b>satèl·lit</b> natural de la Terra.','planeta|estrella'],
  ['Com es diu un astre que fa llum pròpia, com el Sol?','estrella|estel','De nit en veim moltes al cel.','El Sol és una <b>estrella</b>.','planeta|satèl·lit'],
  ['Com es diu el conjunt enorme d\'estrelles, planetes, gas i pols, com la Via Làctia?','galàxia','N\'hi ha milers de milions.','Una <b>galàxia</b> té milers de milions d\'estrelles.','constel·lació'],
  ['Com es diu l\'eclipsi que passa quan la Lluna es posa entre el Sol i la Terra?','eclipsi de Sol|eclipsi solar|de Sol','La Lluna tapa el Sol.','En un <b>eclipsi de Sol</b>, la Lluna tapa el Sol.','eclipsi de Lluna|eclipsi lunar'],
  ['Com es diu l\'eclipsi que passa quan la Terra es posa entre el Sol i la Lluna?','eclipsi de Lluna|eclipsi lunar|de Lluna','L\'ombra de la Terra tapa la Lluna.','En un <b>eclipsi de Lluna</b>, l\'ombra de la Terra cau sobre la Lluna.','eclipsi de Sol|eclipsi solar'],
  ['Quants dies té un any de traspàs?','366|tres-cents seixanta-sis','En té un més que un any normal.','Cada 4 anys, el febrer té 29 dies i l\'any en té <b>366</b>.','365'],
  ['Com es diu la capa d\'aire que envolta la Terra?','atmosfera','Ens protegeix i té l\'oxigen que respiram.','L\'<b>atmosfera</b> és la capa de gasos que envolta la Terra.','hidrosfera|geosfera'],
  ['Com es diu la capa d\'aigua de la Terra (mars, rius, gel...)?','hidrosfera','«Hidro» vol dir aigua.','La <b>hidrosfera</b> és tota l\'aigua del planeta.','atmosfera|geosfera'],
  ['Com es diu la capa més externa i prima de la geosfera, on vivim?','escorça|escorça terrestre','És com la pell de la Terra.','La geosfera té tres capes: <b>escorça</b>, mantell i nucli.','mantell|nucli',1],
  ['Com es diu un astre de gel i pols que, quan s\'acosta al Sol, fa una cua brillant?','cometa','Té una cua llarguíssima.','Els <b>cometes</b> són boles de gel i pols.','asteroide|meteorit',1],
  ['Quina fase de la Lluna veim quan està tota il·luminada?','lluna plena|plena','És rodona del tot.','A la <b>lluna plena</b> la veim sencera.','lluna nova',1]])});
Object.assign(ERR,{md_planetes:{kid:'Compte! Has dit un altre planeta o un altre astre. Repassa l\'ordre: Mercuri, Venus, Terra, Mart, Júpiter, Saturn, Urà, Neptú.',par:'Confon els planetes, el seu ordre o els moviments i les capes de la Terra'},
 md_rotacio:{kid:'Has sumat! Si cada volta dura el mateix temps, per saber-ne unes quantes has de multiplicar.',par:'Suma en lloc de multiplicar en problemes de rotació i translació'}});
document.addEventListener('DOMContentLoaded',()=>{if(typeof ICO==='function')IC.planet=ICO('<circle cx="12" cy="12" r="5.5"/><path d="M4 16c-2 2-2 3-1 3.5 2 1 7-1.5 11.5-5S21 6 20 5.5 17 5.5 15 7"/>')});
