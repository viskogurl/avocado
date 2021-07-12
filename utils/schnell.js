'use strict';

const Todo = require('../models/Todo');
const { v4: uuidv4 } = require('uuid');

const Schnell = (() => {
  const memory = [];

  const snailify = async (promise) => {
    try {
      const data = await promise;
      return [data, null];
    } catch (error) {
      return [null, error];
    }
  }

  return {
    clean: async () => {
      for (const item of memory) {
        memory.pop();
      }
    },

    delete: async() => {

    },

    all: async () => {
      return memory[0] ? [memory, null] : await snailify(Todo.find({}));;
    },

    cache: async (promise) => {
      const [data, error] = await snailify(promise);
      for (const item of data) {
        memory.push(item);
      }
      return memory;
    },

    find: async (query) => {
      const result = memory.find(({ id }) => id === query);
      return result ? [result, null] : await snailify(Todo.findOne({ id: query }).exec());
    },

    save: async (obj) => {
      const { color, contents } = obj;
      const [data, error] = await snailify(Todo.create({ todoID: uuidv4(), color, contents }));
      memory.push(obj);
      console.log(JSON.stringify(memory).length / 1000 / 1000);
      return [data, error];
    },
  };
})();

module.exports = Object.freeze(Schnell);
