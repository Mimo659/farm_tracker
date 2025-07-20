let tasks = [];

function saveTasks() {
  localStorage.setItem('plannerTasks', JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem('plannerTasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}

function renderTasks() {
  const plannerContainer = document.getElementById('planner-grid');
  plannerContainer.innerHTML = `
    <div class="w-full">
        <h2 class="text-2xl font-bold mb-4">Task Planner</h2>
        <div class="flex gap-2 mb-4">
            <input type="text" id="task-input" class="p-2 border rounded w-full" placeholder="Add a new task">
            <button id="add-task-btn" class="px-4 py-2 bg-blue-500 text-white rounded">Add</button>
        </div>
        <ul id="task-list" class="list-disc pl-5">
            ${tasks.map((task, index) => `
                <li class="flex items-center justify-between mb-2 p-2 rounded ${task.completed ? 'bg-green-200' : 'bg-gray-200'}">
                    <span class="${task.completed ? 'line-through' : ''}">${task.text}</span>
                    <div>
                        <button data-index="${index}" class="complete-btn px-2 py-1 bg-green-500 text-white rounded">✓</button>
                        <button data-index="${index}" class="delete-btn px-2 py-1 bg-red-500 text-white rounded">✗</button>
                    </div>
                </li>
            `).join('')}
        </ul>
    </div>
  `;

  document.getElementById('add-task-btn').addEventListener('click', addTask);
  document.querySelectorAll('.complete-btn').forEach(btn => btn.addEventListener('click', toggleComplete));
  document.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', deleteTask));
}

function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    saveTasks();
    renderTasks();
  }
}

function toggleComplete(e) {
  const index = e.target.dataset.index;
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(e) {
  const index = e.target.dataset.index;
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

export function renderPlanner(data) {
  loadTasks();
  renderTasks();
}
