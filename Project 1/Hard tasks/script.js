'use strict';
//hard task
let num = 266219;
let numString = num.toString(); 
console.log(' numString: ',  numString);

let result = 1;

for (let i = 0; i < numString.length; i++) {
    result = result * (numString[i] * numString[++i]);
}

//variant 2

let arrString = numString.split('');
console.log('arrString: ', arrString);

let mapNum = arrString.map(function (item) {
    return Number(item);
    });
console.log('mapNum: ', mapNum);

let multiple = arrString.reduce(function (mult, current) {
    
    return mult * current;
}, 1);
console.log('multiple: ', multiple); //1296



console.log(result); //1296

result = result ** 3; //2176782336

console.log(result.toString().slice(0, 2)); //21
