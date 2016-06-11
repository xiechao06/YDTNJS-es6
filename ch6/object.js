var assert = require('assert');

var x = NaN, y = 0, z = -0;

assert(!(x === NaN));
assert(y === z);
assert(Object.is(x, NaN));
assert(Number.isNaN(x));
assert(!Object.is(y, z));

var target = {}, o = {};

Object.defineProperty(o, 'a', {
    value: 5, 
    enumerable: true,
    writeable: false,
    configurable: false,
});
Object.defineProperty(o, 'b', {
    value: 5, 
    enumerable: false,
    writeable: false,
    configurable: false,
});


assert.equal(o.a, 5);
o.a = 6;
assert.equal(o.a, 5);

Object.assign(target, o);
assert.equal(target.b, undefined);

var o1 = {
    foo() {
        return 'foo';
    }
};

var o2 = Object.assign(Object.create(o1), {
    bar() {
        return 'bar';
    }
});

assert.equal(o2.foo(), 'foo');




