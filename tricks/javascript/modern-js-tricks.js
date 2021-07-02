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