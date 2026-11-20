/* Aprenem - icones de linia i codis de tema (disseny v2)
   Part de l'app d'estudi. Vegeu CLAUDE.md per a l'estructura i les normes. */
/* ================= v2: icones de línia i codis de tema ================= */
const ICO=d=>`<svg class="ic" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true">${d}</svg>`;
const IC={
 layers:ICO('<path d="M12 3 2 8l10 5 10-5Z"/><path d="m2 13 10 5 10-5"/><path d="m2 18 10 5 10-5"/>'),
 cap:ICO('<path d="M2 9 12 4l10 5-10 5Z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v6"/>'),
 map:ICO('<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3Z"/><path d="M9 3v15M15 6v15"/>'),
 grid:ICO('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 17.5h7M17.5 14v7"/>'),
 pen:ICO('<path d="M4 20h4L19 9l-4-4L4 16Z"/><path d="m13 7 4 4"/>'),
 target:ICO('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'),
 calc:ICO('<rect x="5" y="2.5" width="14" height="19"/><path d="M8 6.5h8M8.5 11h1M11.5 11h1M14.5 11h1M8.5 14.5h1M11.5 14.5h1M8.5 18h1M11.5 18h1M15 14v5"/>'),
 globe:ICO('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z"/>'),
 flask:ICO('<path d="M9 3h6M10 3v6L4 20h16L14 9V3"/><path d="M7 15h10"/>'),
 book:ICO('<path d="M3 5h6a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H3Z"/><path d="M21 5h-6a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h7Z"/>'),
 list:ICO('<path d="M9 6h12M9 12h12M9 18h12M4 6h1M4 12h1M4 18h1"/>'),
 check:ICO('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
 lock:ICO('<rect x="4" y="11" width="16" height="10"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
 flame:ICO('<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.2 1-3.6 2.2-4.8.2 1.6 1 2.6 2.3 3 .2-3.3-.7-5.8.5-8.2Z"/>'),
};
Object.assign(MODES.combinada,{ic:IC.layers});Object.assign(MODES.professor,{ic:IC.cap});Object.assign(MODES.aventura,{ic:IC.map});
Object.assign(MODES.exercicis,{ic:IC.grid});Object.assign(MODES.escriptura,{ic:IC.pen});Object.assign(MODES.comprovacio,{ic:IC.target});
IC.search=ICO('<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>');
IC.leaf=ICO('<path d="M5 19c0-9 6-15 15-15 0 9-6 15-15 15Z"/><path d="M5 19 13 11"/>');
IC.music=ICO('<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>');
IC.quote=ICO('<path d="M4 18h5l1.5-4V7H4v7h3zM13.5 18h5L20 14V7h-6.5v7h3z"/>');
SUBJ.catala.ic=IC.quote;SUBJ.castella.ic=IC.book;SUBJ.mates.ic=IC.calc;SUBJ.angles.ic=IC.globe;SUBJ.ciencies.ic=IC.leaf;SUBJ.musica.ic=IC.music;
const AB={frac_equiv:'Fe',frac_suma_igual:'F+',frac_suma_dif:'F±',frac_de_nombre:'Fn',decimals:'Dc',divisions:'Dv',percentatges:'%',
 en_present:'Ps',en_cont:'Pc',en_be:'Be',en_was:'Ww',en_reg_past:'Rg',en_irr_past:'Ir',en_irr_pp:'Pp',en_irr_inf:'If',en_verb_sig:'Tr',en_past:'Sp',en_past_neg:'Ng',en_plural:'Pl',en_compar:'Cm',en_vocab:'Vc',en_listen:'Ls',
 ci_cos:'Ch',ci_plantes:'Pt',ci_ecosis:'Ec',ci_materia:'Mt',ci_classif:'Cl',ci_energia:'En',ci_univers:'Un',ci_llibre:'Lb',ci_respiratori:'Rs'};
IC.lungs=ICO('<path d="M12 3v8M12 11c-1.5 1.2-3 1.8-4.5 1.8M12 11c1.5 1.2 3 1.8 4.5 1.8"/><path d="M8.5 6.5C5.5 7 3.5 11 3.5 16c0 2.5 1.5 4 4 4 2 0 3-1 3-3V8.5c0-1.2-.8-2.2-2-2Z"/><path d="M15.5 6.5c3 .5 5 4.5 5 9.5 0 2.5-1.5 4-4 4-2 0-3-1-3-3V8.5c0-1.2.8-2.2 2-2Z"/>');
// Codi de 2 lletres: la propietat ab del tema (preferida) o la taula AB
for(const k in SK)SK[k].ic=`<span class="ab">${SK[k].ab||AB[k]||SK[k].nom.slice(0,2)}</span>`;

// v5: icones de la closca (menú, barra inferior) i de la pantalla d'exercici
IC.home=ICO('<path d="M3 11 12 4l9 7v9h-6v-6H9v6H3Z"/>');
IC.chart=ICO('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>');
IC.bulb=ICO('<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3Z"/>');
IC.speaker=ICO('<path d="M11 5 6 9H2v6h4l5 4ZM16 9a4 4 0 0 1 0 6"/>');
IC.x=ICO('<path d="M6 6l12 12M18 6 6 18"/>');
IC.okc=ICO('<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>');
IC.chev=ICO('<path d="m6 9 6 6 6-6"/>');
IC.left=ICO('<path d="M15 6l-6 6 6 6"/>');
