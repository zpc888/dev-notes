const assert = require('./assert')

// 1. Conditionally add properties to objects
const personFactory = condition => {
    return {
        id: 1,
        name: 'George Zhou',
        ...(condition && {age : 18})
    }
}
const expect = {
    id: 1,
    name: 'George Zhou'
}
assert.eq(expect, personFactory(false))
expect.age = 18
assert.eq(expect, personFactory(true))

// 2. check if a property exists in an object
assert.toBe(true, 'name' in expect)
assert.toBe(true, 'age' in expect)
assert.toBe(true, 'id' in expect)
assert.toBe(false, 'salary' in expect)

// 3. dynamic property names in objects
const dynamic = 'salary'
const gz = {
    ... expect,
    [dynamic]: 1000000
}
assert.eq({id:1, name: 'George Zhou', age: 18, salary: 1000000}, gz)
assert.eq(1000000, gz[dynamic])

// 4. object destructuring with a dynamic key
const { name: gzName, [dynamic]: salary } = gz
assert.eq('George Zhou', gzName)
assert.eq(1000000, salary)

// 5. nullish coalescing ?? operator
// Working on node v14.15.5, not node v10.16.3
const result = null ?? 'hello'
assert.eq('hello', result)
assert.eq('not null', 'not null' ?? 'hello')
assert.eq(false, false ?? 'hello')
assert.eq(0, 0 ?? 'hello')

// 6. optional chaining (?.)
assert.isUndefined(gz.address?.postalcode)
assert.toBe('George Zhou', gz.name)
// 6.1. chaining functions
assert.isUndefined(gz.notExistedMethod?.())

// 7. Boolean conversion using the !! operator
assert.toBe(true, !!'Hello world!')
assert.toBe(false, !!'')

// 8. string and integer conversion
assert.isTypeOf('number', typeof (0 + '123'))
assert.isTypeOf('string', typeof (123 + ''))

// 9. check falsy values in an array
const array = [null, false, '', 'Hello', undefined, 0]
assert.eq(['Hello'], array.filter(Boolean))     // Boolean is to test truthy values
// same as array.filter( v => Boolean(v) )
assert.isTruthy(array.some(Boolean))
assert.isFalsy(array.every(Boolean))

// 10. flattening arrays of arrays
var myArray = [ [{id: 1}], [{id: 2}], [{id: 3}] ]
assert.eq([{id: 1}, {id: 2}, {id: 3}], myArray.flat())
myArray = [ [[{id: 1}], [{id: 2}]], [{id: 3}] ]
assert.eq([{id: 1}, {id: 2}, {id: 3}], myArray.flat().flat())

// 11. arrow function => array
const sum = (a, b) => a + b;
assert.toBe(12, sum(5, 7));

// 12. default parameters
const sumWithDefault = (a, b=7) => a + b;
assert.toBe(12, sumWithDefault(5));

// 13. IIFE function (Immediately Invoked Function Expression)
const iife = (function(a, b) {
    return a + b;
})(5, 7);
assert.toBe(12, iife);

// 14. Spread operator ... (array, object and string)
const num = [1, 3, 5, 7, 9]
assert.eq([1, 3, 5, 7, 9, 11], [...num, 11])

// 15. isNaN() method
assert.eq(false, isNaN(12));
assert.eq(false, isNaN('12'));
assert.eq(true, isNaN('12as'));
assert.eq(false, isNaN(''));     // WHY???

// 16. Primitive values - total 7 types
// Number
// String
// Boolean
// Undefined
// Null
// Symbol
// BigInt
assert.eq('number', typeof(5))
assert.eq('string', typeof('Hello'))
assert.eq('boolean', typeof(true))
assert.eq('undefined', typeof(undefined))
assert.eq('object', typeof(null))       // WHY???

// 17. Reference or Objects and functions
assert.eq('object', typeof({name: 'Faysal'}))
assert.eq('object', typeof([1, 2, 5]))
assert.eq('function', typeof(() => 8 + 8))
assert.eq('object', typeof(/exp/))

// 18. Equal(==) vs Triple Equal(===)
assert.eq(true,  5 == "5")
assert.eq(false, 5 === "5")
assert.eq(true,  1 == true)
assert.eq(false, 1 === true)
assert.eq(true,  "1" == true)
assert.eq(false, "1" === true)
assert.eq(true,  0 == false)
assert.eq(false, 0 === false)

// 19. Ternary Operator
const largest = (a, b) => a > b ? a : b
assert.toBe(8, largest(8, 5))

// 20. Destructuring: Array and Object
const [n1, n2] = [5, 8]
assert.toBe(5, n1)
assert.toBe(8, n2)
const [, n3] = [5, 8]
assert.toBe(8, n3)
{
    const [n5, ...n6] = [5, 8, 9]
    assert.toBe(5, n5)
    assert.eq([8, 9], n6)
}
{
    const [n5, n6] = [5, 8, 9]
    assert.toBe(5, n5)
    assert.toBe(8, n6)
}
{
    const {fname, lname} = {fname: 'George', lname: 'Zhou'}
    assert.eq('George', fname)
    assert.eq('Zhou', lname)
}
{
    const {lname, fname} = {fname: 'George', lname: 'Zhou'}
    assert.eq('George', fname)
    assert.eq('Zhou', lname)
}
{
    const {lname} = {fname: 'George', lname: 'Zhou'}
    assert.eq('Zhou', lname)
}
{
    const {fname, ...lname} = {fname: 'George', lname: 'Zhou', age: 28}
    assert.eq('George', fname)
    assert.eq({lname: 'Zhou', age: 28}, lname)
}
