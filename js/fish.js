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

      <!-- hover panel -->
      <div class="hidden group-hover:block text-xs mt-2 space-y-1 w-full">
        <p><strong>Season:</strong> ${f.season}</p>
        <p><strong>Location:</strong> ${f.location}</p>
        <p><strong>Time:</strong> ${f.time}</p>
        <p><strong>Weather:</strong> ${f.weather}</p>
        <p><strong>Rod:</strong> ${f.rod}</p>
      </div>
    `;

    card.classList.add('group');
    card.addEventListener('click', () => {
      f.caught = !f.caught;
      localStorage.setItem('stardewSave', JSON.stringify(data));
      renderFish(data);
    });

    grid.appendChild(card);
  });
}