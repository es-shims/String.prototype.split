'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	if (!String.prototype.split) {
		return implementation;
	}

	if (
		'ab'.split(/(?:ab)*/).length !== 2
		|| '.'.split(/(.?)(.?)/).length !== 4
		|| 'tesst'.split(/(s)*/)[1] === 't'
		|| 'test'.split(/(?:)/, -1).length !== 4
		|| ''.split(/.?/).length
		|| '.'.split(/()()/).length > 1
	) {
		// eslint-disable-next-line global-require
		return require('./implementation-broken-captures');
	}

	/*
	 * [bugfix, chrome, node 0.8]
	 * If separator is undefined, then the result array contains just one String,
	 * which is the this value (converted to a String). If limit is not undefined,
	 * then the output array is truncated so that it contains no more than limit
	 * elements.
	 * "0".split(undefined, 0) -> []
	 */
	if ('0'.split(void 0, 0).length) {
		return implementation;
	}

	return String.prototype.split;
};
