var assert = require('assert');

var foo = function *() {
    yield 1;
    return 2;
};
var it = foo();
var next = it.next();
assert.equal(next.value, 1);
assert(!next.done);
next = it.next();
// what returned is set to done value
assert.equal(next.value, 2);
assert(next.done);

var foo = function *() {
    yield 1;
    return yield 2;
};

var it= foo();
var next = it.next();
assert.equal(next.value, 1);
assert(!next.done);
next = it.next();
assert.equal(next.value, 2);
assert(!next.done);
next = it.next(42);
assert.equal(next.value, 42);
assert(next.done);

function *foo() {
    yield 1;
    yield 2;
    yield 3;
    return 4;
};

var it = foo();

assert.equal(it.next().value, 1);
assert.equal(it.return(42).value, 42);
assert(it.next().done);

function *foo() {
    try {
        yield 1;
    } catch (err) {
        console.log(err);
    }

    yield 2;

    throw "Hello!";
}

var it = foo();

it.next();
try {
    // it is like insert "throw hi" just after yield 1
    assert.equal(it.throw("Hi!").value, 2);
    // throw in generator won't give next value
    assert.equal(it.next());
    console.log( "never gets here" );
} catch (err) {
    console.log(err); // Hello!
}

var f = function *() {
    yield 1;
    yield 2;
};
var it = f();
console.log(it.next());
try {
    console.log(it.throw('oops'));
} catch (e) {
    console.error(e);
}
console.log(it.next());

f = function *() {
    try {
        yield 1;
    } catch (e) {
        console.log(e);
    }
    yield 2;
};

var it = f();
console.log(it.next());
console.log(it.throw('oops'));
console.log(it.next());

console.log("\n\nDONE...");
