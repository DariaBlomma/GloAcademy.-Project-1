'use strict';
const booksParent = document.querySelector('.books');
const books = document.querySelectorAll('.book');
const book2 = books[0];
const book1 = books[1];
const book6 = books[2];
const book4 = books[3];
const book3 = books[4];
const book5 = books[5];

booksParent.prepend(book1);
book2.after(book3);
booksParent.append(book6);

document.body.style.backgroundImage = 'url(./image/adv.jpg)';

book3.querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';

document.querySelector('.adv').remove();

const ul2 = book2.querySelector('ul');
const lis2 = book2.querySelectorAll('li');
lis2[10].before(lis2[2]);
lis2[3].after(lis2[6]);
lis2[6].after(lis2[8]);

const ul5 = book5.querySelector('ul');
const lis5 = book5.querySelectorAll('li');
lis5[1].after(lis5[9]);
lis5[3].after(lis5[4]);
lis5[4].after(lis5[2]);
lis5[2].after(lis5[6]);
lis5[7].after(lis5[5]);

const ul6 = book6.querySelector('ul');
const lis6 = book6.querySelectorAll('li');
const chapter8 = document.createElement('li');
chapter8.textContent = 'Глава 8: За пределами ES6';
lis6[8].after(chapter8);