'use strict';
const inputA = document.getElementById('a'),
    inputB = document.getElementById('b'),
    sum = document.getElementById('sum'),
    mult = document.getElementById('mult'),
    res = document.getElementById('res');

const calculator = {
    sum: function(){
      // ваш код
        return +inputA.value + +inputB.value;
    },
    mult: function(){
      // ваш код
        return +inputA.value * +inputB.value;
    },
    show: function(s){
      // ваш код
        if (s) {
            res.value = this.sum();
        } else {
            res.value = this.mult();
        }
    },
    eventListeners: function() {
        const _this = this;
        sum.addEventListener('click', () => {
            this.show(1);
        });
        mult.addEventListener('click', () => {
            this.show();
        });
    }
}

const start = calculator.eventListeners.bind(calculator);
start();




