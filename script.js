/* Ohio State Buckeyes — editable demo data. Replace sample players, fixtures, stats and URLs before publishing. */
const players = []; // No players listed yet; add your roster here when ready.
const games = [
 {month:'',day:'',weekday:'',opponent:'',mark:'',type:'',venue:' · ',status:''},
];
const redirects = {
  recruitingForm: 'https://forms.google.com/',
  staffContact: 'https://www.google.com/',
  social: 'https://www.instagram.com/'
};
const rosterGrid = document.getElementById('rosterGrid');
const search = document.getElementById('rosterSearch');
let activePosition = 'All';
function renderRoster(){
 const q = search ? search.value.trim().toLowerCase() : '';
 const visible = players.filter(p => (activePosition==='All' || (activePosition==='DEF' ? p.position==='DEF' : p.position===activePosition)) && `${p.name} ${p.position} ${p.hometown} ${p.number}`.toLowerCase().includes(q));
 rosterGrid.innerHTML = visible.length ? visible.map((p)=>`<button class="player-card" data-player="${p.number}" aria-label="Open profile for ${p.name}"><span class="player-art"><span class="pos-badge">${p.position==='DEF'?'DEFENSE':p.position}</span><span class="jersey">${p.number}</span></span><span class="player-info"><span class="player-number">#${p.number.toString().padStart(2,'0')}</span><span class="player-name">${p.name}</span><span class="player-meta"><span>${p.position==='DEF'?'Defense':p.position}</span><span>${p.year}</span></span><span class="player-link">View Player Profile ↗</span></span></button>`).join('') : '<div class="empty-roster"><span class="empty-roster-mark">OSU</span><h3>ROSTER COMING SOON</h3><p>Player profiles will be added here when the roster is ready.</p></div>';
}
function renderSchedule(){document.getElementById('scheduleList').innerHTML = games.map(g=>`<article class="game-row"><div class="game-date"><span>${g.month}</span><b>${g.day}</b><span>${g.weekday}</span></div><div class="opponent"><span class="opponent-mark">${g.mark}</span><div><b>${g.opponent}</b><small>${g.type}</small></div></div><div class="game-location">${g.venue}</div><span class="game-status">${g.status}</span></article>`).join('');}
const modal = document.getElementById('playerModal');
function openPlayer(number){const p=players.find(x=>x.number===Number(number));if(!p)return;document.getElementById('modalContent').innerHTML=`<div class="modal-top"><div><span class="pos">${p.position==='DEF'?'DEFENSE':p.position} · ${p.year.toUpperCase()}</span><h2 id="modalName">${p.name}</h2><span>#${String(p.number).padStart(2,'0')} · ${p.hometown}</span></div><span class="num">${p.number}</span></div><p class="modal-bio">${p.bio}</p><div class="modal-details"><div><small>Position</small><b>${p.position==='DEF'?'Defense':p.position}</b></div><div><small>Height</small><b>${p.height}</b></div><div><small>Weight</small><b>${p.weight}</b></div></div><p class="fineprint">Demo profile — replace with your own roster information.</p>`;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';document.getElementById('modalClose').focus();}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
rosterGrid.addEventListener('click',e=>{const card=e.target.closest('[data-player]');if(card)openPlayer(card.dataset.player)});
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');activePosition=btn.dataset.position;renderRoster()}));
if(search) search.addEventListener('input',renderRoster);
document.getElementById('modalClose').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target.dataset.close)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
const menuToggle=document.getElementById('menuToggle'), nav=document.getElementById('mainNav');menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.textContent=open?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰'}));
const toast=document.getElementById('toast');let toastTimer;function showToast(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600)}
document.querySelectorAll('[data-news]').forEach(btn=>btn.addEventListener('click',()=>showToast(`“${btn.dataset.news}” is a sample story. Replace this button with your article URL in index.html.`)));
// These constants are ready for your real destinations. Change the anchor hrefs in index.html to match them before publishing.
window.OSU_REDIRECTS=redirects;
// Highlight the current section in the navigation.
const sections=[...document.querySelectorAll('.page-section[id]')];if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){nav.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id))}}),{rootMargin:'-25% 0px -60% 0px'});sections.forEach(s=>observer.observe(s));}
renderRoster();renderSchedule();
