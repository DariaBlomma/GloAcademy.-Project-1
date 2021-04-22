'use strict';
function getResult(x,y){
    let result;
    // ваш код
    let degree =  String(x ** y);
    result = degree.split('');
    result = result.reduce((acc, item) => {
        return acc + Number(item);
    }, 0);
    return result
}

console.log(getResult(4, 8))