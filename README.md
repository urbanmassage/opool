# OPool
[![CircleCI](https://img.shields.io/circleci/project/urbanmassage/opool.svg)](https://circleci.com/gh/urbanmassage/opool)
[![Codecov](https://img.shields.io/codecov/c/github/urbanmassage/opool.svg)](https://codecov.io/github/urbanmassage/opool)
[![npm](https://img.shields.io/npm/v/opool.svg)](http://npmjs.com/package/opool)
[![npm](https://img.shields.io/npm/l/opool.svg)](https://www.npmjs.com/package/opool)

Simple & super fast object pool for javascript

## Usage
To create a new pool you just need to provide a constructor function to the exported class.
You constructor function must have a prototype function called `reset`, which will be called upon release.

To get a new object, just call `pool.get()`. To add an object to the pool call `pool.release(obj);`.

### Typescript
```ts
import Pool from 'opool';

class MyClass {
  constructor() {
    MyClass.reset(this);
  }
  static reset(obj: MyClass) {
    obj.something = null;
  }
}

export default const pool = new Pool(MyClass);

// Then somewhere else...

const obj1 = pool.get(); // returns new MyClass
const obj2 = pool.get(); // returns new MyClass

pool.release(obj1); // reset() is automatically called here

const obj3 = pool.get(); // obj3 is now identical to obj1
```

### Javascript (ES5)
```js
var Pool = require('opool');

function MyClass() {
  MyClass.reset(this);
}
MyClass.reset = function(obj) {
  obj.something = null;
}

var pool = new Pool(MyClass);

// Then somewhere deep down...
function() {
  var obj = pool.get();
  obj.something = 'test';

  pool.release(obj); // You should stop using `obj` now
  // obj.reset is automatically called here
}();

function() {
  var obj2 = pool.get(); // This is actually the same as `obj` above.
  console.log(obj2.something); // > null
  obj2.something = 'test';

  pool.release(obj2);
}();
```
