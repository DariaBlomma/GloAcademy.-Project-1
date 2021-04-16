'use strict';
//obligatory task. Part 1
function DomElement (selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
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
        `;
        document.body.append(p);
    }
};

let domElement = new DomElement('#blue', 80, 800, 'ffc0cb', 50);
let domElement2 = new DomElement('.red', 400, 200, 'add8e6', 25);
console.log('domElement: ', domElement);
domElement.createElem();
domElement2.createElem();

