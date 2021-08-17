const someString = 'hi';
console.log(typeof someString[Symbol.iterator]);
// function

const iterator = someString[Symbol.iterator]();
console.log(iterator + '');
// [object String Iterator]

console.log(iterator.next());
// {value: 'h', done: false}
console.log(iterator.next());
// {value: 'i', done: false}
console.log(iterator.next());
// {value: undefined, done: true}

console.log([...someString]);
// ["h", "i"]
