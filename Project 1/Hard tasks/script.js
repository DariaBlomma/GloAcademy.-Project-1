'use strict';
//hard task
/*let num = 266219;
let numString = num.toString(); 
console.log(' numString: ',  numString);

let result = 1;

for (let i = 0; i < numString.length; i++) {
    result = result * (numString[i] * numString[++i]);
}

//variant 2

let arrString = numString.split('');
console.log('arrString: ', arrString);

let mapNum = arrString.map(function (item) {
    return Number(item);
    });
console.log('mapNum: ', mapNum);

let multiple = arrString.reduce(function (mult, current) {
    
    return mult * current;
}, 1);
console.log('multiple: ', multiple); //1296



console.log(result); //1296

result = result ** 3; //2176782336

console.log(result.toString().slice(0, 2)); //21


let lang = prompt('Write "ru" or "en" to check the code');
let rusDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
let engDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//variant 1 with if
if (lang === 'ru') {
    console.log(rusDays);
} else {
    console.log(engDays);
}

//variant 2 with switch
switch (lang) {
    case 'ru':
        alert(rusDays);
        console.log(rusDays);
        break;
    case 'en':
        alert(engDays);
        
        console.log(engDays);
}

//многомерный массив
let arrDays = [
    ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
];

console.log('arrDays ' + arrDays[0]);
//ассоциативный массив
let assDays = {
    'ru':  ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    'en': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};
console.log('assDays ' + assDays.en);
//создание ассоциативного массива (экземпляра объекта Map)
let mapDays = new Map([
    ['ru', 'Понедельник Вторник Среда Четверг Пятница Суббота Воскресенье'],
    ['en', 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday']
]);
console.log('mapDays ru ' + mapDays.get('ru'));
let mapDays2 = new Map([
    ['ru', ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']],
    ['en', ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']]
]);
console.log('mapDays2 ru ' + mapDays2.get('ru'));
console.log('mapDays2 en ' + mapDays2.get('en'));



let namePerson = 'Daria';

namePerson === 'Артем' ? console.log('директор') :
    namePerson === 'Максим' ? console.log('преподаватель') :
    console.log('студент');


const shortenString = function(message) {
    if (typeof message !== 'string') {
        alert('Please use no simbols');
    } else {
        alert(message.trim());
        if (message.length > 30) {
            alert(message.replace(`${message.substring(30)}`, '...'));
        }
    }
};

shortenString(`  how can I understand without Counting how many symbols I typed 
and where is the 30th symbol and if my string is still trimmed`);
*/
let arr = [];
arr.push('123', '2678', '6900', '4589', '28945', '4123975', '2134568890');

let result = arr.map(item => {
    if(item[0] === '2' || item[0] === '4') {
        console.log(item);
    }
});


primeNumber: for (let i = 2; i < 100; i++) {
    for (let j = 2; j < i; j++) {
        if (i % j === 0) {
            continue primeNumber;
        }   
    }
    console.log(`${i}. Делители этого числа: 1 и ${i}`);
}





