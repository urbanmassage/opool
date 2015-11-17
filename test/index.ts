import Pool = require('../index');
import {expect} from 'chai';

describe('Pool', () => {
  class Test {
    test = null;
    construct() {
      Test.reset(this);
    }
    static reset(obj: Test) {
      obj.test = null;
    }
  }

  it('accepts a class constructor', () => {
    const pool = new Pool(Test);

    const obj = pool.get();
    expect(obj).to.be.an.instanceof(Test);
  });

  it('returns unique objects', () => {
    const pool = new Pool(Test);

    const obj = pool.get();
    expect(obj).to.be.an.instanceof(Test);
    const obj2 = pool.get();
    expect(obj2).to.be.an.instanceof(Test);
    expect(obj2).to.not.equal(obj);
  });

  it('resets', () => {
    const pool = new Pool(Test);

    const obj = pool.get();
    expect(obj).to.have.property('test').that.equals(null);
    obj.test = 1;
    expect(obj).to.have.property('test').that.equals(1);
    pool.release(obj);
    expect(obj).to.have.property('test').that.equals(null);
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
