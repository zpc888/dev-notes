//===================================================================
// 1. unions
function logIdentifier(id: string | number): void {
    console.log('id', id);
}

function logIdentifier2(id: string | undefined): void {
    if (id) {
        console.log('id', id);
    } else {
        console.error('no identifier found');
    }
}

enum Vehicles {
    bike,
    plane
}

interface Vehicle {
    speed: number;
    type:  Vehicles;
}

interface Bike extends Vehicle {
    ride: () => void;
    type: Vehicles.bike;
}

interface Plane extends Vehicle {
    fly: () => void;
    type: Vehicles.plane;
}

function takeVehicle(vehicle: Bike | Plane): void {
    if (vehicle.type === Vehicles.bike) {
        vehicle.ride();
    } else if (vehicle.type === Vehicles.plane) {
        vehicle.fly();
    } else {
        throw 'impossible: unsupported type';
    }
}

//===================================================================
// 2. generic type
function addItem<T>(item: T, array: T[]) {
    return [...array, item];
}
addItem('hello', []);
addItem(true, [true, true]);

function addItem2<T extends boolean | string>(item: T, array: T[]) {
    return [...array, item];
}
addItem2('hello', []);
addItem2(true, [true, true]);
// addItem2(new Date(), []);     // ERROR*** Date not extends boolean | string

//===================================================================
// 3. tuple
const array01: [string, number] = ['test', 12];
const array02 = ['test', 12] as const;
function foo(x: [startIndex: number, endIndex: number]) {
    // when using identifier for tuple, it must identifies all items, i.e. both startIndexand endIndex
}

//===================================================================
// 4. Reflection Types
// Omit, Partial, Readyonly, Writeonly?, Exclude, Extract, NonNullable and ReturnType
interface Teacher {
    name: string;
    email: string;
} 
type ReadonlyTeacher = Readonly<Teacher>;
const jose: ReadonlyTeacher = { name: 'jose', email: 'jose@email.com' };
// jose.name = 'max';      // ERROR*** since it is readonly

// Readonly internal
// type Readonly<T> = { readonly [P in keyof T]: T[P]; }

type Writeable<T> = { -readonly [P in keyof T]: T[P]; }
const jose2: Writeable<Teacher> = { name: 'jose', email: 'jose@email.com' };
jose2.name = 'jose2';      // PERFECT

//===================================================================
// 5. type assertion / protection
function isNumber(x: any): x is number {
    return typeof x === 'number';
}

function add1(value: string | number): typeof value {
    if (isNumber(value)) {
        return value + 1;
    } else { 
        return +value + 1;
    }
}

interface Hunter {
    hunt: () => void;
}

function isHunter(x: unknown): x is Hunter {
    return (x as Hunter).hunt !== undefined;
}

const performAction = (x: unknown) => {
    if (isHunter(x)) {
        x.hunt();
    }
}

const animal = {
    hunt: () => console.log('hunt')
}

performAction(animal);
