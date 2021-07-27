/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../../node_modules/call-bind/callBound.js":
/*!*******************************************************!*\
  !*** ../../../../node_modules/call-bind/callBound.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "../../../../node_modules/get-intrinsic/index.js");

var callBind = __webpack_require__(/*! ./ */ "../../../../node_modules/call-bind/index.js");

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ "../../../../node_modules/call-bind/index.js":
/*!***************************************************!*\
  !*** ../../../../node_modules/call-bind/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var bind = __webpack_require__(/*! function-bind */ "../../../../node_modules/function-bind/index.js");
var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "../../../../node_modules/get-intrinsic/index.js");

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ "../../../../node_modules/define-properties/index.js":
/*!***********************************************************!*\
  !*** ../../../../node_modules/define-properties/index.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var keys = __webpack_require__(/*! object-keys */ "../../../../node_modules/object-keys/index.js");
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),

/***/ "../../../../node_modules/es-abstract/2020/RequireObjectCoercible.js":
/*!***************************************************************************!*\
  !*** ../../../../node_modules/es-abstract/2020/RequireObjectCoercible.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



module.exports = __webpack_require__(/*! ../5/CheckObjectCoercible */ "../../../../node_modules/es-abstract/5/CheckObjectCoercible.js");


/***/ }),

/***/ "../../../../node_modules/es-abstract/2020/ToString.js":
/*!*************************************************************!*\
  !*** ../../../../node_modules/es-abstract/2020/ToString.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "../../../../node_modules/get-intrinsic/index.js");

var $String = GetIntrinsic('%String%');
var $TypeError = GetIntrinsic('%TypeError%');

// https://ecma-international.org/ecma-262/6.0/#sec-tostring

module.exports = function ToString(argument) {
	if (typeof argument === 'symbol') {
		throw new $TypeError('Cannot convert a Symbol value to a string');
	}
	return $String(argument);
};


/***/ }),

/***/ "../../../../node_modules/es-abstract/5/CheckObjectCoercible.js":
/*!**********************************************************************!*\
  !*** ../../../../node_modules/es-abstract/5/CheckObjectCoercible.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "../../../../node_modules/get-intrinsic/index.js");

var $TypeError = GetIntrinsic('%TypeError%');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value, optMessage) {
	if (value == null) {
		throw new $TypeError(optMessage || ('Cannot call method on ' + value));
	}
	return value;
};


/***/ }),

/***/ "../../../../node_modules/for-each/index.js":
/*!**************************************************!*\
  !*** ../../../../node_modules/for-each/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isCallable = __webpack_require__(/*! is-callable */ "../../../../node_modules/is-callable/index.js");

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;


/***/ }),

/***/ "../../../../node_modules/function-bind/implementation.js":
/*!****************************************************************!*\
  !*** ../../../../node_modules/function-bind/implementation.js ***!
  \****************************************************************/
/***/ ((module) => {



/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "../../../../node_modules/function-bind/index.js":
/*!*******************************************************!*\
  !*** ../../../../node_modules/function-bind/index.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var implementation = __webpack_require__(/*! ./implementation */ "../../../../node_modules/function-bind/implementation.js");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "../../../../node_modules/get-intrinsic/index.js":
/*!*******************************************************!*\
  !*** ../../../../node_modules/get-intrinsic/index.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(/*! has-symbols */ "../../../../node_modules/has-symbols/index.js")();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(/*! function-bind */ "../../../../node_modules/function-bind/index.js");
var hasOwn = __webpack_require__(/*! has */ "../../../../node_modules/has/src/index.js");
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ "../../../../node_modules/has-symbols/index.js":
/*!*****************************************************!*\
  !*** ../../../../node_modules/has-symbols/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(/*! ./shams */ "../../../../node_modules/has-symbols/shams.js");

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ "../../../../node_modules/has-symbols/shams.js":
/*!*****************************************************!*\
  !*** ../../../../node_modules/has-symbols/shams.js ***!
  \*****************************************************/
/***/ ((module) => {



/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "../../../../node_modules/has/src/index.js":
/*!*************************************************!*\
  !*** ../../../../node_modules/has/src/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var bind = __webpack_require__(/*! function-bind */ "../../../../node_modules/function-bind/index.js");

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),

/***/ "../../../../node_modules/is-callable/index.js":
/*!*****************************************************!*\
  !*** ../../../../node_modules/is-callable/index.js ***!
  \*****************************************************/
/***/ ((module) => {



var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
/* globals document: false */
var documentDotAll = typeof document === 'object' && typeof document.all === 'undefined' && document.all !== undefined ? document.all : {};

module.exports = reflectApply
	? function isCallable(value) {
		if (value === documentDotAll) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value);
	}
	: function isCallable(value) {
		if (value === documentDotAll) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		return strClass === fnClass || strClass === genClass;
	};


/***/ }),

/***/ "../../../../node_modules/node-polyglot/index.js":
/*!*******************************************************!*\
  !*** ../../../../node_modules/node-polyglot/index.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

//     (c) 2012-2018 Airbnb, Inc.
//
//     polyglot.js may be freely distributed under the terms of the BSD
//     license. For all licensing information, details, and documention:
//     http://airbnb.github.com/polyglot.js
//
//
// Polyglot.js is an I18n helper library written in JavaScript, made to
// work both in the browser and in Node. It provides a simple solution for
// interpolation and pluralization, based off of Airbnb's
// experience adding I18n functionality to its Backbone.js and Node apps.
//
// Polylglot is agnostic to your translation backend. It doesn't perform any
// translation; it simply gives you a way to manage translated phrases from
// your client- or server-side JavaScript application.
//



var forEach = __webpack_require__(/*! for-each */ "../../../../node_modules/for-each/index.js");
var warning = __webpack_require__(/*! warning */ "../../../../node_modules/warning/warning.js");
var has = __webpack_require__(/*! has */ "../../../../node_modules/has/src/index.js");
var trim = __webpack_require__(/*! string.prototype.trim */ "../../../../node_modules/string.prototype.trim/index.js");

var warn = function warn(message) {
  warning(false, message);
};

var replace = String.prototype.replace;
var split = String.prototype.split;

// #### Pluralization methods
// The string that separates the different phrase possibilities.
var delimiter = '||||';

var russianPluralGroups = function (n) {
  var lastTwo = n % 100;
  var end = lastTwo % 10;
  if (lastTwo !== 11 && end === 1) {
    return 0;
  }
  if (2 <= end && end <= 4 && !(lastTwo >= 12 && lastTwo <= 14)) {
    return 1;
  }
  return 2;
};

var defaultPluralRules = {
  // Mapping from pluralization group plural logic.
  pluralTypes: {
    arabic: function (n) {
      // http://www.arabeyes.org/Plural_Forms
      if (n < 3) { return n; }
      var lastTwo = n % 100;
      if (lastTwo >= 3 && lastTwo <= 10) return 3;
      return lastTwo >= 11 ? 4 : 5;
    },
    bosnian_serbian: russianPluralGroups,
    chinese: function () { return 0; },
    croatian: russianPluralGroups,
    french: function (n) { return n > 1 ? 1 : 0; },
    german: function (n) { return n !== 1 ? 1 : 0; },
    russian: russianPluralGroups,
    lithuanian: function (n) {
      if (n % 10 === 1 && n % 100 !== 11) { return 0; }
      return n % 10 >= 2 && n % 10 <= 9 && (n % 100 < 11 || n % 100 > 19) ? 1 : 2;
    },
    czech: function (n) {
      if (n === 1) { return 0; }
      return (n >= 2 && n <= 4) ? 1 : 2;
    },
    polish: function (n) {
      if (n === 1) { return 0; }
      var end = n % 10;
      return 2 <= end && end <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    },
    icelandic: function (n) { return (n % 10 !== 1 || n % 100 === 11) ? 1 : 0; },
    slovenian: function (n) {
      var lastTwo = n % 100;
      if (lastTwo === 1) {
        return 0;
      }
      if (lastTwo === 2) {
        return 1;
      }
      if (lastTwo === 3 || lastTwo === 4) {
        return 2;
      }
      return 3;
    }
  },

  // Mapping from pluralization group to individual language codes/locales.
  // Will look up based on exact match, if not found and it's a locale will parse the locale
  // for language code, and if that does not exist will default to 'en'
  pluralTypeToLanguages: {
    arabic: ['ar'],
    bosnian_serbian: ['bs-Latn-BA', 'bs-Cyrl-BA', 'srl-RS', 'sr-RS'],
    chinese: ['id', 'id-ID', 'ja', 'ko', 'ko-KR', 'lo', 'ms', 'th', 'th-TH', 'zh'],
    croatian: ['hr', 'hr-HR'],
    german: ['fa', 'da', 'de', 'en', 'es', 'fi', 'el', 'he', 'hi-IN', 'hu', 'hu-HU', 'it', 'nl', 'no', 'pt', 'sv', 'tr'],
    french: ['fr', 'tl', 'pt-br'],
    russian: ['ru', 'ru-RU'],
    lithuanian: ['lt'],
    czech: ['cs', 'cs-CZ', 'sk'],
    polish: ['pl'],
    icelandic: ['is'],
    slovenian: ['sl-SL']
  }
};

function langToTypeMap(mapping) {
  var ret = {};
  forEach(mapping, function (langs, type) {
    forEach(langs, function (lang) {
      ret[lang] = type;
    });
  });
  return ret;
}

function pluralTypeName(pluralRules, locale) {
  var langToPluralType = langToTypeMap(pluralRules.pluralTypeToLanguages);
  return langToPluralType[locale]
    || langToPluralType[split.call(locale, /-/, 1)[0]]
    || langToPluralType.en;
}

function pluralTypeIndex(pluralRules, locale, count) {
  return pluralRules.pluralTypes[pluralTypeName(pluralRules, locale)](count);
}

function escape(token) {
  return token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function constructTokenRegex(opts) {
  var prefix = (opts && opts.prefix) || '%{';
  var suffix = (opts && opts.suffix) || '}';

  if (prefix === delimiter || suffix === delimiter) {
    throw new RangeError('"' + delimiter + '" token is reserved for pluralization');
  }

  return new RegExp(escape(prefix) + '(.*?)' + escape(suffix), 'g');
}

var defaultTokenRegex = /%\{(.*?)\}/g;

// ### transformPhrase(phrase, substitutions, locale)
//
// Takes a phrase string and transforms it by choosing the correct
// plural form and interpolating it.
//
//     transformPhrase('Hello, %{name}!', {name: 'Spike'});
//     // "Hello, Spike!"
//
// The correct plural form is selected if substitutions.smart_count
// is set. You can pass in a number instead of an Object as `substitutions`
// as a shortcut for `smart_count`.
//
//     transformPhrase('%{smart_count} new messages |||| 1 new message', {smart_count: 1}, 'en');
//     // "1 new message"
//
//     transformPhrase('%{smart_count} new messages |||| 1 new message', {smart_count: 2}, 'en');
//     // "2 new messages"
//
//     transformPhrase('%{smart_count} new messages |||| 1 new message', 5, 'en');
//     // "5 new messages"
//
// You should pass in a third argument, the locale, to specify the correct plural type.
// It defaults to `'en'` with 2 plural forms.
function transformPhrase(phrase, substitutions, locale, tokenRegex, pluralRules) {
  if (typeof phrase !== 'string') {
    throw new TypeError('Polyglot.transformPhrase expects argument #1 to be string');
  }

  if (substitutions == null) {
    return phrase;
  }

  var result = phrase;
  var interpolationRegex = tokenRegex || defaultTokenRegex;
  var pluralRulesOrDefault = pluralRules || defaultPluralRules;

  // allow number as a pluralization shortcut
  var options = typeof substitutions === 'number' ? { smart_count: substitutions } : substitutions;

  // Select plural form: based on a phrase text that contains `n`
  // plural forms separated by `delimiter`, a `locale`, and a `substitutions.smart_count`,
  // choose the correct plural form. This is only done if `count` is set.
  if (options.smart_count != null && result) {
    var texts = split.call(result, delimiter);
    result = trim(texts[pluralTypeIndex(pluralRulesOrDefault, locale || 'en', options.smart_count)] || texts[0]);
  }

  // Interpolate: Creates a `RegExp` object for each interpolation placeholder.
  result = replace.call(result, interpolationRegex, function (expression, argument) {
    if (!has(options, argument) || options[argument] == null) { return expression; }
    return options[argument];
  });

  return result;
}

// ### Polyglot class constructor
function Polyglot(options) {
  var opts = options || {};
  this.phrases = {};
  this.extend(opts.phrases || {});
  this.currentLocale = opts.locale || 'en';
  var allowMissing = opts.allowMissing ? transformPhrase : null;
  this.onMissingKey = typeof opts.onMissingKey === 'function' ? opts.onMissingKey : allowMissing;
  this.warn = opts.warn || warn;
  this.tokenRegex = constructTokenRegex(opts.interpolation);
  this.pluralRules = opts.pluralRules || defaultPluralRules;
}

// ### polyglot.locale([locale])
//
// Get or set locale. Internally, Polyglot only uses locale for pluralization.
Polyglot.prototype.locale = function (newLocale) {
  if (newLocale) this.currentLocale = newLocale;
  return this.currentLocale;
};

// ### polyglot.extend(phrases)
//
// Use `extend` to tell Polyglot how to translate a given key.
//
//     polyglot.extend({
//       "hello": "Hello",
//       "hello_name": "Hello, %{name}"
//     });
//
// The key can be any string.  Feel free to call `extend` multiple times;
// it will override any phrases with the same key, but leave existing phrases
// untouched.
//
// It is also possible to pass nested phrase objects, which get flattened
// into an object with the nested keys concatenated using dot notation.
//
//     polyglot.extend({
//       "nav": {
//         "hello": "Hello",
//         "hello_name": "Hello, %{name}",
//         "sidebar": {
//           "welcome": "Welcome"
//         }
//       }
//     });
//
//     console.log(polyglot.phrases);
//     // {
//     //   'nav.hello': 'Hello',
//     //   'nav.hello_name': 'Hello, %{name}',
//     //   'nav.sidebar.welcome': 'Welcome'
//     // }
//
// `extend` accepts an optional second argument, `prefix`, which can be used
// to prefix every key in the phrases object with some string, using dot
// notation.
//
//     polyglot.extend({
//       "hello": "Hello",
//       "hello_name": "Hello, %{name}"
//     }, "nav");
//
//     console.log(polyglot.phrases);
//     // {
//     //   'nav.hello': 'Hello',
//     //   'nav.hello_name': 'Hello, %{name}'
//     // }
//
// This feature is used internally to support nested phrase objects.
Polyglot.prototype.extend = function (morePhrases, prefix) {
  forEach(morePhrases, function (phrase, key) {
    var prefixedKey = prefix ? prefix + '.' + key : key;
    if (typeof phrase === 'object') {
      this.extend(phrase, prefixedKey);
    } else {
      this.phrases[prefixedKey] = phrase;
    }
  }, this);
};

// ### polyglot.unset(phrases)
// Use `unset` to selectively remove keys from a polyglot instance.
//
//     polyglot.unset("some_key");
//     polyglot.unset({
//       "hello": "Hello",
//       "hello_name": "Hello, %{name}"
//     });
//
// The unset method can take either a string (for the key), or an object hash with
// the keys that you would like to unset.
Polyglot.prototype.unset = function (morePhrases, prefix) {
  if (typeof morePhrases === 'string') {
    delete this.phrases[morePhrases];
  } else {
    forEach(morePhrases, function (phrase, key) {
      var prefixedKey = prefix ? prefix + '.' + key : key;
      if (typeof phrase === 'object') {
        this.unset(phrase, prefixedKey);
      } else {
        delete this.phrases[prefixedKey];
      }
    }, this);
  }
};

// ### polyglot.clear()
//
// Clears all phrases. Useful for special cases, such as freeing
// up memory if you have lots of phrases but no longer need to
// perform any translation. Also used internally by `replace`.
Polyglot.prototype.clear = function () {
  this.phrases = {};
};

// ### polyglot.replace(phrases)
//
// Completely replace the existing phrases with a new set of phrases.
// Normally, just use `extend` to add more phrases, but under certain
// circumstances, you may want to make sure no old phrases are lying around.
Polyglot.prototype.replace = function (newPhrases) {
  this.clear();
  this.extend(newPhrases);
};


// ### polyglot.t(key, options)
//
// The most-used method. Provide a key, and `t` will return the
// phrase.
//
//     polyglot.t("hello");
//     => "Hello"
//
// The phrase value is provided first by a call to `polyglot.extend()` or
// `polyglot.replace()`.
//
// Pass in an object as the second argument to perform interpolation.
//
//     polyglot.t("hello_name", {name: "Spike"});
//     => "Hello, Spike"
//
// If you like, you can provide a default value in case the phrase is missing.
// Use the special option key "_" to specify a default.
//
//     polyglot.t("i_like_to_write_in_language", {
//       _: "I like to write in %{language}.",
//       language: "JavaScript"
//     });
//     => "I like to write in JavaScript."
//
Polyglot.prototype.t = function (key, options) {
  var phrase, result;
  var opts = options == null ? {} : options;
  if (typeof this.phrases[key] === 'string') {
    phrase = this.phrases[key];
  } else if (typeof opts._ === 'string') {
    phrase = opts._;
  } else if (this.onMissingKey) {
    var onMissingKey = this.onMissingKey;
    result = onMissingKey(key, opts, this.currentLocale, this.tokenRegex, this.pluralRules);
  } else {
    this.warn('Missing translation for key: "' + key + '"');
    result = key;
  }
  if (typeof phrase === 'string') {
    result = transformPhrase(phrase, opts, this.currentLocale, this.tokenRegex, this.pluralRules);
  }
  return result;
};


// ### polyglot.has(key)
//
// Check if polyglot has a translation for given key
Polyglot.prototype.has = function (key) {
  return has(this.phrases, key);
};

// export transformPhrase
Polyglot.transformPhrase = function transform(phrase, substitutions, locale) {
  return transformPhrase(phrase, substitutions, locale);
};

module.exports = Polyglot;


/***/ }),

/***/ "../../../../node_modules/object-keys/implementation.js":
/*!**************************************************************!*\
  !*** ../../../../node_modules/object-keys/implementation.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(/*! ./isArguments */ "../../../../node_modules/object-keys/isArguments.js"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ "../../../../node_modules/object-keys/index.js":
/*!*****************************************************!*\
  !*** ../../../../node_modules/object-keys/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var slice = Array.prototype.slice;
var isArgs = __webpack_require__(/*! ./isArguments */ "../../../../node_modules/object-keys/isArguments.js");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ "../../../../node_modules/object-keys/implementation.js");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ "../../../../node_modules/object-keys/isArguments.js":
/*!***********************************************************!*\
  !*** ../../../../node_modules/object-keys/isArguments.js ***!
  \***********************************************************/
/***/ ((module) => {



var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ "../../../../node_modules/string.prototype.trim/implementation.js":
/*!************************************************************************!*\
  !*** ../../../../node_modules/string.prototype.trim/implementation.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var RequireObjectCoercible = __webpack_require__(/*! es-abstract/2020/RequireObjectCoercible */ "../../../../node_modules/es-abstract/2020/RequireObjectCoercible.js");
var ToString = __webpack_require__(/*! es-abstract/2020/ToString */ "../../../../node_modules/es-abstract/2020/ToString.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "../../../../node_modules/call-bind/callBound.js");
var $replace = callBound('String.prototype.replace');

/* eslint-disable no-control-regex */
var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;
/* eslint-enable no-control-regex */

module.exports = function trim() {
	var S = ToString(RequireObjectCoercible(this));
	return $replace($replace(S, leftWhitespace, ''), rightWhitespace, '');
};


/***/ }),

/***/ "../../../../node_modules/string.prototype.trim/index.js":
/*!***************************************************************!*\
  !*** ../../../../node_modules/string.prototype.trim/index.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var callBind = __webpack_require__(/*! call-bind */ "../../../../node_modules/call-bind/index.js");
var define = __webpack_require__(/*! define-properties */ "../../../../node_modules/define-properties/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "../../../../node_modules/string.prototype.trim/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "../../../../node_modules/string.prototype.trim/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "../../../../node_modules/string.prototype.trim/shim.js");

var boundTrim = callBind(getPolyfill());

define(boundTrim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundTrim;


/***/ }),

/***/ "../../../../node_modules/string.prototype.trim/polyfill.js":
/*!******************************************************************!*\
  !*** ../../../../node_modules/string.prototype.trim/polyfill.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var implementation = __webpack_require__(/*! ./implementation */ "../../../../node_modules/string.prototype.trim/implementation.js");

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};


/***/ }),

/***/ "../../../../node_modules/string.prototype.trim/shim.js":
/*!**************************************************************!*\
  !*** ../../../../node_modules/string.prototype.trim/shim.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var define = __webpack_require__(/*! define-properties */ "../../../../node_modules/define-properties/index.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "../../../../node_modules/string.prototype.trim/polyfill.js");

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, {
		trim: function testTrim() {
			return String.prototype.trim !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "../../../../node_modules/warning/warning.js":
/*!***************************************************!*\
  !*** ../../../../node_modules/warning/warning.js ***!
  \***************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "development" !== 'production';

var warning = function() {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);
    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }
    var argIndex = 0;
    var message = 'Warning: ' +
      format.replace(/%s/g, function() {
        return args[argIndex++];
      });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  }

  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
          '`warning(condition, format, ...args)` requires a warning ' +
          'message argument'
      );
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

module.exports = warning;


/***/ }),

/***/ "./src/templates/favourite-colour.ts":
/*!*******************************************!*\
  !*** ./src/templates/favourite-colour.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hook": () => (/* binding */ hook)
/* harmony export */ });
/* harmony import */ var _src_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../src/browser */ "../../src/browser/index.ts");

const hook = {
    componentName: 'favourite-colour',
    register: ({ dataId, form }) => {
        const inputField = document.getElementsByName(dataId)[0];
        inputField.addEventListener('input', () => {
            var _a;
            const errorBlock = new _src_browser__WEBPACK_IMPORTED_MODULE_0__.ErrorBlock(dataId);
            (_a = form
                .validatorFor(dataId)) === null || _a === void 0 ? void 0 : _a.validate(inputField.value).forEach((e) => errorBlock.add(form.view.translate(e)));
            errorBlock.render();
        });
    }
};


/***/ }),

/***/ "./src/templates/index.ts":
/*!********************************!*\
  !*** ./src/templates/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hooks": () => (/* binding */ hooks)
/* harmony export */ });
/* harmony import */ var _favourite_colour__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./favourite-colour */ "./src/templates/favourite-colour.ts");

const hooks = [_favourite_colour__WEBPACK_IMPORTED_MODULE_0__.hook];


/***/ }),

/***/ "../../src/browser/index.ts":
/*!**********************************!*\
  !*** ../../src/browser/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pageValidation": () => (/* reexport safe */ _page_validation_plugin__WEBPACK_IMPORTED_MODULE_0__.pageValidation),
/* harmony export */   "ErrorBlock": () => (/* reexport safe */ _templates_error_block__WEBPACK_IMPORTED_MODULE_1__.ErrorBlock)
/* harmony export */ });
/* harmony import */ var _page_validation_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-validation-plugin */ "../../src/browser/page-validation-plugin.ts");
/* harmony import */ var _templates_error_block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../templates/error-block */ "../../src/templates/error-block.ts");




/***/ }),

/***/ "../../src/browser/page-validation-plugin.ts":
/*!***************************************************!*\
  !*** ../../src/browser/page-validation-plugin.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pageValidation": () => (/* binding */ pageValidation)
/* harmony export */ });
/* harmony import */ var _tngbl_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tngbl/forms */ "../../../forms/src/index.ts");
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../templates */ "../../src/templates/index.ts");
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../package.json */ "../../package.json");



const pageValidation = (opts) => {
    const hooks = [..._templates__WEBPACK_IMPORTED_MODULE_1__.eventHooks, ...(opts.hooks || [])];
    return {
        name: `${_package_json__WEBPACK_IMPORTED_MODULE_2__.name}/page-validation`,
        version: _package_json__WEBPACK_IMPORTED_MODULE_2__.version,
        register() {
            _tngbl_forms__WEBPACK_IMPORTED_MODULE_0__.Form.prototype.bindToPage = function () {
                const _bind = (component) => {
                    if (component instanceof _tngbl_forms__WEBPACK_IMPORTED_MODULE_0__.Form) {
                        _bind(component.schema);
                    }
                    else if (component instanceof _tngbl_forms__WEBPACK_IMPORTED_MODULE_0__.FieldSet) {
                        component.structure.forEach(_bind);
                    }
                    else if (component instanceof _tngbl_forms__WEBPACK_IMPORTED_MODULE_0__.Field) {
                        const hook = hooks.find((hook) => hook.componentName === component.viewType);
                        if (!hook)
                            throw Error(`Missing hook named ${component.viewType}`);
                        hook.register({
                            dataId: component.name,
                            form: this
                        });
                    }
                    else {
                        throw new Error(`Unexpected item in form structure ${component}`);
                    }
                };
                _bind(this);
            };
        }
    };
};


/***/ }),

/***/ "../../src/templates/error-block.ts":
/*!******************************************!*\
  !*** ../../src/templates/error-block.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorBlock": () => (/* binding */ ErrorBlock)
/* harmony export */ });
class ErrorBlock {
    constructor(name) {
        this.errors = [];
        this.element = document.getElementById(name + '__error-block');
    }
    add(error) {
        this.errors.push(error);
    }
    clear() {
        this.errors = [];
    }
    render() {
        this.element.innerHTML = this.errors
            .map((error) => `<li>${error}</li>`)
            .join('\n');
    }
}


/***/ }),

/***/ "../../src/templates/index.ts":
/*!************************************!*\
  !*** ../../src/templates/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eventHooks": () => (/* binding */ eventHooks)
/* harmony export */ });
/* harmony import */ var _new_password__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./new-password */ "../../src/templates/new-password.ts");

const eventHooks = [_new_password__WEBPACK_IMPORTED_MODULE_0__.default];


/***/ }),

/***/ "../../src/templates/new-password.ts":
/*!*******************************************!*\
  !*** ../../src/templates/new-password.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../browser */ "../../src/browser/index.ts");

const eventHook = {
    componentName: 'new-password',
    register: ({ dataId, form }) => {
        const inputElements = document.querySelectorAll('input');
        let confirmTouched = false;
        const onInputChange = () => {
            var _a;
            const errorBlock = new _browser__WEBPACK_IMPORTED_MODULE_0__.ErrorBlock(dataId);
            if (confirmTouched) {
                (_a = form
                    .validatorFor(dataId)) === null || _a === void 0 ? void 0 : _a.validate(inputElements[0].value).forEach((error) => errorBlock.add(form.view.translate(error)));
                if (inputElements[0].value !== inputElements[1].value) {
                    errorBlock.add(form.view.translate({
                        translateKey: 'validations.new-password.confirm-does-not-match'
                    }));
                }
            }
            errorBlock.render();
        };
        const onFocus = () => {
            confirmTouched = true;
        };
        inputElements.forEach((element) => {
            element.addEventListener('focus', onFocus);
            element.addEventListener('input', onInputChange);
        });
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (eventHook);


/***/ }),

/***/ "../../../forms/src/@types/index.ts":
/*!******************************************!*\
  !*** ../../../forms/src/@types/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../../forms/src/core/core-plugin.ts":
/*!**********************************************!*\
  !*** ../../../forms/src/core/core-plugin.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "core": () => (/* binding */ core)
/* harmony export */ });
/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validations */ "../../../forms/src/core/validations/index.ts");
/* harmony import */ var _triggers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./triggers */ "../../../forms/src/core/triggers/index.ts");
/* harmony import */ var _views__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./views */ "../../../forms/src/core/views/index.ts");
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../package.json */ "../../../forms/package.json");




const core = {
    name: `${_package_json__WEBPACK_IMPORTED_MODULE_3__.name}/core`,
    version: _package_json__WEBPACK_IMPORTED_MODULE_3__.version,
    register(builder) {
        builder.builders.validationConditions.push(..._validations__WEBPACK_IMPORTED_MODULE_0__.coreValidationBuilders);
        builder.builders.triggerConditions.push(..._triggers__WEBPACK_IMPORTED_MODULE_1__.coreTriggerConditionBuilders);
        builder.builders.views.push(..._views__WEBPACK_IMPORTED_MODULE_2__.coreViewBuilders);
    },
    validations: {
        name: `${_package_json__WEBPACK_IMPORTED_MODULE_3__.name}/core/validations`,
        version: _package_json__WEBPACK_IMPORTED_MODULE_3__.version,
        register(builder) {
            builder.builders.validationConditions.push(..._validations__WEBPACK_IMPORTED_MODULE_0__.coreValidationBuilders);
        }
    },
    dataTriggers: {
        name: `${_package_json__WEBPACK_IMPORTED_MODULE_3__.name}/core/dataTriggers`,
        version: _package_json__WEBPACK_IMPORTED_MODULE_3__.version,
        register(builder) {
            builder.builders.triggerConditions.push(..._triggers__WEBPACK_IMPORTED_MODULE_1__.coreTriggerConditionBuilders);
        }
    },
    views: {
        name: `${_package_json__WEBPACK_IMPORTED_MODULE_3__.name}/core/views`,
        version: _package_json__WEBPACK_IMPORTED_MODULE_3__.version,
        register(builder) {
            builder.builders.views.push(..._views__WEBPACK_IMPORTED_MODULE_2__.coreViewBuilders);
        }
    }
};


/***/ }),

/***/ "../../../forms/src/core/index.ts":
/*!****************************************!*\
  !*** ../../../forms/src/core/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MinLengthValidation": () => (/* reexport safe */ _validations__WEBPACK_IMPORTED_MODULE_0__.MinLengthValidation),
/* harmony export */   "coreValidationBuilders": () => (/* reexport safe */ _validations__WEBPACK_IMPORTED_MODULE_0__.coreValidationBuilders),
/* harmony export */   "Equals": () => (/* reexport safe */ _triggers__WEBPACK_IMPORTED_MODULE_1__.Equals),
/* harmony export */   "False": () => (/* reexport safe */ _triggers__WEBPACK_IMPORTED_MODULE_1__.False),
/* harmony export */   "True": () => (/* reexport safe */ _triggers__WEBPACK_IMPORTED_MODULE_1__.True),
/* harmony export */   "coreTriggerConditionBuilders": () => (/* reexport safe */ _triggers__WEBPACK_IMPORTED_MODULE_1__.coreTriggerConditionBuilders),
/* harmony export */   "core": () => (/* reexport safe */ _core_plugin__WEBPACK_IMPORTED_MODULE_2__.core)
/* harmony export */ });
/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validations */ "../../../forms/src/core/validations/index.ts");
/* harmony import */ var _triggers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./triggers */ "../../../forms/src/core/triggers/index.ts");
/* harmony import */ var _core_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core-plugin */ "../../../forms/src/core/core-plugin.ts");





/***/ }),

/***/ "../../../forms/src/core/triggers/equals.ts":
/*!**************************************************!*\
  !*** ../../../forms/src/core/triggers/equals.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EqualsTriggerCondition": () => (/* binding */ EqualsTriggerCondition),
/* harmony export */   "builder": () => (/* binding */ builder)
/* harmony export */ });
/* harmony import */ var _utils_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/find */ "../../../forms/src/utils/find.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils */ "../../../forms/src/utils/index.ts");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! . */ "../../../forms/src/core/triggers/index.ts");



___WEBPACK_IMPORTED_MODULE_2__.False;
class EqualsTriggerCondition {
    constructor(left, right = EqualsTriggerCondition.Self) {
        this.left = left;
        this.right = right;
    }
    isTriggered(dataId, data) {
        const left = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.hasProperty)(this.left, 'dataId')
            ? (0,_utils_find__WEBPACK_IMPORTED_MODULE_0__.findInData)(data, this.left === EqualsTriggerCondition.Self
                ? dataId
                : this.left.dataId || '')
            : this.left;
        const right = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.hasProperty)(this.right, 'dataId')
            ? (0,_utils_find__WEBPACK_IMPORTED_MODULE_0__.findInData)(data, this.right === EqualsTriggerCondition.Self
                ? dataId
                : this.right.dataId || '')
            : this.right;
        return left === right;
    }
    toJson() {
        return {
            type: EqualsTriggerCondition.name,
            left: this.left,
            right: this.right
        };
    }
}
EqualsTriggerCondition.Self = { dataId: undefined };
const builder = {
    type: EqualsTriggerCondition.name,
    fromJson(json, _builders) {
        return new EqualsTriggerCondition(json.left, json.right);
    }
};


/***/ }),

/***/ "../../../forms/src/core/triggers/false.ts":
/*!*************************************************!*\
  !*** ../../../forms/src/core/triggers/false.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FalseTriggerCondition": () => (/* binding */ FalseTriggerCondition),
/* harmony export */   "builder": () => (/* binding */ builder)
/* harmony export */ });
class FalseTriggerCondition {
    isTriggered() {
        return false;
    }
    toJson() {
        return { type: FalseTriggerCondition.name };
    }
}
const builder = {
    type: FalseTriggerCondition.name,
    fromJson() {
        return new FalseTriggerCondition();
    }
};


/***/ }),

/***/ "../../../forms/src/core/triggers/index.ts":
/*!*************************************************!*\
  !*** ../../../forms/src/core/triggers/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "True": () => (/* reexport safe */ _true__WEBPACK_IMPORTED_MODULE_0__.TrueTriggerCondition),
/* harmony export */   "False": () => (/* reexport safe */ _false__WEBPACK_IMPORTED_MODULE_1__.FalseTriggerCondition),
/* harmony export */   "Equals": () => (/* reexport safe */ _equals__WEBPACK_IMPORTED_MODULE_2__.EqualsTriggerCondition),
/* harmony export */   "coreTriggerConditionBuilders": () => (/* binding */ coreTriggerConditionBuilders)
/* harmony export */ });
/* harmony import */ var _true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./true */ "../../../forms/src/core/triggers/true.ts");
/* harmony import */ var _false__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./false */ "../../../forms/src/core/triggers/false.ts");
/* harmony import */ var _equals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./equals */ "../../../forms/src/core/triggers/equals.ts");




const coreTriggerConditionBuilders = [
    _true__WEBPACK_IMPORTED_MODULE_0__.builder,
    _false__WEBPACK_IMPORTED_MODULE_1__.builder,
    _equals__WEBPACK_IMPORTED_MODULE_2__.builder
];


/***/ }),

/***/ "../../../forms/src/core/triggers/true.ts":
/*!************************************************!*\
  !*** ../../../forms/src/core/triggers/true.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TrueTriggerCondition": () => (/* binding */ TrueTriggerCondition),
/* harmony export */   "builder": () => (/* binding */ builder)
/* harmony export */ });
class TrueTriggerCondition {
    isTriggered() {
        return true;
    }
    toJson() {
        return { type: TrueTriggerCondition.name };
    }
}
const builder = {
    type: TrueTriggerCondition.name,
    fromJson() {
        return new TrueTriggerCondition();
    }
};


/***/ }),

/***/ "../../../forms/src/core/validations/index.ts":
/*!****************************************************!*\
  !*** ../../../forms/src/core/validations/index.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MinLengthValidation": () => (/* reexport safe */ _min_length__WEBPACK_IMPORTED_MODULE_0__.MinLengthValidation),
/* harmony export */   "coreValidationBuilders": () => (/* binding */ coreValidationBuilders)
/* harmony export */ });
/* harmony import */ var _min_length__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./min-length */ "../../../forms/src/core/validations/min-length.ts");


const coreValidationBuilders = [_min_length__WEBPACK_IMPORTED_MODULE_0__.builder];


/***/ }),

/***/ "../../../forms/src/core/validations/min-length.ts":
/*!*********************************************************!*\
  !*** ../../../forms/src/core/validations/min-length.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MinLengthValidation": () => (/* binding */ MinLengthValidation),
/* harmony export */   "builder": () => (/* binding */ builder)
/* harmony export */ });
/* harmony import */ var _utils_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/types */ "../../../forms/src/utils/types.ts");

class MinLengthValidation {
    constructor(length) {
        this.length = length;
    }
    validate(id, data) {
        if (!(0,_utils_types__WEBPACK_IMPORTED_MODULE_0__.isNullOrUndefined)(data) || !(0,_utils_types__WEBPACK_IMPORTED_MODULE_0__.isNumber)(data.length)) {
            return [];
        }
        if (data.length < this.length) {
            return [
                {
                    dataId: id,
                    validation: builder.type,
                    error: 'too-short',
                    translateKey: `validations.${builder.type}.too-short`,
                    translateVars: { length: this.length }
                }
            ];
        }
        else {
            return [];
        }
    }
    toJson() {
        return {
            type: builder.type,
            length: this.length
        };
    }
}
const builder = {
    type: MinLengthValidation.name,
    fromJson(obj) {
        const validation = new MinLengthValidation(obj.length);
        return validation;
    }
};


/***/ }),

/***/ "../../../forms/src/core/views/basic-form-view.ts":
/*!********************************************************!*\
  !*** ../../../forms/src/core/views/basic-form-view.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BasicFormView": () => (/* binding */ BasicFormView),
/* harmony export */   "builder": () => (/* binding */ builder)
/* harmony export */ });
/* harmony import */ var node_polyglot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node-polyglot */ "../../../../node_modules/node-polyglot/index.js");
/* harmony import */ var node_polyglot__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_polyglot__WEBPACK_IMPORTED_MODULE_0__);

class BasicFormView {
    set translations(translations) {
        this._translations = translations;
        this._polyglot = new node_polyglot__WEBPACK_IMPORTED_MODULE_0__({ phrases: translations });
    }
    get translations() {
        return this._translations;
    }
    translate(item) {
        return this._polyglot.t(item.translateKey, item.translateVars);
    }
    toJson() {
        return {
            type: BasicFormView.name,
            locale: this.locale,
            translations: this._translations
        };
    }
}
const builder = {
    type: BasicFormView.name,
    fromJson(json) {
        const view = new BasicFormView();
        view.locale = json.locale;
        view.translations = json.translations;
        return view;
    }
};


/***/ }),

/***/ "../../../forms/src/core/views/index.ts":
/*!**********************************************!*\
  !*** ../../../forms/src/core/views/index.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BasicFormView": () => (/* reexport safe */ _basic_form_view__WEBPACK_IMPORTED_MODULE_0__.BasicFormView),
/* harmony export */   "coreViewBuilders": () => (/* binding */ coreViewBuilders)
/* harmony export */ });
/* harmony import */ var _basic_form_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basic-form-view */ "../../../forms/src/core/views/basic-form-view.ts");


const coreViewBuilders = [_basic_form_view__WEBPACK_IMPORTED_MODULE_0__.builder];


/***/ }),

/***/ "../../../forms/src/exceptions.ts":
/*!****************************************!*\
  !*** ../../../forms/src/exceptions.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormSyntaxError": () => (/* binding */ FormSyntaxError)
/* harmony export */ });
class FormSyntaxError extends SyntaxError {
}


/***/ }),

/***/ "../../../forms/src/field.ts":
/*!***********************************!*\
  !*** ../../../forms/src/field.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Field": () => (/* binding */ Field)
/* harmony export */ });
/* harmony import */ var _core_triggers_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/triggers/true */ "../../../forms/src/core/triggers/true.ts");
/* harmony import */ var _trigger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./trigger */ "../../../forms/src/trigger.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "../../../forms/src/utils/index.ts");



class Field {
    constructor(name, label, viewType, isRequired = _trigger__WEBPACK_IMPORTED_MODULE_1__.Trigger.AlwaysTrue) {
        this.name = name;
        this.label = label;
        this.viewType = viewType;
        this.isRequired = isRequired;
        this.validationConditions = [];
    }
    validate(id, data) {
        return this.validationConditions.map((v) => v.validate(id, data)).flat();
    }
    toJson() {
        return {
            name: this.name,
            label: this.label,
            type: Field.name,
            viewType: this.viewType,
            validationConditions: this.validationConditions.map((v) => v.toJson()),
            isRequired: this.isRequired.trigger instanceof _core_triggers_true__WEBPACK_IMPORTED_MODULE_0__.TrueTriggerCondition
                ? true
                : this.isRequired.trigger.toJson()
        };
    }
    static fromJson(json, builders) {
        var _a, _b;
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isNullOrUndefined)(json.isRequired))
            throw new Error(`Field JSON missing 'isRequired' property`);
        if (!Array.isArray(json.validationConditions))
            throw new Error(`Field JSON 'validationConditions' property is not an array`);
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isNullOrUndefined)(json.name))
            throw new Error(`Field JSON is missing 'name' property`);
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isNullOrUndefined)(json.label))
            throw new Error(`Field JSON is missing 'label' property`);
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.isNullOrUndefined)(json.viewType))
            throw new Error(`Field JSON is mossing 'viewType' property`);
        const isRequiredTrigger = json.isRequired === true
            ? new _core_triggers_true__WEBPACK_IMPORTED_MODULE_0__.TrueTriggerCondition()
            : (_a = builders.triggerConditions
                .find((dt) => dt.type === json.isRequired.type)) === null || _a === void 0 ? void 0 : _a.fromJson(json.isRequired);
        if (typeof isRequiredTrigger === 'undefined')
            throw new Error(`DataTrigger '${(_b = json === null || json === void 0 ? void 0 : json.isRequired) === null || _b === void 0 ? void 0 : _b.type}' not registered`);
        const field = new Field(json.name, json.label, json.viewType, new _trigger__WEBPACK_IMPORTED_MODULE_1__.Trigger(json.name, isRequiredTrigger));
        field.validationConditions = json === null || json === void 0 ? void 0 : json.validationConditions.map((vJson) => {
            const builder = builders.validationConditions.find((v) => v.type === (vJson === null || vJson === void 0 ? void 0 : vJson.type));
            if (!builder)
                throw new Error(`Validation '${vJson === null || vJson === void 0 ? void 0 : vJson.type}' not registered`);
            return builder.fromJson(vJson, builders.validationConditions);
        });
        return field;
    }
}


/***/ }),

/***/ "../../../forms/src/fieldset.ts":
/*!**************************************!*\
  !*** ../../../forms/src/fieldset.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FieldSet": () => (/* binding */ FieldSet)
/* harmony export */ });
/* harmony import */ var _field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./field */ "../../../forms/src/field.ts");
/* harmony import */ var _trigger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./trigger */ "../../../forms/src/trigger.ts");
/* harmony import */ var _core_triggers_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/triggers/true */ "../../../forms/src/core/triggers/true.ts");
/* harmony import */ var _utils_find__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/find */ "../../../forms/src/utils/find.ts");




class FieldSet {
    constructor() {
        this.structure = [];
        this.validationConditions = [];
        this.isRequired = _trigger__WEBPACK_IMPORTED_MODULE_1__.Trigger.AlwaysTrue;
    }
    itemFor(dataId) {
        return (0,_utils_find__WEBPACK_IMPORTED_MODULE_3__.findInForm)(this, dataId);
    }
    withValidations(validations) {
        this.validationConditions.push(...validations);
        return this;
    }
    validate(id, data) {
        const formErrors = this.validationConditions
            .map((validation) => validation.validate(id, data))
            .flat();
        const componentErrors = this.structure
            .map((component) => component.validate(component.name, data[component.name]))
            .flat();
        return formErrors.concat(componentErrors);
    }
    toJson() {
        return {
            name: this.name,
            type: FieldSet.type,
            label: this.label,
            structure: this.structure.map((s) => s.toJson()),
            validationConditions: this.validationConditions.map((v) => v.toJson()),
            isRequired: this.isRequired instanceof _core_triggers_true__WEBPACK_IMPORTED_MODULE_2__.TrueTriggerCondition
                ? true
                : this.isRequired.trigger.toJson()
        };
    }
    static fromJson(json, builders) {
        var _a;
        const fieldSet = new FieldSet();
        fieldSet.name = json.name;
        fieldSet.label = json.label;
        fieldSet.validationConditions = json.validationConditions.map((vJson) => {
            var _a;
            return (_a = builders.validationConditions
                .find((v) => v.type === vJson.name)) === null || _a === void 0 ? void 0 : _a.fromJson(vJson, builders.validationConditions);
        });
        const trigger = json.isRequired === true
            ? new _core_triggers_true__WEBPACK_IMPORTED_MODULE_2__.TrueTriggerCondition()
            : (_a = builders.triggerConditions
                .find((dt) => dt.type === json.isRequired.type)) === null || _a === void 0 ? void 0 : _a.fromJson(json.isRequired);
        if (!trigger) {
            throw new TypeError(`Could not find trigger builder '${json.isRequired.type}'`);
        }
        fieldSet.isRequired = new _trigger__WEBPACK_IMPORTED_MODULE_1__.Trigger(json.name, trigger);
        fieldSet.structure = json.structure.map((valObj) => valObj.type === _field__WEBPACK_IMPORTED_MODULE_0__.Field.name
            ? _field__WEBPACK_IMPORTED_MODULE_0__.Field.fromJson(valObj, builders)
            : FieldSet.fromJson(valObj, builders));
        return fieldSet;
    }
}
FieldSet.type = 'FieldSet';


/***/ }),

/***/ "../../../forms/src/form.ts":
/*!**********************************!*\
  !*** ../../../forms/src/form.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Form": () => (/* binding */ Form)
/* harmony export */ });
/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schema */ "../../../forms/src/schema.ts");
/* harmony import */ var _validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validator */ "../../../forms/src/validator.ts");
/* harmony import */ var _utils_find__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/find */ "../../../forms/src/utils/find.ts");



class Form {
    constructor() {
        this.data = {};
    }
    get validator() {
        return new _validator__WEBPACK_IMPORTED_MODULE_1__.Validator(this.schema.validationConditions, undefined, this.data);
    }
    validatorFor(dataId) {
        var _a;
        const validationConditions = (_a = (0,_utils_find__WEBPACK_IMPORTED_MODULE_2__.findInForm)(this.schema, dataId)) === null || _a === void 0 ? void 0 : _a.validationConditions;
        return validationConditions
            ? new _validator__WEBPACK_IMPORTED_MODULE_1__.Validator(validationConditions, dataId)
            : undefined;
    }
    toJson() {
        return {
            type: Form.type,
            name: this.name,
            data: this.data,
            schema: this.schema.toJson(),
            view: this.view.toJson()
        };
    }
    static fromJson(json, builders) {
        const form = new Form();
        form.data = json.data;
        form.name = json.name;
        form.schema = _schema__WEBPACK_IMPORTED_MODULE_0__.Schema.fromJson(json.schema, builders);
        const viewBuilder = builders.views.find((builder) => builder.type === json.view.type);
        if (!viewBuilder)
            throw Error(`Missing view builder '${json.view.type}'`);
        form.view = viewBuilder.fromJson(json.view);
        return form;
    }
}
Form.type = 'Form';


/***/ }),

/***/ "../../../forms/src/gdpr/gdpr-plugin.ts":
/*!**********************************************!*\
  !*** ../../../forms/src/gdpr/gdpr-plugin.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gdpr": () => (/* binding */ gdpr)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../package.json */ "../../../forms/package.json");

const gdpr = {
    name: `${_package_json__WEBPACK_IMPORTED_MODULE_0__.name}/gdpr`,
    version: _package_json__WEBPACK_IMPORTED_MODULE_0__.version,
    register(builder) {
    }
};


/***/ }),

/***/ "../../../forms/src/gdpr/index.ts":
/*!****************************************!*\
  !*** ../../../forms/src/gdpr/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gdpr": () => (/* reexport safe */ _gdpr_plugin__WEBPACK_IMPORTED_MODULE_0__.gdpr)
/* harmony export */ });
/* harmony import */ var _gdpr_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gdpr-plugin */ "../../../forms/src/gdpr/gdpr-plugin.ts");



/***/ }),

/***/ "../../../forms/src/index.ts":
/*!***********************************!*\
  !*** ../../../forms/src/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Form": () => (/* reexport safe */ _form__WEBPACK_IMPORTED_MODULE_0__.Form),
/* harmony export */   "FormSyntaxError": () => (/* reexport safe */ _exceptions__WEBPACK_IMPORTED_MODULE_1__.FormSyntaxError),
/* harmony export */   "Field": () => (/* reexport safe */ _field__WEBPACK_IMPORTED_MODULE_2__.Field),
/* harmony export */   "FieldSet": () => (/* reexport safe */ _fieldset__WEBPACK_IMPORTED_MODULE_3__.FieldSet),
/* harmony export */   "Schema": () => (/* reexport safe */ _schema__WEBPACK_IMPORTED_MODULE_4__.Schema),
/* harmony export */   "FormsBuilder": () => (/* reexport safe */ _make_form_builder__WEBPACK_IMPORTED_MODULE_5__.FormsBuilder),
/* harmony export */   "makeFormBuilder": () => (/* reexport safe */ _make_form_builder__WEBPACK_IMPORTED_MODULE_5__.makeFormBuilder),
/* harmony export */   "Equals": () => (/* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_7__.Equals),
/* harmony export */   "False": () => (/* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_7__.False),
/* harmony export */   "MinLengthValidation": () => (/* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_7__.MinLengthValidation),
/* harmony export */   "True": () => (/* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_7__.True),
/* harmony export */   "core": () => (/* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_7__.core),
/* harmony export */   "coreTriggerConditionBuilders": () => (/* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_7__.coreTriggerConditionBuilders),
/* harmony export */   "coreValidationBuilders": () => (/* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_7__.coreValidationBuilders),
/* harmony export */   "gdpr": () => (/* reexport safe */ _gdpr__WEBPACK_IMPORTED_MODULE_8__.gdpr),
/* harmony export */   "utils": () => (/* reexport module object */ _utils__WEBPACK_IMPORTED_MODULE_9__),
/* harmony export */   "Trigger": () => (/* reexport safe */ _trigger__WEBPACK_IMPORTED_MODULE_10__.Trigger)
/* harmony export */ });
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form */ "../../../forms/src/form.ts");
/* harmony import */ var _exceptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./exceptions */ "../../../forms/src/exceptions.ts");
/* harmony import */ var _field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./field */ "../../../forms/src/field.ts");
/* harmony import */ var _fieldset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fieldset */ "../../../forms/src/fieldset.ts");
/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./schema */ "../../../forms/src/schema.ts");
/* harmony import */ var _make_form_builder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./make-form-builder */ "../../../forms/src/make-form-builder.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./@types */ "../../../forms/src/@types/index.ts");
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core */ "../../../forms/src/core/index.ts");
/* harmony import */ var _gdpr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./gdpr */ "../../../forms/src/gdpr/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils */ "../../../forms/src/utils/index.ts");
/* harmony import */ var _trigger__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./trigger */ "../../../forms/src/trigger.ts");















/***/ }),

/***/ "../../../forms/src/make-form-builder.ts":
/*!***********************************************!*\
  !*** ../../../forms/src/make-form-builder.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormsBuilder": () => (/* binding */ FormsBuilder),
/* harmony export */   "makeFormBuilder": () => (/* binding */ makeFormBuilder)
/* harmony export */ });
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form */ "../../../forms/src/form.ts");

class FormsBuilder {
    constructor() {
        this.builders = { validationConditions: [], triggerConditions: [], views: [] };
    }
    with(plugin) {
        plugin.register(this);
        return this;
    }
    fromJson(json) {
        return _form__WEBPACK_IMPORTED_MODULE_0__.Form.fromJson(json, this.builders);
    }
}
const makeFormBuilder = () => new FormsBuilder();


/***/ }),

/***/ "../../../forms/src/schema.ts":
/*!************************************!*\
  !*** ../../../forms/src/schema.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Schema": () => (/* binding */ Schema)
/* harmony export */ });
/* harmony import */ var _fieldset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fieldset */ "../../../forms/src/fieldset.ts");

class PluginDependency {
    toJson() {
        return {
            type: PluginDependency.name,
            name: this.name,
            version: this.version
        };
    }
}
class Schema extends _fieldset__WEBPACK_IMPORTED_MODULE_0__.FieldSet {
    constructor() {
        super(...arguments);
        this.dependencies = [];
    }
    toJson() {
        const obj = super.toJson();
        obj.type = Schema.type;
        obj.schemaVersion = this.schemaVersion;
        return obj;
    }
    static fromJson(json, builders) {
        const schema = _fieldset__WEBPACK_IMPORTED_MODULE_0__.FieldSet.fromJson(json, builders);
        schema.schemaVersion = json.schemaVersion;
        schema.name = json.name;
        return schema;
    }
}
Schema.type = 'Schema';


/***/ }),

/***/ "../../../forms/src/trigger.ts":
/*!*************************************!*\
  !*** ../../../forms/src/trigger.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Trigger": () => (/* binding */ Trigger)
/* harmony export */ });
/* harmony import */ var _core_triggers_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/triggers/true */ "../../../forms/src/core/triggers/true.ts");

class Trigger {
    constructor(dataId, trigger) {
        this.dataId = dataId;
        this.trigger = trigger;
    }
    forData(data) {
        return this.trigger.isTriggered(this.dataId || '', data);
    }
}
Trigger.AlwaysTrue = new Trigger(undefined, new _core_triggers_true__WEBPACK_IMPORTED_MODULE_0__.TrueTriggerCondition());


/***/ }),

/***/ "../../../forms/src/utils/find.ts":
/*!****************************************!*\
  !*** ../../../forms/src/utils/find.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findInForm": () => (/* binding */ findInForm),
/* harmony export */   "findInData": () => (/* binding */ findInData)
/* harmony export */ });
/* harmony import */ var _fieldset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../fieldset */ "../../../forms/src/fieldset.ts");
/* harmony import */ var _field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../field */ "../../../forms/src/field.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "../../../forms/src/utils/types.ts");



const findInForm = (item, name) => {
    if (item.name === name) {
        return item;
    }
    if (item instanceof _field__WEBPACK_IMPORTED_MODULE_1__.Field) {
        return undefined;
    }
    if (item instanceof _fieldset__WEBPACK_IMPORTED_MODULE_0__.FieldSet) {
        for (const subItem of item.structure) {
            const result = findInForm(subItem, name);
            if (result) {
                return result;
            }
        }
    }
};
const findInData = (data, dataId) => {
    if ((0,_types__WEBPACK_IMPORTED_MODULE_2__.isNullOrUndefined)(data)) {
        throw new TypeError('data is null or undefined');
    }
    const _findInObject = (obj, dataId) => {
        if (Object.hasOwnProperty.call(obj, dataId)) {
            return obj[dataId];
        }
        else {
            return Object.values(obj).find((child) => child &&
                Object.getPrototypeOf(child) === Object.prototype &&
                typeof _findInObject(child, dataId) !== 'undefined');
        }
    };
    return _findInObject(data, dataId);
};


/***/ }),

/***/ "../../../forms/src/utils/index.ts":
/*!*****************************************!*\
  !*** ../../../forms/src/utils/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasLength": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_0__.hasLength),
/* harmony export */   "hasProperty": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_0__.hasProperty),
/* harmony export */   "isBoolean": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_0__.isBoolean),
/* harmony export */   "isNullOrUndefined": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_0__.isNullOrUndefined),
/* harmony export */   "isNumber": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_0__.isNumber),
/* harmony export */   "isString": () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_0__.isString)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "../../../forms/src/utils/types.ts");



/***/ }),

/***/ "../../../forms/src/utils/types.ts":
/*!*****************************************!*\
  !*** ../../../forms/src/utils/types.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isNullOrUndefined": () => (/* binding */ isNullOrUndefined),
/* harmony export */   "isBoolean": () => (/* binding */ isBoolean),
/* harmony export */   "hasProperty": () => (/* binding */ hasProperty),
/* harmony export */   "hasLength": () => (/* binding */ hasLength),
/* harmony export */   "isString": () => (/* binding */ isString),
/* harmony export */   "isNumber": () => (/* binding */ isNumber)
/* harmony export */ });
const isNullOrUndefined = (value) => value === null || typeof value === 'undefined';
const isBoolean = (value) => typeof value === 'boolean';
const hasProperty = (obj, prop) => typeof obj !== 'undefined' &&
    obj !== null &&
    Object.prototype.hasOwnProperty.call(obj, prop);
const hasLength = (value) => hasProperty(value, 'length');
const isString = (value) => typeof value === 'string' || value instanceof String;
const isNumber = (value) => typeof value === 'number';


/***/ }),

/***/ "../../../forms/src/validator.ts":
/*!***************************************!*\
  !*** ../../../forms/src/validator.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Validator": () => (/* binding */ Validator)
/* harmony export */ });
class Validator {
    constructor(validationConditions, data = {}, dataId) {
        this.validationConditions = validationConditions;
        this.data = data;
        this.dataId = dataId;
    }
    validate(data) {
        if (typeof data === 'undefined' && typeof this.data === 'undefined') {
            throw new TypeError('No data supplied for validation');
        }
        return this.validationConditions
            .map((v) => v.validate(this.dataId, data))
            .flat();
    }
}


/***/ }),

/***/ "../../package.json":
/*!**************************!*\
  !*** ../../package.json ***!
  \**************************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"@tngbl/forms-nunjucks","version":"0.0.0","description":"","author":"Brendan Arnold <brendanarnold@gmail.com>","homepage":"https://github.com/brendanarnold/arnold-research-monorepo#readme","license":"ISC","main":"src/index.ts","repository":{"type":"git","url":"git+https://github.com/brendanarnold/arnold-research-monorepo.git"},"scripts":{"tsc":"npx tsc","tsc:watch":"npx tsc --watch --project ./tsconfig.browser.json --project ./tsconfig.server.json","test":"npx jest","test:dev":"npx jest --watch","serve":"node build/interfaces/www/app.js"},"bugs":{"url":"https://github.com/brendanarnold/arnold-research-monorepo/issues"},"dependencies":{"express":"^4.17.1","nunjucks":"^3.2.2","polyglot":"^0.5.0"},"devDependencies":{"@types/express":"^4.17.11","@types/jest":"^26.0.19","@types/node":"^14.14.16","@types/node-polyglot":"^2.4.1","@types/nunjucks":"^3.1.3","jest":"^26.6.3","node-polyglot":"^2.4.0","prettier":"^2.2.1","ts-jest":"^26.4.4","typescript":"^4.1.3"}}');

/***/ }),

/***/ "../../../forms/package.json":
/*!***********************************!*\
  !*** ../../../forms/package.json ***!
  \***********************************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"@tngbl/forms","version":"1.0.0","description":"","main":"src/index.ts","scripts":{"tsc":"npx tsc","tsc:watch":"npx tsc --watch --project ./tsconfig.json","test":"npx jest","test:dev":"npx jest --watch","dev":"npx parcel src/index.ts","build":"npx parcel build src/index.ts"},"author":"","license":"ISC","dependencies":{"@tngbl/auth":"^1.0.0","@tngbl/forms":"*","@tngbl/secure-store":"*","i18n":"^0.13.2","node-polyglot":"^2.4.0"},"devDependencies":{"@types/jest":"^26.0.19","@types/node":"^14.14.16","@types/node-polyglot":"^2.4.1","jest":"^26.6.3","prettier":"^2.2.1","ts-jest":"^26.4.4","typescript":"^4.1.3"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/browser/index.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tngbl_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tngbl/forms */ "../../../forms/src/index.ts");
/* harmony import */ var _src_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../src/browser */ "../../src/browser/index.ts");
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../templates */ "./src/templates/index.ts");



const builder = (0,_tngbl_forms__WEBPACK_IMPORTED_MODULE_0__.makeFormBuilder)().with(_tngbl_forms__WEBPACK_IMPORTED_MODULE_0__.core).with((0,_src_browser__WEBPACK_IMPORTED_MODULE_1__.pageValidation)({ hooks: _templates__WEBPACK_IMPORTED_MODULE_2__.hooks }));
window['tngbl'] = {
    builder
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9jYWxsLWJpbmQvY2FsbEJvdW5kLmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vbm9kZV9tb2R1bGVzL2NhbGwtYmluZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9kZWZpbmUtcHJvcGVydGllcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9lcy1hYnN0cmFjdC8yMDIwL1JlcXVpcmVPYmplY3RDb2VyY2libGUuanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9ub2RlX21vZHVsZXMvZXMtYWJzdHJhY3QvMjAyMC9Ub1N0cmluZy5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9lcy1hYnN0cmFjdC81L0NoZWNrT2JqZWN0Q29lcmNpYmxlLmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vbm9kZV9tb2R1bGVzL2Zvci1lYWNoL2luZGV4LmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vbm9kZV9tb2R1bGVzL2Z1bmN0aW9uLWJpbmQvaW1wbGVtZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9ub2RlX21vZHVsZXMvZnVuY3Rpb24tYmluZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9nZXQtaW50cmluc2ljL2luZGV4LmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vbm9kZV9tb2R1bGVzL2hhcy1zeW1ib2xzL2luZGV4LmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vbm9kZV9tb2R1bGVzL2hhcy1zeW1ib2xzL3NoYW1zLmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vbm9kZV9tb2R1bGVzL2hhcy9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9ub2RlX21vZHVsZXMvaXMtY2FsbGFibGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9ub2RlX21vZHVsZXMvbm9kZS1wb2x5Z2xvdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pc0FyZ3VtZW50cy5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9zdHJpbmcucHJvdG90eXBlLnRyaW0vaW1wbGVtZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9ub2RlX21vZHVsZXMvc3RyaW5nLnByb3RvdHlwZS50cmltL2luZGV4LmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vbm9kZV9tb2R1bGVzL3N0cmluZy5wcm90b3R5cGUudHJpbS9wb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9zdHJpbmcucHJvdG90eXBlLnRyaW0vc2hpbS5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy93YXJuaW5nL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uL3NyYy90ZW1wbGF0ZXMvZmF2b3VyaXRlLWNvbG91ci50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4vc3JjL3RlbXBsYXRlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL3NyYy9icm93c2VyL2luZGV4LnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vc3JjL2Jyb3dzZXIvcGFnZS12YWxpZGF0aW9uLXBsdWdpbi50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL3NyYy90ZW1wbGF0ZXMvZXJyb3ItYmxvY2sudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9zcmMvdGVtcGxhdGVzL2luZGV4LnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vc3JjL3RlbXBsYXRlcy9uZXctcGFzc3dvcmQudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvY29yZS9jb3JlLXBsdWdpbi50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL2Zvcm1zL3NyYy9jb3JlL2luZGV4LnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL2NvcmUvdHJpZ2dlcnMvZXF1YWxzLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL2NvcmUvdHJpZ2dlcnMvZmFsc2UudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvY29yZS90cmlnZ2Vycy9pbmRleC50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL2Zvcm1zL3NyYy9jb3JlL3RyaWdnZXJzL3RydWUudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvY29yZS92YWxpZGF0aW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL2Zvcm1zL3NyYy9jb3JlL3ZhbGlkYXRpb25zL21pbi1sZW5ndGgudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvY29yZS92aWV3cy9iYXNpYy1mb3JtLXZpZXcudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvY29yZS92aWV3cy9pbmRleC50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL2Zvcm1zL3NyYy9leGNlcHRpb25zLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL2ZpZWxkLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL2ZpZWxkc2V0LnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL2Zvcm0udHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvZ2Rwci9nZHByLXBsdWdpbi50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL2Zvcm1zL3NyYy9nZHByL2luZGV4LnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL2luZGV4LnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL21ha2UtZm9ybS1idWlsZGVyLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL3NjaGVtYS50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL2Zvcm1zL3NyYy90cmlnZ2VyLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL3V0aWxzL2ZpbmQudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvdXRpbHMvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvdmFsaWRhdG9yLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi9zcmMvYnJvd3Nlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7O0FBRWIsbUJBQW1CLG1CQUFPLENBQUMsc0VBQWU7O0FBRTFDLGVBQWUsbUJBQU8sQ0FBQyx1REFBSTs7QUFFM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDZGE7O0FBRWIsV0FBVyxtQkFBTyxDQUFDLHNFQUFlO0FBQ2xDLG1CQUFtQixtQkFBTyxDQUFDLHNFQUFlOztBQUUxQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztB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Ozs7Ozs7Ozs7OztVQ2xCRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsZ0NBQWdDLFlBQVk7V0FDNUM7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7QUNOb0Q7QUFDSTtBQUNwQjtBQUVwQyxNQUFNLE9BQU8sR0FBRyw2REFBZSxFQUFFLENBQUMsSUFBSSxDQUFDLDhDQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsNERBQWMsQ0FBQyxFQUFFLEtBQUssaURBQUUsQ0FBQyxDQUFDO0FBRTVFLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRztJQUNoQixPQUFPO0NBQ1IiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnZ2V0LWludHJpbnNpYycpO1xuXG52YXIgY2FsbEJpbmQgPSByZXF1aXJlKCcuLycpO1xuXG52YXIgJGluZGV4T2YgPSBjYWxsQmluZChHZXRJbnRyaW5zaWMoJ1N0cmluZy5wcm90b3R5cGUuaW5kZXhPZicpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxsQm91bmRJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdHZhciBpbnRyaW5zaWMgPSBHZXRJbnRyaW5zaWMobmFtZSwgISFhbGxvd01pc3NpbmcpO1xuXHRpZiAodHlwZW9mIGludHJpbnNpYyA9PT0gJ2Z1bmN0aW9uJyAmJiAkaW5kZXhPZihuYW1lLCAnLnByb3RvdHlwZS4nKSA+IC0xKSB7XG5cdFx0cmV0dXJuIGNhbGxCaW5kKGludHJpbnNpYyk7XG5cdH1cblx0cmV0dXJuIGludHJpbnNpYztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyICRhcHBseSA9IEdldEludHJpbnNpYygnJUZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseSUnKTtcbnZhciAkY2FsbCA9IEdldEludHJpbnNpYygnJUZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsJScpO1xudmFyICRyZWZsZWN0QXBwbHkgPSBHZXRJbnRyaW5zaWMoJyVSZWZsZWN0LmFwcGx5JScsIHRydWUpIHx8IGJpbmQuY2FsbCgkY2FsbCwgJGFwcGx5KTtcblxudmFyICRnT1BEID0gR2V0SW50cmluc2ljKCclT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciUnLCB0cnVlKTtcbnZhciAkZGVmaW5lUHJvcGVydHkgPSBHZXRJbnRyaW5zaWMoJyVPYmplY3QuZGVmaW5lUHJvcGVydHklJywgdHJ1ZSk7XG52YXIgJG1heCA9IEdldEludHJpbnNpYygnJU1hdGgubWF4JScpO1xuXG5pZiAoJGRlZmluZVByb3BlcnR5KSB7XG5cdHRyeSB7XG5cdFx0JGRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgdmFsdWU6IDEgfSk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBJRSA4IGhhcyBhIGJyb2tlbiBkZWZpbmVQcm9wZXJ0eVxuXHRcdCRkZWZpbmVQcm9wZXJ0eSA9IG51bGw7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxsQmluZChvcmlnaW5hbEZ1bmN0aW9uKSB7XG5cdHZhciBmdW5jID0gJHJlZmxlY3RBcHBseShiaW5kLCAkY2FsbCwgYXJndW1lbnRzKTtcblx0aWYgKCRnT1BEICYmICRkZWZpbmVQcm9wZXJ0eSkge1xuXHRcdHZhciBkZXNjID0gJGdPUEQoZnVuYywgJ2xlbmd0aCcpO1xuXHRcdGlmIChkZXNjLmNvbmZpZ3VyYWJsZSkge1xuXHRcdFx0Ly8gb3JpZ2luYWwgbGVuZ3RoLCBwbHVzIHRoZSByZWNlaXZlciwgbWludXMgYW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIChhZnRlciB0aGUgcmVjZWl2ZXIpXG5cdFx0XHQkZGVmaW5lUHJvcGVydHkoXG5cdFx0XHRcdGZ1bmMsXG5cdFx0XHRcdCdsZW5ndGgnLFxuXHRcdFx0XHR7IHZhbHVlOiAxICsgJG1heCgwLCBvcmlnaW5hbEZ1bmN0aW9uLmxlbmd0aCAtIChhcmd1bWVudHMubGVuZ3RoIC0gMSkpIH1cblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBmdW5jO1xufTtcblxudmFyIGFwcGx5QmluZCA9IGZ1bmN0aW9uIGFwcGx5QmluZCgpIHtcblx0cmV0dXJuICRyZWZsZWN0QXBwbHkoYmluZCwgJGFwcGx5LCBhcmd1bWVudHMpO1xufTtcblxuaWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHQkZGVmaW5lUHJvcGVydHkobW9kdWxlLmV4cG9ydHMsICdhcHBseScsIHsgdmFsdWU6IGFwcGx5QmluZCB9KTtcbn0gZWxzZSB7XG5cdG1vZHVsZS5leHBvcnRzLmFwcGx5ID0gYXBwbHlCaW5kO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5cyA9IHJlcXVpcmUoJ29iamVjdC1rZXlzJyk7XG52YXIgaGFzU3ltYm9scyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbCgnZm9vJykgPT09ICdzeW1ib2wnO1xuXG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGNvbmNhdCA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQ7XG52YXIgb3JpZ0RlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG52YXIgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uIChmbikge1xuXHRyZXR1cm4gdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nICYmIHRvU3RyLmNhbGwoZm4pID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufTtcblxudmFyIGFyZVByb3BlcnR5RGVzY3JpcHRvcnNTdXBwb3J0ZWQgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBvYmogPSB7fTtcblx0dHJ5IHtcblx0XHRvcmlnRGVmaW5lUHJvcGVydHkob2JqLCAneCcsIHsgZW51bWVyYWJsZTogZmFsc2UsIHZhbHVlOiBvYmogfSk7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzLCBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdGZvciAodmFyIF8gaW4gb2JqKSB7IC8vIGpzY3M6aWdub3JlIGRpc2FsbG93VW51c2VkVmFyaWFibGVzXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiBvYmoueCA9PT0gb2JqO1xuXHR9IGNhdGNoIChlKSB7IC8qIHRoaXMgaXMgSUUgOC4gKi9cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn07XG52YXIgc3VwcG9ydHNEZXNjcmlwdG9ycyA9IG9yaWdEZWZpbmVQcm9wZXJ0eSAmJiBhcmVQcm9wZXJ0eURlc2NyaXB0b3JzU3VwcG9ydGVkKCk7XG5cbnZhciBkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWUsIHZhbHVlLCBwcmVkaWNhdGUpIHtcblx0aWYgKG5hbWUgaW4gb2JqZWN0ICYmICghaXNGdW5jdGlvbihwcmVkaWNhdGUpIHx8ICFwcmVkaWNhdGUoKSkpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0aWYgKHN1cHBvcnRzRGVzY3JpcHRvcnMpIHtcblx0XHRvcmlnRGVmaW5lUHJvcGVydHkob2JqZWN0LCBuYW1lLCB7XG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRcdHdyaXRhYmxlOiB0cnVlXG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0b2JqZWN0W25hbWVdID0gdmFsdWU7XG5cdH1cbn07XG5cbnZhciBkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKG9iamVjdCwgbWFwKSB7XG5cdHZhciBwcmVkaWNhdGVzID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB7fTtcblx0dmFyIHByb3BzID0ga2V5cyhtYXApO1xuXHRpZiAoaGFzU3ltYm9scykge1xuXHRcdHByb3BzID0gY29uY2F0LmNhbGwocHJvcHMsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMobWFwKSk7XG5cdH1cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdGRlZmluZVByb3BlcnR5KG9iamVjdCwgcHJvcHNbaV0sIG1hcFtwcm9wc1tpXV0sIHByZWRpY2F0ZXNbcHJvcHNbaV1dKTtcblx0fVxufTtcblxuZGVmaW5lUHJvcGVydGllcy5zdXBwb3J0c0Rlc2NyaXB0b3JzID0gISFzdXBwb3J0c0Rlc2NyaXB0b3JzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmluZVByb3BlcnRpZXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vNS9DaGVja09iamVjdENvZXJjaWJsZScpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnZ2V0LWludHJpbnNpYycpO1xuXG52YXIgJFN0cmluZyA9IEdldEludHJpbnNpYygnJVN0cmluZyUnKTtcbnZhciAkVHlwZUVycm9yID0gR2V0SW50cmluc2ljKCclVHlwZUVycm9yJScpO1xuXG4vLyBodHRwczovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtdG9zdHJpbmdcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBUb1N0cmluZyhhcmd1bWVudCkge1xuXHRpZiAodHlwZW9mIGFyZ3VtZW50ID09PSAnc3ltYm9sJykge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCBhIFN5bWJvbCB2YWx1ZSB0byBhIHN0cmluZycpO1xuXHR9XG5cdHJldHVybiAkU3RyaW5nKGFyZ3VtZW50KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdnZXQtaW50cmluc2ljJyk7XG5cbnZhciAkVHlwZUVycm9yID0gR2V0SW50cmluc2ljKCclVHlwZUVycm9yJScpO1xuXG4vLyBodHRwOi8vMjYyLmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvNS4xLyNzZWMtOS4xMFxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIENoZWNrT2JqZWN0Q29lcmNpYmxlKHZhbHVlLCBvcHRNZXNzYWdlKSB7XG5cdGlmICh2YWx1ZSA9PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3Iob3B0TWVzc2FnZSB8fCAoJ0Nhbm5vdCBjYWxsIG1ldGhvZCBvbiAnICsgdmFsdWUpKTtcblx0fVxuXHRyZXR1cm4gdmFsdWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJ2lzLWNhbGxhYmxlJyk7XG5cbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgZm9yRWFjaEFycmF5ID0gZnVuY3Rpb24gZm9yRWFjaEFycmF5KGFycmF5LCBpdGVyYXRvciwgcmVjZWl2ZXIpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoYXJyYXksIGkpKSB7XG4gICAgICAgICAgICBpZiAocmVjZWl2ZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yKGFycmF5W2ldLCBpLCBhcnJheSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwocmVjZWl2ZXIsIGFycmF5W2ldLCBpLCBhcnJheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgZm9yRWFjaFN0cmluZyA9IGZ1bmN0aW9uIGZvckVhY2hTdHJpbmcoc3RyaW5nLCBpdGVyYXRvciwgcmVjZWl2ZXIpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc3RyaW5nLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIC8vIG5vIHN1Y2ggdGhpbmcgYXMgYSBzcGFyc2Ugc3RyaW5nLlxuICAgICAgICBpZiAocmVjZWl2ZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgaXRlcmF0b3Ioc3RyaW5nLmNoYXJBdChpKSwgaSwgc3RyaW5nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwocmVjZWl2ZXIsIHN0cmluZy5jaGFyQXQoaSksIGksIHN0cmluZyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgZm9yRWFjaE9iamVjdCA9IGZ1bmN0aW9uIGZvckVhY2hPYmplY3Qob2JqZWN0LCBpdGVyYXRvciwgcmVjZWl2ZXIpIHtcbiAgICBmb3IgKHZhciBrIGluIG9iamVjdCkge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGspKSB7XG4gICAgICAgICAgICBpZiAocmVjZWl2ZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yKG9iamVjdFtrXSwgaywgb2JqZWN0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChyZWNlaXZlciwgb2JqZWN0W2tdLCBrLCBvYmplY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIGZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGxpc3QsIGl0ZXJhdG9yLCB0aGlzQXJnKSB7XG4gICAgaWYgKCFpc0NhbGxhYmxlKGl0ZXJhdG9yKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpdGVyYXRvciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICB2YXIgcmVjZWl2ZXI7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMykge1xuICAgICAgICByZWNlaXZlciA9IHRoaXNBcmc7XG4gICAgfVxuXG4gICAgaWYgKHRvU3RyLmNhbGwobGlzdCkgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgZm9yRWFjaEFycmF5KGxpc3QsIGl0ZXJhdG9yLCByZWNlaXZlcik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZm9yRWFjaFN0cmluZyhsaXN0LCBpdGVyYXRvciwgcmVjZWl2ZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvckVhY2hPYmplY3QobGlzdCwgaXRlcmF0b3IsIHJlY2VpdmVyKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZvckVhY2g7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qIGVzbGludCBuby1pbnZhbGlkLXRoaXM6IDEgKi9cblxudmFyIEVSUk9SX01FU1NBR0UgPSAnRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgY2FsbGVkIG9uIGluY29tcGF0aWJsZSAnO1xudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBmdW5jVHlwZSA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZCh0aGF0KSB7XG4gICAgdmFyIHRhcmdldCA9IHRoaXM7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09ICdmdW5jdGlvbicgfHwgdG9TdHIuY2FsbCh0YXJnZXQpICE9PSBmdW5jVHlwZSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEVSUk9SX01FU1NBR0UgKyB0YXJnZXQpO1xuICAgIH1cbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICAgIHZhciBib3VuZDtcbiAgICB2YXIgYmluZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIGJvdW5kKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGFyZ2V0LmFwcGx5KFxuICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChPYmplY3QocmVzdWx0KSA9PT0gcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5hcHBseShcbiAgICAgICAgICAgICAgICB0aGF0LFxuICAgICAgICAgICAgICAgIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGJvdW5kTGVuZ3RoID0gTWF0aC5tYXgoMCwgdGFyZ2V0Lmxlbmd0aCAtIGFyZ3MubGVuZ3RoKTtcbiAgICB2YXIgYm91bmRBcmdzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib3VuZExlbmd0aDsgaSsrKSB7XG4gICAgICAgIGJvdW5kQXJncy5wdXNoKCckJyArIGkpO1xuICAgIH1cblxuICAgIGJvdW5kID0gRnVuY3Rpb24oJ2JpbmRlcicsICdyZXR1cm4gZnVuY3Rpb24gKCcgKyBib3VuZEFyZ3Muam9pbignLCcpICsgJyl7IHJldHVybiBiaW5kZXIuYXBwbHkodGhpcyxhcmd1bWVudHMpOyB9JykoYmluZGVyKTtcblxuICAgIGlmICh0YXJnZXQucHJvdG90eXBlKSB7XG4gICAgICAgIHZhciBFbXB0eSA9IGZ1bmN0aW9uIEVtcHR5KCkge307XG4gICAgICAgIEVtcHR5LnByb3RvdHlwZSA9IHRhcmdldC5wcm90b3R5cGU7XG4gICAgICAgIGJvdW5kLnByb3RvdHlwZSA9IG5ldyBFbXB0eSgpO1xuICAgICAgICBFbXB0eS5wcm90b3R5cGUgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBib3VuZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbXBsZW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCB8fCBpbXBsZW1lbnRhdGlvbjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHVuZGVmaW5lZDtcblxudmFyICRTeW50YXhFcnJvciA9IFN5bnRheEVycm9yO1xudmFyICRGdW5jdGlvbiA9IEZ1bmN0aW9uO1xudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxudmFyIGdldEV2YWxsZWRDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChleHByZXNzaW9uU3ludGF4KSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuICRGdW5jdGlvbignXCJ1c2Ugc3RyaWN0XCI7IHJldHVybiAoJyArIGV4cHJlc3Npb25TeW50YXggKyAnKS5jb25zdHJ1Y3RvcjsnKSgpO1xuXHR9IGNhdGNoIChlKSB7fVxufTtcblxudmFyICRnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbmlmICgkZ09QRCkge1xuXHR0cnkge1xuXHRcdCRnT1BEKHt9LCAnJyk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQkZ09QRCA9IG51bGw7IC8vIHRoaXMgaXMgSUUgOCwgd2hpY2ggaGFzIGEgYnJva2VuIGdPUERcblx0fVxufVxuXG52YXIgdGhyb3dUeXBlRXJyb3IgPSBmdW5jdGlvbiAoKSB7XG5cdHRocm93IG5ldyAkVHlwZUVycm9yKCk7XG59O1xudmFyIFRocm93VHlwZUVycm9yID0gJGdPUERcblx0PyAoZnVuY3Rpb24gKCkge1xuXHRcdHRyeSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zLCBuby1jYWxsZXIsIG5vLXJlc3RyaWN0ZWQtcHJvcGVydGllc1xuXHRcdFx0YXJndW1lbnRzLmNhbGxlZTsgLy8gSUUgOCBkb2VzIG5vdCB0aHJvdyBoZXJlXG5cdFx0XHRyZXR1cm4gdGhyb3dUeXBlRXJyb3I7XG5cdFx0fSBjYXRjaCAoY2FsbGVlVGhyb3dzKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHQvLyBJRSA4IHRocm93cyBvbiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGFyZ3VtZW50cywgJycpXG5cdFx0XHRcdHJldHVybiAkZ09QRChhcmd1bWVudHMsICdjYWxsZWUnKS5nZXQ7XG5cdFx0XHR9IGNhdGNoIChnT1BEdGhyb3dzKSB7XG5cdFx0XHRcdHJldHVybiB0aHJvd1R5cGVFcnJvcjtcblx0XHRcdH1cblx0XHR9XG5cdH0oKSlcblx0OiB0aHJvd1R5cGVFcnJvcjtcblxudmFyIGhhc1N5bWJvbHMgPSByZXF1aXJlKCdoYXMtc3ltYm9scycpKCk7XG5cbnZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5fX3Byb3RvX187IH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG9cblxudmFyIG5lZWRzRXZhbCA9IHt9O1xuXG52YXIgVHlwZWRBcnJheSA9IHR5cGVvZiBVaW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IGdldFByb3RvKFVpbnQ4QXJyYXkpO1xuXG52YXIgSU5UUklOU0lDUyA9IHtcblx0JyVBZ2dyZWdhdGVFcnJvciUnOiB0eXBlb2YgQWdncmVnYXRlRXJyb3IgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQWdncmVnYXRlRXJyb3IsXG5cdCclQXJyYXklJzogQXJyYXksXG5cdCclQXJyYXlCdWZmZXIlJzogdHlwZW9mIEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEFycmF5QnVmZmVyLFxuXHQnJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyA/IGdldFByb3RvKFtdW1N5bWJvbC5pdGVyYXRvcl0oKSkgOiB1bmRlZmluZWQsXG5cdCclQXN5bmNGcm9tU3luY0l0ZXJhdG9yUHJvdG90eXBlJSc6IHVuZGVmaW5lZCxcblx0JyVBc3luY0Z1bmN0aW9uJSc6IG5lZWRzRXZhbCxcblx0JyVBc3luY0dlbmVyYXRvciUnOiBuZWVkc0V2YWwsXG5cdCclQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiUnOiBuZWVkc0V2YWwsXG5cdCclQXN5bmNJdGVyYXRvclByb3RvdHlwZSUnOiBuZWVkc0V2YWwsXG5cdCclQXRvbWljcyUnOiB0eXBlb2YgQXRvbWljcyA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBdG9taWNzLFxuXHQnJUJpZ0ludCUnOiB0eXBlb2YgQmlnSW50ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEJpZ0ludCxcblx0JyVCb29sZWFuJSc6IEJvb2xlYW4sXG5cdCclRGF0YVZpZXclJzogdHlwZW9mIERhdGFWaWV3ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IERhdGFWaWV3LFxuXHQnJURhdGUlJzogRGF0ZSxcblx0JyVkZWNvZGVVUkklJzogZGVjb2RlVVJJLFxuXHQnJWRlY29kZVVSSUNvbXBvbmVudCUnOiBkZWNvZGVVUklDb21wb25lbnQsXG5cdCclZW5jb2RlVVJJJSc6IGVuY29kZVVSSSxcblx0JyVlbmNvZGVVUklDb21wb25lbnQlJzogZW5jb2RlVVJJQ29tcG9uZW50LFxuXHQnJUVycm9yJSc6IEVycm9yLFxuXHQnJWV2YWwlJzogZXZhbCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1ldmFsXG5cdCclRXZhbEVycm9yJSc6IEV2YWxFcnJvcixcblx0JyVGbG9hdDMyQXJyYXklJzogdHlwZW9mIEZsb2F0MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGbG9hdDMyQXJyYXksXG5cdCclRmxvYXQ2NEFycmF5JSc6IHR5cGVvZiBGbG9hdDY0QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmxvYXQ2NEFycmF5LFxuXHQnJUZpbmFsaXphdGlvblJlZ2lzdHJ5JSc6IHR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGaW5hbGl6YXRpb25SZWdpc3RyeSxcblx0JyVGdW5jdGlvbiUnOiAkRnVuY3Rpb24sXG5cdCclR2VuZXJhdG9yRnVuY3Rpb24lJzogbmVlZHNFdmFsLFxuXHQnJUludDhBcnJheSUnOiB0eXBlb2YgSW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDhBcnJheSxcblx0JyVJbnQxNkFycmF5JSc6IHR5cGVvZiBJbnQxNkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDE2QXJyYXksXG5cdCclSW50MzJBcnJheSUnOiB0eXBlb2YgSW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQzMkFycmF5LFxuXHQnJWlzRmluaXRlJSc6IGlzRmluaXRlLFxuXHQnJWlzTmFOJSc6IGlzTmFOLFxuXHQnJUl0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90byhnZXRQcm90byhbXVtTeW1ib2wuaXRlcmF0b3JdKCkpKSA6IHVuZGVmaW5lZCxcblx0JyVKU09OJSc6IHR5cGVvZiBKU09OID09PSAnb2JqZWN0JyA/IEpTT04gOiB1bmRlZmluZWQsXG5cdCclTWFwJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogTWFwLFxuXHQnJU1hcEl0ZXJhdG9yUHJvdG90eXBlJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNTeW1ib2xzID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8obmV3IE1hcCgpW1N5bWJvbC5pdGVyYXRvcl0oKSksXG5cdCclTWF0aCUnOiBNYXRoLFxuXHQnJU51bWJlciUnOiBOdW1iZXIsXG5cdCclT2JqZWN0JSc6IE9iamVjdCxcblx0JyVwYXJzZUZsb2F0JSc6IHBhcnNlRmxvYXQsXG5cdCclcGFyc2VJbnQlJzogcGFyc2VJbnQsXG5cdCclUHJvbWlzZSUnOiB0eXBlb2YgUHJvbWlzZSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBQcm9taXNlLFxuXHQnJVByb3h5JSc6IHR5cGVvZiBQcm94eSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBQcm94eSxcblx0JyVSYW5nZUVycm9yJSc6IFJhbmdlRXJyb3IsXG5cdCclUmVmZXJlbmNlRXJyb3IlJzogUmVmZXJlbmNlRXJyb3IsXG5cdCclUmVmbGVjdCUnOiB0eXBlb2YgUmVmbGVjdCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBSZWZsZWN0LFxuXHQnJVJlZ0V4cCUnOiBSZWdFeHAsXG5cdCclU2V0JSc6IHR5cGVvZiBTZXQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogU2V0LFxuXHQnJVNldEl0ZXJhdG9yUHJvdG90eXBlJSc6IHR5cGVvZiBTZXQgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNTeW1ib2xzID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8obmV3IFNldCgpW1N5bWJvbC5pdGVyYXRvcl0oKSksXG5cdCclU2hhcmVkQXJyYXlCdWZmZXIlJzogdHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFNoYXJlZEFycmF5QnVmZmVyLFxuXHQnJVN0cmluZyUnOiBTdHJpbmcsXG5cdCclU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyA/IGdldFByb3RvKCcnW1N5bWJvbC5pdGVyYXRvcl0oKSkgOiB1bmRlZmluZWQsXG5cdCclU3ltYm9sJSc6IGhhc1N5bWJvbHMgPyBTeW1ib2wgOiB1bmRlZmluZWQsXG5cdCclU3ludGF4RXJyb3IlJzogJFN5bnRheEVycm9yLFxuXHQnJVRocm93VHlwZUVycm9yJSc6IFRocm93VHlwZUVycm9yLFxuXHQnJVR5cGVkQXJyYXklJzogVHlwZWRBcnJheSxcblx0JyVUeXBlRXJyb3IlJzogJFR5cGVFcnJvcixcblx0JyVVaW50OEFycmF5JSc6IHR5cGVvZiBVaW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQ4QXJyYXksXG5cdCclVWludDhDbGFtcGVkQXJyYXklJzogdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQ4Q2xhbXBlZEFycmF5LFxuXHQnJVVpbnQxNkFycmF5JSc6IHR5cGVvZiBVaW50MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50MTZBcnJheSxcblx0JyVVaW50MzJBcnJheSUnOiB0eXBlb2YgVWludDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDMyQXJyYXksXG5cdCclVVJJRXJyb3IlJzogVVJJRXJyb3IsXG5cdCclV2Vha01hcCUnOiB0eXBlb2YgV2Vha01hcCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrTWFwLFxuXHQnJVdlYWtSZWYlJzogdHlwZW9mIFdlYWtSZWYgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha1JlZixcblx0JyVXZWFrU2V0JSc6IHR5cGVvZiBXZWFrU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtTZXRcbn07XG5cbnZhciBkb0V2YWwgPSBmdW5jdGlvbiBkb0V2YWwobmFtZSkge1xuXHR2YXIgdmFsdWU7XG5cdGlmIChuYW1lID09PSAnJUFzeW5jRnVuY3Rpb24lJykge1xuXHRcdHZhbHVlID0gZ2V0RXZhbGxlZENvbnN0cnVjdG9yKCdhc3luYyBmdW5jdGlvbiAoKSB7fScpO1xuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclR2VuZXJhdG9yRnVuY3Rpb24lJykge1xuXHRcdHZhbHVlID0gZ2V0RXZhbGxlZENvbnN0cnVjdG9yKCdmdW5jdGlvbiogKCkge30nKTtcblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUFzeW5jR2VuZXJhdG9yRnVuY3Rpb24lJykge1xuXHRcdHZhbHVlID0gZ2V0RXZhbGxlZENvbnN0cnVjdG9yKCdhc3luYyBmdW5jdGlvbiogKCkge30nKTtcblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUFzeW5jR2VuZXJhdG9yJScpIHtcblx0XHR2YXIgZm4gPSBkb0V2YWwoJyVBc3luY0dlbmVyYXRvckZ1bmN0aW9uJScpO1xuXHRcdGlmIChmbikge1xuXHRcdFx0dmFsdWUgPSBmbi5wcm90b3R5cGU7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclQXN5bmNJdGVyYXRvclByb3RvdHlwZSUnKSB7XG5cdFx0dmFyIGdlbiA9IGRvRXZhbCgnJUFzeW5jR2VuZXJhdG9yJScpO1xuXHRcdGlmIChnZW4pIHtcblx0XHRcdHZhbHVlID0gZ2V0UHJvdG8oZ2VuLnByb3RvdHlwZSk7XG5cdFx0fVxuXHR9XG5cblx0SU5UUklOU0lDU1tuYW1lXSA9IHZhbHVlO1xuXG5cdHJldHVybiB2YWx1ZTtcbn07XG5cbnZhciBMRUdBQ1lfQUxJQVNFUyA9IHtcblx0JyVBcnJheUJ1ZmZlclByb3RvdHlwZSUnOiBbJ0FycmF5QnVmZmVyJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFycmF5UHJvdG90eXBlJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclQXJyYXlQcm90b19lbnRyaWVzJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ2VudHJpZXMnXSxcblx0JyVBcnJheVByb3RvX2ZvckVhY2glJzogWydBcnJheScsICdwcm90b3R5cGUnLCAnZm9yRWFjaCddLFxuXHQnJUFycmF5UHJvdG9fa2V5cyUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICdrZXlzJ10sXG5cdCclQXJyYXlQcm90b192YWx1ZXMlJzogWydBcnJheScsICdwcm90b3R5cGUnLCAndmFsdWVzJ10sXG5cdCclQXN5bmNGdW5jdGlvblByb3RvdHlwZSUnOiBbJ0FzeW5jRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclQXN5bmNHZW5lcmF0b3IlJzogWydBc3luY0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFzeW5jR2VuZXJhdG9yUHJvdG90eXBlJSc6IFsnQXN5bmNHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnLCAncHJvdG90eXBlJ10sXG5cdCclQm9vbGVhblByb3RvdHlwZSUnOiBbJ0Jvb2xlYW4nLCAncHJvdG90eXBlJ10sXG5cdCclRGF0YVZpZXdQcm90b3R5cGUlJzogWydEYXRhVmlldycsICdwcm90b3R5cGUnXSxcblx0JyVEYXRlUHJvdG90eXBlJSc6IFsnRGF0ZScsICdwcm90b3R5cGUnXSxcblx0JyVFcnJvclByb3RvdHlwZSUnOiBbJ0Vycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJUV2YWxFcnJvclByb3RvdHlwZSUnOiBbJ0V2YWxFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVGbG9hdDMyQXJyYXlQcm90b3R5cGUlJzogWydGbG9hdDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclRmxvYXQ2NEFycmF5UHJvdG90eXBlJSc6IFsnRmxvYXQ2NEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUZ1bmN0aW9uUHJvdG90eXBlJSc6IFsnRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclR2VuZXJhdG9yJSc6IFsnR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclR2VuZXJhdG9yUHJvdG90eXBlJSc6IFsnR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJywgJ3Byb3RvdHlwZSddLFxuXHQnJUludDhBcnJheVByb3RvdHlwZSUnOiBbJ0ludDhBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQxNkFycmF5UHJvdG90eXBlJSc6IFsnSW50MTZBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQzMkFycmF5UHJvdG90eXBlJSc6IFsnSW50MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVKU09OUGFyc2UlJzogWydKU09OJywgJ3BhcnNlJ10sXG5cdCclSlNPTlN0cmluZ2lmeSUnOiBbJ0pTT04nLCAnc3RyaW5naWZ5J10sXG5cdCclTWFwUHJvdG90eXBlJSc6IFsnTWFwJywgJ3Byb3RvdHlwZSddLFxuXHQnJU51bWJlclByb3RvdHlwZSUnOiBbJ051bWJlcicsICdwcm90b3R5cGUnXSxcblx0JyVPYmplY3RQcm90b3R5cGUlJzogWydPYmplY3QnLCAncHJvdG90eXBlJ10sXG5cdCclT2JqUHJvdG9fdG9TdHJpbmclJzogWydPYmplY3QnLCAncHJvdG90eXBlJywgJ3RvU3RyaW5nJ10sXG5cdCclT2JqUHJvdG9fdmFsdWVPZiUnOiBbJ09iamVjdCcsICdwcm90b3R5cGUnLCAndmFsdWVPZiddLFxuXHQnJVByb21pc2VQcm90b3R5cGUlJzogWydQcm9taXNlJywgJ3Byb3RvdHlwZSddLFxuXHQnJVByb21pc2VQcm90b190aGVuJSc6IFsnUHJvbWlzZScsICdwcm90b3R5cGUnLCAndGhlbiddLFxuXHQnJVByb21pc2VfYWxsJSc6IFsnUHJvbWlzZScsICdhbGwnXSxcblx0JyVQcm9taXNlX3JlamVjdCUnOiBbJ1Byb21pc2UnLCAncmVqZWN0J10sXG5cdCclUHJvbWlzZV9yZXNvbHZlJSc6IFsnUHJvbWlzZScsICdyZXNvbHZlJ10sXG5cdCclUmFuZ2VFcnJvclByb3RvdHlwZSUnOiBbJ1JhbmdlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclUmVmZXJlbmNlRXJyb3JQcm90b3R5cGUlJzogWydSZWZlcmVuY2VFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVSZWdFeHBQcm90b3R5cGUlJzogWydSZWdFeHAnLCAncHJvdG90eXBlJ10sXG5cdCclU2V0UHJvdG90eXBlJSc6IFsnU2V0JywgJ3Byb3RvdHlwZSddLFxuXHQnJVNoYXJlZEFycmF5QnVmZmVyUHJvdG90eXBlJSc6IFsnU2hhcmVkQXJyYXlCdWZmZXInLCAncHJvdG90eXBlJ10sXG5cdCclU3RyaW5nUHJvdG90eXBlJSc6IFsnU3RyaW5nJywgJ3Byb3RvdHlwZSddLFxuXHQnJVN5bWJvbFByb3RvdHlwZSUnOiBbJ1N5bWJvbCcsICdwcm90b3R5cGUnXSxcblx0JyVTeW50YXhFcnJvclByb3RvdHlwZSUnOiBbJ1N5bnRheEVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVR5cGVkQXJyYXlQcm90b3R5cGUlJzogWydUeXBlZEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVR5cGVFcnJvclByb3RvdHlwZSUnOiBbJ1R5cGVFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVVaW50OEFycmF5UHJvdG90eXBlJSc6IFsnVWludDhBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVaW50OENsYW1wZWRBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQ4Q2xhbXBlZEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQxNkFycmF5UHJvdG90eXBlJSc6IFsnVWludDE2QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVWludDMyQXJyYXlQcm90b3R5cGUlJzogWydVaW50MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVUklFcnJvclByb3RvdHlwZSUnOiBbJ1VSSUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVdlYWtNYXBQcm90b3R5cGUlJzogWydXZWFrTWFwJywgJ3Byb3RvdHlwZSddLFxuXHQnJVdlYWtTZXRQcm90b3R5cGUlJzogWydXZWFrU2V0JywgJ3Byb3RvdHlwZSddXG59O1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCdoYXMnKTtcbnZhciAkY29uY2F0ID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIEFycmF5LnByb3RvdHlwZS5jb25jYXQpO1xudmFyICRzcGxpY2VBcHBseSA9IGJpbmQuY2FsbChGdW5jdGlvbi5hcHBseSwgQXJyYXkucHJvdG90eXBlLnNwbGljZSk7XG52YXIgJHJlcGxhY2UgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlKTtcbnZhciAkc3RyU2xpY2UgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgU3RyaW5nLnByb3RvdHlwZS5zbGljZSk7XG5cbi8qIGFkYXB0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbG9kYXNoL2xvZGFzaC9ibG9iLzQuMTcuMTUvZGlzdC9sb2Rhc2guanMjTDY3MzUtTDY3NDQgKi9cbnZhciByZVByb3BOYW1lID0gL1teJS5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXFxcXXxcXFxcLikqPylcXDIpXFxdfCg/PSg/OlxcLnxcXFtcXF0pKD86XFwufFxcW1xcXXwlJCkpL2c7XG52YXIgcmVFc2NhcGVDaGFyID0gL1xcXFwoXFxcXCk/L2c7IC8qKiBVc2VkIHRvIG1hdGNoIGJhY2tzbGFzaGVzIGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHN0cmluZ1RvUGF0aCA9IGZ1bmN0aW9uIHN0cmluZ1RvUGF0aChzdHJpbmcpIHtcblx0dmFyIGZpcnN0ID0gJHN0clNsaWNlKHN0cmluZywgMCwgMSk7XG5cdHZhciBsYXN0ID0gJHN0clNsaWNlKHN0cmluZywgLTEpO1xuXHRpZiAoZmlyc3QgPT09ICclJyAmJiBsYXN0ICE9PSAnJScpIHtcblx0XHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdpbnZhbGlkIGludHJpbnNpYyBzeW50YXgsIGV4cGVjdGVkIGNsb3NpbmcgYCVgJyk7XG5cdH0gZWxzZSBpZiAobGFzdCA9PT0gJyUnICYmIGZpcnN0ICE9PSAnJScpIHtcblx0XHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdpbnZhbGlkIGludHJpbnNpYyBzeW50YXgsIGV4cGVjdGVkIG9wZW5pbmcgYCVgJyk7XG5cdH1cblx0dmFyIHJlc3VsdCA9IFtdO1xuXHQkcmVwbGFjZShzdHJpbmcsIHJlUHJvcE5hbWUsIGZ1bmN0aW9uIChtYXRjaCwgbnVtYmVyLCBxdW90ZSwgc3ViU3RyaW5nKSB7XG5cdFx0cmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gcXVvdGUgPyAkcmVwbGFjZShzdWJTdHJpbmcsIHJlRXNjYXBlQ2hhciwgJyQxJykgOiBudW1iZXIgfHwgbWF0Y2g7XG5cdH0pO1xuXHRyZXR1cm4gcmVzdWx0O1xufTtcbi8qIGVuZCBhZGFwdGF0aW9uICovXG5cbnZhciBnZXRCYXNlSW50cmluc2ljID0gZnVuY3Rpb24gZ2V0QmFzZUludHJpbnNpYyhuYW1lLCBhbGxvd01pc3NpbmcpIHtcblx0dmFyIGludHJpbnNpY05hbWUgPSBuYW1lO1xuXHR2YXIgYWxpYXM7XG5cdGlmIChoYXNPd24oTEVHQUNZX0FMSUFTRVMsIGludHJpbnNpY05hbWUpKSB7XG5cdFx0YWxpYXMgPSBMRUdBQ1lfQUxJQVNFU1tpbnRyaW5zaWNOYW1lXTtcblx0XHRpbnRyaW5zaWNOYW1lID0gJyUnICsgYWxpYXNbMF0gKyAnJSc7XG5cdH1cblxuXHRpZiAoaGFzT3duKElOVFJJTlNJQ1MsIGludHJpbnNpY05hbWUpKSB7XG5cdFx0dmFyIHZhbHVlID0gSU5UUklOU0lDU1tpbnRyaW5zaWNOYW1lXTtcblx0XHRpZiAodmFsdWUgPT09IG5lZWRzRXZhbCkge1xuXHRcdFx0dmFsdWUgPSBkb0V2YWwoaW50cmluc2ljTmFtZSk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnICYmICFhbGxvd01pc3NpbmcpIHtcblx0XHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdpbnRyaW5zaWMgJyArIG5hbWUgKyAnIGV4aXN0cywgYnV0IGlzIG5vdCBhdmFpbGFibGUuIFBsZWFzZSBmaWxlIGFuIGlzc3VlIScpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRhbGlhczogYWxpYXMsXG5cdFx0XHRuYW1lOiBpbnRyaW5zaWNOYW1lLFxuXHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0fTtcblx0fVxuXG5cdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ2ludHJpbnNpYyAnICsgbmFtZSArICcgZG9lcyBub3QgZXhpc3QhJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEdldEludHJpbnNpYyhuYW1lLCBhbGxvd01pc3NpbmcpIHtcblx0aWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJyB8fCBuYW1lLmxlbmd0aCA9PT0gMCkge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdpbnRyaW5zaWMgbmFtZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuXHR9XG5cdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSAmJiB0eXBlb2YgYWxsb3dNaXNzaW5nICE9PSAnYm9vbGVhbicpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignXCJhbGxvd01pc3NpbmdcIiBhcmd1bWVudCBtdXN0IGJlIGEgYm9vbGVhbicpO1xuXHR9XG5cblx0dmFyIHBhcnRzID0gc3RyaW5nVG9QYXRoKG5hbWUpO1xuXHR2YXIgaW50cmluc2ljQmFzZU5hbWUgPSBwYXJ0cy5sZW5ndGggPiAwID8gcGFydHNbMF0gOiAnJztcblxuXHR2YXIgaW50cmluc2ljID0gZ2V0QmFzZUludHJpbnNpYygnJScgKyBpbnRyaW5zaWNCYXNlTmFtZSArICclJywgYWxsb3dNaXNzaW5nKTtcblx0dmFyIGludHJpbnNpY1JlYWxOYW1lID0gaW50cmluc2ljLm5hbWU7XG5cdHZhciB2YWx1ZSA9IGludHJpbnNpYy52YWx1ZTtcblx0dmFyIHNraXBGdXJ0aGVyQ2FjaGluZyA9IGZhbHNlO1xuXG5cdHZhciBhbGlhcyA9IGludHJpbnNpYy5hbGlhcztcblx0aWYgKGFsaWFzKSB7XG5cdFx0aW50cmluc2ljQmFzZU5hbWUgPSBhbGlhc1swXTtcblx0XHQkc3BsaWNlQXBwbHkocGFydHMsICRjb25jYXQoWzAsIDFdLCBhbGlhcykpO1xuXHR9XG5cblx0Zm9yICh2YXIgaSA9IDEsIGlzT3duID0gdHJ1ZTsgaSA8IHBhcnRzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0dmFyIHBhcnQgPSBwYXJ0c1tpXTtcblx0XHR2YXIgZmlyc3QgPSAkc3RyU2xpY2UocGFydCwgMCwgMSk7XG5cdFx0dmFyIGxhc3QgPSAkc3RyU2xpY2UocGFydCwgLTEpO1xuXHRcdGlmIChcblx0XHRcdChcblx0XHRcdFx0KGZpcnN0ID09PSAnXCInIHx8IGZpcnN0ID09PSBcIidcIiB8fCBmaXJzdCA9PT0gJ2AnKVxuXHRcdFx0XHR8fCAobGFzdCA9PT0gJ1wiJyB8fCBsYXN0ID09PSBcIidcIiB8fCBsYXN0ID09PSAnYCcpXG5cdFx0XHQpXG5cdFx0XHQmJiBmaXJzdCAhPT0gbGFzdFxuXHRcdCkge1xuXHRcdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcigncHJvcGVydHkgbmFtZXMgd2l0aCBxdW90ZXMgbXVzdCBoYXZlIG1hdGNoaW5nIHF1b3RlcycpO1xuXHRcdH1cblx0XHRpZiAocGFydCA9PT0gJ2NvbnN0cnVjdG9yJyB8fCAhaXNPd24pIHtcblx0XHRcdHNraXBGdXJ0aGVyQ2FjaGluZyA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aW50cmluc2ljQmFzZU5hbWUgKz0gJy4nICsgcGFydDtcblx0XHRpbnRyaW5zaWNSZWFsTmFtZSA9ICclJyArIGludHJpbnNpY0Jhc2VOYW1lICsgJyUnO1xuXG5cdFx0aWYgKGhhc093bihJTlRSSU5TSUNTLCBpbnRyaW5zaWNSZWFsTmFtZSkpIHtcblx0XHRcdHZhbHVlID0gSU5UUklOU0lDU1tpbnRyaW5zaWNSZWFsTmFtZV07XG5cdFx0fSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG5cdFx0XHRpZiAoIShwYXJ0IGluIHZhbHVlKSkge1xuXHRcdFx0XHRpZiAoIWFsbG93TWlzc2luZykge1xuXHRcdFx0XHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdiYXNlIGludHJpbnNpYyBmb3IgJyArIG5hbWUgKyAnIGV4aXN0cywgYnV0IHRoZSBwcm9wZXJ0eSBpcyBub3QgYXZhaWxhYmxlLicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB2b2lkIHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHRcdGlmICgkZ09QRCAmJiAoaSArIDEpID49IHBhcnRzLmxlbmd0aCkge1xuXHRcdFx0XHR2YXIgZGVzYyA9ICRnT1BEKHZhbHVlLCBwYXJ0KTtcblx0XHRcdFx0aXNPd24gPSAhIWRlc2M7XG5cblx0XHRcdFx0Ly8gQnkgY29udmVudGlvbiwgd2hlbiBhIGRhdGEgcHJvcGVydHkgaXMgY29udmVydGVkIHRvIGFuIGFjY2Vzc29yXG5cdFx0XHRcdC8vIHByb3BlcnR5IHRvIGVtdWxhdGUgYSBkYXRhIHByb3BlcnR5IHRoYXQgZG9lcyBub3Qgc3VmZmVyIGZyb21cblx0XHRcdFx0Ly8gdGhlIG92ZXJyaWRlIG1pc3Rha2UsIHRoYXQgYWNjZXNzb3IncyBnZXR0ZXIgaXMgbWFya2VkIHdpdGhcblx0XHRcdFx0Ly8gYW4gYG9yaWdpbmFsVmFsdWVgIHByb3BlcnR5LiBIZXJlLCB3aGVuIHdlIGRldGVjdCB0aGlzLCB3ZVxuXHRcdFx0XHQvLyB1cGhvbGQgdGhlIGlsbHVzaW9uIGJ5IHByZXRlbmRpbmcgdG8gc2VlIHRoYXQgb3JpZ2luYWwgZGF0YVxuXHRcdFx0XHQvLyBwcm9wZXJ0eSwgaS5lLiwgcmV0dXJuaW5nIHRoZSB2YWx1ZSByYXRoZXIgdGhhbiB0aGUgZ2V0dGVyXG5cdFx0XHRcdC8vIGl0c2VsZi5cblx0XHRcdFx0aWYgKGlzT3duICYmICdnZXQnIGluIGRlc2MgJiYgISgnb3JpZ2luYWxWYWx1ZScgaW4gZGVzYy5nZXQpKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBkZXNjLmdldDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YWx1ZSA9IHZhbHVlW3BhcnRdO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpc093biA9IGhhc093bih2YWx1ZSwgcGFydCk7XG5cdFx0XHRcdHZhbHVlID0gdmFsdWVbcGFydF07XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpc093biAmJiAhc2tpcEZ1cnRoZXJDYWNoaW5nKSB7XG5cdFx0XHRcdElOVFJJTlNJQ1NbaW50cmluc2ljUmVhbE5hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiB2YWx1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBvcmlnU3ltYm9sID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sO1xudmFyIGhhc1N5bWJvbFNoYW0gPSByZXF1aXJlKCcuL3NoYW1zJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFzTmF0aXZlU3ltYm9scygpIHtcblx0aWYgKHR5cGVvZiBvcmlnU3ltYm9sICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBvcmlnU3ltYm9sKCdmb28nKSAhPT0gJ3N5bWJvbCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2YgU3ltYm9sKCdiYXInKSAhPT0gJ3N5bWJvbCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0cmV0dXJuIGhhc1N5bWJvbFNoYW0oKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qIGVzbGludCBjb21wbGV4aXR5OiBbMiwgMThdLCBtYXgtc3RhdGVtZW50czogWzIsIDMzXSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYXNTeW1ib2xzKCkge1xuXHRpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09ICdzeW1ib2wnKSB7IHJldHVybiB0cnVlOyB9XG5cblx0dmFyIG9iaiA9IHt9O1xuXHR2YXIgc3ltID0gU3ltYm9sKCd0ZXN0Jyk7XG5cdHZhciBzeW1PYmogPSBPYmplY3Qoc3ltKTtcblx0aWYgKHR5cGVvZiBzeW0gPT09ICdzdHJpbmcnKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ltKSAhPT0gJ1tvYmplY3QgU3ltYm9sXScpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ltT2JqKSAhPT0gJ1tvYmplY3QgU3ltYm9sXScpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0Ly8gdGVtcCBkaXNhYmxlZCBwZXIgaHR0cHM6Ly9naXRodWIuY29tL2xqaGFyYi9vYmplY3QuYXNzaWduL2lzc3Vlcy8xN1xuXHQvLyBpZiAoc3ltIGluc3RhbmNlb2YgU3ltYm9sKSB7IHJldHVybiBmYWxzZTsgfVxuXHQvLyB0ZW1wIGRpc2FibGVkIHBlciBodHRwczovL2dpdGh1Yi5jb20vV2ViUmVmbGVjdGlvbi9nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMvaXNzdWVzLzRcblx0Ly8gaWYgKCEoc3ltT2JqIGluc3RhbmNlb2YgU3ltYm9sKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHQvLyBpZiAodHlwZW9mIFN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdC8vIGlmIChTdHJpbmcoc3ltKSAhPT0gU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN5bSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0dmFyIHN5bVZhbCA9IDQyO1xuXHRvYmpbc3ltXSA9IHN5bVZhbDtcblx0Zm9yIChzeW0gaW4gb2JqKSB7IHJldHVybiBmYWxzZTsgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4LCBuby11bnJlYWNoYWJsZS1sb29wXG5cdGlmICh0eXBlb2YgT2JqZWN0LmtleXMgPT09ICdmdW5jdGlvbicgJiYgT2JqZWN0LmtleXMob2JqKS5sZW5ndGggIT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyA9PT0gJ2Z1bmN0aW9uJyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmxlbmd0aCAhPT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHR2YXIgc3ltcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqKTtcblx0aWYgKHN5bXMubGVuZ3RoICE9PSAxIHx8IHN5bXNbMF0gIT09IHN5bSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAoIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmosIHN5bSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgc3ltKTtcblx0XHRpZiAoZGVzY3JpcHRvci52YWx1ZSAhPT0gc3ltVmFsIHx8IGRlc2NyaXB0b3IuZW51bWVyYWJsZSAhPT0gdHJ1ZSkgeyByZXR1cm4gZmFsc2U7IH1cblx0fVxuXG5cdHJldHVybiB0cnVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCdmdW5jdGlvbi1iaW5kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm5Ub1N0ciA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcbnZhciByZWZsZWN0QXBwbHkgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgJiYgUmVmbGVjdCAhPT0gbnVsbCAmJiBSZWZsZWN0LmFwcGx5O1xudmFyIGJhZEFycmF5TGlrZTtcbnZhciBpc0NhbGxhYmxlTWFya2VyO1xuaWYgKHR5cGVvZiByZWZsZWN0QXBwbHkgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJykge1xuXHR0cnkge1xuXHRcdGJhZEFycmF5TGlrZSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2xlbmd0aCcsIHtcblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0aHJvdyBpc0NhbGxhYmxlTWFya2VyO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGlzQ2FsbGFibGVNYXJrZXIgPSB7fTtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdGhyb3ctbGl0ZXJhbFxuXHRcdHJlZmxlY3RBcHBseShmdW5jdGlvbiAoKSB7IHRocm93IDQyOyB9LCBudWxsLCBiYWRBcnJheUxpa2UpO1xuXHR9IGNhdGNoIChfKSB7XG5cdFx0aWYgKF8gIT09IGlzQ2FsbGFibGVNYXJrZXIpIHtcblx0XHRcdHJlZmxlY3RBcHBseSA9IG51bGw7XG5cdFx0fVxuXHR9XG59IGVsc2Uge1xuXHRyZWZsZWN0QXBwbHkgPSBudWxsO1xufVxuXG52YXIgY29uc3RydWN0b3JSZWdleCA9IC9eXFxzKmNsYXNzXFxiLztcbnZhciBpc0VTNkNsYXNzRm4gPSBmdW5jdGlvbiBpc0VTNkNsYXNzRnVuY3Rpb24odmFsdWUpIHtcblx0dHJ5IHtcblx0XHR2YXIgZm5TdHIgPSBmblRvU3RyLmNhbGwodmFsdWUpO1xuXHRcdHJldHVybiBjb25zdHJ1Y3RvclJlZ2V4LnRlc3QoZm5TdHIpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIGZhbHNlOyAvLyBub3QgYSBmdW5jdGlvblxuXHR9XG59O1xuXG52YXIgdHJ5RnVuY3Rpb25PYmplY3QgPSBmdW5jdGlvbiB0cnlGdW5jdGlvblRvU3RyKHZhbHVlKSB7XG5cdHRyeSB7XG5cdFx0aWYgKGlzRVM2Q2xhc3NGbih2YWx1ZSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0Zm5Ub1N0ci5jYWxsKHZhbHVlKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufTtcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgZm5DbGFzcyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG52YXIgZ2VuQ2xhc3MgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nO1xudmFyIGhhc1RvU3RyaW5nVGFnID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnID09PSAnc3ltYm9sJztcbi8qIGdsb2JhbHMgZG9jdW1lbnQ6IGZhbHNlICovXG52YXIgZG9jdW1lbnREb3RBbGwgPSB0eXBlb2YgZG9jdW1lbnQgPT09ICdvYmplY3QnICYmIHR5cGVvZiBkb2N1bWVudC5hbGwgPT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmFsbCAhPT0gdW5kZWZpbmVkID8gZG9jdW1lbnQuYWxsIDoge307XG5cbm1vZHVsZS5leHBvcnRzID0gcmVmbGVjdEFwcGx5XG5cdD8gZnVuY3Rpb24gaXNDYWxsYWJsZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PT0gZG9jdW1lbnREb3RBbGwpIHsgcmV0dXJuIHRydWU7IH1cblx0XHRpZiAoIXZhbHVlKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGlmICh0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JykgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nICYmICF2YWx1ZS5wcm90b3R5cGUpIHsgcmV0dXJuIHRydWU7IH1cblx0XHR0cnkge1xuXHRcdFx0cmVmbGVjdEFwcGx5KHZhbHVlLCBudWxsLCBiYWRBcnJheUxpa2UpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGlmIChlICE9PSBpc0NhbGxhYmxlTWFya2VyKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH1cblx0XHRyZXR1cm4gIWlzRVM2Q2xhc3NGbih2YWx1ZSk7XG5cdH1cblx0OiBmdW5jdGlvbiBpc0NhbGxhYmxlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09PSBkb2N1bWVudERvdEFsbCkgeyByZXR1cm4gdHJ1ZTsgfVxuXHRcdGlmICghdmFsdWUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgJiYgIXZhbHVlLnByb3RvdHlwZSkgeyByZXR1cm4gdHJ1ZTsgfVxuXHRcdGlmIChoYXNUb1N0cmluZ1RhZykgeyByZXR1cm4gdHJ5RnVuY3Rpb25PYmplY3QodmFsdWUpOyB9XG5cdFx0aWYgKGlzRVM2Q2xhc3NGbih2YWx1ZSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0dmFyIHN0ckNsYXNzID0gdG9TdHIuY2FsbCh2YWx1ZSk7XG5cdFx0cmV0dXJuIHN0ckNsYXNzID09PSBmbkNsYXNzIHx8IHN0ckNsYXNzID09PSBnZW5DbGFzcztcblx0fTtcbiIsIi8vICAgICAoYykgMjAxMi0yMDE4IEFpcmJuYiwgSW5jLlxuLy9cbi8vICAgICBwb2x5Z2xvdC5qcyBtYXkgYmUgZnJlZWx5IGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQlNEXG4vLyAgICAgbGljZW5zZS4gRm9yIGFsbCBsaWNlbnNpbmcgaW5mb3JtYXRpb24sIGRldGFpbHMsIGFuZCBkb2N1bWVudGlvbjpcbi8vICAgICBodHRwOi8vYWlyYm5iLmdpdGh1Yi5jb20vcG9seWdsb3QuanNcbi8vXG4vL1xuLy8gUG9seWdsb3QuanMgaXMgYW4gSTE4biBoZWxwZXIgbGlicmFyeSB3cml0dGVuIGluIEphdmFTY3JpcHQsIG1hZGUgdG9cbi8vIHdvcmsgYm90aCBpbiB0aGUgYnJvd3NlciBhbmQgaW4gTm9kZS4gSXQgcHJvdmlkZXMgYSBzaW1wbGUgc29sdXRpb24gZm9yXG4vLyBpbnRlcnBvbGF0aW9uIGFuZCBwbHVyYWxpemF0aW9uLCBiYXNlZCBvZmYgb2YgQWlyYm5iJ3Ncbi8vIGV4cGVyaWVuY2UgYWRkaW5nIEkxOG4gZnVuY3Rpb25hbGl0eSB0byBpdHMgQmFja2JvbmUuanMgYW5kIE5vZGUgYXBwcy5cbi8vXG4vLyBQb2x5bGdsb3QgaXMgYWdub3N0aWMgdG8geW91ciB0cmFuc2xhdGlvbiBiYWNrZW5kLiBJdCBkb2Vzbid0IHBlcmZvcm0gYW55XG4vLyB0cmFuc2xhdGlvbjsgaXQgc2ltcGx5IGdpdmVzIHlvdSBhIHdheSB0byBtYW5hZ2UgdHJhbnNsYXRlZCBwaHJhc2VzIGZyb21cbi8vIHlvdXIgY2xpZW50LSBvciBzZXJ2ZXItc2lkZSBKYXZhU2NyaXB0IGFwcGxpY2F0aW9uLlxuLy9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJ2Zvci1lYWNoJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcbnZhciBoYXMgPSByZXF1aXJlKCdoYXMnKTtcbnZhciB0cmltID0gcmVxdWlyZSgnc3RyaW5nLnByb3RvdHlwZS50cmltJyk7XG5cbnZhciB3YXJuID0gZnVuY3Rpb24gd2FybihtZXNzYWdlKSB7XG4gIHdhcm5pbmcoZmFsc2UsIG1lc3NhZ2UpO1xufTtcblxudmFyIHJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XG52YXIgc3BsaXQgPSBTdHJpbmcucHJvdG90eXBlLnNwbGl0O1xuXG4vLyAjIyMjIFBsdXJhbGl6YXRpb24gbWV0aG9kc1xuLy8gVGhlIHN0cmluZyB0aGF0IHNlcGFyYXRlcyB0aGUgZGlmZmVyZW50IHBocmFzZSBwb3NzaWJpbGl0aWVzLlxudmFyIGRlbGltaXRlciA9ICd8fHx8JztcblxudmFyIHJ1c3NpYW5QbHVyYWxHcm91cHMgPSBmdW5jdGlvbiAobikge1xuICB2YXIgbGFzdFR3byA9IG4gJSAxMDA7XG4gIHZhciBlbmQgPSBsYXN0VHdvICUgMTA7XG4gIGlmIChsYXN0VHdvICE9PSAxMSAmJiBlbmQgPT09IDEpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBpZiAoMiA8PSBlbmQgJiYgZW5kIDw9IDQgJiYgIShsYXN0VHdvID49IDEyICYmIGxhc3RUd28gPD0gMTQpKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cbiAgcmV0dXJuIDI7XG59O1xuXG52YXIgZGVmYXVsdFBsdXJhbFJ1bGVzID0ge1xuICAvLyBNYXBwaW5nIGZyb20gcGx1cmFsaXphdGlvbiBncm91cCBwbHVyYWwgbG9naWMuXG4gIHBsdXJhbFR5cGVzOiB7XG4gICAgYXJhYmljOiBmdW5jdGlvbiAobikge1xuICAgICAgLy8gaHR0cDovL3d3dy5hcmFiZXllcy5vcmcvUGx1cmFsX0Zvcm1zXG4gICAgICBpZiAobiA8IDMpIHsgcmV0dXJuIG47IH1cbiAgICAgIHZhciBsYXN0VHdvID0gbiAlIDEwMDtcbiAgICAgIGlmIChsYXN0VHdvID49IDMgJiYgbGFzdFR3byA8PSAxMCkgcmV0dXJuIDM7XG4gICAgICByZXR1cm4gbGFzdFR3byA+PSAxMSA/IDQgOiA1O1xuICAgIH0sXG4gICAgYm9zbmlhbl9zZXJiaWFuOiBydXNzaWFuUGx1cmFsR3JvdXBzLFxuICAgIGNoaW5lc2U6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDA7IH0sXG4gICAgY3JvYXRpYW46IHJ1c3NpYW5QbHVyYWxHcm91cHMsXG4gICAgZnJlbmNoOiBmdW5jdGlvbiAobikgeyByZXR1cm4gbiA+IDEgPyAxIDogMDsgfSxcbiAgICBnZXJtYW46IGZ1bmN0aW9uIChuKSB7IHJldHVybiBuICE9PSAxID8gMSA6IDA7IH0sXG4gICAgcnVzc2lhbjogcnVzc2lhblBsdXJhbEdyb3VwcyxcbiAgICBsaXRodWFuaWFuOiBmdW5jdGlvbiAobikge1xuICAgICAgaWYgKG4gJSAxMCA9PT0gMSAmJiBuICUgMTAwICE9PSAxMSkgeyByZXR1cm4gMDsgfVxuICAgICAgcmV0dXJuIG4gJSAxMCA+PSAyICYmIG4gJSAxMCA8PSA5ICYmIChuICUgMTAwIDwgMTEgfHwgbiAlIDEwMCA+IDE5KSA/IDEgOiAyO1xuICAgIH0sXG4gICAgY3plY2g6IGZ1bmN0aW9uIChuKSB7XG4gICAgICBpZiAobiA9PT0gMSkgeyByZXR1cm4gMDsgfVxuICAgICAgcmV0dXJuIChuID49IDIgJiYgbiA8PSA0KSA/IDEgOiAyO1xuICAgIH0sXG4gICAgcG9saXNoOiBmdW5jdGlvbiAobikge1xuICAgICAgaWYgKG4gPT09IDEpIHsgcmV0dXJuIDA7IH1cbiAgICAgIHZhciBlbmQgPSBuICUgMTA7XG4gICAgICByZXR1cm4gMiA8PSBlbmQgJiYgZW5kIDw9IDQgJiYgKG4gJSAxMDAgPCAxMCB8fCBuICUgMTAwID49IDIwKSA/IDEgOiAyO1xuICAgIH0sXG4gICAgaWNlbGFuZGljOiBmdW5jdGlvbiAobikgeyByZXR1cm4gKG4gJSAxMCAhPT0gMSB8fCBuICUgMTAwID09PSAxMSkgPyAxIDogMDsgfSxcbiAgICBzbG92ZW5pYW46IGZ1bmN0aW9uIChuKSB7XG4gICAgICB2YXIgbGFzdFR3byA9IG4gJSAxMDA7XG4gICAgICBpZiAobGFzdFR3byA9PT0gMSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIGlmIChsYXN0VHdvID09PSAyKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgICAgaWYgKGxhc3RUd28gPT09IDMgfHwgbGFzdFR3byA9PT0gNCkge1xuICAgICAgICByZXR1cm4gMjtcbiAgICAgIH1cbiAgICAgIHJldHVybiAzO1xuICAgIH1cbiAgfSxcblxuICAvLyBNYXBwaW5nIGZyb20gcGx1cmFsaXphdGlvbiBncm91cCB0byBpbmRpdmlkdWFsIGxhbmd1YWdlIGNvZGVzL2xvY2FsZXMuXG4gIC8vIFdpbGwgbG9vayB1cCBiYXNlZCBvbiBleGFjdCBtYXRjaCwgaWYgbm90IGZvdW5kIGFuZCBpdCdzIGEgbG9jYWxlIHdpbGwgcGFyc2UgdGhlIGxvY2FsZVxuICAvLyBmb3IgbGFuZ3VhZ2UgY29kZSwgYW5kIGlmIHRoYXQgZG9lcyBub3QgZXhpc3Qgd2lsbCBkZWZhdWx0IHRvICdlbidcbiAgcGx1cmFsVHlwZVRvTGFuZ3VhZ2VzOiB7XG4gICAgYXJhYmljOiBbJ2FyJ10sXG4gICAgYm9zbmlhbl9zZXJiaWFuOiBbJ2JzLUxhdG4tQkEnLCAnYnMtQ3lybC1CQScsICdzcmwtUlMnLCAnc3ItUlMnXSxcbiAgICBjaGluZXNlOiBbJ2lkJywgJ2lkLUlEJywgJ2phJywgJ2tvJywgJ2tvLUtSJywgJ2xvJywgJ21zJywgJ3RoJywgJ3RoLVRIJywgJ3poJ10sXG4gICAgY3JvYXRpYW46IFsnaHInLCAnaHItSFInXSxcbiAgICBnZXJtYW46IFsnZmEnLCAnZGEnLCAnZGUnLCAnZW4nLCAnZXMnLCAnZmknLCAnZWwnLCAnaGUnLCAnaGktSU4nLCAnaHUnLCAnaHUtSFUnLCAnaXQnLCAnbmwnLCAnbm8nLCAncHQnLCAnc3YnLCAndHInXSxcbiAgICBmcmVuY2g6IFsnZnInLCAndGwnLCAncHQtYnInXSxcbiAgICBydXNzaWFuOiBbJ3J1JywgJ3J1LVJVJ10sXG4gICAgbGl0aHVhbmlhbjogWydsdCddLFxuICAgIGN6ZWNoOiBbJ2NzJywgJ2NzLUNaJywgJ3NrJ10sXG4gICAgcG9saXNoOiBbJ3BsJ10sXG4gICAgaWNlbGFuZGljOiBbJ2lzJ10sXG4gICAgc2xvdmVuaWFuOiBbJ3NsLVNMJ11cbiAgfVxufTtcblxuZnVuY3Rpb24gbGFuZ1RvVHlwZU1hcChtYXBwaW5nKSB7XG4gIHZhciByZXQgPSB7fTtcbiAgZm9yRWFjaChtYXBwaW5nLCBmdW5jdGlvbiAobGFuZ3MsIHR5cGUpIHtcbiAgICBmb3JFYWNoKGxhbmdzLCBmdW5jdGlvbiAobGFuZykge1xuICAgICAgcmV0W2xhbmddID0gdHlwZTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIHBsdXJhbFR5cGVOYW1lKHBsdXJhbFJ1bGVzLCBsb2NhbGUpIHtcbiAgdmFyIGxhbmdUb1BsdXJhbFR5cGUgPSBsYW5nVG9UeXBlTWFwKHBsdXJhbFJ1bGVzLnBsdXJhbFR5cGVUb0xhbmd1YWdlcyk7XG4gIHJldHVybiBsYW5nVG9QbHVyYWxUeXBlW2xvY2FsZV1cbiAgICB8fCBsYW5nVG9QbHVyYWxUeXBlW3NwbGl0LmNhbGwobG9jYWxlLCAvLS8sIDEpWzBdXVxuICAgIHx8IGxhbmdUb1BsdXJhbFR5cGUuZW47XG59XG5cbmZ1bmN0aW9uIHBsdXJhbFR5cGVJbmRleChwbHVyYWxSdWxlcywgbG9jYWxlLCBjb3VudCkge1xuICByZXR1cm4gcGx1cmFsUnVsZXMucGx1cmFsVHlwZXNbcGx1cmFsVHlwZU5hbWUocGx1cmFsUnVsZXMsIGxvY2FsZSldKGNvdW50KTtcbn1cblxuZnVuY3Rpb24gZXNjYXBlKHRva2VuKSB7XG4gIHJldHVybiB0b2tlbi5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RUb2tlblJlZ2V4KG9wdHMpIHtcbiAgdmFyIHByZWZpeCA9IChvcHRzICYmIG9wdHMucHJlZml4KSB8fCAnJXsnO1xuICB2YXIgc3VmZml4ID0gKG9wdHMgJiYgb3B0cy5zdWZmaXgpIHx8ICd9JztcblxuICBpZiAocHJlZml4ID09PSBkZWxpbWl0ZXIgfHwgc3VmZml4ID09PSBkZWxpbWl0ZXIpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCInICsgZGVsaW1pdGVyICsgJ1wiIHRva2VuIGlzIHJlc2VydmVkIGZvciBwbHVyYWxpemF0aW9uJyk7XG4gIH1cblxuICByZXR1cm4gbmV3IFJlZ0V4cChlc2NhcGUocHJlZml4KSArICcoLio/KScgKyBlc2NhcGUoc3VmZml4KSwgJ2cnKTtcbn1cblxudmFyIGRlZmF1bHRUb2tlblJlZ2V4ID0gLyVcXHsoLio/KVxcfS9nO1xuXG4vLyAjIyMgdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlKVxuLy9cbi8vIFRha2VzIGEgcGhyYXNlIHN0cmluZyBhbmQgdHJhbnNmb3JtcyBpdCBieSBjaG9vc2luZyB0aGUgY29ycmVjdFxuLy8gcGx1cmFsIGZvcm0gYW5kIGludGVycG9sYXRpbmcgaXQuXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnSGVsbG8sICV7bmFtZX0hJywge25hbWU6ICdTcGlrZSd9KTtcbi8vICAgICAvLyBcIkhlbGxvLCBTcGlrZSFcIlxuLy9cbi8vIFRoZSBjb3JyZWN0IHBsdXJhbCBmb3JtIGlzIHNlbGVjdGVkIGlmIHN1YnN0aXR1dGlvbnMuc21hcnRfY291bnRcbi8vIGlzIHNldC4gWW91IGNhbiBwYXNzIGluIGEgbnVtYmVyIGluc3RlYWQgb2YgYW4gT2JqZWN0IGFzIGBzdWJzdGl0dXRpb25zYFxuLy8gYXMgYSBzaG9ydGN1dCBmb3IgYHNtYXJ0X2NvdW50YC5cbi8vXG4vLyAgICAgdHJhbnNmb3JtUGhyYXNlKCcle3NtYXJ0X2NvdW50fSBuZXcgbWVzc2FnZXMgfHx8fCAxIG5ldyBtZXNzYWdlJywge3NtYXJ0X2NvdW50OiAxfSwgJ2VuJyk7XG4vLyAgICAgLy8gXCIxIG5ldyBtZXNzYWdlXCJcbi8vXG4vLyAgICAgdHJhbnNmb3JtUGhyYXNlKCcle3NtYXJ0X2NvdW50fSBuZXcgbWVzc2FnZXMgfHx8fCAxIG5ldyBtZXNzYWdlJywge3NtYXJ0X2NvdW50OiAyfSwgJ2VuJyk7XG4vLyAgICAgLy8gXCIyIG5ldyBtZXNzYWdlc1wiXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnJXtzbWFydF9jb3VudH0gbmV3IG1lc3NhZ2VzIHx8fHwgMSBuZXcgbWVzc2FnZScsIDUsICdlbicpO1xuLy8gICAgIC8vIFwiNSBuZXcgbWVzc2FnZXNcIlxuLy9cbi8vIFlvdSBzaG91bGQgcGFzcyBpbiBhIHRoaXJkIGFyZ3VtZW50LCB0aGUgbG9jYWxlLCB0byBzcGVjaWZ5IHRoZSBjb3JyZWN0IHBsdXJhbCB0eXBlLlxuLy8gSXQgZGVmYXVsdHMgdG8gYCdlbidgIHdpdGggMiBwbHVyYWwgZm9ybXMuXG5mdW5jdGlvbiB0cmFuc2Zvcm1QaHJhc2UocGhyYXNlLCBzdWJzdGl0dXRpb25zLCBsb2NhbGUsIHRva2VuUmVnZXgsIHBsdXJhbFJ1bGVzKSB7XG4gIGlmICh0eXBlb2YgcGhyYXNlICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1BvbHlnbG90LnRyYW5zZm9ybVBocmFzZSBleHBlY3RzIGFyZ3VtZW50ICMxIHRvIGJlIHN0cmluZycpO1xuICB9XG5cbiAgaWYgKHN1YnN0aXR1dGlvbnMgPT0gbnVsbCkge1xuICAgIHJldHVybiBwaHJhc2U7XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gcGhyYXNlO1xuICB2YXIgaW50ZXJwb2xhdGlvblJlZ2V4ID0gdG9rZW5SZWdleCB8fCBkZWZhdWx0VG9rZW5SZWdleDtcbiAgdmFyIHBsdXJhbFJ1bGVzT3JEZWZhdWx0ID0gcGx1cmFsUnVsZXMgfHwgZGVmYXVsdFBsdXJhbFJ1bGVzO1xuXG4gIC8vIGFsbG93IG51bWJlciBhcyBhIHBsdXJhbGl6YXRpb24gc2hvcnRjdXRcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc3Vic3RpdHV0aW9ucyA9PT0gJ251bWJlcicgPyB7IHNtYXJ0X2NvdW50OiBzdWJzdGl0dXRpb25zIH0gOiBzdWJzdGl0dXRpb25zO1xuXG4gIC8vIFNlbGVjdCBwbHVyYWwgZm9ybTogYmFzZWQgb24gYSBwaHJhc2UgdGV4dCB0aGF0IGNvbnRhaW5zIGBuYFxuICAvLyBwbHVyYWwgZm9ybXMgc2VwYXJhdGVkIGJ5IGBkZWxpbWl0ZXJgLCBhIGBsb2NhbGVgLCBhbmQgYSBgc3Vic3RpdHV0aW9ucy5zbWFydF9jb3VudGAsXG4gIC8vIGNob29zZSB0aGUgY29ycmVjdCBwbHVyYWwgZm9ybS4gVGhpcyBpcyBvbmx5IGRvbmUgaWYgYGNvdW50YCBpcyBzZXQuXG4gIGlmIChvcHRpb25zLnNtYXJ0X2NvdW50ICE9IG51bGwgJiYgcmVzdWx0KSB7XG4gICAgdmFyIHRleHRzID0gc3BsaXQuY2FsbChyZXN1bHQsIGRlbGltaXRlcik7XG4gICAgcmVzdWx0ID0gdHJpbSh0ZXh0c1twbHVyYWxUeXBlSW5kZXgocGx1cmFsUnVsZXNPckRlZmF1bHQsIGxvY2FsZSB8fCAnZW4nLCBvcHRpb25zLnNtYXJ0X2NvdW50KV0gfHwgdGV4dHNbMF0pO1xuICB9XG5cbiAgLy8gSW50ZXJwb2xhdGU6IENyZWF0ZXMgYSBgUmVnRXhwYCBvYmplY3QgZm9yIGVhY2ggaW50ZXJwb2xhdGlvbiBwbGFjZWhvbGRlci5cbiAgcmVzdWx0ID0gcmVwbGFjZS5jYWxsKHJlc3VsdCwgaW50ZXJwb2xhdGlvblJlZ2V4LCBmdW5jdGlvbiAoZXhwcmVzc2lvbiwgYXJndW1lbnQpIHtcbiAgICBpZiAoIWhhcyhvcHRpb25zLCBhcmd1bWVudCkgfHwgb3B0aW9uc1thcmd1bWVudF0gPT0gbnVsbCkgeyByZXR1cm4gZXhwcmVzc2lvbjsgfVxuICAgIHJldHVybiBvcHRpb25zW2FyZ3VtZW50XTtcbiAgfSk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gIyMjIFBvbHlnbG90IGNsYXNzIGNvbnN0cnVjdG9yXG5mdW5jdGlvbiBQb2x5Z2xvdChvcHRpb25zKSB7XG4gIHZhciBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgdGhpcy5waHJhc2VzID0ge307XG4gIHRoaXMuZXh0ZW5kKG9wdHMucGhyYXNlcyB8fCB7fSk7XG4gIHRoaXMuY3VycmVudExvY2FsZSA9IG9wdHMubG9jYWxlIHx8ICdlbic7XG4gIHZhciBhbGxvd01pc3NpbmcgPSBvcHRzLmFsbG93TWlzc2luZyA/IHRyYW5zZm9ybVBocmFzZSA6IG51bGw7XG4gIHRoaXMub25NaXNzaW5nS2V5ID0gdHlwZW9mIG9wdHMub25NaXNzaW5nS2V5ID09PSAnZnVuY3Rpb24nID8gb3B0cy5vbk1pc3NpbmdLZXkgOiBhbGxvd01pc3Npbmc7XG4gIHRoaXMud2FybiA9IG9wdHMud2FybiB8fCB3YXJuO1xuICB0aGlzLnRva2VuUmVnZXggPSBjb25zdHJ1Y3RUb2tlblJlZ2V4KG9wdHMuaW50ZXJwb2xhdGlvbik7XG4gIHRoaXMucGx1cmFsUnVsZXMgPSBvcHRzLnBsdXJhbFJ1bGVzIHx8IGRlZmF1bHRQbHVyYWxSdWxlcztcbn1cblxuLy8gIyMjIHBvbHlnbG90LmxvY2FsZShbbG9jYWxlXSlcbi8vXG4vLyBHZXQgb3Igc2V0IGxvY2FsZS4gSW50ZXJuYWxseSwgUG9seWdsb3Qgb25seSB1c2VzIGxvY2FsZSBmb3IgcGx1cmFsaXphdGlvbi5cblBvbHlnbG90LnByb3RvdHlwZS5sb2NhbGUgPSBmdW5jdGlvbiAobmV3TG9jYWxlKSB7XG4gIGlmIChuZXdMb2NhbGUpIHRoaXMuY3VycmVudExvY2FsZSA9IG5ld0xvY2FsZTtcbiAgcmV0dXJuIHRoaXMuY3VycmVudExvY2FsZTtcbn07XG5cbi8vICMjIyBwb2x5Z2xvdC5leHRlbmQocGhyYXNlcylcbi8vXG4vLyBVc2UgYGV4dGVuZGAgdG8gdGVsbCBQb2x5Z2xvdCBob3cgdG8gdHJhbnNsYXRlIGEgZ2l2ZW4ga2V5LlxuLy9cbi8vICAgICBwb2x5Z2xvdC5leHRlbmQoe1xuLy8gICAgICAgXCJoZWxsb1wiOiBcIkhlbGxvXCIsXG4vLyAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiXG4vLyAgICAgfSk7XG4vL1xuLy8gVGhlIGtleSBjYW4gYmUgYW55IHN0cmluZy4gIEZlZWwgZnJlZSB0byBjYWxsIGBleHRlbmRgIG11bHRpcGxlIHRpbWVzO1xuLy8gaXQgd2lsbCBvdmVycmlkZSBhbnkgcGhyYXNlcyB3aXRoIHRoZSBzYW1lIGtleSwgYnV0IGxlYXZlIGV4aXN0aW5nIHBocmFzZXNcbi8vIHVudG91Y2hlZC5cbi8vXG4vLyBJdCBpcyBhbHNvIHBvc3NpYmxlIHRvIHBhc3MgbmVzdGVkIHBocmFzZSBvYmplY3RzLCB3aGljaCBnZXQgZmxhdHRlbmVkXG4vLyBpbnRvIGFuIG9iamVjdCB3aXRoIHRoZSBuZXN0ZWQga2V5cyBjb25jYXRlbmF0ZWQgdXNpbmcgZG90IG5vdGF0aW9uLlxuLy9cbi8vICAgICBwb2x5Z2xvdC5leHRlbmQoe1xuLy8gICAgICAgXCJuYXZcIjoge1xuLy8gICAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgICAgXCJoZWxsb19uYW1lXCI6IFwiSGVsbG8sICV7bmFtZX1cIixcbi8vICAgICAgICAgXCJzaWRlYmFyXCI6IHtcbi8vICAgICAgICAgICBcIndlbGNvbWVcIjogXCJXZWxjb21lXCJcbi8vICAgICAgICAgfVxuLy8gICAgICAgfVxuLy8gICAgIH0pO1xuLy9cbi8vICAgICBjb25zb2xlLmxvZyhwb2x5Z2xvdC5waHJhc2VzKTtcbi8vICAgICAvLyB7XG4vLyAgICAgLy8gICAnbmF2LmhlbGxvJzogJ0hlbGxvJyxcbi8vICAgICAvLyAgICduYXYuaGVsbG9fbmFtZSc6ICdIZWxsbywgJXtuYW1lfScsXG4vLyAgICAgLy8gICAnbmF2LnNpZGViYXIud2VsY29tZSc6ICdXZWxjb21lJ1xuLy8gICAgIC8vIH1cbi8vXG4vLyBgZXh0ZW5kYCBhY2NlcHRzIGFuIG9wdGlvbmFsIHNlY29uZCBhcmd1bWVudCwgYHByZWZpeGAsIHdoaWNoIGNhbiBiZSB1c2VkXG4vLyB0byBwcmVmaXggZXZlcnkga2V5IGluIHRoZSBwaHJhc2VzIG9iamVjdCB3aXRoIHNvbWUgc3RyaW5nLCB1c2luZyBkb3Rcbi8vIG5vdGF0aW9uLlxuLy9cbi8vICAgICBwb2x5Z2xvdC5leHRlbmQoe1xuLy8gICAgICAgXCJoZWxsb1wiOiBcIkhlbGxvXCIsXG4vLyAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiXG4vLyAgICAgfSwgXCJuYXZcIik7XG4vL1xuLy8gICAgIGNvbnNvbGUubG9nKHBvbHlnbG90LnBocmFzZXMpO1xuLy8gICAgIC8vIHtcbi8vICAgICAvLyAgICduYXYuaGVsbG8nOiAnSGVsbG8nLFxuLy8gICAgIC8vICAgJ25hdi5oZWxsb19uYW1lJzogJ0hlbGxvLCAle25hbWV9J1xuLy8gICAgIC8vIH1cbi8vXG4vLyBUaGlzIGZlYXR1cmUgaXMgdXNlZCBpbnRlcm5hbGx5IHRvIHN1cHBvcnQgbmVzdGVkIHBocmFzZSBvYmplY3RzLlxuUG9seWdsb3QucHJvdG90eXBlLmV4dGVuZCA9IGZ1bmN0aW9uIChtb3JlUGhyYXNlcywgcHJlZml4KSB7XG4gIGZvckVhY2gobW9yZVBocmFzZXMsIGZ1bmN0aW9uIChwaHJhc2UsIGtleSkge1xuICAgIHZhciBwcmVmaXhlZEtleSA9IHByZWZpeCA/IHByZWZpeCArICcuJyArIGtleSA6IGtleTtcbiAgICBpZiAodHlwZW9mIHBocmFzZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMuZXh0ZW5kKHBocmFzZSwgcHJlZml4ZWRLZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBocmFzZXNbcHJlZml4ZWRLZXldID0gcGhyYXNlO1xuICAgIH1cbiAgfSwgdGhpcyk7XG59O1xuXG4vLyAjIyMgcG9seWdsb3QudW5zZXQocGhyYXNlcylcbi8vIFVzZSBgdW5zZXRgIHRvIHNlbGVjdGl2ZWx5IHJlbW92ZSBrZXlzIGZyb20gYSBwb2x5Z2xvdCBpbnN0YW5jZS5cbi8vXG4vLyAgICAgcG9seWdsb3QudW5zZXQoXCJzb21lX2tleVwiKTtcbi8vICAgICBwb2x5Z2xvdC51bnNldCh7XG4vLyAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbi8vICAgICB9KTtcbi8vXG4vLyBUaGUgdW5zZXQgbWV0aG9kIGNhbiB0YWtlIGVpdGhlciBhIHN0cmluZyAoZm9yIHRoZSBrZXkpLCBvciBhbiBvYmplY3QgaGFzaCB3aXRoXG4vLyB0aGUga2V5cyB0aGF0IHlvdSB3b3VsZCBsaWtlIHRvIHVuc2V0LlxuUG9seWdsb3QucHJvdG90eXBlLnVuc2V0ID0gZnVuY3Rpb24gKG1vcmVQaHJhc2VzLCBwcmVmaXgpIHtcbiAgaWYgKHR5cGVvZiBtb3JlUGhyYXNlcyA9PT0gJ3N0cmluZycpIHtcbiAgICBkZWxldGUgdGhpcy5waHJhc2VzW21vcmVQaHJhc2VzXTtcbiAgfSBlbHNlIHtcbiAgICBmb3JFYWNoKG1vcmVQaHJhc2VzLCBmdW5jdGlvbiAocGhyYXNlLCBrZXkpIHtcbiAgICAgIHZhciBwcmVmaXhlZEtleSA9IHByZWZpeCA/IHByZWZpeCArICcuJyArIGtleSA6IGtleTtcbiAgICAgIGlmICh0eXBlb2YgcGhyYXNlID09PSAnb2JqZWN0Jykge1xuICAgICAgICB0aGlzLnVuc2V0KHBocmFzZSwgcHJlZml4ZWRLZXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIHRoaXMucGhyYXNlc1twcmVmaXhlZEtleV07XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gIH1cbn07XG5cbi8vICMjIyBwb2x5Z2xvdC5jbGVhcigpXG4vL1xuLy8gQ2xlYXJzIGFsbCBwaHJhc2VzLiBVc2VmdWwgZm9yIHNwZWNpYWwgY2FzZXMsIHN1Y2ggYXMgZnJlZWluZ1xuLy8gdXAgbWVtb3J5IGlmIHlvdSBoYXZlIGxvdHMgb2YgcGhyYXNlcyBidXQgbm8gbG9uZ2VyIG5lZWQgdG9cbi8vIHBlcmZvcm0gYW55IHRyYW5zbGF0aW9uLiBBbHNvIHVzZWQgaW50ZXJuYWxseSBieSBgcmVwbGFjZWAuXG5Qb2x5Z2xvdC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucGhyYXNlcyA9IHt9O1xufTtcblxuLy8gIyMjIHBvbHlnbG90LnJlcGxhY2UocGhyYXNlcylcbi8vXG4vLyBDb21wbGV0ZWx5IHJlcGxhY2UgdGhlIGV4aXN0aW5nIHBocmFzZXMgd2l0aCBhIG5ldyBzZXQgb2YgcGhyYXNlcy5cbi8vIE5vcm1hbGx5LCBqdXN0IHVzZSBgZXh0ZW5kYCB0byBhZGQgbW9yZSBwaHJhc2VzLCBidXQgdW5kZXIgY2VydGFpblxuLy8gY2lyY3Vtc3RhbmNlcywgeW91IG1heSB3YW50IHRvIG1ha2Ugc3VyZSBubyBvbGQgcGhyYXNlcyBhcmUgbHlpbmcgYXJvdW5kLlxuUG9seWdsb3QucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiAobmV3UGhyYXNlcykge1xuICB0aGlzLmNsZWFyKCk7XG4gIHRoaXMuZXh0ZW5kKG5ld1BocmFzZXMpO1xufTtcblxuXG4vLyAjIyMgcG9seWdsb3QudChrZXksIG9wdGlvbnMpXG4vL1xuLy8gVGhlIG1vc3QtdXNlZCBtZXRob2QuIFByb3ZpZGUgYSBrZXksIGFuZCBgdGAgd2lsbCByZXR1cm4gdGhlXG4vLyBwaHJhc2UuXG4vL1xuLy8gICAgIHBvbHlnbG90LnQoXCJoZWxsb1wiKTtcbi8vICAgICA9PiBcIkhlbGxvXCJcbi8vXG4vLyBUaGUgcGhyYXNlIHZhbHVlIGlzIHByb3ZpZGVkIGZpcnN0IGJ5IGEgY2FsbCB0byBgcG9seWdsb3QuZXh0ZW5kKClgIG9yXG4vLyBgcG9seWdsb3QucmVwbGFjZSgpYC5cbi8vXG4vLyBQYXNzIGluIGFuIG9iamVjdCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIHBlcmZvcm0gaW50ZXJwb2xhdGlvbi5cbi8vXG4vLyAgICAgcG9seWdsb3QudChcImhlbGxvX25hbWVcIiwge25hbWU6IFwiU3Bpa2VcIn0pO1xuLy8gICAgID0+IFwiSGVsbG8sIFNwaWtlXCJcbi8vXG4vLyBJZiB5b3UgbGlrZSwgeW91IGNhbiBwcm92aWRlIGEgZGVmYXVsdCB2YWx1ZSBpbiBjYXNlIHRoZSBwaHJhc2UgaXMgbWlzc2luZy5cbi8vIFVzZSB0aGUgc3BlY2lhbCBvcHRpb24ga2V5IFwiX1wiIHRvIHNwZWNpZnkgYSBkZWZhdWx0LlxuLy9cbi8vICAgICBwb2x5Z2xvdC50KFwiaV9saWtlX3RvX3dyaXRlX2luX2xhbmd1YWdlXCIsIHtcbi8vICAgICAgIF86IFwiSSBsaWtlIHRvIHdyaXRlIGluICV7bGFuZ3VhZ2V9LlwiLFxuLy8gICAgICAgbGFuZ3VhZ2U6IFwiSmF2YVNjcmlwdFwiXG4vLyAgICAgfSk7XG4vLyAgICAgPT4gXCJJIGxpa2UgdG8gd3JpdGUgaW4gSmF2YVNjcmlwdC5cIlxuLy9cblBvbHlnbG90LnByb3RvdHlwZS50ID0gZnVuY3Rpb24gKGtleSwgb3B0aW9ucykge1xuICB2YXIgcGhyYXNlLCByZXN1bHQ7XG4gIHZhciBvcHRzID0gb3B0aW9ucyA9PSBudWxsID8ge30gOiBvcHRpb25zO1xuICBpZiAodHlwZW9mIHRoaXMucGhyYXNlc1trZXldID09PSAnc3RyaW5nJykge1xuICAgIHBocmFzZSA9IHRoaXMucGhyYXNlc1trZXldO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRzLl8gPT09ICdzdHJpbmcnKSB7XG4gICAgcGhyYXNlID0gb3B0cy5fO1xuICB9IGVsc2UgaWYgKHRoaXMub25NaXNzaW5nS2V5KSB7XG4gICAgdmFyIG9uTWlzc2luZ0tleSA9IHRoaXMub25NaXNzaW5nS2V5O1xuICAgIHJlc3VsdCA9IG9uTWlzc2luZ0tleShrZXksIG9wdHMsIHRoaXMuY3VycmVudExvY2FsZSwgdGhpcy50b2tlblJlZ2V4LCB0aGlzLnBsdXJhbFJ1bGVzKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLndhcm4oJ01pc3NpbmcgdHJhbnNsYXRpb24gZm9yIGtleTogXCInICsga2V5ICsgJ1wiJyk7XG4gICAgcmVzdWx0ID0ga2V5O1xuICB9XG4gIGlmICh0eXBlb2YgcGhyYXNlID09PSAnc3RyaW5nJykge1xuICAgIHJlc3VsdCA9IHRyYW5zZm9ybVBocmFzZShwaHJhc2UsIG9wdHMsIHRoaXMuY3VycmVudExvY2FsZSwgdGhpcy50b2tlblJlZ2V4LCB0aGlzLnBsdXJhbFJ1bGVzKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG4vLyAjIyMgcG9seWdsb3QuaGFzKGtleSlcbi8vXG4vLyBDaGVjayBpZiBwb2x5Z2xvdCBoYXMgYSB0cmFuc2xhdGlvbiBmb3IgZ2l2ZW4ga2V5XG5Qb2x5Z2xvdC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gaGFzKHRoaXMucGhyYXNlcywga2V5KTtcbn07XG5cbi8vIGV4cG9ydCB0cmFuc2Zvcm1QaHJhc2VcblBvbHlnbG90LnRyYW5zZm9ybVBocmFzZSA9IGZ1bmN0aW9uIHRyYW5zZm9ybShwaHJhc2UsIHN1YnN0aXR1dGlvbnMsIGxvY2FsZSkge1xuICByZXR1cm4gdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUG9seWdsb3Q7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzU2hpbTtcbmlmICghT2JqZWN0LmtleXMpIHtcblx0Ly8gbW9kaWZpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZXMtc2hpbXMvZXM1LXNoaW1cblx0dmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cdHZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cdHZhciBpc0FyZ3MgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZ2xvYmFsLXJlcXVpcmVcblx0dmFyIGlzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cdHZhciBoYXNEb250RW51bUJ1ZyA9ICFpc0VudW1lcmFibGUuY2FsbCh7IHRvU3RyaW5nOiBudWxsIH0sICd0b1N0cmluZycpO1xuXHR2YXIgaGFzUHJvdG9FbnVtQnVnID0gaXNFbnVtZXJhYmxlLmNhbGwoZnVuY3Rpb24gKCkge30sICdwcm90b3R5cGUnKTtcblx0dmFyIGRvbnRFbnVtcyA9IFtcblx0XHQndG9TdHJpbmcnLFxuXHRcdCd0b0xvY2FsZVN0cmluZycsXG5cdFx0J3ZhbHVlT2YnLFxuXHRcdCdoYXNPd25Qcm9wZXJ0eScsXG5cdFx0J2lzUHJvdG90eXBlT2YnLFxuXHRcdCdwcm9wZXJ0eUlzRW51bWVyYWJsZScsXG5cdFx0J2NvbnN0cnVjdG9yJ1xuXHRdO1xuXHR2YXIgZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGUgPSBmdW5jdGlvbiAobykge1xuXHRcdHZhciBjdG9yID0gby5jb25zdHJ1Y3Rvcjtcblx0XHRyZXR1cm4gY3RvciAmJiBjdG9yLnByb3RvdHlwZSA9PT0gbztcblx0fTtcblx0dmFyIGV4Y2x1ZGVkS2V5cyA9IHtcblx0XHQkYXBwbGljYXRpb25DYWNoZTogdHJ1ZSxcblx0XHQkY29uc29sZTogdHJ1ZSxcblx0XHQkZXh0ZXJuYWw6IHRydWUsXG5cdFx0JGZyYW1lOiB0cnVlLFxuXHRcdCRmcmFtZUVsZW1lbnQ6IHRydWUsXG5cdFx0JGZyYW1lczogdHJ1ZSxcblx0XHQkaW5uZXJIZWlnaHQ6IHRydWUsXG5cdFx0JGlubmVyV2lkdGg6IHRydWUsXG5cdFx0JG9ubW96ZnVsbHNjcmVlbmNoYW5nZTogdHJ1ZSxcblx0XHQkb25tb3pmdWxsc2NyZWVuZXJyb3I6IHRydWUsXG5cdFx0JG91dGVySGVpZ2h0OiB0cnVlLFxuXHRcdCRvdXRlcldpZHRoOiB0cnVlLFxuXHRcdCRwYWdlWE9mZnNldDogdHJ1ZSxcblx0XHQkcGFnZVlPZmZzZXQ6IHRydWUsXG5cdFx0JHBhcmVudDogdHJ1ZSxcblx0XHQkc2Nyb2xsTGVmdDogdHJ1ZSxcblx0XHQkc2Nyb2xsVG9wOiB0cnVlLFxuXHRcdCRzY3JvbGxYOiB0cnVlLFxuXHRcdCRzY3JvbGxZOiB0cnVlLFxuXHRcdCRzZWxmOiB0cnVlLFxuXHRcdCR3ZWJraXRJbmRleGVkREI6IHRydWUsXG5cdFx0JHdlYmtpdFN0b3JhZ2VJbmZvOiB0cnVlLFxuXHRcdCR3aW5kb3c6IHRydWVcblx0fTtcblx0dmFyIGhhc0F1dG9tYXRpb25FcXVhbGl0eUJ1ZyA9IChmdW5jdGlvbiAoKSB7XG5cdFx0LyogZ2xvYmFsIHdpbmRvdyAqL1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmb3IgKHZhciBrIGluIHdpbmRvdykge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKCFleGNsdWRlZEtleXNbJyQnICsga10gJiYgaGFzLmNhbGwod2luZG93LCBrKSAmJiB3aW5kb3dba10gIT09IG51bGwgJiYgdHlwZW9mIHdpbmRvd1trXSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0ZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGUod2luZG93W2tdKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSgpKTtcblx0dmFyIGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlSWZOb3RCdWdneSA9IGZ1bmN0aW9uIChvKSB7XG5cdFx0LyogZ2xvYmFsIHdpbmRvdyAqL1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCAhaGFzQXV0b21hdGlvbkVxdWFsaXR5QnVnKSB7XG5cdFx0XHRyZXR1cm4gZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGUobyk7XG5cdFx0fVxuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGUobyk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fTtcblxuXHRrZXlzU2hpbSA9IGZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG5cdFx0dmFyIGlzT2JqZWN0ID0gb2JqZWN0ICE9PSBudWxsICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnO1xuXHRcdHZhciBpc0Z1bmN0aW9uID0gdG9TdHIuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXHRcdHZhciBpc0FyZ3VtZW50cyA9IGlzQXJncyhvYmplY3QpO1xuXHRcdHZhciBpc1N0cmluZyA9IGlzT2JqZWN0ICYmIHRvU3RyLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cdFx0dmFyIHRoZUtleXMgPSBbXTtcblxuXHRcdGlmICghaXNPYmplY3QgJiYgIWlzRnVuY3Rpb24gJiYgIWlzQXJndW1lbnRzKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3Qua2V5cyBjYWxsZWQgb24gYSBub24tb2JqZWN0Jyk7XG5cdFx0fVxuXG5cdFx0dmFyIHNraXBQcm90byA9IGhhc1Byb3RvRW51bUJ1ZyAmJiBpc0Z1bmN0aW9uO1xuXHRcdGlmIChpc1N0cmluZyAmJiBvYmplY3QubGVuZ3RoID4gMCAmJiAhaGFzLmNhbGwob2JqZWN0LCAwKSkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3QubGVuZ3RoOyArK2kpIHtcblx0XHRcdFx0dGhlS2V5cy5wdXNoKFN0cmluZyhpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGlzQXJndW1lbnRzICYmIG9iamVjdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IG9iamVjdC5sZW5ndGg7ICsraikge1xuXHRcdFx0XHR0aGVLZXlzLnB1c2goU3RyaW5nKGopKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9yICh2YXIgbmFtZSBpbiBvYmplY3QpIHtcblx0XHRcdFx0aWYgKCEoc2tpcFByb3RvICYmIG5hbWUgPT09ICdwcm90b3R5cGUnKSAmJiBoYXMuY2FsbChvYmplY3QsIG5hbWUpKSB7XG5cdFx0XHRcdFx0dGhlS2V5cy5wdXNoKFN0cmluZyhuYW1lKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoaGFzRG9udEVudW1CdWcpIHtcblx0XHRcdHZhciBza2lwQ29uc3RydWN0b3IgPSBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZUlmTm90QnVnZ3kob2JqZWN0KTtcblxuXHRcdFx0Zm9yICh2YXIgayA9IDA7IGsgPCBkb250RW51bXMubGVuZ3RoOyArK2spIHtcblx0XHRcdFx0aWYgKCEoc2tpcENvbnN0cnVjdG9yICYmIGRvbnRFbnVtc1trXSA9PT0gJ2NvbnN0cnVjdG9yJykgJiYgaGFzLmNhbGwob2JqZWN0LCBkb250RW51bXNba10pKSB7XG5cdFx0XHRcdFx0dGhlS2V5cy5wdXNoKGRvbnRFbnVtc1trXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoZUtleXM7XG5cdH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGtleXNTaGltO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgaXNBcmdzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpO1xuXG52YXIgb3JpZ0tleXMgPSBPYmplY3Qua2V5cztcbnZhciBrZXlzU2hpbSA9IG9yaWdLZXlzID8gZnVuY3Rpb24ga2V5cyhvKSB7IHJldHVybiBvcmlnS2V5cyhvKTsgfSA6IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcblxudmFyIG9yaWdpbmFsS2V5cyA9IE9iamVjdC5rZXlzO1xuXG5rZXlzU2hpbS5zaGltID0gZnVuY3Rpb24gc2hpbU9iamVjdEtleXMoKSB7XG5cdGlmIChPYmplY3Qua2V5cykge1xuXHRcdHZhciBrZXlzV29ya3NXaXRoQXJndW1lbnRzID0gKGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFNhZmFyaSA1LjAgYnVnXG5cdFx0XHR2YXIgYXJncyA9IE9iamVjdC5rZXlzKGFyZ3VtZW50cyk7XG5cdFx0XHRyZXR1cm4gYXJncyAmJiBhcmdzLmxlbmd0aCA9PT0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHR9KDEsIDIpKTtcblx0XHRpZiAoIWtleXNXb3Jrc1dpdGhBcmd1bWVudHMpIHtcblx0XHRcdE9iamVjdC5rZXlzID0gZnVuY3Rpb24ga2V5cyhvYmplY3QpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcblx0XHRcdFx0aWYgKGlzQXJncyhvYmplY3QpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9yaWdpbmFsS2V5cyhzbGljZS5jYWxsKG9iamVjdCkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBvcmlnaW5hbEtleXMob2JqZWN0KTtcblx0XHRcdH07XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdE9iamVjdC5rZXlzID0ga2V5c1NoaW07XG5cdH1cblx0cmV0dXJuIE9iamVjdC5rZXlzIHx8IGtleXNTaGltO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzU2hpbTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuXHR2YXIgc3RyID0gdG9TdHIuY2FsbCh2YWx1ZSk7XG5cdHZhciBpc0FyZ3MgPSBzdHIgPT09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXHRpZiAoIWlzQXJncykge1xuXHRcdGlzQXJncyA9IHN0ciAhPT0gJ1tvYmplY3QgQXJyYXldJyAmJlxuXHRcdFx0dmFsdWUgIT09IG51bGwgJiZcblx0XHRcdHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcblx0XHRcdHR5cGVvZiB2YWx1ZS5sZW5ndGggPT09ICdudW1iZXInICYmXG5cdFx0XHR2YWx1ZS5sZW5ndGggPj0gMCAmJlxuXHRcdFx0dG9TdHIuY2FsbCh2YWx1ZS5jYWxsZWUpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXHR9XG5cdHJldHVybiBpc0FyZ3M7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJ2VzLWFic3RyYWN0LzIwMjAvUmVxdWlyZU9iamVjdENvZXJjaWJsZScpO1xudmFyIFRvU3RyaW5nID0gcmVxdWlyZSgnZXMtYWJzdHJhY3QvMjAyMC9Ub1N0cmluZycpO1xudmFyIGNhbGxCb3VuZCA9IHJlcXVpcmUoJ2NhbGwtYmluZC9jYWxsQm91bmQnKTtcbnZhciAkcmVwbGFjZSA9IGNhbGxCb3VuZCgnU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlJyk7XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnRyb2wtcmVnZXggKi9cbnZhciBsZWZ0V2hpdGVzcGFjZSA9IC9eW1xceDA5XFx4MEFcXHgwQlxceDBDXFx4MERcXHgyMFxceEEwXFx1MTY4MFxcdTE4MEVcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwQVxcdTIwMkZcXHUyMDVGXFx1MzAwMFxcdTIwMjhcXHUyMDI5XFx1RkVGRl0rLztcbnZhciByaWdodFdoaXRlc3BhY2UgPSAvW1xceDA5XFx4MEFcXHgwQlxceDBDXFx4MERcXHgyMFxceEEwXFx1MTY4MFxcdTE4MEVcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwQVxcdTIwMkZcXHUyMDVGXFx1MzAwMFxcdTIwMjhcXHUyMDI5XFx1RkVGRl0rJC87XG4vKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnRyb2wtcmVnZXggKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmltKCkge1xuXHR2YXIgUyA9IFRvU3RyaW5nKFJlcXVpcmVPYmplY3RDb2VyY2libGUodGhpcykpO1xuXHRyZXR1cm4gJHJlcGxhY2UoJHJlcGxhY2UoUywgbGVmdFdoaXRlc3BhY2UsICcnKSwgcmlnaHRXaGl0ZXNwYWNlLCAnJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FsbEJpbmQgPSByZXF1aXJlKCdjYWxsLWJpbmQnKTtcbnZhciBkZWZpbmUgPSByZXF1aXJlKCdkZWZpbmUtcHJvcGVydGllcycpO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG52YXIgZ2V0UG9seWZpbGwgPSByZXF1aXJlKCcuL3BvbHlmaWxsJyk7XG52YXIgc2hpbSA9IHJlcXVpcmUoJy4vc2hpbScpO1xuXG52YXIgYm91bmRUcmltID0gY2FsbEJpbmQoZ2V0UG9seWZpbGwoKSk7XG5cbmRlZmluZShib3VuZFRyaW0sIHtcblx0Z2V0UG9seWZpbGw6IGdldFBvbHlmaWxsLFxuXHRpbXBsZW1lbnRhdGlvbjogaW1wbGVtZW50YXRpb24sXG5cdHNoaW06IHNoaW1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJvdW5kVHJpbTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG52YXIgemVyb1dpZHRoU3BhY2UgPSAnXFx1MjAwYic7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0UG9seWZpbGwoKSB7XG5cdGlmIChTdHJpbmcucHJvdG90eXBlLnRyaW0gJiYgemVyb1dpZHRoU3BhY2UudHJpbSgpID09PSB6ZXJvV2lkdGhTcGFjZSkge1xuXHRcdHJldHVybiBTdHJpbmcucHJvdG90eXBlLnRyaW07XG5cdH1cblx0cmV0dXJuIGltcGxlbWVudGF0aW9uO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRlZmluZSA9IHJlcXVpcmUoJ2RlZmluZS1wcm9wZXJ0aWVzJyk7XG52YXIgZ2V0UG9seWZpbGwgPSByZXF1aXJlKCcuL3BvbHlmaWxsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hpbVN0cmluZ1RyaW0oKSB7XG5cdHZhciBwb2x5ZmlsbCA9IGdldFBvbHlmaWxsKCk7XG5cdGRlZmluZShTdHJpbmcucHJvdG90eXBlLCB7IHRyaW06IHBvbHlmaWxsIH0sIHtcblx0XHR0cmltOiBmdW5jdGlvbiB0ZXN0VHJpbSgpIHtcblx0XHRcdHJldHVybiBTdHJpbmcucHJvdG90eXBlLnRyaW0gIT09IHBvbHlmaWxsO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBwb2x5ZmlsbDtcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIF9fREVWX18gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nO1xuXG52YXIgd2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChfX0RFVl9fKSB7XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiBwcmludFdhcm5pbmcoZm9ybWF0LCBhcmdzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAxID8gbGVuIC0gMSA6IDApO1xuICAgIGZvciAodmFyIGtleSA9IDE7IGtleSA8IGxlbjsga2V5KyspIHtcbiAgICAgIGFyZ3Nba2V5IC0gMV0gPSBhcmd1bWVudHNba2V5XTtcbiAgICB9XG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICtcbiAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KTtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9XG5cbiAgd2FybmluZyA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhcmdzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAyID8gbGVuIC0gMiA6IDApO1xuICAgIGZvciAodmFyIGtleSA9IDI7IGtleSA8IGxlbjsga2V5KyspIHtcbiAgICAgIGFyZ3Nba2V5IC0gMl0gPSBhcmd1bWVudHNba2V5XTtcbiAgICB9XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgK1xuICAgICAgICAgICdtZXNzYWdlIGFyZ3VtZW50J1xuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIHByaW50V2FybmluZy5hcHBseShudWxsLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YXJuaW5nO1xuIiwiaW1wb3J0IHsgSVBhZ2VWYWxpZGF0aW9uSG9vaywgRXJyb3JCbG9jayB9IGZyb20gJy4uLy4uLy4uLy4uL3NyYy9icm93c2VyJ1xuXG5leHBvcnQgY29uc3QgaG9vazogSVBhZ2VWYWxpZGF0aW9uSG9vayA9IHtcbiAgY29tcG9uZW50TmFtZTogJ2Zhdm91cml0ZS1jb2xvdXInLFxuICByZWdpc3RlcjogKHsgZGF0YUlkLCBmb3JtIH0pID0+IHtcbiAgICBjb25zdCBpbnB1dEZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoZGF0YUlkKVswXSBhcyBIVE1MSW5wdXRFbGVtZW50XG5cbiAgICBpbnB1dEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgY29uc3QgZXJyb3JCbG9jayA9IG5ldyBFcnJvckJsb2NrKGRhdGFJZClcbiAgICAgIGZvcm1cbiAgICAgICAgLnZhbGlkYXRvckZvcihkYXRhSWQpXG4gICAgICAgID8udmFsaWRhdGUoaW5wdXRGaWVsZC52YWx1ZSlcbiAgICAgICAgLmZvckVhY2goKGUpID0+IGVycm9yQmxvY2suYWRkKGZvcm0udmlldy50cmFuc2xhdGUoZSkpKVxuICAgICAgZXJyb3JCbG9jay5yZW5kZXIoKVxuICAgIH0pXG4gIH1cbn1cbiIsImltcG9ydCB7IGhvb2sgYXMgZmF2b3VyaXRlQ29sb3VySG9vayB9IGZyb20gJy4vZmF2b3VyaXRlLWNvbG91cidcblxuZXhwb3J0IGNvbnN0IGhvb2tzID0gW2Zhdm91cml0ZUNvbG91ckhvb2tdXG4iLCJleHBvcnQgKiBmcm9tICcuL3BhZ2UtdmFsaWRhdGlvbi1wbHVnaW4nXG5leHBvcnQgeyBFcnJvckJsb2NrIH0gZnJvbSAnLi4vdGVtcGxhdGVzL2Vycm9yLWJsb2NrJ1xuIiwiaW1wb3J0IHsgSUZvcm1zQnVpbGRlclBsdWdpbiwgRm9ybSwgRmllbGRTZXQsIEZpZWxkIH0gZnJvbSAnQHRuZ2JsL2Zvcm1zJ1xuaW1wb3J0IHsgZXZlbnRIb29rcyBhcyBjb3JlRXZlbnRIb29rcyB9IGZyb20gJy4uL3RlbXBsYXRlcydcbmltcG9ydCB7IHZlcnNpb24sIG5hbWUgfSBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nXG5cbmRlY2xhcmUgbW9kdWxlICdAdG5nYmwvZm9ybXMnIHtcbiAgaW50ZXJmYWNlIEZvcm0ge1xuICAgIC8qKlxuICAgICAqIEJpbmRzIGFsbCBwYWdlIGJpbmRpbmdzIHJlbGV2YW50IHRvIHRoZSBmb3JtIGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBBZGRlZCBieSB0aGUgQHRuZ2JsL2Zvcm1zLW51bmp1Y2tzIHBsdWdpblxuICAgICAqL1xuICAgIGJpbmRUb1BhZ2UoKTogdm9pZFxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVBhZ2VWYWxpZGF0aW9uSG9va0FyZ3Mge1xuICBkYXRhSWQ6IHN0cmluZ1xuICBmb3JtOiBGb3JtXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVBhZ2VWYWxpZGF0aW9uSG9vayB7XG4gIGNvbXBvbmVudE5hbWU6IHN0cmluZ1xuICByZWdpc3RlcjogKGFyZ3M6IElQYWdlVmFsaWRhdGlvbkhvb2tBcmdzKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFnZVZhbGlkYXRpb25QbHVnaW5PcHRpb25zIHtcbiAgaG9va3M6IElQYWdlVmFsaWRhdGlvbkhvb2tbXVxufVxuXG5leHBvcnQgY29uc3QgcGFnZVZhbGlkYXRpb24gPSAoXG4gIG9wdHM6IFBhZ2VWYWxpZGF0aW9uUGx1Z2luT3B0aW9uc1xuKTogSUZvcm1zQnVpbGRlclBsdWdpbiA9PiB7XG4gIGNvbnN0IGhvb2tzID0gWy4uLmNvcmVFdmVudEhvb2tzLCAuLi4ob3B0cy5ob29rcyB8fCBbXSldXG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBgJHtuYW1lfS9wYWdlLXZhbGlkYXRpb25gLFxuICAgIHZlcnNpb24sXG4gICAgcmVnaXN0ZXIoKTogdm9pZCB7XG4gICAgICBGb3JtLnByb3RvdHlwZS5iaW5kVG9QYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBfYmluZCA9IChjb21wb25lbnQ6IEZvcm0gfCBGaWVsZFNldCB8IEZpZWxkKTogdm9pZCA9PiB7XG4gICAgICAgICAgaWYgKGNvbXBvbmVudCBpbnN0YW5jZW9mIEZvcm0pIHtcbiAgICAgICAgICAgIF9iaW5kKGNvbXBvbmVudC5zY2hlbWEpXG4gICAgICAgICAgfSBlbHNlIGlmIChjb21wb25lbnQgaW5zdGFuY2VvZiBGaWVsZFNldCkge1xuICAgICAgICAgICAgY29tcG9uZW50LnN0cnVjdHVyZS5mb3JFYWNoKF9iaW5kKVxuICAgICAgICAgIH0gZWxzZSBpZiAoY29tcG9uZW50IGluc3RhbmNlb2YgRmllbGQpIHtcbiAgICAgICAgICAgIGNvbnN0IGhvb2sgPSBob29rcy5maW5kKFxuICAgICAgICAgICAgICAoaG9vaykgPT4gaG9vay5jb21wb25lbnROYW1lID09PSBjb21wb25lbnQudmlld1R5cGVcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIGlmICghaG9vaykgdGhyb3cgRXJyb3IoYE1pc3NpbmcgaG9vayBuYW1lZCAke2NvbXBvbmVudC52aWV3VHlwZX1gKVxuICAgICAgICAgICAgaG9vay5yZWdpc3Rlcih7XG4gICAgICAgICAgICAgIGRhdGFJZDogY29tcG9uZW50Lm5hbWUsXG4gICAgICAgICAgICAgIGZvcm06IHRoaXNcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBpdGVtIGluIGZvcm0gc3RydWN0dXJlICR7Y29tcG9uZW50fWApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9iaW5kKHRoaXMpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgRXJyb3JCbG9jayB7XG4gIGVsZW1lbnQ6IEhUTUxVTGlzdEVsZW1lbnRcbiAgZXJyb3JzOiBzdHJpbmdbXSA9IFtdXG5cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICBuYW1lICsgJ19fZXJyb3ItYmxvY2snXG4gICAgKSBhcyBIVE1MVUxpc3RFbGVtZW50XG4gIH1cblxuICBhZGQoZXJyb3I6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZXJyb3JzLnB1c2goZXJyb3IpXG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLmVycm9ycyA9IFtdXG4gIH1cblxuICByZW5kZXIoKTogdm9pZCB7XG4gICAgdGhpcy5lbGVtZW50LmlubmVySFRNTCA9IHRoaXMuZXJyb3JzXG4gICAgICAubWFwKChlcnJvcikgPT4gYDxsaT4ke2Vycm9yfTwvbGk+YClcbiAgICAgIC5qb2luKCdcXG4nKVxuICB9XG59XG4iLCJpbXBvcnQgbmV3UGFzc3dvcmRFdmVudEhvb2sgZnJvbSAnLi9uZXctcGFzc3dvcmQnXG5cbmV4cG9ydCBjb25zdCBldmVudEhvb2tzID0gW25ld1Bhc3N3b3JkRXZlbnRIb29rXVxuIiwiaW1wb3J0IHsgSVBhZ2VWYWxpZGF0aW9uSG9vaywgRXJyb3JCbG9jayB9IGZyb20gJy4uL2Jyb3dzZXInXG5cbmNvbnN0IGV2ZW50SG9vazogSVBhZ2VWYWxpZGF0aW9uSG9vayA9IHtcbiAgY29tcG9uZW50TmFtZTogJ25ldy1wYXNzd29yZCcsXG4gIHJlZ2lzdGVyOiAoeyBkYXRhSWQsIGZvcm0gfSkgPT4ge1xuICAgIGNvbnN0IGlucHV0RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpXG5cbiAgICBsZXQgY29uZmlybVRvdWNoZWQgPSBmYWxzZVxuXG4gICAgY29uc3Qgb25JbnB1dENoYW5nZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGVycm9yQmxvY2sgPSBuZXcgRXJyb3JCbG9jayhkYXRhSWQpXG5cbiAgICAgIGlmIChjb25maXJtVG91Y2hlZCkge1xuICAgICAgICBmb3JtXG4gICAgICAgICAgLnZhbGlkYXRvckZvcihkYXRhSWQpXG4gICAgICAgICAgPy52YWxpZGF0ZShpbnB1dEVsZW1lbnRzWzBdLnZhbHVlKVxuICAgICAgICAgIC5mb3JFYWNoKChlcnJvcikgPT4gZXJyb3JCbG9jay5hZGQoZm9ybS52aWV3LnRyYW5zbGF0ZShlcnJvcikpKVxuXG4gICAgICAgIC8vIENoZWNrIGlmIG1hdGNoaW5nXG4gICAgICAgIGlmIChpbnB1dEVsZW1lbnRzWzBdLnZhbHVlICE9PSBpbnB1dEVsZW1lbnRzWzFdLnZhbHVlKSB7XG4gICAgICAgICAgZXJyb3JCbG9jay5hZGQoXG4gICAgICAgICAgICBmb3JtLnZpZXcudHJhbnNsYXRlKHtcbiAgICAgICAgICAgICAgdHJhbnNsYXRlS2V5OiAndmFsaWRhdGlvbnMubmV3LXBhc3N3b3JkLmNvbmZpcm0tZG9lcy1ub3QtbWF0Y2gnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZXJyb3JCbG9jay5yZW5kZXIoKVxuICAgIH1cblxuICAgIGNvbnN0IG9uRm9jdXMgPSAoKSA9PiB7XG4gICAgICBjb25maXJtVG91Y2hlZCA9IHRydWVcbiAgICB9XG5cbiAgICBpbnB1dEVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBvbkZvY3VzKVxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uSW5wdXRDaGFuZ2UpXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBldmVudEhvb2tcbiIsImltcG9ydCB7IElGb3Jtc0J1aWxkZXJQbHVnaW4gfSBmcm9tICcuLi9tYWtlLWZvcm0tYnVpbGRlcidcbmltcG9ydCB7IGNvcmVWYWxpZGF0aW9uQnVpbGRlcnMgfSBmcm9tICcuL3ZhbGlkYXRpb25zJ1xuaW1wb3J0IHsgY29yZVRyaWdnZXJDb25kaXRpb25CdWlsZGVycyB9IGZyb20gJy4vdHJpZ2dlcnMnXG5pbXBvcnQgeyBjb3JlVmlld0J1aWxkZXJzIH0gZnJvbSAnLi92aWV3cydcbmltcG9ydCB7IHZlcnNpb24sIG5hbWUgfSBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nXG5cbmV4cG9ydCBjb25zdCBjb3JlOiBJRm9ybXNCdWlsZGVyUGx1Z2luICYge1xuICB2YWxpZGF0aW9uczogSUZvcm1zQnVpbGRlclBsdWdpblxuICBkYXRhVHJpZ2dlcnM6IElGb3Jtc0J1aWxkZXJQbHVnaW5cbiAgdmlld3M6IElGb3Jtc0J1aWxkZXJQbHVnaW5cbn0gPSB7XG4gIG5hbWU6IGAke25hbWV9L2NvcmVgLFxuICB2ZXJzaW9uLFxuICByZWdpc3RlcihidWlsZGVyKSB7XG4gICAgYnVpbGRlci5idWlsZGVycy52YWxpZGF0aW9uQ29uZGl0aW9ucy5wdXNoKC4uLmNvcmVWYWxpZGF0aW9uQnVpbGRlcnMpXG4gICAgYnVpbGRlci5idWlsZGVycy50cmlnZ2VyQ29uZGl0aW9ucy5wdXNoKC4uLmNvcmVUcmlnZ2VyQ29uZGl0aW9uQnVpbGRlcnMpXG4gICAgYnVpbGRlci5idWlsZGVycy52aWV3cy5wdXNoKC4uLmNvcmVWaWV3QnVpbGRlcnMpXG4gIH0sXG4gIHZhbGlkYXRpb25zOiB7XG4gICAgbmFtZTogYCR7bmFtZX0vY29yZS92YWxpZGF0aW9uc2AsXG4gICAgdmVyc2lvbixcbiAgICByZWdpc3RlcihidWlsZGVyKSB7XG4gICAgICBidWlsZGVyLmJ1aWxkZXJzLnZhbGlkYXRpb25Db25kaXRpb25zLnB1c2goLi4uY29yZVZhbGlkYXRpb25CdWlsZGVycylcbiAgICB9XG4gIH0sXG4gIGRhdGFUcmlnZ2Vyczoge1xuICAgIG5hbWU6IGAke25hbWV9L2NvcmUvZGF0YVRyaWdnZXJzYCxcbiAgICB2ZXJzaW9uLFxuICAgIHJlZ2lzdGVyKGJ1aWxkZXIpIHtcbiAgICAgIGJ1aWxkZXIuYnVpbGRlcnMudHJpZ2dlckNvbmRpdGlvbnMucHVzaCguLi5jb3JlVHJpZ2dlckNvbmRpdGlvbkJ1aWxkZXJzKVxuICAgIH1cbiAgfSxcbiAgdmlld3M6IHtcbiAgICBuYW1lOiBgJHtuYW1lfS9jb3JlL3ZpZXdzYCxcbiAgICB2ZXJzaW9uLFxuICAgIHJlZ2lzdGVyKGJ1aWxkZXIpIHtcbiAgICAgIGJ1aWxkZXIuYnVpbGRlcnMudmlld3MucHVzaCguLi5jb3JlVmlld0J1aWxkZXJzKVxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi92YWxpZGF0aW9ucydcbmV4cG9ydCAqIGZyb20gJy4vdHJpZ2dlcnMnXG5leHBvcnQgKiBmcm9tICcuL2NvcmUtcGx1Z2luJ1xuIiwiaW1wb3J0IHtcbiAgSVRyaWdnZXJDb25kaXRpb24sXG4gIElUcmlnZ2VyQ29uZGl0aW9uQnVpbGRlcixcbiAgU3RvcmVkUGxhaW5PYmplY3Rcbn0gZnJvbSAnLi4vLi4vQHR5cGVzJ1xuaW1wb3J0IHsgRm9ybURhdGEgfSBmcm9tICcuLi8uLi9mb3JtJ1xuaW1wb3J0IHsgZmluZEluRGF0YSB9IGZyb20gJy4uLy4uL3V0aWxzL2ZpbmQnXG5pbXBvcnQgeyBoYXNQcm9wZXJ0eSB9IGZyb20gJy4uLy4uL3V0aWxzJ1xuaW1wb3J0IHsgRmFsc2UgfSBmcm9tICcuJ1xuXG5pbnRlcmZhY2UgSUZvcm1EYXRhUmVmZXJlbmNlIHtcbiAgZGF0YUlkOiBzdHJpbmcgfCB1bmRlZmluZWRcbn1cblxudHlwZSBNYXRjaCA9IG51bWJlciB8IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGwgfCBJRm9ybURhdGFSZWZlcmVuY2VcbkZhbHNlXG5leHBvcnQgY2xhc3MgRXF1YWxzVHJpZ2dlckNvbmRpdGlvbiBpbXBsZW1lbnRzIElUcmlnZ2VyQ29uZGl0aW9uIHtcbiAgc3RhdGljIFNlbGYgPSB7IGRhdGFJZDogdW5kZWZpbmVkIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbGVmdDogTWF0Y2gsXG4gICAgcHVibGljIHJpZ2h0OiBNYXRjaCA9IEVxdWFsc1RyaWdnZXJDb25kaXRpb24uU2VsZlxuICApIHt9XG5cbiAgaXNUcmlnZ2VyZWQoZGF0YUlkOiBzdHJpbmcsIGRhdGE6IEZvcm1EYXRhKTogYm9vbGVhbiB7XG4gICAgY29uc3QgbGVmdCA9IGhhc1Byb3BlcnR5KHRoaXMubGVmdCwgJ2RhdGFJZCcpXG4gICAgICA/IGZpbmRJbkRhdGEoXG4gICAgICAgICAgZGF0YSxcbiAgICAgICAgICB0aGlzLmxlZnQgPT09IEVxdWFsc1RyaWdnZXJDb25kaXRpb24uU2VsZlxuICAgICAgICAgICAgPyBkYXRhSWRcbiAgICAgICAgICAgIDogKHRoaXMubGVmdCBhcyBJRm9ybURhdGFSZWZlcmVuY2UpLmRhdGFJZCB8fCAnJ1xuICAgICAgICApXG4gICAgICA6IHRoaXMubGVmdFxuICAgIGNvbnN0IHJpZ2h0ID0gaGFzUHJvcGVydHkodGhpcy5yaWdodCwgJ2RhdGFJZCcpXG4gICAgICA/IGZpbmRJbkRhdGEoXG4gICAgICAgICAgZGF0YSxcbiAgICAgICAgICB0aGlzLnJpZ2h0ID09PSBFcXVhbHNUcmlnZ2VyQ29uZGl0aW9uLlNlbGZcbiAgICAgICAgICAgID8gZGF0YUlkXG4gICAgICAgICAgICA6ICh0aGlzLnJpZ2h0IGFzIElGb3JtRGF0YVJlZmVyZW5jZSkuZGF0YUlkIHx8ICcnXG4gICAgICAgIClcbiAgICAgIDogdGhpcy5yaWdodFxuICAgIHJldHVybiBsZWZ0ID09PSByaWdodFxuICB9XG5cbiAgdG9Kc29uKCk6IFN0b3JlZFBsYWluT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogRXF1YWxzVHJpZ2dlckNvbmRpdGlvbi5uYW1lLFxuICAgICAgbGVmdDogdGhpcy5sZWZ0LFxuICAgICAgcmlnaHQ6IHRoaXMucmlnaHRcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGJ1aWxkZXI6IElUcmlnZ2VyQ29uZGl0aW9uQnVpbGRlciA9IHtcbiAgdHlwZTogRXF1YWxzVHJpZ2dlckNvbmRpdGlvbi5uYW1lLFxuICBmcm9tSnNvbihqc29uLCBfYnVpbGRlcnMpOiBFcXVhbHNUcmlnZ2VyQ29uZGl0aW9uIHtcbiAgICByZXR1cm4gbmV3IEVxdWFsc1RyaWdnZXJDb25kaXRpb24oanNvbi5sZWZ0LCBqc29uLnJpZ2h0KVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBJVHJpZ2dlckNvbmRpdGlvbixcbiAgSVRyaWdnZXJDb25kaXRpb25CdWlsZGVyLFxuICBTdG9yZWRQbGFpbk9iamVjdFxufSBmcm9tICcuLi8uLi9AdHlwZXMnXG5cbmV4cG9ydCBjbGFzcyBGYWxzZVRyaWdnZXJDb25kaXRpb24gaW1wbGVtZW50cyBJVHJpZ2dlckNvbmRpdGlvbiB7XG4gIGlzVHJpZ2dlcmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgdG9Kc29uKCk6IFN0b3JlZFBsYWluT2JqZWN0IHtcbiAgICByZXR1cm4geyB0eXBlOiBGYWxzZVRyaWdnZXJDb25kaXRpb24ubmFtZSB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGJ1aWxkZXI6IElUcmlnZ2VyQ29uZGl0aW9uQnVpbGRlciA9IHtcbiAgdHlwZTogRmFsc2VUcmlnZ2VyQ29uZGl0aW9uLm5hbWUsXG4gIGZyb21Kc29uKCk6IEZhbHNlVHJpZ2dlckNvbmRpdGlvbiB7XG4gICAgcmV0dXJuIG5ldyBGYWxzZVRyaWdnZXJDb25kaXRpb24oKVxuICB9XG59XG4iLCJpbXBvcnQgeyBUcnVlVHJpZ2dlckNvbmRpdGlvbiwgYnVpbGRlciBhcyB0cnVlQnVpbGRlciB9IGZyb20gJy4vdHJ1ZSdcbmltcG9ydCB7IEZhbHNlVHJpZ2dlckNvbmRpdGlvbiwgYnVpbGRlciBhcyBmYWxzZUJ1aWxkZXIgfSBmcm9tICcuL2ZhbHNlJ1xuaW1wb3J0IHsgRXF1YWxzVHJpZ2dlckNvbmRpdGlvbiwgYnVpbGRlciBhcyBlcXVhbHNCdWlsZGVyIH0gZnJvbSAnLi9lcXVhbHMnXG5cbmV4cG9ydCB7XG4gIFRydWVUcmlnZ2VyQ29uZGl0aW9uIGFzIFRydWUsXG4gIEZhbHNlVHJpZ2dlckNvbmRpdGlvbiBhcyBGYWxzZSxcbiAgRXF1YWxzVHJpZ2dlckNvbmRpdGlvbiBhcyBFcXVhbHNcbn1cbmV4cG9ydCBjb25zdCBjb3JlVHJpZ2dlckNvbmRpdGlvbkJ1aWxkZXJzID0gW1xuICB0cnVlQnVpbGRlcixcbiAgZmFsc2VCdWlsZGVyLFxuICBlcXVhbHNCdWlsZGVyXG5dXG4iLCJpbXBvcnQge1xuICBJVHJpZ2dlckNvbmRpdGlvbixcbiAgSVRyaWdnZXJDb25kaXRpb25CdWlsZGVyLFxuICBTdG9yZWRQbGFpbk9iamVjdFxufSBmcm9tICcuLi8uLi9AdHlwZXMnXG5cbmV4cG9ydCBjbGFzcyBUcnVlVHJpZ2dlckNvbmRpdGlvbiBpbXBsZW1lbnRzIElUcmlnZ2VyQ29uZGl0aW9uIHtcbiAgaXNUcmlnZ2VyZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHRvSnNvbigpOiBTdG9yZWRQbGFpbk9iamVjdCB7XG4gICAgcmV0dXJuIHsgdHlwZTogVHJ1ZVRyaWdnZXJDb25kaXRpb24ubmFtZSB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGJ1aWxkZXI6IElUcmlnZ2VyQ29uZGl0aW9uQnVpbGRlciA9IHtcbiAgdHlwZTogVHJ1ZVRyaWdnZXJDb25kaXRpb24ubmFtZSxcbiAgZnJvbUpzb24oKTogVHJ1ZVRyaWdnZXJDb25kaXRpb24ge1xuICAgIHJldHVybiBuZXcgVHJ1ZVRyaWdnZXJDb25kaXRpb24oKVxuICB9XG59XG4iLCJpbXBvcnQgeyBidWlsZGVyIGFzIG1pbkxlbmd0aEJ1aWxkZXIsIE1pbkxlbmd0aFZhbGlkYXRpb24gfSBmcm9tICcuL21pbi1sZW5ndGgnXG5cbmV4cG9ydCB7IE1pbkxlbmd0aFZhbGlkYXRpb24gfVxuZXhwb3J0IGNvbnN0IGNvcmVWYWxpZGF0aW9uQnVpbGRlcnMgPSBbbWluTGVuZ3RoQnVpbGRlcl1cbiIsImltcG9ydCB7IGlzTnVsbE9yVW5kZWZpbmVkLCBpc051bWJlciB9IGZyb20gJy4uLy4uL3V0aWxzL3R5cGVzJ1xuaW1wb3J0IHtcbiAgSVZhbGlkYXRpb25Db25kaXRpb24sXG4gIElWYWxpZGF0aW9uQ29uZGl0aW9uQnVpbGRlcixcbiAgSVZhbGlkYXRpb25FcnJvcixcbiAgU3RvcmVkUGxhaW5PYmplY3Rcbn0gZnJvbSAnLi4vLi4vQHR5cGVzJ1xuaW1wb3J0IHsgRm9ybURhdGEgfSBmcm9tICcuLi8uLi9mb3JtJ1xuXG5pbnRlcmZhY2UgSU1lYXN1cmFibGUge1xuICBsZW5ndGg6IG51bWJlclxufVxuXG5leHBvcnQgY2xhc3MgTWluTGVuZ3RoVmFsaWRhdGlvbiBpbXBsZW1lbnRzIElWYWxpZGF0aW9uQ29uZGl0aW9uIHtcbiAgbGVuZ3RoOiBudW1iZXJcblxuICBjb25zdHJ1Y3RvcihsZW5ndGg6IG51bWJlcikge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoXG4gIH1cblxuICB2YWxpZGF0ZShpZDogc3RyaW5nLCBkYXRhOiBGb3JtRGF0YSk6IElWYWxpZGF0aW9uRXJyb3JbXSB7XG4gICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChkYXRhKSB8fCAhaXNOdW1iZXIoKGRhdGEgYXMgSU1lYXN1cmFibGUpLmxlbmd0aCkpIHtcbiAgICAgIHJldHVybiBbXVxuICAgIH1cbiAgICBpZiAoZGF0YS5sZW5ndGggPCB0aGlzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAge1xuICAgICAgICAgIGRhdGFJZDogaWQsXG4gICAgICAgICAgdmFsaWRhdGlvbjogYnVpbGRlci50eXBlLFxuICAgICAgICAgIGVycm9yOiAndG9vLXNob3J0JyxcbiAgICAgICAgICB0cmFuc2xhdGVLZXk6IGB2YWxpZGF0aW9ucy4ke2J1aWxkZXIudHlwZX0udG9vLXNob3J0YCxcbiAgICAgICAgICB0cmFuc2xhdGVWYXJzOiB7IGxlbmd0aDogdGhpcy5sZW5ndGggfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXVxuICAgIH1cbiAgfVxuXG4gIHRvSnNvbigpOiBTdG9yZWRQbGFpbk9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IGJ1aWxkZXIudHlwZSxcbiAgICAgIGxlbmd0aDogdGhpcy5sZW5ndGhcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGJ1aWxkZXI6IElWYWxpZGF0aW9uQ29uZGl0aW9uQnVpbGRlciA9IHtcbiAgdHlwZTogTWluTGVuZ3RoVmFsaWRhdGlvbi5uYW1lLFxuICBmcm9tSnNvbihvYmo6IFN0b3JlZFBsYWluT2JqZWN0KTogSVZhbGlkYXRpb25Db25kaXRpb24ge1xuICAgIGNvbnN0IHZhbGlkYXRpb24gPSBuZXcgTWluTGVuZ3RoVmFsaWRhdGlvbihvYmoubGVuZ3RoKVxuICAgIHJldHVybiB2YWxpZGF0aW9uXG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIElUcmFuc2xhdGFibGUsXG4gIFN0b3JlZFBsYWluT2JqZWN0LFxuICBTdHJpbmdUcmVlLFxuICBJVmlldyxcbiAgSVZpZXdCdWlsZGVyXG59IGZyb20gJy4uLy4uL0B0eXBlcydcbmltcG9ydCAqIGFzIFBvbHlnbG90IGZyb20gJ25vZGUtcG9seWdsb3QnXG5cbmV4cG9ydCBjbGFzcyBCYXNpY0Zvcm1WaWV3IGltcGxlbWVudHMgSVZpZXcge1xuICBsb2NhbGU6IHN0cmluZ1xuXG4gIHByaXZhdGUgX3RyYW5zbGF0aW9uczogU3RyaW5nVHJlZVxuICBwcml2YXRlIF9wb2x5Z2xvdDogUG9seWdsb3RcblxuICBwdWJsaWMgc2V0IHRyYW5zbGF0aW9ucyh0cmFuc2xhdGlvbnM6IFN0cmluZ1RyZWUpIHtcbiAgICB0aGlzLl90cmFuc2xhdGlvbnMgPSB0cmFuc2xhdGlvbnNcbiAgICB0aGlzLl9wb2x5Z2xvdCA9IG5ldyBQb2x5Z2xvdCh7IHBocmFzZXM6IHRyYW5zbGF0aW9ucyB9KVxuICB9XG5cbiAgcHVibGljIGdldCB0cmFuc2xhdGlvbnMoKTogU3RyaW5nVHJlZSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zbGF0aW9uc1xuICB9XG5cbiAgdHJhbnNsYXRlKGl0ZW06IElUcmFuc2xhdGFibGUpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9wb2x5Z2xvdC50KGl0ZW0udHJhbnNsYXRlS2V5LCBpdGVtLnRyYW5zbGF0ZVZhcnMpXG4gIH1cblxuICB0b0pzb24oKTogU3RvcmVkUGxhaW5PYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBCYXNpY0Zvcm1WaWV3Lm5hbWUsXG4gICAgICBsb2NhbGU6IHRoaXMubG9jYWxlLFxuICAgICAgdHJhbnNsYXRpb25zOiB0aGlzLl90cmFuc2xhdGlvbnNcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGJ1aWxkZXI6IElWaWV3QnVpbGRlciA9IHtcbiAgdHlwZTogQmFzaWNGb3JtVmlldy5uYW1lLFxuICBmcm9tSnNvbihqc29uOiBTdG9yZWRQbGFpbk9iamVjdCk6IEJhc2ljRm9ybVZpZXcge1xuICAgIGNvbnN0IHZpZXcgPSBuZXcgQmFzaWNGb3JtVmlldygpXG4gICAgdmlldy5sb2NhbGUgPSBqc29uLmxvY2FsZVxuICAgIHZpZXcudHJhbnNsYXRpb25zID0ganNvbi50cmFuc2xhdGlvbnNcbiAgICByZXR1cm4gdmlld1xuICB9XG59XG4iLCJpbXBvcnQgeyBCYXNpY0Zvcm1WaWV3LCBidWlsZGVyIH0gZnJvbSAnLi9iYXNpYy1mb3JtLXZpZXcnXG5cbmV4cG9ydCB7IEJhc2ljRm9ybVZpZXcgfVxuZXhwb3J0IGNvbnN0IGNvcmVWaWV3QnVpbGRlcnMgPSBbYnVpbGRlcl1cbiIsImV4cG9ydCBjbGFzcyBGb3JtU3ludGF4RXJyb3IgZXh0ZW5kcyBTeW50YXhFcnJvciB7fVxuIiwiaW1wb3J0IHsgVHJ1ZVRyaWdnZXJDb25kaXRpb24gfSBmcm9tICcuL2NvcmUvdHJpZ2dlcnMvdHJ1ZSdcbmltcG9ydCB0eXBlIHsgSUJ1aWxkZXJzIH0gZnJvbSAnLi9tYWtlLWZvcm0tYnVpbGRlcidcbmltcG9ydCB7IFRyaWdnZXIgfSBmcm9tICcuL3RyaWdnZXInXG5pbXBvcnQge1xuICBJVmFsaWRhdGlvbkVycm9yLFxuICBJVmFsaWRhdGlvbkNvbmRpdGlvbixcbiAgU3RvcmVkUGxhaW5PYmplY3Rcbn0gZnJvbSAnLi9AdHlwZXMnXG5pbXBvcnQgeyBpc051bGxPclVuZGVmaW5lZCB9IGZyb20gJy4vdXRpbHMnXG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnN0YW5jZSBvZiBhIGZpZWxkIGluIGEgZm9ybVxuICovXG5leHBvcnQgY2xhc3MgRmllbGQge1xuICB2YWxpZGF0aW9uQ29uZGl0aW9uczogSVZhbGlkYXRpb25Db25kaXRpb25bXSA9IFtdXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5hbWU6IHN0cmluZywgLy8gVW5pcXVlIHRvIHRoZSBGb3JtU2NoZW1hIGUuZy4gbW90aGVyc0ZpcnN0TmFtZVxuICAgIHB1YmxpYyBsYWJlbDogc3RyaW5nLCAvLyBlLmcuIE1vdGhlcidzIGZpcnN0IG5hbWVcbiAgICBwdWJsaWMgdmlld1R5cGU6IHN0cmluZywgLy8gRGV0ZXJtaW5lcyB3aGF0IGNvbXBvbmVudCB3aWxsIGJlIHVzZWQgZm9yIGVkaXRpbmcvZGlzcGxheWluZyB0aGUgZmllbGQgZS5nLiBmaXJzdE5hbWVcbiAgICBwdWJsaWMgaXNSZXF1aXJlZDogVHJpZ2dlciA9IFRyaWdnZXIuQWx3YXlzVHJ1ZVxuICApIHt9XG5cbiAgdmFsaWRhdGUoaWQ6IHN0cmluZywgZGF0YTogRm9ybURhdGEpOiBJVmFsaWRhdGlvbkVycm9yW10ge1xuICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25Db25kaXRpb25zLm1hcCgodikgPT4gdi52YWxpZGF0ZShpZCwgZGF0YSkpLmZsYXQoKVxuICB9XG5cbiAgdG9Kc29uKCk6IFN0b3JlZFBsYWluT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgbGFiZWw6IHRoaXMubGFiZWwsXG4gICAgICB0eXBlOiBGaWVsZC5uYW1lLFxuICAgICAgdmlld1R5cGU6IHRoaXMudmlld1R5cGUsXG4gICAgICB2YWxpZGF0aW9uQ29uZGl0aW9uczogdGhpcy52YWxpZGF0aW9uQ29uZGl0aW9ucy5tYXAoKHYpID0+IHYudG9Kc29uKCkpLFxuICAgICAgaXNSZXF1aXJlZDpcbiAgICAgICAgdGhpcy5pc1JlcXVpcmVkLnRyaWdnZXIgaW5zdGFuY2VvZiBUcnVlVHJpZ2dlckNvbmRpdGlvblxuICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgIDogdGhpcy5pc1JlcXVpcmVkLnRyaWdnZXIudG9Kc29uKClcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oanNvbjogYW55LCBidWlsZGVyczogSUJ1aWxkZXJzKTogRmllbGQge1xuICAgIGlmIChpc051bGxPclVuZGVmaW5lZChqc29uLmlzUmVxdWlyZWQpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWVsZCBKU09OIG1pc3NpbmcgJ2lzUmVxdWlyZWQnIHByb3BlcnR5YClcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoanNvbi52YWxpZGF0aW9uQ29uZGl0aW9ucykpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBGaWVsZCBKU09OICd2YWxpZGF0aW9uQ29uZGl0aW9ucycgcHJvcGVydHkgaXMgbm90IGFuIGFycmF5YFxuICAgICAgKVxuICAgIGlmIChpc051bGxPclVuZGVmaW5lZChqc29uLm5hbWUpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWVsZCBKU09OIGlzIG1pc3NpbmcgJ25hbWUnIHByb3BlcnR5YClcbiAgICBpZiAoaXNOdWxsT3JVbmRlZmluZWQoanNvbi5sYWJlbCkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZpZWxkIEpTT04gaXMgbWlzc2luZyAnbGFiZWwnIHByb3BlcnR5YClcbiAgICBpZiAoaXNOdWxsT3JVbmRlZmluZWQoanNvbi52aWV3VHlwZSkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZpZWxkIEpTT04gaXMgbW9zc2luZyAndmlld1R5cGUnIHByb3BlcnR5YClcblxuICAgIGNvbnN0IGlzUmVxdWlyZWRUcmlnZ2VyID1cbiAgICAgIGpzb24uaXNSZXF1aXJlZCA9PT0gdHJ1ZVxuICAgICAgICA/IG5ldyBUcnVlVHJpZ2dlckNvbmRpdGlvbigpXG4gICAgICAgIDogYnVpbGRlcnMudHJpZ2dlckNvbmRpdGlvbnNcbiAgICAgICAgICAgIC5maW5kKChkdCkgPT4gZHQudHlwZSA9PT0ganNvbi5pc1JlcXVpcmVkLnR5cGUpXG4gICAgICAgICAgICA/LmZyb21Kc29uKGpzb24uaXNSZXF1aXJlZClcbiAgICBpZiAodHlwZW9mIGlzUmVxdWlyZWRUcmlnZ2VyID09PSAndW5kZWZpbmVkJylcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRGF0YVRyaWdnZXIgJyR7anNvbj8uaXNSZXF1aXJlZD8udHlwZX0nIG5vdCByZWdpc3RlcmVkYClcblxuICAgIGNvbnN0IGZpZWxkID0gbmV3IEZpZWxkKFxuICAgICAganNvbi5uYW1lLFxuICAgICAganNvbi5sYWJlbCxcbiAgICAgIGpzb24udmlld1R5cGUsXG4gICAgICBuZXcgVHJpZ2dlcihqc29uLm5hbWUsIGlzUmVxdWlyZWRUcmlnZ2VyKVxuICAgIClcblxuICAgIGZpZWxkLnZhbGlkYXRpb25Db25kaXRpb25zID0ganNvbj8udmFsaWRhdGlvbkNvbmRpdGlvbnMubWFwKCh2SnNvbikgPT4ge1xuICAgICAgY29uc3QgYnVpbGRlciA9IGJ1aWxkZXJzLnZhbGlkYXRpb25Db25kaXRpb25zLmZpbmQoXG4gICAgICAgICh2KSA9PiB2LnR5cGUgPT09IHZKc29uPy50eXBlXG4gICAgICApXG4gICAgICBpZiAoIWJ1aWxkZXIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVmFsaWRhdGlvbiAnJHt2SnNvbj8udHlwZX0nIG5vdCByZWdpc3RlcmVkYClcbiAgICAgIHJldHVybiBidWlsZGVyLmZyb21Kc29uKHZKc29uLCBidWlsZGVycy52YWxpZGF0aW9uQ29uZGl0aW9ucylcbiAgICB9KVxuICAgIHJldHVybiBmaWVsZFxuICB9XG59XG4iLCJpbXBvcnQge1xuICBJVmFsaWRhdGlvbkNvbmRpdGlvbixcbiAgSVZhbGlkYXRpb25FcnJvcixcbiAgU3RvcmVkUGxhaW5PYmplY3Rcbn0gZnJvbSAnLi9AdHlwZXMnXG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4vZmllbGQnXG5pbXBvcnQgdHlwZSB7IElCdWlsZGVycyB9IGZyb20gJy4vbWFrZS1mb3JtLWJ1aWxkZXInXG5pbXBvcnQgeyBUcmlnZ2VyIH0gZnJvbSAnLi90cmlnZ2VyJ1xuaW1wb3J0IHsgVHJ1ZVRyaWdnZXJDb25kaXRpb24gfSBmcm9tICcuL2NvcmUvdHJpZ2dlcnMvdHJ1ZSdcbmltcG9ydCB7IGZpbmRJbkZvcm0gfSBmcm9tICcuL3V0aWxzL2ZpbmQnXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGdyb3VwIG9mIGZpZWxkcyBpbiBhIGZvcm1cbiAqL1xuZXhwb3J0IGNsYXNzIEZpZWxkU2V0IHtcbiAgc3RhdGljIHJlYWRvbmx5IHR5cGU6IHN0cmluZyA9ICdGaWVsZFNldCdcbiAgbmFtZTogc3RyaW5nIC8vIGUuZy4gbmV4dE9mS2luRGV0YWlsc1xuICBsYWJlbDogc3RyaW5nIC8vIGUuZy4gTmV4dCBvZiBraW4gZGV0YWlsc1xuICBzdHJ1Y3R1cmU6IChGaWVsZCB8IEZpZWxkU2V0KVtdID0gW11cbiAgdmFsaWRhdGlvbkNvbmRpdGlvbnM6IElWYWxpZGF0aW9uQ29uZGl0aW9uW10gPSBbXVxuICBpc1JlcXVpcmVkOiBUcmlnZ2VyID0gVHJpZ2dlci5BbHdheXNUcnVlXG5cbiAgaXRlbUZvcihkYXRhSWQ6IHN0cmluZyk6IEZpZWxkIHwgRmllbGRTZXQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiBmaW5kSW5Gb3JtKHRoaXMsIGRhdGFJZClcbiAgfVxuXG4gIHdpdGhWYWxpZGF0aW9ucyh2YWxpZGF0aW9uczogSVZhbGlkYXRpb25Db25kaXRpb25bXSk6IEZpZWxkU2V0IHtcbiAgICB0aGlzLnZhbGlkYXRpb25Db25kaXRpb25zLnB1c2goLi4udmFsaWRhdGlvbnMpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHZhbGlkYXRlKGlkOiBzdHJpbmcsIGRhdGE6IGFueSk6IElWYWxpZGF0aW9uRXJyb3JbXSB7XG4gICAgY29uc3QgZm9ybUVycm9ycyA9IHRoaXMudmFsaWRhdGlvbkNvbmRpdGlvbnNcbiAgICAgIC5tYXAoKHZhbGlkYXRpb24pID0+IHZhbGlkYXRpb24udmFsaWRhdGUoaWQsIGRhdGEpKVxuICAgICAgLmZsYXQoKVxuICAgIGNvbnN0IGNvbXBvbmVudEVycm9ycyA9IHRoaXMuc3RydWN0dXJlXG4gICAgICAubWFwKChjb21wb25lbnQpID0+XG4gICAgICAgIGNvbXBvbmVudC52YWxpZGF0ZShjb21wb25lbnQubmFtZSwgZGF0YVtjb21wb25lbnQubmFtZV0pXG4gICAgICApXG4gICAgICAuZmxhdCgpXG5cbiAgICByZXR1cm4gZm9ybUVycm9ycy5jb25jYXQoY29tcG9uZW50RXJyb3JzKVxuICB9XG5cbiAgdG9Kc29uKCk6IFN0b3JlZFBsYWluT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgdHlwZTogRmllbGRTZXQudHlwZSxcbiAgICAgIGxhYmVsOiB0aGlzLmxhYmVsLFxuICAgICAgc3RydWN0dXJlOiB0aGlzLnN0cnVjdHVyZS5tYXAoKHMpID0+IHMudG9Kc29uKCkpLFxuICAgICAgdmFsaWRhdGlvbkNvbmRpdGlvbnM6IHRoaXMudmFsaWRhdGlvbkNvbmRpdGlvbnMubWFwKCh2KSA9PiB2LnRvSnNvbigpKSxcbiAgICAgIGlzUmVxdWlyZWQ6XG4gICAgICAgIHRoaXMuaXNSZXF1aXJlZCBpbnN0YW5jZW9mIFRydWVUcmlnZ2VyQ29uZGl0aW9uXG4gICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgOiB0aGlzLmlzUmVxdWlyZWQudHJpZ2dlci50b0pzb24oKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihqc29uOiBhbnksIGJ1aWxkZXJzOiBJQnVpbGRlcnMpOiBGaWVsZFNldCB7XG4gICAgY29uc3QgZmllbGRTZXQgPSBuZXcgRmllbGRTZXQoKVxuICAgIGZpZWxkU2V0Lm5hbWUgPSBqc29uLm5hbWVcbiAgICBmaWVsZFNldC5sYWJlbCA9IGpzb24ubGFiZWxcbiAgICBmaWVsZFNldC52YWxpZGF0aW9uQ29uZGl0aW9ucyA9IGpzb24udmFsaWRhdGlvbkNvbmRpdGlvbnMubWFwKCh2SnNvbikgPT5cbiAgICAgIGJ1aWxkZXJzLnZhbGlkYXRpb25Db25kaXRpb25zXG4gICAgICAgIC5maW5kKCh2KSA9PiB2LnR5cGUgPT09IHZKc29uLm5hbWUpXG4gICAgICAgID8uZnJvbUpzb24odkpzb24sIGJ1aWxkZXJzLnZhbGlkYXRpb25Db25kaXRpb25zKVxuICAgIClcbiAgICBjb25zdCB0cmlnZ2VyID1cbiAgICAgIGpzb24uaXNSZXF1aXJlZCA9PT0gdHJ1ZVxuICAgICAgICA/IG5ldyBUcnVlVHJpZ2dlckNvbmRpdGlvbigpXG4gICAgICAgIDogYnVpbGRlcnMudHJpZ2dlckNvbmRpdGlvbnNcbiAgICAgICAgICAgIC5maW5kKChkdCkgPT4gZHQudHlwZSA9PT0ganNvbi5pc1JlcXVpcmVkLnR5cGUpXG4gICAgICAgICAgICA/LmZyb21Kc29uKGpzb24uaXNSZXF1aXJlZClcblxuICAgIGlmICghdHJpZ2dlcikge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgYENvdWxkIG5vdCBmaW5kIHRyaWdnZXIgYnVpbGRlciAnJHtqc29uLmlzUmVxdWlyZWQudHlwZX0nYFxuICAgICAgKVxuICAgIH1cblxuICAgIGZpZWxkU2V0LmlzUmVxdWlyZWQgPSBuZXcgVHJpZ2dlcihqc29uLm5hbWUsIHRyaWdnZXIpXG4gICAgZmllbGRTZXQuc3RydWN0dXJlID0ganNvbi5zdHJ1Y3R1cmUubWFwKCh2YWxPYmopID0+XG4gICAgICB2YWxPYmoudHlwZSA9PT0gRmllbGQubmFtZVxuICAgICAgICA/IEZpZWxkLmZyb21Kc29uKHZhbE9iaiwgYnVpbGRlcnMpXG4gICAgICAgIDogRmllbGRTZXQuZnJvbUpzb24odmFsT2JqLCBidWlsZGVycylcbiAgICApXG4gICAgcmV0dXJuIGZpZWxkU2V0XG4gIH1cbn1cbiIsImltcG9ydCB7IFNjaGVtYSB9IGZyb20gJy4vc2NoZW1hJ1xuaW1wb3J0IHtcbiAgSVZhbGlkYXRpb25Db25kaXRpb24sXG4gIElWYWxpZGF0aW9uRXJyb3IsXG4gIFN0b3JlZFBsYWluT2JqZWN0LFxuICBJVmlld1xufSBmcm9tICcuL0B0eXBlcydcbmltcG9ydCB0eXBlIHsgSUJ1aWxkZXJzIH0gZnJvbSAnLi9tYWtlLWZvcm0tYnVpbGRlcidcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi9maWVsZCdcbmltcG9ydCB7IEZpZWxkU2V0IH0gZnJvbSAnLi9maWVsZHNldCdcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gJy4vdmFsaWRhdG9yJ1xuaW1wb3J0IHsgZmluZEluRm9ybSB9IGZyb20gJy4vdXRpbHMvZmluZCdcblxuZXhwb3J0IHR5cGUgRm9ybURhdGEgPSBhbnlcblxuLyoqXG4gKiBPYmplY3QgdGhhdCBjb250YWlucyB0aGUgZGF0YSBhbG9uZ3NpZGUgdGhlIHNjaGVtYVxuICovXG5leHBvcnQgY2xhc3MgRm9ybSB7XG4gIHN0YXRpYyB0eXBlID0gJ0Zvcm0nXG5cbiAgbmFtZTogc3RyaW5nXG4gIGRhdGE6IEZvcm1EYXRhID0ge31cbiAgc2NoZW1hOiBTY2hlbWFcbiAgdmlldzogSVZpZXdcblxuICBnZXQgdmFsaWRhdG9yKCk6IFZhbGlkYXRvciB7XG4gICAgcmV0dXJuIG5ldyBWYWxpZGF0b3IodGhpcy5zY2hlbWEudmFsaWRhdGlvbkNvbmRpdGlvbnMsIHVuZGVmaW5lZCwgdGhpcy5kYXRhKVxuICB9XG5cbiAgdmFsaWRhdG9yRm9yKGRhdGFJZDogc3RyaW5nKTogVmFsaWRhdG9yIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCB2YWxpZGF0aW9uQ29uZGl0aW9ucyA9IGZpbmRJbkZvcm0odGhpcy5zY2hlbWEsIGRhdGFJZClcbiAgICAgID8udmFsaWRhdGlvbkNvbmRpdGlvbnNcbiAgICByZXR1cm4gdmFsaWRhdGlvbkNvbmRpdGlvbnNcbiAgICAgID8gbmV3IFZhbGlkYXRvcih2YWxpZGF0aW9uQ29uZGl0aW9ucywgZGF0YUlkKVxuICAgICAgOiB1bmRlZmluZWRcbiAgfVxuXG4gIHRvSnNvbigpOiBTdG9yZWRQbGFpbk9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEZvcm0udHlwZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIGRhdGE6IHRoaXMuZGF0YSxcbiAgICAgIHNjaGVtYTogdGhpcy5zY2hlbWEudG9Kc29uKCksXG4gICAgICB2aWV3OiB0aGlzLnZpZXcudG9Kc29uKClcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oanNvbjogYW55LCBidWlsZGVyczogSUJ1aWxkZXJzKTogRm9ybSB7XG4gICAgY29uc3QgZm9ybSA9IG5ldyBGb3JtKClcbiAgICBmb3JtLmRhdGEgPSBqc29uLmRhdGFcbiAgICBmb3JtLm5hbWUgPSBqc29uLm5hbWVcbiAgICBmb3JtLnNjaGVtYSA9IFNjaGVtYS5mcm9tSnNvbihqc29uLnNjaGVtYSwgYnVpbGRlcnMpXG4gICAgY29uc3Qgdmlld0J1aWxkZXIgPSBidWlsZGVycy52aWV3cy5maW5kKFxuICAgICAgKGJ1aWxkZXIpID0+IGJ1aWxkZXIudHlwZSA9PT0ganNvbi52aWV3LnR5cGVcbiAgICApXG4gICAgaWYgKCF2aWV3QnVpbGRlcikgdGhyb3cgRXJyb3IoYE1pc3NpbmcgdmlldyBidWlsZGVyICcke2pzb24udmlldy50eXBlfSdgKVxuICAgIGZvcm0udmlldyA9IHZpZXdCdWlsZGVyLmZyb21Kc29uKGpzb24udmlldylcbiAgICByZXR1cm4gZm9ybVxuICB9XG59XG4iLCJpbXBvcnQgeyBJRm9ybXNCdWlsZGVyUGx1Z2luIH0gZnJvbSAnLi4vbWFrZS1mb3JtLWJ1aWxkZXInXG5pbXBvcnQgeyB2ZXJzaW9uLCBuYW1lIH0gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJ1xuXG5leHBvcnQgY29uc3QgZ2RwcjogSUZvcm1zQnVpbGRlclBsdWdpbiA9IHtcbiAgbmFtZTogYCR7bmFtZX0vZ2RwcmAsXG4gIHZlcnNpb24sXG4gIHJlZ2lzdGVyKGJ1aWxkZXIpIHtcbiAgICAvLyBAdG9kb1xuICB9XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL2dkcHItcGx1Z2luJ1xuIiwiZXhwb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSdcbmV4cG9ydCAqIGZyb20gJy4vZm9ybSdcbmV4cG9ydCAqIGZyb20gJy4vZXhjZXB0aW9ucydcbmV4cG9ydCAqIGZyb20gJy4vZmllbGQnXG5leHBvcnQgKiBmcm9tICcuL2ZpZWxkc2V0J1xuZXhwb3J0ICogZnJvbSAnLi9zY2hlbWEnXG5leHBvcnQgKiBmcm9tICcuL21ha2UtZm9ybS1idWlsZGVyJ1xuZXhwb3J0ICogZnJvbSAnLi9AdHlwZXMnXG5leHBvcnQgKiBmcm9tICcuL2NvcmUnXG5leHBvcnQgKiBmcm9tICcuL2dkcHInXG5leHBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJ1xuZXhwb3J0ICogZnJvbSAnLi90cmlnZ2VyJ1xuIiwiaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSdcbmltcG9ydCB7XG4gIElUcmlnZ2VyQ29uZGl0aW9uQnVpbGRlcixcbiAgSVZhbGlkYXRpb25Db25kaXRpb25CdWlsZGVyLFxuICBTdG9yZWRQbGFpbk9iamVjdCxcbiAgSVZpZXdCdWlsZGVyXG59IGZyb20gJy4vQHR5cGVzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElCdWlsZGVycyB7XG4gIHZhbGlkYXRpb25Db25kaXRpb25zOiBJVmFsaWRhdGlvbkNvbmRpdGlvbkJ1aWxkZXJbXVxuICB0cmlnZ2VyQ29uZGl0aW9uczogSVRyaWdnZXJDb25kaXRpb25CdWlsZGVyW11cbiAgdmlld3M6IElWaWV3QnVpbGRlcltdXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZvcm1zQnVpbGRlciB7XG4gIGJ1aWxkZXJzOiBJQnVpbGRlcnNcbiAgd2l0aChwbHVnaW46IElGb3Jtc0J1aWxkZXJQbHVnaW4pOiB0aGlzXG4gIGZyb21Kc29uKGpzb246IFN0b3JlZFBsYWluT2JqZWN0KTogRm9ybVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElGb3Jtc0J1aWxkZXJQbHVnaW4ge1xuICBuYW1lOiBzdHJpbmdcbiAgdmVyc2lvbjogc3RyaW5nXG4gIHJlZ2lzdGVyKGJ1aWxkZXI6IElGb3Jtc0J1aWxkZXIpOiB2b2lkXG4gIFtmaWVsZDogc3RyaW5nXTogYW55XG59XG5cbmV4cG9ydCBjbGFzcyBGb3Jtc0J1aWxkZXIgaW1wbGVtZW50cyBJRm9ybXNCdWlsZGVyIHtcbiAgYnVpbGRlcnMgPSB7IHZhbGlkYXRpb25Db25kaXRpb25zOiBbXSwgdHJpZ2dlckNvbmRpdGlvbnM6IFtdLCB2aWV3czogW10gfVxuXG4gIHdpdGgocGx1Z2luOiBJRm9ybXNCdWlsZGVyUGx1Z2luKTogdGhpcyB7XG4gICAgcGx1Z2luLnJlZ2lzdGVyKHRoaXMpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGZyb21Kc29uKGpzb246IFN0b3JlZFBsYWluT2JqZWN0KTogRm9ybSB7XG4gICAgcmV0dXJuIEZvcm0uZnJvbUpzb24oanNvbiwgdGhpcy5idWlsZGVycylcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbWFrZUZvcm1CdWlsZGVyID0gKCk6IElGb3Jtc0J1aWxkZXIgPT4gbmV3IEZvcm1zQnVpbGRlcigpXG4iLCJpbXBvcnQgeyBTZW1WZXIsIEludFZlciwgU3RvcmVkUGxhaW5PYmplY3QgfSBmcm9tICcuL0B0eXBlcydcbmltcG9ydCB0eXBlIHsgSUJ1aWxkZXJzIH0gZnJvbSAnLi9tYWtlLWZvcm0tYnVpbGRlcidcbmltcG9ydCB7IEZpZWxkU2V0IH0gZnJvbSAnLi9maWVsZHNldCdcblxuY2xhc3MgUGx1Z2luRGVwZW5kZW5jeSB7XG4gIG5hbWU6IHN0cmluZ1xuICB2ZXJzaW9uOiBzdHJpbmdcblxuICB0b0pzb24oKTogU3RvcmVkUGxhaW5PYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBQbHVnaW5EZXBlbmRlbmN5Lm5hbWUsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICB2ZXJzaW9uOiB0aGlzLnZlcnNpb25cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBzdHJ1Y3R1cmUgb2YgYSBmb3JtXG4gKi9cbmV4cG9ydCBjbGFzcyBTY2hlbWEgZXh0ZW5kcyBGaWVsZFNldCB7XG4gIHN0YXRpYyByZWFkb25seSB0eXBlOiBzdHJpbmcgPSAnU2NoZW1hJ1xuICBkZXBlbmRlbmNpZXM6IFBsdWdpbkRlcGVuZGVuY3lbXSA9IFtdXG5cbiAgc2NoZW1hVmVyc2lvbjogU2VtVmVyXG5cbiAgdG9Kc29uKCk6IFN0b3JlZFBsYWluT2JqZWN0IHtcbiAgICBjb25zdCBvYmogPSBzdXBlci50b0pzb24oKVxuICAgIG9iai50eXBlID0gU2NoZW1hLnR5cGVcbiAgICBvYmouc2NoZW1hVmVyc2lvbiA9IHRoaXMuc2NoZW1hVmVyc2lvblxuICAgIHJldHVybiBvYmpcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihqc29uOiBTdG9yZWRQbGFpbk9iamVjdCwgYnVpbGRlcnM6IElCdWlsZGVycyk6IFNjaGVtYSB7XG4gICAgY29uc3Qgc2NoZW1hID0gRmllbGRTZXQuZnJvbUpzb24oanNvbiwgYnVpbGRlcnMpIGFzIFNjaGVtYVxuICAgIHNjaGVtYS5zY2hlbWFWZXJzaW9uID0ganNvbi5zY2hlbWFWZXJzaW9uXG4gICAgc2NoZW1hLm5hbWUgPSBqc29uLm5hbWVcblxuICAgIHJldHVybiBzY2hlbWFcbiAgfVxufVxuIiwiaW1wb3J0IHsgSVRyaWdnZXJDb25kaXRpb24gfSBmcm9tICcuL0B0eXBlcydcbmltcG9ydCB7IEZvcm1EYXRhIH0gZnJvbSAnLi9mb3JtJ1xuaW1wb3J0IHsgVHJ1ZVRyaWdnZXJDb25kaXRpb24gfSBmcm9tICcuL2NvcmUvdHJpZ2dlcnMvdHJ1ZSdcblxuZXhwb3J0IGNsYXNzIFRyaWdnZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZGF0YUlkOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgcHVibGljIHRyaWdnZXI6IElUcmlnZ2VyQ29uZGl0aW9uXG4gICkge31cblxuICBmb3JEYXRhKGRhdGE6IEZvcm1EYXRhKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudHJpZ2dlci5pc1RyaWdnZXJlZCh0aGlzLmRhdGFJZCB8fCAnJywgZGF0YSlcbiAgfVxuXG4gIHN0YXRpYyBBbHdheXNUcnVlOiBUcmlnZ2VyID0gbmV3IFRyaWdnZXIoXG4gICAgdW5kZWZpbmVkLFxuICAgIG5ldyBUcnVlVHJpZ2dlckNvbmRpdGlvbigpXG4gIClcbn1cbiIsImltcG9ydCB7IEZpZWxkU2V0IH0gZnJvbSAnLi4vZmllbGRzZXQnXG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uL2ZpZWxkJ1xuaW1wb3J0IHsgRm9ybURhdGEgfSBmcm9tICcuLi9mb3JtJ1xuaW1wb3J0IHsgaXNOdWxsT3JVbmRlZmluZWQgfSBmcm9tICcuL3R5cGVzJ1xuXG5leHBvcnQgY29uc3QgZmluZEluRm9ybSA9IChcbiAgaXRlbTogRmllbGQgfCBGaWVsZFNldCxcbiAgbmFtZTogc3RyaW5nXG4pOiBGaWVsZCB8IEZpZWxkU2V0IHwgdW5kZWZpbmVkID0+IHtcbiAgaWYgKGl0ZW0ubmFtZSA9PT0gbmFtZSkge1xuICAgIHJldHVybiBpdGVtXG4gIH1cbiAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBGaWVsZCkge1xuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuICBpZiAoaXRlbSBpbnN0YW5jZW9mIEZpZWxkU2V0KSB7XG4gICAgZm9yIChjb25zdCBzdWJJdGVtIG9mIGl0ZW0uc3RydWN0dXJlKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBmaW5kSW5Gb3JtKHN1Ykl0ZW0sIG5hbWUpXG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGZpbmRJbkRhdGEgPSAoXG4gIGRhdGE6IEZvcm1EYXRhLFxuICBkYXRhSWQ6IHN0cmluZ1xuKTogRm9ybURhdGEgfCB1bmRlZmluZWQgPT4ge1xuICBpZiAoaXNOdWxsT3JVbmRlZmluZWQoZGF0YSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdkYXRhIGlzIG51bGwgb3IgdW5kZWZpbmVkJylcbiAgfVxuXG4gIGNvbnN0IF9maW5kSW5PYmplY3QgPSAoXG4gICAgb2JqOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuICAgIGRhdGFJZDogc3RyaW5nXG4gICk6IEZvcm1EYXRhID0+IHtcbiAgICBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwob2JqLCBkYXRhSWQpKSB7XG4gICAgICByZXR1cm4gb2JqW2RhdGFJZF1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE9iamVjdC52YWx1ZXMob2JqKS5maW5kKFxuICAgICAgICAoY2hpbGQpID0+XG4gICAgICAgICAgY2hpbGQgJiZcbiAgICAgICAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YoY2hpbGQpID09PSBPYmplY3QucHJvdG90eXBlICYmXG4gICAgICAgICAgdHlwZW9mIF9maW5kSW5PYmplY3QoY2hpbGQsIGRhdGFJZCkgIT09ICd1bmRlZmluZWQnXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9maW5kSW5PYmplY3QoZGF0YSwgZGF0YUlkKVxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi90eXBlcydcbiIsImV4cG9ydCBjb25zdCBpc051bGxPclVuZGVmaW5lZCA9ICh2YWx1ZTogYW55KTogYm9vbGVhbiA9PlxuICB2YWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnXG5cbmV4cG9ydCBjb25zdCBpc0Jvb2xlYW4gPSAodmFsdWU6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbidcblxuZXhwb3J0IGNvbnN0IGhhc1Byb3BlcnR5ID0gKG9iajogYW55LCBwcm9wOiBzdHJpbmcpOiBib29sZWFuID0+XG4gIHR5cGVvZiBvYmogIT09ICd1bmRlZmluZWQnICYmXG4gIG9iaiAhPT0gbnVsbCAmJlxuICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKVxuXG5leHBvcnQgY29uc3QgaGFzTGVuZ3RoID0gKHZhbHVlOiBhbnkpOiBib29sZWFuID0+IGhhc1Byb3BlcnR5KHZhbHVlLCAnbGVuZ3RoJylcblxuZXhwb3J0IGNvbnN0IGlzU3RyaW5nID0gKHZhbHVlOiBhbnkpOiBib29sZWFuID0+XG4gIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmdcblxuZXhwb3J0IGNvbnN0IGlzTnVtYmVyID0gKHZhbHVlOiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcidcbiIsImltcG9ydCB7IEZvcm1EYXRhIH0gZnJvbSAnLi9mb3JtJ1xuaW1wb3J0IHsgSVZhbGlkYXRpb25Db25kaXRpb24sIElWYWxpZGF0aW9uRXJyb3IgfSBmcm9tICcuL0B0eXBlcydcblxuZXhwb3J0IGNsYXNzIFZhbGlkYXRvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyB2YWxpZGF0aW9uQ29uZGl0aW9uczogSVZhbGlkYXRpb25Db25kaXRpb25bXSxcbiAgICBwdWJsaWMgZGF0YTogRm9ybURhdGEgPSB7fSxcbiAgICBwdWJsaWMgZGF0YUlkPzogc3RyaW5nXG4gICkge31cblxuICB2YWxpZGF0ZShkYXRhPzogRm9ybURhdGEpOiBJVmFsaWRhdGlvbkVycm9yW10ge1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHRoaXMuZGF0YSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ05vIGRhdGEgc3VwcGxpZWQgZm9yIHZhbGlkYXRpb24nKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy52YWxpZGF0aW9uQ29uZGl0aW9uc1xuICAgICAgLm1hcCgodikgPT4gdi52YWxpZGF0ZSh0aGlzLmRhdGFJZCwgZGF0YSkpXG4gICAgICAuZmxhdCgpXG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBtYWtlRm9ybUJ1aWxkZXIsIGNvcmUgfSBmcm9tICdAdG5nYmwvZm9ybXMnXG5pbXBvcnQgeyBwYWdlVmFsaWRhdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NyYy9icm93c2VyJ1xuaW1wb3J0IHsgaG9va3MgfSBmcm9tICcuLi90ZW1wbGF0ZXMnXG5cbmNvbnN0IGJ1aWxkZXIgPSBtYWtlRm9ybUJ1aWxkZXIoKS53aXRoKGNvcmUpLndpdGgocGFnZVZhbGlkYXRpb24oeyBob29rcyB9KSlcblxud2luZG93Wyd0bmdibCddID0ge1xuICBidWlsZGVyXG59XG4iXSwic291cmNlUm9vdCI6IiJ9