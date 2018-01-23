function getTime() {
  return new window.Date().getTime();
}

export function deleteItem(key) {
  return window.localStorage.removeItem(key);
}

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

export function setItem(key, value, expiration) {
  const data = Object.assign(
    value,
    { expiration: getTime() + expiration },
  );
  window.localStorage.setItem(key, JSON.stringify(data));
  return data;
}
