import assert from 'assert';

var funcs = [];

for (let i = 0; i < 5; i++) {
    funcs.push(
        function () {
            return i;
        }
    );
}

assert.equal(funcs[3](), 3);

console.log('\n\n\nDONE...');