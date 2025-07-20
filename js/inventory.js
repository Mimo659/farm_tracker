export function renderInventory(data) {
  const grid = document.getElementById('inventory-grid');
  grid.innerHTML = '';

  // Filter and sort items: collected items go to the bottom
  const collectedItems = data.items.filter(item => item.collected);
  const uncollectedItems = data.items.filter(item => !item.collected);

  // Combine the two arrays with uncollected items first
  const sortedItems = uncollectedItems.concat(collectedItems);

  sortedItems.forEach(item => {
    const card = document.createElement('div');
    card.className = `glass pixel-border p-3 flex flex-col items-center space-y-2 cursor-pointer
        ${item.collected ? 'opacity-50' : ''}`;
    card.innerHTML = `
      <img src="images/items/${item.img}" class="w-14 h-14 object-contain">
      <span class="text-xs">${item.name}</span>
      <span class="text-xs">${item.collected ? '✔' : ''}</span>
    `;
    card.addEventListener('click', () => {
      item.collected = !item.collected;
      localStorage.setItem('stardewSave', JSON.stringify(data));
      renderInventory(data);
    });
    grid.appendChild(card);
  });
}