var assert = require('assert');

assert.equal("ab".repeat(3), "ababab");

assert('0123'.startsWith(0));
// starts at index 1
assert('0123'.startsWith(1, 1));
assert('0123'.endsWith(3));
// ends with a substring(0, 3)
assert('0123'.endsWith(2, 3));
assert('0123'.includes('12'));
// included from index 1
assert('0123'.includes('12', 1));
// not included from index 2
assert(!'0123'.includes('12', 2));
