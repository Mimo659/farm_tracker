export function renderFarming(data) {
  const content = document.getElementById('farming-content');
  content.innerHTML = `
    <div class="glass pixel-border p-4 space-y-2 text-xs">
      <h2 class="text-sm">Crops (season: ${data.farmInfo.season})</h2>
      <p>No crops planted yet.</p>
    </div>
  `;
}