'use strict';

var split = require('../');
var test = require('tape');
var runTests = require('./tests');

test('as a function', function (t) {
	t.test('bad first arg/receiver', function (st) {
		st['throws'](function () { split(undefined); }, TypeError, 'undefined is not an object');
		st['throws'](function () { split(null); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(split, t);

	t.end();
});
