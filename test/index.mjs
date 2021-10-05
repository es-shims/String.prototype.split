import split from 'string.prototype.split';
import * as Module from 'string.prototype.split';
import test from 'tape';
import runTests from './tests.js';

test('as a function', (t) => {
	t.test('bad first arg/receiver', (st) => {
		st.throws(() => split(undefined), TypeError, 'undefined is not an object');
		st.throws(() => split(null), TypeError, 'null is not an object');
		st.end();
	});

	runTests(split, t);

	t.end();
});

test('named exports', async (t) => {
	t.deepEqual(
		Object.keys(Module).sort(),
		['default', 'shim', 'getPolyfill', 'implementation'].sort(),
		'has expected named exports',
	);

	const { shim, getPolyfill, implementation } = Module;
	t.equal((await import('string.prototype.split/shim')).default, shim, 'shim named export matches deep export');
	t.equal((await import('string.prototype.split/implementation')).default, implementation, 'implementation named export matches deep export');
	t.equal((await import('string.prototype.split/polyfill')).default, getPolyfill, 'getPolyfill named export matches deep export');

	t.end();
});
