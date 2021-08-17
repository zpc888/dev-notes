const nonWellFormedIterable = {};
nonWellFormedIterable[Symbol.iterator] = () => 1;
// TypeError: Result of the Symbol.iterator method is not an object
[ ...nonWellFormedIterable ];