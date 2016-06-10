import assert from 'assert';

var s = 0;
for (let {x: a} of [{x: 1}, {x: 2}]) {
    s += a; 
}

assert.equal(s, 3);

console.log("\n\nDONE.......");
