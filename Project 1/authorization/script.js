'use strict';
let span = document.querySelector('.user-name'),
    authorize = document.querySelector('.authorize'),
    logIn = document.querySelector('.log-in'),
    user,
    userArr,
    userLogin,
    userPassword,
    // usersInfo = [];
    usersInfo = new Map();

const checkPromps = field => {
    return field === null || field.trim() === '';
};


// const isText = /([A-Za-zа-яА-Я]+\s([A-Za-zа-яА-Я]+\s|[A-Za-zа-яА-Я]+))/;
// const check = new RegExp('([A-Za-zа-яА-Я]+\s([A-Za-zа-яА-Я]+\s|[A-Za-zа-яА-Я]+))', '');
// should match any word with only 1 space and any word with or without space. Two words are required
const isText2 = /\D/g;

const userNameCheck = () => {
    userArr =  user.split(' ');
    while (userArr.length !== 2 || !isText2.test(user)) {
        alert ('This is unappropriate format. Please write exactly 2 words and do not use numbers or other signs');
        user = prompt(' Write your name and surname');
        userArr =  user.split(' ');
    }
};

const saveUsers = (name, surname, login, password, date) => {
    let userObj = {
        'name': name,
        'surname': surname,
        'login': login,
        'password': password,
        'date': date,
    };

    //usersInfo.push(userObj);
    usersInfo.set(name, userObj);
};

const lcPush = () => {
    for (let [key, value] of usersInfo) {
        localStorage.setItem(`${key}`, JSON.stringify(value));
    }
}
const renderBtns = item => {
    const btn = document.createElement('button');
    btn.textContent = 'Delete user';
    btn.style.marginLeft = '10px';
    btn.className = 'delete';
    item.append(btn);
};

const showUsers = (name, surname, date) => {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    li.style.paddingBottom = '10px';
    li.innerHTML = `<b>Name:</b> ${name}, <b>Surname:</b> ${surname}, <b>Sign up date:</b> ${date}`;
    ul.append(li);
    renderBtns(li);
};

for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key) {
        console.log('lc exists');
        const parsed = JSON.parse(localStorage.getItem(`${key}`));
        showUsers(parsed.name, parsed.surname, parsed.date);
        saveUsers(parsed.name, parsed.surname, parsed.login, parsed.password, parsed.date);
    }
}

const ul = document.querySelector('ul');


const deleteUser = index => {
    const btns = ul.querySelectorAll('.delete');
    for (let i = 0; i < btns.length; i++) {
        if (i === index) {
            const li = ul.children[i].textContent;
            // delete usersInfo[index];
            ul.children[i].remove();
            const pos1 = li.indexOf(':') + 1;
            const pos2 = li.indexOf(',');
            const key = li.substring(pos1, pos2).trim();
            usersInfo.delete(`${key}`);        
            localStorage.removeItem(`${key}`);
        }
    }
};


ul.addEventListener('click', event => {  
    const btns = ul.querySelectorAll('.delete');  
    btns.forEach((elem, index) => {
        if (event.target === elem) {
            deleteUser(index);
        }
    })
});

authorize.addEventListener('click', () => {
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
        monthsRu = [' января', ' февраля ', ' марта', ' апреля', ' мая ', ' июня', ' июля', ' августа', ' сентября', ' октября', ' ноября', ' декабря'];

    const currDate = `${currDay} ${monthsRu[currMonth]} ${currYear} ${currTime}`;
    showUsers(userName, userSurname, currDate);

    do {
        userLogin = prompt('Set your login');
    } while (checkPromps(userLogin));

    do {
        userPassword = prompt('Set your password');
    } while (checkPromps(userPassword));

    saveUsers(userName, userSurname, userLogin, userPassword, currDate, userNumber);
    lcPush();
});


logIn.addEventListener('click', () => {
    let logLogin,
        logPassword;
    do {
        logLogin = prompt('Write your login');
    } while (checkPromps(logLogin));

    do {
        logPassword = prompt('Write your password');
    } while (checkPromps(logPassword));

    logLogin = logLogin.trim();
    logPassword = logPassword.trim();
    if (usersInfo.has(logLogin)) {
        if (logPassword === usersInfo.get(logLogin).password) {
            span.style.color = 'blue';
            span.textContent = logLogin;
        } else {
            alert('This is the wrong password');
        }
    } else {
        alert('No such user found');
    }
});








