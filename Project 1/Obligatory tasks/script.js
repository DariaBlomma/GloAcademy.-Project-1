'use strict';
//obligatory task
let money = 5000, //month
    income = 3450, //additional
    addExpenses = 'Sambo, laptop, lead',
    deposit = false, 
    mission = 12000, 
    period = 12,
    budgetDay = money / 30;

function showTypeOf (data) {
    console.log(typeof data);
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


//Delete these logs?
//console.log(addExpenses.length);
//console.log(`The period is ${period} months`);
//console.log(`The mission is to earn ${mission} rubles`);


money = +prompt('Ваш месячный доход?');
//возможные расходы
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExpenses.toLowerCase().split(', '));
deposit = confirm('Есть ли у вас депозит в банке?');
//обязательные расходы
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько обойдется ' + expenses1 + '?');
let expenses2 = prompt('Введите другую обязательную статью расходов?');
let amount2 = +prompt('Во сколько обойдется ' + expenses2 + '?');
// сумма расходов
const getExpensesMonth = function(exp1, exp2) {
    return exp1 + exp2;
};
//Бюджет на месяц вычисляется по формуле: доходы минус сумма расходов, т е предыдущая функциия
function getAccumulatedMonth(callback) {
    return money - callback(amount1, amount2);
}

let accumulatedMonth = getAccumulatedMonth(getExpensesMonth);

const getTargetMonth = function() {
    return Math.ceil(mission / accumulatedMonth); //округляем в большую сторону
};

//Cрок достижения цели в месяцах
console.log('getTargetMonth' + getTargetMonth()); 

budgetDay = Math.floor(accumulatedMonth / 30);

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
