// //game random number
'use strict';

let isNumber = function(n) {
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

