var assert = require('assert');
var _ = require('lodash');


class MyCoolArray extends Array {
    sum() {
        return this.reduce((s, v, idx) => s + v, 0);
    }
}

var arr = MyCoolArray.of(1, 2, 3);
assert(arr instanceof MyCoolArray);
assert(arr.sum(), 6);

assert.equal([1, 2, 3].find(i => i == 2), 2);
assert.equal([1, 2, 3].findIndex(i => i == 2), 1);

assert(_.isEqual([...[1, 2, 3].keys()], [0, 1, 2]));
assert(_.isEqual([...[1, 2, 3].entries()], [[0, 1], [1, 2], [2, 3]]));
