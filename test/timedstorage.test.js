import {
  deleteItem,
  getItem,
  setItem,
} from '../src';

const localStorageMock = (() => {
  const store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      store[key] = null;
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const futureDate = () => {
  const currentDate = new window.Date();
  return currentDate.setHours(currentDate.getHours() + 2);
};

const pastDate = () => {
  const currentDate = new window.Date();
  return currentDate.setHours(currentDate.getHours() - 2);
};

let key;
let value;

describe('timedstorage', () => {
  describe('deleteItem()', () => {
    beforeEach(() => {
      key = 'key';
      value = 'value';
    });
    it('should delete an item if it exists', () => {
      window.localStorage.setItem(key, value);
      expect(window.localStorage.getItem(key)).toEqual(value);
      deleteItem(key);
      expect(window.localStorage.getItem(key)).toBe(null);
    });
    it('should not delete other objects', () => {
      const otherKey = 'otherKey';
      window.localStorage.setItem(key, value);
      window.localStorage.setItem(otherKey, value);
      expect(window.localStorage.getItem(key)).toEqual(value);
      expect(window.localStorage.getItem(otherKey)).toEqual(value);
      deleteItem(key);
      expect(window.localStorage.getItem(key)).toBe(null);
      expect(window.localStorage.getItem(otherKey)).not.toBe(null);
    });
  });
  describe('getItem()', () => {
    beforeEach(() => {
      key = 'key';
      value = 'value';
    });
    it('should return null by default', () => {
      expect(getItem(key)).toBe(null);
    });
    it('should return null if expiration is not defined', () => {
      window.localStorage.setItem(key, JSON.stringify({
        value,
      }));
      expect(getItem(key)).toBe(null);
    });
    it('should through error if value is not an object', () => {
      window.localStorage.setItem(key, value);
      expect(() => getItem(key)).toThrow();
    });
    it('should return null if the expiration is in past', () => {
      const expiration = pastDate();
      window.localStorage.setItem(key, JSON.stringify({
        value,
        expiration,
      }));
      expect(getItem(key)).toBe(null);
    });
    it('should return the value if the expiration is in future', () => {
      const expiration = futureDate();
      window.localStorage.setItem(key, JSON.stringify({
        value,
        expiration,
      }));
      expect(getItem(key).value).toBe(value);
    });
  });
  describe('setItem()', () => {
    beforeEach(() => {
      key = 'key';
      value = { value: 'value' };
    });
    it('should return the value', () => {
      const expiration = new window.Date().getTime() + futureDate();
      const result = setItem(key, value, expiration);
      expect(result).toMatchObject(value);
      expect(result).toHaveProperty('expiration');
    });
    it('should throw an error if the value is not an object', () => {
      const expiration = new window.Date().getTime() + futureDate();
      const result = () => setItem(key, 'value', expiration);
      expect(result).toThrow();
    });
  });
});
