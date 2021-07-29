'use strict';

const { tryify } = require('../klar');
const parse = require('./parse');
const install = require('./install');
const gen = require('./gen');

const mundler = async () => {
  const [ parseData, parseError ] = await tryify(parse());
  parseError ? console.log('parse failed :(') : console.log('parse all good!');
  const [ installData, installError ] = await tryify(install(parseData));
  installError ? console.log('install failed :(') : console.log('install all good!');
  const [ genData, genError ] = await tryify(gen(parseData));
  genError ? console.log('gen failed :(') : console.log('gen all good!');
}

(async () => {
  await mundler();
})();