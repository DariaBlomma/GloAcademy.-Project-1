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
// should match any word with only 1 space and any word with or without space. Two words are required
const isText2 = /\D/g;

let userNameCheck = function () {
    userArr =  user.split(' ');
    
    while (userArr.length !== 2 || !isText2.test(user)) {
        alert ('This is unappropriate format. Please write exactly 2 words and do not use numbers or other signs');
        user = prompt(' Write your name and surname');
        userArr =  user.split(' ');
    }
};

let usersInfo = [];
const parsed = JSON.parse(localStorage.getItem('usersInfo'));
if (parsed) {
    parsed.forEach(item => {
        console.log('lc exists');
        showUsers(item.name, item.surname, item.date);
    });
}

const saveUsers = (name, surname, login, password, date) => {
    let userObj = {
        'name': name,
        'surname': surname,
        'login': login,
        'password': password,
        'date': date,
    };

    usersInfo.push(userObj);
    localStorage.setItem('usersInfo', JSON.stringify(usersInfo));
};

const showUsers = function (name, surname, date) {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    li.textContent = `Name: ${name}, Surname: ${surname}, Sign up date: ${date}`;
    ul.append(li);
};


authorize.addEventListener('click', function() {
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

    const currDate = `${currDay} ${monthsRu[currMonth]} ${currYear} ${currTime}`;
    showUsers(userName, userSurname, currDate);

    do {
        userLogin = prompt('Set your login');
    } while (checkPromps(userLogin));

    do {
        userPassword = prompt('Set your password');
    } while (checkPromps(userPassword));

    saveUsers(userName, userSurname, userLogin, userPassword, currDate);
    // let userObj = {
    //     'name': `${userName}`,
    //     'surname': `${userSurname}`,
    //     'login': `${userLogin}`,
    //     'password': `${userPassword}`,
    // };

    // usersInfo.push(userObj);
    // console.log('usersInfo: ', usersInfo);
    // localStorage.setItem('usersInfo', JSON.stringify(usersInfo));
});










