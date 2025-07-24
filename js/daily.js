// js/daily.js

let dailyTasks = [
  { text: 'Check TV: Watch for the weather forecast, luck, and any useful recipes.', completed: false },
  { text: 'Check Mailbox: See if there are any letters or requests.', completed: false },
  { text: 'Water Crops: If using a watering can, water all your crops.', completed: false },
  { text: 'Harvest Crops: Gather mature crops from your farm and greenhouse.', completed: false },
  { text: 'Pet Animals: Pet your farm animals (cows, chickens, etc.) and collect their produce.', completed: false },
  { text: 'Refill Machines: Restock kegs and preserve jars with fruits and vegetables.', completed: false },
  { text: 'Check Artisan Goods: Collect finished products from machines like mayonnaise makers, cheese presses, and preserves jars.', completed: false },
  { text: 'Plant More Crops: Sow seeds for future harvests.', completed: false },
  { text: 'Visit Bulletin Board: Check for any "Help Wanted" quests from Pierre\'s shop.', completed: false },
  { text: 'Socialize: Talk to villagers and give gifts, especially on their birthdays.', completed: false },
  { text: 'Mine/Forage: Depending on the day\'s goals, explore the mines for resources or forage for items in different areas.', completed: false },
  { text: 'Complete Quests: Work towards completing any active quests, including "Help Wanted" and special orders.', completed: false },
  { text: 'Process Goods: Place artisan goods in the shipping bin to sell at the end of the day.', completed: false },
  { text: 'Attend Festivals: Check the calendar for any special events and attend if you can.', completed: false }
];

function renderDaily(data) {
  const dailyContainer = document.getElementById('daily-grid');
  dailyContainer.innerHTML = '';

  dailyTasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.className = 'p-4 border rounded shadow-sm flex justify-between items-center';
    taskElement.innerHTML = `
      <span class="${task.completed ? 'line-through' : ''}">${task.text}</span>
      <div>
        <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
        <button class="px-2 py-1 bg-red-600 text-white rounded pixel-border ml-2" data-index="${index}">Remove</button>
      </div>
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

  const removeButtons = dailyContainer.querySelectorAll('button[data-index]');
  removeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const index = event.target.dataset.index;
      dailyTasks.splice(index, 1);
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
