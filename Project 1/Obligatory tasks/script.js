'use strict';
//obligatory task
//check input data
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

function showTypeOf(data) {
    console.log(typeof data);
}

let money,
    start = function() {//repeat asking while not a number
        do {
            money = prompt('Ваш месячный доход?');//month
        } while (!isNumber(money));
    };
    start();

let mission = 12000, 
    period = 12;

showTypeOf(money);


//Delete these logs?
//console.log(addExpenses.length);
//console.log(`The period is ${period} months`);
//console.log(`The mission is to earn ${mission} rubles`);

let income = +prompt('Дополнительные доходы', 2300);
showTypeOf(income);

//возможные расходы
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Sambo, laptop, lead');
console.log(addExpenses.toLowerCase().split(', '));

let deposit = confirm('Есть ли у вас депозит в банке?');
showTypeOf(deposit);
//обязательные расходы
let expenses = [];
// сумма расходов
const getExpensesMonth = function() {
    let sum = 0;
    for (let i = 0; i < 4; i++) {

        expenses[i] = prompt('Введите обязательную статью расходов?', 'food');
        let amount = prompt('Во сколько обойдется ?');

        if(isNumber(amount)) {
            sum += +amount;
        }
    }
    return sum;
};

console.log(expenses);
let expensesAmount = getExpensesMonth();
console.log('Расходы за месяц ' + expensesAmount);
//Бюджет на месяц вычисляется по формуле: доходы минус сумма расходов, т е предыдущая функциия
function getAccumulatedMonth(sumFunction) {
    return +money - sumFunction;
}

let accumulatedMonth = getAccumulatedMonth(expensesAmount);
console.log(' Бюджет на месяц ', accumulatedMonth);

//Cрок достижения цели в месяцах
const getTargetMonth = function() {
     return Math.ceil(mission / accumulatedMonth); //округляем в большую сторону
}; 

if(getTargetMonth() < 0) {
    alert(' Цель не будет достигнута');
} else {
    console.log(` Цель будет достигнута за ${getTargetMonth()} месяца`);
}

let budgetDay = Math.floor(accumulatedMonth / 30);

const getStatusIncome = function() {
    if(budgetDay > 1200) {
        alert('У вас высокий уровень дохода ' + budgetDay);
    } else if (budgetDay >= 600 && budgetDay <= 1200) {
        alert('У вас средний уровень дохода ' + budgetDay);
    } else if (budgetDay < 600 && budgetDay >= 0) {
        alert('К сожалению у вас уровень дохода ниже среднего ' + budgetDay);
    } else {
        alert('Что то пошло не так');
        return 'negative number' + budgetDay;
    }
};

getStatusIncome();
