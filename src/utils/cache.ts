interface ICache {
  get(key: string): any;
  set(key: string, value: any): void;
  delete(key: string): void;
  clear(): void;
}

class CacheImpl implements ICache {
  private _cache: Record<string, unknown> = {};

  get(key: string) {
    if (!this.contains(key)) {
      throw new Error("The provided key is not stored in the cache.")
    }
    return this._cache[key];
  }
  set(key: string, value: any): void {
    this._cache[key] = value;
  }
  delete(key: string): void {
    delete this._cache[key];
  }
  clear(): void {
    this._cache = {};
  }
  contains(key: string): boolean {
    return this._cache.hasOwnProperty(key);
  }
}

const cache = new CacheImpl();

export default cache;
