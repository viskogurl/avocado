'use strict';

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

    all: async (model) => {
      return memory[0] ? [memory, null] : await snailify(model.find({}));;
    },

    cache: async (promise) => {
      const [data, error] = await snailify(promise);
      for (const item of data) {
        memory.push(item);
      }
      return memory;
    },

    find: async (snail, model) => {
      const result = memory.find(({ id }) => id === query);
      return result ? [result, null] : await snailify(model.findOne({ id: query }).exec());
    },

    save: async (snail, model) => {
      const [data, error] = await snailify(model.create(snail));
      memory.push(snail);
      const size = JSON.stringify(memory).length / 1000 / 1000;
      return [data, error, size];
    },
  };
})();

module.exports = Object.freeze(Schnell);
