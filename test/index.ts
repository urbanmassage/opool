import Pool = require('../index');
import {expect} from 'chai';

describe('Pool', () => {
  class Test {
    test = null;
    construct() {
      this.reset();
    }
    reset() {
      this.test = null;
    }
  }

  it('accepts a class constructor', () => {
    const pool = new Pool(Test);

    const obj = pool.get();
    expect(obj).to.be.an.instanceof(Test);
  });

  it('accepts returns unique objects', () => {
    const pool = new Pool(Test);

    const obj = pool.get();
    expect(obj).to.be.an.instanceof(Test);
    const obj2 = pool.get();
    expect(obj2).to.be.an.instanceof(Test);
    expect(obj2).to.not.equal(obj);
  });

  it('recycles', () => {
    const pool = new Pool(Test);

    const obj = pool.get();
    const obj2 = pool.get();

    expect(obj2).not.to.equal(obj);

    pool.release(obj);
    const obj3 = pool.get();

    expect(obj3).to.equal(obj);

    pool.release(obj2);
    const obj4 = pool.get();

    expect(obj4).to.equal(obj2);
  });
});
