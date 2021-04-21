'use strict';
const input = document.getElementById('input'),
        p = document.querySelector('p');
// const showText = function() {
//     p.textContent = input.value;
// }

// input.addEventListener('input', () => {
//     const idTimeout = setTimeout(showText, 300);
// });
function debounce(f, t) { //f is functiom t is time
    return function () {
        let previousCall = this.lastCall;
        // console.log('previousCall: ', previousCall);
        this.lastCall = Date.now();
        // console.log('this.lastCall: ', this.lastCall);
        if (previousCall && ((this.lastCall - previousCall) <= t)) { //if true previousCall, if it is not the fist time
            // console.log('this.lastCall - previousCall: ', this.lastCall - previousCall);
        clearTimeout(this.lastCallTimer);
        }
        this.lastCallTimer = setTimeout(() => f(), t);
    }
}
    const showText = function() {
        p.textContent = input.value;
    }

    // let logger = (args) => console.log(`My args are ${args}`);
   // debounce: call the logger when two seconds have elapsed since the last call
    // let debouncedLogger = debounce(logger, 2000);

    // debouncedLogger([1, 2, 3]);
    // debouncedLogger([4, 5, 6]);
    // debouncedLogger([7, 8, 9]);

  // "My args are 7, 8, 9" - logged after two seconds
input.addEventListener('input', debounce(showText, 300));
