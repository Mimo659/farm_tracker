export function renderMuseum(data) {
  const grid = document.getElementById('museum-grid');
  grid.innerHTML = '';

  // Filter and sort items: collected items go to the bottom
  const collectedItems = data.museum.filter(item => item.collected);
  const uncollectedItems = data.museum.filter(item => !item.collected);

  // Combine the two arrays with uncollected items first
  const sortedItems = uncollectedItems.concat(collectedItems);

  sortedItems.forEach(m => {
    const card = document.createElement('div');
    card.className = `glass pixel-border p-3 flex flex-col items-center space-y-2 cursor-pointer ${m.collected ? 'opacity-50' : ''}`;
    card.innerHTML = `
      <img src="images/items/${m.img}" class="w-14 h-14 object-contain">
      <span class="text-xs">${m.name}</span>
      <span class="text-xs">${m.collected ? '✔' : ''}</span>
      <button class="mt-2 text-xs px-2 py-1 bg-primary text-white rounded">
        Location
      </button>

      <!-- location panel (initially hidden) -->
      <div class="hidden mt-2 text-xs space-y-1 w-full">
        <div class="text-xs text-gray-500">${m.location}</div>
      </div>
    `;
    card.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') return;
      m.collected = !m.collected;
      localStorage.setItem('stardewSave', JSON.stringify(data));
      renderMuseum(data);
    });

    // location button opens/closes panel
    const btn = card.querySelector('button');
    const panel = card.querySelector('div.hidden');
    btn.addEventListener('click', e => {
      e.stopPropagation();
      panel.classList.toggle('hidden');
    });
    grid.appendChild(card);
  });
}