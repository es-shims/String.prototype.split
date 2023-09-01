'use strict';

var GetIntrinsic = require('get-intrinsic');
var callBind = require('call-bind');
var callBound = require('call-bind/callBound');
var ToUint32 = require('es-abstract/2023/ToUint32');
var regexFlags = require('regexp.prototype.flags');
var isRegex = require('is-regex');

var $push = callBound('Array.prototype.push');
var $pushApply = callBind.apply(GetIntrinsic('%Array.prototype.push%'));
var arraySlice = callBound('Array.prototype.slice');
var $replace = callBound('Array.prototype.replace');
var strSplit = callBound('String.prototype.split');
var strSlice = callBound('String.prototype.slice');
var $exec = callBound('RegExp.prototype.exec');

var compliantExecNpcg = typeof $exec(/()??/, '')[1] === 'undefined'; // NPCG: nonparticipating capturing group
var maxSafe32BitInt = Math.pow(2, 32) - 1;

module.exports = function split(separator, limit) {
	var string = String(this);
	if (typeof separator === 'undefined' && limit === 0) {
		return [];
	}

	// If `separator` is not a regex, use native split
	if (!isRegex(separator)) {
		return strSplit(this, separator, limit);
	}

	var output = [];
	var flags = regexFlags(separator);
	var lastLastIndex = 0;
	// Make `global` and avoid `lastIndex` issues by working with a copy
	var separator2, lastIndex, lastLength;
	var separatorCopy = new RegExp(separator.source, flags + 'g');
	if (!compliantExecNpcg) {
		// Doesn't need flags gy, but they don't hurt
		separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	}
	/*
	 * Values for `limit`, per the spec:
	 * If undefined: 4294967295 // maxSafe32BitInt
	 * If 0, Infinity, or NaN: 0
	 * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	 * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	 * If other: Type-convert, then use the above rules
	 */
	var splitLimit = typeof limit === 'undefined' ? maxSafe32BitInt : ToUint32(limit);
	var match = $exec(separatorCopy, string);
	while (match) {
		// `separatorCopy.lastIndex` is not reliable cross-browser
		lastIndex = match.index + match[0].length;
		if (lastIndex > lastLastIndex) {
			$push(output, strSlice(string, lastLastIndex, match.index));
			/*
			 * Fix browsers whose `exec` methods don't consistently return `undefined` for
			 * nonparticipating capturing groups
			 */
			if (!compliantExecNpcg && match.length > 1) {
				/* eslint-disable no-loop-func */
				$replace(match[0], separator2, function () {
					for (var i = 1; i < arguments.length - 2; i++) {
						if (typeof arguments[i] === 'undefined') {
							match[i] = void 0;
						}
					}
				});
				/* eslint-enable no-loop-func */
			}
			if (match.length > 1 && match.index < string.length) {
				$pushApply(output, arraySlice(match, 1));
			}
			lastLength = match[0].length;
			lastLastIndex = lastIndex;
			if (output.length >= splitLimit) {
				break; // eslint-disable-line no-restricted-syntax
			}
		}
		if (separatorCopy.lastIndex === match.index) {
			separatorCopy.lastIndex += 1; // Avoid an infinite loop
		}
		match = $exec(separatorCopy, string);
	}
	if (lastLastIndex === string.length) {
		if (lastLength || !$exec(separatorCopy, '')) {
			$push(output, '');
		}
	} else {
		$push(output, strSlice(string, lastLastIndex));
	}
	return output.length > splitLimit ? arraySlice(output, 0, splitLimit) : output;
};
