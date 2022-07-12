
// REPL: read, evaluation, process, loop

// moduleA = { exports: {} };

// (function (module) {
//     const msg = 'secret message';

//     function getMsg() {
//         return msg;
//     }

//     module.exports = { getMsg };
// })(moduleA);

// // moduleA.exports.getMsg();
// console.log(moduleA.exports.getMsg());

const { getMsg: getMesgA } = require('./messageA');
const { getMsg: getMesgB } = require('./messageB');
getMesgA();
getMesgB();
console.log(getMesgB());