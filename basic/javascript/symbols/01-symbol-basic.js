const sym = Symbol();

const typeOfSym = typeof sym;
// "symbol"
console.log(typeOfSym);

const eq = sym === Symbol();
// false
console.log("===", eq)
console.log("==", sym == Symbol())
// false

// Symbol creates a new instance every time, 
// different from Ruby or other languages sharing the same literal Symbol instance

/*

Javascript primitive types:

boolean
string
number
null
undefined
symbol

*/