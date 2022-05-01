type User = {
    name: string;
    age?: number;   // optional property (`age` can be undefined)
    // (): number;     // type is callable (returns number)
    // new (name: string): User;   // can be called as a constructor
    readonly id: string; // cannot be modified after creation
    signIn: (retryCount: number) => void; // function
    customConstant: 'constant';     // value can only be 'constant'
    get fullName(): string;
    set username(name: string);
}

const david: User = { 
    name: 'David',
    age: 56,
    // constructor(name: string) {
    // },
    // (): 16,
    id: '12345',
    signIn: (retryCount: number) => console.log(`retry to sign at ${retryCount} times`),
    customConstant: 'constant',
    fullName: 'abc',
    set username(newName: string) {
        this.name = newName;
    }
}

console.log(david.fullName);

// david.id = '38833';      // throw error TS2540: Cannot assign to 'id' because it is a read-only property
console.log(david);