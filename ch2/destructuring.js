import assert from 'assert';
import _ from 'lodash';

install();

//Object Property Assignment
var {x, y, z} = {
    x: 1,
    y: 2,
    z: 3
};
assert(x == 1 && y == 2 && z == 3);
var {x: bam, y: baz, z: bap} = {
    x: 1,
    y: 2,
    z: 3
};
assert(bam == 1 && baz == 2 && bap == 3);

// swap
var x = 10, y = 20;
[y, x] = [x, y];
assert(y == 10 && x == 20);

// Anything that's a valid assignment expression is allowed
var o1 = {
    a: 1,
    b: 2,
    c: 3
};
var a2 = [];
({
    a: a2[0],
    b: a2[1],
    c: a2[2]
} = o1);
assert(_.isEqual(a2, [1, 2, 3]));


var o = {};
({
    a: o.a,
    b: o.b,
    c: o.c
} = {
        a: 1,
        b: 2,
        c: 3
    });
assert(o.a == 1 && o.b == 2 && o.c == 3);

// computed property expressions in the destructuring
var which = 'x';
var o = {};
({ [which]: o[which] } = {
    a: 1,
    x: 2
});
assert(o.x == 2);

// repeated assignment
var {a: x, a: y} = { a: 1 };
assert(x == y == 1);

// destructuring take the value of right hand
var o = {
    a: 1,
    b: 2,
    c: 3
}, a, b, c, p;

p = { a, b, c } = o;
assert(p === o);

// destructuring take the value of right hand, so the assignments could be chained
var o = {
    a: 1,
    b: 2,
    c: 3
}, p = [4, 5, 6], a, b, c, x, y, z;

({ a } = { b, c } = o);
([x, y] = [z] = p);

assert(a == 1 && b == 2 && c == 3 && z == 4 && x == 4 && y == 5);

// skip destructuring
var [, b] = [1, 2, 3];
var {x, z} = {
    x: 1,
    y: 2
};

assert(b == 2, z == undefined);


// ...a gather data
var a = [2, 3, 4];
var [b, ...c] = a;
assert(_.isEqual(c, [3, 4]));

// default value assignment
var {
    x = 5,
    y = 6  // no y available
} = { x: 7 };
assert(x == 7 && y == 6);
var [a = 1, b = 2, c = 3] = [5, 7];
assert(a == 5 && b == 7 && c == 3);
var {
    x,
    y,
    z,
    w: WW = 20
} = {
        x: 1,
        y: 2,
        z: 3
    };

assert(x == 1 && y == 2 && z == 3 && WW == 20);

// nested destructuring
var [a, [b]] = [1, [2]];
assert(a == 1 && b == 2);

x = y = undefined;
var {
    x: {
        y: {
            z
        }
    }
} = {
        x: {
            y: {
                z: 6
            }
        }
    };
assert(x == undefined && x == undefined && z == 6);

// destructuring parameters
{
    function f([x, y]) {
        return x * y;
    }
    assert(f([3, 2]) == 6);
    assert(isNaN(f([3])));
    assert(isNaN(f([])));
}

{
    function f({x, y}) {
        return x * y;
    }

    assert(f({ x: 1, y: 2 }) == 2);
    assert(isNaN(f({ x: 1 })));
}

{
    function f({x = 10} = {}, {y} = { y: 10 }) {
        return [x, y];
    }
    assert(_.isEqual(f(), [10, 10]));
    assert(_.isEqual(f(undefined, undefined), [10, 10]));
    assert(_.isEqual(f({}, undefined), [10, 10]));
    assert(_.isEqual(f({}, {}), [10, undefined]));
    assert(_.isEqual(f(undefined, {}), [10, undefined]));
    assert(_.isEqual(f({ x: 3 }, { y: 2 }), [3, 2]));
}

// handle nested defaults
{
    var defaults = {
        options: {
            remove: true,
            enable: false,
        },
        log: {
            warn: true,
            error: true
        }
    };
    // old style
    function init1(config) {
        config = config || {};
        config.options = config.options || {};
        config.options.remove =
            (config.options.remove == undefined) ? defaults.options.remove : config.options.remove;
        // more ceremonies
    }

    // assign to config object directly
    function init2(config) {
        config.options = config.options || {};
        config.log = config.log || {};
        ({
            options: {
                remove: config.options.remove = defaults.options.remove,
                enable: config.options.enable = defaults.options.enable
            },
            log: {
                warn: config.log.warn = defaults.log.warn,
                error: config.log.error = defaults.log.error
            }
        } = config);
        return config;
    }

    assert(_.isEqual(init2({}), defaults));
    assert(_.isEqual(init2({
        options: {
            remove: false
        }
    }), {
            options: {
                remove: false,
                enable: false
            },
            log: {
                warn: true,
                error: true
            }
        }));

    // descruturing and create new config object
    function init3(config) {
        let {
            options: {
                remove = defaults.options.remove,
                enable = defaults.options.enable,
            } = {},
            log: {
                warn = defaults.log.warn,
                error = defaults.log.error
            } = {}
        } = config;
        return {
            options: {
                remove,
                enable
            },
            log: {
                warn,
                error
            }
        };
    }

    assert(_.isEqual(init3({}), defaults));
    assert(_.isEqual(init3({
        options: {
            remove: false
        }
    }), {
            options: {
                remove: false,
                enable: false
            },
            log: {
                warn: true,
                error: true
            }
        }));
}

// shorten object
{
    var x = 1, y = 2;
    assert(_.isEqual({x, y}, {
        x: x,
        y: y
    }));
}

console.log("\n\nDONE.......");
