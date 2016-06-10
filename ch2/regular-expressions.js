import assert from 'assert';


var s = '\u{1D11E}-';
assert.equal(s.length, 3);
// note!!! /\u{1D11E}/ is not allowed, refer to https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions
var pattern = RegExp('\u{1D11E}'); 
assert(pattern.test(s));

pattern = /^.-/;
// regular expressions could only match based on BMP characters in default, 
// which means that those extended characters were treated as two separate 
// characters for matching purposes
assert(!pattern.test(s));

// the u flag tells a regular expression to process a string with the interpretation of Unicode (UTF-16) characters
pattern = /^.-/u;
assert(pattern.test(s));

pattern = /foo/y;
// sticky flag will make pattern matches begin from lastIndex
assert(!pattern.test('++foo++'));

pattern.lastIndex = 2;
assert(pattern.test('++foo++'));
assert(pattern.lastIndex == 5);

// any failed match, will make lastIndex back to 0
assert(!pattern.test('++foo++'));
assert(pattern.lastIndex == 0);


console.log("\n\nDONE.......");
