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


/**
 * Returns an Array containing the data or error from the awaited Promise.
 * @param {Promise} promise - Accepts a promise that will be awaited.
 * @returns {Promise} Returns an Array containing the data or error from the awaited Promise.
 */
const tryify = async (promise) => {
    try {
        const data = await promise;
        return [data, null];
    } catch (error) {
        return [null, error];
    }
}

/**
 * Throws a new Error. In my code, I was unable to write 'return data ?? throw new Error()' so I put it in a function and called it instead.
 * @param {Error} error
 */
const throwify = (error) => {
    throw new Error(error);
}

/**
 * Functions that returns the appropriate response statement based on the data or error.
 * @param {response} res - The express response object.
 * @param {*} data - The data to be returned to the user if exists.
 * @param {*} error - The error to be returned to the user if exists.
 * @returns Returns the correct response to the controllers.
 */
const resify = (res, data, error) => {
    return data ? res.status(200).json({ data }) : res.status(404).json({ "errors": String(error) });
}

module.exports = { tryify, throwify, resify };