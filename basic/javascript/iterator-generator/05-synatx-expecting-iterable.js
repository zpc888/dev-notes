for (const value of ['a', 'b', 'c']) {
    console.log('of: ', value);
}
for (const value in ['a', 'b', 'c']) {
    console.log('in: ', value);
}

console.log([...'abc']);

function* gen() {
    yield* ['a', 'b', 'c'];
}

console.log(gen().next());
const iterable = gen();
iterable.next();
console.log(iterable.next());
console.log(iterable.next());
console.log(iterable.next());

// javascript Set keeps original insertion order, which differs from java language,
// it only makes sure no duplication
[a, b, c] = new Set(["one", "two", "three", "four"]);
console.log(a);     // one
console.log(b);     // two
console.log(c);     // three
a = "xyz"           // if add const at line 21, this line will raise error:
// TypeError: Assignment to constant variable 
console.log(a);     // xyz