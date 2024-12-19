// const form = document.getElementById("form");
// const lists = document.querySelector(".lists");
// let data = [];
// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   let name = form.name.value;
//   validateValue(name);
//   if (name.trim()) {
//     data = [...data, { name, id: Date.now() }];
//     addTodo(data);
//   }
// });

// function addTodo(data) {
//   lists.innerHTML = "";
//   data.forEach((value) => {
//     const div = document.createElement("div");
//     div.classList.add("list_item");
//     div.innerHTML = `
//           <span>${value.name}</span>
//           <div>
//           <button class="update">Update</button>
//           <button id=${value.id} class="btn ">Delete</button>
//           </div>
//           `;
//     lists.append(div);
//   });
// }

// function validateValue(name) {
//   let data = [name];
//   data.forEach((value) => {
//     const errorElement = document.querySelector(`.error`);
//     value.trim() === ""
//       ? (errorElement.style.display = "block")
//       : (errorElement.style.display = "none");
//   });
// }

// lists.addEventListener("click", (e) => {
//     if (e.target.classList.contains("update")) {
//       delelteTodo(e);
//     }
//   });

// lists.addEventListener("click", (e) => {
//   if (e.target.classList.contains("btn")) {
//     delelteTodo(e.target.id);
//   }
// });

// function delelteTodo(id) {
//   data = data.filter((value) => value.id !== +id);
//   addTodo(data);
// }


const input = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// LocalStorage'dan ma'lumotni olish
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodoToList(todo.text, todo.time));
}

// LocalStorage'ga ma'lumotni saqlash
function saveTodos() {
    const todos = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        const text = item.querySelector('span').textContent;
        const time = item.querySelector('.time').textContent;
        todos.push({ text, time });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodoToList(taskText, taskTime) {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    const timeSpan = document.createElement('span');
    timeSpan.className = 'time';
    timeSpan.textContent = taskTime;

    const editButton = document.createElement('button');
    editButton.textContent = 'O‘zgartirish';
    editButton.addEventListener('click', () => {
        const newTask = prompt('Vazifani o‘zgartiring:', taskSpan.textContent);
        if (newTask !== null && newTask.trim() !== '') {
            taskSpan.textContent = newTask.trim();
            saveTodos();
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'O‘chirish';
    deleteButton.addEventListener('click', () => {
        todoList.removeChild(listItem);
        saveTodos();
    });

    listItem.appendChild(taskSpan);
    listItem.appendChild(timeSpan);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
}

addButton.addEventListener('click', () => {
    const taskText = input.value.trim();
    if (taskText === '') {
        alert('Vazifani kiriting!');
        return;
    }

    const currentTime = new Date();
    const formattedTime = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')} ${currentTime.toLocaleDateString()}`;

    addTodoToList(taskText, formattedTime);
    saveTodos();

    input.value = '';
});

document.addEventListener('DOMContentLoaded', loadTodos);
