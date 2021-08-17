console.log("1. used for hidden properties")

const ROLE = Symbol()
const createAdmin = (name) => ({
    name,
    [ROLE]: 'admin'
    //[ROLE]: {value: "admin", enumerable: false}
})

const isAdmin = ({[ROLE]: role}) => role === 'admin'
const bob = createAdmin('bob');
console.log(bob);
// {name: "bob", [Symbol()]: 'admin'}
console.log(isAdmin(bob));
// true
console.log(isAdmin('xyz'));
// false

console.log()
console.log("2. used for Meta-data")
console.log("Symbol.iterator")
console.log("@@iterator")
console.log("Option for libraries")
console.log("Well-known symbols")
