'use strict';
//obligatory task
let money = 5000, //month
    income = 3450, //additional
    addExpenses = 'Sambo, laptop, lead',
    deposit = false, 
    mission = 12000, 
    period = 12,
    budgetDay = money / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`The period is ${period} months`);
console.log(`The mission is to earn ${mission} rubles`);
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);

//lesson 03
console.log('lesson03');
money = +prompt('Ваш месячный доход?');
console.log('money: ', money);
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = prompt('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?');
let expenses2 = prompt('Введите другую обязательную статью расходов?');
let amount1 = +prompt('Во сколько обойдется ' + expenses1 + '?');
let amount2 = +prompt('Во сколько обойдется ' + expenses2 + '?');
//Бюджет на месяц вычисляется по формуле: доходу минус сумма расходов
let budgetMonth = money - (amount1 + amount2);
console.log('budgetMonth: ', budgetMonth);
let missionAchievment = Math.ceil(mission / budgetMonth);
console.log('missionAchievment: ', missionAchievment);
budgetDay = budgetMonth / 30;
console.log('budgetDay: ', Math.floor(budgetDay));

if(budgetDay > 1200) {
    alert('У вас высокий уровень дохода ' + budgetDay);
} else if (budgetDay >= 600 && budgetDay <= 1200) {
    alert('У вас средний уровень дохода ' + budgetDay);
} else if (budgetDay < 600 && budgetDay >= 0) {
    alert('К сожалению у вас уровень дохода ниже среднего ' + budgetDay);
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    alert('Что то пошло не так');
    console.log('negative number' + budgetDay);
}
