export function renderMines(data) {
  const content = document.getElementById('mines-content');
  content.innerHTML = `
    <div class="glass pixel-border p-4 text-xs">
      <h2 class="text-sm">Mines</h2>
      <p>Elevator reached: <input type="number" id="floor-input" value="${data.farmInfo.floor}" min="0" max="120"
              class="w-16 bg-surface rounded px-1" onchange="data.farmInfo.floor=this.value"></p>
    </div>
  `;
}