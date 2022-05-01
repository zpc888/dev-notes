// this is the type for an object that new Hello() creates
declare interface Hello {
	foo(a: string): void;
}

// this is the type for Hello variable
declare interface HelloType {
	(text: string): void;
	new (...args: any[]): Hello;
}

declare var Hello: HelloType;

// can be used as a class
class Hi extends Hello {
	bar(b: string): void {
		this.foo(b);
	}
}

// and as a function
Hello('there');
