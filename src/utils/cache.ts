type CacheKey = string | number;

interface ICache {
  get(key: CacheKey): any;
  set(key: CacheKey, value: any): void;
  delete(key: CacheKey): void;
  clear(): void;
}

class CacheImpl implements ICache {
  private _cache: Record<CacheKey, any> = {};

  get(key: CacheKey): any {
    if (!this.contains(key)) {
      return undefined;
    }
    return this._cache[key];
  }
  set(key: CacheKey, value: any): void {
    this._cache[key] = value;
  }
  delete(key: CacheKey): void {
    delete this._cache[key];
  }
  clear(): void {
    this._cache = {};
  }
  contains(key: CacheKey): boolean {
    return this._cache.hasOwnProperty(key);
  }
}

const cache = new CacheImpl();

export default cache;
