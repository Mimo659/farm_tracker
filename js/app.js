import { loadGameData } from './dataLoader.js';
import { renderInventory } from './inventory.js';
import { renderVillagers } from './villagers.js';
import { renderBundles }   from './bundles.js';
import { renderMuseum }    from './museum.js';

const STORAGE_KEY = 'stardewSave';
let data;

// ---------- load or create ----------
(function () {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (saved) data = saved;
  else data = null;
})();

if (!data) data = await loadGameData(); // skeleton

// ---------- helpers ----------
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  refreshHeader();
}

function refreshHeader() {
  const f = data.farmInfo;
  document.getElementById('date-display').textContent = `${f.season} 1, Year ${f.year}`;
  document.getElementById('money-display').textContent = `${f.money}g`;
}

function loadDashboard() {
  const f = data.farmInfo;
  document.getElementById('dash-farm-name').value = f.name || '';
  document.getElementById('dash-player').value   = f.player || '';
  document.getElementById('dash-season').value   = f.season || 'spring';
  document.getElementById('dash-year').value     = f.year || 1;
  document.getElementById('dash-money').value    = f.money || 500;
  document.getElementById('dash-layout').value   = f.layout || 'Standard';
  document.getElementById('dash-pet').value      = f.pet || 'Dog';
}

// ---------- dashboard form ----------
document.getElementById('save-dash').addEventListener('click', () => {
  data.farmInfo = {
    name:   document.getElementById('dash-farm-name').value.trim(),
    player: document.getElementById('dash-player').value.trim(),
    season: document.getElementById('dash-season').value,
    year:   parseInt(document.getElementById('dash-year').value, 10),
    money:  parseInt(document.getElementById('dash-money').value, 10),
    layout: document.getElementById('dash-layout').value,
    pet:    document.getElementById('dash-pet').value
  };
  save();
  alert('Dashboard saved!');
});

// ---------- reset ----------
document.getElementById('reset-btn').addEventListener('click', () => {
  if (confirm('Delete everything?')) {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
});

// ---------- tab switching ----------
const tabs = document.querySelectorAll('.tab');
tabs.forEach(btn =>
  btn.addEventListener('click', () => {
    tabs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    [...document.querySelectorAll('.tab-content')].forEach(p => p.classList.add('hidden'));
    const tab = btn.dataset.tab;
    document.getElementById(`${tab}-tab`).classList.remove('hidden');

    switch (tab) {
      case 'dashboard': loadDashboard(); break;
      case 'inventory': renderInventory(data); break;
      case 'villagers': renderVillagers(data); break;
      case 'bundles':   renderBundles(data);   break;
      case 'museum':    renderMuseum(data);    break;
    }
  })
);

// ---------- start ----------
refreshHeader();
tabs[0].click();   // default: dashboard