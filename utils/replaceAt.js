'use strict';

const replaceAt = (string, index, replacement) => {
  if (replacement === '') {
    // console.log(string.slice(0, index) + string.slice(index + 1))
    return string.slice(0, index) + string.slice(index + 1);
  }
  const result = string.slice(0, index) + replacement + string.slice(index + 1);
  // console.log(string.slice(0, index));
  // console.log(string.slice(index + 1));
  // console.log(replacement);
  return result;
}

module.exports = replaceAt;