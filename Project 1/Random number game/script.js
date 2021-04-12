// //game random number
'use strict';

/*let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

function showTypeOf(data) {
    console.log(typeof data);
}

const startGame= function() {
    let randomNumber = Math.round(Math.random() * 100);
    //console.log('randomNumber: ', randomNumber);
    let tryCount = 10;

    function startAgain() {
        let ifAgain = confirm('Хотели бы сыграть еще?');
            if (ifAgain) {
                startGame();
            } else {
                return alert('Игра окончена');
            }
    }

    function writeNumber() {
        let userAnswer = prompt('Угадай число от 1 до 100');
        --tryCount;

        function compareAnswer () {

            if(tryCount === 0) {
                alert('Попытки закончились');
                return startAgain();
            }
            if (userAnswer > randomNumber) {
                alert('Загаданное число меньше. Oсталось попыток ' + tryCount);
                writeNumber();
            } else if(userAnswer < randomNumber) {
                alert('Загаданное число больше. Oсталось попыток ' + tryCount);
                writeNumber();
            } else if (userAnswer === randomNumber) {
                alert ('Поздравляю, Вы угадали!!!');
                return startAgain();
            }
        }

        if (userAnswer === null) {
            return alert('Игра окончена');
        } else if (!isNumber(userAnswer)) {
            alert('Введи число!');
            writeNumber();
        } else {
            userAnswer = Number(userAnswer);
            compareAnswer();
        }
    }

    writeNumber();
};

startGame();
*/
// решение Маскима Лескина
const getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    // min = Math.min(min, max);
    // max = Math.max(min, max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const numCheck = function(n) {
    return !isNaN(parseInt(n)) && isFinite(n);
};

const getNumber = function(str) {
    const numUser = prompt(str);

    if(numUser === null) return null;
    if(numCheck(numUser)) {
        return +numUser;
    }

    alert(' Кажется, вы забыли ввести число. Попробуйте еще раз');
    getNumber(str);
};


const getCounter = function() {
    let counter = 0;
    return function() {
        return counter++;
    };
};


const gameBot = function(attempts, min, max) {
    attempts = attempts || 10; // если забыли передать кол-во попыток, то по умолчанию 10
    min = min || 0;
    max = max || 100;
    const random = getRandomInt(min, max);
    const counter =  getCounter();

    return function checkNumber() {
        

        const count = counter();
        if(count < attempts) {
            const number = getNumber(' Попробуйте угадать число от ' + min + ' до ' + max);
            if (number === null) return alert(' До свидос Амиго! ');

            if (number > random) {
            alert(' Загаданное число меньше чем Ваше');
            return checkNumber();
            }
            if(number < random) {
                alert(' Загаданное число больше');
                return checkNumber();
            }
            if(number === random) {
                alert(' Молодец! Угадал!');
            } 
        } else {
            alert(' Кол-во попыток закончилось. Было загадано число ' + random);
        }

        const questAC = confirm(' Хотите сыграть заново? ');
        if(questAC) {
            alert(' Отлично! Начинаем!');
            gameBot(attempts, min, max)();
        } else {
            alert(' Спасибо за игру! Еще увидимся');
        }
        
    };
    
};

gameBot(10, 1, 10)();