import assert from 'assert';

var prefix = 'user_';

var o = {
    [prefix + 'age']() {
        return 32;
    },
    [prefix + 'name']() {
        return 'foo name';
    }
};

assert.equal(o.user_age(), 32);
assert.equal(o.user_name(), 'foo name');

var o = {
    __id: 10, 
    get id() {
        return this.__id;
    },
    set id(v) {
        this.__id = v;
    }
};
o.id = 100;
assert.equal(o.id, 100);


var o1 = {
    foo() {
        return "o1";
    }
};

var o2 = {
    foo() {
        return super.foo() + "o2";
    }
};

Object.setPrototypeOf(o2, o1);

assert.equal(o2.foo(), 'o1o2');

console.log("DONE....");
