'use strict';
let span = document.querySelector('.user-name');
let authorize = document.querySelector('.authorize');
let logIn = document.querySelector('.log-in');


let user,
    userArr,
    userLogin,
    userPassword;

let checkPromps = function (field) {
    if (field === null) {
        alert('Its okay that you dont want to sign up on this strange site. Bye!');
        return false;
    }
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
    do {
        user = prompt(' Write your name and surname');
    } while (user.trim() === '');

    // if (user === null) {
    //     alert ('Its okay that you dont want to sign up on this strange site. Bye!');
    // }

    userNameCheck();

    
    // console.log('user: ', user);
    
    // let userArr = user.split(' ');
    // let userName = userArr[0];
    // let userSurname = userArr[1];

    // do {
    //     userLogin = prompt('Set your login');
    // } while (!checkPromps(userLogin));

    // do {
    //     userPassword = prompt('Set your password');
    // } while (!checkPromps(userPassword));

    // let userObj = {
        
    //     'name': `${userName}`,
    //     'surname': `${userSurname}`,
    //     'login': `${userLogin}`,
    //     'password': `${userPassword}`,
    // };

    // usersInfo.push(userObj);
    // console.log('usersInfo: ', usersInfo);
    
});