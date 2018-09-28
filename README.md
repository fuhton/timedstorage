<p align="center">
  🕐 📁 timedstorage
  <br/>
  <br/>
  <a href="https://www.npmjs.org/package/timedstorage">
    <img src="https://img.shields.io/npm/v/timedstorage.svg?style=flat" alt="npm">
  </a>
  <a href="https://travis-ci.org/fuhton/timedstorage">
    <img src="https://travis-ci.org/fuhton/timedstorage.svg?branch=master" alt="travis">
  </a>
</p>

> Disclaimer: This is a very stable project with a very focused use-case. This project is actively used and maintained (as needed).

# timedstorage

> A tiny library for storing and expiring objects in localstorage.

- **Small** ~650b footprint
- **Convenient** Similar API to window.localStorage
- **Useful** Storage objects that expire in localstorage

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Examples](#examples)
- [API](#api)
- [License](#license)

## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com).

```sh
npm install --save timedstorage
```

Then with a module bundler like [webpack](https://webpack.js.org) or another bundling solution:

```js
import { deleteItem, getItem, setItem } from 'timedstorage';
```

The [UMD](https://github.com/umdjs/umd) build is also available. Pull the repo down locally and run `npm run build`.

You'll find the library on `window.timedstorage`.

### Usage

```js
import { deleteItem, getItem, setItem } from 'timedstorage';
// the time module gives helpful shortcuts for time in milliseconds
import * as time from 'timedstorage/time';

async function getUserData() {
  // Retrieve the item from localstorage
  let userData = getItem('user_key');

  if (!userData) {
    const response = await fetch('/user_endpoint');
    // Set the item with your key
    // `response` (the passed value to be saved) is expected to be an object
    userData = setItem('user_key', response, time.HOUR);
  }

  return userData;
}

function deleteUserData() {
  // Delete the item by key
  return deleteItem('user_key');
}
```

### Debug

Pop open the console and access your data directly and confirm it is correct.

```js
console.log(window.localstorage.getItem('KEY_NAME'));
```

### Examples

Interactive example on CodeSandbox.io - <https://codesandbox.io/s/5vpn5828n>

### API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

##### Table of Contents

- [deleteItem](#deleteitem)
- [getItem](#getitem)
- [setItem](#setitem)

#### deleteItem

Removes an object by key from localstorage

**Parameters**

- `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Key to remove

**Examples**

```javascript
return deleteItem('KEY');
```

Returns **[undefined](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

#### getItem

Get an item from localstorage by key. If it's expired or there is issue with any part of the
data object, delete the item and return null.

**Parameters**

- `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Key to remove

**Examples**

```javascript
return getItem('KEY');
```

Returns **(null | [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object))**

#### setItem

Set an object into localstorage by key. Requires value to be an object. Expected expiration to
be an int of milliseconds

**Parameters**

- `key` **Int** Length of time in milliseconds
- `value` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object value to save
- `expiration`

**Examples**

```javascript
return setItem('KEY', { data: 'wow' }, time.HOUR)
```

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**

### Reporting Issues

Found a problem? Want a new feature? Open a [clear and descriptive issue](../../issues/new).

### License

MIT © [Nicholas Smith](https://fuhton.com)
