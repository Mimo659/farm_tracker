// js/daily.js

let dailyTasks = [
  { text: 'Giessen', completed: false },
  { text: 'Tiere versorgen', completed: false }
];

function renderDaily(data) {
  const dailyContainer = document.getElementById('daily-grid');
  dailyContainer.innerHTML = '';

  dailyTasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.className = 'p-4 border rounded shadow-sm flex justify-between items-center';
    taskElement.innerHTML = `
      <span class="${task.completed ? 'line-through' : ''}">${task.text}</span>
      <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
    `;
    dailyContainer.appendChild(taskElement);
  });

  const checkboxes = dailyContainer.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
      const index = event.target.dataset.index;
      dailyTasks[index].completed = event.target.checked;
      renderDaily(data);
    });
  });

  const addTaskButton = document.getElementById('add-task-btn');
  addTaskButton.onclick = () => {
    const newTaskInput = document.getElementById('new-task-input');
    const newTaskText = newTaskInput.value.trim();
    if (newTaskText) {
      dailyTasks.push({ text: newTaskText, completed: false });
      newTaskInput.value = '';
      renderDaily(data);
    }
  };
}

export { renderDaily };
