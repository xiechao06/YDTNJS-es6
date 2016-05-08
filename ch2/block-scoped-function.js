import assert from 'assert';

if (true) {
    function foo() {
        console.log( "1" );
    }
}
else {
    function foo() {
        console.log( "2" );
    }
}

assert.throws(() => {
    foo
}, ReferenceError);

console.log('\n\n\nDONE...');