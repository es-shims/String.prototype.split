'use strict';

// var ToObject = require('es-abstract/2020/ToObject');
var callBind = require('call-bind');

var $split = callBind.apply(String.prototype.split);

module.exports = function split() {
	// var O = ToObject(this);
	return $split(this, arguments);
};
