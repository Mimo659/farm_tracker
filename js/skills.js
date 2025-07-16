export function renderSkills(data) {
  const content = document.getElementById('skills-content');
  content.innerHTML = '';
  data.skills.forEach(s => {
    const card = document.createElement('div');
    card.className = 'glass pixel-border p-3 text-xs';
    card.innerHTML = `
      <h3 class="text-sm">${s.name}</h3>
      <p>Level: ${s.level}</p>
      <p>EXP: ${s.exp}/1000</p>
    `;
    content.appendChild(card);
  });
}