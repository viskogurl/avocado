'use strict';

const tryify = require('../tryify');
const fs = require('fs/promises');
const { spawn } = require('child_process');
const Path = require('path');

const install = async (parseData) => {
  parseData.map(async (mw) => {
    // console.log(Path.join(__dirname, `../../node_modules/${mw.module_name}`));
    const [ data, error ] = await tryify(fs.access(Path.join(__dirname, `../../node_modules/${mw.module_name}`)));
    if (error) { console.log(error, `\nModule not found. Please run "npm install ${mw.module_name}" :)`) };
  //   if (error) {
  //     const command = spawn(`npm i ${mw.module_name}`);

  //     command.stdout.on('data', data => {
  //       console.log(data);
  //     });

  //     command.stderr.on('data', data => {
  //       console.log(data);
  //     });

  //     command.on('error', (error) => {
  //       console.log(error);
  //     });

  //     command.on('close', code => {
  //       console.log(code);
  //     });
  //   }
  // });
})}


module.exports = install;