# string.prototype.split <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

An ES spec-compliant `String.prototype.split` shim/polyfill/replacement that works as far down as ES3. There's a number of bugs in various browser versions that this package addresses.

This package implements the [es-shim API](https://github.com/es-shims/api) interface. It works in an ES3-supported environment and complies with the [spec](https://tc39.es/ecma262/#sec-string.prototype.split).

Because `String.prototype.split` depends on a receiver (the “this” value), the main export takes the string to operate on as the first argument.

## Example

```js
var split = require('string.prototype.split');
var assert = require('assert');

assert.deepEqual(split('abc', ''), ['a', 'b', 'c']);
```

```js
var split = require('string.prototype.split');
var assert = require('assert');
/* when String#split is not present */
delete String.prototype.split;
var shimmedSplit = split.shim();

assert.equal(shimmedSplit, String.prototype.split);
assert.deepEqual(shimmedSplit('abc', ''), ['a', 'b', 'c']);
```

```js
var split = require('string.prototype.split');
var assert = require('assert');
/* when String#split is present */
var shimmedSplit = split.shim();

assert.equal(shimmedSplit, String.prototype.split);
assert.deepEqual(shimmedSplit('abc', ''), ['a', 'b', 'c']);
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/string.prototype.split
[npm-version-svg]: https://versionbadg.es/es-shims/String.prototype.split.svg
[deps-svg]: https://david-dm.org/es-shims/String.prototype.split.svg
[deps-url]: https://david-dm.org/es-shims/String.prototype.split
[dev-deps-svg]: https://david-dm.org/es-shims/String.prototype.split/dev-status.svg
[dev-deps-url]: https://david-dm.org/es-shims/String.prototype.split#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/string.prototype.split.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/string.prototype.split.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/string.prototype.split.svg
[downloads-url]: https://npm-stat.com/charts.html?package=string.prototype.split
[codecov-image]: https://codecov.io/gh/es-shims/String.prototype.split/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/es-shims/String.prototype.split/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/String.prototype.split
[actions-url]: https://github.com/es-shims/String.prototype.split/actions
