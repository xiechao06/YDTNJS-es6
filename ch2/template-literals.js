import assert from 'assert';

var dollabillsyall = (strings, ...values) =>
strings.reduce((s, v, idx) => {
    let param = (idx > 0)? 
        (typeof values[idx - 1] == 'number'? 
             '$' + values[idx - 1].toFixed(2):
             values[idx - 1]
        ): 
        '';
    return s + param + v;
}, '');

assert.equal(((cost) => dollabillsyall`you spent ${cost} in total`)(10.324), 
             'you spent $10.32 in total');

console.log('DONE...');
