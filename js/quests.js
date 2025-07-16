export function renderQuests(data) {
  const bundleDiv = document.getElementById('quests-content');
  bundleDiv.innerHTML = '<h2 class="text-sm mb-2">Bundles</h2><div class="auto-grid">' +
    data.bundles.map(b => `
      <div class="glass pixel-border p-3 text-xs">
        <h3 class="text-sm">${b.name}</h3>
        <button class="text-xs px-2 py-1 bg-primary text-white rounded"
                onclick="toggleBundle(${b.id})">${b.completed ? '✔' : 'Complete'}</button>
      </div>`).join('') + '</div>';
}
window.toggleBundle = id => {
  const b = data.bundles.find(x=>x.id===id);
  b.completed = !b.completed;
  renderQuests(data);
};