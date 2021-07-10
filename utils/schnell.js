'use strict';

const { tryify } = require('./klar');

const Schnell = (() => {
  const cache = {};

  const retrieve = async (query) => {
    return cache[query] ? cache[query] : await tryify()
  }

  return {
    set save(item) {
      cache[item] = item;
    },

    get mem() {
      return cache;
    },

    clean: async () => {
      for (const item in cache) {
        delete cache[item];
      }
    },

    save: async (key, value) => {
      cache[key] = value;
      return `{ ${key}: ${value} }`;
    },

    cache: async (collectionName, collection) => {
      for (const item of collection) {
        cache[collectionName][item.id] = item;
      }
    }
  };
})();

module.exports = Object.freeze(Schnell);
