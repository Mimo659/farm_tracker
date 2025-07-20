import { loadGameData } from './dataLoader.js';
import { renderInventory } from './inventory.js';
import { renderVillagers } from './villagers.js';
import { renderBundles }   from './bundles.js';
import { renderMuseum }    from './museum.js';
import { renderFish } from './fish.js';

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
      case 'inventory': renderInventory(data); break;
      case 'villagers': renderVillagers(data); break;
      case 'bundles':   renderBundles(data);   break;
      case 'museum':    renderMuseum(data);    break;
      case 'fish':      renderFish(data);      break;
    }
  })
);

// ---------- start ----------
refreshHeader();
tabs[0].click();   // default: inventory