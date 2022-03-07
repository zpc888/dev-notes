const custom = {
  x: 42,
  getX: function() {
    return this.x;
  },
  getY: function(y) {
	  return y;
  },
  add: (a, b) => a + b
};

const unboundGetX = custom.getX;
console.log(custom.getX());	// expected output: 42

console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined
// Because unboundGetX was defined at global level, this is undefined

const boundGetX = unboundGetX.bind(custom);
console.log(boundGetX());
// expected output: 42
//
//
const unboundGetY = custom.getY;
const boundGetY = custom.getY.bind(null);
const boundGet3 = custom.getY.bind(null, 3);
console.log( unboundGetY(100) );
console.log( boundGetY(200) );
console.log( boundGet3() );

const add8 = custom.add.bind(null, 8);		
// first argument is for owner, i.e. this; 2nd, 3rd, ..., n is for initial 1st, 2nd, ..., n-1
//
console.log( add8(9) );
console.log( add8(12) );
