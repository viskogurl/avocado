'use strict';

const tryify = require('../tryify');
const fs = require('fs/promises');

const gen = async (parseData) => {
  const mundle = [`const express = require('express');\n`, `const app = express();\n\n`];

  parseData.map((mw) => {

    if (mw.module_name !== 'express') {
      mundle.unshift(`const ${mw.name} = require('${mw.module_name}');\n`)
    }

    if (mw.method) {
      mundle.push(`app.use(${mw.name}.${mw.method}());\n`);
    } else {
      mundle.push(`app.use(${mw.name}());\n`);
    }

  })

  mundle.push(`\nmodule.exports = app;`);

  const [ data, error ] = await tryify(fs.writeFile('./middleware/mundle.js', mundle.join('')));
  if (error) { throw new Error('gen broke...') };
}

module.exports = gen;