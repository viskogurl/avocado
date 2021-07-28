'use strict';

class Singleton {
  constructor() {
    this.arr = [];

    this.add = (element) => this.arr.push(element);
  }

  static sub = (num1, num2) => num1 - num2;

  sum = (num1, num2) => num1 + num2;

  list = () => this.arr;

}

const Instance = Object.freeze(new Singleton());

module.exports = { Singleton, Instance };