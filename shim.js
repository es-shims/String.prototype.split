'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringSplit() {
	var polyfill = getPolyfill();
	define(
		String.prototype,
		{ split: polyfill },
		{ split: function () { return String.prototype.split !== polyfill; } }
	);
	return polyfill;
};
