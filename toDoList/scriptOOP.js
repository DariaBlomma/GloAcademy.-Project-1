'use strict';
class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
        // this.completedInterval;
        // this.completeCount = 0;
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

    changeCompletion(elem, liElem) {
        if (elem.completed) {
            this.todoCompleted.append(liElem);
           // this.animateCompleted(btnComplete);
        } else {
            this.todoList.append(liElem);
        }
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
            <button class="todo-edit"></button>
        </div>`);
        
        const btnComplete = li.querySelector('.todo-complete');
        
        // if (item.completed) {
        //     this.todoCompleted.append(li);
        //    // this.animateCompleted(btnComplete);
        // } else {
        //     this.todoList.append(li);
        // }
        this.changeCompletion(item, li);
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



    deleteItem(key, elem) {
// find by key elem, delete, render
        elem.remove();
        this.todoData.delete(key);
        console.log('this.todoData: ', this.todoData);
        this.addToStorage();
    }

    completedItem(el, key) {
        // foreach toododata, find by key what we clicked, change completed to true
        const item = this.todoData.get(key);
        const btn = el.querySelector('.todo-complete');
        // console.log('btn: ', btn);
        if (!item.completed) {
            item.completed = true;
            // this.render();
            this.changeCompletion(item, el);
            this.addToStorage();
            this.animateCompleted(key);
        } else {
            item.completed = false;
            //this.render();
            this.changeCompletion(item, el);
            this.addToStorage();
        }

    }

    animateCompleted(key) {
        const lis = document.querySelectorAll('.todo-item');;
        lis.forEach(item => {
            if (item.key === key) {
                const btn = item.querySelector('.todo-complete');
                btn.classList.add('animate-complete');                
            }
        })
        const btnAnim = document.querySelector('.animate-complete');

        Todo.completedInterval = requestAnimationFrame(this.animateCompleted.bind(this));
        Todo.completeCount += 3;
        
        if (Todo.completeCount < 50) {
            btnAnim.style.backgroundSize = `${Todo.completeCount}px`;
        } else {
            btnAnim.style.backgroundSize = '';
            cancelAnimationFrame(Todo.completedInterval);
            Todo.completeCount = 0;
        }
    }

    animateDeletion(key, elem) {
        // console.log('callback: ', callback);
        // console.log('key: ', key);
        const lis = document.querySelectorAll('.todo-item');;
        lis.forEach(item => {
            if (item.key === key) {
                const btn = item.querySelector('.todo-remove');
                item.classList.add('animate-remove');                
            }
        })
        const liAnim = document.querySelector('.animate-remove');
        // console.log('liAnim: ', liAnim);

        Todo.deleteInterval = requestAnimationFrame(this.animateDeletion.bind(this));
        Todo.deleteCount -= 0.01;
        
        
        if (Todo.deleteCount > 0) {
            // console.log('Todo.deleteCount: ', Todo.deleteCount);
            
            liAnim.style.textDecoration = 'line-through';
            // console.log('liAnim.style.textDecoration: ', liAnim.style.textDecoration);
            liAnim.style.opacity = `${Todo.deleteCount}`;
            // console.log('liAnim.style.opacity: ', liAnim.style.opacity);
        } else {
            cancelAnimationFrame(Todo.deleteInterval);
            Todo.deleteCount = 1;
            // console.log('after cancelling animation');
            //liAnim.style.opacity = '';
            liAnim.remove();
            this.todoData.delete(liAnim.key);
            // console.log('this.todoData: ', this.todoData);
            this.addToStorage();
            // console.log('after deletion');
        }

    }

    editContent(key) {
        const lis = document.querySelectorAll('.todo-item');
        lis.forEach(item => {
            if (item.key === key) {
                item.querySelector('.text-todo').setAttribute('contenteditable', 'true');
            }
        });
        

        document.addEventListener('blur', event => {
            console.log('(event.target: ', event.target);
            if (event.target.matches('.text-todo')) {
                const keyLi = event.target.closest('.todo-item').key;
                for (let [key, value] of this.todoData) {
                    if (keyLi === key) {
                        value.value = event.target.textContent;
                    }
                }
                this.addToStorage();
                console.log(this.todoData);
            }

        }, true)


        
    }

    handler() {
        const todoContainer = document.querySelector('.todo-container');
        todoContainer.addEventListener('click', event => {
            let target = event.target;
            if (target.matches('.todo-remove')) {
                // this.animateDeletion(target.closest('.todo-item').key);
                this.animateDeletion(target.closest('.todo-item').key, target.closest('.todo-item'));
                //setTimeout? callback?
                // console.log('after animation with callback');
               // this.deleteItem(target.closest('.todo-item'), target.closest('.todo-item').key);
                
            } else if (target.matches('.todo-complete')) {
                this.completedItem(target.closest('.todo-item'), target.closest('.todo-item').key);
            } else if (target.matches('.todo-edit')) {
                this.editContent(target.closest('.todo-item').key);
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
Todo.completedInterval;
Todo.completeCount = 0;
Todo.deleteInterval;
Todo.deleteCount = 1;
todo.init();