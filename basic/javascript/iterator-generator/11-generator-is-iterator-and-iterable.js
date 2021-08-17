const aGeneratorObject = function* () {
    yield 1;
    yield 20;
    yield 3;
}();

console.log(typeof aGeneratorObject.next);
// "function", because it has a next method, so it's an iterator

console.log(typeof aGeneratorObject[Symbol.iterator]);
// "function", because it has an @@iterator method, so it's an iterable

console.log(aGeneratorObject[Symbol.iterator]() === aGeneratorObject);
// true, because its @@iterator method returns itself (an iterator), so it's an well-formed iterable

console.log(...aGeneratorObject);  
// [1, 2, 3]

console.log( Symbol.iterator in aGeneratorObject)
// true, because @@iterator method is a property of aGeneratorObject