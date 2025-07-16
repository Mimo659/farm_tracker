export function renderVillagers(data) {
  const grid = document.getElementById('villager-grid');
  grid.innerHTML = '';

  data.villagers.forEach(v => {
    const card = document.createElement('div');
    card.className = 'glass pixel-border p-3 flex flex-col items-center text-center';

    // hearts
    const heartsHTML = [...Array(14)]
      .map((_, i) => `<div class="w-2 h-2 ml-px ${i < v.hearts ? 'bg-red-500' : 'bg-gray-300'} rounded-sm"></div>`)
      .join('');

    // content
    card.innerHTML = `
      <img src="images/villagers/${v.name}.png" class="w-16 h-16 rounded">
      <span class="text-xs mt-1">${v.name}</span>
      <div class="flex mt-1">${heartsHTML}</div>
      <button class="mt-2 text-xs px-2 py-1 bg-primary text-white rounded">
        Gifts
      </button>

      <!-- gift panel (initially hidden) -->
      <div class="hidden mt-2 text-xs space-y-1 w-full">
        <p><span class="text-red-500">❤️</span> ${v.loves.join(', ') || 'None'}</p>
        <p><span class="text-yellow-400">👍</span> ${v.likes.join(', ') || 'None'}</p>
        <p><span class="text-gray-400">👎</span> ${v.dislikes.join(', ') || 'None'}</p>
        <p><span class="text-red-600">💔</span> ${v.hates.join(', ') || 'None'}</p>
      </div>
    `;

    // heart change on card click (left +1, right −1)
    card.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') return; // let button open panel
      if (e.button === 2) { // right click
        if (v.hearts > 0) v.hearts--;
      } else {              // left click
        if (v.hearts < 14) v.hearts++;
      }
      localStorage.setItem('stardewSave', JSON.stringify(data));
      renderVillagers(data);
    });
    card.oncontextmenu = () => false;

    // gift button opens/closes panel
    const btn = card.querySelector('button');
    const panel = card.querySelector('div.hidden');
    btn.addEventListener('click', e => {
      e.stopPropagation();
      panel.classList.toggle('hidden');
    });

    grid.appendChild(card);
  });
}