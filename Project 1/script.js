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