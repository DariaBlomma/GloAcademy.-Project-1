//game random number
'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

function showTypeOf(data) {
    console.log(typeof data);
}

const startGame= function() {
    let randomNumber = Math.round(Math.random() * 100);
   // console.log('randomNumber: ', randomNumber);

    function writeNumber() {
        let userAnswer = prompt('Угадай число от 1 до 100');

        function compareAnswer () {
            if (userAnswer > randomNumber) {
                alert('Загаданное число меньше');
                writeNumber();
            } else if(userAnswer < randomNumber) {
                alert('Загаданное число больше');
                writeNumber();
            } else if (userAnswer === randomNumber) {
                return alert('Поздравляю, Вы угадали!!!');
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

