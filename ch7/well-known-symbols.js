var assert = require('assert');

function Foo(greeting) {
    this.greeting = greeting;
}

Foo.prototype[Symbol.toStringTag] = 'Foo';

assert.equal(new Foo('hello').toString(), '[object Foo]');

var b = new Foo('world');
b[Symbol.toStringTag] = 'cool';

assert.equal(String(b), '[object cool]');

Object.defineProperty(Foo, Symbol.hasInstance, {
    value: function (inst) {
        return inst.greeting == 'hello';
    }
});

assert(new Foo('hello') instanceof Foo);
assert(!(new Foo('world') instanceof Foo));

var arr = [1, 2, 3];
assert.equal(arr + 4, '1,2,34');

arr[Symbol.toPrimitive] = function (hint) {
    if (hint == 'default' || hint == 'number') {
        return this.reduce((s, i) => s + i, 0);
    }
};

assert.equal(arr, 6);
assert.equal(arr - 1, 5);
assert.equal(arr + 1, 7);
assert.equal(arr * 2, 12);
assert.equal(arr / 2, 3);


console.log("\n\nDONE...");
