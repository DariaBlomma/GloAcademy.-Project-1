'use strict';
let span = document.querySelector('.user-name');
let authorize = document.querySelector('.authorize');
let logIn = document.querySelector('.log-in');


let user,
    userArr,
    userLogin,
    userPassword;

let checkPromps = function (field) {
    return field === null || field.trim() === '';
};

// const isText = /([A-Za-zа-яА-Я]+\s([A-Za-zа-яА-Я]+\s|[A-Za-zа-яА-Я]+))/;
// const check = new RegExp('([A-Za-zа-яА-Я]+\s([A-Za-zа-яА-Я]+\s|[A-Za-zа-яА-Я]+))', '');
const isText2 = /\D/g;

let userNameCheck = function () {
    userArr =  user.split(' ');
    
    while (userArr.length !== 2 || !isText2.test(user)) {
        alert ('This is unappropriate format. Please write exactly 2 words and do not use numbers or other signs');
        user = prompt(' Write your name and surname');
        userArr =  user.split(' ');
    }
};

// matches any word with only 1 space and any word with or without space. Two words are required
let usersInfo = [];
authorize.addEventListener('click', function() {
    // if (user === null) {
    //     alert ('Its okay that you dont want to sign up on this strange site. Bye!');
    // }

    do {
        user = prompt(' Write your name and surname');
    } while (checkPromps(user));

    userNameCheck();
    const userArr = user.split(' '),
        userName = userArr[0],
        userSurname = userArr[1],
        date = new Date(),
        currDay = date.getDate(),
        currMonth = date.getMonth(),
        currYear = date.getFullYear(),
        currTime = date.toLocaleTimeString(),
        monthsRu = [' января', ' февраля ', ' марта', ' апреля', ' мая ', ' июня', ' июля', ' августа', ' сентября', ' октября', ' ноября', ' декабря'],
            changeEnding = function(date, text1, text2, text3) {
            if (String(date).endsWith('1')) {
                p.innerHTML += ` ${text1} `;
            } else if (String(date).endsWith('2') || String(date).endsWith('3') || String(date).endsWith('4')) {
                p.innerHTML += ` ${text2} `;
            } else {
                p.innerHTML += ` ${text3} `;
            }
        };
        // let currMonth= new Date().getMonth();
        // p.innerHTML += monthsRu[currMonth];
        // p2.innerHTML += addZero(++currMonth, '.');
        const currDate = `${currDay} ${monthsRu[currMonth]} ${currYear} ${currTime}`;
    showUsers(userName, userSurname, currDate);
    do {
        userLogin = prompt('Set your login');
    } while (checkPromps(userLogin));

    do {
        userPassword = prompt('Set your password');
    } while (checkPromps(userPassword));

    
    // console.log('user: ', user);
    






    // let userObj = {
        
    //     'name': `${userName}`,
    //     'surname': `${userSurname}`,
    //     'login': `${userLogin}`,
    //     'password': `${userPassword}`,
    // };

    // usersInfo.push(userObj);
    // console.log('usersInfo: ', usersInfo);
    
});

const showUsers = function (name, surname, date) {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    li.textContent = `Name: ${name}, Surname: ${surname}, Sign up date: ${date}`;
    ul.append(li);
};
