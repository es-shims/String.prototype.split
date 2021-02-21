'use strict';

require('../auto');

var test = require('tape');
var defineProperties = require('define-properties');
var callBind = require('call-bind');

var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = require('functions-have-names')();
var hasStrictMode = require('has-strict-mode')();

var runTests = require('./tests');

test('shimmed', function (t) {
	t.equal(String.prototype.split.length, 2, 'String#split has a length of 2');
	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(String.prototype.split.name, 'split', 'String#split has name "split"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(false, isEnumerable.call(String.prototype, 'split'), 'String#split is not enumerable');
		et.end();
	});

	t.test('bad first arg/receiver', { skip: !hasStrictMode }, function (st) {
		st['throws'](function () { return String.prototype.split.call(undefined); }, TypeError, 'undefined is not an object');
		st['throws'](function () { return String.prototype.split.call(null); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(callBind(String.prototype.split), t);

	t.end();
});
