// ---- convert to Boolean

const sym = Symbol();

const boolSym = Boolean(sym);
// true
console.log(boolSym);

const notSym = !sym;
// false
console.log(notSym);

// ----- convert to Number     =====> Cannot convert to Number
try {
    Number(sym);
    console.log("impossible here");
} catch (e) {
    console.log(e);
    // TypeError: Cannot convert a Symbol value to a number
    console.log(e instanceof TypeError);
}

try {
    const x = sym * 5;
    // TypeError: Cannot convert a Symbol value to a number
    console.log("impossible here", x);
} catch (e) {
    console.log(e);
    console.log(e instanceof TypeError);
}

// ---- convert to String  ===> working if explicitly, error if implicitly
const explicitlyToStr = String(sym);
console.log(explicitlyToStr)
// "Symbol()"

try {
    const implicitlyToStr = '' + sym;
    console.log("impossible here", implicitlyToStr);
} catch (e) {
    console.log(e);
    // TypeError: Cannot convert a Symbol value to a string
    console.log(e instanceof TypeError)
}

