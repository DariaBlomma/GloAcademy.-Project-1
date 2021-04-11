'use strict';
//obligatory task
//check input data
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


let money,
    start = function() {//repeat asking while not a number
        do {
            money = prompt('Ваш месячный доход?', '5000');//month
        } while (!isNumber(money));
    };

    start();
// правильная сумма для проверки - при сумме расходов 300, бюджет на день 156
let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 12000,
    period: 12,
    asking: function() {
        if(confirm(' Есть ли у Вас дополнительный источник заработка?')) {
            let itemIncome, cashIncome ='';
            // пропускает деление на 0. Непорядок
            do {
                itemIncome = prompt('Какой у Вас дополнительный заработок?','Таксую');
            } while (isNumber(itemIncome));

            
            do {
                cashIncome = prompt(' Сколько в месяц Вы на этом зарабатываете?', '1000');
            } while (!isNumber(cashIncome));
            
            appData.income[itemIncome] = cashIncome;
        }
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Sambo, laptop, lead');
            // \b matches a word boundary (the beginning or ending of word);
            // \w matches the following meta-character [a-zA-Z0-9].
            // g is global search, not only first appearance
            appData.addExpenses = addExpenses.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()).split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
        
        let expenses = [];
        for (let i = 0; i < 2; i++) {
            //узнали расходы и записали в объект
            do {
                expenses[i] = prompt('Введите обязательную статью расходов?', 'food');
            } while (isNumber(expenses[i]));
            
            let amount;
            do {
                amount = prompt('Во сколько обойдется ?', '100');
            } while (!isNumber(amount));
            
            appData.expenses[expenses[i]] = +amount;
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
    getInfoDeposit: function() {
        if(appData.deposit) {
            do {
                appData.percentDeposit = prompt(' Какой годовой процент?', '10');
            } while (!isNumber(appData.percentDeposit));
            do {
                appData.moneyDeposit = prompt(' Какая сумма заложена?', '10000');
            } while (!isNumber(appData.moneyDeposit));

        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};
//Delete these logs?
//console.log(addExpenses.length);


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

appData.getInfoDeposit();

console.log('appData.addExpenses: ', appData.addExpenses.join(', '));
