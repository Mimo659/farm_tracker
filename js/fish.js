export function renderFish(data) {
  const grid = document.getElementById('fish-grid');
  grid.innerHTML = '';

  if (!data.fish) {
    console.error('Fish data is undefined');
    return;
  }

  // Filter and sort items: caught items go to the bottom
  const caughtItems = data.fish.filter(item => item.caught);
  const uncaughtItems = data.fish.filter(item => !item.caught);

  // Combine the two arrays with uncaught items first
  const sortedItems = uncaughtItems.concat(caughtItems);

  sortedItems.forEach(f => {
    const card = document.createElement('div');
    card.className = `glass pixel-border p-3 flex flex-col items-center cursor-pointer ${
      f.caught ? 'opacity-50' : ''
    }`;
    card.innerHTML = `
      <img src="images/items/${f.img}" class="w-14 h-14 object-contain">
      <span class="text-xs mt-1">${f.name}</span>
      <span class="text-xs">${f.caught ? '✔' : ''}</span>
      <button class="mt-2 text-xs px-2 py-1 bg-primary text-white rounded">
        Location
      </button>

      <!-- location panel (initially hidden) -->
      <div class="hidden mt-2 text-xs space-y-1 w-full">
        <p><strong>Season:</strong> ${f.season}</p>
        <p><strong>Location:</strong> ${f.location}</p>
        <p><strong>Time:</strong> ${f.time}</p>
        <p><strong>Weather:</strong> ${f.weather}</p>
        <p><strong>Rod:</strong> ${f.rod}</p>
      </div>
    `;

    card.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') return;
      f.caught = !f.caught;
      localStorage.setItem('stardewSave', JSON.stringify(data));
      renderFish(data);
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