const log = function(message) {
    console.log('My this ', this);
    console.log(message);
}
log('Javascript works!')

const strictLog = function(message) {
    'use strict'
    console.log('My this ', this);
    console.log(message);
}
strictLog('Javascript works better in strict!')

// if not-strict, this = global object in node js
//                     = window if in web browser
// if use-strict, this = undefined

