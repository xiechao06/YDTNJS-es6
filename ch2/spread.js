import assert from 'assert';

var a = [2, 3, 4];
var b = [1, ...a, 5];

assert.deepEqual(b, [1, 2, 3, 4, 5]);


function foo(...args) {
    return args;
}

assert.deepEqual(foo(1, 2, 3), [1, 2, 3]);

console.log('\n\n\nDONE...');