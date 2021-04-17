'use strict';
//obligatory task. Part 1
function DomElement (selector, height, width, bg, fontSize, position) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.position = position;
}

DomElement.prototype.createElem = function () {
    if (this.selector.startsWith('.')) {
        let div = document.createElement('div');
        div.innerHTML = 'Hello, it is div';
        div.classList.add(this.selector.substring(1));
        div.style.cssText = `height: ${this.height}px;
        width: ${this.width}px;
        background-color: #${this.bg};
        font-size: ${this.fontSize}px;
        position: ${this.position};
        margin: 0;
        `;
        document.body.append(div);
    }
    if (this.selector.startsWith('#')) {
        let p = document.createElement('p');
        p.innerHTML = 'Hello, it is p';
        p.setAttribute('id', `${this.selector.substring(1)}`);
        p.style.cssText = `height: ${this.height}px;
        width: ${this.width}px;
        background-color: #${this.bg};
        font-size: ${this.fontSize}px;
        position: ${this.position};
        margin: 0;
        `;
        document.body.append(p);
    }
};

DomElement.prototype.move = function(direction) {
    let elem = document.querySelector(`${this.selector}`);
    console.log('elem: ', elem);

    // если каждый раз увеличивать координаты
    //  обнулила отступы у эдемента и body и все работает как надо
    let domRect = elem.getBoundingClientRect();
    let currTop = domRect.top;
    let currLeft = domRect.left;

    if (direction === 'up') {
        elem.style.top = currTop - 10 +'px';
    } else if (direction === 'down') {
        elem.style.top = currTop + 10 +'px';
    } else if (direction === 'left') {
        elem.style.left = currLeft - 10 +'px';
    } else if (direction === 'right') {
        elem.style.left = currLeft + 10 +'px';
    }
    
    // координаты меняются относительно исходного положения
    // elem.className = direction;
    

    // координаты меняются сколько угодно раз, но относительно нового положения только в одном направлении

    // elem.classList.add(direction);
    // let arr = [];
    // for (let name of elem.classList) {
    //     arr.push(name);
    //     if (arr.length > 1) {
    //         let shifted = arr.shift();
    //         elem.classList.remove(shifted);
    //     }
    // }
};



let domElement = new DomElement('#blue', 100, 100, 'ffc0cb', 20, 'absolute');
document.addEventListener('DOMContentLoaded', function() {
    console.log('domElement: ', domElement);
    domElement.createElem();
});


document.addEventListener('keydown', function(event) {
    
    if (event.code === 'ArrowDown') {
        console.log('ArrowDown');
        domElement.move('down');
        //top: 10px;
    } else if (event.code === 'ArrowUp') {
        console.log('ArrowUp');
        domElement.move('up');
        //top: -10px;
    } else if (event.code === 'ArrowLeft') {
        console.log('ArrowLeft');
        domElement.move('left');
        //left: -10px;
    } else if (event.code === 'ArrowRight') {
        console.log('ArrowRight');
        domElement.move('right');
        //left: 10px;
    }
        
});
