# Typescript: Type vs Interface

## Common Part

Both **Interface** and **Type** can be used to describe the properties of an object or a function signature. But the syntax differs. Interface syntax is like Class declaration and Type is like object declaration. 

```typescript
// describe the properties of an object
interface IUser {
    id: number;
    firstName: string;
    lastName: string;
}
const user: IUser = {
    id: 1, 
    firstName: 'Saif',
    lastName: 'Adnan'
}

type TUser = {
    id: number;
    firstName: string;
    lastName: string;
}
const user2: TUser = {
    id: 1, 
    firstName: 'Saif',
    lastName: 'Adnan'
}

// describe a function signature
interface IGetUserFullName {
    (user: IUser): string;
}
const getUserFullName1: IGetUserFullName = (user) => `${user.firstName} ${user.lastName}`;

type TGetUserFullName = (user: IUser): string;
const getUserFullName2: TGetUserFullName = (user) => `${user.firstName} ${user.lastName}`;
```

## Starting Typescript 2.2, Interface can extends a Type

```typescript
type TAddress = {
    city: string;
    country: string;
}
interface IUser extends TAddress {}

const user: IUser = {
    city: 'New York',
    country: 'USA'
}
```

## Difference - Features Type has that Interface does not

1. **Primitive Alias** using Type can be used in other interfaces or types for more meaningful and unstandable code.

```typescript
type UniqueId = string;
interface User {
    id: UniqueId;
}
```

if alias is not for a primitive value, but for an array, then we can use either type or interface, e.g.

```typescript
type TRoles = string[];
interface iRoles {
    [key: number]: string;
}
```

2. **Tuples** allow us to use this data type that includes two sets of values of different data types

```typescript
type Employee = [number, string]
const elon: Employee = [1, 'Elon']
```

3. **Intersection** allows us to combine multiple types into a single one type - using & keyword:

```typescript
type Name = {
    name: string;
}
type Age = {
    age: number;
}
type Person = Name & Age;
const elon: Person = {
    name: 'Elon',
    age: 22
}
```

4.  **Union** allows us to create a new type that can have a value of one or a few more types - using | keyword:

```typescript
type A = {
    name: string;
}
type B = {
    age: number;
}
type C = A | B;

const andrew: C = {
    name: 'Elon'
}
const justin: C = {
    age: 25
}
```

5.  **Auto Merge** works only with **Interfaces**. If type get declared multiple times, then typescript compiler throws an error.

```typescript
type A = {
    name: string;
}
type A = {
    age: number;
}

// Typescript compiler throws errors ===> Duplicate identifier 'A'

```

Typescript merges the two declaration for **Interface**

```typescript
interface B {
    name: string;
}
interface B {
    age: number;
}

const bob: B = {
    name: 'Bob',
    age: 40
}

```