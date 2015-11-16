class Pool<T extends {reset: Function}> {
  private pool: T[];
  private Func: new () => T;

  constructor(Func: new () => T) {
    this.pool = [];
    this.Func = Func;
  }

  get(): T {
    if (this.pool.length) {
      return this.pool.splice(0, 1)[0];
    }
    return new this.Func();
  }

  release(obj: T): void {
    if (obj.reset) obj.reset();
    this.pool.push(obj);
  }
}

export default Pool;
