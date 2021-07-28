'use strict';

const { tryify } = require('../klar');
const replaceAt = require('../replaceAt');
const fs = require('fs/promises');
const Path = require('path');
const opt = process.env.path;

const parse = async (opt) => {
  const mwArr = [];
  const path = opt || '../../config.json';

  const [ data, error ] = await tryify(fs.readFile(Path.join(__dirname, path), 'utf-8'));
  if (error) { throw new Error('parse broke...') };

  const { middleware: { ...rest } } = JSON.parse(data);

  for (const [ key, value ] of Object.entries(rest)) {

    let {
      enabled,
      priority,
      module: {
        name: module_name,
        name,
        method
      }
    } = value;

    while (name.includes('-')) {
      const index = name.indexOf('-');
      const char = name[index + 1].toUpperCase();
      name = replaceAt(name, index, '');
      name = replaceAt(name, index, char);
    }

    mwArr.push({
      enabled,
      priority,
      module_name,
      name,
      method
    });
  }

  mwArr.sort((m1, m2) => {
    return m1.priority - m2.priority;
  });

  return mwArr;
}

module.exports = parse;