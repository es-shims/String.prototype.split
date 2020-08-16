'use strict';

// var ToObject = require('es-abstract/2020/ToObject');

module.exports = function split() {
	// var O = ToObject(this);
	return String.prototype.split.apply(this, arguments);
};
