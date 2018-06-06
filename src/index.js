function getTime() {
  return new window.Date().getTime();
}

/** Removes an object by key from localstorage
 *  @param {string} key Key to remove
 *  @returns {undefined}
 *  @example
 *  return deleteItem('KEY');
 */
export function deleteItem(key) {
  return window.localStorage.removeItem(key);
}

/** Get an item from localstorage by key. If it's expired or there is issue with any part of the
 * data object, delete the item and return null.
 *  @param {string} key Key to retrieve
 *  @returns {null|Object}
 *  @example
 *  return getItem('KEY');
 */
export function getItem(key) {
  const data = JSON.parse(window.localStorage.getItem(key));
  let result = null;
  if (data !== null && data.expiration !== undefined) {
    if (getTime() < data.expiration) {
      result = data;
    } else {
      deleteItem(key);
    }
  }
  return result;
}

/** Set an object into localstorage by key. Requires value to be an object. Expected expiration to
 * be an int of milliseconds
 *  @param {string} key Key to set
 *  @param {Object} value Object value to save
 *  @param {Int} key Length of time in milliseconds
 *  @returns {Object}
 *  @example
 *  return setItem('KEY', { data: 'wow' }, time.HOUR)
 */
export function setItem(key, value, expiration) {
  if (typeof value !== 'object') {
    throw Error('Value must be an object');
  }
  const data = Object.assign(
    value,
    { expiration: getTime() + expiration },
  );
  window.localStorage.setItem(key, JSON.stringify(data));
  return data;
}
