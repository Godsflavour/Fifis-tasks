// Arrays to store todos and done tasks
let todos = [];
let done = [];

// DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const todoList = document.getElementById('todoList');
const doneList = document.getElementById('doneList');

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Function to add a new todo
function addTask() {
    const todoText = taskInput.value.trim();
    
    if (todoText) {
        todos.push({ text: todoText, completed: false });
        taskInput.value = '';
        renderLists();
    }
}

// Function to render both lists
function renderLists() {
    renderTodoList();
    renderDoneList();
}

// Function to render todo list
function renderTodoList() {
    todoList.innerHTML = '';
    
    todos.forEach((todo, index) => {
        const todoItem = createTodoItem(todo, index, todos, done);
        todoList.appendChild(todoItem);
    });
}

// Function to render done list
function renderDoneList() {
    doneList.innerHTML = '';
    
    done.forEach((task, index) => {
        const todoItem = createTodoItem(task, index, done, todos);
        doneList.appendChild(todoItem);
    });
}

// Function to create a todo item
function createTodoItem(todo, index, fromArray, toArray) {
    const todoItem = document.createElement('li');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(index, fromArray, toArray));
    
    const todoText = document.createElement('span');
    todoText.textContent = todo.text;
    if (todo.completed) {
        todoText.style.textDecoration = 'line-through';
    }
    
    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoText);
    
    // Break text if it's too long
    if (todoText.offsetWidth > todoItem.offsetWidth) {
        todoText.style.wordBreak = 'break-word';
    }
    
    return todoItem;
}

// Function to toggle todo completion
function toggleTodo(index, fromArray, toArray) {
    const todo = fromArray.splice(index, 1)[0];
    todo.completed = !todo.completed;
    toArray.push(todo);
    renderLists();
}

// Function to move task between lists
function moveTask(index, fromArray, toArray) {
    const task = fromArray.splice(index, 1)[0];
    toArray.push(task);
    renderLists();
}

// Initial render
renderLists();