export function renderDailyTasks(data) {
  const container = document.getElementById('daily-tasks-content');
  container.innerHTML = `
    <div class="glass pixel-border p-4 space-y-2">
      <h2 class="text-sm mb-2">Daily Tasks</h2>

      <ul id="task-list" class="space-y-1 text-xs">
        ${data.dailyTasks.map(t => `
          <li class="flex items-center justify-between">
            <label class="flex items-center">
              <input type="checkbox" class="mr-2" data-id="${t.id}"
                     ${t.done ? 'checked' : ''}>
              <span class="${t.done ? 'line-through opacity-50' : ''}">
                ${t.text}
              </span>
            </label>
            <button class="text-red-600 text-xs ml-2"
                    data-del="${t.id}">❌</button>
          </li>
        `).join('')}
      </ul>

      <form id="add-task-form" class="flex gap-2 mt-2">
        <input id="new-task-input" type="text" placeholder="New task..."
               class="flex-1 px-2 py-1 bg-surface rounded text-xs">
        <button class="px-2 py-1 bg-primary text-white rounded text-xs">
          Add
        </button>
      </form>
    </div>
  `;

  // Toggle done
  container.querySelectorAll('input[type=checkbox]').forEach(cb =>
    cb.addEventListener('change', e => {
      const id = +e.target.dataset.id;
      const task = data.dailyTasks.find(t => t.id === id);
      task.done = e.target.checked;
      save(data);
      renderDailyTasks(data);
    })
  );

  // Delete task
  container.querySelectorAll('[data-del]').forEach(btn =>
    btn.addEventListener('click', e => {
      const id = +e.target.dataset.del;
      data.dailyTasks = data.dailyTasks.filter(t => t.id !== id);
      save(data);
      renderDailyTasks(data);
    })
  );

  // Add new task
  container.querySelector('#add-task-form').addEventListener('submit', e => {
    e.preventDefault();
    const input = container.querySelector('#new-task-input');
    const text = input.value.trim();
    if (!text) return;
    const newId = data.dailyTasks.length
      ? Math.max(...data.dailyTasks.map(t => t.id)) + 1
      : 1;
    data.dailyTasks.push({ id: newId, text, done: false });
    save(data);
    input.value = '';
    renderDailyTasks(data);
  });
}

function save(data) {
  localStorage.setItem('stardewSave', JSON.stringify(data));
}