'use strict';
//obligatory task
const startBtn = document.getElementById('start'),
    cancel = document.getElementById('cancel'),

    incomePlus = document.getElementsByTagName('button')[0],

    expensesPlus = document.getElementsByTagName('button')[1],

    depositCheck = document.querySelector('#deposit-check'),

    // addExpensesItem1 = document.querySelectorAll('.additional_income-item')[0],

    // addExpensesItem2 = document.querySelectorAll('.additional_income-item')[1],

    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],

    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],

    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],

    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],

    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],

    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],

    targetMonthdValue = document.getElementsByClassName('target_month-value')[0],

    salaryAmount = document.querySelector('.salary-amount'),

    additonalIncomeItem = document.querySelectorAll('.additional_income-item'),

    expensesTitle = document.querySelector('.expenses-items .expenses-title'),

    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    additionalExpensesItems = document.querySelectorAll('.additional_expenses-item'),
    
    targetAmount = document.querySelector('.target-amount'),

    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');

// решение от Александра Монахова
const isNumberInput = (event) => {
    event.target.value = event.target.value.replace(/\D/g, '');
};

const isText = (event) => {
    event.target.value = event.target.value.replace(/[^а-яА-Я ,]/g, '');
};
//check input data
const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

class AppData {
    constructor () {
        this.income = {};
        this.addIncome = [];
        this.incomeMonth = 0;
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    }

    validation () {
        const sumPlaceholders = document.querySelectorAll('[placeholder="Сумма"]'),
            textPlaceholders = document.querySelectorAll('[placeholder="Наименование"]'),
            namePlaceholder = document.querySelectorAll('[placeholder="название"]');
        sumPlaceholders.forEach((item) => {
            item.addEventListener('input', isNumberInput);
        });
        textPlaceholders.forEach((item) => {
            item.addEventListener('input', isText);
        });
        namePlaceholder.forEach((item) => {
            item.addEventListener('input', isText);
        });
    }

    mustFieldCheck () {
        if(salaryAmount.value === '') {
            startBtn.setAttribute('disabled', 'true');
            startBtn.style.opacity = '0.5';
        } 
    }

    // check () {
    //     if(salaryAmount.value !== '') {
    //         this.startBtn.removeAttribute('disabled');
    //     }
    // }

    start () {
        this.mustFieldCheck();
        // let allinput = document.querySelector('.data input [type="text"]');
        // allinput.forEach(item => {
        //     item.setAttribute('disabled', 'true');
        // });
        expensesPlus.setAttribute('disabled', 'true');
        expensesPlus.style.opacity = '0.5';
        incomePlus.setAttribute('disabled', 'true');
        incomePlus.style.opacity = '0.5';
        // startBtn.style.display = 'none';
        // cancel.style.display = 'block';

        this.budget = salaryAmount.value;
        // this.getExpenses();
        // this.getIncome();
        this.getExpInc();
        this.getExpensesMonth();// суммируем расхо
        // this.getAddExpenses();
        // this.getAddIncome();
        this.getAddExpInc ();
        this.getBudget(); // считаем budgetMonth, budgetDay
        this.showResult();
    }

    reset (e) {
        incomeItems.forEach((item) => {
            incomeItems = document.querySelectorAll('.income-items');
            if (incomeItems.length > 1) {
                item.remove();
                // eincomePlus.style.display = 'block';
            } else if (incomeItems.length < 3) {
                incomePlus.style.display = 'block';
            }
        });
    
        // вариант 2 удаления лишних полей
        // let actualExpensesItemsArray = [...document.querySelectorAll('.expenses-items')];
        // actualExpensesItemsArray.filter(item => item !== actualExpensesItemsArray[0]).forEach(item => item.remove());
    
    
        expensesItems.forEach((item) => {
            expensesItems = document.querySelectorAll('.expenses-items');
            if (expensesItems.length > 1) {
                item.remove();
                // expensesPlus.style.display = 'block';
            } else if (expensesItems.length < 3) {
                expensesPlus.style.display = 'block';
            }
        });
        
    
        const textInputs = document.querySelectorAll('[type="text"]');
        textInputs.forEach((item) => {
            item.value = '';
            item.removeAttribute('disabled', 'true');
        });
        expensesPlus.removeAttribute('disabled');
        expensesPlus.style.opacity = '1';
        incomePlus.removeAttribute('disabled');
        incomePlus.style.opacity = '1';
        
        this.budget = 0;
        this.income = {};
        this.addIncome = [];
        this.incomeMonth = 0;
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        periodSelect.value = 1;
        periodAmount.textContent = 1;
    
        periodSelect.addEventListener('change', () => {
            incomePeriodValue.value = this.calcSavedMoney();
        });
    }

    showResult () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthdValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
    
        periodSelect.addEventListener('change', () => {
            incomePeriodValue.value = this.calcSavedMoney();
        });  
    }

    // getExpenses () {
    //     expensesItems.forEach(item => {
    //         const itemExpenses = item.querySelector('.expenses-title').value;
    //         const cashExpenses = item.querySelector('.expenses-amount').value;
    //         if(itemExpenses !== '' && cashExpenses !== '') {
    //             this.expenses[itemExpenses] = +cashExpenses;
    //         }
    //     });
    // }

    // getIncome () {
    //     incomeItems.forEach(item => {
    //         const itemIncome = item.querySelector('.income-title').value;
    //         const cashIncome = item.querySelector('.income-amount').value;
    //         if(itemIncome !== '' && cashIncome !== '') {
    //             this.income[itemIncome] = cashIncome;
    //         }
    //     });
    
    //     for (const key in this.income) {
    //         this.incomeMonth += +this.income[key];
    //     }
    // }


    getExpInc () {
        const count = item => {
            console.log('item: ', item);
            const startStr = item.className.split('-')[0]; // div  доп доходы
            console.log('startStr: ', startStr);
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            console.log('itemTitle: ', itemTitle);
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            console.log('itemAmount: ', itemAmount);
            if(itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = +itemAmount;
            }
        };

        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for (const key in this.income) {
            console.log('key: ', key);
            this.incomeMonth += +this.income[key];
            console.log('this.incomeMonth: ', this.incomeMonth);
        }

    }

    getAddExpInc () {
        const addExpenses = additionalExpensesItem.value.split(',');
        let startStr = additionalExpensesItem.className.slice(`${additionalExpensesItem.className.indexOf('_') + 1}`).split('-')[0]; //expenses
        let startStrCap = startStr.replace(startStr[0], startStr[0].toUpperCase());
        
        const push = (item) => {
            item.trim();
            if(item !== '') {
                this[`add${startStrCap}`].push(item);
            }
        };

        const count = elem => {
            startStr = elem.className.slice(`${elem.className.indexOf('_') + 1}`).split('-')[0]; //income
            startStrCap = startStr.replace(startStr[0], startStr[0].toUpperCase());
            elem = elem.value;
            push (elem);
        };

        addExpenses.forEach(push);
        additonalIncomeItem.forEach(count);
    }

    // addExpensesBlock () {
    //     // создаем обязтельне расходы
    //     let cloneExpensesItem = expensesItems[0].cloneNode(true);
    //     let cloneChildren = cloneExpensesItem.children;
    //     for (let i = 0; i < cloneChildren.length; i++) {
    //         cloneChildren[i].value = '';
    //     }
    //     expensesPlus.before(cloneExpensesItem);
    //     expensesItems = document.querySelectorAll('.expenses-items');
    //     if(expensesItems.length === 3) {
    //         expensesPlus.style.display = 'none';
    //     } 
    // }

    addIncomeBlock () {
        // создаем дополнительные доходы
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        let cloneChildren = cloneIncomeItem.children;
        for (let i = 0; i < cloneChildren.length; i++) {
            cloneChildren[i].value = '';
        }
        incomePlus.before(cloneIncomeItem);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }
// somewhere here is my problem
    addExpIncBlock (parent, item, btn) { 
         // item = our variable expensesItems or incomeItems    
        if (parent === 'expenses') {
            btn =  expensesPlus;
            item = expensesItems;
        } else {
            btn =  incomePlus;
        }

        let cloneItem = item[0].cloneNode(true);
        let cloneChildren = cloneItem.children;
        for (let i = 0; i < cloneChildren.length; i++) {
            cloneChildren[i].value = '';
        }

        btn.before(cloneItem);
        
        item = document.querySelectorAll(`.${parent}-items`);
        console.log('expensesItems: ', item);
        if(item.length === 3) {
            btn.style.display = 'none';
        } 
    }


    asking () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Sambo, laptop, lead');
            // \b matches a word boundary (the beginning or ending of word);
            // \w matches the following meta-character [a-zA-Z0-9].
            // g is global search, not only first appearance
            //appData.addExpenses = addExpenses.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()).split(', ');
    }

    getExpensesMonth () {
        // просуммировали расходы
        for (const key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
        return this.expensesMonth;
    }
    
    getBudget () {
    //Бюджет на месяц вычисляется по формуле: доходы минус сумма расходов, т е предыдущая функциия
    this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth () {
        return Math.ceil(targetAmount.value/ this.budgetMonth); //округляем в большую сторону
    }

    getStatusIncome () {
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
    }

    getInfoDeposit () {
        if(this.deposit) {
            do {
                this.percentDeposit = prompt(' Какой годовой процент?', '10');
            } while (!isNumber(this.percentDeposit));
            do {
                this.moneyDeposit = prompt(' Какая сумма заложена?', '10000');
            } while (!isNumber(this.moneyDeposit));
    
        }
    }

    calcSavedMoney () {
        return this.budgetMonth * periodSelect.value;
    }

    eventListeners () {
        // все наши обработчики событий, вызвать после appdta
        const _this = this;
    
        salaryAmount.addEventListener('input', () => {
            const valueStatus = salaryAmount.value.trim() === '';
            // click по кнопке не срабатывает при этом решении
            //  атрибут меняется, но кнопка не нажимается
            // startBtn.setAttribute('disabled' , `${valueStatus}`);
            if(!valueStatus) {
                startBtn.removeAttribute('disabled');
                startBtn.style.opacity = '1';
            } else {
                startBtn.setAttribute('disabled' , 'true');
                startBtn.style.opacity = '0.5';
            }
        });
        
    
        startBtn.addEventListener('click', (e) => {
            this.start();
            const textInputs = document.querySelectorAll('[type="text"]');
            textInputs.forEach((item) => {
                item.setAttribute('disabled', 'true');
            });
            startBtn.style.display = 'none';
            cancel.style.display = 'block';
        });
    
        cancel.addEventListener('click', () => {
            this.reset(); 
            cancel.style.display = 'none';
            startBtn.style.display = 'block';
            this.mustFieldCheck();
        });
    
        expensesPlus.addEventListener('click', (e) => {
            // this.addExpensesBlock();
            this.addExpIncBlock(`${e.target.parentElement.className}`);
            this.validation();
        });

        incomePlus.addEventListener('click', (e) => {
            // this.addIncomeBlock();
            
            // this.addExpIncBlock(`${e.target.parentElement.className}`, incomeItems);
            this.validation();
        });

        periodSelect.addEventListener('change', (e) => {
            periodAmount.textContent = e.target.value;
        });
    }
}


const appData = new AppData();

appData.validation();
appData.mustFieldCheck();
appData.eventListeners();

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





