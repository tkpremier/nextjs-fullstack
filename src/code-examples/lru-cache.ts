/**
 * Least Recently Used (LRU) cache.
 * Key/Value storage with fixed max number of items.
 * Least recently used items are discarded once the limit is reached.
 * Reading and updating the values mark the items as recently used.
 */
export class LRUCache {
  /**
   * @param {number} capacity - The max number of items on the cache
   */
  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  private capacity: number;
  private cache: Map<number, number>;
  /**
   * Get the value associated with the key. Mark keys as recently used.
   * @param {number} key
   * @returns {number} value or if not found -1
   */
  get(key: number): number {
    if (!this.cache.has(key)) {
      return -1;
    }
    const value = this.cache.get(key);
    this.put(key, value);
    return value;
  }

  /**
   * Upsert key/value pair. Updates mark keys are recently used.
   * @param {number} key
   * @param {number} value
   * @returns {void}
   */
  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
  }
}

/**
 * /**
 * Least Recently Used (LRU) cache.
 * Key/Value storage with fixed max number of items.
 * Least recently used items are discarded once the limit is reached.
 * Reading and updating the values mark the items as recently used.

export class LRUCache extends Map {

  constructor(capacity: number) {
    super();
    this.capacity = capacity;
  }
  private capacity: number;

  get(key: number): number {
    if (!this.has(key)) {
      return -1;
    }
    const value = super.get(key);
    this.put(key, value);
    return value;
  }

  put(key: number, value: number): void {
    if (this.has(key)) {
      this.delete(key);
    }
    this.set(key, value);
    if (this.size > this.capacity) {
      const oldestKey = this.keys().next().value;
      this.delete(oldestKey);
    }
  }
}

 */
