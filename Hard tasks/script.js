'use strict';
const square = document.querySelector('.square'),
    btn = document.querySelector('.btn');

let changeInterval;
let count = 0;
let changeSquare = function () {
    changeInterval = requestAnimationFrame(changeSquare);
    count++;
    
    if (count < 101) {
        square.style.borderRadius = count + 'px';
    } else if (count < 200) {
        square.style.top = count / 2 + 'px'; 
    } else if (count < 300){
        square.style.width = count * 2 + 'px';
        square.style.height = count / 3 + 'px';
    } else if (count < 320) {
        square.style.backgroundColor = 'purple';
    } else {
        square.style.color = 'white';
        square.textContent = 'This is the end of the animation';
        cancelAnimationFrame(changeInterval);
    }
};

let animate = false;
btn.addEventListener('click', () => {
    if(!animate) {
        changeInterval = requestAnimationFrame(changeSquare);
        animate = true;
    } else {
        animate = false;
        cancelAnimationFrame(changeInterval);
    }
});
