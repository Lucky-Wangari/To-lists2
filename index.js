const taskListContainer = document.getElementById('taskListContainer');
const successMessageContainer = document.getElementById('successMessageContainer');
const addTaskBtn = document.getElementById('addTaskBtn');
const deleteTasksBtn = document.getElementById('deleteTasksBtn');
const taskInput = document.getElementById('taskInput');

const getTodoById = async (userId) => {
  try {
    const response = await fetch(`https://dummyjson.com/todos/${userId}`);
    const todo = await response.json();
    return todo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const displayTodo = async (userId) => {
  const todo = await getTodoById(userId);
  if (todo) {
    const li = document.createElement('li');
    const taskName = document.createElement('span');
    const checkbox = document.createElement('input');
    const deleteBtn = document.createElement('button');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    taskName.textContent = todo.todo;
    taskName.addEventListener('change', () => {
      if (checkbox.checked) {
        taskName.classList.add('completed');
      } else {
        taskName.classList.remove('completed');
      }
    });
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      deleteTodoById(userId);
      li.remove();
    });
    li.appendChild(checkbox);
    li.appendChild(taskName);
    li.appendChild(deleteBtn);
    li.setAttribute('data-key', userId);
    li.classList.add('task');
    taskListContainer.appendChild(li);
  } else {
    console.log(`Todo with user ID ${userId} not found.`);
  }
};

const deleteTodoById = async (userId) => {
  try {
    const response = await fetch(`https://dummyjson.com/todos/${userId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteTasks = () => {
  taskListContainer.innerHTML = '';
};

addTaskBtn.addEventListener('click', () => {
  const userId = parseInt(taskInput.value);
  if (!isNaN(userId)) {
    displayTodo(userId);
    successMessageContainer.textContent = 'Todo added successfully.';
  } else {
    successMessageContainer.textContent = 'Please enter a valid User ID.';
  }
});

deleteTasksBtn.addEventListener('click', deleteTasks);
