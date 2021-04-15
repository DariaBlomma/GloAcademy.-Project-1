'use strict';
//hard task


let p = document.createElement('p');
document.body.prepend(p);
let btn = document.querySelector('button');

// использует арабские десятичные цифры от 0 до 9 и латинские буквы от A до F
    let letters = "0123456789ABCDEF";
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[(Math.floor(Math.random() * 16))];
    }
    p.textContent = color;
    document.body.style.backgroundColor = color;
    
btn.addEventListener("click", function() {
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[(Math.floor(Math.random() * 16))];
    }
    p.textContent = color;
    document.body.style.backgroundColor = color;
});
    


