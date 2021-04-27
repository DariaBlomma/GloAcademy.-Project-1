'use strict';
class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
    }

    addToStorage() {
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
    }
    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = item.key;
        li.insertAdjacentHTML('beforeend', `
        <span class="text-todo">${item.value}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`);
        if (item.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim()) {
            this.input.style.backgroundColor = '';
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            console.log([...this.todoData]);
            this.render();
            this.input.value = ''
        } else {
            this.input.style.backgroundColor = 'red';
            this.input.value = 'You cant add an empty item'
        }
        
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(elem, key) {
// find by key elem, delete, render
        elem.remove();
        this.todoData.delete(key);
        console.log('this.todoData: ', this.todoData);
        this.addToStorage();
    }

    completedItem(key) {
        // foreach toododata, find by key what we clicked, change completed to true
        const item = this.todoData.get(key);
        if (!item.completed) {
            item.completed = true;
            this.render();
            this.addToStorage();
        } else {
            item.completed = false;
            this.render();
            this.addToStorage();
        }

    }

    handler() {
        const todoContainer = document.querySelector('.todo-container');
        todoContainer.addEventListener('click', event => {
            let target = event.target;
            if (target.matches('.todo-remove')) {
                this.deleteItem(target.closest('.todo-item'), target.closest('.todo-item').key);
            } else if (target.matches('.todo-complete')) {
                this.completedItem(target.closest('.todo-item').key);
            }
        })
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
        this.handler();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
todo.init();