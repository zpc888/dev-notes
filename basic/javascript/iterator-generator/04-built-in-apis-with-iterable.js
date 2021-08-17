const map = new Map([ [1, 'a'], [2, 'b'], [3, 'c'] ]);
console.log( map.get(2));
// b
for (let kv of map) {
    console.log(kv);
}

const myObj = {};
const weak = new WeakMap([ [{}, 'a1'], [myObj, 'b1'], [{}, 'c1'] ]);
console.log( weak.get(myObj) );
// if uncomment, will throwing: TypeError: weak is not iterable
/*
for (let kv of weak) {
    console.log(kv);
}
*/

const mySet1 = new Set([1, 2, 3]);
console.log(mySet1.has(3));
console.log(mySet1.has('3'));
for (let v1 of mySet1) {
    console.log(v1);
}

const mySet2 = new Set('123');     // string's iterator is ['1', '2', '3']
console.log(mySet2.has('2'));
console.log(mySet2.has(2));
for (let v2 of mySet2) {
    console.log(v2);
}

const mySet3 = new WeakSet(
    function* () {
        yield {}
        yield myObj
        yield {}
    }()
);
console.log(mySet3.has(myObj));
// will throw: TypeError: mySet3 is not iterable if uncommenting below
/*
for (let v3 of mySet3) {
    console.log(v3);
}
*/
