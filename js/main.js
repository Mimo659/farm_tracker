import { loadGameData } from './dataLoader.js';
import { renderInventory } from './inventory.js';
import { renderFarming } from './farming.js';
import { renderVillagers } from './villagers.js';
import { renderCalendar } from './calendar.js';
import { renderAnimals } from './animals.js';
import { renderSkills } from './skills.js';
import { renderMines } from './mines.js';
import { renderShipping } from './shipping.js';
import { renderQuests } from './quests.js';
import { renderMuseum } from './museum.js';
import { startClock } from './clock.js';
import { startSettings } from './settings.js';

let data, currentTab = 'inventory';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

async function init() {
  data = await loadGameData();
  setupLanding();
  setupTabs();
  startClock(data);
  startSettings(data);
}

function setupLanding() {
  $('#setup-form').addEventListener('submit', e => {
    e.preventDefault();
    data.farmInfo.name   = $('#farm-name').value;
    data.farmInfo.player = $('#player-name').value;
    data.farmInfo.season = $('#current-season').value;
    $('#landing-modal').classList.add('hidden');
    $('#main-content').classList.remove('hidden');
    $('#date-display').textContent = `${data.farmInfo.season} 1, Year ${data.farmInfo.year}`;
  });
}

function setupTabs() {
  $$('[data-tab]').forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));
}

function switchTab(tab) {
  currentTab = tab;
  $$('.tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  $$('.tab-content').forEach(p => p.classList.toggle('hidden', p.id !== `${tab}-tab`));
  if (tab === 'inventory') renderInventory(data);
  if (tab === 'farming')   renderFarming(data);
  if (tab === 'villagers') renderVillagers(data);
  if (tab === 'calendar')  renderCalendar(data);
  if (tab === 'animals')   renderAnimals(data);
  if (tab === 'skills')    renderSkills(data);
  if (tab === 'mines')     renderMines(data);
  if (tab === 'shipping')  renderShipping(data);
  if (tab === 'quests')    renderQuests(data);
  if (tab === 'museum')    renderMuseum(data);
}

init();