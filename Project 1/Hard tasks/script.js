'use strict';
//hard task
let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let currDay = new Date().getDay();
console.log(currDay);
console.log(week[6]);
let ul = document.createElement('ul');
document.body.prepend(ul);

week.reverse().map((item, index) => {
    if(item === 'Sunday' || item === 'Saturday') {
        ul.insertAdjacentHTML('afterbegin', `<li class='cursive'>${item}</li>`);
    } else {
        ul.insertAdjacentHTML('afterbegin', `<li>${item}</li>`);
    }
});

ul.children[currDay].classList.add('bold');