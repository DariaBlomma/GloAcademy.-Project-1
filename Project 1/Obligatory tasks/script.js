'use strict';
//obligatory task
//lesson 09
let startBtn = document.getElementById('start'),
    cancel = document.getElementById('cancel'),

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
    periodAmount = document.querySelector('.period-amount');
    // let cloneExpensesItem = expensesItems[0].cloneNode(true);

//check input data
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
//maybe use for reset somehow? think about it
let initialState = {
    income: {},
    addIncome: [],
    incomeMonth: 0,
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
};
// правильная сумма для проверки - при сумме расходов 300, бюджет на день 156
let appData = {
    // income: {},
    // addIncome: [],
    // incomeMonth: 0,
    // expenses: {},
    // addExpenses: [],
    // deposit: false,
    // percentDeposit: 0,
    // moneyDeposit: 0,
    start: function() {//repeat asking while not a number
        // Object.assign(appData, initialState);
        this.budget = salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();// суммируем расхо
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget(); // считаем budgetMonth, budgetDay
        this.showResult();
    },
    reset: function(e){

        if (incomeItems.length > 1) {
            incomeItems[1].remove();
            incomeItems[2].remove();
            incomePlus.style.display = 'block';
        }
        if(expensesItems.length > 1) {
            expensesItems[1].remove();
            expensesItems[2].remove();
            expensesPlus.style.display = 'block';
        }

        let textInputs = document.querySelectorAll('[type="text"]');
        textInputs.forEach(function(item) {
            item.value = '';
            item.removeAttribute('disabled', 'true');
        });
        
        Object.assign(appData, initialState);
        // this.budget = 0;
        // this.income = {};
        // this.addIncome = [];
        // this.incomeMonth = 0;
        // this.expenses = {};
        // this.addExpenses = [];
        // this.deposit = false;
        // this.percentDeposit = 0;
        // this.moneyDeposit = 0;
        // this.budget = 0;
        // this.budgetDay = 0;
        // this.budgetMonth = 0;
        // this.expensesMonth = 0;
    },
    showResult: function() {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthdValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();

        periodSelect.addEventListener('change', function() {
            incomePeriodValue.value = _this.calcSavedMoney();
        });
            
    },
    getExpenses: function() {
        expensesItems.forEach(item => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    getIncome: function() {
        incomeItems.forEach(item => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        });

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if(item !== '') {
                this.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additonalIncomeItem.forEach(item => {
            let itemValue = item.value.trim();
            if(item.value !== '') {
                this.addIncome.push(itemValue);
            }
        });
    },
    addExpensesBlock: function() {
        // создаем обязтельне расходы
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesPlus.before(cloneExpensesItem);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function() {
         // создаем дополнительные доходы
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
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
    // budget: 0,
    // budgetDay: 0,
    // budgetMonth: 0,
    // expensesMonth: 0,
    getExpensesMonth: function() {
        // просуммировали расходы
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
        return this.expensesMonth;
    }, 
    getBudget: function() {
        
        //Бюджет на месяц вычисляется по формуле: доходы минус сумма расходов, т е предыдущая функциия
        this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }, 
    getTargetMonth: function() {
        return Math.ceil(targetAmount.value/ this.budgetMonth); //округляем в большую сторону
    },
    getStatusIncome: function() {
        if(this.budgetDay > 1200) {
            alert('У вас высокий уровень дохода ' + this.budgetDay);
        } else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
            alert('У вас средний уровень дохода ' + this.budgetDay);
        } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
            alert('К сожалению у вас уровень дохода ниже среднего ' + this.budgetDay);
        } else {
            alert('Что то пошло не так');
            return 'negative number' + this.budgetDay;
        }
    },
    getInfoDeposit: function() {
        if(this.deposit) {
            do {
                this.percentDeposit = prompt(' Какой годовой процент?', '10');
            } while (!isNumber(appData.percentDeposit));
            do {
                this.moneyDeposit = prompt(' Какая сумма заложена?', '10000');
            } while (!isNumber(this.moneyDeposit));

        }
    },
    calcSavedMoney: function() {
        return this.budgetMonth * periodSelect.value;
    }
};

let  mustFieldCheck =  function () {
    if(salaryAmount.value === '') {
    startBtn.setAttribute('disabled', 'true');
    startBtn.style.opacity = '0.5';
    } 
};

mustFieldCheck();

let salaryCheck;
salaryAmount.addEventListener('change', function() {
    if(salaryAmount.value === '') {
        startBtn.setAttribute('disabled', 'true');
            startBtn.style.opacity = '0.5';
            alert(' Ошибка, поле "Месячный доход" должно быть заполнено');
    } else {
        startBtn.removeAttribute('disabled', 'true');
        startBtn.style.opacity = '1';
        salaryCheck = true;
        return salaryCheck;
    }
});

startBtn.addEventListener('click', function(e) {
    if (salaryCheck) {
        let start = appData.start.bind(appData);
            start();
            let textInputs = document.querySelectorAll('[type="text"]');
            textInputs.forEach(function(item) {
                item.setAttribute('disabled', 'true');
            });
            startBtn.style.display = 'none';
            cancel.style.display = 'block';
    }
});

cancel.addEventListener('click', function() {
    mustFieldCheck(); 
    let reset = appData.reset.bind(appData);
    reset(); 
    cancel.style.display = 'none';
    startBtn.style.display = 'block';
    if(salaryAmount.value === '') {
        startBtn.setAttribute('disabled', 'true');
        startBtn.style.opacity = '0.5';
    } 
});

expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));
periodSelect.addEventListener('change', function(e) {
    periodAmount.textContent = e.target.value;
});

console.log(appData);
Object.assign(appData, initialState);
// console.log(appData);
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





