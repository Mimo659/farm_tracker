import { loadGameData } from './dataLoader.js';
import { renderInventory } from './inventory.js';
import { renderVillagers } from './villagers.js';
import { renderBundles }   from './bundles.js';
import { renderMuseum }    from './museum.js';
import { renderFish }      from './fish.js';
import { renderDailyTasks } from './dailyTasks.js';
import { renderFarmPlanner } from './farmPlanner.js';

const STORAGE_KEY = 'stardewSave';

// ---------- load or create ----------
(async () => {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const fresh = await loadGameData();
  const data = saved ? { ...fresh, ...saved } : fresh;

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
        case 'planner': renderFarmPlanner(data); break;

      }
    })
  );

  // ---------- start ----------
  tabs[0].click();
})();