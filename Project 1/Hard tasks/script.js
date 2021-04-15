'use strict';
//hard task
let weekRu = ['Понедельник', 'Вторник', 'Среда', 'Четверг',' Пятница', 'Суббота', 'Воскресенье'];
let monthsRu = [' января', ' февраля ', ' марта', ' апреля', ' мая ', ' июня', ' июля', ' августа', ' сентября', ' октября', ' ноября', ' декабря'];

let p = document.createElement('p');
document.body.prepend(p);

let p2 = document.createElement('p');
p2.style.color = 'forestgreen';
document.body.prepend(p2);


let showDate = function() {
    let addZero = function(date, sign) {
        if (String(date).length === 1) {
            return `0${date}${sign}`;
        } else {
            return `${date}${sign}`;
        }
    };
    let changeEnding = function(date, text1, text2, text3) {
        if (String(date).endsWith('1')) {
            p.innerHTML += ` ${text1} `;
        } else if (String(date).endsWith('2') || String(date).endsWith('3') || String(date).endsWith('4')) {
            p.innerHTML += ` ${text2} `;
        } else {
            p.innerHTML += ` ${text3} `;
        }
    };
    let currDay = new Date().getDay();
        if (currDay === 0) {
            p.innerHTML = 'Сегодня ' + weekRu[0] + ' , ';
        } else {
            p.innerHTML = 'Сегодня ' + weekRu[--currDay]  + ' , ';
        }
    
    let currMonthDay = new Date().getDate();
    p.innerHTML += currMonthDay;
    p2.innerHTML = addZero(currMonthDay, '.');

    let currMonth= new Date().getMonth();
    p.innerHTML += monthsRu[currMonth];
    p2.innerHTML += addZero(++currMonth, '.');

    let currYear = new Date().getFullYear();
    p.innerHTML += ' ' + currYear + ' года, ';
    p2.innerHTML += addZero(currYear, '. - ');

    let currHour = new Date().getHours();
    p.innerHTML += currHour;
    p2.innerHTML += addZero(currHour, ':');
    changeEnding(currHour, 'час', 'часa', 'часов');
    
    let currMinutes = new Date().getMinutes();
    p.innerHTML += currMinutes;
    changeEnding(currMinutes, 'минута', 'минуты', 'минут');
    p2.innerHTML += addZero(currMinutes, ':');

    let currSeconds = new Date().getSeconds();
    p.innerHTML += currSeconds;
    changeEnding(currSeconds, 'секунда', 'секунды', 'секунд');
    p2.innerHTML += addZero(currSeconds, '');
};

setInterval(showDate, 1000);



