/* Aprenem - LENGUA CASTELLANA 6è: LÀMINES I MATERIAL D'ESTUDI
   Làmines interactives (SVG): «La oración y sus complementos», «Las reglas de acentuación» i «La comunicación».
   Cada làmina: amb noms / sense noms (posa't a prova, amb resposta escrita), toc a cada part per veure què és, i
   preguntes «quin és el número N?» que també surten als exercicis dels temes relacionats.
   Material (fitxes resum): reglas de ortografía, recursos literarios con ejemplos, tipos de texto y conectores
   (la taula de conjugació és a castella.js).
   Fitxes i làmines originals, pensades a partir de l'estructura habitual de les fitxes de repàs de 6è (esquemes de
   l'oració, quadres d'accentuació, taules de recursos): no s'hi copia cap material amb drets.
   Es carrega després dels altres arxius de Castellà (fa servir els seus temes i dades).
   Part de l'app d'estudi. Vegeu CLAUDE.md i la capçalera de contingut/castella.js (fonts). */
(()=>{
const A=CS.A,F=CS.first;
const COL={azul:'#2563EB',teal:'#0891B2',rojo:'#DC2626',verde:'#16A34A',lila:'#9333EA',naranja:'#EA580C',gris:'#475569',marino:'#121C4D'};
// Caixa clicable d'una part: títol (amb noms) o número (sense noms) + línies de text
function box(o,mode,hi,n){const{x,y,w,h,c}=o,on=hi===o.id,fs=o.fs||14,lh=fs+4;
 const head=mode==='labels'?`<text x="${x+9}" y="${y+17}" font-size="11" font-weight="800" fill="${c}" letter-spacing=".6">${o.t}</text>`
  :`<circle cx="${x+w-15}" cy="${y+15}" r="10.5" fill="${on?'#1E3FD0':c}"/><text x="${x+w-15}" y="${y+19.5}" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">${n}</text>`;
 return`<g class="part${on?' hi':''}" data-part="${o.id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" fill-opacity="${on?.2:.09}" stroke="${on?'#1E3FD0':c}" stroke-width="${on?3.5:2}"/>${head}${(o.l||[]).map((s,i)=>`<text x="${x+9}" y="${y+(o.top||36)+i*lh}" font-size="${fs}" font-weight="${o.fw||600}" fill="#0F172A">${s}</text>`).join('')}</g>`}

/* ---------- làmina 1: l'oració ---------- */
const ORA=[{s:'Mi abuela',v:'regaló',cd:'un cuento',cdP:'lo',ci:'a mi hermano',cc:'ayer por la tarde',ccT:'tiempo',ccQ:'¿cuándo?'},
 {s:'Los alumnos de sexto',v:'escribieron',cd:'una carta',cdP:'la',ci:'al alcalde',cc:'en clase',ccT:'lugar',ccQ:'¿dónde?'},
 {s:'El cartero',v:'entregó',cd:'un paquete',cdP:'lo',ci:'a la vecina',cc:'con mucho cuidado',ccT:'modo',ccQ:'¿cómo?'},
 {s:'Mis padres',v:'compraron',cd:'unas zapatillas',cdP:'las',ci:'a mi prima',cc:'en el mercado',ccT:'lugar',ccQ:'¿dónde?'}];
const LAM={
 oracion:{nom:'La oración y sus complementos',desc:'Sujeto, predicado, verbo, CD, CI y CC en un esquema',ic:'layers',skill:'cs_complementos',vb:'0 0 360 445',
  intro:'Toca cada caja para ver qué función tiene. Cambia de oración para practicar con otras.',ctx:()=>pick(ORA),
  frase:S=>`${S.s} ${S.v} ${S.cd} ${S.ci} ${S.cc}.`,pregunta:'Quina funció té el número',
  parts:{sujeto:{n:1,nom:'sujeto',a:()=>'el sujeto',f:S=>`Es de quien se dice algo. Pregunta al verbo: ¿quién ${S.v}? → <b>${S.s}</b>. Si lo cambias de número, el verbo también cambia.`},
   predicado:{n:2,nom:'predicado',a:()=>'el predicado|predicado verbal',f:S=>`Es todo lo que se dice del sujeto: <b>${S.v} ${S.cd} ${S.ci} ${S.cc}</b>. Su núcleo es el verbo.`},
   verbo:{n:3,nom:'núcleo del predicado',a:()=>'verbo|el verbo|núcleo|nucleo|el núcleo del predicado',f:S=>`«<b>${S.v}</b>» es el verbo conjugado: el núcleo del predicado. Concuerda con el sujeto en persona y número.`},
   cd:{n:4,nom:'complemento directo',a:()=>'cd|c d|objeto directo|el complemento directo',f:S=>`Responde a «¿qué ${S.v}?» → <b>${S.cd}</b>. Se sustituye por <b>${S.cdP}</b>: «${CS.cap(S.cdP)} ${S.v} ${S.ci}».`},
   ci:{n:5,nom:'complemento indirecto',a:()=>'ci|c i|objeto indirecto|el complemento indirecto',f:S=>`Es quien recibe la acción: <b>${S.ci}</b>. Se sustituye por <b>le</b>: «Le ${S.v} ${S.cd}».`},
   cc:{n:6,nom:'complemento circunstancial',a:S=>`cc|c c|circunstancial|el complemento circunstancial|complemento circunstancial de ${S.ccT}|cc de ${S.ccT}`,f:S=>`Indica una circunstancia de <b>${S.ccT}</b> (responde a ${S.ccQ}): <b>${S.cc}</b>.`}},
  draw(mode,hi,S){const P=this.parts,b=(o)=>box(o,mode,hi,P[o.id].n),ys=[165,235,305,375];
   return`<rect x="95" y="6" width="170" height="34" fill="${COL.marino}"/><text x="180" y="28" text-anchor="middle" font-size="13" font-weight="800" fill="#fff" letter-spacing="1">ORACIÓN</text>
   <path d="M150 40 105 70M210 40 280 70M280 130v18H28v${ys[3]+29-148}" fill="none" stroke="#94A3B8" stroke-width="2"/>${ys.map(y=>`<path d="M28 ${y+29}h22" stroke="#94A3B8" stroke-width="2"/>`).join('')}
   ${b({id:'sujeto',x:8,y:70,w:194,h:60,c:COL.azul,t:'SUJETO',l:[S.s],fs:15})}${b({id:'predicado',x:210,y:70,w:142,h:60,c:COL.teal,t:'PREDICADO',l:['verbo + complementos'],fs:12,fw:500})}
   ${b({id:'verbo',x:50,y:ys[0],w:302,h:58,c:COL.rojo,t:'NÚCLEO DEL PREDICADO (VERBO)',l:[S.v],fs:15})}${b({id:'cd',x:50,y:ys[1],w:302,h:58,c:COL.verde,t:'COMPLEMENTO DIRECTO',l:[S.cd],fs:15})}
   ${b({id:'ci',x:50,y:ys[2],w:302,h:58,c:COL.lila,t:'COMPLEMENTO INDIRECTO',l:[S.ci],fs:15})}${b({id:'cc',x:50,y:ys[3],w:302,h:58,c:COL.naranja,t:'COMPLEMENTO CIRCUNSTANCIAL',l:[S.cc],fs:15})}`}},

/* ---------- làmina 2: l'accentuació ---------- */
 acento:{nom:'Las reglas de acentuación',desc:'Agudas, llanas, esdrújulas, hiatos y tilde diacrítica en un cuadro',ic:'grid',skill:'cs_acentuacion',vb:'0 0 360 432',
  intro:'Toca cada caja para ver la regla con más ejemplos.',ctx:()=>null,pregunta:'Com es diu (o com es diuen les paraules) del número',
  parts:{tonica:{n:1,nom:'sílaba tónica',a:()=>'tónica|la sílaba tónica',f:()=>'Es la sílaba que suena más fuerte. Para encontrarla, di la palabra en voz alta y da una palmada en cada sílaba: ca-<b>mión</b>, <b>ár</b>-bol, <b>mú</b>-si-ca.'},
   aguda:{n:2,nom:'agudas',a:()=>'aguda|palabras agudas',f:()=>'La sílaba tónica es la <b>última</b>. Llevan tilde si acaban en <b>vocal, -n o -s</b>: café, sofá, camión, inglés. Sin tilde: reloj, ciudad, color.'},
   llana:{n:3,nom:'llanas',a:()=>'llana|graves|grave|palabras llanas',f:()=>'La sílaba tónica es la <b>penúltima</b>. Llevan tilde si <b>no</b> acaban en vocal, -n o -s: árbol, lápiz, fácil, césped. Sin tilde: casa, examen, joven.'},
   esdrujula:{n:4,nom:'esdrújulas',a:()=>'esdrújula|esdrujulas|palabras esdrújulas',f:()=>'La sílaba tónica es la <b>antepenúltima</b>. Llevan tilde <b>siempre</b>: música, pájaro, plátano, teléfono.'},
   sobres:{n:5,nom:'sobresdrújulas',a:()=>'sobresdrújula|sobreesdrújulas|sobreesdrújula',f:()=>'La tónica está antes de la antepenúltima. Llevan tilde <b>siempre</b>: cuéntamelo, dígaselo, explícaselo.'},
   hiato:{n:6,nom:'hiato',a:()=>'hiatos|el hiato|tilde del hiato|acentuación de hiatos',f:()=>'Si la <b>i</b> o la <b>u</b> son tónicas y están junto a <b>a, e, o</b>, se separan en sílabas distintas y llevan tilde <b>siempre</b>: río, maíz, búho, día, policía.'},
   diacritica:{n:7,nom:'tilde diacrítica',a:()=>'diacrítica|acento diacrítico|la tilde diacrítica',f:()=>'Distingue palabras que se escriben igual: <b>tú</b> (pronombre) / tu (posesivo), <b>él</b> / el, <b>sí</b> / si, <b>mí</b> / mi, <b>más</b> / mas, <b>té</b> / te, <b>sé</b> / se, <b>dé</b> / de.'}},
  draw(mode,hi){const P=this.parts,b=o=>box(o,mode,hi,P[o.id].n),col=(id,x,t,c,l)=>b({id,x,y:80,w:110,h:178,c,t,l,fs:11.5,fw:600,top:38});
   return`${b({id:'tonica',x:8,y:6,w:344,h:60,c:COL.marino,t:'SÍLABA TÓNICA',l:['la que suena más fuerte: ca-MIÓN, ÁR-bol'],fs:12.5})}
   ${col('aguda',8,'AGUDAS',COL.azul,['tónica: la última','','tilde si acaba en','vocal, -n o -s','','café · camión','reloj · ciudad'])}
   ${col('llana',125,'LLANAS',COL.verde,['tónica: penúltima','','tilde si NO acaba','en vocal, -n o -s','','árbol · lápiz','casa · examen'])}
   ${col('esdrujula',242,'ESDRÚJULAS',COL.rojo,['tónica:','antepenúltima','','¡siempre','llevan tilde!','','música · pájaro'])}
   ${b({id:'sobres',x:8,y:272,w:344,h:46,c:COL.lila,t:'SOBRESDRÚJULAS',l:['siempre tilde: cuéntamelo, dígaselo'],fs:12.5,top:36})}
   ${b({id:'hiato',x:8,y:326,w:344,h:46,c:COL.naranja,t:'HIATO CON I / U TÓNICAS',l:['siempre tilde: río, maíz, búho, día'],fs:12.5,top:36})}
   ${b({id:'diacritica',x:8,y:380,w:344,h:46,c:COL.teal,t:'TILDE DIACRÍTICA',l:['tú / tu · él / el · sí / si · mí / mi · más'],fs:12.5,top:36})}`}},

/* ---------- làmina 3: la comunicació ---------- */
 comunica:{nom:'La comunicación',desc:'Emisor, receptor, mensaje, canal, código y contexto',ic:'globe',skill:'cs_comunicacion',vb:'0 0 360 300',
  intro:'Laura escribe un mensaje de móvil a su abuelo. Toca cada elemento.',ctx:()=>null,pregunta:'Quin element de la comunicació és el número',
  parts:{emisor:{n:1,nom:'emisor',a:()=>'emisora|el emisor',f:()=>'Quien envía el mensaje: <b>Laura</b>.'},receptor:{n:2,nom:'receptor',a:()=>'receptora|el receptor',f:()=>'Quien recibe el mensaje: <b>su abuelo</b>.'},
   mensaje:{n:3,nom:'mensaje',a:()=>'el mensaje',f:()=>'La información que se transmite: <b>«¡Mañana voy a verte!»</b>.'},canal:{n:4,nom:'canal',a:()=>'el canal',f:()=>'El medio físico por el que viaja el mensaje: <b>la pantalla del móvil</b> (en una conversación, el aire).'},
   codigo:{n:5,nom:'código',a:()=>'codigo|el código',f:()=>'Los signos y reglas que comparten emisor y receptor: <b>la lengua castellana escrita</b>. Un semáforo usa un código de colores.'},
   contexto:{n:6,nom:'contexto',a:()=>'situación|situación comunicativa|el contexto',f:()=>'La situación en que se comunican: <b>es una conversación familiar, por la tarde</b>. Por eso Laura usa un registro informal.'}},
  draw(mode,hi){const P=this.parts,b=o=>box(o,mode,hi,P[o.id].n),person=(cx,c)=>`<circle cx="${cx}" cy="78" r="13" fill="${c}"/><path d="M${cx-20} 120c0-18 9-27 20-27s20 9 20 27Z" fill="${c}"/>`;
   return`${b({id:'emisor',x:8,y:30,w:96,h:122,c:COL.azul,t:'EMISOR',l:[],fs:13})}${person(56,COL.azul)}<text x="56" y="142" text-anchor="middle" font-size="13" font-weight="700" fill="#0F172A">Laura</text>
   ${b({id:'receptor',x:256,y:30,w:96,h:122,c:COL.verde,t:'RECEPTOR',l:[],fs:13})}${person(304,COL.verde)}<text x="304" y="142" text-anchor="middle" font-size="13" font-weight="700" fill="#0F172A">su abuelo</text>
   ${b({id:'mensaje',x:114,y:30,w:132,h:58,c:COL.rojo,t:'MENSAJE',l:['¡Mañana voy','a verte!'],fs:12,top:33})}
   <path d="M108 100h138" stroke="${COL.gris}" stroke-width="2.5"/><path d="M246 100l-9-5v10Z" fill="${COL.gris}"/>
   ${b({id:'canal',x:114,y:110,w:132,h:46,c:COL.naranja,t:'CANAL',l:['la pantalla del móvil'],fs:11.5,top:35})}
   ${b({id:'codigo',x:60,y:172,w:240,h:46,c:COL.lila,t:'CÓDIGO',l:['la lengua castellana escrita'],fs:12.5,top:36})}
   ${b({id:'contexto',x:60,y:230,w:240,h:62,c:COL.teal,t:'CONTEXTO',l:['conversación familiar, por la tarde','(registro informal)'],fs:12,top:34})}`}}};

const lamAns=(L,k,S)=>[L.parts[k].nom,...A(L.parts[k].a(S))];
function csLamSVG(id,mode='labels',hi=null,S){const L=LAM[id];if(S===undefined)S=id==='oracion'?ORA[0]:null;
 return`<svg class="lamsvg" viewBox="${L.vb}" style="max-width:520px;font-family:var(--font)" role="img" aria-label="Lámina: ${esc(L.nom)}">${L.draw(mode,hi,S)}</svg>`}
// Pregunta d'exercici: «quin és el número N?» (resposta escrita)
function csLamQ(id,lv){const L=LAM[id],S=L.ctx(),ids=Object.keys(L.parts).filter(k=>lv>0||L.parts[k].n<=6),k=pick(ids),r=L.parts[k],ans=lamAns(L,k,S);
 const hide=t=>ans.slice().sort((a,b)=>b.length-a.length).reduce((s,x)=>s.replace(new RegExp(x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi'),'…'),t.replace(/<[^>]+>/g,''));
 return{text:`Observa la làmina «<span lang="es">${L.nom}</span>». ${L.pregunta} <b>${r.n}</b>?`,fig:csLamSVG(id,'numbers',k,S),fields:[{label:'Nombre',txt:ans,loose:true,wide:true}],vis:null,
  hints:[`Pista: ${hide(r.f(S))}`,`Empieza por «${r.nom[0].toUpperCase()}».`],steps:[`El número ${r.n} es: <b>${r.nom}</b>.`,r.f(S)],
  err:v=>Object.keys(L.parts).some(o=>o!==k&&lamAns(L,o,S).some(x=>fold(x)===fold(v[0])))?'cs_lamina':null}}
// Pantalla de la làmina
function csLamScreen(id){endSession();const L=LAM[id],ids=Object.keys(L.parts).sort((a,b)=>L.parts[a].n-L.parts[b].n);let mode='labels',hi=null,S=id==='oracion'?ORA[0]:null;
 app(`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><div class="eyebrow" style="color:var(--s-castella)">Làmina · Castellà</div><h2 lang="es">${L.nom}</h2><p class="muted" lang="es">${L.intro}</p></div><button class="ghost" onclick="subject('castella')">← Tornar</button></div>
 <div class="lam"><div class="card lam-fig"><div class="tabs" style="margin:0 0 12px"><button id="lm1" class="on">Amb noms</button><button id="lm2">Sense noms (posa't a prova)</button></div>${id==='oracion'?'<p id="lfr" lang="es" style="margin:0 0 10px;font-weight:700;font-size:18px"></p>':''}<div id="lsvg"></div>${id==='oracion'?'<button class="sec" id="lnext" style="margin-top:10px">Una altra oració</button>':''}</div>
 <div><div class="card" id="linfo"></div><div class="row"><button id="la">Aprendre el tema</button><button class="sec" id="lp">Practicar</button></div></div></div>`);
 const info=()=>{const el=$('#linfo');
  if(!hi){el.innerHTML=`<h3 style="margin-top:0">${mode==='labels'?'Les parts':'Toca un número i escriu-ne el nom'}</h3><ol class="steps" style="margin:0" lang="es">${ids.map(k=>`<li><a href="#" data-go="${k}">${mode==='labels'?L.parts[k].nom:'Número '+L.parts[k].n}</a></li>`).join('')}</ol>`}
  else if(mode==='labels')el.innerHTML=`<div class="eyebrow" style="color:var(--s-castella)">Número ${L.parts[hi].n} de ${ids.length}</div><h3 style="margin:4px 0 8px" lang="es">${L.parts[hi].nom}</h3><p style="margin:0" lang="es">${L.parts[hi].f(S)}</p><p style="margin:10px 0 0"><a href="#" id="lall">← Totes les parts</a></p>`;
  else{el.innerHTML=`<div class="eyebrow" style="color:var(--s-castella)">Número ${L.parts[hi].n}</div><h3 style="margin:4px 0 8px">Com es diu?</h3><div class="row"><input id="lin" autocomplete="off" autocapitalize="off" spellcheck="false" style="flex:1;min-width:180px;font-size:20px"><button id="lok">Comprova</button></div><div id="lfb" style="margin-top:8px"></div><p style="margin:10px 0 0"><a href="#" id="lall">← Tots els números</a></p>`;
   const chk=()=>{const v=norm($('#lin').value);if(!v)return;const ok=lamAns(L,hi,S).some(x=>fold(x)===fold(v));$('#lfb').innerHTML=ok?`<div class="fb ok">Correcte! És <b lang="es">${L.parts[hi].nom}</b>.</div>`:'<div class="fb ko">Encara no. Mira bé la caixa i torna-ho a provar, o canvia a «Amb noms» per comprovar-ho.</div>'};
   $('#lok').onclick=chk;$('#lin').onkeydown=e=>{if(e.key==='Enter')chk()};$('#lin').focus({preventScroll:true})}
  el.querySelectorAll('[data-go]').forEach(a=>a.onclick=e=>{e.preventDefault();hi=a.dataset.go;draw()});const all=$('#lall');if(all)all.onclick=e=>{e.preventDefault();hi=null;draw()}};
 const draw=()=>{$('#lsvg').innerHTML=csLamSVG(id,mode,hi,S);if($('#lfr'))$('#lfr').textContent=L.frase(S);$('#lsvg').querySelectorAll('[data-part]').forEach(g=>g.onclick=()=>{hi=g.dataset.part;draw()});info()};
 $('#lm1').onclick=()=>{mode='labels';$('#lm1').className='on';$('#lm2').className='';draw()};
 $('#lm2').onclick=()=>{mode='numbers';$('#lm2').className='on';$('#lm1').className='';draw()};
 if($('#lnext'))$('#lnext').onclick=()=>{S=ORA[(ORA.indexOf(S)+1)%ORA.length];draw()};
 $('#la').onclick=()=>start('professor',[L.skill],15);$('#lp').onclick=()=>start('exercicis',[L.skill],15);draw()}
window.csLamScreen=csLamScreen;
LAMINES.castella=LAMINES.castella||[];
for(const id of ['oracion','acento','comunica'])LAMINES.castella.push({obre:`csLamScreen('${id}')`,nom:LAM[id].nom,desc:LAM[id].desc,ic:LAM[id].ic});

// Les làmines dins dels temes: dibuix a la teoria i algunes preguntes als exercicis
const link=(k,id,p)=>{const g=SK[k].gen;SK[k].fig=()=>csLamSVG(id);SK[k].gen=function(lv,c){return Math.random()<p?csLamQ(id,lv):g.call(this,lv,c)}};
link('cs_complementos','oracion',.2);link('cs_sujeto','oracion',.15);link('cs_acentuacion','acento',.2);link('cs_comunicacion','comunica',.35);

/* ---------- material: fitxes resum ---------- */
const HOMO=[['tuvo (tener)','tubo (pieza hueca)'],['votar (elecciones)','botar (rebotar)'],['bello (bonito)','vello (pelo fino)'],['vaca (animal)','baca (del coche)'],['hecho (hacer)','echo (echar)'],['haber (verbo)','a ver (mirar)'],['hay (haber)','ahí (lugar) · ¡ay!'],['ha (haber)','a (preposición)'],['hola (saludo)','ola (del mar)'],['cayó (caer)','calló (callar)'],['valla (cerca)','vaya (ir)'],['haya (haber)','halla (hallar)']];
const FICHA={
 orto:{nom:'Reglas de ortografía',desc:'B/V, G/J, H, LL/Y, X/S y palabras que suenan igual',ic:'pen',skills:[['cs_bv','B y V'],['cs_gj','G y J'],['cs_h','La H'],['cs_lly','LL e Y'],['cs_x','X, S y CC']],
  html:()=>[['B y V',CS.REGLAS.bv],['G y J',CS.REGLAS.gj],['La H',CS.REGLAS.h],['LL e Y',CS.REGLAS.lly],['X, S y CC',CS.REGLAS.xs]].map(([t,R])=>`<div class="card"><h3 style="margin-top:0">${t}</h3><ul style="margin:0;padding-left:20px;line-height:1.55">${Object.values(R).map(r=>`<li>${r}</li>`).join('')}</ul></div>`).join('')
   +`<div class="card"><h3 style="margin-top:0">Palabras que suenan igual (homófonas)</h3><div class="tablewrap"><table class="vt">${HOMO.map(([a,b])=>`<tr><td>${a}</td><td>${b}</td></tr>`).join('')}</table></div></div>`},
 recursos:{nom:'Recursos literarios',desc:'Qué es cada recurso, con ejemplos para reconocerlo',ic:'quote',skills:[['cs_recursos','Recursos literarios'],['cs_metrica','Métrica y rima']],
  html:()=>`<div class="card"><div class="tablewrap"><table class="vt"><tr><th>Recurso</th><th>¿Qué hace?</th><th>Ejemplos</th></tr>${Object.entries(CS.REC_DEF).map(([k,d])=>`<tr><td><b>${k}</b></td><td>${d}</td><td><i>${CS.REC.filter(r=>fold(F(r[1]))===fold(k)).slice(0,2).map(r=>r[0]).join('<br>')}</i></td></tr>`).join('')}</table></div>
   <p style="margin:12px 0 0"><b>Truco:</b> si hay «como», es una <b>comparación</b>; si dice que una cosa «es» otra, es una <b>metáfora</b>; si una cosa hace algo propio de personas, es una <b>personificación</b>.</p></div>`},
 textos:{nom:'Tipos de texto y conectores',desc:'Narración, descripción, exposición... y los conectores para unir ideas',ic:'list',skills:[['cs_textos','Tipos de textos'],['cs_conectores','Conectores']],
  html:()=>`<div class="card"><h3 style="margin-top:0">Tipos de texto</h3><div class="tablewrap"><table class="vt"><tr><th>Tipo</th><th>¿Para qué sirve?</th></tr>${Object.keys(CS.TIP_DEF).map(k=>`<tr><td><b>${F(CS.TIP_ALT[k])}</b></td><td>${CS.TIP_DEF[k]}</td></tr>`).join('')}</table></div></div>
   <div class="card"><h3 style="margin-top:0">Conectores</h3><div class="tablewrap"><table class="vt"><tr><th>Sirven para…</th><th>Ejemplos</th></tr>${Object.entries(CS.CON).map(([k,l])=>`<tr><td><b>${k}</b></td><td>${l.join(', ')}</td></tr>`).join('')}</table></div></div>`}};
function csFicha(id){endSession();const M=FICHA[id];
 app(`<div class="row ph" style="justify-content:space-between;align-items:flex-end"><div><div class="eyebrow" style="color:var(--s-castella)">Material · Castellà</div><h2 lang="es">${M.nom}</h2><p class="muted" lang="es">${M.desc}</p></div><button class="ghost" onclick="subject('castella')">← Tornar</button></div>
 <div lang="es">${M.html()}</div><div class="card"><h3>Practica</h3><div class="row">${M.skills.map(([k,n],i)=>`<button ${i?'class="sec"':''} data-p="${k}">${n}</button>`).join('')}</div></div>`);
 document.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>start('exercicis',[b.dataset.p],15))}
window.csFicha=csFicha;
for(const id of Object.keys(FICHA))MATERIAL.castella.push({obre:`csFicha('${id}')`,nom:FICHA[id].nom,desc:FICHA[id].desc,ic:FICHA[id].ic});

Object.assign(ERR,{cs_lamina:{kid:'És una altra part de la làmina. Torna a mirar el número i la teva resposta.',par:'Castellà: confon les parts dels esquemes (oració, accentuació, comunicació)'}});
})();
