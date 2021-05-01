'use strict';
/* 

1.Написать скрипт, которые заменяет слово "функция" и его однокоренные слова в div с id=task1 на «<strong>функция</strong>». 

2. Написать скрипт который в div с id=task2 найдет время. Время имеет формат часы:минуты. И часы, и минуты состоят из двух цифр, пример: 09:00.
заключить найденное время в тег <b></b>

3. Создать запрос во всем документе найти текст в кавычках и заключить его в теги <mark></mark>

4. Замените в документе домены вида http://site.ru на <a href="http://site.ru">site.ru</a>, 

5. Напишите регулярное выражение для поиска цвета, заданного как #ABCDEF, вывести цвет в консоль

6. Ссылки такого вида http://site.ru/aaaa/bbbb.html заменить
на <a href="http://site.ru/aaaa/bbbb.html">site.ru</a>


Попрактикуйтесь на кроссвордах https://regexcrossword.com/
и на задачках https://habr.com/ru/post/167015/
 */
const task1 = document.getElementById('task1');
task1.innerHTML = task1.innerHTML.replace(/функци\S/ig, match => `<strong>${match}</strong>`);
const task2 = document.getElementById('task2');
task2.innerHTML = task2.innerHTML.replace(/\d{2}:\d{2}/g, match => `<b>${match}</b>`);
document.body.innerHTML = document.body.innerHTML.replace(/"[^\w\s].*"|«.+?»/ig, match => `<mark>${match}</mark>`);
document.body.innerHTML = document.body.innerHTML.replace(/http:\/\/(.+\.\w{2,3})/g, (match, val1) => `<a href="${match}">${val1}</a>`);
console.log(document.body.innerHTML.match(/#\w{6}/ig));
document.body.innerHTML = document.body.innerHTML.replace(/http:\/\/(.+\.\w{2,3})\/\w+\/\w+\.html/g, match => `<a href="${match}">${val1}</a>`);
