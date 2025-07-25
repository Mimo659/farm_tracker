export function renderBundles(data) {
  const grid = document.getElementById('bundle-grid');
  grid.innerHTML = '';

  // Filter and sort items: completed items go to the bottom
  const completedItems = data.bundles.filter(item => item.completed);
  const uncompletedItems = data.bundles.filter(item => !item.completed);

  // Combine the two arrays with uncompleted items first
  const sortedItems = uncompletedItems.concat(completedItems);

  sortedItems.forEach(b => {
    const card = document.createElement('div');
    card.className = `glass pixel-border p-4 text-xs cursor-pointer transition ${
      b.completed ? 'bg-green-100 opacity-75' : ''
    }`;
    card.innerHTML = `
      <h3 class="text-sm font-bold">${b.name}</h3>
      <ul class="list-disc list-inside text-xs mt-1">${b.items.map(i => `<li>${i}</li>`).join('')}</ul>
      <div class="mt-2">
        ${b.completed ? '✅ Completed' : '⬜ Pending'}
      </div>
    `;

    // click anywhere on the card
    card.addEventListener('click', () => {
      b.completed = !b.completed;
      localStorage.setItem('stardewSave', JSON.stringify(data));
      renderBundles(data);
    });

    grid.appendChild(card);
  });
}