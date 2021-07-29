'use strict';

const { tryify, replaceAt } = require('../klar');
const fs = require('fs/promises');
const Path = require('path');

const parse = async (_app, opt) => {
  const mwArr = [];
  const path = opt || '../../config.json';

  const [ data, error ] = await tryify(fs.readFile(Path.join(__dirname, path), 'utf-8'));
  if (error) { throw new Error('parse broke...') };

  const { middleware: { ...rest } } = JSON.parse(data);

  for (const [ key, value ] of Object.entries(rest)) {

    let {
      noRequire,
      opts,
      priority,
      module: {
        name: module_name,
        name,
        methods
      }
    } = value;

    while (name.includes('-')) {
      const index = name.indexOf('-');
      const char = name[index + 1].toUpperCase();
      name = replaceAt(name, index, '');
      name = replaceAt(name, index, char);
    }

    mwArr.push({
      noRequire,
      opts,
      priority,
      module_name,
      name,
      methods
    });
  }

  mwArr.sort((m1, m2) => {
    return m1.priority - m2.priority;
  });

  for (const mw of mwArr) {
    const mod = !mw.noRequire ? require(`${mw.module_name}`) : mw.module_name;
    if (mw.methods) {
      // for (const method of mw.methods) {
      //   console.log(`${mod}.${method}()`)
      //   _app.use(Function(`_${mod}.${method}()`));
      // }
      continue
    } else if (mw.opts) {
      _app.use(mod(mw.opts));
    } else {
      _app.use(mod());
    }
  }

  return mwArr;
}

const config = async (_app) => {
  return await parse(_app);
}


module.exports = config;