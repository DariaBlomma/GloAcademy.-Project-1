'use strict';
let print1 = function() {
	console.log('Крот');
}
let print2 = function() {
	console.log('овце,');
}
let print3 = function() {
	console.log('жирафу,');
}
let print4 = function() {
	console.log('зайке');
}
let print5 = function() {
	console.log('голубые');
}
let print6 = function() {
	console.log('сшил');
}
let print7 = function() {
	console.log('фуфайки');
}

let func1 = function() {
	// ...
    // console.log('function 1');
    print3();
};

let func2 = function() {
	func1();

	setTimeout(function() {
		// ...
        // console.log('function 2 timeout 1000');
        print7();
	}, 1000);
}

let func3 = function() {
	setTimeout(function() {
		func2();
		// ...
        // console.log('function setTimeout 250');
        print4();
	}, 250);

	// ...
    // console.log('function 3');
    print2();
}

setTimeout(function() {
	// ... 
    // console.log('function setTimeout 500');
    print5();

	setTimeout(function() {
		// ...
        // console.log('function setTimeout 750');
        print6();
	}, 750);
}, 500);

// ...
// console.log('no function');
print1();
func3();
