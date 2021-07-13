'use strict';

const { Singleton, Instance } = require('./singleton');
const snail = require('./utils/schnell');

const arr = [
  {
    id: 'asdfmm9834m',
    contents: 'hello world',
  },
  {
    id: 'kjehmr2td948ythrxt',
    contents: 'hello world',
  },
  {
    id: 'lpqo8erumxp9q34mymt9',
    contents: 'hello world',
  },
  {
    id: 'sakjmq3p98tumpoija',
    contents: 'hello world',
  },
  {
    id: 'sakliuhe89m7t8c9ygw',
    contents: 'hello world',
  },
];

(async () => {
  console.log(await snail.cache(arr));
  console.log(await snail.find('sakjmq3p98tumpoija'));
})();

// console.log(Singleton.sub(3, 4));

// new

// const klar = require('./utils/klar');
// const { tryify } = klar;
// const fs = require('fs/promises');

// const result = async () => {
//   const [data, error] = await tryify(fs.readFile('./app.js', {encoding: 'utf-8'}));
//   const arr = data.split('+');
//   console.log(`1${arr}1`);
// }

//result();
//console.log(klar)

// another test

// const word = 'johny';

// const obj = {
//   cache: {},

//   foo: (age) => age + 11,

//   set letter(l) {
//     this.cache[l] = l;
//   },

//   get letter() {
//     return this.cache;
//   }
// };

// Object.freeze(obj.cache);

// for (const char of word) {
//   obj.letter = char;
// }

// console.log(obj.letter, obj);

// obj.cache.name = 'frank';
// console.log(obj);
