function* makeSimpleGenerator(array) {
    let nextIndex = 0;
    while (nextIndex < array.length) {
        yield array[nextIndex++];
    }
}

const hiWorld = makeSimpleGenerator(['hi', 'world']);
console.log(hiWorld.next().value);
console.log(hiWorld.next().value);
console.log(hiWorld.next());

function* idMaker() {
    let index = 0;
    while (true) {
        yield index ++;
    }
}
const it = idMaker();
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next());