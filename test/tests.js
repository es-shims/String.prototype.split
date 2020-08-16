'use strict';

module.exports = function (split, t) {
	var test = 'ab';

	t.test('If "separator" is undefined must return Array with one String - "this" string', function (st) {
		st.deepEqual(split(test), [test], 'absent separator -> array with receiver');
		st.deepEqual(split(test, undefined), [test], 'undefined separator -> array with receiver');

		st.deepEqual(split(test, undefined, 0), [], 'zero limit -> empty array');

		st.end();
	});

	t.test('limit argument', function (st) {
		st.deepEqual(split('a b', / /, 0), []);
		st.deepEqual(split('a b', / /, 1), ['a']);
		st.deepEqual(split('a b', / /, 2), ['a', 'b']);
		st.deepEqual(split('a b', / /, 3), ['a', 'b']);

		st.end();
	});

	t.test('empty space receiver', function (st) {
		st.deepEqual(split(''), [''], 'split on empty space');
		st.deepEqual(split('', /./), [''], 'split on dot regex');
		st.deepEqual(split('', /.?/), [], 'split on dot question regex');
		st.deepEqual(split('', /.??/), [], 'split on non-greedy dot question regex');

		st.end();
	});

	t.test('extra tests', function (st) {
		// from Steven Levithan and es5-shim
		st.deepEqual(split('ab', /a*/), ['', 'b']);
		st.deepEqual(split('ab', /a*?/), ['a', 'b']);
		st.deepEqual(split('ab', /(?:ab)/), ['', ''], 'non-capturing group');
		st.deepEqual(split('ab', /(?:ab)*/), ['', ''], 'non-capturing group, *');
		st.deepEqual(split('ab', /(?:ab)*?/), ['a', 'b'], 'non-capturing group, *?');

		st.deepEqual(split('test', ''), ['t', 'e', 's', 't']);
		st.deepEqual(split('test'), ['test']);

		st.deepEqual(split('111', 1), ['', '', '', '']);

		st.deepEqual(split('test', /(?:)/, null), []);
		st.deepEqual(split('test', /(?:)/, NaN), []);
		st.deepEqual(split('test', /(?:)/, 'two'), []);
		st.deepEqual(split('test', /(?:)/, undefined), ['t', 'e', 's', 't']);
		st.deepEqual(split('test', /(?:)/), ['t', 'e', 's', 't']);
		st.deepEqual(split('test', /(?:)/, 4), ['t', 'e', 's', 't']);
		st.deepEqual(split('test', /(?:)/, 3), ['t', 'e', 's']);
		st.deepEqual(split('test', /(?:)/, 2), ['t', 'e']);
		st.deepEqual(split('test', /(?:)/, '2'), ['t', 'e']);
		st.deepEqual(split('test', /(?:)/, 1), ['t']);
		st.deepEqual(split('test', /(?:)/, true), ['t']);
		st.deepEqual(split('test', /(?:)/, 0), []);
		st.deepEqual(split('test', /(?:)/, -1), ['t', 'e', 's', 't']);

		st.deepEqual(split('a', /-/), ['a']);
		st.deepEqual(split('a', /-?/), ['a']);
		st.deepEqual(split('a', /-??/), ['a']);

		st.deepEqual(split('a', /a/), ['', '']);
		st.deepEqual(split('a', /a?/), ['', '']);
		st.deepEqual(split('a', /a??/), ['a']);

		st.deepEqual(split('ab', /-/), ['ab']);
		st.deepEqual(split('ab', /-?/), ['a', 'b']);
		st.deepEqual(split('ab', /-??/), ['a', 'b']);

		st.deepEqual(split('a-b', /-/), ['a', 'b']);
		st.deepEqual(split('a-b', /-?/), ['a', 'b']);
		st.deepEqual(split('a-b', /-??/), ['a', '-', 'b']);

		st.deepEqual(split('a--b', /-/), ['a', '', 'b']);
		st.deepEqual(split('a--b', /-?/), ['a', '', 'b']);
		st.deepEqual(split('a--b', /-??/), ['a', '-', '-', 'b']);

		st.deepEqual(split('', /()()/), []);
		st.deepEqual(split('.', /()()/), ['.']);

		st.deepEqual(split('.', /(.?)(.?)/), ['', '.', '', '']);
		st.deepEqual(split('.', /(.??)(.??)/), ['.']);
		st.deepEqual(split('.', /(.)?(.)?/), ['', '.', undefined, '']);

		st.deepEqual(
			split('A<B>bold</B>and<CODE>coded</CODE>', /<(\/)?([^<>]+)>/),
			['A', undefined, 'B', 'bold', '/', 'B', 'and', undefined, 'CODE', 'coded', '/', 'CODE', '']
		);

		st.deepEqual(split('tesst', /(s)*/), ['t', undefined, 'e', 's', 't']);
		st.deepEqual(split('tesst', /(s)*?/), ['t', undefined, 'e', undefined, 's', undefined, 's', undefined, 't']);
		st.deepEqual(split('tesst', /(s*)/), ['t', '', 'e', 'ss', 't']);
		st.deepEqual(split('tesst', /(s*?)/), ['t', '', 'e', '', 's', '', 's', '', 't']);
		st.deepEqual(split('tesst', /(?:s)*/), ['t', 'e', 't']);
		st.deepEqual(split('tesst', /(?=s+)/), ['te', 's', 'st']);

		st.deepEqual(split('test', 't'), ['', 'es', '']);
		st.deepEqual(split('test', /t/), ['', 'es', '']);
		st.deepEqual(split('test', /(t)/), ['', 't', 'es', 't', '']);

		st.deepEqual(split('test', 'es'), ['t', 't']);
		st.deepEqual(split('test', /es/), ['t', 't']);
		st.deepEqual(split('test', /(es)/), ['t', 'es', 't']);

		st.deepEqual(split('test', /(t)(e)(s)(t)/), ['', 't', 'e', 's', 't', '']);

		st.deepEqual(split('.', /(((.((.??)))))/), ['', '.', '.', '.', '', '', '']);
		st.deepEqual(split('.', /(((((.??)))))/), ['.']);

		st.deepEqual(split('a b c d', / /, -(Math.pow(2, 32) - 1)), ['a']);
		st.deepEqual(split('a b c d', / /, Math.pow(2, 32) + 1), ['a']);
		st.deepEqual(split('a b c d', / /, Infinity), []);

		st.end();
	});
};
