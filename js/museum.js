export function renderMuseum(data) {
  const grid = document.getElementById('museum-grid');
  grid.innerHTML = '';
  data.museum.forEach(m => {
    const card = document.createElement('div');
    card.className = `glass pixel-border p-3 flex flex-col items-center space-y-2 cursor-pointer ${m.collected ? 'opacity-50' : ''}`;
    card.innerHTML = `
      <img src="images/items/${m.img}" class="w-14 h-14 object-contain">
      <span class="text-xs">${m.name}</span>
      <span class="text-xs">${m.collected ? '✔' : ''}</span>
    `;
    card.addEventListener('click', () => {
      m.collected = !m.collected;
      localStorage.setItem('stardewSave', JSON.stringify(data));
      renderMuseum(data);
    });
    grid.appendChild(card);
  });
}