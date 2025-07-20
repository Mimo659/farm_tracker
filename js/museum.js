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
      <div class="text-xs text-gray-500">${m.location}</div>
    `;
    card.addEventListener('click', () => {
      m.collected = !m.collected;
      // Save the updated data to local storage
      localStorage.setItem('stardewSave', JSON.stringify(data));
      // Re-render the museum grid to reflect the changes
      renderMuseum(data);
    });
    grid.appendChild(card);
  });
}