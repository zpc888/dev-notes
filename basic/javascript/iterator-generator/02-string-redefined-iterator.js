const someString = 'hi';
// need to construct a String object explicitly to avoid auto-boxing
// const someString = new String('hi');

someString[Symbol.iterator] = function() {
  return {
    next: function() {
        if (this._first) {
            this._first = false;
            this._second = true;
            return {
                value: 'one', 
                done: false
            }
        } else if (this._second) {
            this._second = false;
            return {
                value: 'two', 
                done: false
            }
        } else {
            return {
                done: true
            }
        }
    },
    _first: true,
    _second: false,
  };
};

const iterator = someString[Symbol.iterator]();
console.log(iterator + '');
// [object String Iterator]

console.log(iterator.next());
// {value: 'one', done: false}
console.log(iterator.next());
// {value: 'two', done: false}
console.log(iterator.next());
// {value: undefined, done: true}

console.log([...someString]);
// ["one", "two"]
console.log(someString);
// { [String: 'hi'] [Symbol(Symbol.iterator)]: [Function] }
console.log(someString.toString());
// hi
console.log(someString + '');
// hi
