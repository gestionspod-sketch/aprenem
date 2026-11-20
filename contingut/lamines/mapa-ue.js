/* Aprenem - làmina interactiva: mapa de la Unió Europea (Medi, 6è)
   Part de l'app d'estudi. Vegeu CLAUDE.md i contingut/lamines/medi-base.js.
   És un «mapa de rajoles»: cada país és un quadre, col·locat més o menys on és a Europa (no és un mapa exacte).
   El color indica quan va entrar a la UE. S'associa al tema md_ue (contingut/medi-social-6.js). */
// [id, nom, sinònims, capital (i sinònims), any d'entrada, columna, fila, nivell]
const UE=[['se','Suècia','','Estocolm',1995,5,0],['fi','Finlàndia','','Hèlsinki|Helsinki',1995,6,0,1],['ee','Estònia','','Tallinn',2004,6,1,1],['ie','Irlanda','','Dublín|Dublin',1973,0,1],['dk','Dinamarca','','Copenhaguen|Copenhague',1973,4,1],
 ['nl','Països Baixos','holanda','Amsterdam',1957,2,2],['de','Alemanya','','Berlín|Berlin',1957,3,2],['pl','Polònia','','Varsòvia',2004,4,2],['lt','Lituània','','Vílnius|Vilnius',2004,5,2,1],['lv','Letònia','','Riga',2004,6,2,1],
 ['fr','França','','París',1957,1,3],['be','Bèlgica','','Brussel·les',1957,2,3],['lu','Luxemburg','','Luxemburg',1957,3,3,1],['cz','Txèquia','república txeca','Praga',2004,4,3],['sk','Eslovàquia','','Bratislava',2004,5,3,1],
 ['pt','Portugal','','Lisboa',1986,0,4],['es','Espanya','','Madrid',1986,1,4],['at','Àustria','','Viena',1995,3,4],['hu','Hongria','','Budapest',2004,4,4],['ro','Romania','','Bucarest',2007,5,4,1],
 ['it','Itàlia','','Roma',1957,2,5],['si','Eslovènia','','Ljubljana',2004,3,5,1],['hr','Croàcia','','Zagreb',2013,4,5,1],['bg','Bulgària','','Sofia',2007,5,5,1],
 ['mt','Malta','','la Valletta|Valletta',2004,2,6,1],['gr','Grècia','','Atenes',1981,5,6],['cy','Xipre','','Nicòsia',2004,6,6,1]];
const UE_FORA=[['Noruega',4,0],['Regne Unit',1,1],['Suïssa',2,4]];
const ueXY=(c,r)=>[40+c*100,30+r*95];
const ueCol=a=>a===1957?'#1F4E9C':a<=1986?'#3D7DD8':a<=1995?'#6FA8EE':'#A9CBF5';
lamReg('ue',{nom:'Mapa de la Unió Europea',desc:'Els 27 països, les capitals i quan hi varen entrar',ic:'flag',vb:'0 0 760 720',mw:700,fs:1,
 intro:'Cada quadre és un país de la Unió Europea, col·locat més o menys on és. El color diu quan hi va entrar. Toca un país per saber-ne la capital.',llista:'Els països de la UE',camp:'País',que:'el país',
 pregunta:'Quin país de la Unió Europea',recorda:'La UE té 27 països. Els sis fundadors (1957) són França, Alemanya, Itàlia, Bèlgica, Països Baixos i Luxemburg.',
 parts:Object.fromEntries(UE.map(([k,nom,a,cap,any,c,r,lv],i)=>{const[x,y]=ueXY(c,r),c1=cap.split('|')[0];
  return[k,{n:i+1,nom,a:a||undefined,p:[x+45,y+40],l:[x+45,y+40],s:'c',lv:lv||0,f:`Capital: <b>${c1}</b>. Va entrar a la Unió Europea l'any <b>${any}</b>${any===1957?' (és un dels sis països fundadors)':''}.`,q:`té la capital a ${c1}`}]})),
 draw(H){const[lx,ly]=ueXY(3,6);
  return`${UE_FORA.map(([n,c,r])=>{const[x,y]=ueXY(c,r);return`<rect x="${x}" y="${y}" width="90" height="85" fill="#E6E6E6" stroke="#BDBDBD" stroke-width="2"/><text x="${x+45}" y="${y+48}" font-size="12" text-anchor="middle" fill="#9E9E9E" font-style="italic">${n}</text>`}).join('')}
 ${UE.map(([k,,,,any,c,r])=>{const[x,y]=ueXY(c,r);return`<g ${H(k)}><rect x="${x}" y="${y}" width="90" height="85" fill="${ueCol(any)}" stroke="#fff" stroke-width="3"/>${k==='es'?`<rect x="${x+3}" y="${y+3}" width="84" height="79" fill="none" stroke="#FFC107" stroke-width="4"/>`:''}</g>`}).join('')}
 <g transform="translate(${lx-60} ${ly+2})" font-size="14" fill="#37474F"><text x="0" y="0" font-weight="800">Any d'entrada</text>
 ${[[1957,'1957 (fundadors)'],[1986,'1973-1986'],[1995,'1995'],[2004,'2004-2013']].map(([a,t],i)=>`<rect x="0" y="${10+i*20}" width="16" height="14" fill="${ueCol(a)}"/><text x="22" y="${22+i*20}">${t}</text>`).join('')}</g>
 <text x="720" y="700" font-size="12" text-anchor="end" fill="#9E9E9E" font-style="italic">En gris: països d'Europa que no són de la UE</text>`}});
function md_ueGen(lv){const L=UE.filter(u=>lv>0||!u[7]),u=pick(L),t=Math.random(),caps=u[3].split('|');
 const otherCap=v=>UE.some(o=>o!==u&&o[3].split('|').map(fold).includes(fold(v))),otherPais=v=>UE.some(o=>o!==u&&[o[1],...(o[2]?o[2].split('|'):[])].map(fold).includes(fold(v)));
 if(t<.4&&u[0]!=='lu')return{text:`Quina és la capital de <b>${u[1]}</b>?`,fields:[{label:'Capital',txt:caps,loose:true,wide:true}],vis:null,
  hints:['Mira el mapa de la Unió Europea i toca el país.',`Comença per «${caps[0].replace(/^la /,'')[0].toUpperCase()}».`],steps:[`La capital de ${u[1]} és <b>${caps[0]}</b>.`],err:v=>otherCap(v[0])?'md_ue_cap':null};
 if(t<.75&&u[0]!=='lu')return{text:`De quin país de la Unió Europea és capital <b>${caps[0]}</b>?`,fields:[{label:'País',txt:[u[1],...(u[2]?u[2].split('|'):[])],loose:true,wide:true}],vis:null,
  hints:['Mira el mapa de la Unió Europea.',`Comença per «${u[1][0]}».`],steps:[`${caps[0]} és la capital de <b>${u[1]}</b>.`],err:v=>otherPais(v[0])?'md_ue_cap':null};
 let o=pick(UE.filter(x=>x[4]!==1986));const a=Math.min(o[4],1986),b=Math.max(o[4],1986),d=b-a,ab=o[4]<1986;
 return{text:`${o[1]} va entrar a la Unió Europea (abans, Comunitat Europea) l'any <b>${o[4]}</b>, i Espanya, l'any <b>1986</b>. Quants anys de diferència hi ha?`,fields:[{label:'Anys',ans:R(d)}],vis:null,
  hints:['Resta l\'any més antic a l\'any més recent.',`${b} − ${a} = ?`],steps:[`L'any més recent és ${b} i el més antic, ${a}.`,`${b} − ${a} = ${d}.`,`${ab?o[1]+' hi va entrar':'Espanya hi va entrar'} <b>${d} anys</b> abans.`],err:v=>req(v[0],R(a+b))?'md_resta_anys':null}}
lamWrap('ue','md_ue',{gen:md_ueGen,pGen:.4,pBank:.35});
SK.md_ue.bank.push(...mkBank([['Quins sis països varen fundar la Comunitat Europea el 1957? Escriu-ne un.','França|Alemanya|Itàlia|Bèlgica|Països Baixos|Holanda|Luxemburg','Al mapa són el color més fosc.','Els fundadors són <b>França, Alemanya, Itàlia, Bèlgica, Països Baixos i Luxemburg</b>.','Espanya|Regne Unit'],
 ['Quin és el darrer país que ha entrat a la Unió Europea, el 2013?','Croàcia','És a la costa de l\'Adriàtic.','<b>Croàcia</b> hi va entrar el 2013.','Romania|Bulgària',1],
 ['Quin país de la UE és l\'únic que té frontera per terra amb Espanya, a més de França?','Portugal','És a l\'oest de la península.','<b>Portugal</b> comparteix la península Ibèrica amb Espanya.','Andorra|Marroc']]));
Object.assign(ERR,{md_ue_cap:{kid:'Compte! Has dit la capital (o el nom) d\'un altre país. Mira bé el mapa de la Unió Europea.',par:'Confon els països de la UE i les seves capitals'}});
document.addEventListener('DOMContentLoaded',()=>{if(typeof ICO==='function')IC.flag=ICO('<path d="M5 21V4M5 4h12l-2 4 2 4H5"/>')});
