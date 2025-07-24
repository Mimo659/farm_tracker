const STORAGE_KEY = 'stardewSave';

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
export function renderFarmPlanner(data) {
  const root = document.getElementById('farm-planner-content');
  root.innerHTML = `
    <div class="glass pixel-border p-2 text-xs">
      <div class="flex justify-between items-center mb-2">
        <select id="layoutSelect" class="bg-surface rounded px-2 py-1">
          <option value="standard">Standard</option>
          <option value="riverland">Riverland</option>
          <option value="forest">Forest</option>
          <option value="hilltop">Hill-top</option>
          <option value="wilderness">Wilderness</option>
          <option value="fourCorners">Four Corners</option>
          <option value="beach">Beach</option>
        </select>

        <div class="flex gap-1">
          <button id="undoBtn"  class="px-2 py-1 bg-blue-600 text-white rounded">↶</button>
          <button id="redoBtn"  class="px-2 py-1 bg-blue-600 text-white rounded">↷</button>
          <button id="clearBtn" class="px-2 py-1 bg-red-600 text-white rounded">🗑</button>
          <button id="exportBtn" class="px-2 py-1 bg-green-600 text-white rounded">Export</button>
          <input type="file" id="importFile" accept=".json" class="hidden">
          <button id="importBtn" class="px-2 py-1 bg-green-600 text-white rounded">Import</button>
        </div>
      </div>

      <canvas id="farmCanvas" class="border-2 border-dark bg-green-200"
              width="480" height="270"></canvas>

      <div id="palette" class="grid grid-cols-8 gap-1 mt-2"></div>
    </div>
  `;

  /* ---------- CONFIG ---------- */
  const W = 16, H = 9, TS = 30;           // 16×9 tiles, 30 px each
  const canvas = root.querySelector('#farmCanvas');
  const ctx = canvas.getContext('2d');
  const assets = {
    barn:    { color: '#8B4513', icon: '🏠' },
    coop:    { color: '#D2B48C', icon: '🐓' },
    silo:    { color: '#A0522D', icon: '🌾' },
    well:    { color: '#4682B4', icon: '🚰' },
    path:    { color: '#7F7F7F', icon: '' },
    scare:   { color: '#FF8C00', icon: '😨' },
    sprinkler:{color:'#00BFFF', icon: '💧'},
    tree:    { color: '#006400', icon: '🌳' },
    chest:   { color: '#DAA520', icon: '📦' }
  };

  /* ---------- STATE ---------- */
  data.planner ||= { layout: 'standard', history: [], pos: -1, grid: [] };
  const state = data.planner;

  /* ---------- DRAW ---------- */
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const tile = state.grid.find(t => t.x === x && t.y === y);
        ctx.fillStyle = tile ? assets[tile.id]?.color || '#ccc' : '#90EE90';
        ctx.fillRect(x * TS, y * TS, TS, TS);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(x * TS, y * TS, TS, TS);
        if (tile && assets[tile.id]?.icon) {
          ctx.font = '16px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(assets[tile.id].icon, x * TS + TS / 2, y * TS + TS / 2 + 5);
        }
      }
    }
  }

  /* ---------- EDIT ---------- */
  function addToHistory(grid) {
    state.history.splice(state.pos + 1); // truncate future
    state.history.push(JSON.stringify(grid));
    state.pos = state.history.length - 1;
    state.grid = JSON.parse(state.history[state.pos]);
    save(data);
  }

  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / TS);
    const y = Math.floor((e.clientY - rect.top) / TS);
    if (x < 0 || x >= W || y < 0 || y >= H) return;

    const newGrid = JSON.parse(state.history[state.pos] || '[]');
    const idx = newGrid.findIndex(t => t.x === x && t.y === y);
    if (idx !== -1) newGrid.splice(idx, 1);
    else if (activeTool !== 'erase') newGrid.push({ x, y, id: activeTool });
    addToHistory(newGrid);
    draw();
  });

  /* ---------- PALETTE ---------- */
  let activeTool = 'barn';
  const palette = root.querySelector('#palette');
  for (const [id, { color, icon }] of Object.entries(assets)) {
    const btn = document.createElement('button');
    btn.className = 'w-8 h-8 rounded border border-dark';
    btn.style.background = color;
    btn.textContent = icon;
    btn.title = id;
    btn.onclick = () => activeTool = id;
    palette.appendChild(btn);
  }

  /* ---------- HISTORY ---------- */
  root.querySelector('#layoutSelect').addEventListener('change', e => {
    state.layout = e.target.value;
    save(data);
  });
  root.querySelector('#undoBtn').onclick = () => {
    if (state.pos > 0) { state.pos--; state.grid = JSON.parse(state.history[state.pos]); draw(); save(data); }
  };
  root.querySelector('#redoBtn').onclick = () => {
    if (state.pos < state.history.length - 1) { state.pos++; state.grid = JSON.parse(state.history[state.pos]); draw(); save(data); }
  };
  root.querySelector('#clearBtn').onclick = () => {
    addToHistory([]);
    draw();
  };
  root.querySelector('#exportBtn').onclick = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'farm-plan.json';
    a.click();
  };
  root.querySelector('#importBtn').onclick = () => root.querySelector('#importFile').click();
  root.querySelector('#importFile').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      Object.assign(state, JSON.parse(reader.result));
      draw();
      save(data);
    };
    reader.readAsText(file);
  });

  /* ---------- INIT ---------- */
  draw();
}