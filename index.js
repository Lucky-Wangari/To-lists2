const userIdInput = document.getElementById("userIdInput");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

const API_URL = "https://dummyjson.com/todos"; 

addBtn.addEventListener("click", addTask);

async function addTask() {
  const userId = userIdInput.value.trim();
  const task = taskInput.value.trim();

  if (userId === "" || task === "") {
    return;
  }

  const todoItem = {
    userId,
    id: Date.now(),
    title: task,
    completed: false
  };

  await createTodoItem(todoItem);
  displayTodoItem(todoItem);
  clearInputFields();
}

async function createTodoItem(todoItem) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todoItem)
    });

    if (!response.ok) {
      throw new Error("Failed to create todo item");
    }
  } catch (error) {
    console.log(error);
  }
}

function displayTodoItem(todoItem) {
  const listItem = document.createElement("li");
  listItem.setAttribute("data-id", todoItem.id);
  listItem.className = "task";
  listItem.innerHTML = `
    <input type="checkbox" class="task-checkbox" ${todoItem.completed ? "checked" : ""}>
    <span class="task-text">${todoItem.title}</span>
    <button class="delete-task">Delete</button>
  `;
  todoList.insertBefore(listItem, todoList.firstChild);
}

function clearInputFields() {
  userIdInput.value = "";
  taskInput.value = "";
}


