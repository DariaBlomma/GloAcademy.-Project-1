'use strict';
//hard task
let num = 266219;
let numString = num.toString(); 

let result = 1;

for (let i = 0; i < numString.length; i++) {
    result = result * (numString[i] * numString[++i]);
}

console.log(result); //1296

result = result ** 3; //2176782336

console.log(result.toString().slice(0, 2)); //21