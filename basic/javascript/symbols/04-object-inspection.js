console.log("\n\n============================================")
console.log("Object inspection: symbols vs enumerable");
console.log()

const c = Symbol();
const d = Symbol.for("d");
const o = {
    a: 1,
    [c]: 10
}

Object.defineProperty(o, "b", {value: 2, enumerable: false});
Object.defineProperty(o, d, {value: 20, enumerable: false});

console.log("1. -------- access via property name or symbol is ok")
console.log(o.a);
// 1
console.log(o.b);
// 2
console.log(o[c]);
// 10
console.log(o[d]);
// 20

console.log();
console.log("2. -------- hasOwnProperty name or symbol is ok")
console.log(o.hasOwnProperty('a'));
// true
console.log(o.hasOwnProperty('b'));
// true
console.log(o.hasOwnProperty(c));
// true
console.log(o.hasOwnProperty(d));
// true

console.log();
console.log("3. -------- keys and entries are not ok: symbols and non-enumerable properties not shown")
console.log(Object.keys(o));
// ["a"]
console.log(Object.entries(o));
// [["a", 1]]

console.log();
console.log("4. -------- getOwnPropertyDescriptors shows, but cannot get each property and symbols")
console.log(Object.getOwnPropertyDescriptors(o));
/*
{ a:
   { value: 1, writable: true, enumerable: true, configurable: true },
  b:
   { value: 2,
     writable: false,
     enumerable: false,
     configurable: false },
  [Symbol()]:
   { value: 10,
     writable: true,
     enumerable: true,
     configurable: true },
  [Symbol(d)]:
   { value: 20,
     writable: false,
     enumerable: false,
     configurable: false } }
*/

console.log();
console.log("5. -------- getOwnPropertyNames/Symbols work")
console.log(Object.getOwnPropertyNames(o));
// ["a", "b"]
console.log(Object.getOwnPropertySymbols(o));
// [Symbol(), Symbol(d)]

console.log();
console.log("6. -------- assign and spread only works for enumerable properties/symbols")
console.log(Object.assign({}, o));
// {a: 1, Symbol(): 10}
console.log( {...o} );
// {a: 1, Symbol(): 10}

console.log();
console.log("7. -------- JSON.stringify only works name properties, not symbols, and only for enumerable")
console.log(JSON.stringify(o));
// {"a": 1}

console.log();
console.log("8. -------- Reflect.ownKeys shows both name and symbol properties, enumerable or non-enumerable")
console.log(Reflect.ownKeys(o));
// ["a", "b", Symbol(), Symbol(d)]
