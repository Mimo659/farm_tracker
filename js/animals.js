export function renderAnimals(data) {
  const content = document.getElementById('animals-content');
  content.innerHTML = '';
  data.animals.forEach(a => {
    const card = document.createElement('div');
    card.className = 'glass pixel-border p-3 text-xs';
    card.innerHTML = `
      <h3 class="text-sm">${a.name}</h3>
      <p>Hearts: ${a.hearts}/5</p>
      <p>Produces: ${a.produce}</p>
    `;
    content.appendChild(card);
  });
}