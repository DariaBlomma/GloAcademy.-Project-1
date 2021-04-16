'use strict';
const todoControl = document.querySelector('.todo-control'), //form
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'), //ul
    todoCompleted = document.querySelector('.todo-completed'); //completed tasks

const toDoData = [];


const render = function() {
    todoList.textContent = ''; //remove text content, we render already a completed object
    todoCompleted.textContent = '';

    toDoData.forEach(function(item, index) {
        
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML =  `<span class="text-todo">${item.value}</span>
                            <div class="todo-buttons">
                                <button class="todo-remove"></button>
                                <button class="todo-complete"></button>
                            </div>`;
        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnToDoCompleted = li.querySelector('.todo-complete');
        btnToDoCompleted.addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });

        const btnToDoRemove = li.querySelector('.todo-remove');
        btnToDoRemove.addEventListener('click', function() {
            li.remove();
            delete toDoData[index];
            console.log('toDoData: ', toDoData);

            localStorage.removeItem(`${item.value}`);
        });

    });
};

todoControl.addEventListener('submit', function(e) {
    e.preventDefault();
    if(headerInput.value !== '') {
        const newToDo = {
            value: headerInput.value,
            completed: false,
        };
        toDoData.push(newToDo);
        
        render();
        headerInput.value = '';
    }

    toDoData.forEach(function(item) {
        let json = JSON.stringify(item);
            localStorage.setItem(`${item.value}`, json);
    });
        
    
});

let keys = Object.keys(localStorage);
    for(let key of keys) {
        if(localStorage.length !== 0) {
            let parsed = JSON.parse(`${localStorage.getItem(key)}`);
            toDoData.push(parsed);
        }
        
    }

render();



