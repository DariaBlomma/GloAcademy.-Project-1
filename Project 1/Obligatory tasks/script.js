'use strict';
//obligatory task
//lesson 09
let startBtn = document.getElementById('start'),

    incomePlus = document.getElementsByTagName('button')[0],

    expensesPlus = document.getElementsByTagName('button')[1],

    depositCheck = document.querySelector('#deposit-check'),

    addExpensesItem1 = document.querySelectorAll('.additional_income-item')[0],

    addExpensesItem2 = document.querySelectorAll('.additional_income-item')[1],

    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],

    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],

    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],

    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],

    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],

    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],

    targetMonthdValue = document.getElementsByClassName('target_month-value')[0],

    salaryAmount = document.querySelector('.salary-amount'),
    incomeItems = document.querySelectorAll('.income-items'),

    //addIncomeTitle = document.querySelector('.income-items .income-title'),
    additonalIncomeItem = document.querySelectorAll('.additional_income-item'),

    expensesTitle = document.querySelector('.expenses-items .expenses-title'),

    expensesItems = document.querySelectorAll('.expenses-items'),

    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    

    targetAmount = document.querySelector('.target-amount'),

    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    namePlaceholders = document.querySelectorAll('[placeholder="Наименование"]'),
    sumPlaceholders = document.querySelectorAll('[placeholder="Сумма"]');
    

namePlaceholders.forEach(function(item) {
    item.setAttribute('pattern', '^[А-Яа-яЁё\W\s]+$');
    item.addEventListener('change', function(e) {
        if (item.checkValidity() === false) {
                if (item.validity.patternMismatch) {
                    alert(' Это недопустимый формат ввода. Используйте только русские буквы, пробелы или знаки препинания.');
                }
            } 
    });
});
console.log('namePlaceholder: ', namePlaceholders);
sumPlaceholders.forEach(function(item) {
    item.setAttribute('pattern', '^\d+$');
    item.addEventListener('change', function(e) {
        if (item.checkValidity() === false) {
                if (item.validity.patternMismatch) {
                    alert(' Это недопустимый формат ввода. Используйте только цифры');
                }
            } 
    });
});
console.log('sumPlaceholder: ', sumPlaceholders);
//check input data
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


// правильная сумма для проверки - при сумме расходов 300, бюджет на день 156
let appData = {
    income: {},
    addIncome: [],
    incomeMonth: 0,
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function() {//repeat asking while not a number
        appData.budget = salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();// суммируем расхо
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget(); // считаем budgetMonth, budgetDay
        appData.showResult();
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthdValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();

        periodSelect.addEventListener('change', function() {
            incomePeriodValue.value = appData.calcSavedMoney();
        });
            
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    getIncome: function() {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if(item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additonalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if(item.value !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    addExpensesBlock: function(e) {
        // создаем обязтельне расходы
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.children[0].value = '';
        cloneExpensesItem.children[1].value = '';
        
        expensesPlus.before(cloneExpensesItem);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function() {
         // создаем дополнительные доходы
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.children[0].value = '';
        cloneIncomeItem.children[1].value = '';
        incomePlus.before(cloneIncomeItem);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    asking: function() {
        
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Sambo, laptop, lead');
            // \b matches a word boundary (the beginning or ending of word);
            // \w matches the following meta-character [a-zA-Z0-9].
            // g is global search, not only first appearance
            //appData.addExpenses = addExpenses.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()).split(', ');
    },
    budget: 0,
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
        appData.budgetMonth = +appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    }, 
    getTargetMonth: function() {
        return Math.ceil(targetAmount.value/ appData.budgetMonth); //округляем в большую сторону
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
        return appData.budgetMonth * periodSelect.value;
    }
};
salaryAmount.addEventListener('change', function(e) {
    if(salaryAmount.value === '') {
        startBtn.style.display = 'none';
        //alert(' Ошибка, поле "Месячный доход" должно быть заполнено');
        //return;
    } else {
        startBtn.style.display = 'block';
        startBtn.addEventListener('click', appData.start);
    }
});


expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', function(e) {
    periodAmount.textContent = e.target.value;
});





//Delete these logs?
//console.log(addExpenses.length);


//console.log(`The period is ${appData.period} months`);
//console.log(`The mission is to earn ${appData.mission} rubles`);

//console.log(appData.budget);

// console.log(' Бюджет на месяц ', appData.budgetMonth);
// console.log(' Бюджет на день ', appData.budgetDay);
//appData.getTargetMonth(); // кол-во месяцев на достижение цели
//appData.getStatusIncome(); // говорим статус доходов


// if(appData.getTargetMonth() < 0) {
//     alert(' Цель не будет достигнута');
// } else {
//     console.log(` Цель будет достигнута за ${appData.getTargetMonth()} месяца`);
// }

// console.log('Наша программа включает в себя данные: ');
// for (let key in appData) {
//     console.log(key, appData[key]);
// }

// appData.getInfoDeposit();

// console.log('appData.addExpenses: ', appData.addExpenses.join(', '));





