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
    
    targetAmount = document.querySelector('.target-amount'),

    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');

// решение от Александра Монахова
const isNumberInput = (event) => {
    event.target.value = event.target.value.replace(/\D/g, '');
};

const isText = (event) => {
    event.target.value = event.target.value.replace(/[^а-яА-Я ,]/g, '');
};

const maxRange = (event) => {
    
    const range = event.target.value;
    if (range < 0 || range > 100) {
        startBtn.setAttribute('disabled', 'true');
        startBtn.style.opacity = '0.5';
    } else {
        startBtn.removeAttribute('disabled');
        startBtn.style.opacity = '1';
    }
    
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
        
        depositAmount.addEventListener('input', isNumberInput);
        depositPercent.addEventListener('input', isNumberInput);
        depositPercent.addEventListener('input', maxRange);

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

    setCookie (key, value, year, month, day) {
        let cookieStr = `${key}=${encodeURI(value)}`;
        if (year) {
            const expires = new Date(year, month - 1, day);
            cookieStr += `; expires=${expires.toGMTString()}`;
            document.cookie = cookieStr;
        }

    }

    checkCookie () {
        let cookies = document.cookie.split(";");
        let keyArr = [];
        let keyStr = '';
        let lcKeyArr = ['isLoad'];
        let lcKeyStr = '';
        let valueArr = [];
        let valueStr = '';
        let lcValueArr = ['true'];
        let lcValueStr = '';
        
        for(let i=0; i < localStorage.length; i++) {
            let lcKey = localStorage.key(i);
            let json = JSON.parse(localStorage.getItem(lcKey));
            if (json.length === 0) {
                lcValueArr.push('');
            } else {
                lcValueArr.push(json);
                lcValueArr.sort();
                lcValueStr = lcValueArr.join('');
            }

            lcKeyArr.push(lcKey.trim());
            lcKeyArr.sort();
            lcKeyStr =  lcKeyArr.join('');
        }

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i]; //key = value
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            let val = cookie.substr((eqPos + 1));
            
            keyArr.push(name.trim());
            keyArr.sort();
            keyStr = keyArr.join('');

            valueArr.push(val);
            valueArr.sort();
            valueStr = valueArr.join('');
        }
        
        if (keyStr !== lcKeyStr || valueStr !== lcValueStr || keyArr.length !== lcKeyArr.length) {
            console.log('before cookies keyStr: ', keyStr);
            console.log('before lc keys', lcKeyStr);
            console.log('before cookies value', valueStr);
            console.log('before lcValueStr: ', lcValueStr);
            console.log('before', decodeURI(document.cookie));

            keyArr.forEach(item => {
                document.cookie = item + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
            });
            localStorage.clear();
            this.reset();

            console.log('cookies keyStr: ', keyStr);
            console.log('lc keys', lcKeyStr);
            console.log('cookies value', valueStr);
            console.log('lcValueStr: ', lcValueStr);
            console.log(decodeURI(document.cookie));
        }
    }

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
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();// суммируем расхо
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget(); // считаем budgetMonth, budgetDay
        this.showResult();

        localStorage.setItem('budgetMonth', JSON.stringify(this.budgetMonth));
        localStorage.setItem('budgetDay', JSON.stringify(this.budgetDay));
        localStorage.setItem('expensesMonth', JSON.stringify(this.expensesMonth));
        localStorage.setItem('addIncome', JSON.stringify(this.addIncome));
        localStorage.setItem('addExpenses', JSON.stringify(this.addExpenses));
        localStorage.setItem('calcSavedMoney', JSON.stringify(incomePeriodValue.value));
        localStorage.setItem('targetMonth', JSON.stringify(targetMonthdValue.value));

        this.setCookie('budgetMonth', this.budgetMonth, 2021, 12, 30);
        this.setCookie('budgetDay', this.budgetDay, 2021, 12, 30);
        this.setCookie('expensesMonth', this.expensesMonth, 2021, 12, 30);
        this.setCookie('addIncome', this.addIncome, 2021, 12, 30);
        this.setCookie('addExpenses', this.addExpenses, 2021, 12, 30);
        this.setCookie('calcSavedMoney', incomePeriodValue.value, 2021, 12, 30);
        this.setCookie('targetMonth', targetMonthdValue.value, 2021, 12, 30);
        this.setCookie('isLoad', true, 2021, 12, 30);
        
        console.log('in start' , decodeURI(document.cookie));
        
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
            localStorage.setItem('calcSavedMoney', JSON.stringify(incomePeriodValue.value));
            this.setCookie('calcSavedMoney', incomePeriodValue.value, 2021, 12, 30);
        });

        localStorage.clear();
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
            localStorage.setItem('calcSavedMoney', JSON.stringify(incomePeriodValue.value));
            this.setCookie('calcSavedMoney', incomePeriodValue.value, 2021, 12, 30);
        });  
    }

    showSavedResult () {
        budgetMonthValue.value = JSON.parse(localStorage.getItem('budgetMonth')) || this.budgetMonth;
        budgetDayValue.value = JSON.parse(localStorage.getItem('budgetMonth')) || this.budgetDay;
        expensesMonthValue.value = JSON.parse(localStorage.getItem('expensesMonth')) || this.expensesMonth;
        additionalExpensesValue.value = JSON.parse(localStorage.getItem('addExpenses')) ||this.addExpenses.join(', ');
        additionalIncomeValue.value = JSON.parse(localStorage.getItem('addIncome')) || this.addIncome.join(', ');
        targetMonthdValue.value = JSON.parse(localStorage.getItem('targetMonth')) || targetAmount.value;
        incomePeriodValue.value = JSON.parse(localStorage.getItem('calcSavedMoney')) || this.calcSavedMoney();
    }



    getExpenses () {
        expensesItems.forEach(item => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });
    }

    getIncome () {
        incomeItems.forEach(item => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        });
    
        for (const key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    getAddExpenses () {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if(item !== '') {
                this.addExpenses.push(item);
            }
        });
    }

    getAddIncome () {
        additonalIncomeItem.forEach(item => {
            const itemValue = item.value.trim();
            if(item.value !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }

    addExpensesBlock () {
        // создаем обязтельне расходы
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        let cloneChildren = cloneExpensesItem.children;
        for (let i = 0; i < cloneChildren.length; i++) {
            cloneChildren[i].value = '';
        }
        expensesPlus.before(cloneExpensesItem);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        } 
    }

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
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;    
        }
    }

    calcSavedMoney () {
        return this.budgetMonth * periodSelect.value;
    }

    changePercent () {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.value = '';
            depositPercent.style.display = 'inline-block';
            // hw Из введенный суммы высчитывать процент банка и добавлять в money
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value  = valueSelect;
        }

    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
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
            // this.start.bind(this);
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
    
        expensesPlus.addEventListener('click', ()  => {
            this.addExpensesBlock();
            this.validation();
        });

        incomePlus.addEventListener('click', () => {
            this.addIncomeBlock();
            this.validation();
        });

        periodSelect.addEventListener('change', (e) => {
            periodAmount.textContent = e.target.value;
        });

        depositCheck.addEventListener('change', this.depositHandler.bind(this));
    }
}


const appData = new AppData();
// console.log('appData : ', appData );
//appData.setCookie('trying to delete', 'delete me', 2021, 12, 30);
appData.checkCookie();
console.log(decodeURI(document.cookie));

appData.showSavedResult();
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