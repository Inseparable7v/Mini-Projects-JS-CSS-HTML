let input = document.getElementById('todo-input');
let todoButton = document.getElementById('todo-button');
let listOfElem = document.querySelector('.todo-list');
let todoSelect = document.querySelector('.fillter-todo');

if (input === null || todoButton === null || listOfElem == null) {
    throw Error;
}

listOfElem.addEventListener('click', completedTask);
todoButton.addEventListener('click', addToDo);
document.addEventListener('DOMContentLoaded', getLocalStorageValues);

function addToDo(e) {
    e.preventDefault();
    if (input.value !== "") {

        let toDoDiv = createElem('div');
        toDoDiv.classList.add('todo');

        let newToDo = createElem('li');
        addToClassList(newToDo, 'todo-item');
        appentInnerHTML(newToDo, input.value);
        appentToEl(toDoDiv, newToDo);

        saveLocalStorage(input.value);

        let completedButton = createElem('button');
        appentInnerHTML(completedButton, '<i class="fas fa-check"></i>');
        addToClassList(completedButton, 'completed-btn');
        completedButton.setAttribute('id', 'complete-btn')
        appentToEl(toDoDiv, completedButton);


        let trashedButton = createElem('button');
        appentInnerHTML(trashedButton, '<i class="fas fa-trash"></i>')
        addToClassList(trashedButton, 'trashed-btn');
        trashedButton.setAttribute('id', 'trash-btn')
        appentToEl(toDoDiv, trashedButton);
        appentToEl(listOfElem, toDoDiv);
    }
    input.value = "";
}

function createElem(el) {
    return document.createElement(el);
}

function appentToEl(to, from) {
    to.appendChild(from);
}

function appentInnerHTML(to, text) {
    to.innerHTML = text;
}

function addToClassList(to, item) {
    to.classList.add(item);
}

function completedTask(e) {
    let item = e.target;
    let rightButton = item.classList[0];

    if (rightButton === 'trashed-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalStorageTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }
    else if (rightButton === "completed-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function saveLocalStorage(todo) {
    let todos = checkLocalStorage();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocalStorageValues() {
    let todos = checkLocalStorage();
    todos.forEach((todo) => {
        let toDoDiv = createElem('div');
        toDoDiv.classList.add('todo');

        let newToDo = createElem('li');
        addToClassList(newToDo, 'todo-item');
        appentInnerHTML(newToDo, todo);
        appentToEl(toDoDiv, newToDo);

        let completedButton = createElem('button');
        appentInnerHTML(completedButton, '<i class="fas fa-check"></i>');
        addToClassList(completedButton, 'completed-btn');
        completedButton.setAttribute('id', 'complete-btn')
        appentToEl(toDoDiv, completedButton);


        let trashedButton = createElem('button');
        appentInnerHTML(trashedButton, '<i class="fas fa-trash"></i>')
        addToClassList(trashedButton, 'trashed-btn');
        trashedButton.setAttribute('id', 'trash-btn')
        appentToEl(toDoDiv, trashedButton);
        appentToEl(listOfElem, toDoDiv);

    });
}

function removeLocalStorageTodos(todo){
    let todos = checkLocalStorage();

    const todoElementIndex = todo.children[0].innerHTML;
    todos.splice(todos.indexOf(todoElementIndex, 1));

    localStorage.setItem('todos', JSON.stringify(todos));
}

function checkLocalStorage(){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}
