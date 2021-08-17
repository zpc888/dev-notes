class SimpleClass {
    constructor(data) {
        this.data = data;
    }

    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index < this.data.length) {
                    return {
                        value: this.data[index++],
                        done: false
                    };
                } else {
                    return {done: true};
                }
            }
        };
    }
}
const simple = new SimpleClass([1, 2, 3, 4, 5]);
for (const val of simple) {
    console.log(val);
}