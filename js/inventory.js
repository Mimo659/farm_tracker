export function renderInventory(data, searchTerm = '') {
  const grid = document.getElementById('inventory-grid');
  grid.innerHTML = '';

  // Filter items by search term
  const filteredItems = data.items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Separate collected and uncollected items from the filtered list
  const collectedItems = filteredItems.filter(item => item.collected);
  const uncollectedItems = filteredItems.filter(item => !item.collected);

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
      renderInventory(data, searchTerm);
    });
    grid.appendChild(card);
  });
}

const searchInput = document.getElementById('inventory-search');
const suggestionsContainer = document.getElementById('suggestions-container');

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value;
  const data = JSON.parse(localStorage.getItem('stardewSave'));
  if (!data) return;

  suggestionsContainer.innerHTML = '';
  if (searchTerm.length > 0) {
    const suggestions = data.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    suggestions.forEach(item => {
      const suggestionItem = document.createElement('div');
      suggestionItem.textContent = item.name;
      suggestionItem.classList.add('suggestion-item');
      suggestionItem.addEventListener('click', () => {
        searchInput.value = item.name;
        suggestionsContainer.innerHTML = '';
        renderInventory(data, item.name);
      });
      suggestionsContainer.appendChild(suggestionItem);
    });
  }

  renderInventory(data, searchTerm);
});