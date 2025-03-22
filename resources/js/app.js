document.addEventListener("DOMContentLoaded", loadTasks);
function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();
    if (taskText === "") return;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, done: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    renderTasks();
}
function renderTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<input type='checkbox' onclick='toggleTask(${index})' ${task.done ? 'checked' : ''}> 
                        <span class='${task.done ? "completed" : ""}'>${task.text}</span> 
                        <button onclick='deleteTask(${index})' class='delete'>❌</button>`;
        taskList.appendChild(li);
    });
}
function toggleTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}
function loadTasks() {
    renderTasks();
}
document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") addTask();
});
