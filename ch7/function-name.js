var assert = require('assert');

assert.equal((function () {}).name, '');
assert.equal((function *() {}).name, '');

class Awesome {
    constructor() {}
    funny() {}
};
assert.equal(new Awesome().constructor.name, 'Awesome');
assert.equal(new Awesome().funny.name, 'funny');
assert.equal(Awesome.name, 'Awesome');


var o = {
    foo() {},
    *bar() {},
    baz: () => {},
    bam: function () {},
    ["b" + "iz"]:
        function() {},
};

assert.equal(o.foo.name, 'foo');
assert.equal(o.bar.name, 'bar');
assert.equal(o.baz.name, 'baz');
assert.equal(o.bam.name, 'bam');
assert.equal(o.biz.name, 'biz');

assert.equal(o.foo.bind(o).name, 'bound foo');

class Parent {
    constructor() {
        if (new.target === Parent) {
            this.name = "Parent";
        }
        else {
            this.name = "Child";
        }
    }
}

class Child extends Parent {}

var a = new Parent();
var b = new Child();

assert.equal(a.name, "Parent");
assert.equal(b.name, "Child");



console.log("\n\nDONE...");
