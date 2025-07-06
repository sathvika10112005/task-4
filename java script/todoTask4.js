document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("task-input");
  const addBtn = document.getElementById("add-btn");
  const taskList = document.getElementById("task-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(renderTask);

  addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text !== "") {
      const task = { text, completed: false };
      tasks.push(task);
      saveTasks();
      renderTask(task);
      taskInput.value = "";
    }
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.classList.add("task-check");

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.style.display = task.completed ? "inline-block" : "none";

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";
    delBtn.style.display = task.completed ? "inline-block" : "none";

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      span.classList.toggle("completed");
      editBtn.style.display = delBtn.style.display = checkbox.checked ? "inline-block" : "none";
      saveTasks();
    });

    delBtn.addEventListener("click", () => {
      taskList.removeChild(li);
      tasks = tasks.filter(t => t !== task);
      saveTasks();
    });

    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit your task:", task.text);
      if (newText && newText.trim() !== "") {
        task.text = newText.trim();
        span.textContent = task.text;
        saveTasks();
      }
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // MARK ALL AS DONE
  document.getElementById("mark-all-btn").addEventListener("click", () => {
    tasks.forEach(task => task.completed = true);
    saveTasks();
    location.reload();
  });

  // CLEAR ALL TASKS
  document.getElementById("clear-all-btn").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all tasks?")) {
      tasks = [];
      localStorage.removeItem("tasks");
      taskList.innerHTML = "";
    }
  });
});
