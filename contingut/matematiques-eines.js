/* Aprenem - MATEMÀTIQUES: eines comunes per als temes de 6è (format de nombres, camps de resposta, dibuixos SVG)
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes.
   Tot queda dins l'objecte MT perquè no xoqui amb noms d'altres assignatures. */
const MT=(()=>{
 // Nombre amb coma decimal i punt de milers (a partir de 10.000, com als llibres). Els negatius amb el signe −.
 const dc=x=>{let s=(Math.round(x*1e6)/1e6).toString();let[i,d]=s.split('.');const neg=i.startsWith('-');if(neg)i=i.slice(1);
  if(+i>=10000)i=i.replace(/\B(?=(\d{3})+(?!\d))/g,'.');return(neg?'−':'')+i+(d?','+d:'')};
 const eur=x=>(Math.round(x*100)/100).toFixed(2).replace('.',',').replace(',00','')+' €';
 // Valor numèric d'una resposta (objecte fracció o text de camp txt)
 const val=x=>{if(x==null)return NaN;if(typeof x==='string'){const t=x.replace(/\s/g,'');return /^-?\d+$/.test(t)?parseInt(t,10):NaN}return x.n/x.d};
 const eq=(a,b)=>Math.abs(a-b)<1e-9;
 const near=(y,z)=>isFinite(y)&&isFinite(z)&&Math.abs(y-z)<1e-7*Math.max(1,Math.abs(z));
 // Camp per a un enter. Si és gran (≥1000), s'accepta escrit amb punts o espais (1.250 / 1 250 / 1250).
 const fInt=(label,n)=>Math.abs(n)>=1000?{label,txt:[dc(n).replace('−','-'),String(n),String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ')]}:{label,ans:R(n)};
 // Camp per a un decimal exacte (fins a 3 xifres decimals)
 const fDec=(label,x)=>{const n=Math.round(x*1000);return n%1000===0?fInt(label,n/1000):{label,ans:R(n,1000)}};
 // Camp de paraula (accepta majúscules, accents i articles)
 const fTxt=(label,arr)=>({label,txt:arr,loose:true});
 const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
 const sample=(a,k)=>shuf(a).slice(0,k);
 const isPrime=n=>{if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i===0)return false;return true};
 const divisors=n=>{const d=[];for(let i=1;i<=n;i++)if(n%i===0)d.push(i);return d};
 const pw=(b,e)=>`${b}<sup>${e}</sup>`;
 // Nombres en lletres (fins a 999.999.999)
 const U=['zero','un','dos','tres','quatre','cinc','sis','set','vuit','nou','deu','onze','dotze','tretze','catorze','quinze','setze','disset','divuit','dinou'];
 const D=['','','vint','trenta','quaranta','cinquanta','seixanta','setanta','vuitanta','noranta'];
 const w99=n=>n<20?U[n]:D[Math.floor(n/10)]+(n%10?(n<30?'-i-':'-')+U[n%10]:'');
 const w999=n=>{const c=Math.floor(n/100),r=n%100;return[c===0?'':c===1?'cent':U[c]+'-cents',r?w99(r):''].filter(Boolean).join(' ')};
 const lletres=n=>{if(!n)return'zero';const m=Math.floor(n/1e6),k=Math.floor(n/1000)%1000,u=n%1000,p=[];
  if(m)p.push(m===1?'un milió':w999(m)+' milions');if(k)p.push(k===1?'mil':w999(k)+' mil');if(u)p.push(w999(u));return p.join(' ')};
 // Dibuixos
 const C={b:'#2F6BFF',bl:'#E3ECFF',o:'#F59E0B',ol:'#FFF1D6',t:'#1D2433',g:'#8A94A6',gl:'#E6E9F0',r:'#EF4E5A',gr:'#22A45D',grl:'#DDF5E6'};
 const svg=(w,h,inner,max)=>`<svg viewBox="0 0 ${w} ${h}" style="width:100%;max-width:${max||w}px;height:auto;display:block;margin:0 auto;font-family:system-ui,-apple-system,'Segoe UI',sans-serif" role="img" aria-hidden="true">${inner}</svg>`;
 const f1=v=>typeof v==='number'?v.toFixed(1):v;
 const tx=(x,y,s,o={})=>`<text x="${f1(x)}" y="${f1(y)}" font-size="${o.fs||16}" font-weight="${o.fw||700}" fill="${o.c||C.t}" text-anchor="${o.a||'middle'}" dominant-baseline="central">${s}</text>`;
 const pts=a=>a.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ');
 const ln=(x1,y1,x2,y2,o={})=>`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${o.c||C.t}" stroke-width="${o.w||2}"${o.dash?' stroke-dasharray="6 5"':''}/>`;
 // Vèrtexs d'un polígon regular de n costats amb el costat de baix horitzontal
 const regPts=(n,cx,cy,r)=>{const rot=-Math.PI/2+(n%2?0:Math.PI/n);return Array.from({length:n},(_,k)=>[cx+r*Math.cos(rot+2*Math.PI*k/n),cy+r*Math.sin(rot+2*Math.PI*k/n)])};
 // Taula senzilla (HTML) per a la teoria
 const taula=(cap,files)=>`<div class="tablewrap"><table class="mini"><tr>${cap.map(c=>`<th>${c}</th>`).join('')}</tr>${files.map(f=>`<tr>${f.map(c=>`<td style="text-align:center">${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
 // Fracció ja simplificada per mostrar (enter si el denominador és 1)
 const fr=(n,d)=>{const s=R(n,d);return s.d===1?String(s.n):F(s.n,s.d)};
 // Nom (sense accents ni articles) per comparar respostes de paraula
 const fo=s=>typeof fold==='function'?fold(s||''):String(s||'').toLowerCase();
 return{dc,num:dc,eur,val,eq,near,fr,fo,fInt,fDec,fTxt,shuf,sample,isPrime,divisors,pw,lletres,C,svg,tx,pts,ln,taula,regPts};
})();
