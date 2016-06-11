var assert = require('assert');
var _ = require('lodash');

var p1 = Promise.resolve(42),
    p2 = new Promise(function (resolve, reject) {
        setTimeout(() => resolve(43), 100);
    });
    p3 = new Promise(function (resolve, reject) {
        setTimeout(() => reject(44), 10);
    });


Promise.all([
    p1, p2, 44
]).then(function fullfiled(v) {
    assert(_.isEqual(v, [42, 43, 44]));
}).catch(function (reason) {
    console.error(reason); 
});

Promise.all([
    p1, p2, p3
]).catch(function (reason) {
    assert.equal(reason, 44);
}).catch(function (reason) {
    console.error(reason);
});

Promise.race([p1, p2, 44]).then(function (v) {
    assert.equal(v, 42);
}).catch(function (reason) {
    console.error(reason);
});

Promise.race([p2, p3]).catch(function (reason) {
    assert(reason, 45);
}).catch(function (reason) {
    console.error(reason);
});

// 3 types of immediatly Promise
Promise.resolve(42).then(v => console.log(v));
new Promise(function (resolve, reject) {
    resolve(42);
}).then(v => console.log(v));
Promise.resolve().then(function () {
    return 42;
}).then(v => console.log(v));

// resolve a promise will make a promise that take its resolution

Promise.resolve(new Promise(function (resolve, reject) {
    setTimeout(() => resolve(42), 1000);
})).then(function (v) {
    assert.equal(v, 42);
}).catch(e => console.error(e));

Promise.resolve(new Promise(function (resolve, reject) {
    setTimeout(() => reject('oops'), 1000);
})).catch(function (reason) {
    assert.equal(reason, 'oops');
}).catch(e => console.error(e));

// a mini co

function run(g) {
    var it = g();
    return Promise.resolve().then(function handleNext(value) {
        return (function handleResult(next) {
            if (next.done) {
                return next.value;
            }
            // note!! next.value may be a promise either
            return Promise.resolve(next.value).then(
                handleNext,
                function handleError(e) {
                    // a rejected promise is considered to be an exception, 
                    // it will fail it once, unless it is caught, see
                    // ch3/generaters.js
                    return Promise.resolve(it.throw(e))
                    .then(handleResult);
                }
            );
        })(it.next(value));
    });
}

run(function *() {
    return yield "boom!";
})
.then(
    function fulfilled(v) {
        console.log(v);
    },
    function rejected (reason){
        // Oops, something went wrong
    }
);

run(function *() {
    yield Promise.reject("oops!");
})
.then(
    function fulfilled(v) {
        console.log(v);
    },
    function rejected (reason){
        console.error(reason);
    }
);

run(function *() {
    try {
        return yield Promise.reject("oops!");
    } catch (e) {
        return "boom!";
    }
})
.then(
    function fulfilled(v) {
        console.log(v);
    },
    function rejected (reason){
        console.error(reason);
    }
);
