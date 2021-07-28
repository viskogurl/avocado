'use strict';

// Welcome to the meat and bones of Toad-Do.
//
// Klar (German for clean or clear) is a simple utils library
// meant to replace repetitive async-await code by condensing
// the error handling into one place.
//
// In 20 lines of code, Klar gets rid of the need for try-catching
// asyncronous function by returning the Promise data or error in
// an Array.

const klar = {
  /**
   * Returns an Array containing the data or error from the awaited Promise.
   * @param {Promise} promise - Accepts a promise that will be awaited.
   * @returns {Promise} Returns an Array containing the data or error from the awaited Promise.
   */
  tryify: async (promise) => {
    try {
      const data = await promise;
      return [data, null];
    } catch (error) {
      console.log(error, `${promise}`);
      return [null, error];
    }
  },

  /**
   * Throws a new Error. In my code, I was unable to write 'return data ?? throw new Error()' so I put it in a function and called it instead.
   * @param {Error} error
   */
  throwify: (error) => {
    throw new Error(error);
  },

  replaceAt: (string, index, replacement, camelize) => {
    console.log(camelize);
    if (replacement === '') {
      return string.slice(0, index) + string.slice(index + 1);
    }
    return string.slice(0, index) + replacement + string.slice(index + 1);
  }
};

module.exports = klar;
