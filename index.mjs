import callBind from 'call-bind';
import RequireObjectCoercible from 'es-abstract/2023/RequireObjectCoercible.js';

import getPolyfill from 'string.prototype.split/polyfill';

const bound = callBind(getPolyfill());

export default function split(receiver, separator, limit) {
	RequireObjectCoercible(receiver);
	return bound(receiver, separator, limit);
}

export { default as getPolyfill } from 'string.prototype.split/polyfill';
export { default as implementation } from 'string.prototype.split/implementation';
export { default as shim } from 'string.prototype.split/shim';
