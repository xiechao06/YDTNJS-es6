var assert = require('assert');

var arr = [1, 2, 3],
    it = arr[Symbol.iterator]();

(function (next) {
    assert.equal(next.value, 1);
    assert(!next.done);
})(it.next());
(function (next) {
    assert.equal(next.value, 2);
    assert(!next.done);
})(it.next());
(function (next) {
    assert.equal(next.value, 3);
    assert(!next.done);
})(it.next());
(function (next) {
    assert.equal(next.value, undefined);
    assert(next.done);
})(it.next());

var s = 'abc',
    it = s[Symbol.iterator]();

(function (next) {
    assert.equal(next.value, 'a');
    assert(!next.done);
})(it.next());
(function (next) {
    assert.equal(next.value, 'b');
    assert(!next.done);
})(it.next());
(function (next) {
    assert.equal(next.value, 'c');
    assert(!next.done);
})(it.next());
(function (next) {
    assert.equal(next.value, undefined);
    assert(next.done);
})(it.next());

var m = new Map(),
    it1 = m.entries(),
    it2 = m[Symbol.iterator]();
m.set("foo", 42);
(function (next) {
    assert.equal(next.value[0], 'foo');
    assert.equal(next.value[1], 42);
    assert(!next.done);
})(it1.next());
(function (next) {
    assert.equal(next.value, undefined);
    assert(next.done);
})(it1.next());
(function (next) {
    assert.equal(next.value[0], 'foo');
    assert.equal(next.value[1], 42);
    assert(!next.done);
})(it2.next());
(function (next) {
    assert.equal(next.value, undefined);
    assert(next.done);
})(it2.next());

var Fib = {
    [Symbol.iterator]() {
        var n1 = 1, n2 = 1;
        return {
            [Symbol.iterator]() { return this; },
            next() {
                var current = n1;
                n1 = n2;
                n2 = n1 + current;
                return {value: current, done: false};
            },
            return(v) {
                console.log(
                    "Fibonacci sequence abandoned."
                );
                return { value: v, done: true };
            }
        };
    }
};


for (let v of Fib) {
    console.log(v);
    if (v > 1000000000000) {
        break;
    }
}

var tasks = {
    [Symbol.iterator]() {
        // make a shallow copy
        var steps = this.steps.slice();
        return {
            [Symbol.iterator]() { return this; },
            next(...args) {
                if (steps.length > 0) {
                    return {
                        value: steps.shift()(...args),
                        done: false,
                    };
                } else {
                    return { done: true };
                }
            },
            return(v) {
                return { value: v, done: true };
            }
        } ;
    },
    steps: [],
};

tasks.steps.push(
    function step1(x){
        console.log( "step 1:", x );
        return x * 2;
    },
    function step2(x,y){
        console.log( "step 2:", x, y );
        return x + (y * 2);
    },
    function step3(x,y,z){
        console.log( "step 3:", x, y, z );
        return (x * y) + z;
    }
);

var it = tasks[Symbol.iterator]();

assert.equal(it.next(10).value, 20); 
assert.equal(it.next(20, 50).value, 120);
assert.equal(it.next(20, 50, 120).value, 1120);
assert(it.next().done);

it = [1, 2, 3][Symbol.iterator]();

var [x, y, z] = it;

assert.equal(x, 1);
assert.equal(y, 2);
assert.equal(z, 3);
