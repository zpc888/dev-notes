function isNull(x) {
    if (x !== null) {
        throw new Error(`[${x}] is not null`)
    }
}
function isUndefined(x) {
    if (x !== undefined) {
        throw new Error(`[${x}] is not undefined`)
    }
}
function isFalsy(x) {
    if (x) {
        throw new Error(`[${x}] is not Falsy`)
    }
}
function isTruthy(x) {
    if (!x) {
        throw new Error(`[${x}] is not Truthy`)
    }
} 
function eq(x, y) {
    if (JSON.stringify(x) != JSON.stringify(y)) {
        throw new Error(`[${x}] != [${y}]`)
    }
} 
function toBe(x, y) {
    if (x !== y) {
        throw new Error(`[${x}] !== [${y}]`)
    }
} 
function isTypeOf(x, typename) {
    // object string number [typeof null => null] [type of undefined => undefined]
    if ( (typeof x) !== typename) {
        throw new Error(`type mismatch: [${typeof x}] !== [${typename}]`)
    }
}

module.exports = {isTypeOf, toBe, eq, isTruthy, isFalsy, isUndefined, isNull};
