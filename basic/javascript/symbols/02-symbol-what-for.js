const sym = Symbol();

const o = {
    name: "My key is a string type",
    [sym]: "My key is a symbol type",
};

console.log(o[sym]);
// My key is a symbol type

/*
Built-in symbols: 

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol

Symbol.asyncIterator			@@asyncIterator
Symbol.prototype.description			@@prototype.description
Symbol.hasInstance			@@hasInstance
Symbol.isConcatSpreadable			@@isConcatSpreadable
Symbol.iterator			@@iterator
Symbol.match			@@match
Symbol.matchAll			@@matchAll
Symbol.replace			@@replace
Symbol.search			@@search
Symbol.species			@@species
Symbol.split			@@split
Symbol.toPrimitive			@@toPrimitive
Symbol.toStringTag			@@toStringTag
Symbol.unscopables			@@unscopables

*/