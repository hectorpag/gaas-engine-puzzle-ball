/*
List of functions:
	randInt - Random integer
	rand - Random float
	noScroll - Stop accidental scrolling on phones
*/
// Returns an integer starting from zero until desired number 'num' (default = 1)
// It adds 'mod' (default = 0) to the resulting number
function randInt(num, mod) {
    if (typeof num === 'undefined') {
        num = 1;
    }
    if (typeof mod === 'undefined') {
        mod = 0;
    }
    var randomNumber = Math.floor(Math.random() * num) + mod;
    return randomNumber;
}

// Returns random float number between 0 and 'num' (default = 1)
// It adds 'mod' (default = 0) to the resulting number
function rand(num, mod) {
    if (typeof num === 'undefined') {
        num = 1;
    }
    if (typeof mod === 'undefined') {
        mod = 0;
    }
    var randomNumber = (Math.random() * num) + 1;
    return randomNumber;
}

// Stops page from scrolling when using touch mechanics
function noScroll() {
    $('body').bind('touchmove', function (e) {
        e.preventDefault();
    });
}
