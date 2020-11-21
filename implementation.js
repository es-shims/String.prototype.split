'use strict';

var callBound = require('call-bind/callBound');

var $split = callBound('String.prototype.split');

/*
 * [bugfix, chrome, node 0.8]
 * If separator is undefined, then the result array contains just one String,
 * which is the this value (converted to a String). If limit is not undefined,
 * then the output array is truncated so that it contains no more than limit
 * elements.
 * "0".split(undefined, 0) -> []
 */

module.exports = function split(separator, limit) {
	if (typeof separator === 'undefined' && limit === 0) {
		return [];
	}
	return $split(this, separator, limit);
};
