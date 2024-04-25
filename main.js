document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});

function addTask() {
  const input = document.getElementById("new-task");
  const newTask = input.value.trim();
  if (newTask) {
    const tasks = getTasks();
    tasks.push({ text: newTask, completed: false });
    saveTasks(tasks);
    renderTasks();
    input.value = ""; // Clear input after adding
  }
}

function toggleTask(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

function renderTasks() {
  const tasks = getTasks();
  const list = document.getElementById("task-list");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = `cursor-pointer ${task.completed ? "line-through text-gray-400" : "text-gray-700"}`;
    taskItem.textContent = task.text;
    taskItem.onclick = () => toggleTask(index);
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash-alt px-2 text-red-500 hover:text-red-700";
    deleteIcon.onclick = (event) => {
      event.stopPropagation();
      deleteTask(index);
    };
    taskItem.appendChild(deleteIcon);
    list.appendChild(taskItem);
  });
}

function getTasks() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  renderTasks();
}
