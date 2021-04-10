'use strict';
//obligatory task
//check input data
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


let money,
    start = function() {//repeat asking while not a number
        do {
            money = prompt('Ваш месячный доход?');//month
        } while (!isNumber(money));
    };

    start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 12000,
    period: 12,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Sambo, laptop, lead');
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
        
        let expenses = [];
        for (let i = 0; i < 2; i++) {
            //узнали расходы и записали в объект
            expenses[i] = prompt('Введите обязательную статью расходов?', 'food');
            let amount = prompt('Во сколько обойдется ?');

            if(isNumber(amount)) {
                appData.expenses[expenses[i]] = +amount;
            }
        }
    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function() {
        // просуммировали расходы
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
        return appData.expensesMonth;
    }, 
    getBudget: function() {
        //Бюджет на месяц вычисляется по формуле: доходы минус сумма расходов, т е предыдущая функциия
        appData.budgetMonth = +appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    }, 
    getTargetMonth: function() {
        return Math.ceil(appData.mission / appData.budgetMonth); //округляем в большую сторону
    },
    getStatusIncome: function() {
        if(appData.budgetDay > 1200) {
            alert('У вас высокий уровень дохода ' + appData.budgetDay);
        } else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200) {
            alert('У вас средний уровень дохода ' + appData.budgetDay);
        } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
            alert('К сожалению у вас уровень дохода ниже среднего ' + appData.budgetDay);
        } else {
            alert('Что то пошло не так');
            return 'negative number' + appData.budgetDay;
        }
    },
};
//Delete these logs?
//console.log(addExpenses.length);
//let income = +prompt('Дополнительные доходы', 2300);


//console.log(`The period is ${appData.period} months`);
//console.log(`The mission is to earn ${appData.mission} rubles`);

//console.log(appData.budget);
appData.asking();
console.log('Расходы за месяц ', appData.getExpensesMonth());// суммируем расходы
appData.getBudget(); // считаем budgetMonth, budgetDay
// console.log(' Бюджет на месяц ', appData.budgetMonth);
// console.log(' Бюджет на день ', appData.budgetDay);
appData.getTargetMonth(); // кол-во месяцев на достижение цели
appData.getStatusIncome(); // говорим статус доходов


if(appData.getTargetMonth() < 0) {
    alert(' Цель не будет достигнута');
} else {
    console.log(` Цель будет достигнута за ${appData.getTargetMonth()} месяца`);
}

console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
    console.log(key, appData[key]);
}