function makeIterator(array) {
    let nextIndex = 0
    return {
        next: function() {
            return nextIndex < array.length ? {
                value: array[nextIndex++],
                done: false
            } : {
                done: true
            };
        }
    };
}

const it = makeIterator(['hello', 'world']);

console.log(it.next().value);       // hello
console.log(it.next().value);       // world
console.log(it.next());
