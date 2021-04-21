'use strict';
const timeOfDay = document.querySelector('.time-of-day'),
    today = document.querySelector('.today'),
    time = document.querySelector('.time'),
    newYear = document.querySelector('.new-year'),
    date = new Date(),
    currHour = date.getHours(),
    currTime = date.toLocaleTimeString('en'),
    dayStop = new Date('31 december 2021').getTime(),
    dateNow = date.getTime(),
    daysRemaining = Math.floor(((dayStop - dateNow) / 1000) / 60 / 60 / 24) ,
    weekRu = ['Понедельник', 'Вторник', 'Среда', 'Четверг',' Пятница', 'Суббота', 'Воскресенье'];

let weekDay = date.getDay();

if (currHour > 4 && currHour < 12) {
    timeOfDay.textContent = 'Доброе утро';
} else if (currHour > 12 && currHour < 17) {
    timeOfDay.textContent = 'Добрый день';
} else if (currHour > 17 && currHour < 24) {
    timeOfDay.textContent = 'Добрый вечер';
} else {
    timeOfDay.textContent = 'Доброй ночи';
}

if (weekDay === 0) {
    today.textContent =  weekRu[0];
} else {
    today.textContent = weekRu[--weekDay];
}

time.textContent = currTime;
newYear.textContent = daysRemaining;