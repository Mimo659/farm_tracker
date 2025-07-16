export function renderShipping(data) {
  const content = document.getElementById('shipping-content');
  content.innerHTML = `
    <div class="glass pixel-border p-4 text-xs">
      <h2 class="text-sm">Shipping</h2>
      <p>Total gold shipped: <input type="number" id="shipping-input" value="${data.farmInfo.shipping}" min="0"
              class="w-24 bg-surface rounded px-1" onchange="data.farmInfo.shipping=this.value"></p>
    </div>
  `;
}