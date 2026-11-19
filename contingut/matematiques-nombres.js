/* Aprenem - MATEMÀTIQUES 6è: nombres naturals, operacions, divisibilitat, potències i arrels, nombres enters
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes. Fonts: vegeu contingut/matematiques.js. */
(()=>{
const {num,dc,fInt,val,eq,near,isPrime,divisors,pw,lletres,svg,tx,ln,C,taula}=MT;
const zs=n=>n<0?`−${-n}`:`${n}`;            // enter amb signe −
const zp=n=>n<0?`(−${-n})`:`${n}`;          // enter entre parèntesis si és negatiu
const POS=['unitats','desenes','centenes','unitats de miler','desenes de miler','centenes de miler','unitats de milió','desenes de milió','centenes de milió'];
const mkNum=(nd,zp0)=>{let s=String(rnd(1,9));for(let i=1;i<nd;i++)s+=Math.random()<zp0?'0':String(rnd(0,9));return s};
const dotted=(s,hi)=>{let o='';for(let i=0;i<s.length;i++){const r=s.length-1-i;o+=i===hi?`<b style="color:${C.r};text-decoration:underline">${s[i]}</b>`:s[i];if(r>0&&r%3===0)o+='.'}return o};
// recta numèrica
function recta(lo,hi,mark,mark2){const W=560,x=v=>30+(v-lo)*(W-60)/(hi-lo);let g=ln(20,60,W-20,60,{w:2.5});
 const stp=hi-lo>20?2:1;for(let v=lo;v<=hi;v++){g+=ln(x(v),v%stp?54:50,x(v),v%stp?66:70,{w:v===0?3:1.5});if(v%stp===0)g+=tx(x(v),88,zs(v),{fs:v===0?17:14,fw:v===0?800:600,c:v===0?C.t:'#4A5468'})}
 if(mark!=null)g+=`<circle cx="${x(mark).toFixed(1)}" cy="60" r="9" fill="${C.o}" stroke="#fff" stroke-width="2"/>`;
 if(mark2!=null)g+=`<circle cx="${x(mark2).toFixed(1)}" cy="60" r="9" fill="${C.b}" stroke="#fff" stroke-width="2"/>`;
 return svg(W,105,g)}

Object.assign(ERR,{
 mt_valor_posicio:{kid:'Has escrit només la xifra. El valor depèn de la posició: quantes xifres té a la dreta?',par:'Confon una xifra amb el seu valor de posició'},
 mt_zeros:{kid:'Compta les xifres: en falta o en sobra alguna. Cada classe (milers, unitats) ha de tenir 3 xifres; si cal, hi poses zeros.',par:'Oblida els zeros intermedis en escriure nombres grans'},
 mt_arrod_trunca:{kid:'Has tallat el nombre, però no l\'has arrodonit. Mira la xifra de la dreta: si és 5 o més, cal pujar.',par:'Trunca en lloc d\'arrodonir'},
 mt_romans_repeticio:{kid:'Compte! I, X, C i M es poden repetir com a molt 3 vegades, i V, L i D no es repeteixen mai.',par:'Repeteix símbols romans més de 3 vegades (IIII, XXXX...)'},
 mt_romans_resta:{kid:'Has sumat tots els símbols. Quan un símbol petit va davant d\'un de més gran, es resta (IV = 4).',par:'No aplica la regla de la resta dels nombres romans'},
 mt_jerarquia:{kid:'Has fet les operacions d\'esquerra a dreta. Recorda l\'ordre: primer els parèntesis, després × i :, i al final + i −.',par:'No respecta la jerarquia de les operacions'},
 mt_problema_pas:{kid:'Vas bé, però el problema no s\'acaba aquí! Torna a llegir la pregunta: què et demana exactament?',par:'S\'atura a mig problema (dona un resultat intermedi)'},
 mt_multiple_gran:{kid:'És un múltiple, però no és més gran que el nombre que et diuen. Busca el següent.',par:'No respecta la condició del problema de múltiples'},
 mt_divisors_1n:{kid:'Gairebé! Recorda que l\'1 i el mateix nombre també són divisors.',par:'Oblida l\'1 o el mateix nombre en comptar divisors'},
 mt_una_xifra:{kid:'Al quadre hi va una sola xifra, del 0 al 9.',par:'No entén que ha de posar una xifra'},
 mt_criteri3:{kid:'El criteri del 3 i del 9 no mira la darrera xifra: suma totes les xifres del nombre.',par:'Aplica malament el criteri de divisibilitat per 3 o per 9'},
 mt_criteri_altre:{kid:'Aquesta xifra funciona, però no és la que et demanem. Mira si n\'hi ha una altra que també serveixi.',par:'No tria la xifra més petita (o més gran) que compleix el criteri'},
 mt_primer_senar:{kid:'Compte: ser senar no vol dir ser primer. Prova si es pot dividir per 3, per 7...',par:'Confon nombres senars amb nombres primers'},
 mt_mcm_mcd:{kid:'Has calculat l\'altre! El m.c.m. és un múltiple (més gran o igual que els nombres) i el m.c.d. és un divisor (més petit o igual).',par:'Confon el m.c.m. i el m.c.d.'},
 mt_mcm_producte:{kid:'Multiplicar els dos nombres dona un múltiple comú, però no sempre el més petit. Busca\'n un de més petit.',par:'Calcula el m.c.m. multiplicant els nombres'},
 mt_pot_multiplica:{kid:'Compte! Una potència no és base × exponent. L\'exponent diu quantes vegades es multiplica la base per ella mateixa.',par:'Multiplica la base per l\'exponent en lloc de calcular la potència'},
 mt_pot_base_exp:{kid:'Has intercanviat la base i l\'exponent. La base és el nombre que es repeteix; l\'exponent, quantes vegades.',par:'Confon la base i l\'exponent'},
 mt_pot_zero:{kid:'Qualsevol nombre (que no sigui 0) elevat a 0 dona 1.',par:'No sap que a⁰ = 1'},
 mt_pot10_xifres:{kid:'Compta els zeros, no les xifres: l\'exponent de 10 és el nombre de zeros.',par:'Confon l\'exponent de 10 amb el nombre de xifres'},
 mt_arrel_meitat:{kid:'L\'arrel quadrada no és la meitat. Busca un nombre que, multiplicat per ell mateix, doni el nombre de dins.',par:'Confon l\'arrel quadrada amb la meitat'},
 mt_arrel_residu:{kid:'El residu és massa gran: vol dir que l\'arrel entera pot ser un nombre més gran.',par:'Calcula l\'arrel entera per sota'},
 mt_enters_signe:{kid:'Revisa el signe! Mira a la recta numèrica si el resultat queda a la dreta o a l\'esquerra del 0.',par:'S\'equivoca de signe amb els nombres enters'},
 mt_enters_diferencia:{kid:'Per calcular la diferència entre un nombre positiu i un de negatiu, has de passar pel 0: suma les dues distàncies al 0.',par:'Calcula malament la diferència entre un positiu i un negatiu'},
 mt_menys_menys:{kid:'Compte amb − (−): restar un nombre negatiu és com sumar. − (−5) = + 5.',par:'No canvia el signe en restar un nombre negatiu'}
});

Object.assign(SK,{
/* ---------- 1. Nombres naturals ---------- */
mt_grans:{mat:'mates',nom:'Nombres grans (milions)',ab:'Ng',curs:[6],
 teoria:['Els nombres grans s\'agrupen en <b>classes</b> de tres xifres: les unitats, els milers i els milions. Per llegir-los més bé, separam les classes amb un punt: <b>3.472.105</b>.',
  'Cada xifra té un <b>valor de posició</b>: cada posició val 10 vegades més que la de la seva dreta. Al nombre 3.472.105, el 4 és a les centenes de miler i val 400.000.',
  'Per llegir un nombre gran, llegim cada classe i hi afegim el seu nom: <i>tres milions quatre-cents setanta-dos mil cent cinc</i>. Si una posició està buida, hi escrivim un <b>0</b>.'],
 fig:()=>taula(['CMi','DMi','UMi','CM','DM','UM','C','D','U'],[['','','3','4','7','2','1','0','5']])+'<p class="muted" style="margin:8px 0 0;font-size:15px">CMi, DMi, UMi: centenes, desenes i unitats de milió · CM, DM, UM: centenes, desenes i unitats de miler</p>',
 gen(lv){const nd=lv===0?rnd(6,7):lv===1?rnd(7,8):9,s=mkNum(nd,lv===2?.35:.15),N=+s;
  if(Math.random()<.5){let hi;do{hi=rnd(0,nd-1)}while(s[hi]==='0'||nd-1-hi<2);
   const d=+s[hi],p=nd-1-hi,v=d*10**p;
   return{text:`Quin <b>valor</b> té la xifra destacada?<br><span style="font-size:1.2em">${dotted(s,hi)}</span>`,fields:[fInt('Valor',v)],
    hints:[`Mira en quina posició és el ${d}: compta les xifres des de la dreta (unitats, desenes, centenes...).`,`El ${d} és a les ${POS[p]}. Quant val 1 d'aquesta posició?`],
    steps:[`Comptam des de la dreta: el ${d} ocupa la posició de les <b>${POS[p]}</b>.`,`Una unitat d'aquesta posició val ${num(10**p)}.`,`Valor: ${d} × ${num(10**p)} = <b>${num(v)}</b>.`],
    err:x=>val(x[0])===d?'mt_valor_posicio':null}}
  const m=Math.floor(N/1e6),k=Math.floor(N/1000)%1000,u=N%1000,p3=n=>String(n).padStart(3,'0');
  return{text:`Escriu en xifres:<br><i>${lletres(N)}</i>`,fields:[fInt('Nombre',N)],
   hints:['Separa\'l per classes: primer els milions, després els milers i al final les unitats.','Cada classe (menys la primera) ha de tenir 3 xifres. Si en falta alguna, hi poses zeros.'],
   steps:[m?`Milions: <i>${lletres(m)}</i> → ${m}.`:`No hi ha milions.`,`Milers: <i>${k?lletres(k):'cap'}</i> → ${m?p3(k):k}.`,`Unitats: <i>${u?lletres(u):'cap'}</i> → ${p3(u)}.`,`Ho ajuntam: <b>${num(N)}</b>.`],
   err:x=>{const y=val(x[0]);return isFinite(y)&&String(y).length!==String(N).length?'mt_zeros':null}}}},
mt_aprox:{mat:'mates',nom:'Aproximar i arrodonir',ab:'Ap',curs:[6],
 teoria:['<b>Arrodonir</b> un nombre és canviar-lo per un altre de més senzill que hi és a prop. Ho feim per calcular de memòria o per fer estimacions.',
  'Per arrodonir a una posició (per exemple, a les centenes), miram la xifra que hi ha <b>just a la dreta</b>:',
  '• Si és <b>0, 1, 2, 3 o 4</b>, la xifra de la posició es queda igual.<br>• Si és <b>5, 6, 7, 8 o 9</b>, la xifra de la posició augmenta 1.<br>Totes les xifres de la dreta es converteixen en zeros (o desapareixen, si són decimals).',
  'Exemples: 4.762 arrodonit a les centenes → 4.800. 3,141 arrodonit a les dècimes → 3,1.'],
 gen(lv){
  if(lv<2||Math.random()<.4){const nd=lv===0?rnd(4,5):rnd(5,7),N=+mkNum(nd,.1),p=rnd(1,Math.min(nd-1,lv===0?3:5)),f=10**p,r=Math.round(N/f)*f,t=Math.floor(N/f)*f,nx=Math.floor(N/10**(p-1))%10;
   const pl=['','desenes','centenes','unitats de miler','desenes de miler','centenes de miler'][p];
   return{text:`Arrodoneix <b>${num(N)}</b> a les <b>${pl}</b>.`,fields:[fInt('Nombre arrodonit',r)],
    hints:[`Busca la xifra de les ${pl} i mira quina xifra té just a la dreta.`,`Si la xifra de la dreta és 5 o més, cal pujar. Si és menys de 5, no.`],
    steps:[`La xifra de les ${pl} és el ${Math.floor(N/f)%10}. La xifra que té a la dreta és el <b>${nx}</b>.`,nx>=5?`Com que ${nx} és 5 o més, arrodonim <b>cap amunt</b>.`:`Com que ${nx} és menys de 5, la xifra de les ${pl} es queda igual.`,`Les xifres de la dreta passen a ser 0: <b>${num(r)}</b>.`],
    err:x=>t!==r&&val(x[0])===t?'mt_arrod_trunca':null}}
  let X;do{X=rnd(1001,99999)}while(X%10===0);const p=pick([1,2,3]),f=10**p,r=Math.round(X/f)*f,t=Math.floor(X/f)*f,nx=Math.floor(X/10**(p-1))%10,pl=['','centèsimes','dècimes','unitats'][p];
  return{text:`Arrodoneix <b>${dc(X/1000)}</b> a les <b>${pl}</b>.`,fields:[MT.fDec('Nombre arrodonit',r/1000)],
   hints:[`Busca la xifra de les ${pl} i mira la que té just a la dreta.`,'Si la xifra de la dreta és 5 o més, cal pujar. Les xifres de la dreta desapareixen.'],
   steps:[`La xifra de les ${pl} és el ${Math.floor(X/f)%10} i la de la seva dreta és el <b>${nx}</b>.`,nx>=5?`Com que ${nx} és 5 o més, arrodonim cap amunt.`:`Com que ${nx} és menys de 5, es queda igual.`,`Resultat: <b>${dc(r/1000)}</b>.`],
   err:x=>t!==r&&near(val(x[0]),t/1000)?'mt_arrod_trunca':null}}},
mt_romans:{mat:'mates',nom:'Nombres romans',ab:'Rm',curs:[6],
 teoria:['Els romans escrivien els nombres amb set lletres: <b>I</b> = 1, <b>V</b> = 5, <b>X</b> = 10, <b>L</b> = 50, <b>C</b> = 100, <b>D</b> = 500 i <b>M</b> = 1.000.',
  '<b>Regla de la suma:</b> un símbol a la dreta d\'un altre d\'igual o més gran, se suma: VI = 6, XV = 15, CL = 150.',
  '<b>Regla de la resta:</b> I davant de V o X, X davant de L o C, i C davant de D o M, es resten: IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900.',
  '<b>Repeticions:</b> I, X, C i M es poden repetir fins a 3 vegades (III = 3, XXX = 30). V, L i D no es repeteixen mai. Una ratlla damunt un símbol el multiplica per 1.000.',
  'Truc: descompon el nombre. 1.994 = 1.000 + 900 + 90 + 4 = M + CM + XC + IV = <b>MCMXCIV</b>.'],
 gen(lv){const RV=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']],SY={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
  const rom=n=>{let s='';for(const[v,r]of RV)while(n>=v){s+=r;n-=v}return s},sub=s=>/IV|IX|XL|XC|CD|CM/.test(s);
  const max=[50,500,3999][lv];let n;do{n=rnd(lv?11:4,max)}while(lv>0&&!sub(rom(n))&&Math.random()<.7);
  const r=rom(n),parts=[Math.floor(n/1000)*1000,Math.floor(n%1000/100)*100,Math.floor(n%100/10)*10,n%10].filter(Boolean);
  if(Math.random()<.5)return{text:`Escriu en <b>nombres romans</b>:<br>${n}`,fields:[{label:'Nombre romà',txt:[r,r.toLowerCase()]}],
   hints:[`Descompon ${n} en milers, centenes, desenes i unitats.`,'Per a 4, 9, 40, 90, 400 i 900 es posa un símbol petit davant d\'un de més gran.'],
   steps:[`Descomponem: ${n} = ${parts.join(' + ')}.`,`Cada part en romà: ${parts.map(p=>`${p} = ${rom(p)}`).join(', ')}.`,`Ho ajuntam: <b>${r}</b>.`],
   err:x=>/iiii|xxxx|cccc|mmmm|vv|ll|dd/.test(x[0]||'')?'mt_romans_repeticio':null};
  const add=[...r].reduce((a,c)=>a+SY[c],0);
  return{text:`Quin nombre és?<br><b style="letter-spacing:3px">${r}</b>`,fields:[fInt('Nombre',n)],
   hints:['Llegeix d\'esquerra a dreta i agrupa els símbols: milers, centenes, desenes i unitats.','Si un símbol petit és davant d\'un de més gran, es resta (IX = 9).'],
   steps:[`Agrupam els símbols: ${parts.map(p=>`${rom(p)} = ${p}`).join(', ')}.`,`Sumam: ${parts.join(' + ')} = <b>${n}</b>.`],
   err:x=>add!==n&&val(x[0])===add?'mt_romans_resta':null}}},

/* ---------- 2. Operacions ---------- */
mt_combinades:{mat:'mates',nom:'Operacions combinades',ab:'Oc',curs:[6],
 teoria:['Quan en una expressió hi ha diverses operacions, no les feim d\'esquerra a dreta sense pensar: hi ha un <b>ordre</b> (jerarquia).',
  '1r. Les operacions de dins els <b>parèntesis</b>.<br>2n. Les <b>multiplicacions i divisions</b>, d\'esquerra a dreta.<br>3r. Les <b>sumes i restes</b>, d\'esquerra a dreta.',
  'Exemple: 5 + 3 × 4 = 5 + 12 = <b>17</b> (no 32!). En canvi, (5 + 3) × 4 = 8 × 4 = <b>32</b>.'],
 gen(lv){const T=[
   ()=>{const a=rnd(2,30),b=rnd(2,9),c=rnd(2,9);return{e:`${a} + ${b} × ${c}`,v:a+b*c,w:(a+b)*c,st:[`Primer la multiplicació: ${b} × ${c} = ${b*c}.`,`Després la suma: ${a} + ${b*c} = ${a+b*c}.`]}},
   ()=>{const b=rnd(2,9),c=rnd(2,9),a=b*c+rnd(1,30);return{e:`${a} − ${b} × ${c}`,v:a-b*c,w:(a-b)*c,st:[`Primer la multiplicació: ${b} × ${c} = ${b*c}.`,`Després la resta: ${a} − ${b*c} = ${a-b*c}.`]}},
   ()=>{const c=rnd(2,9),b=c*rnd(2,9),a=rnd(2,40);return{e:`${a} + ${b} : ${c}`,v:a+b/c,w:(a+b)/c,st:[`Primer la divisió: ${b} : ${c} = ${b/c}.`,`Després la suma: ${a} + ${b/c} = ${a+b/c}.`]}},
   ()=>{const a=rnd(2,9),b=rnd(2,9),c=rnd(2,9),d=rnd(2,9);return{e:`${a} × ${b} + ${c} × ${d}`,v:a*b+c*d,w:(a*b+c)*d,st:[`Primer les multiplicacions: ${a} × ${b} = ${a*b} i ${c} × ${d} = ${c*d}.`,`Després la suma: ${a*b} + ${c*d} = ${a*b+c*d}.`]}},
   ()=>{const a=rnd(2,20),b=rnd(2,20),c=rnd(2,9);return{e:`(${a} + ${b}) × ${c}`,v:(a+b)*c,w:a+b*c,st:[`Primer el parèntesi: ${a} + ${b} = ${a+b}.`,`Després la multiplicació: ${a+b} × ${c} = ${(a+b)*c}.`]}},
   ()=>{const a=rnd(2,9),c=rnd(2,15),b=c+rnd(1,12);return{e:`${a} × (${b} − ${c})`,v:a*(b-c),w:a*b-c,st:[`Primer el parèntesi: ${b} − ${c} = ${b-c}.`,`Després la multiplicació: ${a} × ${b-c} = ${a*(b-c)}.`]}},
   ()=>{const c=rnd(2,9),q=rnd(2,12),b=rnd(2,30),a=b+c*q;return{e:`(${a} − ${b}) : ${c}`,v:q,w:a-b/c,st:[`Primer el parèntesi: ${a} − ${b} = ${a-b}.`,`Després la divisió: ${a-b} : ${c} = ${q}.`]}},
   ()=>{const c=rnd(2,9),d=rnd(2,9),a=rnd(2,12),b=Math.ceil((c*d+1)/a)+rnd(0,4);return{e:`${a} × ${b} − ${c} × ${d}`,v:a*b-c*d,w:(a*b-c)*d,st:[`Primer les multiplicacions: ${a} × ${b} = ${a*b} i ${c} × ${d} = ${c*d}.`,`Després la resta: ${a*b} − ${c*d} = ${a*b-c*d}.`]}},
   ()=>{const a=rnd(2,20),b=rnd(2,9),d=rnd(1,9),c=d+rnd(1,9);return{e:`${a} + ${b} × (${c} − ${d})`,v:a+b*(c-d),w:(a+b)*(c-d),st:[`Primer el parèntesi: ${c} − ${d} = ${c-d}.`,`Després la multiplicació: ${b} × ${c-d} = ${b*(c-d)}.`,`Al final la suma: ${a} + ${b*(c-d)} = ${a+b*(c-d)}.`]}},
   ()=>{const a=rnd(2,12),b=rnd(2,12),c=rnd(2,6),e=rnd(2,6),q=rnd(1,Math.min(9,(a+b)*c-1)),d=e*q,v=(a+b)*c-q;return{e:`(${a} + ${b}) × ${c} − ${d} : ${e}`,v,w:((a+b)*c-d)/e,st:[`Primer el parèntesi: ${a} + ${b} = ${a+b}.`,`Després × i :, d'esquerra a dreta: ${a+b} × ${c} = ${(a+b)*c} i ${d} : ${e} = ${q}.`,`Al final la resta: ${(a+b)*c} − ${q} = ${v}.`]}},
   ()=>{const d=rnd(2,6),q=rnd(2,9),s=d*q,b=rnd(1,s-1),c=s-b,a=q+rnd(1,30);return{e:`${a} − (${b} + ${c}) : ${d}`,v:a-q,w:(a-s)/d,st:[`Primer el parèntesi: ${b} + ${c} = ${s}.`,`Després la divisió: ${s} : ${d} = ${q}.`,`Al final la resta: ${a} − ${q} = ${a-q}.`]}}];
  const i=lv===0?rnd(0,3):lv===1?rnd(2,7):rnd(4,10),o=T[i]();
  return{text:`Calcula, respectant l'ordre de les operacions:<br><b>${o.e}</b>`,fields:[fInt('Resultat',o.v)],
   hints:[o.e.includes('(')?'Hi ha parèntesis: què has de fer primer?':'Hi ha multiplicacions o divisions? Recorda que van abans que les sumes i les restes.',o.st[0]],
   steps:[...o.st,`Resultat: <b>${o.v}</b>.`],
   err:x=>o.w!==o.v&&val(x[0])===o.w?'mt_jerarquia':null}}},
mt_problemes:{mat:'mates',nom:'Problemes de diverses operacions',ab:'Rp',curs:[6],
 teoria:['Per resoldre un problema, segueix aquests passos:','1. <b>Llegeix</b> amb calma i busca què et pregunten.<br>2. <b>Pensa</b> quines dades necessites i quines operacions has de fer (sovint n\'hi ha més d\'una!).<br>3. <b>Calcula</b> pas a pas.<br>4. <b>Comprova</b> que el resultat té sentit i respon la pregunta.',
  'Una pregunta intermèdia t\'ajuda molt: «Què puc saber primer amb aquestes dades?».'],
 gen(lv){const P=[
   ()=>{const q=rnd(2,6),p=lv?pick([1.25,2.5,0.75,1.5,3.2,2.4]):rnd(2,9),c=Math.round(q*p*100)/100,B=[10,20,50,100].find(b=>b>c),a=Math.round((B-c)*100)/100;
    return{t:`Na Marta compra ${q} llibretes a ${MT.eur(p)} cadascuna. Paga amb un bitllet de ${B} €. Quant li han de tornar?`,a,u:'€',mid:c,
     st:[`Primer calculam quant costen les llibretes: ${q} × ${MT.eur(p)} = ${MT.eur(c)}.`,`Després restam: ${B} − ${dc(c)} = ${MT.eur(a)}.`],h:['Què has de saber primer: quant costen totes les llibretes juntes?','Quan sàpigues el que costen, pensa quant sobra del bitllet.']}},
   ()=>{const f=rnd(8,25),s=rnd(10,30),v=rnd(Math.floor(f*s/3),f*s-1);return{t:`Un teatre té ${f} files de ${s} seients. Avui s'han venut ${v} entrades. Quants seients queden lliures?`,a:f*s-v,mid:f*s,
     st:[`Primer calculam quants seients hi ha en total: ${f} × ${s} = ${f*s}.`,`Després restam els venuts: ${f*s} − ${v} = ${f*s-v}.`],h:['Què has de saber primer: quants seients té el teatre?','Quan ho sàpigues, treu-ne els que ja s\'han venut.']}},
   ()=>{const c=pick([5,8,10,12,15]),n=rnd(6,lv?40:20),K=c*n,p=lv?pick([4.5,6.5,7.25,9.8]):rnd(3,12),a=Math.round(n*p*100)/100;return{t:`Un pagès cull ${K} kg de taronges i les posa en caixes de ${c} kg. Ven cada caixa a ${MT.eur(p)}. Quant cobra en total?`,a,u:'€',mid:n,
     st:[`Primer calculam quantes caixes omple: ${K} : ${c} = ${n} caixes.`,`Després multiplicam pel preu: ${n} × ${MT.eur(p)} = ${MT.eur(a)}.`],h:['Què has de saber primer: quantes caixes omple?','Cada caixa es ven a un preu. Quantes caixes ven?']}},
   ()=>{const n=pick([3,4,5,6]),per=rnd(8,lv?25:15),tot=n*per,t=rnd(2,Math.min(12,tot-1)),T=tot-t;return{t:`${n} amics van a sopar. El sopar costa ${T} € i deixen ${t} € de propina. Ho paguen tot a parts iguals. Quant paga cadascú?`,a:per,u:'€',mid:tot,
     st:[`Primer calculam quant paguen en total: ${T} + ${t} = ${tot} €.`,`Després ho repartim: ${tot} : ${n} = ${per} €.`],h:['Què han de pagar en total, comptant la propina?','Ara reparteix el total entre els amics.']}},
   ()=>{const d=rnd(12,48),w=rnd(2,lv?8:4);return{t:`Un autobús escolar fa ${d} km cada dia, de dilluns a divendres. Quants quilòmetres fa en ${w} setmanes?`,a:d*5*w,u:'km',mid:d*5,
     st:[`Primer calculam els km d'una setmana: ${d} × 5 = ${d*5} km.`,`Després multiplicam per les setmanes: ${d*5} × ${w} = ${d*5*w} km.`],h:['Quants dies d\'escola té una setmana?','Calcula primer els km d\'una setmana.']}},
   ()=>{const k=pick([3,4,5,6]),e=rnd(5,20),rest=k*e,u=pick([12,24,30,36]),n=Math.floor(rest/u)+rnd(1,4),tot=n*u,v=tot-rest;return{t:`Una papereria rep ${n} capses de ${u} bolígrafs. En ven ${v} i la resta els col·loca en ${k} prestatges, tots amb el mateix nombre. Quants bolígrafs posa a cada prestatge?`,a:e,mid:rest,
     st:[`Primer calculam quants bolígrafs rep: ${n} × ${u} = ${tot}.`,`Després restam els que ven: ${tot} − ${v} = ${rest}.`,`Al final repartim: ${rest} : ${k} = ${e}.`],h:['Quants bolígrafs rep en total?','Quants en queden després de vendre\'n? Ara reparteix-los.']}}];
  const o=P[lv===0?rnd(0,4):lv===1?rnd(0,5):rnd(2,5)](),dec=!Number.isInteger(o.a);
  return{text:o.t,fields:[dec?MT.fDec(`Resposta${o.u?` (${o.u})`:''}`,o.a):fInt(`Resposta${o.u?` (${o.u})`:''}`,o.a)],hints:o.h,
   steps:[...o.st,`Resposta: <b>${o.u==='€'?MT.eur(o.a):num(o.a)+(o.u?' '+o.u:'')}</b>.`],
   err:x=>!eq(o.mid,o.a)&&near(val(x[0]),o.mid)?'mt_problema_pas':null}}},

/* ---------- 3. Divisibilitat ---------- */
mt_multiples:{mat:'mates',nom:'Múltiples i divisors',ab:'Md',curs:[6],
 teoria:['Els <b>múltiples</b> d\'un nombre s\'obtenen multiplicant-lo per 0, 1, 2, 3, 4... Múltiples de 6: 0, 6, 12, 18, 24... (n\'hi ha infinits).',
  'Un nombre és <b>divisor</b> d\'un altre si el divideix exactament (el residu és 0). Divisors de 12: 1, 2, 3, 4, 6 i 12.',
  'Les dues idees van juntes: si 4 és divisor de 12, aleshores 12 és múltiple de 4.',
  'Truc per trobar tots els divisors: busca parelles que multiplicades donin el nombre. 12 = 1 × 12 = 2 × 6 = 3 × 4. L\'1 i el mateix nombre sempre hi són.'],
 gen(lv){const t=rnd(0,lv?2:1);
  if(t===0){const a=rnd(3,lv===2?25:12),N=rnd(40,lv?400:150),q=Math.floor(N/a),m=(q+1)*a;
   return{text:`Escriu el <b>primer múltiple de ${a}</b> que sigui més gran que ${N}.`,fields:[fInt('Múltiple',m)],
    hints:[`Els múltiples de ${a} són ${a} × 1, ${a} × 2, ${a} × 3... Quantes vegades cap ${a} dins ${N}?`,`Divideix ${N} : ${a} per saber per on vas.`],
    steps:[`Dividim ${N} : ${a} = ${q} (residu ${N%a}).`,`${a} × ${q} = ${q*a}, que no passa de ${N}.`,`El següent múltiple és ${a} × ${q+1} = <b>${m}</b>.`],
    err:x=>{const y=val(x[0]);return y%a===0&&y<=N?'mt_multiple_gran':null}}}
  if(t===1){const N=pick(lv?[24,30,36,40,48,60,72,80,84,90,96,100]:[12,15,16,18,20,21,24,28,30,32,36]),ds=divisors(N),pr=ds.filter(d=>d*d<=N).map(d=>`${d} × ${N/d}`);
   return{text:`Quants <b>divisors</b> té el nombre ${N}?`,fields:[fInt('Nombre de divisors',ds.length)],
    hints:[`Busca parelles de nombres que multiplicades donin ${N}. Comença per 1 × ${N}.`,'Prova amb 2, 3, 4, 5... fins que les parelles es repeteixin.'],
    steps:[`Parelles: ${pr.join(', ')}.`,`Divisors de ${N}: ${ds.join(', ')}.`,`En total en té <b>${ds.length}</b>.`],
    err:x=>{const y=val(x[0]);return y===ds.length-1||y===ds.length-2?'mt_divisors_1n':null}}}
  const a=rnd(3,9),N=rnd(30,120),q=Math.floor(N/a);
  return{text:`Quants múltiples de ${a} hi ha entre 1 i ${N}?`,fields:[fInt('Quantitat',q)],
   hints:[`Els múltiples de ${a} són ${a}, ${2*a}, ${3*a}... Quina operació et diu quantes vegades cap ${a} dins ${N}?`,`Divideix ${N} : ${a}. El quocient és la resposta.`],
   steps:[`Dividim ${N} : ${a} = ${q} (residu ${N%a}).`,`Això vol dir que de ${a} × 1 fins a ${a} × ${q} = ${a*q} tots són múltiples més petits que ${N}.`,`N'hi ha <b>${q}</b>.`]}}},
mt_criteris:{mat:'mates',nom:'Criteris de divisibilitat',ab:'Cd',curs:[6],
 teoria:['Els <b>criteris de divisibilitat</b> ens diuen si un nombre és divisible per un altre sense fer la divisió:',
  '• Per <b>2</b>: acaba en 0, 2, 4, 6 o 8.<br>• Per <b>5</b>: acaba en 0 o en 5.<br>• Per <b>10</b>: acaba en 0.<br>• Per <b>3</b>: la suma de les seves xifres és múltiple de 3.<br>• Per <b>9</b>: la suma de les seves xifres és múltiple de 9.',
  'Exemple: 738 → 7 + 3 + 8 = 18. Com que 18 és múltiple de 3 i de 9, 738 és divisible per 3 i per 9. Com que acaba en 8, també ho és per 2.',
  'Si un nombre és divisible per 2 i per 3, també ho és per 6.'],
 gen(lv){const D=pick(lv===0?[2,5,10,3]:lv===1?[3,9,2,5,9]:[6,15,18,45]),NM={6:'per 2 i per 3 alhora',15:'per 3 i per 5 alhora',18:'per 2 i per 9 alhora',45:'per 5 i per 9 alhora'};
  const max=D===2||D===5;let dg,pos,ok;
  for(;;){const nd=rnd(3,lv?5:4);dg=[rnd(1,9),...Array.from({length:nd-1},()=>rnd(0,9))];pos=[2,5,10].includes(D)?nd-1:rnd(1,nd-1);ok=[];
   for(let c=0;c<=9;c++){dg[pos]=c;if(+dg.join('')%D===0)ok.push(c)}if(ok.length&&ok.length<10)break}
  const ans=max?ok[ok.length-1]:ok[0],shown=dg.map((d,i)=>i===pos?`<span style="display:inline-block;border:2px solid ${C.b};width:.8em;color:${C.b}">?</span>`:d).join('');
  dg[pos]=ans;const full=+dg.join(''),known=dg.filter((_,i)=>i!==pos),S=known.reduce((a,b)=>a+b,0);
  const crit=D===3||D===9?`la suma de les xifres ha de ser múltiple de ${D}`:D===2?'ha d\'acabar en 0, 2, 4, 6 o 8':D===5?'ha d\'acabar en 0 o en 5':D===10?'ha d\'acabar en 0':`ha de complir els dos criteris`;
  const steps=D===3||D===9?[`Sumam les xifres que tenim: ${known.join(' + ')} = ${S}.`,`Busquem la xifra més petita que, sumada a ${S}, doni un múltiple de ${D}: ${S} + ${ans} = ${S+ans}.`,`El nombre és ${full}, i ${full} : ${D} = ${full/D}. La xifra és <b>${ans}</b>.`]
   :[2,5,10].includes(D)?[`Criteri: ${crit}.`,`Les xifres que serveixen són: ${ok.join(', ')}. ${max?'La més gran':'La més petita'} és el ${ans}.`,`El nombre és ${full}. La xifra és <b>${ans}</b>.`]
   :[`Ha de ser divisible ${NM[D]}: ha de complir els dos criteris.`,`Provant les xifres del 0 al 9, les que serveixen són: ${ok.join(', ')}.`,`La més petita és <b>${ans}</b>: ${full} : ${D} = ${full/D}.`];
  return{text:`Quina és la xifra <b>${max?'més gran':'més petita'}</b> que pots posar al quadre perquè el nombre sigui divisible ${NM[D]||'per '+D}?<br><span style="font-size:1.2em;letter-spacing:2px">${shown}</span>`,fields:[{label:'Xifra',ans:R(ans)}],
   hints:[D in NM?'Has de mirar dos criteris alhora. Quins són?':`Recorda el criteri del ${D}.`,`Criteri: ${crit}. Prova xifres una a una.`],steps,
   err:x=>{const c=val(x[0]);if(!Number.isInteger(c)||c<0||c>9)return'mt_una_xifra';const d2=dg.slice();d2[pos]=c;const n=+d2.join('');
    if(n%D===0&&c!==ans)return'mt_criteri_altre';if((D===3||D===9)&&n%D!==0&&n%10!==0&&(n%10)%D===0)return'mt_criteri3';return null}}}},
mt_primers:{mat:'mates',nom:'Nombres primers i descomposició',ab:'Pr',curs:[6],
 teoria:['Un nombre és <b>primer</b> si només té dos divisors: l\'1 i ell mateix (2, 3, 5, 7, 11, 13...). Si en té més, és <b>compost</b>. L\'1 no és ni primer ni compost.',
  'Els nombres primers més petits que 50 són: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43 i 47. El 2 és l\'únic primer parell.',
  '<b>Descompondre</b> un nombre en factors primers és escriure\'l com una multiplicació de nombres primers. Dividim pel primer més petit possible (2, 3, 5, 7...) fins arribar a 1.',
  'Exemple: 60 : 2 = 30 → 30 : 2 = 15 → 15 : 3 = 5 → 5 : 5 = 1. Per tant, 60 = 2 × 2 × 3 × 5 = 2<sup>2</sup> × 3 × 5.'],
 gen(lv){const t=lv===0?pick([0,1]):pick([0,0,1,2]);
  if(t===0){const ps=lv===2?[2,3,5,7]:[2,3,5];let e,N;
   do{e=ps.map((p,i)=>i===0?rnd(1,lv?4:3):rnd(0,i===3?1:2));N=ps.reduce((a,p,i)=>a*p**e[i],1)}while(N<12||N>(lv?2000:400)||e.filter(Boolean).length<2);
   let n=N;const lad=[];for(const p of ps)while(n%p===0){lad.push(`${n} : ${p} = ${n/p}`);n/=p}
   const fac=ps.map((p,i)=>e[i]?(e[i]>1?pw(p,e[i]):`${p}`):null).filter(Boolean).join(' × ');
   return{text:`Descompon <b>${num(N)}</b> en factors primers i escriu els exponents:<br>${N} = ${ps.map(p=>pw(p,'?')).join(' × ')}<br><small class="muted">Si un factor no hi és, el seu exponent és 0.</small>`,
    fields:ps.map((p,i)=>({label:`Exponent del ${p}`,ans:R(e[i])})),
    hints:['Divideix entre 2 tantes vegades com puguis. Després entre 3, després entre 5...','Compta quantes vegades has pogut dividir entre cada nombre primer: aquest és l\'exponent.'],
    steps:[`Dividim pels primers, començant pel 2: ${lad.join(' → ')}.`,`Comptam les vegades: ${ps.map((p,i)=>`pel ${p}, ${e[i]}`).join('; ')}.`,`${num(N)} = <b>${fac}</b>.`]}}
  if(t===1){const N=rnd(lv?20:8,lv?100:50);let q=N+1;while(!isPrime(q))q++;
   const why=[];for(let m=N+1;m<=q;m++){if(m===q){why.push(`${m} només és divisible per 1 i per ${m}: és primer.`);break}let d=2;while(m%d)d++;why.push(`${m} = ${d} × ${m/d}, no és primer.`)}
   return{text:`Escriu el primer <b>nombre primer</b> que és més gran que ${N}.`,fields:[fInt('Nombre primer',q)],
    hints:[`Prova els nombres que venen després de ${N}, un a un.`,'Per a cada nombre, mira si es pot dividir per 2, 3, 5 o 7.'],
    steps:[`Anam provant a partir de ${N+1}:`,why.join('<br>'),`La resposta és <b>${q}</b>.`],
    err:x=>{const y=val(x[0]);return y>N&&y%2===1&&!isPrime(y)?'mt_primer_senar':null}}}
  const a=rnd(10,80),b=a+rnd(9,15),pr=[],od=[];for(let m=a;m<=b;m++){if(isPrime(m))pr.push(m);if(m%2)od.push(m)}
  return{text:`Quants <b>nombres primers</b> hi ha entre ${a} i ${b} (tots dos inclosos)?`,fields:[fInt('Quantitat',pr.length)],
   hints:['Descarta els parells (excepte el 2) i els que acaben en 5.','Dels que queden, mira si es poden dividir per 3 o per 7.'],
   steps:[`Descartam els parells i els múltiples de 3, 5 i 7.`,`Primers entre ${a} i ${b}: ${pr.join(', ')||'cap'}.`,`N'hi ha <b>${pr.length}</b>.`],
   err:x=>od.length!==pr.length&&val(x[0])===od.length?'mt_primer_senar':null}}},
mt_mcm_mcd:{mat:'mates',nom:'Mínim comú múltiple i màxim comú divisor',ab:'Mm',curs:[6],
 teoria:['El <b>mínim comú múltiple</b> (m.c.m.) de dos nombres és el múltiple comú més petit (sense comptar el 0). m.c.m.(4, 6): múltiples de 4 → 4, 8, <b>12</b>... de 6 → 6, <b>12</b>... → m.c.m. = 12.',
  'El <b>màxim comú divisor</b> (m.c.d.) és el divisor comú més gran. m.c.d.(12, 18): divisors de 12 → 1, 2, 3, 4, <b>6</b>, 12; de 18 → 1, 2, 3, <b>6</b>, 9, 18 → m.c.d. = 6.',
  'Als problemes: si cal saber <b>quan tornen a coincidir</b> dues coses que es repeteixen, és el <b>m.c.m.</b> Si cal <b>repartir o tallar en parts iguals</b> tan grans com es pugui, és el <b>m.c.d.</b>'],
 gen(lv){const t=rnd(0,3),mx=lv?90:40;let a,b;
  do{const k=rnd(2,lv?8:6),m=rnd(1,lv?9:5),n=rnd(1,lv?9:5);a=k*m;b=k*n}while(a===b||a<4||b<4||a>mx||b>mx||a%b===0&&lv===2||b%a===0&&lv===2);
  const M=lcm(a,b),G=gcd(a,b),wM=t%2===0,ans=wM?M:G;
  const text=[`Calcula el <b>mínim comú múltiple</b>:<br>m.c.m.(${a}, ${b})`,`Calcula el <b>màxim comú divisor</b>:<br>m.c.d.(${a}, ${b})`,
   pick([`Dos fars s'encenen alhora. Un s'encén cada ${a} segons i l'altre cada ${b} segons. Quants segons passaran, com a mínim, fins que tornin a encendre's alhora?`,`En Joan va a nedar cada ${a} dies i na Laia cada ${b} dies. Avui hi han coincidit. D'aquí a quants dies tornaran a coincidir, com a mínim?`]),
   pick([`Tenim ${a} caramels de maduixa i ${b} de llimona. Volem fer bossetes iguals, sense barrejar sabors i tan grans com sigui possible, sense que en sobri cap. Quants caramels hi haurà a cada bosseta?`,`Tenim dues cintes de ${a} cm i de ${b} cm. Les volem tallar en trossos iguals, tan llargs com sigui possible, sense que en sobri res. Quant ha de fer cada tros?`])][t];
  const mul=x=>Array.from({length:M/x},(_,i)=>x*(i+1)).join(', '),dv=x=>divisors(x).join(', ');
  return{text,fields:[fInt(wM?'m.c.m.':'m.c.d.',ans)],
   hints:[t===2?'Busques quan coincideixen: ha de ser un múltiple de tots dos nombres?':t===3?'Has de repartir sense que en sobri: ha de ser un divisor de tots dos nombres?':wM?`Escriu els primers múltiples de ${a} i de ${b}.`:`Escriu tots els divisors de ${a} i de ${b}.`,
    wM?'Busca el primer nombre que surt a les dues llistes.':'Busca el nombre més gran que surt a les dues llistes.'],
   steps:wM?[t===2?'Les dues coses coincideixen en els múltiples comuns: cal el m.c.m.':`Escrivim múltiples de cada nombre.`,`Múltiples de ${a}: ${mul(a)}. Múltiples de ${b}: ${mul(b)}.`,`El més petit que tenen en comú és <b>${M}</b>.`]
    :[t===3?'Repartim en parts iguals tan grans com es pugui: cal el m.c.d.':'Escrivim els divisors de cada nombre.',`Divisors de ${a}: ${dv(a)}. Divisors de ${b}: ${dv(b)}.`,`El més gran que tenen en comú és <b>${G}</b>.`],
   err:x=>{const y=val(x[0]);if(wM&&y===G&&G!==M)return'mt_mcm_mcd';if(wM&&y===a*b&&a*b!==M)return'mt_mcm_producte';if(!wM&&y===M&&M!==G)return'mt_mcm_mcd';return null}}}},

/* ---------- 4. Potències i arrel quadrada ---------- */
mt_potencies:{mat:'mates',nom:'Potències',ab:'Po',curs:[6],
 teoria:['Una <b>potència</b> és una manera curta d\'escriure una multiplicació de factors iguals: 5 × 5 × 5 = 5<sup>3</sup>.',
  'La <b>base</b> (5) és el nombre que es repeteix i l\'<b>exponent</b> (3) diu quantes vegades. Es llegeix «cinc elevat a tres» o «cinc al cub».',
  'Exponent 2: <b>al quadrat</b> (4<sup>2</sup> = 16). Exponent 3: <b>al cub</b> (2<sup>3</sup> = 8).',
  'Compte! 5<sup>3</sup> no és 5 × 3 = 15, sinó 5 × 5 × 5 = <b>125</b>. I qualsevol nombre elevat a 1 és ell mateix; elevat a 0 dona 1.'],
 gen(lv){const t=lv===0?pick([0,0,1,2]):lv===1?pick([0,1,2]):pick([0,2,3,4]);
  if(t===0||t===2){let b,e;do{if(t===2){e=pick([2,3]);b=e===2?rnd(2,15):rnd(2,lv?10:6)}else if(lv===0){e=rnd(2,3);b=e===2?rnd(2,10):rnd(2,6)}else{e=rnd(2,lv===1?5:4);b=rnd(2,lv===1?6:12)}}while(b===2&&e===2||b**e>(lv===2?20000:10000));
   const v=b**e,txt=t===2?`Calcula el <b>${e===2?'quadrat':'cub'}</b> de ${b}.`:`Calcula:<br><b>${pw(b,e)}</b>`;
   return{text:txt,fields:[fInt('Resultat',v)],
    hints:[`L'exponent diu quantes vegades has de multiplicar la base per ella mateixa.`,`Escriu-ho com a multiplicació: ${Array(e).fill(b).join(' × ')}.`],
    steps:[`${pw(b,e)} vol dir multiplicar ${b} per ell mateix ${e} vegades.`,`${Array(e).fill(b).join(' × ')}${e>2?` = ${b*b} × ${Array(e-2).fill(b).join(' × ')}`:''}.`,`Resultat: <b>${num(v)}</b>.`],
    err:x=>val(x[0])===b*e?'mt_pot_multiplica':null}}
  if(t===1){const b=rnd(2,12),e=rnd(3,6);
   return{text:`Escriu com a potència:<br><b>${Array(e).fill(b).join(' × ')}</b>`,fields:[{label:'Base',ans:R(b)},{label:'Exponent',ans:R(e)}],
    hints:['Quin nombre es repeteix? Aquesta és la base.','Compta quantes vegades es repeteix: aquest és l\'exponent.'],
    steps:[`El nombre que es repeteix és el ${b}: és la base.`,`Es repeteix ${e} vegades: l'exponent és ${e}.`,`${Array(e).fill(b).join(' × ')} = <b>${pw(b,e)}</b>.`],
    err:x=>b!==e&&val(x[0])===e&&val(x[1])===b?'mt_pot_base_exp':null}}
  if(t===3){const b=rnd(2,6),e=rnd(2,3),c=rnd(2,9),f=2,minus=Math.random()<.4&&b**e>c**f,v=minus?b**e-c**f:b**e+c**f;
   return{text:`Calcula:<br><b>${pw(b,e)} ${minus?'−':'+'} ${pw(c,f)}</b>`,fields:[fInt('Resultat',v)],
    hints:['Primer calcula cada potència per separat.',`${pw(b,e)} = ${Array(e).fill(b).join(' × ')}.`],
    steps:[`${pw(b,e)} = ${b**e}.`,`${pw(c,f)} = ${c} × ${c} = ${c*c}.`,`${b**e} ${minus?'−':'+'} ${c*c} = <b>${v}</b>.`],
    err:x=>{const w=minus?b*e-c*f:b*e+c*f;return w!==v&&val(x[0])===w?'mt_pot_multiplica':null}}}
  const b=rnd(2,40),e=pick([0,1]),v=e?b:1;
  return{text:`Calcula:<br><b>${pw(b,e)}</b>`,fields:[fInt('Resultat',v)],
   hints:[e?'Quantes vegades apareix la base si l\'exponent és 1?':'Recorda la regla especial de l\'exponent 0.','Mira la teoria: què passa amb els exponents 0 i 1?'],
   steps:[e?`Exponent 1: la base apareix una sola vegada.`:`Per conveni, qualsevol nombre (excepte el 0) elevat a 0 dona 1.`,`${pw(b,e)} = <b>${v}</b>.`],
   err:x=>{const y=val(x[0]);return e===0&&(y===0||y===b)?'mt_pot_zero':null}}}},
mt_pot10:{mat:'mates',nom:'Potències de 10 i descomposició',ab:'P1',curs:[6],
 teoria:['Les <b>potències de 10</b> són molt fàcils: l\'exponent diu quants zeros hi ha darrere l\'1. 10<sup>3</sup> = 1.000 (3 zeros); 10<sup>6</sup> = 1.000.000 (6 zeros).',
  'Per multiplicar un nombre per una potència de 10, hi afegim tants zeros com indica l\'exponent: 7 × 10<sup>4</sup> = 70.000.',
  'Qualsevol nombre es pot escriure com a suma de xifres per potències de 10 (<b>descomposició polinòmica</b>): 5.302 = 5 × 10<sup>3</sup> + 3 × 10<sup>2</sup> + 2.'],
 gen(lv){const t=pick(lv===0?[0,1]:lv===1?[0,1,2]:[1,2,3]);
  if(t===0){const e=rnd(2,lv?9:6);return{text:`Escriu com a potència de base 10:<br><b>${num(10**e)}</b> = 10<sup>?</sup>`,fields:[{label:'Exponent',ans:R(e)}],
   hints:['Compta quants zeros hi ha darrere l\'1.','L\'exponent és igual al nombre de zeros.'],
   steps:[`${num(10**e)} té ${e} zeros darrere l'1.`,`Per tant, ${num(10**e)} = <b>${pw(10,e)}</b>.`],
   err:x=>val(x[0])===e+1?'mt_pot10_xifres':null}}
  if(t===1){const a=lv?rnd(11,99):rnd(2,9),e=rnd(2,lv?6:5),v=a*10**e;
   return{text:`Quant val?<br><b>${a} × ${pw(10,e)}</b>`,fields:[fInt('Resultat',v)],
    hints:[`${pw(10,e)} és un 1 seguit de ${e} zeros.`,`Multiplicar per ${pw(10,e)} és afegir ${e} zeros.`],
    steps:[`${pw(10,e)} = ${num(10**e)}.`,`${a} × ${num(10**e)}: afegim ${e} zeros al ${a}.`,`Resultat: <b>${num(v)}</b>.`],
    err:x=>{const y=val(x[0]);return y===a*10**(e+1)||y===a*10**(e-1)?'mt_pot10_xifres':y===a*10*e?'mt_pot_multiplica':null}}}
  const es=MT.sample([1,2,3,4,5,6].slice(0,lv===2?6:5),3).sort((p,q)=>q-p),ds=es.map(()=>rnd(1,9)),N=es.reduce((s,e,i)=>s+ds[i]*10**e,0)+(t===2&&Math.random()<.5?rnd(1,9):0),u=N%10;
  const term=(d,e)=>e===1?`${d} × 10`:`${d} × ${pw(10,e)}`;
  if(t===2)return{text:`Quin nombre és?<br><b>${es.map((e,i)=>term(ds[i],e)).join(' + ')}${u?` + ${u}`:''}</b>`,fields:[fInt('Nombre',N)],
   hints:['Calcula cada terme per separat: la xifra seguida de tants zeros com diu l\'exponent.','Després suma-ho tot. Compte amb les posicions que queden buides: hi va un 0.'],
   steps:[`${es.map((e,i)=>`${term(ds[i],e)} = ${num(ds[i]*10**e)}`).join('; ')}.`,`Sumam: ${es.map((e,i)=>num(ds[i]*10**e)).join(' + ')}${u?` + ${u}`:''}.`,`Resultat: <b>${num(N)}</b>.`],
   err:x=>{const y=val(x[0]);return isFinite(y)&&String(y).length!==String(N).length?'mt_zeros':null}};
  return{text:`Completa la descomposició de <b>${num(N)}</b>:<br>${es.map((e,i)=>`${ds[i]} × 10<sup>?</sup>`).join(' + ')}`,fields:es.map((e,i)=>({label:`Exponent del ${ds[i]}`,ans:R(e)})),
   hints:['Mira en quina posició és cada xifra: unitats, desenes, centenes...','Desenes → 10<sup>1</sup>, centenes → 10<sup>2</sup>, milers → 10<sup>3</sup>...'],
   steps:[`Mirem la posició de cada xifra de ${num(N)}.`,es.map((e,i)=>`El ${ds[i]} té ${e} xifres a la dreta → ${pw(10,e)}`).join('; ')+'.',`${num(N)} = <b>${es.map((e,i)=>term(ds[i],e)).join(' + ')}</b>.`],
   err:x=>val(x[0])===es[0]+1?'mt_pot10_xifres':null}}},
mt_arrels:{mat:'mates',nom:'Arrel quadrada',ab:'Rq',curs:[6],
 teoria:['L\'<b>arrel quadrada</b> és l\'operació contrària d\'elevar al quadrat. √49 = 7 perquè 7<sup>2</sup> = 7 × 7 = 49.',
  'Els nombres que tenen arrel exacta es diuen <b>quadrats perfectes</b>: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144...',
  'Si l\'arrel no és exacta, busquem l\'<b>arrel entera</b>: el nombre més gran que, elevat al quadrat, no passa. √30 → 5<sup>2</sup> = 25 i 6<sup>2</sup> = 36. L\'arrel entera és 5 i el <b>residu</b> és 30 − 25 = 5.',
  'Compte: l\'arrel quadrada no és la meitat! √16 = 4, no 8.'],
 fig:()=>{let g='';const k=5,s=26;for(let i=0;i<k;i++)for(let j=0;j<k;j++)g+=`<rect x="${20+i*s}" y="${10+j*s}" width="${s-2}" height="${s-2}" fill="${C.bl}" stroke="${C.b}"/>`;
  return svg(320,150,g+tx(240,50,'5 × 5 = 25',{fs:20})+tx(240,90,'√25 = 5',{fs:20,c:C.b}))},
 gen(lv){const t=lv===0?0:lv===1?pick([0,0,1]):pick([0,1,2]);
  if(t===0){const k=lv===0?rnd(2,10):lv===1?rnd(6,15):rnd(11,30),n=k*k;
   return{text:`Calcula:<br><b>√${num(n)}</b>`,fields:[fInt('Arrel',k)],
    hints:[`Busca un nombre que, multiplicat per ell mateix, doni ${n}.`,`Fixa't en la darrera xifra de ${n}: quins nombres, multiplicats per ells mateixos, acaben així?`],
    steps:[`Busquem un nombre que multiplicat per ell mateix doni ${n}.`,`${k} × ${k} = ${n}.`,`Per tant, √${num(n)} = <b>${k}</b>.`],
    err:x=>n/2!==k&&val(x[0])===n/2?'mt_arrel_meitat':null}}
  const k=rnd(3,lv===2?20:12),n=rnd(k*k+1,(k+1)**2-1);
  if(t===1)return{text:`L'arrel quadrada de ${n} no és exacta. Entre quins dos nombres naturals consecutius es troba?`,fields:[{label:'Més petit',ans:R(k)},{label:'Més gran',ans:R(k+1)}],
   hints:['Pensa en els quadrats perfectes: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100...',`Quin quadrat perfecte queda just per davall de ${n}? I just per damunt?`],
   steps:[`${k}<sup>2</sup> = ${k*k}, que és més petit que ${n}.`,`${k+1}<sup>2</sup> = ${(k+1)**2}, que és més gran que ${n}.`,`Per tant, √${n} és entre <b>${k}</b> i <b>${k+1}</b>.`]};
  return{text:`Calcula l'<b>arrel entera</b> i el <b>residu</b> de √${n}.`,fields:[{label:'Arrel entera',ans:R(k)},{label:'Residu',ans:R(n-k*k)}],
   hints:[`Busca el nombre més gran que, elevat al quadrat, no passa de ${n}.`,'El residu és el que falta per arribar al nombre: nombre − arrel<sup>2</sup>.'],
   steps:[`${k}<sup>2</sup> = ${k*k} ≤ ${n} i ${k+1}<sup>2</sup> = ${(k+1)**2} > ${n}. L'arrel entera és <b>${k}</b>.`,`Residu: ${n} − ${k*k} = <b>${n-k*k}</b>.`,`Comprovació: ${k}<sup>2</sup> + ${n-k*k} = ${n}.`],
   err:x=>val(x[1])>2*k?'mt_arrel_residu':null}}},

/* ---------- 5. Nombres enters ---------- */
mt_enters:{mat:'mates',nom:'Els nombres enters',ab:'Ze',curs:[6],
 teoria:['Els <b>nombres enters</b> són els naturals positius (+1, +2, +3...), el 0 i els <b>negatius</b> (−1, −2, −3...).',
  'Els feim servir per a temperatures sota zero (−3 °C), plantes d\'un soterrani (−2), alçades sota el nivell del mar o deutes.',
  'A la <b>recta numèrica</b>, els negatius van a l\'esquerra del 0 i els positius a la dreta. Un nombre és més gran com més a la dreta és: −2 > −7.',
  'L\'<b>oposat</b> d\'un nombre és el que és a la mateixa distància del 0, a l\'altre costat: l\'oposat de −5 és +5.'],
 fig:()=>recta(-8,8,-3),
 gen(lv){const t=pick(lv===0?[0,1,3,4]:lv===1?[0,1,2,3]:[0,2,3]);
  const sg='mt_enters_signe',L='Resposta (si és negativa, posa el signe −)';
  if(t===0){let t0,d,up,r;do{t0=rnd(-8,6);d=rnd(3,12);up=Math.random()<.55;r=t0+(up?d:-d)}while(Math.abs(r)>15);
   return{text:`A les 7 del matí el termòmetre marcava <b>${zs(t0)} °C</b>. Fins al migdia la temperatura ${up?'va pujar':'va baixar'} <b>${d} graus</b>. Quina temperatura feia al migdia?`,fig:lv===0?recta(-15,15,t0):null,fields:[{label:'Temperatura (°C)',ans:R(r)}],
    hints:[`Situa ${zs(t0)} a la recta numèrica.`,`${up?'Pujar':'Baixar'} vol dir moure't ${d} llocs cap a la ${up?'dreta':'esquerra'}.`],
    steps:[`Partim de ${zs(t0)} °C.`,`Ens movem ${d} llocs cap a la ${up?'dreta':'esquerra'}: ${zs(t0)} ${up?'+':'−'} ${d} = ${zs(r)}.`,`Temperatura al migdia: <b>${zs(r)} °C</b>.`],
    err:x=>r!==0&&val(x[0])===-r?sg:null}}
  if(t===1){let f,d,up,r;do{f=rnd(-4,4);d=rnd(2,8);up=Math.random()<.5;r=f+(up?d:-d)}while(r<-5||r>12);
   return{text:`Un ascensor és a la planta <b>${zs(f)}</b>${f<0?' (al soterrani)':f===0?' (la planta baixa)':''} i ${up?'puja':'baixa'} <b>${d} plantes</b>. A quina planta arriba?`,fig:lv===0?recta(-8,12,f):null,fields:[{label:L,ans:R(r)}],
    hints:['La planta baixa és el 0. Els soterranis són negatius.',`${up?'Pujar':'Baixar'} ${d} plantes és moure't ${d} llocs cap a la ${up?'dreta':'esquerra'} de la recta.`],
    steps:[`Partim de la planta ${zs(f)}.`,`${zs(f)} ${up?'+':'−'} ${d} = ${zs(r)}.`,`Arriba a la planta <b>${zs(r)}</b>.`],
    err:x=>r!==0&&val(x[0])===-r?sg:null}}
  if(t===2){const a=rnd(1,15),b=-rnd(1,12);
   return{text:`Al migdia el termòmetre marcava <b>${a} °C</b> i a la nit, <b>${zs(b)} °C</b>. Quants graus ha baixat la temperatura?`,fig:recta(-15,15,a,b),fields:[{label:'Graus',ans:R(a-b)}],
    hints:['Per anar d\'un nombre positiu a un de negatiu has de passar pel 0.',`De ${a} a 0 hi ha ${a} graus. I de 0 a ${zs(b)}?`],
    steps:[`De ${a} °C a 0 °C baixa ${a} graus.`,`De 0 °C a ${zs(b)} °C baixa ${-b} graus més.`,`En total: ${a} + ${-b} = <b>${a-b} graus</b>.`],
    err:x=>val(x[0])===a+b?'mt_enters_diferencia':null}}
  if(t===3){let s,d,dr,r;do{s=rnd(-6,6);d=rnd(2,9);dr=Math.random()<.5;r=s+(dr?d:-d)}while(Math.abs(r)>12);
   return{text:`A la recta numèrica, quin nombre hi ha <b>${d} unitats a la ${dr?'dreta':'esquerra'}</b> del ${zs(s)}?`,fig:recta(-12,12,s),fields:[{label:L,ans:R(r)}],
    hints:[`Situa't al ${zs(s)} (el punt taronja).`,`Compta ${d} passos cap a la ${dr?'dreta':'esquerra'}.`],
    steps:[`Partim del ${zs(s)}.`,`Ens movem ${d} unitats cap a la ${dr?'dreta (sumam)':'esquerra (restam)'}: ${zs(s)} ${dr?'+':'−'} ${d} = ${zs(r)}.`,`El nombre és <b>${zs(r)}</b>.`],
    err:x=>r!==0&&val(x[0])===-r?sg:null}}
  let n;do{n=rnd(-20,20)}while(!n);const ab=Math.random()<.5;
  return{text:ab?`Quin és el <b>valor absolut</b> de ${zs(n)}? (la seva distància al 0)`:`Escriu l'<b>oposat</b> de ${zs(n)}.`,fields:[{label:L,ans:R(ab?Math.abs(n):-n)}],
   hints:[ab?'El valor absolut és la distància al 0, i una distància mai és negativa.':'L\'oposat és a la mateixa distància del 0, però a l\'altre costat.',`${zs(n)} és a ${Math.abs(n)} unitats del 0.`],
   steps:[`${zs(n)} és a ${Math.abs(n)} unitats del 0.`,ab?`El valor absolut és aquesta distància: <b>${Math.abs(n)}</b>.`:`L'oposat és a la mateixa distància a l'altre costat: <b>${zs(-n)}</b>.`]}}},
mt_enters_op:{mat:'mates',nom:'Sumar i restar nombres enters',ab:'Z±',curs:[6],
 teoria:['<b>Sumar enters del mateix signe:</b> sumam els valors i deixam el signe. (−3) + (−5) = −8.',
  '<b>Sumar enters de signe diferent:</b> restam els valors i posam el signe del que té el valor més gran. (−7) + 4 = −3; 9 + (−2) = 7.',
  '<b>Restar</b> és sumar l\'oposat: 5 − (−3) = 5 + 3 = 8; −2 − 6 = −2 + (−6) = −8.',
  'Si et costa, pensa en diners: tenir 5 € és +5 i deure 3 € és −3.'],
 fig:()=>recta(-10,10,-7,-3),
 gen(lv){const nt=lv===2?3:2;let a,ts,v,w,expr,conv;
  do{a=rnd(-12,12);ts=[];v=a;w=a;expr=zs(a);conv=zs(a);
   for(let i=1;i<nt;i++){const b=rnd(-12,12),op=lv===0?'+':pick(['+','−']);ts.push([op,b]);if(op==='+'){v+=b;w+=b;conv+=` + ${zp(b)}`}else{v-=b;w+=b<0?b:-b;conv+=` + ${zp(-b)}`}expr+=` ${op} ${zp(b)}`}
  }while(!a||ts.some(t=>!t[1])||(lv===0&&a>0&&ts[0][1]>0)||(lv>0&&!ts.some(t=>t[0]==='−'&&t[1]<0)&&Math.random()<.6));
  let part=a;const sums=ts.map(([op,b])=>{const nb=op==='+'?b:-b,o=`${zs(part)} + ${zp(nb)} = ${zs(part+nb)}`;part+=nb;return o});
  return{text:`Calcula:<br><b>${expr}</b>`,fields:[{label:'Resultat (si és negatiu, posa el signe −)',ans:R(v)}],
   hints:[ts.some(t=>t[0]==='−')?'Canvia cada resta per la suma de l\'oposat: − (−5) = + 5 i − 5 = + (−5).':'Mira els signes: són iguals o diferents?','Si els signes són diferents, resta els valors i posa el signe del que té el valor més gran.'],
   steps:[ts.some(t=>t[0]==='−')?`Canviam les restes per sumes de l'oposat: ${conv}.`:`Tenim: ${expr}.`,...sums,`Resultat: <b>${zs(v)}</b>.`],
   err:x=>{const y=val(x[0]);if(w!==v&&y===w)return'mt_menys_menys';if(v!==0&&y===-v)return'mt_enters_signe';return null}}}}
});
})();
