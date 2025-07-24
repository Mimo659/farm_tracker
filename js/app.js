import { loadGameData } from './dataLoader.js';
import { renderInventory } from './inventory.js';
import { renderVillagers } from './villagers.js';
import { renderBundles }   from './bundles.js';
import { renderMuseum }    from './museum.js';
import { renderFish }      from './fish.js';
import { renderDailyTasks } from './dailyTasks.js';

const STORAGE_KEY = 'stardewSave';
let data;          // will hold the merged save

// ---------- load or create ----------
(async () => {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const fresh = await loadGameData();          // always has dailyTasks
  data = saved ? { ...fresh, ...saved } : fresh;

  // ---------- wire up UI ----------
  document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm('Delete everything?')) {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }
  });

  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(btn =>
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.tab-content')
              .forEach(p => p.classList.add('hidden'));

      const tab = btn.dataset.tab;
      document.getElementById(`${tab}-tab`).classList.remove('hidden');

      switch (tab) {
        case 'inventory':  renderInventory(data); break;
        case 'villagers':  renderVillagers(data); break;
        case 'bundles':    renderBundles(data);   break;
        case 'museum':     renderMuseum(data);    break;
        case 'fish':       renderFish(data);      break;
        case 'dailyTasks': renderDailyTasks(data); break;
      }
    })
  );

  // open first tab
  tabs[0].click();
})();