const tasksList = document.getElementById('tasks-list');
const searchInput = document.getElementById('search');
let tasks = [];

// Load tasks
async function loadTasks() {
  try {
    const res = await fetch('/api/tasks');
    if (!res.ok) throw new Error(await res.text());
    tasks = await res.json();
    displayTasks(tasks);
  } catch (err) {
    console.error('Error loading tasks:', err);
  }
}

function displayTasks(tasksToDisplay) {
  tasksList.innerHTML = tasksToDisplay.map(task => `
    <li>
      <input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
      <span>${task.name}</span>
    </li>
  `).join('');
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = tasks.filter(task => task.name.toLowerCase().includes(query));
  displayTasks(filtered);
});

tasksList.addEventListener('change', (e) => {
  if (e.target.type === 'checkbox') {
    const id = e.target.dataset.id;
    const task = tasks.find(t => t.id === id);
    if (task) task.completed = e.target.checked;
  }
});

document.addEventListener('DOMContentLoaded', loadTasks);