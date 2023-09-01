'use strict';

var define = require('define-properties');
var callBind = require('call-bind');
var RequireObjectCoercible = require('es-abstract/2023/RequireObjectCoercible');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var bound = callBind(getPolyfill());
var boundMethod = function split(receiver, separator, limit) {
	RequireObjectCoercible(receiver);
	return bound(receiver, separator, limit);
};

define(boundMethod, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundMethod;
