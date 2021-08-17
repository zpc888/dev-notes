const myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
console.log([...myIterable]);   [1, 2, 3]
for (let i of myIterable) {
    console.log(i);
}