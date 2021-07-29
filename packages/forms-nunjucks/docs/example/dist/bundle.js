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
        name: `page-validation`,
        fromPackage: _package_json__WEBPACK_IMPORTED_MODULE_2__.name,
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
    name: `core`,
    version: _package_json__WEBPACK_IMPORTED_MODULE_3__.version,
    fromPackage: _package_json__WEBPACK_IMPORTED_MODULE_3__.name,
    register(builder) {
        builder.withBuilders([
            ..._validations__WEBPACK_IMPORTED_MODULE_0__.coreValidationBuilders,
            ..._triggers__WEBPACK_IMPORTED_MODULE_1__.coreTriggerConditionBuilders,
            ..._views__WEBPACK_IMPORTED_MODULE_2__.coreViewBuilders
        ], 'core', _package_json__WEBPACK_IMPORTED_MODULE_3__.name, _package_json__WEBPACK_IMPORTED_MODULE_3__.version);
    },
    validations: {
        name: `core.validations`,
        version: _package_json__WEBPACK_IMPORTED_MODULE_3__.version,
        fromPackage: _package_json__WEBPACK_IMPORTED_MODULE_3__.name,
        register(builder) {
            builder.withBuilders(_validations__WEBPACK_IMPORTED_MODULE_0__.coreValidationBuilders, 'core.validations', _package_json__WEBPACK_IMPORTED_MODULE_3__.name, _package_json__WEBPACK_IMPORTED_MODULE_3__.version);
        }
    },
    dataTriggers: {
        name: `core.dataTriggers`,
        version: _package_json__WEBPACK_IMPORTED_MODULE_3__.version,
        fromPackage: _package_json__WEBPACK_IMPORTED_MODULE_3__.name,
        register(builder) {
            builder.withBuilders(_triggers__WEBPACK_IMPORTED_MODULE_1__.coreTriggerConditionBuilders, 'core.dataTriggers', _package_json__WEBPACK_IMPORTED_MODULE_3__.name, _package_json__WEBPACK_IMPORTED_MODULE_3__.version);
        }
    },
    views: {
        name: `core.views`,
        version: _package_json__WEBPACK_IMPORTED_MODULE_3__.version,
        fromPackage: _package_json__WEBPACK_IMPORTED_MODULE_3__.name,
        register(builder) {
            builder.withBuilders(_views__WEBPACK_IMPORTED_MODULE_2__.coreViewBuilders, 'core.views', _package_json__WEBPACK_IMPORTED_MODULE_3__.name, _package_json__WEBPACK_IMPORTED_MODULE_3__.version);
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
                    validation: MinLengthValidation.name,
                    error: 'too-short',
                    translateKey: `validations.${MinLengthValidation.name}.too-short`,
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
            type: MinLengthValidation.name,
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
            : (_a = builders
                .find((dt) => dt.type === json.isRequired.type)) === null || _a === void 0 ? void 0 : _a.fromJson(json.isRequired);
        if (typeof isRequiredTrigger === 'undefined')
            throw new Error(`DataTrigger '${(_b = json === null || json === void 0 ? void 0 : json.isRequired) === null || _b === void 0 ? void 0 : _b.type}' not registered`);
        const field = new Field(json.name, json.label, json.viewType, new _trigger__WEBPACK_IMPORTED_MODULE_1__.Trigger(json.name, isRequiredTrigger));
        field.validationConditions = json === null || json === void 0 ? void 0 : json.validationConditions.map((vJson) => {
            const builder = builders.find((v) => v.type === (vJson === null || vJson === void 0 ? void 0 : vJson.type));
            if (!builder)
                throw new Error(`Validation '${vJson === null || vJson === void 0 ? void 0 : vJson.type}' not registered`);
            return builder.fromJson(vJson, builders);
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
        const fieldSet = new FieldSet();
        return FieldSet._populateFromJson(fieldSet, json, builders);
    }
    static _populateFromJson(fieldSet, json, builders) {
        var _a;
        fieldSet.name = json.name;
        fieldSet.label = json.label;
        fieldSet.validationConditions = json.validationConditions.map((vJson) => { var _a; return (_a = builders.find((v) => v.type === vJson.name)) === null || _a === void 0 ? void 0 : _a.fromJson(vJson, builders); });
        const trigger = json.isRequired === true
            ? new _core_triggers_true__WEBPACK_IMPORTED_MODULE_2__.TrueTriggerCondition()
            : (_a = builders
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
        const viewBuilder = builders.find((builder) => builder.type === json.view.type);
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
    name: `gdpr`,
    fromPackage: _package_json__WEBPACK_IMPORTED_MODULE_0__.name,
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
/* harmony import */ var _plugin_dependency__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugin-dependency */ "../../../forms/src/plugin-dependency.ts");


class FormsBuilder {
    constructor() {
        this.builders = [];
        this.plugins = [];
    }
    withBuilders(builders, name, fromPackage, version) {
        this.builders.push(...builders.map((builder) => {
            builder._package = new _plugin_dependency__WEBPACK_IMPORTED_MODULE_1__.PluginDependency(name, fromPackage, version);
            return builder;
        }));
        return this;
    }
    with(plugin) {
        plugin.register(this);
        this.plugins.push(plugin);
        return this;
    }
    fromJson(json) {
        const form = _form__WEBPACK_IMPORTED_MODULE_0__.Form.fromJson(json, this.builders);
        form.schema.dependencies = this.plugins
            .filter((plugin) => plugin.isBuildDependency)
            .map((plugin) => new _plugin_dependency__WEBPACK_IMPORTED_MODULE_1__.PluginDependency(plugin.name, plugin.fromPackage || '', plugin.version));
        return form;
    }
}
const makeFormBuilder = () => new FormsBuilder();


/***/ }),

/***/ "../../../forms/src/plugin-dependency.ts":
/*!***********************************************!*\
  !*** ../../../forms/src/plugin-dependency.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PluginDependency": () => (/* binding */ PluginDependency)
/* harmony export */ });
class PluginDependency {
    constructor(name, fromPackage, version) {
        this.name = name;
        this.fromPackage = fromPackage;
        this.version = version;
    }
    toJson() {
        return {
            type: PluginDependency.name,
            fromPackage: this.fromPackage,
            name: this.name,
            version: this.version
        };
    }
    static fromJson(json) {
        return new PluginDependency(json.name, json.fromPackage, json.version);
    }
}


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
/* harmony import */ var _plugin_dependency__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugin-dependency */ "../../../forms/src/plugin-dependency.ts");


class Schema extends _fieldset__WEBPACK_IMPORTED_MODULE_0__.FieldSet {
    constructor() {
        super(...arguments);
        this.dependencies = [];
    }
    toJson() {
        const obj = super.toJson();
        obj.type = Schema.type;
        obj.schemaVersion = this.schemaVersion;
        obj.dependencies = this.dependencies.map((dependency) => dependency.toJson());
        return obj;
    }
    static fromJson(json, builders) {
        let schema = new Schema();
        schema = super._populateFromJson(schema, json, builders);
        schema.schemaVersion = json.schemaVersion;
        schema.name = json.name;
        schema.dependencies = json.dependencies.map((depJson) => _plugin_dependency__WEBPACK_IMPORTED_MODULE_1__.PluginDependency.fromJson(depJson));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9jYWxsLWJpbmQvY2FsbEJvdW5kLmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vbm9kZV9tb2R1bGVzL2NhbGwtYmluZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9kZWZpbmUtcHJvcGVydGllcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9lcy1hYnN0cmFjdC8yMDIwL1JlcXVpcmVPYmplY3RDb2VyY2libGUuanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9ub2RlX21vZHVsZXMvZXMtYWJzdHJhY3QvMjAyMC9Ub1N0cmluZy5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9lcy1hYnN0cmFjdC81L0NoZWNrT2JqZWN0Q29lcmNpYmxlLmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vbm9kZV9tb2R1bGVzL2Zvci1lYWNoL2luZGV4LmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vbm9kZV9tb2R1bGVzL2Z1bmN0aW9uLWJpbmQvaW1wbGVtZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9ub2RlX21vZHVsZXMvZnVuY3Rpb24tYmluZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9nZXQtaW50cmluc2ljL2luZGV4LmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vbm9kZV9tb2R1bGVzL2hhcy1zeW1ib2xzL2luZGV4LmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vbm9kZV9tb2R1bGVzL2hhcy1zeW1ib2xzL3NoYW1zLmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vbm9kZV9tb2R1bGVzL2hhcy9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9ub2RlX21vZHVsZXMvaXMtY2FsbGFibGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9ub2RlX21vZHVsZXMvbm9kZS1wb2x5Z2xvdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pc0FyZ3VtZW50cy5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9zdHJpbmcucHJvdG90eXBlLnRyaW0vaW1wbGVtZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9ub2RlX21vZHVsZXMvc3RyaW5nLnByb3RvdHlwZS50cmltL2luZGV4LmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vbm9kZV9tb2R1bGVzL3N0cmluZy5wcm90b3R5cGUudHJpbS9wb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9zdHJpbmcucHJvdG90eXBlLnRyaW0vc2hpbS5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy93YXJuaW5nL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uL3NyYy90ZW1wbGF0ZXMvZmF2b3VyaXRlLWNvbG91ci50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4vc3JjL3RlbXBsYXRlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL3NyYy9icm93c2VyL2luZGV4LnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vc3JjL2Jyb3dzZXIvcGFnZS12YWxpZGF0aW9uLXBsdWdpbi50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL3NyYy90ZW1wbGF0ZXMvZXJyb3ItYmxvY2sudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9zcmMvdGVtcGxhdGVzL2luZGV4LnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vc3JjL3RlbXBsYXRlcy9uZXctcGFzc3dvcmQudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvY29yZS9jb3JlLXBsdWdpbi50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL2Zvcm1zL3NyYy9jb3JlL2luZGV4LnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL2NvcmUvdHJpZ2dlcnMvZXF1YWxzLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL2NvcmUvdHJpZ2dlcnMvZmFsc2UudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvY29yZS90cmlnZ2Vycy9pbmRleC50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL2Zvcm1zL3NyYy9jb3JlL3RyaWdnZXJzL3RydWUudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvY29yZS92YWxpZGF0aW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL2Zvcm1zL3NyYy9jb3JlL3ZhbGlkYXRpb25zL21pbi1sZW5ndGgudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvY29yZS92aWV3cy9iYXNpYy1mb3JtLXZpZXcudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvY29yZS92aWV3cy9pbmRleC50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL2Zvcm1zL3NyYy9leGNlcHRpb25zLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL2ZpZWxkLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL2ZpZWxkc2V0LnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL2Zvcm0udHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvZ2Rwci9nZHByLXBsdWdpbi50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL2Zvcm1zL3NyYy9nZHByL2luZGV4LnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL2luZGV4LnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL21ha2UtZm9ybS1idWlsZGVyLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL3BsdWdpbi1kZXBlbmRlbmN5LnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL3NjaGVtYS50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL2Zvcm1zL3NyYy90cmlnZ2VyLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL3V0aWxzL2ZpbmQudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvdXRpbHMvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvdmFsaWRhdG9yLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi9zcmMvYnJvd3Nlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7O0FBRWIsbUJBQW1CLG1CQUFPLENBQUMsc0VBQWU7O0FBRTFDLGVBQWUsbUJBQU8sQ0FBQyx1REFBSTs7QUFFM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDZGE7O0FBRWIsV0FBVyxtQkFBTyxDQUFDLHNF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dGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdnZXQtaW50cmluc2ljJyk7XG5cbnZhciBjYWxsQmluZCA9IHJlcXVpcmUoJy4vJyk7XG5cbnZhciAkaW5kZXhPZiA9IGNhbGxCaW5kKEdldEludHJpbnNpYygnU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mJykpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNhbGxCb3VuZEludHJpbnNpYyhuYW1lLCBhbGxvd01pc3NpbmcpIHtcblx0dmFyIGludHJpbnNpYyA9IEdldEludHJpbnNpYyhuYW1lLCAhIWFsbG93TWlzc2luZyk7XG5cdGlmICh0eXBlb2YgaW50cmluc2ljID09PSAnZnVuY3Rpb24nICYmICRpbmRleE9mKG5hbWUsICcucHJvdG90eXBlLicpID4gLTEpIHtcblx0XHRyZXR1cm4gY2FsbEJpbmQoaW50cmluc2ljKTtcblx0fVxuXHRyZXR1cm4gaW50cmluc2ljO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCdmdW5jdGlvbi1iaW5kJyk7XG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnZ2V0LWludHJpbnNpYycpO1xuXG52YXIgJGFwcGx5ID0gR2V0SW50cmluc2ljKCclRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5JScpO1xudmFyICRjYWxsID0gR2V0SW50cmluc2ljKCclRnVuY3Rpb24ucHJvdG90eXBlLmNhbGwlJyk7XG52YXIgJHJlZmxlY3RBcHBseSA9IEdldEludHJpbnNpYygnJVJlZmxlY3QuYXBwbHklJywgdHJ1ZSkgfHwgYmluZC5jYWxsKCRjYWxsLCAkYXBwbHkpO1xuXG52YXIgJGdPUEQgPSBHZXRJbnRyaW5zaWMoJyVPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJScsIHRydWUpO1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IEdldEludHJpbnNpYygnJU9iamVjdC5kZWZpbmVQcm9wZXJ0eSUnLCB0cnVlKTtcbnZhciAkbWF4ID0gR2V0SW50cmluc2ljKCclTWF0aC5tYXglJyk7XG5cbmlmICgkZGVmaW5lUHJvcGVydHkpIHtcblx0dHJ5IHtcblx0XHQkZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyB2YWx1ZTogMSB9KTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIElFIDggaGFzIGEgYnJva2VuIGRlZmluZVByb3BlcnR5XG5cdFx0JGRlZmluZVByb3BlcnR5ID0gbnVsbDtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNhbGxCaW5kKG9yaWdpbmFsRnVuY3Rpb24pIHtcblx0dmFyIGZ1bmMgPSAkcmVmbGVjdEFwcGx5KGJpbmQsICRjYWxsLCBhcmd1bWVudHMpO1xuXHRpZiAoJGdPUEQgJiYgJGRlZmluZVByb3BlcnR5KSB7XG5cdFx0dmFyIGRlc2MgPSAkZ09QRChmdW5jLCAnbGVuZ3RoJyk7XG5cdFx0aWYgKGRlc2MuY29uZmlndXJhYmxlKSB7XG5cdFx0XHQvLyBvcmlnaW5hbCBsZW5ndGgsIHBsdXMgdGhlIHJlY2VpdmVyLCBtaW51cyBhbnkgYWRkaXRpb25hbCBhcmd1bWVudHMgKGFmdGVyIHRoZSByZWNlaXZlcilcblx0XHRcdCRkZWZpbmVQcm9wZXJ0eShcblx0XHRcdFx0ZnVuYyxcblx0XHRcdFx0J2xlbmd0aCcsXG5cdFx0XHRcdHsgdmFsdWU6IDEgKyAkbWF4KDAsIG9yaWdpbmFsRnVuY3Rpb24ubGVuZ3RoIC0gKGFyZ3VtZW50cy5sZW5ndGggLSAxKSkgfVxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGZ1bmM7XG59O1xuXG52YXIgYXBwbHlCaW5kID0gZnVuY3Rpb24gYXBwbHlCaW5kKCkge1xuXHRyZXR1cm4gJHJlZmxlY3RBcHBseShiaW5kLCAkYXBwbHksIGFyZ3VtZW50cyk7XG59O1xuXG5pZiAoJGRlZmluZVByb3BlcnR5KSB7XG5cdCRkZWZpbmVQcm9wZXJ0eShtb2R1bGUuZXhwb3J0cywgJ2FwcGx5JywgeyB2YWx1ZTogYXBwbHlCaW5kIH0pO1xufSBlbHNlIHtcblx0bW9kdWxlLmV4cG9ydHMuYXBwbHkgPSBhcHBseUJpbmQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzID0gcmVxdWlyZSgnb2JqZWN0LWtleXMnKTtcbnZhciBoYXNTeW1ib2xzID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sKCdmb28nKSA9PT0gJ3N5bWJvbCc7XG5cbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgY29uY2F0ID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdDtcbnZhciBvcmlnRGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbnZhciBpc0Z1bmN0aW9uID0gZnVuY3Rpb24gKGZuKSB7XG5cdHJldHVybiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgJiYgdG9TdHIuY2FsbChmbikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59O1xuXG52YXIgYXJlUHJvcGVydHlEZXNjcmlwdG9yc1N1cHBvcnRlZCA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIG9iaiA9IHt9O1xuXHR0cnkge1xuXHRcdG9yaWdEZWZpbmVQcm9wZXJ0eShvYmosICd4JywgeyBlbnVtZXJhYmxlOiBmYWxzZSwgdmFsdWU6IG9iaiB9KTtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnMsIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0Zm9yICh2YXIgXyBpbiBvYmopIHsgLy8ganNjczppZ25vcmUgZGlzYWxsb3dVbnVzZWRWYXJpYWJsZXNcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIG9iai54ID09PSBvYmo7XG5cdH0gY2F0Y2ggKGUpIHsgLyogdGhpcyBpcyBJRSA4LiAqL1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufTtcbnZhciBzdXBwb3J0c0Rlc2NyaXB0b3JzID0gb3JpZ0RlZmluZVByb3BlcnR5ICYmIGFyZVByb3BlcnR5RGVzY3JpcHRvcnNTdXBwb3J0ZWQoKTtcblxudmFyIGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZSwgdmFsdWUsIHByZWRpY2F0ZSkge1xuXHRpZiAobmFtZSBpbiBvYmplY3QgJiYgKCFpc0Z1bmN0aW9uKHByZWRpY2F0ZSkgfHwgIXByZWRpY2F0ZSgpKSkge1xuXHRcdHJldHVybjtcblx0fVxuXHRpZiAoc3VwcG9ydHNEZXNjcmlwdG9ycykge1xuXHRcdG9yaWdEZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdFx0d3JpdGFibGU6IHRydWVcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHRvYmplY3RbbmFtZV0gPSB2YWx1ZTtcblx0fVxufTtcblxudmFyIGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiAob2JqZWN0LCBtYXApIHtcblx0dmFyIHByZWRpY2F0ZXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiA/IGFyZ3VtZW50c1syXSA6IHt9O1xuXHR2YXIgcHJvcHMgPSBrZXlzKG1hcCk7XG5cdGlmIChoYXNTeW1ib2xzKSB7XG5cdFx0cHJvcHMgPSBjb25jYXQuY2FsbChwcm9wcywgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhtYXApKTtcblx0fVxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0ZGVmaW5lUHJvcGVydHkob2JqZWN0LCBwcm9wc1tpXSwgbWFwW3Byb3BzW2ldXSwgcHJlZGljYXRlc1twcm9wc1tpXV0pO1xuXHR9XG59O1xuXG5kZWZpbmVQcm9wZXJ0aWVzLnN1cHBvcnRzRGVzY3JpcHRvcnMgPSAhIXN1cHBvcnRzRGVzY3JpcHRvcnM7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmaW5lUHJvcGVydGllcztcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi81L0NoZWNrT2JqZWN0Q29lcmNpYmxlJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdnZXQtaW50cmluc2ljJyk7XG5cbnZhciAkU3RyaW5nID0gR2V0SW50cmluc2ljKCclU3RyaW5nJScpO1xudmFyICRUeXBlRXJyb3IgPSBHZXRJbnRyaW5zaWMoJyVUeXBlRXJyb3IlJyk7XG5cbi8vIGh0dHBzOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy10b3N0cmluZ1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFRvU3RyaW5nKGFyZ3VtZW50KSB7XG5cdGlmICh0eXBlb2YgYXJndW1lbnQgPT09ICdzeW1ib2wnKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IGEgU3ltYm9sIHZhbHVlIHRvIGEgc3RyaW5nJyk7XG5cdH1cblx0cmV0dXJuICRTdHJpbmcoYXJndW1lbnQpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyICRUeXBlRXJyb3IgPSBHZXRJbnRyaW5zaWMoJyVUeXBlRXJyb3IlJyk7XG5cbi8vIGh0dHA6Ly8yNjIuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy81LjEvI3NlYy05LjEwXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQ2hlY2tPYmplY3RDb2VyY2libGUodmFsdWUsIG9wdE1lc3NhZ2UpIHtcblx0aWYgKHZhbHVlID09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcihvcHRNZXNzYWdlIHx8ICgnQ2Fubm90IGNhbGwgbWV0aG9kIG9uICcgKyB2YWx1ZSkpO1xuXHR9XG5cdHJldHVybiB2YWx1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnaXMtY2FsbGFibGUnKTtcblxudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBmb3JFYWNoQXJyYXkgPSBmdW5jdGlvbiBmb3JFYWNoQXJyYXkoYXJyYXksIGl0ZXJhdG9yLCByZWNlaXZlcikge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChhcnJheSwgaSkpIHtcbiAgICAgICAgICAgIGlmIChyZWNlaXZlciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IoYXJyYXlbaV0sIGksIGFycmF5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChyZWNlaXZlciwgYXJyYXlbaV0sIGksIGFycmF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBmb3JFYWNoU3RyaW5nID0gZnVuY3Rpb24gZm9yRWFjaFN0cmluZyhzdHJpbmcsIGl0ZXJhdG9yLCByZWNlaXZlcikge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzdHJpbmcubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgLy8gbm8gc3VjaCB0aGluZyBhcyBhIHNwYXJzZSBzdHJpbmcuXG4gICAgICAgIGlmIChyZWNlaXZlciA9PSBudWxsKSB7XG4gICAgICAgICAgICBpdGVyYXRvcihzdHJpbmcuY2hhckF0KGkpLCBpLCBzdHJpbmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChyZWNlaXZlciwgc3RyaW5nLmNoYXJBdChpKSwgaSwgc3RyaW5nKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBmb3JFYWNoT2JqZWN0ID0gZnVuY3Rpb24gZm9yRWFjaE9iamVjdChvYmplY3QsIGl0ZXJhdG9yLCByZWNlaXZlcikge1xuICAgIGZvciAodmFyIGsgaW4gb2JqZWN0KSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgaykpIHtcbiAgICAgICAgICAgIGlmIChyZWNlaXZlciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3Iob2JqZWN0W2tdLCBrLCBvYmplY3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRvci5jYWxsKHJlY2VpdmVyLCBvYmplY3Rba10sIGssIG9iamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2gobGlzdCwgaXRlcmF0b3IsIHRoaXNBcmcpIHtcbiAgICBpZiAoIWlzQ2FsbGFibGUoaXRlcmF0b3IpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2l0ZXJhdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgIH1cblxuICAgIHZhciByZWNlaXZlcjtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAzKSB7XG4gICAgICAgIHJlY2VpdmVyID0gdGhpc0FyZztcbiAgICB9XG5cbiAgICBpZiAodG9TdHIuY2FsbChsaXN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICBmb3JFYWNoQXJyYXkobGlzdCwgaXRlcmF0b3IsIHJlY2VpdmVyKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ID09PSAnc3RyaW5nJykge1xuICAgICAgICBmb3JFYWNoU3RyaW5nKGxpc3QsIGl0ZXJhdG9yLCByZWNlaXZlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yRWFjaE9iamVjdChsaXN0LCBpdGVyYXRvciwgcmVjZWl2ZXIpO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZm9yRWFjaDtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyogZXNsaW50IG5vLWludmFsaWQtdGhpczogMSAqL1xuXG52YXIgRVJST1JfTUVTU0FHRSA9ICdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCBjYWxsZWQgb24gaW5jb21wYXRpYmxlICc7XG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGZ1bmNUeXBlID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKHRoYXQpIHtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcztcbiAgICBpZiAodHlwZW9mIHRhcmdldCAhPT0gJ2Z1bmN0aW9uJyB8fCB0b1N0ci5jYWxsKHRhcmdldCkgIT09IGZ1bmNUeXBlKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRVJST1JfTUVTU0FHRSArIHRhcmdldCk7XG4gICAgfVxuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gICAgdmFyIGJvdW5kO1xuICAgIHZhciBiaW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgYm91bmQpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0YXJnZXQuYXBwbHkoXG4gICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKE9iamVjdChyZXN1bHQpID09PSByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0LmFwcGx5KFxuICAgICAgICAgICAgICAgIHRoYXQsXG4gICAgICAgICAgICAgICAgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgYm91bmRMZW5ndGggPSBNYXRoLm1heCgwLCB0YXJnZXQubGVuZ3RoIC0gYXJncy5sZW5ndGgpO1xuICAgIHZhciBib3VuZEFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvdW5kTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYm91bmRBcmdzLnB1c2goJyQnICsgaSk7XG4gICAgfVxuXG4gICAgYm91bmQgPSBGdW5jdGlvbignYmluZGVyJywgJ3JldHVybiBmdW5jdGlvbiAoJyArIGJvdW5kQXJncy5qb2luKCcsJykgKyAnKXsgcmV0dXJuIGJpbmRlci5hcHBseSh0aGlzLGFyZ3VtZW50cyk7IH0nKShiaW5kZXIpO1xuXG4gICAgaWYgKHRhcmdldC5wcm90b3R5cGUpIHtcbiAgICAgICAgdmFyIEVtcHR5ID0gZnVuY3Rpb24gRW1wdHkoKSB7fTtcbiAgICAgICAgRW1wdHkucHJvdG90eXBlID0gdGFyZ2V0LnByb3RvdHlwZTtcbiAgICAgICAgYm91bmQucHJvdG90eXBlID0gbmV3IEVtcHR5KCk7XG4gICAgICAgIEVtcHR5LnByb3RvdHlwZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvdW5kO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIHx8IGltcGxlbWVudGF0aW9uO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdW5kZWZpbmVkO1xuXG52YXIgJFN5bnRheEVycm9yID0gU3ludGF4RXJyb3I7XG52YXIgJEZ1bmN0aW9uID0gRnVuY3Rpb247XG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG52YXIgZ2V0RXZhbGxlZENvbnN0cnVjdG9yID0gZnVuY3Rpb24gKGV4cHJlc3Npb25TeW50YXgpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gJEZ1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjsgcmV0dXJuICgnICsgZXhwcmVzc2lvblN5bnRheCArICcpLmNvbnN0cnVjdG9yOycpKCk7XG5cdH0gY2F0Y2ggKGUpIHt9XG59O1xuXG52YXIgJGdPUEQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuaWYgKCRnT1BEKSB7XG5cdHRyeSB7XG5cdFx0JGdPUEQoe30sICcnKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdCRnT1BEID0gbnVsbDsgLy8gdGhpcyBpcyBJRSA4LCB3aGljaCBoYXMgYSBicm9rZW4gZ09QRFxuXHR9XG59XG5cbnZhciB0aHJvd1R5cGVFcnJvciA9IGZ1bmN0aW9uICgpIHtcblx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoKTtcbn07XG52YXIgVGhyb3dUeXBlRXJyb3IgPSAkZ09QRFxuXHQ/IChmdW5jdGlvbiAoKSB7XG5cdFx0dHJ5IHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnMsIG5vLWNhbGxlciwgbm8tcmVzdHJpY3RlZC1wcm9wZXJ0aWVzXG5cdFx0XHRhcmd1bWVudHMuY2FsbGVlOyAvLyBJRSA4IGRvZXMgbm90IHRocm93IGhlcmVcblx0XHRcdHJldHVybiB0aHJvd1R5cGVFcnJvcjtcblx0XHR9IGNhdGNoIChjYWxsZWVUaHJvd3MpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdC8vIElFIDggdGhyb3dzIG9uIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYXJndW1lbnRzLCAnJylcblx0XHRcdFx0cmV0dXJuICRnT1BEKGFyZ3VtZW50cywgJ2NhbGxlZScpLmdldDtcblx0XHRcdH0gY2F0Y2ggKGdPUER0aHJvd3MpIHtcblx0XHRcdFx0cmV0dXJuIHRocm93VHlwZUVycm9yO1xuXHRcdFx0fVxuXHRcdH1cblx0fSgpKVxuXHQ6IHRocm93VHlwZUVycm9yO1xuXG52YXIgaGFzU3ltYm9scyA9IHJlcXVpcmUoJ2hhcy1zeW1ib2xzJykoKTtcblxudmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Ll9fcHJvdG9fXzsgfTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b1xuXG52YXIgbmVlZHNFdmFsID0ge307XG5cbnZhciBUeXBlZEFycmF5ID0gdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8oVWludDhBcnJheSk7XG5cbnZhciBJTlRSSU5TSUNTID0ge1xuXHQnJUFnZ3JlZ2F0ZUVycm9yJSc6IHR5cGVvZiBBZ2dyZWdhdGVFcnJvciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBZ2dyZWdhdGVFcnJvcixcblx0JyVBcnJheSUnOiBBcnJheSxcblx0JyVBcnJheUJ1ZmZlciUnOiB0eXBlb2YgQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQXJyYXlCdWZmZXIsXG5cdCclQXJyYXlJdGVyYXRvclByb3RvdHlwZSUnOiBoYXNTeW1ib2xzID8gZ2V0UHJvdG8oW11bU3ltYm9sLml0ZXJhdG9yXSgpKSA6IHVuZGVmaW5lZCxcblx0JyVBc3luY0Zyb21TeW5jSXRlcmF0b3JQcm90b3R5cGUlJzogdW5kZWZpbmVkLFxuXHQnJUFzeW5jRnVuY3Rpb24lJzogbmVlZHNFdmFsLFxuXHQnJUFzeW5jR2VuZXJhdG9yJSc6IG5lZWRzRXZhbCxcblx0JyVBc3luY0dlbmVyYXRvckZ1bmN0aW9uJSc6IG5lZWRzRXZhbCxcblx0JyVBc3luY0l0ZXJhdG9yUHJvdG90eXBlJSc6IG5lZWRzRXZhbCxcblx0JyVBdG9taWNzJSc6IHR5cGVvZiBBdG9taWNzID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEF0b21pY3MsXG5cdCclQmlnSW50JSc6IHR5cGVvZiBCaWdJbnQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQmlnSW50LFxuXHQnJUJvb2xlYW4lJzogQm9vbGVhbixcblx0JyVEYXRhVmlldyUnOiB0eXBlb2YgRGF0YVZpZXcgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRGF0YVZpZXcsXG5cdCclRGF0ZSUnOiBEYXRlLFxuXHQnJWRlY29kZVVSSSUnOiBkZWNvZGVVUkksXG5cdCclZGVjb2RlVVJJQ29tcG9uZW50JSc6IGRlY29kZVVSSUNvbXBvbmVudCxcblx0JyVlbmNvZGVVUkklJzogZW5jb2RlVVJJLFxuXHQnJWVuY29kZVVSSUNvbXBvbmVudCUnOiBlbmNvZGVVUklDb21wb25lbnQsXG5cdCclRXJyb3IlJzogRXJyb3IsXG5cdCclZXZhbCUnOiBldmFsLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWV2YWxcblx0JyVFdmFsRXJyb3IlJzogRXZhbEVycm9yLFxuXHQnJUZsb2F0MzJBcnJheSUnOiB0eXBlb2YgRmxvYXQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZsb2F0MzJBcnJheSxcblx0JyVGbG9hdDY0QXJyYXklJzogdHlwZW9mIEZsb2F0NjRBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGbG9hdDY0QXJyYXksXG5cdCclRmluYWxpemF0aW9uUmVnaXN0cnklJzogdHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZpbmFsaXphdGlvblJlZ2lzdHJ5LFxuXHQnJUZ1bmN0aW9uJSc6ICRGdW5jdGlvbixcblx0JyVHZW5lcmF0b3JGdW5jdGlvbiUnOiBuZWVkc0V2YWwsXG5cdCclSW50OEFycmF5JSc6IHR5cGVvZiBJbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogSW50OEFycmF5LFxuXHQnJUludDE2QXJyYXklJzogdHlwZW9mIEludDE2QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogSW50MTZBcnJheSxcblx0JyVJbnQzMkFycmF5JSc6IHR5cGVvZiBJbnQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDMyQXJyYXksXG5cdCclaXNGaW5pdGUlJzogaXNGaW5pdGUsXG5cdCclaXNOYU4lJzogaXNOYU4sXG5cdCclSXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyA/IGdldFByb3RvKGdldFByb3RvKFtdW1N5bWJvbC5pdGVyYXRvcl0oKSkpIDogdW5kZWZpbmVkLFxuXHQnJUpTT04lJzogdHlwZW9mIEpTT04gPT09ICdvYmplY3QnID8gSlNPTiA6IHVuZGVmaW5lZCxcblx0JyVNYXAlJzogdHlwZW9mIE1hcCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBNYXAsXG5cdCclTWFwSXRlcmF0b3JQcm90b3R5cGUlJzogdHlwZW9mIE1hcCA9PT0gJ3VuZGVmaW5lZCcgfHwgIWhhc1N5bWJvbHMgPyB1bmRlZmluZWQgOiBnZXRQcm90byhuZXcgTWFwKClbU3ltYm9sLml0ZXJhdG9yXSgpKSxcblx0JyVNYXRoJSc6IE1hdGgsXG5cdCclTnVtYmVyJSc6IE51bWJlcixcblx0JyVPYmplY3QlJzogT2JqZWN0LFxuXHQnJXBhcnNlRmxvYXQlJzogcGFyc2VGbG9hdCxcblx0JyVwYXJzZUludCUnOiBwYXJzZUludCxcblx0JyVQcm9taXNlJSc6IHR5cGVvZiBQcm9taXNlID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFByb21pc2UsXG5cdCclUHJveHklJzogdHlwZW9mIFByb3h5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFByb3h5LFxuXHQnJVJhbmdlRXJyb3IlJzogUmFuZ2VFcnJvcixcblx0JyVSZWZlcmVuY2VFcnJvciUnOiBSZWZlcmVuY2VFcnJvcixcblx0JyVSZWZsZWN0JSc6IHR5cGVvZiBSZWZsZWN0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFJlZmxlY3QsXG5cdCclUmVnRXhwJSc6IFJlZ0V4cCxcblx0JyVTZXQlJzogdHlwZW9mIFNldCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBTZXQsXG5cdCclU2V0SXRlcmF0b3JQcm90b3R5cGUlJzogdHlwZW9mIFNldCA9PT0gJ3VuZGVmaW5lZCcgfHwgIWhhc1N5bWJvbHMgPyB1bmRlZmluZWQgOiBnZXRQcm90byhuZXcgU2V0KClbU3ltYm9sLml0ZXJhdG9yXSgpKSxcblx0JyVTaGFyZWRBcnJheUJ1ZmZlciUnOiB0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogU2hhcmVkQXJyYXlCdWZmZXIsXG5cdCclU3RyaW5nJSc6IFN0cmluZyxcblx0JyVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUnOiBoYXNTeW1ib2xzID8gZ2V0UHJvdG8oJydbU3ltYm9sLml0ZXJhdG9yXSgpKSA6IHVuZGVmaW5lZCxcblx0JyVTeW1ib2wlJzogaGFzU3ltYm9scyA/IFN5bWJvbCA6IHVuZGVmaW5lZCxcblx0JyVTeW50YXhFcnJvciUnOiAkU3ludGF4RXJyb3IsXG5cdCclVGhyb3dUeXBlRXJyb3IlJzogVGhyb3dUeXBlRXJyb3IsXG5cdCclVHlwZWRBcnJheSUnOiBUeXBlZEFycmF5LFxuXHQnJVR5cGVFcnJvciUnOiAkVHlwZUVycm9yLFxuXHQnJVVpbnQ4QXJyYXklJzogdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDhBcnJheSxcblx0JyVVaW50OENsYW1wZWRBcnJheSUnOiB0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDhDbGFtcGVkQXJyYXksXG5cdCclVWludDE2QXJyYXklJzogdHlwZW9mIFVpbnQxNkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQxNkFycmF5LFxuXHQnJVVpbnQzMkFycmF5JSc6IHR5cGVvZiBVaW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50MzJBcnJheSxcblx0JyVVUklFcnJvciUnOiBVUklFcnJvcixcblx0JyVXZWFrTWFwJSc6IHR5cGVvZiBXZWFrTWFwID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtNYXAsXG5cdCclV2Vha1JlZiUnOiB0eXBlb2YgV2Vha1JlZiA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrUmVmLFxuXHQnJVdlYWtTZXQlJzogdHlwZW9mIFdlYWtTZXQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha1NldFxufTtcblxudmFyIGRvRXZhbCA9IGZ1bmN0aW9uIGRvRXZhbChuYW1lKSB7XG5cdHZhciB2YWx1ZTtcblx0aWYgKG5hbWUgPT09ICclQXN5bmNGdW5jdGlvbiUnKSB7XG5cdFx0dmFsdWUgPSBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2FzeW5jIGZ1bmN0aW9uICgpIHt9Jyk7XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVHZW5lcmF0b3JGdW5jdGlvbiUnKSB7XG5cdFx0dmFsdWUgPSBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2Z1bmN0aW9uKiAoKSB7fScpO1xuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiUnKSB7XG5cdFx0dmFsdWUgPSBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2FzeW5jIGZ1bmN0aW9uKiAoKSB7fScpO1xuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclQXN5bmNHZW5lcmF0b3IlJykge1xuXHRcdHZhciBmbiA9IGRvRXZhbCgnJUFzeW5jR2VuZXJhdG9yRnVuY3Rpb24lJyk7XG5cdFx0aWYgKGZuKSB7XG5cdFx0XHR2YWx1ZSA9IGZuLnByb3RvdHlwZTtcblx0XHR9XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVBc3luY0l0ZXJhdG9yUHJvdG90eXBlJScpIHtcblx0XHR2YXIgZ2VuID0gZG9FdmFsKCclQXN5bmNHZW5lcmF0b3IlJyk7XG5cdFx0aWYgKGdlbikge1xuXHRcdFx0dmFsdWUgPSBnZXRQcm90byhnZW4ucHJvdG90eXBlKTtcblx0XHR9XG5cdH1cblxuXHRJTlRSSU5TSUNTW25hbWVdID0gdmFsdWU7XG5cblx0cmV0dXJuIHZhbHVlO1xufTtcblxudmFyIExFR0FDWV9BTElBU0VTID0ge1xuXHQnJUFycmF5QnVmZmVyUHJvdG90eXBlJSc6IFsnQXJyYXlCdWZmZXInLCAncHJvdG90eXBlJ10sXG5cdCclQXJyYXlQcm90b3R5cGUlJzogWydBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVBcnJheVByb3RvX2VudHJpZXMlJzogWydBcnJheScsICdwcm90b3R5cGUnLCAnZW50cmllcyddLFxuXHQnJUFycmF5UHJvdG9fZm9yRWFjaCUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICdmb3JFYWNoJ10sXG5cdCclQXJyYXlQcm90b19rZXlzJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ2tleXMnXSxcblx0JyVBcnJheVByb3RvX3ZhbHVlcyUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICd2YWx1ZXMnXSxcblx0JyVBc3luY0Z1bmN0aW9uUHJvdG90eXBlJSc6IFsnQXN5bmNGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVBc3luY0dlbmVyYXRvciUnOiBbJ0FzeW5jR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclQXN5bmNHZW5lcmF0b3JQcm90b3R5cGUlJzogWydBc3luY0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZScsICdwcm90b3R5cGUnXSxcblx0JyVCb29sZWFuUHJvdG90eXBlJSc6IFsnQm9vbGVhbicsICdwcm90b3R5cGUnXSxcblx0JyVEYXRhVmlld1Byb3RvdHlwZSUnOiBbJ0RhdGFWaWV3JywgJ3Byb3RvdHlwZSddLFxuXHQnJURhdGVQcm90b3R5cGUlJzogWydEYXRlJywgJ3Byb3RvdHlwZSddLFxuXHQnJUVycm9yUHJvdG90eXBlJSc6IFsnRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclRXZhbEVycm9yUHJvdG90eXBlJSc6IFsnRXZhbEVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJUZsb2F0MzJBcnJheVByb3RvdHlwZSUnOiBbJ0Zsb2F0MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVGbG9hdDY0QXJyYXlQcm90b3R5cGUlJzogWydGbG9hdDY0QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclRnVuY3Rpb25Qcm90b3R5cGUlJzogWydGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVHZW5lcmF0b3IlJzogWydHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVHZW5lcmF0b3JQcm90b3R5cGUlJzogWydHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnLCAncHJvdG90eXBlJ10sXG5cdCclSW50OEFycmF5UHJvdG90eXBlJSc6IFsnSW50OEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUludDE2QXJyYXlQcm90b3R5cGUlJzogWydJbnQxNkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUludDMyQXJyYXlQcm90b3R5cGUlJzogWydJbnQzMkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUpTT05QYXJzZSUnOiBbJ0pTT04nLCAncGFyc2UnXSxcblx0JyVKU09OU3RyaW5naWZ5JSc6IFsnSlNPTicsICdzdHJpbmdpZnknXSxcblx0JyVNYXBQcm90b3R5cGUlJzogWydNYXAnLCAncHJvdG90eXBlJ10sXG5cdCclTnVtYmVyUHJvdG90eXBlJSc6IFsnTnVtYmVyJywgJ3Byb3RvdHlwZSddLFxuXHQnJU9iamVjdFByb3RvdHlwZSUnOiBbJ09iamVjdCcsICdwcm90b3R5cGUnXSxcblx0JyVPYmpQcm90b190b1N0cmluZyUnOiBbJ09iamVjdCcsICdwcm90b3R5cGUnLCAndG9TdHJpbmcnXSxcblx0JyVPYmpQcm90b192YWx1ZU9mJSc6IFsnT2JqZWN0JywgJ3Byb3RvdHlwZScsICd2YWx1ZU9mJ10sXG5cdCclUHJvbWlzZVByb3RvdHlwZSUnOiBbJ1Byb21pc2UnLCAncHJvdG90eXBlJ10sXG5cdCclUHJvbWlzZVByb3RvX3RoZW4lJzogWydQcm9taXNlJywgJ3Byb3RvdHlwZScsICd0aGVuJ10sXG5cdCclUHJvbWlzZV9hbGwlJzogWydQcm9taXNlJywgJ2FsbCddLFxuXHQnJVByb21pc2VfcmVqZWN0JSc6IFsnUHJvbWlzZScsICdyZWplY3QnXSxcblx0JyVQcm9taXNlX3Jlc29sdmUlJzogWydQcm9taXNlJywgJ3Jlc29sdmUnXSxcblx0JyVSYW5nZUVycm9yUHJvdG90eXBlJSc6IFsnUmFuZ2VFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVSZWZlcmVuY2VFcnJvclByb3RvdHlwZSUnOiBbJ1JlZmVyZW5jZUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVJlZ0V4cFByb3RvdHlwZSUnOiBbJ1JlZ0V4cCcsICdwcm90b3R5cGUnXSxcblx0JyVTZXRQcm90b3R5cGUlJzogWydTZXQnLCAncHJvdG90eXBlJ10sXG5cdCclU2hhcmVkQXJyYXlCdWZmZXJQcm90b3R5cGUlJzogWydTaGFyZWRBcnJheUJ1ZmZlcicsICdwcm90b3R5cGUnXSxcblx0JyVTdHJpbmdQcm90b3R5cGUlJzogWydTdHJpbmcnLCAncHJvdG90eXBlJ10sXG5cdCclU3ltYm9sUHJvdG90eXBlJSc6IFsnU3ltYm9sJywgJ3Byb3RvdHlwZSddLFxuXHQnJVN5bnRheEVycm9yUHJvdG90eXBlJSc6IFsnU3ludGF4RXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclVHlwZWRBcnJheVByb3RvdHlwZSUnOiBbJ1R5cGVkQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVHlwZUVycm9yUHJvdG90eXBlJSc6IFsnVHlwZUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQ4QXJyYXlQcm90b3R5cGUlJzogWydVaW50OEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQ4Q2xhbXBlZEFycmF5UHJvdG90eXBlJSc6IFsnVWludDhDbGFtcGVkQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVWludDE2QXJyYXlQcm90b3R5cGUlJzogWydVaW50MTZBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVaW50MzJBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQzMkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVSSUVycm9yUHJvdG90eXBlJSc6IFsnVVJJRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclV2Vha01hcFByb3RvdHlwZSUnOiBbJ1dlYWtNYXAnLCAncHJvdG90eXBlJ10sXG5cdCclV2Vha1NldFByb3RvdHlwZSUnOiBbJ1dlYWtTZXQnLCAncHJvdG90eXBlJ11cbn07XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJ2hhcycpO1xudmFyICRjb25jYXQgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgQXJyYXkucHJvdG90eXBlLmNvbmNhdCk7XG52YXIgJHNwbGljZUFwcGx5ID0gYmluZC5jYWxsKEZ1bmN0aW9uLmFwcGx5LCBBcnJheS5wcm90b3R5cGUuc3BsaWNlKTtcbnZhciAkcmVwbGFjZSA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2UpO1xudmFyICRzdHJTbGljZSA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBTdHJpbmcucHJvdG90eXBlLnNsaWNlKTtcblxuLyogYWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2Jsb2IvNC4xNy4xNS9kaXN0L2xvZGFzaC5qcyNMNjczNS1MNjc0NCAqL1xudmFyIHJlUHJvcE5hbWUgPSAvW14lLltcXF1dK3xcXFsoPzooLT9cXGQrKD86XFwuXFxkKyk/KXwoW1wiJ10pKCg/Oig/IVxcMilbXlxcXFxdfFxcXFwuKSo/KVxcMilcXF18KD89KD86XFwufFxcW1xcXSkoPzpcXC58XFxbXFxdfCUkKSkvZztcbnZhciByZUVzY2FwZUNoYXIgPSAvXFxcXChcXFxcKT8vZzsgLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgc3RyaW5nVG9QYXRoID0gZnVuY3Rpb24gc3RyaW5nVG9QYXRoKHN0cmluZykge1xuXHR2YXIgZmlyc3QgPSAkc3RyU2xpY2Uoc3RyaW5nLCAwLCAxKTtcblx0dmFyIGxhc3QgPSAkc3RyU2xpY2Uoc3RyaW5nLCAtMSk7XG5cdGlmIChmaXJzdCA9PT0gJyUnICYmIGxhc3QgIT09ICclJykge1xuXHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ2ludmFsaWQgaW50cmluc2ljIHN5bnRheCwgZXhwZWN0ZWQgY2xvc2luZyBgJWAnKTtcblx0fSBlbHNlIGlmIChsYXN0ID09PSAnJScgJiYgZmlyc3QgIT09ICclJykge1xuXHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ2ludmFsaWQgaW50cmluc2ljIHN5bnRheCwgZXhwZWN0ZWQgb3BlbmluZyBgJWAnKTtcblx0fVxuXHR2YXIgcmVzdWx0ID0gW107XG5cdCRyZXBsYWNlKHN0cmluZywgcmVQcm9wTmFtZSwgZnVuY3Rpb24gKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdWJTdHJpbmcpIHtcblx0XHRyZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBxdW90ZSA/ICRyZXBsYWNlKHN1YlN0cmluZywgcmVFc2NhcGVDaGFyLCAnJDEnKSA6IG51bWJlciB8fCBtYXRjaDtcblx0fSk7XG5cdHJldHVybiByZXN1bHQ7XG59O1xuLyogZW5kIGFkYXB0YXRpb24gKi9cblxudmFyIGdldEJhc2VJbnRyaW5zaWMgPSBmdW5jdGlvbiBnZXRCYXNlSW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHR2YXIgaW50cmluc2ljTmFtZSA9IG5hbWU7XG5cdHZhciBhbGlhcztcblx0aWYgKGhhc093bihMRUdBQ1lfQUxJQVNFUywgaW50cmluc2ljTmFtZSkpIHtcblx0XHRhbGlhcyA9IExFR0FDWV9BTElBU0VTW2ludHJpbnNpY05hbWVdO1xuXHRcdGludHJpbnNpY05hbWUgPSAnJScgKyBhbGlhc1swXSArICclJztcblx0fVxuXG5cdGlmIChoYXNPd24oSU5UUklOU0lDUywgaW50cmluc2ljTmFtZSkpIHtcblx0XHR2YXIgdmFsdWUgPSBJTlRSSU5TSUNTW2ludHJpbnNpY05hbWVdO1xuXHRcdGlmICh2YWx1ZSA9PT0gbmVlZHNFdmFsKSB7XG5cdFx0XHR2YWx1ZSA9IGRvRXZhbChpbnRyaW5zaWNOYW1lKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgJiYgIWFsbG93TWlzc2luZykge1xuXHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2ludHJpbnNpYyAnICsgbmFtZSArICcgZXhpc3RzLCBidXQgaXMgbm90IGF2YWlsYWJsZS4gUGxlYXNlIGZpbGUgYW4gaXNzdWUhJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGFsaWFzOiBhbGlhcyxcblx0XHRcdG5hbWU6IGludHJpbnNpY05hbWUsXG5cdFx0XHR2YWx1ZTogdmFsdWVcblx0XHR9O1xuXHR9XG5cblx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignaW50cmluc2ljICcgKyBuYW1lICsgJyBkb2VzIG5vdCBleGlzdCEnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gR2V0SW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHRpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnIHx8IG5hbWUubGVuZ3RoID09PSAwKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2ludHJpbnNpYyBuYW1lIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nJyk7XG5cdH1cblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIHR5cGVvZiBhbGxvd01pc3NpbmcgIT09ICdib29sZWFuJykge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdcImFsbG93TWlzc2luZ1wiIGFyZ3VtZW50IG11c3QgYmUgYSBib29sZWFuJyk7XG5cdH1cblxuXHR2YXIgcGFydHMgPSBzdHJpbmdUb1BhdGgobmFtZSk7XG5cdHZhciBpbnRyaW5zaWNCYXNlTmFtZSA9IHBhcnRzLmxlbmd0aCA+IDAgPyBwYXJ0c1swXSA6ICcnO1xuXG5cdHZhciBpbnRyaW5zaWMgPSBnZXRCYXNlSW50cmluc2ljKCclJyArIGludHJpbnNpY0Jhc2VOYW1lICsgJyUnLCBhbGxvd01pc3NpbmcpO1xuXHR2YXIgaW50cmluc2ljUmVhbE5hbWUgPSBpbnRyaW5zaWMubmFtZTtcblx0dmFyIHZhbHVlID0gaW50cmluc2ljLnZhbHVlO1xuXHR2YXIgc2tpcEZ1cnRoZXJDYWNoaW5nID0gZmFsc2U7XG5cblx0dmFyIGFsaWFzID0gaW50cmluc2ljLmFsaWFzO1xuXHRpZiAoYWxpYXMpIHtcblx0XHRpbnRyaW5zaWNCYXNlTmFtZSA9IGFsaWFzWzBdO1xuXHRcdCRzcGxpY2VBcHBseShwYXJ0cywgJGNvbmNhdChbMCwgMV0sIGFsaWFzKSk7XG5cdH1cblxuXHRmb3IgKHZhciBpID0gMSwgaXNPd24gPSB0cnVlOyBpIDwgcGFydHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHR2YXIgcGFydCA9IHBhcnRzW2ldO1xuXHRcdHZhciBmaXJzdCA9ICRzdHJTbGljZShwYXJ0LCAwLCAxKTtcblx0XHR2YXIgbGFzdCA9ICRzdHJTbGljZShwYXJ0LCAtMSk7XG5cdFx0aWYgKFxuXHRcdFx0KFxuXHRcdFx0XHQoZmlyc3QgPT09ICdcIicgfHwgZmlyc3QgPT09IFwiJ1wiIHx8IGZpcnN0ID09PSAnYCcpXG5cdFx0XHRcdHx8IChsYXN0ID09PSAnXCInIHx8IGxhc3QgPT09IFwiJ1wiIHx8IGxhc3QgPT09ICdgJylcblx0XHRcdClcblx0XHRcdCYmIGZpcnN0ICE9PSBsYXN0XG5cdFx0KSB7XG5cdFx0XHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdwcm9wZXJ0eSBuYW1lcyB3aXRoIHF1b3RlcyBtdXN0IGhhdmUgbWF0Y2hpbmcgcXVvdGVzJyk7XG5cdFx0fVxuXHRcdGlmIChwYXJ0ID09PSAnY29uc3RydWN0b3InIHx8ICFpc093bikge1xuXHRcdFx0c2tpcEZ1cnRoZXJDYWNoaW5nID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpbnRyaW5zaWNCYXNlTmFtZSArPSAnLicgKyBwYXJ0O1xuXHRcdGludHJpbnNpY1JlYWxOYW1lID0gJyUnICsgaW50cmluc2ljQmFzZU5hbWUgKyAnJSc7XG5cblx0XHRpZiAoaGFzT3duKElOVFJJTlNJQ1MsIGludHJpbnNpY1JlYWxOYW1lKSkge1xuXHRcdFx0dmFsdWUgPSBJTlRSSU5TSUNTW2ludHJpbnNpY1JlYWxOYW1lXTtcblx0XHR9IGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcblx0XHRcdGlmICghKHBhcnQgaW4gdmFsdWUpKSB7XG5cdFx0XHRcdGlmICghYWxsb3dNaXNzaW5nKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2Jhc2UgaW50cmluc2ljIGZvciAnICsgbmFtZSArICcgZXhpc3RzLCBidXQgdGhlIHByb3BlcnR5IGlzIG5vdCBhdmFpbGFibGUuJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHZvaWQgdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCRnT1BEICYmIChpICsgMSkgPj0gcGFydHMubGVuZ3RoKSB7XG5cdFx0XHRcdHZhciBkZXNjID0gJGdPUEQodmFsdWUsIHBhcnQpO1xuXHRcdFx0XHRpc093biA9ICEhZGVzYztcblxuXHRcdFx0XHQvLyBCeSBjb252ZW50aW9uLCB3aGVuIGEgZGF0YSBwcm9wZXJ0eSBpcyBjb252ZXJ0ZWQgdG8gYW4gYWNjZXNzb3Jcblx0XHRcdFx0Ly8gcHJvcGVydHkgdG8gZW11bGF0ZSBhIGRhdGEgcHJvcGVydHkgdGhhdCBkb2VzIG5vdCBzdWZmZXIgZnJvbVxuXHRcdFx0XHQvLyB0aGUgb3ZlcnJpZGUgbWlzdGFrZSwgdGhhdCBhY2Nlc3NvcidzIGdldHRlciBpcyBtYXJrZWQgd2l0aFxuXHRcdFx0XHQvLyBhbiBgb3JpZ2luYWxWYWx1ZWAgcHJvcGVydHkuIEhlcmUsIHdoZW4gd2UgZGV0ZWN0IHRoaXMsIHdlXG5cdFx0XHRcdC8vIHVwaG9sZCB0aGUgaWxsdXNpb24gYnkgcHJldGVuZGluZyB0byBzZWUgdGhhdCBvcmlnaW5hbCBkYXRhXG5cdFx0XHRcdC8vIHByb3BlcnR5LCBpLmUuLCByZXR1cm5pbmcgdGhlIHZhbHVlIHJhdGhlciB0aGFuIHRoZSBnZXR0ZXJcblx0XHRcdFx0Ly8gaXRzZWxmLlxuXHRcdFx0XHRpZiAoaXNPd24gJiYgJ2dldCcgaW4gZGVzYyAmJiAhKCdvcmlnaW5hbFZhbHVlJyBpbiBkZXNjLmdldCkpIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGRlc2MuZ2V0O1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhbHVlID0gdmFsdWVbcGFydF07XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlzT3duID0gaGFzT3duKHZhbHVlLCBwYXJ0KTtcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZVtwYXJ0XTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlzT3duICYmICFza2lwRnVydGhlckNhY2hpbmcpIHtcblx0XHRcdFx0SU5UUklOU0lDU1tpbnRyaW5zaWNSZWFsTmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG9yaWdTeW1ib2wgPSB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2w7XG52YXIgaGFzU3ltYm9sU2hhbSA9IHJlcXVpcmUoJy4vc2hhbXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYXNOYXRpdmVTeW1ib2xzKCkge1xuXHRpZiAodHlwZW9mIG9yaWdTeW1ib2wgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2YgU3ltYm9sICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIG9yaWdTeW1ib2woJ2ZvbycpICE9PSAnc3ltYm9sJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBTeW1ib2woJ2JhcicpICE9PSAnc3ltYm9sJykgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRyZXR1cm4gaGFzU3ltYm9sU2hhbSgpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyogZXNsaW50IGNvbXBsZXhpdHk6IFsyLCAxOF0sIG1heC1zdGF0ZW1lbnRzOiBbMiwgMzNdICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc1N5bWJvbHMoKSB7XG5cdGlmICh0eXBlb2YgU3ltYm9sICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gJ3N5bWJvbCcpIHsgcmV0dXJuIHRydWU7IH1cblxuXHR2YXIgb2JqID0ge307XG5cdHZhciBzeW0gPSBTeW1ib2woJ3Rlc3QnKTtcblx0dmFyIHN5bU9iaiA9IE9iamVjdChzeW0pO1xuXHRpZiAodHlwZW9mIHN5bSA9PT0gJ3N0cmluZycpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzeW0pICE9PSAnW29iamVjdCBTeW1ib2xdJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzeW1PYmopICE9PSAnW29iamVjdCBTeW1ib2xdJykgeyByZXR1cm4gZmFsc2U7IH1cblxuXHQvLyB0ZW1wIGRpc2FibGVkIHBlciBodHRwczovL2dpdGh1Yi5jb20vbGpoYXJiL29iamVjdC5hc3NpZ24vaXNzdWVzLzE3XG5cdC8vIGlmIChzeW0gaW5zdGFuY2VvZiBTeW1ib2wpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdC8vIHRlbXAgZGlzYWJsZWQgcGVyIGh0dHBzOi8vZ2l0aHViLmNvbS9XZWJSZWZsZWN0aW9uL2dldC1vd24tcHJvcGVydHktc3ltYm9scy9pc3N1ZXMvNFxuXHQvLyBpZiAoIShzeW1PYmogaW5zdGFuY2VvZiBTeW1ib2wpKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdC8vIGlmICh0eXBlb2YgU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZyAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0Ly8gaWYgKFN0cmluZyhzeW0pICE9PSBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ltKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHR2YXIgc3ltVmFsID0gNDI7XG5cdG9ialtzeW1dID0gc3ltVmFsO1xuXHRmb3IgKHN5bSBpbiBvYmopIHsgcmV0dXJuIGZhbHNlOyB9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXgsIG5vLXVucmVhY2hhYmxlLWxvb3Bcblx0aWYgKHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJiBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCAhPT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzID09PSAnZnVuY3Rpb24nICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikubGVuZ3RoICE9PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdHZhciBzeW1zID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmopO1xuXHRpZiAoc3ltcy5sZW5ndGggIT09IDEgfHwgc3ltc1swXSAhPT0gc3ltKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKG9iaiwgc3ltKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBzeW0pO1xuXHRcdGlmIChkZXNjcmlwdG9yLnZhbHVlICE9PSBzeW1WYWwgfHwgZGVzY3JpcHRvci5lbnVtZXJhYmxlICE9PSB0cnVlKSB7IHJldHVybiBmYWxzZTsgfVxuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmblRvU3RyID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIHJlZmxlY3RBcHBseSA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyAmJiBSZWZsZWN0ICE9PSBudWxsICYmIFJlZmxlY3QuYXBwbHk7XG52YXIgYmFkQXJyYXlMaWtlO1xudmFyIGlzQ2FsbGFibGVNYXJrZXI7XG5pZiAodHlwZW9mIHJlZmxlY3RBcHBseSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgT2JqZWN0LmRlZmluZVByb3BlcnR5ID09PSAnZnVuY3Rpb24nKSB7XG5cdHRyeSB7XG5cdFx0YmFkQXJyYXlMaWtlID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnbGVuZ3RoJywge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRocm93IGlzQ2FsbGFibGVNYXJrZXI7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0aXNDYWxsYWJsZU1hcmtlciA9IHt9O1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby10aHJvdy1saXRlcmFsXG5cdFx0cmVmbGVjdEFwcGx5KGZ1bmN0aW9uICgpIHsgdGhyb3cgNDI7IH0sIG51bGwsIGJhZEFycmF5TGlrZSk7XG5cdH0gY2F0Y2ggKF8pIHtcblx0XHRpZiAoXyAhPT0gaXNDYWxsYWJsZU1hcmtlcikge1xuXHRcdFx0cmVmbGVjdEFwcGx5ID0gbnVsbDtcblx0XHR9XG5cdH1cbn0gZWxzZSB7XG5cdHJlZmxlY3RBcHBseSA9IG51bGw7XG59XG5cbnZhciBjb25zdHJ1Y3RvclJlZ2V4ID0gL15cXHMqY2xhc3NcXGIvO1xudmFyIGlzRVM2Q2xhc3NGbiA9IGZ1bmN0aW9uIGlzRVM2Q2xhc3NGdW5jdGlvbih2YWx1ZSkge1xuXHR0cnkge1xuXHRcdHZhciBmblN0ciA9IGZuVG9TdHIuY2FsbCh2YWx1ZSk7XG5cdFx0cmV0dXJuIGNvbnN0cnVjdG9yUmVnZXgudGVzdChmblN0cik7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gZmFsc2U7IC8vIG5vdCBhIGZ1bmN0aW9uXG5cdH1cbn07XG5cbnZhciB0cnlGdW5jdGlvbk9iamVjdCA9IGZ1bmN0aW9uIHRyeUZ1bmN0aW9uVG9TdHIodmFsdWUpIHtcblx0dHJ5IHtcblx0XHRpZiAoaXNFUzZDbGFzc0ZuKHZhbHVlKSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmblRvU3RyLmNhbGwodmFsdWUpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59O1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBmbkNsYXNzID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbnZhciBnZW5DbGFzcyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG52YXIgaGFzVG9TdHJpbmdUYWcgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnO1xuLyogZ2xvYmFscyBkb2N1bWVudDogZmFsc2UgKi9cbnZhciBkb2N1bWVudERvdEFsbCA9IHR5cGVvZiBkb2N1bWVudCA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGRvY3VtZW50LmFsbCA9PT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuYWxsICE9PSB1bmRlZmluZWQgPyBkb2N1bWVudC5hbGwgOiB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSByZWZsZWN0QXBwbHlcblx0PyBmdW5jdGlvbiBpc0NhbGxhYmxlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09PSBkb2N1bWVudERvdEFsbCkgeyByZXR1cm4gdHJ1ZTsgfVxuXHRcdGlmICghdmFsdWUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgJiYgIXZhbHVlLnByb3RvdHlwZSkgeyByZXR1cm4gdHJ1ZTsgfVxuXHRcdHRyeSB7XG5cdFx0XHRyZWZsZWN0QXBwbHkodmFsdWUsIG51bGwsIGJhZEFycmF5TGlrZSk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0aWYgKGUgIT09IGlzQ2FsbGFibGVNYXJrZXIpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0fVxuXHRcdHJldHVybiAhaXNFUzZDbGFzc0ZuKHZhbHVlKTtcblx0fVxuXHQ6IGZ1bmN0aW9uIGlzQ2FsbGFibGUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT09IGRvY3VtZW50RG90QWxsKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0aWYgKCF2YWx1ZSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRpZiAodHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiAhdmFsdWUucHJvdG90eXBlKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0aWYgKGhhc1RvU3RyaW5nVGFnKSB7IHJldHVybiB0cnlGdW5jdGlvbk9iamVjdCh2YWx1ZSk7IH1cblx0XHRpZiAoaXNFUzZDbGFzc0ZuKHZhbHVlKSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR2YXIgc3RyQ2xhc3MgPSB0b1N0ci5jYWxsKHZhbHVlKTtcblx0XHRyZXR1cm4gc3RyQ2xhc3MgPT09IGZuQ2xhc3MgfHwgc3RyQ2xhc3MgPT09IGdlbkNsYXNzO1xuXHR9O1xuIiwiLy8gICAgIChjKSAyMDEyLTIwMTggQWlyYm5iLCBJbmMuXG4vL1xuLy8gICAgIHBvbHlnbG90LmpzIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBCU0Rcbi8vICAgICBsaWNlbnNlLiBGb3IgYWxsIGxpY2Vuc2luZyBpbmZvcm1hdGlvbiwgZGV0YWlscywgYW5kIGRvY3VtZW50aW9uOlxuLy8gICAgIGh0dHA6Ly9haXJibmIuZ2l0aHViLmNvbS9wb2x5Z2xvdC5qc1xuLy9cbi8vXG4vLyBQb2x5Z2xvdC5qcyBpcyBhbiBJMThuIGhlbHBlciBsaWJyYXJ5IHdyaXR0ZW4gaW4gSmF2YVNjcmlwdCwgbWFkZSB0b1xuLy8gd29yayBib3RoIGluIHRoZSBicm93c2VyIGFuZCBpbiBOb2RlLiBJdCBwcm92aWRlcyBhIHNpbXBsZSBzb2x1dGlvbiBmb3Jcbi8vIGludGVycG9sYXRpb24gYW5kIHBsdXJhbGl6YXRpb24sIGJhc2VkIG9mZiBvZiBBaXJibmInc1xuLy8gZXhwZXJpZW5jZSBhZGRpbmcgSTE4biBmdW5jdGlvbmFsaXR5IHRvIGl0cyBCYWNrYm9uZS5qcyBhbmQgTm9kZSBhcHBzLlxuLy9cbi8vIFBvbHlsZ2xvdCBpcyBhZ25vc3RpYyB0byB5b3VyIHRyYW5zbGF0aW9uIGJhY2tlbmQuIEl0IGRvZXNuJ3QgcGVyZm9ybSBhbnlcbi8vIHRyYW5zbGF0aW9uOyBpdCBzaW1wbHkgZ2l2ZXMgeW91IGEgd2F5IHRvIG1hbmFnZSB0cmFuc2xhdGVkIHBocmFzZXMgZnJvbVxuLy8geW91ciBjbGllbnQtIG9yIHNlcnZlci1zaWRlIEphdmFTY3JpcHQgYXBwbGljYXRpb24uXG4vL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnZm9yLWVhY2gnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xudmFyIGhhcyA9IHJlcXVpcmUoJ2hhcycpO1xudmFyIHRyaW0gPSByZXF1aXJlKCdzdHJpbmcucHJvdG90eXBlLnRyaW0nKTtcblxudmFyIHdhcm4gPSBmdW5jdGlvbiB3YXJuKG1lc3NhZ2UpIHtcbiAgd2FybmluZyhmYWxzZSwgbWVzc2FnZSk7XG59O1xuXG52YXIgcmVwbGFjZSA9IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZTtcbnZhciBzcGxpdCA9IFN0cmluZy5wcm90b3R5cGUuc3BsaXQ7XG5cbi8vICMjIyMgUGx1cmFsaXphdGlvbiBtZXRob2RzXG4vLyBUaGUgc3RyaW5nIHRoYXQgc2VwYXJhdGVzIHRoZSBkaWZmZXJlbnQgcGhyYXNlIHBvc3NpYmlsaXRpZXMuXG52YXIgZGVsaW1pdGVyID0gJ3x8fHwnO1xuXG52YXIgcnVzc2lhblBsdXJhbEdyb3VwcyA9IGZ1bmN0aW9uIChuKSB7XG4gIHZhciBsYXN0VHdvID0gbiAlIDEwMDtcbiAgdmFyIGVuZCA9IGxhc3RUd28gJSAxMDtcbiAgaWYgKGxhc3RUd28gIT09IDExICYmIGVuZCA9PT0gMSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGlmICgyIDw9IGVuZCAmJiBlbmQgPD0gNCAmJiAhKGxhc3RUd28gPj0gMTIgJiYgbGFzdFR3byA8PSAxNCkpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuICByZXR1cm4gMjtcbn07XG5cbnZhciBkZWZhdWx0UGx1cmFsUnVsZXMgPSB7XG4gIC8vIE1hcHBpbmcgZnJvbSBwbHVyYWxpemF0aW9uIGdyb3VwIHBsdXJhbCBsb2dpYy5cbiAgcGx1cmFsVHlwZXM6IHtcbiAgICBhcmFiaWM6IGZ1bmN0aW9uIChuKSB7XG4gICAgICAvLyBodHRwOi8vd3d3LmFyYWJleWVzLm9yZy9QbHVyYWxfRm9ybXNcbiAgICAgIGlmIChuIDwgMykgeyByZXR1cm4gbjsgfVxuICAgICAgdmFyIGxhc3RUd28gPSBuICUgMTAwO1xuICAgICAgaWYgKGxhc3RUd28gPj0gMyAmJiBsYXN0VHdvIDw9IDEwKSByZXR1cm4gMztcbiAgICAgIHJldHVybiBsYXN0VHdvID49IDExID8gNCA6IDU7XG4gICAgfSxcbiAgICBib3NuaWFuX3NlcmJpYW46IHJ1c3NpYW5QbHVyYWxHcm91cHMsXG4gICAgY2hpbmVzZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gMDsgfSxcbiAgICBjcm9hdGlhbjogcnVzc2lhblBsdXJhbEdyb3VwcyxcbiAgICBmcmVuY2g6IGZ1bmN0aW9uIChuKSB7IHJldHVybiBuID4gMSA/IDEgOiAwOyB9LFxuICAgIGdlcm1hbjogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4gIT09IDEgPyAxIDogMDsgfSxcbiAgICBydXNzaWFuOiBydXNzaWFuUGx1cmFsR3JvdXBzLFxuICAgIGxpdGh1YW5pYW46IGZ1bmN0aW9uIChuKSB7XG4gICAgICBpZiAobiAlIDEwID09PSAxICYmIG4gJSAxMDAgIT09IDExKSB7IHJldHVybiAwOyB9XG4gICAgICByZXR1cm4gbiAlIDEwID49IDIgJiYgbiAlIDEwIDw9IDkgJiYgKG4gJSAxMDAgPCAxMSB8fCBuICUgMTAwID4gMTkpID8gMSA6IDI7XG4gICAgfSxcbiAgICBjemVjaDogZnVuY3Rpb24gKG4pIHtcbiAgICAgIGlmIChuID09PSAxKSB7IHJldHVybiAwOyB9XG4gICAgICByZXR1cm4gKG4gPj0gMiAmJiBuIDw9IDQpID8gMSA6IDI7XG4gICAgfSxcbiAgICBwb2xpc2g6IGZ1bmN0aW9uIChuKSB7XG4gICAgICBpZiAobiA9PT0gMSkgeyByZXR1cm4gMDsgfVxuICAgICAgdmFyIGVuZCA9IG4gJSAxMDtcbiAgICAgIHJldHVybiAyIDw9IGVuZCAmJiBlbmQgPD0gNCAmJiAobiAlIDEwMCA8IDEwIHx8IG4gJSAxMDAgPj0gMjApID8gMSA6IDI7XG4gICAgfSxcbiAgICBpY2VsYW5kaWM6IGZ1bmN0aW9uIChuKSB7IHJldHVybiAobiAlIDEwICE9PSAxIHx8IG4gJSAxMDAgPT09IDExKSA/IDEgOiAwOyB9LFxuICAgIHNsb3ZlbmlhbjogZnVuY3Rpb24gKG4pIHtcbiAgICAgIHZhciBsYXN0VHdvID0gbiAlIDEwMDtcbiAgICAgIGlmIChsYXN0VHdvID09PSAxKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgaWYgKGxhc3RUd28gPT09IDIpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICBpZiAobGFzdFR3byA9PT0gMyB8fCBsYXN0VHdvID09PSA0KSB7XG4gICAgICAgIHJldHVybiAyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDM7XG4gICAgfVxuICB9LFxuXG4gIC8vIE1hcHBpbmcgZnJvbSBwbHVyYWxpemF0aW9uIGdyb3VwIHRvIGluZGl2aWR1YWwgbGFuZ3VhZ2UgY29kZXMvbG9jYWxlcy5cbiAgLy8gV2lsbCBsb29rIHVwIGJhc2VkIG9uIGV4YWN0IG1hdGNoLCBpZiBub3QgZm91bmQgYW5kIGl0J3MgYSBsb2NhbGUgd2lsbCBwYXJzZSB0aGUgbG9jYWxlXG4gIC8vIGZvciBsYW5ndWFnZSBjb2RlLCBhbmQgaWYgdGhhdCBkb2VzIG5vdCBleGlzdCB3aWxsIGRlZmF1bHQgdG8gJ2VuJ1xuICBwbHVyYWxUeXBlVG9MYW5ndWFnZXM6IHtcbiAgICBhcmFiaWM6IFsnYXInXSxcbiAgICBib3NuaWFuX3NlcmJpYW46IFsnYnMtTGF0bi1CQScsICdicy1DeXJsLUJBJywgJ3NybC1SUycsICdzci1SUyddLFxuICAgIGNoaW5lc2U6IFsnaWQnLCAnaWQtSUQnLCAnamEnLCAna28nLCAna28tS1InLCAnbG8nLCAnbXMnLCAndGgnLCAndGgtVEgnLCAnemgnXSxcbiAgICBjcm9hdGlhbjogWydocicsICdoci1IUiddLFxuICAgIGdlcm1hbjogWydmYScsICdkYScsICdkZScsICdlbicsICdlcycsICdmaScsICdlbCcsICdoZScsICdoaS1JTicsICdodScsICdodS1IVScsICdpdCcsICdubCcsICdubycsICdwdCcsICdzdicsICd0ciddLFxuICAgIGZyZW5jaDogWydmcicsICd0bCcsICdwdC1iciddLFxuICAgIHJ1c3NpYW46IFsncnUnLCAncnUtUlUnXSxcbiAgICBsaXRodWFuaWFuOiBbJ2x0J10sXG4gICAgY3plY2g6IFsnY3MnLCAnY3MtQ1onLCAnc2snXSxcbiAgICBwb2xpc2g6IFsncGwnXSxcbiAgICBpY2VsYW5kaWM6IFsnaXMnXSxcbiAgICBzbG92ZW5pYW46IFsnc2wtU0wnXVxuICB9XG59O1xuXG5mdW5jdGlvbiBsYW5nVG9UeXBlTWFwKG1hcHBpbmcpIHtcbiAgdmFyIHJldCA9IHt9O1xuICBmb3JFYWNoKG1hcHBpbmcsIGZ1bmN0aW9uIChsYW5ncywgdHlwZSkge1xuICAgIGZvckVhY2gobGFuZ3MsIGZ1bmN0aW9uIChsYW5nKSB7XG4gICAgICByZXRbbGFuZ10gPSB0eXBlO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gcGx1cmFsVHlwZU5hbWUocGx1cmFsUnVsZXMsIGxvY2FsZSkge1xuICB2YXIgbGFuZ1RvUGx1cmFsVHlwZSA9IGxhbmdUb1R5cGVNYXAocGx1cmFsUnVsZXMucGx1cmFsVHlwZVRvTGFuZ3VhZ2VzKTtcbiAgcmV0dXJuIGxhbmdUb1BsdXJhbFR5cGVbbG9jYWxlXVxuICAgIHx8IGxhbmdUb1BsdXJhbFR5cGVbc3BsaXQuY2FsbChsb2NhbGUsIC8tLywgMSlbMF1dXG4gICAgfHwgbGFuZ1RvUGx1cmFsVHlwZS5lbjtcbn1cblxuZnVuY3Rpb24gcGx1cmFsVHlwZUluZGV4KHBsdXJhbFJ1bGVzLCBsb2NhbGUsIGNvdW50KSB7XG4gIHJldHVybiBwbHVyYWxSdWxlcy5wbHVyYWxUeXBlc1twbHVyYWxUeXBlTmFtZShwbHVyYWxSdWxlcywgbG9jYWxlKV0oY291bnQpO1xufVxuXG5mdW5jdGlvbiBlc2NhcGUodG9rZW4pIHtcbiAgcmV0dXJuIHRva2VuLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCAnXFxcXCQmJyk7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFRva2VuUmVnZXgob3B0cykge1xuICB2YXIgcHJlZml4ID0gKG9wdHMgJiYgb3B0cy5wcmVmaXgpIHx8ICcleyc7XG4gIHZhciBzdWZmaXggPSAob3B0cyAmJiBvcHRzLnN1ZmZpeCkgfHwgJ30nO1xuXG4gIGlmIChwcmVmaXggPT09IGRlbGltaXRlciB8fCBzdWZmaXggPT09IGRlbGltaXRlcikge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcIicgKyBkZWxpbWl0ZXIgKyAnXCIgdG9rZW4gaXMgcmVzZXJ2ZWQgZm9yIHBsdXJhbGl6YXRpb24nKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUmVnRXhwKGVzY2FwZShwcmVmaXgpICsgJyguKj8pJyArIGVzY2FwZShzdWZmaXgpLCAnZycpO1xufVxuXG52YXIgZGVmYXVsdFRva2VuUmVnZXggPSAvJVxceyguKj8pXFx9L2c7XG5cbi8vICMjIyB0cmFuc2Zvcm1QaHJhc2UocGhyYXNlLCBzdWJzdGl0dXRpb25zLCBsb2NhbGUpXG4vL1xuLy8gVGFrZXMgYSBwaHJhc2Ugc3RyaW5nIGFuZCB0cmFuc2Zvcm1zIGl0IGJ5IGNob29zaW5nIHRoZSBjb3JyZWN0XG4vLyBwbHVyYWwgZm9ybSBhbmQgaW50ZXJwb2xhdGluZyBpdC5cbi8vXG4vLyAgICAgdHJhbnNmb3JtUGhyYXNlKCdIZWxsbywgJXtuYW1lfSEnLCB7bmFtZTogJ1NwaWtlJ30pO1xuLy8gICAgIC8vIFwiSGVsbG8sIFNwaWtlIVwiXG4vL1xuLy8gVGhlIGNvcnJlY3QgcGx1cmFsIGZvcm0gaXMgc2VsZWN0ZWQgaWYgc3Vic3RpdHV0aW9ucy5zbWFydF9jb3VudFxuLy8gaXMgc2V0LiBZb3UgY2FuIHBhc3MgaW4gYSBudW1iZXIgaW5zdGVhZCBvZiBhbiBPYmplY3QgYXMgYHN1YnN0aXR1dGlvbnNgXG4vLyBhcyBhIHNob3J0Y3V0IGZvciBgc21hcnRfY291bnRgLlxuLy9cbi8vICAgICB0cmFuc2Zvcm1QaHJhc2UoJyV7c21hcnRfY291bnR9IG5ldyBtZXNzYWdlcyB8fHx8IDEgbmV3IG1lc3NhZ2UnLCB7c21hcnRfY291bnQ6IDF9LCAnZW4nKTtcbi8vICAgICAvLyBcIjEgbmV3IG1lc3NhZ2VcIlxuLy9cbi8vICAgICB0cmFuc2Zvcm1QaHJhc2UoJyV7c21hcnRfY291bnR9IG5ldyBtZXNzYWdlcyB8fHx8IDEgbmV3IG1lc3NhZ2UnLCB7c21hcnRfY291bnQ6IDJ9LCAnZW4nKTtcbi8vICAgICAvLyBcIjIgbmV3IG1lc3NhZ2VzXCJcbi8vXG4vLyAgICAgdHJhbnNmb3JtUGhyYXNlKCcle3NtYXJ0X2NvdW50fSBuZXcgbWVzc2FnZXMgfHx8fCAxIG5ldyBtZXNzYWdlJywgNSwgJ2VuJyk7XG4vLyAgICAgLy8gXCI1IG5ldyBtZXNzYWdlc1wiXG4vL1xuLy8gWW91IHNob3VsZCBwYXNzIGluIGEgdGhpcmQgYXJndW1lbnQsIHRoZSBsb2NhbGUsIHRvIHNwZWNpZnkgdGhlIGNvcnJlY3QgcGx1cmFsIHR5cGUuXG4vLyBJdCBkZWZhdWx0cyB0byBgJ2VuJ2Agd2l0aCAyIHBsdXJhbCBmb3Jtcy5cbmZ1bmN0aW9uIHRyYW5zZm9ybVBocmFzZShwaHJhc2UsIHN1YnN0aXR1dGlvbnMsIGxvY2FsZSwgdG9rZW5SZWdleCwgcGx1cmFsUnVsZXMpIHtcbiAgaWYgKHR5cGVvZiBwaHJhc2UgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUG9seWdsb3QudHJhbnNmb3JtUGhyYXNlIGV4cGVjdHMgYXJndW1lbnQgIzEgdG8gYmUgc3RyaW5nJyk7XG4gIH1cblxuICBpZiAoc3Vic3RpdHV0aW9ucyA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHBocmFzZTtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBwaHJhc2U7XG4gIHZhciBpbnRlcnBvbGF0aW9uUmVnZXggPSB0b2tlblJlZ2V4IHx8IGRlZmF1bHRUb2tlblJlZ2V4O1xuICB2YXIgcGx1cmFsUnVsZXNPckRlZmF1bHQgPSBwbHVyYWxSdWxlcyB8fCBkZWZhdWx0UGx1cmFsUnVsZXM7XG5cbiAgLy8gYWxsb3cgbnVtYmVyIGFzIGEgcGx1cmFsaXphdGlvbiBzaG9ydGN1dFxuICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBzdWJzdGl0dXRpb25zID09PSAnbnVtYmVyJyA/IHsgc21hcnRfY291bnQ6IHN1YnN0aXR1dGlvbnMgfSA6IHN1YnN0aXR1dGlvbnM7XG5cbiAgLy8gU2VsZWN0IHBsdXJhbCBmb3JtOiBiYXNlZCBvbiBhIHBocmFzZSB0ZXh0IHRoYXQgY29udGFpbnMgYG5gXG4gIC8vIHBsdXJhbCBmb3JtcyBzZXBhcmF0ZWQgYnkgYGRlbGltaXRlcmAsIGEgYGxvY2FsZWAsIGFuZCBhIGBzdWJzdGl0dXRpb25zLnNtYXJ0X2NvdW50YCxcbiAgLy8gY2hvb3NlIHRoZSBjb3JyZWN0IHBsdXJhbCBmb3JtLiBUaGlzIGlzIG9ubHkgZG9uZSBpZiBgY291bnRgIGlzIHNldC5cbiAgaWYgKG9wdGlvbnMuc21hcnRfY291bnQgIT0gbnVsbCAmJiByZXN1bHQpIHtcbiAgICB2YXIgdGV4dHMgPSBzcGxpdC5jYWxsKHJlc3VsdCwgZGVsaW1pdGVyKTtcbiAgICByZXN1bHQgPSB0cmltKHRleHRzW3BsdXJhbFR5cGVJbmRleChwbHVyYWxSdWxlc09yRGVmYXVsdCwgbG9jYWxlIHx8ICdlbicsIG9wdGlvbnMuc21hcnRfY291bnQpXSB8fCB0ZXh0c1swXSk7XG4gIH1cblxuICAvLyBJbnRlcnBvbGF0ZTogQ3JlYXRlcyBhIGBSZWdFeHBgIG9iamVjdCBmb3IgZWFjaCBpbnRlcnBvbGF0aW9uIHBsYWNlaG9sZGVyLlxuICByZXN1bHQgPSByZXBsYWNlLmNhbGwocmVzdWx0LCBpbnRlcnBvbGF0aW9uUmVnZXgsIGZ1bmN0aW9uIChleHByZXNzaW9uLCBhcmd1bWVudCkge1xuICAgIGlmICghaGFzKG9wdGlvbnMsIGFyZ3VtZW50KSB8fCBvcHRpb25zW2FyZ3VtZW50XSA9PSBudWxsKSB7IHJldHVybiBleHByZXNzaW9uOyB9XG4gICAgcmV0dXJuIG9wdGlvbnNbYXJndW1lbnRdO1xuICB9KTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyAjIyMgUG9seWdsb3QgY2xhc3MgY29uc3RydWN0b3JcbmZ1bmN0aW9uIFBvbHlnbG90KG9wdGlvbnMpIHtcbiAgdmFyIG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuICB0aGlzLnBocmFzZXMgPSB7fTtcbiAgdGhpcy5leHRlbmQob3B0cy5waHJhc2VzIHx8IHt9KTtcbiAgdGhpcy5jdXJyZW50TG9jYWxlID0gb3B0cy5sb2NhbGUgfHwgJ2VuJztcbiAgdmFyIGFsbG93TWlzc2luZyA9IG9wdHMuYWxsb3dNaXNzaW5nID8gdHJhbnNmb3JtUGhyYXNlIDogbnVsbDtcbiAgdGhpcy5vbk1pc3NpbmdLZXkgPSB0eXBlb2Ygb3B0cy5vbk1pc3NpbmdLZXkgPT09ICdmdW5jdGlvbicgPyBvcHRzLm9uTWlzc2luZ0tleSA6IGFsbG93TWlzc2luZztcbiAgdGhpcy53YXJuID0gb3B0cy53YXJuIHx8IHdhcm47XG4gIHRoaXMudG9rZW5SZWdleCA9IGNvbnN0cnVjdFRva2VuUmVnZXgob3B0cy5pbnRlcnBvbGF0aW9uKTtcbiAgdGhpcy5wbHVyYWxSdWxlcyA9IG9wdHMucGx1cmFsUnVsZXMgfHwgZGVmYXVsdFBsdXJhbFJ1bGVzO1xufVxuXG4vLyAjIyMgcG9seWdsb3QubG9jYWxlKFtsb2NhbGVdKVxuLy9cbi8vIEdldCBvciBzZXQgbG9jYWxlLiBJbnRlcm5hbGx5LCBQb2x5Z2xvdCBvbmx5IHVzZXMgbG9jYWxlIGZvciBwbHVyYWxpemF0aW9uLlxuUG9seWdsb3QucHJvdG90eXBlLmxvY2FsZSA9IGZ1bmN0aW9uIChuZXdMb2NhbGUpIHtcbiAgaWYgKG5ld0xvY2FsZSkgdGhpcy5jdXJyZW50TG9jYWxlID0gbmV3TG9jYWxlO1xuICByZXR1cm4gdGhpcy5jdXJyZW50TG9jYWxlO1xufTtcblxuLy8gIyMjIHBvbHlnbG90LmV4dGVuZChwaHJhc2VzKVxuLy9cbi8vIFVzZSBgZXh0ZW5kYCB0byB0ZWxsIFBvbHlnbG90IGhvdyB0byB0cmFuc2xhdGUgYSBnaXZlbiBrZXkuXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbi8vICAgICB9KTtcbi8vXG4vLyBUaGUga2V5IGNhbiBiZSBhbnkgc3RyaW5nLiAgRmVlbCBmcmVlIHRvIGNhbGwgYGV4dGVuZGAgbXVsdGlwbGUgdGltZXM7XG4vLyBpdCB3aWxsIG92ZXJyaWRlIGFueSBwaHJhc2VzIHdpdGggdGhlIHNhbWUga2V5LCBidXQgbGVhdmUgZXhpc3RpbmcgcGhyYXNlc1xuLy8gdW50b3VjaGVkLlxuLy9cbi8vIEl0IGlzIGFsc28gcG9zc2libGUgdG8gcGFzcyBuZXN0ZWQgcGhyYXNlIG9iamVjdHMsIHdoaWNoIGdldCBmbGF0dGVuZWRcbi8vIGludG8gYW4gb2JqZWN0IHdpdGggdGhlIG5lc3RlZCBrZXlzIGNvbmNhdGVuYXRlZCB1c2luZyBkb3Qgbm90YXRpb24uXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcIm5hdlwiOiB7XG4vLyAgICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiLFxuLy8gICAgICAgICBcInNpZGViYXJcIjoge1xuLy8gICAgICAgICAgIFwid2VsY29tZVwiOiBcIldlbGNvbWVcIlxuLy8gICAgICAgICB9XG4vLyAgICAgICB9XG4vLyAgICAgfSk7XG4vL1xuLy8gICAgIGNvbnNvbGUubG9nKHBvbHlnbG90LnBocmFzZXMpO1xuLy8gICAgIC8vIHtcbi8vICAgICAvLyAgICduYXYuaGVsbG8nOiAnSGVsbG8nLFxuLy8gICAgIC8vICAgJ25hdi5oZWxsb19uYW1lJzogJ0hlbGxvLCAle25hbWV9Jyxcbi8vICAgICAvLyAgICduYXYuc2lkZWJhci53ZWxjb21lJzogJ1dlbGNvbWUnXG4vLyAgICAgLy8gfVxuLy9cbi8vIGBleHRlbmRgIGFjY2VwdHMgYW4gb3B0aW9uYWwgc2Vjb25kIGFyZ3VtZW50LCBgcHJlZml4YCwgd2hpY2ggY2FuIGJlIHVzZWRcbi8vIHRvIHByZWZpeCBldmVyeSBrZXkgaW4gdGhlIHBocmFzZXMgb2JqZWN0IHdpdGggc29tZSBzdHJpbmcsIHVzaW5nIGRvdFxuLy8gbm90YXRpb24uXG4vL1xuLy8gICAgIHBvbHlnbG90LmV4dGVuZCh7XG4vLyAgICAgICBcImhlbGxvXCI6IFwiSGVsbG9cIixcbi8vICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCJcbi8vICAgICB9LCBcIm5hdlwiKTtcbi8vXG4vLyAgICAgY29uc29sZS5sb2cocG9seWdsb3QucGhyYXNlcyk7XG4vLyAgICAgLy8ge1xuLy8gICAgIC8vICAgJ25hdi5oZWxsbyc6ICdIZWxsbycsXG4vLyAgICAgLy8gICAnbmF2LmhlbGxvX25hbWUnOiAnSGVsbG8sICV7bmFtZX0nXG4vLyAgICAgLy8gfVxuLy9cbi8vIFRoaXMgZmVhdHVyZSBpcyB1c2VkIGludGVybmFsbHkgdG8gc3VwcG9ydCBuZXN0ZWQgcGhyYXNlIG9iamVjdHMuXG5Qb2x5Z2xvdC5wcm90b3R5cGUuZXh0ZW5kID0gZnVuY3Rpb24gKG1vcmVQaHJhc2VzLCBwcmVmaXgpIHtcbiAgZm9yRWFjaChtb3JlUGhyYXNlcywgZnVuY3Rpb24gKHBocmFzZSwga2V5KSB7XG4gICAgdmFyIHByZWZpeGVkS2V5ID0gcHJlZml4ID8gcHJlZml4ICsgJy4nICsga2V5IDoga2V5O1xuICAgIGlmICh0eXBlb2YgcGhyYXNlID09PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5leHRlbmQocGhyYXNlLCBwcmVmaXhlZEtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGhyYXNlc1twcmVmaXhlZEtleV0gPSBwaHJhc2U7XG4gICAgfVxuICB9LCB0aGlzKTtcbn07XG5cbi8vICMjIyBwb2x5Z2xvdC51bnNldChwaHJhc2VzKVxuLy8gVXNlIGB1bnNldGAgdG8gc2VsZWN0aXZlbHkgcmVtb3ZlIGtleXMgZnJvbSBhIHBvbHlnbG90IGluc3RhbmNlLlxuLy9cbi8vICAgICBwb2x5Z2xvdC51bnNldChcInNvbWVfa2V5XCIpO1xuLy8gICAgIHBvbHlnbG90LnVuc2V0KHtcbi8vICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgXCJoZWxsb19uYW1lXCI6IFwiSGVsbG8sICV7bmFtZX1cIlxuLy8gICAgIH0pO1xuLy9cbi8vIFRoZSB1bnNldCBtZXRob2QgY2FuIHRha2UgZWl0aGVyIGEgc3RyaW5nIChmb3IgdGhlIGtleSksIG9yIGFuIG9iamVjdCBoYXNoIHdpdGhcbi8vIHRoZSBrZXlzIHRoYXQgeW91IHdvdWxkIGxpa2UgdG8gdW5zZXQuXG5Qb2x5Z2xvdC5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbiAobW9yZVBocmFzZXMsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIG1vcmVQaHJhc2VzID09PSAnc3RyaW5nJykge1xuICAgIGRlbGV0ZSB0aGlzLnBocmFzZXNbbW9yZVBocmFzZXNdO1xuICB9IGVsc2Uge1xuICAgIGZvckVhY2gobW9yZVBocmFzZXMsIGZ1bmN0aW9uIChwaHJhc2UsIGtleSkge1xuICAgICAgdmFyIHByZWZpeGVkS2V5ID0gcHJlZml4ID8gcHJlZml4ICsgJy4nICsga2V5IDoga2V5O1xuICAgICAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRoaXMudW5zZXQocGhyYXNlLCBwcmVmaXhlZEtleSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgdGhpcy5waHJhc2VzW3ByZWZpeGVkS2V5XTtcbiAgICAgIH1cbiAgICB9LCB0aGlzKTtcbiAgfVxufTtcblxuLy8gIyMjIHBvbHlnbG90LmNsZWFyKClcbi8vXG4vLyBDbGVhcnMgYWxsIHBocmFzZXMuIFVzZWZ1bCBmb3Igc3BlY2lhbCBjYXNlcywgc3VjaCBhcyBmcmVlaW5nXG4vLyB1cCBtZW1vcnkgaWYgeW91IGhhdmUgbG90cyBvZiBwaHJhc2VzIGJ1dCBubyBsb25nZXIgbmVlZCB0b1xuLy8gcGVyZm9ybSBhbnkgdHJhbnNsYXRpb24uIEFsc28gdXNlZCBpbnRlcm5hbGx5IGJ5IGByZXBsYWNlYC5cblBvbHlnbG90LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5waHJhc2VzID0ge307XG59O1xuXG4vLyAjIyMgcG9seWdsb3QucmVwbGFjZShwaHJhc2VzKVxuLy9cbi8vIENvbXBsZXRlbHkgcmVwbGFjZSB0aGUgZXhpc3RpbmcgcGhyYXNlcyB3aXRoIGEgbmV3IHNldCBvZiBwaHJhc2VzLlxuLy8gTm9ybWFsbHksIGp1c3QgdXNlIGBleHRlbmRgIHRvIGFkZCBtb3JlIHBocmFzZXMsIGJ1dCB1bmRlciBjZXJ0YWluXG4vLyBjaXJjdW1zdGFuY2VzLCB5b3UgbWF5IHdhbnQgdG8gbWFrZSBzdXJlIG5vIG9sZCBwaHJhc2VzIGFyZSBseWluZyBhcm91bmQuXG5Qb2x5Z2xvdC5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIChuZXdQaHJhc2VzKSB7XG4gIHRoaXMuY2xlYXIoKTtcbiAgdGhpcy5leHRlbmQobmV3UGhyYXNlcyk7XG59O1xuXG5cbi8vICMjIyBwb2x5Z2xvdC50KGtleSwgb3B0aW9ucylcbi8vXG4vLyBUaGUgbW9zdC11c2VkIG1ldGhvZC4gUHJvdmlkZSBhIGtleSwgYW5kIGB0YCB3aWxsIHJldHVybiB0aGVcbi8vIHBocmFzZS5cbi8vXG4vLyAgICAgcG9seWdsb3QudChcImhlbGxvXCIpO1xuLy8gICAgID0+IFwiSGVsbG9cIlxuLy9cbi8vIFRoZSBwaHJhc2UgdmFsdWUgaXMgcHJvdmlkZWQgZmlyc3QgYnkgYSBjYWxsIHRvIGBwb2x5Z2xvdC5leHRlbmQoKWAgb3Jcbi8vIGBwb2x5Z2xvdC5yZXBsYWNlKClgLlxuLy9cbi8vIFBhc3MgaW4gYW4gb2JqZWN0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gcGVyZm9ybSBpbnRlcnBvbGF0aW9uLlxuLy9cbi8vICAgICBwb2x5Z2xvdC50KFwiaGVsbG9fbmFtZVwiLCB7bmFtZTogXCJTcGlrZVwifSk7XG4vLyAgICAgPT4gXCJIZWxsbywgU3Bpa2VcIlxuLy9cbi8vIElmIHlvdSBsaWtlLCB5b3UgY2FuIHByb3ZpZGUgYSBkZWZhdWx0IHZhbHVlIGluIGNhc2UgdGhlIHBocmFzZSBpcyBtaXNzaW5nLlxuLy8gVXNlIHRoZSBzcGVjaWFsIG9wdGlvbiBrZXkgXCJfXCIgdG8gc3BlY2lmeSBhIGRlZmF1bHQuXG4vL1xuLy8gICAgIHBvbHlnbG90LnQoXCJpX2xpa2VfdG9fd3JpdGVfaW5fbGFuZ3VhZ2VcIiwge1xuLy8gICAgICAgXzogXCJJIGxpa2UgdG8gd3JpdGUgaW4gJXtsYW5ndWFnZX0uXCIsXG4vLyAgICAgICBsYW5ndWFnZTogXCJKYXZhU2NyaXB0XCJcbi8vICAgICB9KTtcbi8vICAgICA9PiBcIkkgbGlrZSB0byB3cml0ZSBpbiBKYXZhU2NyaXB0LlwiXG4vL1xuUG9seWdsb3QucHJvdG90eXBlLnQgPSBmdW5jdGlvbiAoa2V5LCBvcHRpb25zKSB7XG4gIHZhciBwaHJhc2UsIHJlc3VsdDtcbiAgdmFyIG9wdHMgPSBvcHRpb25zID09IG51bGwgPyB7fSA6IG9wdGlvbnM7XG4gIGlmICh0eXBlb2YgdGhpcy5waHJhc2VzW2tleV0gPT09ICdzdHJpbmcnKSB7XG4gICAgcGhyYXNlID0gdGhpcy5waHJhc2VzW2tleV07XG4gIH0gZWxzZSBpZiAodHlwZW9mIG9wdHMuXyA9PT0gJ3N0cmluZycpIHtcbiAgICBwaHJhc2UgPSBvcHRzLl87XG4gIH0gZWxzZSBpZiAodGhpcy5vbk1pc3NpbmdLZXkpIHtcbiAgICB2YXIgb25NaXNzaW5nS2V5ID0gdGhpcy5vbk1pc3NpbmdLZXk7XG4gICAgcmVzdWx0ID0gb25NaXNzaW5nS2V5KGtleSwgb3B0cywgdGhpcy5jdXJyZW50TG9jYWxlLCB0aGlzLnRva2VuUmVnZXgsIHRoaXMucGx1cmFsUnVsZXMpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMud2FybignTWlzc2luZyB0cmFuc2xhdGlvbiBmb3Iga2V5OiBcIicgKyBrZXkgKyAnXCInKTtcbiAgICByZXN1bHQgPSBrZXk7XG4gIH1cbiAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdzdHJpbmcnKSB7XG4gICAgcmVzdWx0ID0gdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgb3B0cywgdGhpcy5jdXJyZW50TG9jYWxlLCB0aGlzLnRva2VuUmVnZXgsIHRoaXMucGx1cmFsUnVsZXMpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vICMjIyBwb2x5Z2xvdC5oYXMoa2V5KVxuLy9cbi8vIENoZWNrIGlmIHBvbHlnbG90IGhhcyBhIHRyYW5zbGF0aW9uIGZvciBnaXZlbiBrZXlcblBvbHlnbG90LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBoYXModGhpcy5waHJhc2VzLCBrZXkpO1xufTtcblxuLy8gZXhwb3J0IHRyYW5zZm9ybVBocmFzZVxuUG9seWdsb3QudHJhbnNmb3JtUGhyYXNlID0gZnVuY3Rpb24gdHJhbnNmb3JtKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlKSB7XG4gIHJldHVybiB0cmFuc2Zvcm1QaHJhc2UocGhyYXNlLCBzdWJzdGl0dXRpb25zLCBsb2NhbGUpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQb2x5Z2xvdDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXNTaGltO1xuaWYgKCFPYmplY3Qua2V5cykge1xuXHQvLyBtb2RpZmllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbVxuXHR2YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblx0dmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblx0dmFyIGlzQXJncyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBnbG9iYWwtcmVxdWlyZVxuXHR2YXIgaXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblx0dmFyIGhhc0RvbnRFbnVtQnVnID0gIWlzRW51bWVyYWJsZS5jYWxsKHsgdG9TdHJpbmc6IG51bGwgfSwgJ3RvU3RyaW5nJyk7XG5cdHZhciBoYXNQcm90b0VudW1CdWcgPSBpc0VudW1lcmFibGUuY2FsbChmdW5jdGlvbiAoKSB7fSwgJ3Byb3RvdHlwZScpO1xuXHR2YXIgZG9udEVudW1zID0gW1xuXHRcdCd0b1N0cmluZycsXG5cdFx0J3RvTG9jYWxlU3RyaW5nJyxcblx0XHQndmFsdWVPZicsXG5cdFx0J2hhc093blByb3BlcnR5Jyxcblx0XHQnaXNQcm90b3R5cGVPZicsXG5cdFx0J3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcblx0XHQnY29uc3RydWN0b3InXG5cdF07XG5cdHZhciBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZSA9IGZ1bmN0aW9uIChvKSB7XG5cdFx0dmFyIGN0b3IgPSBvLmNvbnN0cnVjdG9yO1xuXHRcdHJldHVybiBjdG9yICYmIGN0b3IucHJvdG90eXBlID09PSBvO1xuXHR9O1xuXHR2YXIgZXhjbHVkZWRLZXlzID0ge1xuXHRcdCRhcHBsaWNhdGlvbkNhY2hlOiB0cnVlLFxuXHRcdCRjb25zb2xlOiB0cnVlLFxuXHRcdCRleHRlcm5hbDogdHJ1ZSxcblx0XHQkZnJhbWU6IHRydWUsXG5cdFx0JGZyYW1lRWxlbWVudDogdHJ1ZSxcblx0XHQkZnJhbWVzOiB0cnVlLFxuXHRcdCRpbm5lckhlaWdodDogdHJ1ZSxcblx0XHQkaW5uZXJXaWR0aDogdHJ1ZSxcblx0XHQkb25tb3pmdWxsc2NyZWVuY2hhbmdlOiB0cnVlLFxuXHRcdCRvbm1vemZ1bGxzY3JlZW5lcnJvcjogdHJ1ZSxcblx0XHQkb3V0ZXJIZWlnaHQ6IHRydWUsXG5cdFx0JG91dGVyV2lkdGg6IHRydWUsXG5cdFx0JHBhZ2VYT2Zmc2V0OiB0cnVlLFxuXHRcdCRwYWdlWU9mZnNldDogdHJ1ZSxcblx0XHQkcGFyZW50OiB0cnVlLFxuXHRcdCRzY3JvbGxMZWZ0OiB0cnVlLFxuXHRcdCRzY3JvbGxUb3A6IHRydWUsXG5cdFx0JHNjcm9sbFg6IHRydWUsXG5cdFx0JHNjcm9sbFk6IHRydWUsXG5cdFx0JHNlbGY6IHRydWUsXG5cdFx0JHdlYmtpdEluZGV4ZWREQjogdHJ1ZSxcblx0XHQkd2Via2l0U3RvcmFnZUluZm86IHRydWUsXG5cdFx0JHdpbmRvdzogdHJ1ZVxuXHR9O1xuXHR2YXIgaGFzQXV0b21hdGlvbkVxdWFsaXR5QnVnID0gKGZ1bmN0aW9uICgpIHtcblx0XHQvKiBnbG9iYWwgd2luZG93ICovXG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGZvciAodmFyIGsgaW4gd2luZG93KSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAoIWV4Y2x1ZGVkS2V5c1snJCcgKyBrXSAmJiBoYXMuY2FsbCh3aW5kb3csIGspICYmIHdpbmRvd1trXSAhPT0gbnVsbCAmJiB0eXBlb2Ygd2luZG93W2tdID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZSh3aW5kb3dba10pO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9KCkpO1xuXHR2YXIgZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGVJZk5vdEJ1Z2d5ID0gZnVuY3Rpb24gKG8pIHtcblx0XHQvKiBnbG9iYWwgd2luZG93ICovXG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNBdXRvbWF0aW9uRXF1YWxpdHlCdWcpIHtcblx0XHRcdHJldHVybiBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZShvKTtcblx0XHR9XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZShvKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9O1xuXG5cdGtleXNTaGltID0gZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcblx0XHR2YXIgaXNPYmplY3QgPSBvYmplY3QgIT09IG51bGwgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCc7XG5cdFx0dmFyIGlzRnVuY3Rpb24gPSB0b1N0ci5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cdFx0dmFyIGlzQXJndW1lbnRzID0gaXNBcmdzKG9iamVjdCk7XG5cdFx0dmFyIGlzU3RyaW5nID0gaXNPYmplY3QgJiYgdG9TdHIuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBTdHJpbmddJztcblx0XHR2YXIgdGhlS2V5cyA9IFtdO1xuXG5cdFx0aWYgKCFpc09iamVjdCAmJiAhaXNGdW5jdGlvbiAmJiAhaXNBcmd1bWVudHMpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5rZXlzIGNhbGxlZCBvbiBhIG5vbi1vYmplY3QnKTtcblx0XHR9XG5cblx0XHR2YXIgc2tpcFByb3RvID0gaGFzUHJvdG9FbnVtQnVnICYmIGlzRnVuY3Rpb247XG5cdFx0aWYgKGlzU3RyaW5nICYmIG9iamVjdC5sZW5ndGggPiAwICYmICFoYXMuY2FsbChvYmplY3QsIDApKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdC5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHR0aGVLZXlzLnB1c2goU3RyaW5nKGkpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoaXNBcmd1bWVudHMgJiYgb2JqZWN0Lmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgb2JqZWN0Lmxlbmd0aDsgKytqKSB7XG5cdFx0XHRcdHRoZUtleXMucHVzaChTdHJpbmcoaikpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKHZhciBuYW1lIGluIG9iamVjdCkge1xuXHRcdFx0XHRpZiAoIShza2lwUHJvdG8gJiYgbmFtZSA9PT0gJ3Byb3RvdHlwZScpICYmIGhhcy5jYWxsKG9iamVjdCwgbmFtZSkpIHtcblx0XHRcdFx0XHR0aGVLZXlzLnB1c2goU3RyaW5nKG5hbWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChoYXNEb250RW51bUJ1Zykge1xuXHRcdFx0dmFyIHNraXBDb25zdHJ1Y3RvciA9IGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlSWZOb3RCdWdneShvYmplY3QpO1xuXG5cdFx0XHRmb3IgKHZhciBrID0gMDsgayA8IGRvbnRFbnVtcy5sZW5ndGg7ICsraykge1xuXHRcdFx0XHRpZiAoIShza2lwQ29uc3RydWN0b3IgJiYgZG9udEVudW1zW2tdID09PSAnY29uc3RydWN0b3InKSAmJiBoYXMuY2FsbChvYmplY3QsIGRvbnRFbnVtc1trXSkpIHtcblx0XHRcdFx0XHR0aGVLZXlzLnB1c2goZG9udEVudW1zW2tdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhlS2V5cztcblx0fTtcbn1cbm1vZHVsZS5leHBvcnRzID0ga2V5c1NoaW07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBpc0FyZ3MgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyk7XG5cbnZhciBvcmlnS2V5cyA9IE9iamVjdC5rZXlzO1xudmFyIGtleXNTaGltID0gb3JpZ0tleXMgPyBmdW5jdGlvbiBrZXlzKG8pIHsgcmV0dXJuIG9yaWdLZXlzKG8pOyB9IDogcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG52YXIgb3JpZ2luYWxLZXlzID0gT2JqZWN0LmtleXM7XG5cbmtleXNTaGltLnNoaW0gPSBmdW5jdGlvbiBzaGltT2JqZWN0S2V5cygpIHtcblx0aWYgKE9iamVjdC5rZXlzKSB7XG5cdFx0dmFyIGtleXNXb3Jrc1dpdGhBcmd1bWVudHMgPSAoZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gU2FmYXJpIDUuMCBidWdcblx0XHRcdHZhciBhcmdzID0gT2JqZWN0LmtleXMoYXJndW1lbnRzKTtcblx0XHRcdHJldHVybiBhcmdzICYmIGFyZ3MubGVuZ3RoID09PSBhcmd1bWVudHMubGVuZ3RoO1xuXHRcdH0oMSwgMikpO1xuXHRcdGlmICgha2V5c1dvcmtzV2l0aEFyZ3VtZW50cykge1xuXHRcdFx0T2JqZWN0LmtleXMgPSBmdW5jdGlvbiBrZXlzKG9iamVjdCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuXHRcdFx0XHRpZiAoaXNBcmdzKG9iamVjdCkpIHtcblx0XHRcdFx0XHRyZXR1cm4gb3JpZ2luYWxLZXlzKHNsaWNlLmNhbGwob2JqZWN0KSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG9yaWdpbmFsS2V5cyhvYmplY3QpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0T2JqZWN0LmtleXMgPSBrZXlzU2hpbTtcblx0fVxuXHRyZXR1cm4gT2JqZWN0LmtleXMgfHwga2V5c1NoaW07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXNTaGltO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG5cdHZhciBzdHIgPSB0b1N0ci5jYWxsKHZhbHVlKTtcblx0dmFyIGlzQXJncyA9IHN0ciA9PT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cdGlmICghaXNBcmdzKSB7XG5cdFx0aXNBcmdzID0gc3RyICE9PSAnW29iamVjdCBBcnJheV0nICYmXG5cdFx0XHR2YWx1ZSAhPT0gbnVsbCAmJlxuXHRcdFx0dHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxuXHRcdFx0dHlwZW9mIHZhbHVlLmxlbmd0aCA9PT0gJ251bWJlcicgJiZcblx0XHRcdHZhbHVlLmxlbmd0aCA+PSAwICYmXG5cdFx0XHR0b1N0ci5jYWxsKHZhbHVlLmNhbGxlZSkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cdH1cblx0cmV0dXJuIGlzQXJncztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnZXMtYWJzdHJhY3QvMjAyMC9SZXF1aXJlT2JqZWN0Q29lcmNpYmxlJyk7XG52YXIgVG9TdHJpbmcgPSByZXF1aXJlKCdlcy1hYnN0cmFjdC8yMDIwL1RvU3RyaW5nJyk7XG52YXIgY2FsbEJvdW5kID0gcmVxdWlyZSgnY2FsbC1iaW5kL2NhbGxCb3VuZCcpO1xudmFyICRyZXBsYWNlID0gY2FsbEJvdW5kKCdTdHJpbmcucHJvdG90eXBlLnJlcGxhY2UnKTtcblxuLyogZXNsaW50LWRpc2FibGUgbm8tY29udHJvbC1yZWdleCAqL1xudmFyIGxlZnRXaGl0ZXNwYWNlID0gL15bXFx4MDlcXHgwQVxceDBCXFx4MENcXHgwRFxceDIwXFx4QTBcXHUxNjgwXFx1MTgwRVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBBXFx1MjAyRlxcdTIwNUZcXHUzMDAwXFx1MjAyOFxcdTIwMjlcXHVGRUZGXSsvO1xudmFyIHJpZ2h0V2hpdGVzcGFjZSA9IC9bXFx4MDlcXHgwQVxceDBCXFx4MENcXHgwRFxceDIwXFx4QTBcXHUxNjgwXFx1MTgwRVxcdTIwMDBcXHUyMDAxXFx1MjAwMlxcdTIwMDNcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBBXFx1MjAyRlxcdTIwNUZcXHUzMDAwXFx1MjAyOFxcdTIwMjlcXHVGRUZGXSskLztcbi8qIGVzbGludC1lbmFibGUgbm8tY29udHJvbC1yZWdleCAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyaW0oKSB7XG5cdHZhciBTID0gVG9TdHJpbmcoUmVxdWlyZU9iamVjdENvZXJjaWJsZSh0aGlzKSk7XG5cdHJldHVybiAkcmVwbGFjZSgkcmVwbGFjZShTLCBsZWZ0V2hpdGVzcGFjZSwgJycpLCByaWdodFdoaXRlc3BhY2UsICcnKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjYWxsQmluZCA9IHJlcXVpcmUoJ2NhbGwtYmluZCcpO1xudmFyIGRlZmluZSA9IHJlcXVpcmUoJ2RlZmluZS1wcm9wZXJ0aWVzJyk7XG5cbnZhciBpbXBsZW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcbnZhciBnZXRQb2x5ZmlsbCA9IHJlcXVpcmUoJy4vcG9seWZpbGwnKTtcbnZhciBzaGltID0gcmVxdWlyZSgnLi9zaGltJyk7XG5cbnZhciBib3VuZFRyaW0gPSBjYWxsQmluZChnZXRQb2x5ZmlsbCgpKTtcblxuZGVmaW5lKGJvdW5kVHJpbSwge1xuXHRnZXRQb2x5ZmlsbDogZ2V0UG9seWZpbGwsXG5cdGltcGxlbWVudGF0aW9uOiBpbXBsZW1lbnRhdGlvbixcblx0c2hpbTogc2hpbVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gYm91bmRUcmltO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbnZhciB6ZXJvV2lkdGhTcGFjZSA9ICdcXHUyMDBiJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRQb2x5ZmlsbCgpIHtcblx0aWYgKFN0cmluZy5wcm90b3R5cGUudHJpbSAmJiB6ZXJvV2lkdGhTcGFjZS50cmltKCkgPT09IHplcm9XaWR0aFNwYWNlKSB7XG5cdFx0cmV0dXJuIFN0cmluZy5wcm90b3R5cGUudHJpbTtcblx0fVxuXHRyZXR1cm4gaW1wbGVtZW50YXRpb247XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBnZXRQb2x5ZmlsbCA9IHJlcXVpcmUoJy4vcG9seWZpbGwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzaGltU3RyaW5nVHJpbSgpIHtcblx0dmFyIHBvbHlmaWxsID0gZ2V0UG9seWZpbGwoKTtcblx0ZGVmaW5lKFN0cmluZy5wcm90b3R5cGUsIHsgdHJpbTogcG9seWZpbGwgfSwge1xuXHRcdHRyaW06IGZ1bmN0aW9uIHRlc3RUcmltKCkge1xuXHRcdFx0cmV0dXJuIFN0cmluZy5wcm90b3R5cGUudHJpbSAhPT0gcG9seWZpbGw7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIHBvbHlmaWxsO1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgX19ERVZfXyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbic7XG5cbnZhciB3YXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKF9fREVWX18pIHtcbiAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIHByaW50V2FybmluZyhmb3JtYXQsIGFyZ3MpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiA+IDEgPyBsZW4gLSAxIDogMCk7XG4gICAgZm9yICh2YXIga2V5ID0gMTsga2V5IDwgbGVuOyBrZXkrKykge1xuICAgICAgYXJnc1trZXkgLSAxXSA9IGFyZ3VtZW50c1trZXldO1xuICAgIH1cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgK1xuICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH1cblxuICB3YXJuaW5nID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGFyZ3MpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiA+IDIgPyBsZW4gLSAyIDogMCk7XG4gICAgZm9yICh2YXIga2V5ID0gMjsga2V5IDwgbGVuOyBrZXkrKykge1xuICAgICAgYXJnc1trZXkgLSAyXSA9IGFyZ3VtZW50c1trZXldO1xuICAgIH1cbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArXG4gICAgICAgICAgJ21lc3NhZ2UgYXJndW1lbnQnXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KG51bGwsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG4iLCJpbXBvcnQgeyBJUGFnZVZhbGlkYXRpb25Ib29rLCBFcnJvckJsb2NrIH0gZnJvbSAnLi4vLi4vLi4vLi4vc3JjL2Jyb3dzZXInXG5cbmV4cG9ydCBjb25zdCBob29rOiBJUGFnZVZhbGlkYXRpb25Ib29rID0ge1xuICBjb21wb25lbnROYW1lOiAnZmF2b3VyaXRlLWNvbG91cicsXG4gIHJlZ2lzdGVyOiAoeyBkYXRhSWQsIGZvcm0gfSkgPT4ge1xuICAgIGNvbnN0IGlucHV0RmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShkYXRhSWQpWzBdIGFzIEhUTUxJbnB1dEVsZW1lbnRcblxuICAgIGlucHV0RmllbGQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBlcnJvckJsb2NrID0gbmV3IEVycm9yQmxvY2soZGF0YUlkKVxuICAgICAgZm9ybVxuICAgICAgICAudmFsaWRhdG9yRm9yKGRhdGFJZClcbiAgICAgICAgPy52YWxpZGF0ZShpbnB1dEZpZWxkLnZhbHVlKVxuICAgICAgICAuZm9yRWFjaCgoZSkgPT4gZXJyb3JCbG9jay5hZGQoZm9ybS52aWV3LnRyYW5zbGF0ZShlKSkpXG4gICAgICBlcnJvckJsb2NrLnJlbmRlcigpXG4gICAgfSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgaG9vayBhcyBmYXZvdXJpdGVDb2xvdXJIb29rIH0gZnJvbSAnLi9mYXZvdXJpdGUtY29sb3VyJ1xuXG5leHBvcnQgY29uc3QgaG9va3MgPSBbZmF2b3VyaXRlQ29sb3VySG9va11cbiIsImV4cG9ydCAqIGZyb20gJy4vcGFnZS12YWxpZGF0aW9uLXBsdWdpbidcbmV4cG9ydCB7IEVycm9yQmxvY2sgfSBmcm9tICcuLi90ZW1wbGF0ZXMvZXJyb3ItYmxvY2snXG4iLCJpbXBvcnQgeyBJRm9ybXNCdWlsZGVyUGx1Z2luLCBGb3JtLCBGaWVsZFNldCwgRmllbGQgfSBmcm9tICdAdG5nYmwvZm9ybXMnXG5pbXBvcnQgeyBldmVudEhvb2tzIGFzIGNvcmVFdmVudEhvb2tzIH0gZnJvbSAnLi4vdGVtcGxhdGVzJ1xuaW1wb3J0IHsgdmVyc2lvbiwgbmFtZSB9IGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbidcblxuZGVjbGFyZSBtb2R1bGUgJ0B0bmdibC9mb3Jtcycge1xuICBpbnRlcmZhY2UgRm9ybSB7XG4gICAgLyoqXG4gICAgICogQmluZHMgYWxsIHBhZ2UgYmluZGluZ3MgcmVsZXZhbnQgdG8gdGhlIGZvcm0gaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEFkZGVkIGJ5IHRoZSBAdG5nYmwvZm9ybXMtbnVuanVja3MgcGx1Z2luXG4gICAgICovXG4gICAgYmluZFRvUGFnZSgpOiB2b2lkXG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUGFnZVZhbGlkYXRpb25Ib29rQXJncyB7XG4gIGRhdGFJZDogc3RyaW5nXG4gIGZvcm06IEZvcm1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUGFnZVZhbGlkYXRpb25Ib29rIHtcbiAgY29tcG9uZW50TmFtZTogc3RyaW5nXG4gIHJlZ2lzdGVyOiAoYXJnczogSVBhZ2VWYWxpZGF0aW9uSG9va0FyZ3MpID0+IHZvaWRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYWdlVmFsaWRhdGlvblBsdWdpbk9wdGlvbnMge1xuICBob29rczogSVBhZ2VWYWxpZGF0aW9uSG9va1tdXG59XG5cbmV4cG9ydCBjb25zdCBwYWdlVmFsaWRhdGlvbiA9IChcbiAgb3B0czogUGFnZVZhbGlkYXRpb25QbHVnaW5PcHRpb25zXG4pOiBJRm9ybXNCdWlsZGVyUGx1Z2luID0+IHtcbiAgY29uc3QgaG9va3MgPSBbLi4uY29yZUV2ZW50SG9va3MsIC4uLihvcHRzLmhvb2tzIHx8IFtdKV1cblxuICByZXR1cm4ge1xuICAgIG5hbWU6IGBwYWdlLXZhbGlkYXRpb25gLFxuICAgIGZyb21QYWNrYWdlOiBuYW1lLFxuICAgIHZlcnNpb24sXG4gICAgcmVnaXN0ZXIoKTogdm9pZCB7XG4gICAgICBGb3JtLnByb3RvdHlwZS5iaW5kVG9QYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBfYmluZCA9IChjb21wb25lbnQ6IEZvcm0gfCBGaWVsZFNldCB8IEZpZWxkKTogdm9pZCA9PiB7XG4gICAgICAgICAgaWYgKGNvbXBvbmVudCBpbnN0YW5jZW9mIEZvcm0pIHtcbiAgICAgICAgICAgIF9iaW5kKGNvbXBvbmVudC5zY2hlbWEpXG4gICAgICAgICAgfSBlbHNlIGlmIChjb21wb25lbnQgaW5zdGFuY2VvZiBGaWVsZFNldCkge1xuICAgICAgICAgICAgY29tcG9uZW50LnN0cnVjdHVyZS5mb3JFYWNoKF9iaW5kKVxuICAgICAgICAgIH0gZWxzZSBpZiAoY29tcG9uZW50IGluc3RhbmNlb2YgRmllbGQpIHtcbiAgICAgICAgICAgIGNvbnN0IGhvb2sgPSBob29rcy5maW5kKFxuICAgICAgICAgICAgICAoaG9vaykgPT4gaG9vay5jb21wb25lbnROYW1lID09PSBjb21wb25lbnQudmlld1R5cGVcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIGlmICghaG9vaykgdGhyb3cgRXJyb3IoYE1pc3NpbmcgaG9vayBuYW1lZCAke2NvbXBvbmVudC52aWV3VHlwZX1gKVxuICAgICAgICAgICAgaG9vay5yZWdpc3Rlcih7XG4gICAgICAgICAgICAgIGRhdGFJZDogY29tcG9uZW50Lm5hbWUsXG4gICAgICAgICAgICAgIGZvcm06IHRoaXNcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBpdGVtIGluIGZvcm0gc3RydWN0dXJlICR7Y29tcG9uZW50fWApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9iaW5kKHRoaXMpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgRXJyb3JCbG9jayB7XG4gIGVsZW1lbnQ6IEhUTUxVTGlzdEVsZW1lbnRcbiAgZXJyb3JzOiBzdHJpbmdbXSA9IFtdXG5cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICBuYW1lICsgJ19fZXJyb3ItYmxvY2snXG4gICAgKSBhcyBIVE1MVUxpc3RFbGVtZW50XG4gIH1cblxuICBhZGQoZXJyb3I6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZXJyb3JzLnB1c2goZXJyb3IpXG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLmVycm9ycyA9IFtdXG4gIH1cblxuICByZW5kZXIoKTogdm9pZCB7XG4gICAgdGhpcy5lbGVtZW50LmlubmVySFRNTCA9IHRoaXMuZXJyb3JzXG4gICAgICAubWFwKChlcnJvcikgPT4gYDxsaT4ke2Vycm9yfTwvbGk+YClcbiAgICAgIC5qb2luKCdcXG4nKVxuICB9XG59XG4iLCJpbXBvcnQgbmV3UGFzc3dvcmRFdmVudEhvb2sgZnJvbSAnLi9uZXctcGFzc3dvcmQnXG5cbmV4cG9ydCBjb25zdCBldmVudEhvb2tzID0gW25ld1Bhc3N3b3JkRXZlbnRIb29rXVxuIiwiaW1wb3J0IHsgSVBhZ2VWYWxpZGF0aW9uSG9vaywgRXJyb3JCbG9jayB9IGZyb20gJy4uL2Jyb3dzZXInXG5cbmNvbnN0IGV2ZW50SG9vazogSVBhZ2VWYWxpZGF0aW9uSG9vayA9IHtcbiAgY29tcG9uZW50TmFtZTogJ25ldy1wYXNzd29yZCcsXG4gIHJlZ2lzdGVyOiAoeyBkYXRhSWQsIGZvcm0gfSkgPT4ge1xuICAgIGNvbnN0IGlucHV0RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpXG5cbiAgICBsZXQgY29uZmlybVRvdWNoZWQgPSBmYWxzZVxuXG4gICAgY29uc3Qgb25JbnB1dENoYW5nZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGVycm9yQmxvY2sgPSBuZXcgRXJyb3JCbG9jayhkYXRhSWQpXG5cbiAgICAgIGlmIChjb25maXJtVG91Y2hlZCkge1xuICAgICAgICBmb3JtXG4gICAgICAgICAgLnZhbGlkYXRvckZvcihkYXRhSWQpXG4gICAgICAgICAgPy52YWxpZGF0ZShpbnB1dEVsZW1lbnRzWzBdLnZhbHVlKVxuICAgICAgICAgIC5mb3JFYWNoKChlcnJvcikgPT4gZXJyb3JCbG9jay5hZGQoZm9ybS52aWV3LnRyYW5zbGF0ZShlcnJvcikpKVxuXG4gICAgICAgIC8vIENoZWNrIGlmIG1hdGNoaW5nXG4gICAgICAgIGlmIChpbnB1dEVsZW1lbnRzWzBdLnZhbHVlICE9PSBpbnB1dEVsZW1lbnRzWzFdLnZhbHVlKSB7XG4gICAgICAgICAgZXJyb3JCbG9jay5hZGQoXG4gICAgICAgICAgICBmb3JtLnZpZXcudHJhbnNsYXRlKHtcbiAgICAgICAgICAgICAgdHJhbnNsYXRlS2V5OiAndmFsaWRhdGlvbnMubmV3LXBhc3N3b3JkLmNvbmZpcm0tZG9lcy1ub3QtbWF0Y2gnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZXJyb3JCbG9jay5yZW5kZXIoKVxuICAgIH1cblxuICAgIGNvbnN0IG9uRm9jdXMgPSAoKSA9PiB7XG4gICAgICBjb25maXJtVG91Y2hlZCA9IHRydWVcbiAgICB9XG5cbiAgICBpbnB1dEVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBvbkZvY3VzKVxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uSW5wdXRDaGFuZ2UpXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBldmVudEhvb2tcbiIsImltcG9ydCB7IElGb3Jtc0J1aWxkZXJQbHVnaW4gfSBmcm9tICcuLi9tYWtlLWZvcm0tYnVpbGRlcidcbmltcG9ydCB7IGNvcmVWYWxpZGF0aW9uQnVpbGRlcnMgfSBmcm9tICcuL3ZhbGlkYXRpb25zJ1xuaW1wb3J0IHsgY29yZVRyaWdnZXJDb25kaXRpb25CdWlsZGVycyB9IGZyb20gJy4vdHJpZ2dlcnMnXG5pbXBvcnQgeyBjb3JlVmlld0J1aWxkZXJzIH0gZnJvbSAnLi92aWV3cydcbmltcG9ydCB7IHZlcnNpb24sIG5hbWUgYXMgcGtnTmFtZSB9IGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbidcblxuZXhwb3J0IGNvbnN0IGNvcmU6IElGb3Jtc0J1aWxkZXJQbHVnaW4gJiB7XG4gIHZhbGlkYXRpb25zOiBJRm9ybXNCdWlsZGVyUGx1Z2luXG4gIGRhdGFUcmlnZ2VyczogSUZvcm1zQnVpbGRlclBsdWdpblxuICB2aWV3czogSUZvcm1zQnVpbGRlclBsdWdpblxufSA9IHtcbiAgbmFtZTogYGNvcmVgLFxuICB2ZXJzaW9uLFxuICBmcm9tUGFja2FnZTogcGtnTmFtZSxcbiAgcmVnaXN0ZXIoYnVpbGRlcikge1xuICAgIGJ1aWxkZXIud2l0aEJ1aWxkZXJzKFxuICAgICAgW1xuICAgICAgICAuLi5jb3JlVmFsaWRhdGlvbkJ1aWxkZXJzLFxuICAgICAgICAuLi5jb3JlVHJpZ2dlckNvbmRpdGlvbkJ1aWxkZXJzLFxuICAgICAgICAuLi5jb3JlVmlld0J1aWxkZXJzXG4gICAgICBdLFxuICAgICAgJ2NvcmUnLFxuICAgICAgcGtnTmFtZSxcbiAgICAgIHZlcnNpb25cbiAgICApXG4gIH0sXG4gIHZhbGlkYXRpb25zOiB7XG4gICAgbmFtZTogYGNvcmUudmFsaWRhdGlvbnNgLFxuICAgIHZlcnNpb24sXG4gICAgZnJvbVBhY2thZ2U6IHBrZ05hbWUsXG4gICAgcmVnaXN0ZXIoYnVpbGRlcikge1xuICAgICAgYnVpbGRlci53aXRoQnVpbGRlcnMoXG4gICAgICAgIGNvcmVWYWxpZGF0aW9uQnVpbGRlcnMsXG4gICAgICAgICdjb3JlLnZhbGlkYXRpb25zJyxcbiAgICAgICAgcGtnTmFtZSxcbiAgICAgICAgdmVyc2lvblxuICAgICAgKVxuICAgIH1cbiAgfSxcbiAgZGF0YVRyaWdnZXJzOiB7XG4gICAgbmFtZTogYGNvcmUuZGF0YVRyaWdnZXJzYCxcbiAgICB2ZXJzaW9uLFxuICAgIGZyb21QYWNrYWdlOiBwa2dOYW1lLFxuICAgIHJlZ2lzdGVyKGJ1aWxkZXIpIHtcbiAgICAgIGJ1aWxkZXIud2l0aEJ1aWxkZXJzKFxuICAgICAgICBjb3JlVHJpZ2dlckNvbmRpdGlvbkJ1aWxkZXJzLFxuICAgICAgICAnY29yZS5kYXRhVHJpZ2dlcnMnLFxuICAgICAgICBwa2dOYW1lLFxuICAgICAgICB2ZXJzaW9uXG4gICAgICApXG4gICAgfVxuICB9LFxuICB2aWV3czoge1xuICAgIG5hbWU6IGBjb3JlLnZpZXdzYCxcbiAgICB2ZXJzaW9uLFxuICAgIGZyb21QYWNrYWdlOiBwa2dOYW1lLFxuICAgIHJlZ2lzdGVyKGJ1aWxkZXIpIHtcbiAgICAgIGJ1aWxkZXIud2l0aEJ1aWxkZXJzKGNvcmVWaWV3QnVpbGRlcnMsICdjb3JlLnZpZXdzJywgcGtnTmFtZSwgdmVyc2lvbilcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vdmFsaWRhdGlvbnMnXG5leHBvcnQgKiBmcm9tICcuL3RyaWdnZXJzJ1xuZXhwb3J0ICogZnJvbSAnLi9jb3JlLXBsdWdpbidcbiIsImltcG9ydCB7XG4gIElUcmlnZ2VyQ29uZGl0aW9uLFxuICBJVHJpZ2dlckNvbmRpdGlvbkJ1aWxkZXIsXG4gIFN0b3JlZFBsYWluT2JqZWN0XG59IGZyb20gJy4uLy4uL0B0eXBlcydcbmltcG9ydCB7IEZvcm1EYXRhIH0gZnJvbSAnLi4vLi4vZm9ybSdcbmltcG9ydCB7IGZpbmRJbkRhdGEgfSBmcm9tICcuLi8uLi91dGlscy9maW5kJ1xuaW1wb3J0IHsgaGFzUHJvcGVydHkgfSBmcm9tICcuLi8uLi91dGlscydcbmltcG9ydCB7IEZhbHNlIH0gZnJvbSAnLidcblxuaW50ZXJmYWNlIElGb3JtRGF0YVJlZmVyZW5jZSB7XG4gIGRhdGFJZDogc3RyaW5nIHwgdW5kZWZpbmVkXG59XG5cbnR5cGUgTWF0Y2ggPSBudW1iZXIgfCBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsIHwgSUZvcm1EYXRhUmVmZXJlbmNlXG5GYWxzZVxuZXhwb3J0IGNsYXNzIEVxdWFsc1RyaWdnZXJDb25kaXRpb24gaW1wbGVtZW50cyBJVHJpZ2dlckNvbmRpdGlvbiB7XG4gIHN0YXRpYyBTZWxmID0geyBkYXRhSWQ6IHVuZGVmaW5lZCB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGxlZnQ6IE1hdGNoLFxuICAgIHB1YmxpYyByaWdodDogTWF0Y2ggPSBFcXVhbHNUcmlnZ2VyQ29uZGl0aW9uLlNlbGZcbiAgKSB7fVxuXG4gIGlzVHJpZ2dlcmVkKGRhdGFJZDogc3RyaW5nLCBkYXRhOiBGb3JtRGF0YSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGxlZnQgPSBoYXNQcm9wZXJ0eSh0aGlzLmxlZnQsICdkYXRhSWQnKVxuICAgICAgPyBmaW5kSW5EYXRhKFxuICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgdGhpcy5sZWZ0ID09PSBFcXVhbHNUcmlnZ2VyQ29uZGl0aW9uLlNlbGZcbiAgICAgICAgICAgID8gZGF0YUlkXG4gICAgICAgICAgICA6ICh0aGlzLmxlZnQgYXMgSUZvcm1EYXRhUmVmZXJlbmNlKS5kYXRhSWQgfHwgJydcbiAgICAgICAgKVxuICAgICAgOiB0aGlzLmxlZnRcbiAgICBjb25zdCByaWdodCA9IGhhc1Byb3BlcnR5KHRoaXMucmlnaHQsICdkYXRhSWQnKVxuICAgICAgPyBmaW5kSW5EYXRhKFxuICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgdGhpcy5yaWdodCA9PT0gRXF1YWxzVHJpZ2dlckNvbmRpdGlvbi5TZWxmXG4gICAgICAgICAgICA/IGRhdGFJZFxuICAgICAgICAgICAgOiAodGhpcy5yaWdodCBhcyBJRm9ybURhdGFSZWZlcmVuY2UpLmRhdGFJZCB8fCAnJ1xuICAgICAgICApXG4gICAgICA6IHRoaXMucmlnaHRcbiAgICByZXR1cm4gbGVmdCA9PT0gcmlnaHRcbiAgfVxuXG4gIHRvSnNvbigpOiBTdG9yZWRQbGFpbk9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEVxdWFsc1RyaWdnZXJDb25kaXRpb24ubmFtZSxcbiAgICAgIGxlZnQ6IHRoaXMubGVmdCxcbiAgICAgIHJpZ2h0OiB0aGlzLnJpZ2h0XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBidWlsZGVyOiBJVHJpZ2dlckNvbmRpdGlvbkJ1aWxkZXIgPSB7XG4gIHR5cGU6IEVxdWFsc1RyaWdnZXJDb25kaXRpb24ubmFtZSxcbiAgZnJvbUpzb24oanNvbiwgX2J1aWxkZXJzKTogRXF1YWxzVHJpZ2dlckNvbmRpdGlvbiB7XG4gICAgcmV0dXJuIG5ldyBFcXVhbHNUcmlnZ2VyQ29uZGl0aW9uKGpzb24ubGVmdCwganNvbi5yaWdodClcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgSVRyaWdnZXJDb25kaXRpb24sXG4gIElUcmlnZ2VyQ29uZGl0aW9uQnVpbGRlcixcbiAgU3RvcmVkUGxhaW5PYmplY3Rcbn0gZnJvbSAnLi4vLi4vQHR5cGVzJ1xuXG5leHBvcnQgY2xhc3MgRmFsc2VUcmlnZ2VyQ29uZGl0aW9uIGltcGxlbWVudHMgSVRyaWdnZXJDb25kaXRpb24ge1xuICBpc1RyaWdnZXJlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHRvSnNvbigpOiBTdG9yZWRQbGFpbk9iamVjdCB7XG4gICAgcmV0dXJuIHsgdHlwZTogRmFsc2VUcmlnZ2VyQ29uZGl0aW9uLm5hbWUgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBidWlsZGVyOiBJVHJpZ2dlckNvbmRpdGlvbkJ1aWxkZXIgPSB7XG4gIHR5cGU6IEZhbHNlVHJpZ2dlckNvbmRpdGlvbi5uYW1lLFxuICBmcm9tSnNvbigpOiBGYWxzZVRyaWdnZXJDb25kaXRpb24ge1xuICAgIHJldHVybiBuZXcgRmFsc2VUcmlnZ2VyQ29uZGl0aW9uKClcbiAgfVxufVxuIiwiaW1wb3J0IHsgVHJ1ZVRyaWdnZXJDb25kaXRpb24sIGJ1aWxkZXIgYXMgdHJ1ZUJ1aWxkZXIgfSBmcm9tICcuL3RydWUnXG5pbXBvcnQgeyBGYWxzZVRyaWdnZXJDb25kaXRpb24sIGJ1aWxkZXIgYXMgZmFsc2VCdWlsZGVyIH0gZnJvbSAnLi9mYWxzZSdcbmltcG9ydCB7IEVxdWFsc1RyaWdnZXJDb25kaXRpb24sIGJ1aWxkZXIgYXMgZXF1YWxzQnVpbGRlciB9IGZyb20gJy4vZXF1YWxzJ1xuXG5leHBvcnQge1xuICBUcnVlVHJpZ2dlckNvbmRpdGlvbiBhcyBUcnVlLFxuICBGYWxzZVRyaWdnZXJDb25kaXRpb24gYXMgRmFsc2UsXG4gIEVxdWFsc1RyaWdnZXJDb25kaXRpb24gYXMgRXF1YWxzXG59XG5leHBvcnQgY29uc3QgY29yZVRyaWdnZXJDb25kaXRpb25CdWlsZGVycyA9IFtcbiAgdHJ1ZUJ1aWxkZXIsXG4gIGZhbHNlQnVpbGRlcixcbiAgZXF1YWxzQnVpbGRlclxuXVxuIiwiaW1wb3J0IHtcbiAgSVRyaWdnZXJDb25kaXRpb24sXG4gIElUcmlnZ2VyQ29uZGl0aW9uQnVpbGRlcixcbiAgU3RvcmVkUGxhaW5PYmplY3Rcbn0gZnJvbSAnLi4vLi4vQHR5cGVzJ1xuXG5leHBvcnQgY2xhc3MgVHJ1ZVRyaWdnZXJDb25kaXRpb24gaW1wbGVtZW50cyBJVHJpZ2dlckNvbmRpdGlvbiB7XG4gIGlzVHJpZ2dlcmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICB0b0pzb24oKTogU3RvcmVkUGxhaW5PYmplY3Qge1xuICAgIHJldHVybiB7IHR5cGU6IFRydWVUcmlnZ2VyQ29uZGl0aW9uLm5hbWUgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBidWlsZGVyOiBJVHJpZ2dlckNvbmRpdGlvbkJ1aWxkZXIgPSB7XG4gIHR5cGU6IFRydWVUcmlnZ2VyQ29uZGl0aW9uLm5hbWUsXG4gIGZyb21Kc29uKCk6IFRydWVUcmlnZ2VyQ29uZGl0aW9uIHtcbiAgICByZXR1cm4gbmV3IFRydWVUcmlnZ2VyQ29uZGl0aW9uKClcbiAgfVxufVxuIiwiaW1wb3J0IHsgYnVpbGRlciBhcyBtaW5MZW5ndGhCdWlsZGVyLCBNaW5MZW5ndGhWYWxpZGF0aW9uIH0gZnJvbSAnLi9taW4tbGVuZ3RoJ1xuXG5leHBvcnQgeyBNaW5MZW5ndGhWYWxpZGF0aW9uIH1cbmV4cG9ydCBjb25zdCBjb3JlVmFsaWRhdGlvbkJ1aWxkZXJzID0gW21pbkxlbmd0aEJ1aWxkZXJdXG4iLCJpbXBvcnQgeyBpc051bGxPclVuZGVmaW5lZCwgaXNOdW1iZXIgfSBmcm9tICcuLi8uLi91dGlscy90eXBlcydcbmltcG9ydCB7XG4gIElWYWxpZGF0aW9uQ29uZGl0aW9uLFxuICBJVmFsaWRhdGlvbkNvbmRpdGlvbkJ1aWxkZXIsXG4gIElWYWxpZGF0aW9uRXJyb3IsXG4gIFN0b3JlZFBsYWluT2JqZWN0XG59IGZyb20gJy4uLy4uL0B0eXBlcydcbmltcG9ydCB7IEZvcm1EYXRhIH0gZnJvbSAnLi4vLi4vZm9ybSdcblxuaW50ZXJmYWNlIElNZWFzdXJhYmxlIHtcbiAgbGVuZ3RoOiBudW1iZXJcbn1cblxuZXhwb3J0IGNsYXNzIE1pbkxlbmd0aFZhbGlkYXRpb24gaW1wbGVtZW50cyBJVmFsaWRhdGlvbkNvbmRpdGlvbiB7XG4gIGxlbmd0aDogbnVtYmVyXG5cbiAgY29uc3RydWN0b3IobGVuZ3RoOiBudW1iZXIpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aFxuICB9XG5cbiAgdmFsaWRhdGUoaWQ6IHN0cmluZywgZGF0YTogRm9ybURhdGEpOiBJVmFsaWRhdGlvbkVycm9yW10ge1xuICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQoZGF0YSkgfHwgIWlzTnVtYmVyKChkYXRhIGFzIElNZWFzdXJhYmxlKS5sZW5ndGgpKSB7XG4gICAgICByZXR1cm4gW11cbiAgICB9XG4gICAgaWYgKGRhdGEubGVuZ3RoIDwgdGhpcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHtcbiAgICAgICAgICBkYXRhSWQ6IGlkLFxuICAgICAgICAgIHZhbGlkYXRpb246IE1pbkxlbmd0aFZhbGlkYXRpb24ubmFtZSxcbiAgICAgICAgICBlcnJvcjogJ3Rvby1zaG9ydCcsXG4gICAgICAgICAgdHJhbnNsYXRlS2V5OiBgdmFsaWRhdGlvbnMuJHtNaW5MZW5ndGhWYWxpZGF0aW9uLm5hbWV9LnRvby1zaG9ydGAsXG4gICAgICAgICAgdHJhbnNsYXRlVmFyczogeyBsZW5ndGg6IHRoaXMubGVuZ3RoIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW11cbiAgICB9XG4gIH1cblxuICB0b0pzb24oKTogU3RvcmVkUGxhaW5PYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBNaW5MZW5ndGhWYWxpZGF0aW9uLm5hbWUsXG4gICAgICBsZW5ndGg6IHRoaXMubGVuZ3RoXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBidWlsZGVyOiBJVmFsaWRhdGlvbkNvbmRpdGlvbkJ1aWxkZXIgPSB7XG4gIHR5cGU6IE1pbkxlbmd0aFZhbGlkYXRpb24ubmFtZSxcbiAgZnJvbUpzb24ob2JqOiBTdG9yZWRQbGFpbk9iamVjdCk6IElWYWxpZGF0aW9uQ29uZGl0aW9uIHtcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gbmV3IE1pbkxlbmd0aFZhbGlkYXRpb24ob2JqLmxlbmd0aClcbiAgICByZXR1cm4gdmFsaWRhdGlvblxuICB9XG59XG4iLCJpbXBvcnQge1xuICBJVHJhbnNsYXRhYmxlLFxuICBTdG9yZWRQbGFpbk9iamVjdCxcbiAgU3RyaW5nVHJlZSxcbiAgSVZpZXcsXG4gIElWaWV3QnVpbGRlclxufSBmcm9tICcuLi8uLi9AdHlwZXMnXG5pbXBvcnQgKiBhcyBQb2x5Z2xvdCBmcm9tICdub2RlLXBvbHlnbG90J1xuXG5leHBvcnQgY2xhc3MgQmFzaWNGb3JtVmlldyBpbXBsZW1lbnRzIElWaWV3IHtcbiAgbG9jYWxlOiBzdHJpbmdcblxuICBwcml2YXRlIF90cmFuc2xhdGlvbnM6IFN0cmluZ1RyZWVcbiAgcHJpdmF0ZSBfcG9seWdsb3Q6IFBvbHlnbG90XG5cbiAgcHVibGljIHNldCB0cmFuc2xhdGlvbnModHJhbnNsYXRpb25zOiBTdHJpbmdUcmVlKSB7XG4gICAgdGhpcy5fdHJhbnNsYXRpb25zID0gdHJhbnNsYXRpb25zXG4gICAgdGhpcy5fcG9seWdsb3QgPSBuZXcgUG9seWdsb3QoeyBwaHJhc2VzOiB0cmFuc2xhdGlvbnMgfSlcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdHJhbnNsYXRpb25zKCk6IFN0cmluZ1RyZWUge1xuICAgIHJldHVybiB0aGlzLl90cmFuc2xhdGlvbnNcbiAgfVxuXG4gIHRyYW5zbGF0ZShpdGVtOiBJVHJhbnNsYXRhYmxlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fcG9seWdsb3QudChpdGVtLnRyYW5zbGF0ZUtleSwgaXRlbS50cmFuc2xhdGVWYXJzKVxuICB9XG5cbiAgdG9Kc29uKCk6IFN0b3JlZFBsYWluT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQmFzaWNGb3JtVmlldy5uYW1lLFxuICAgICAgbG9jYWxlOiB0aGlzLmxvY2FsZSxcbiAgICAgIHRyYW5zbGF0aW9uczogdGhpcy5fdHJhbnNsYXRpb25zXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBidWlsZGVyOiBJVmlld0J1aWxkZXIgPSB7XG4gIHR5cGU6IEJhc2ljRm9ybVZpZXcubmFtZSxcbiAgZnJvbUpzb24oanNvbjogU3RvcmVkUGxhaW5PYmplY3QpOiBCYXNpY0Zvcm1WaWV3IHtcbiAgICBjb25zdCB2aWV3ID0gbmV3IEJhc2ljRm9ybVZpZXcoKVxuICAgIHZpZXcubG9jYWxlID0ganNvbi5sb2NhbGVcbiAgICB2aWV3LnRyYW5zbGF0aW9ucyA9IGpzb24udHJhbnNsYXRpb25zXG4gICAgcmV0dXJuIHZpZXdcbiAgfVxufVxuIiwiaW1wb3J0IHsgQmFzaWNGb3JtVmlldywgYnVpbGRlciB9IGZyb20gJy4vYmFzaWMtZm9ybS12aWV3J1xuXG5leHBvcnQgeyBCYXNpY0Zvcm1WaWV3IH1cbmV4cG9ydCBjb25zdCBjb3JlVmlld0J1aWxkZXJzID0gW2J1aWxkZXJdXG4iLCJleHBvcnQgY2xhc3MgRm9ybVN5bnRheEVycm9yIGV4dGVuZHMgU3ludGF4RXJyb3Ige31cbiIsImltcG9ydCB7IFRydWVUcmlnZ2VyQ29uZGl0aW9uIH0gZnJvbSAnLi9jb3JlL3RyaWdnZXJzL3RydWUnXG5pbXBvcnQgeyBUcmlnZ2VyIH0gZnJvbSAnLi90cmlnZ2VyJ1xuaW1wb3J0IHtcbiAgSVZhbGlkYXRpb25FcnJvcixcbiAgSVZhbGlkYXRpb25Db25kaXRpb24sXG4gIFN0b3JlZFBsYWluT2JqZWN0LFxuICBCdWlsZGVyLFxuICBJVHJpZ2dlckNvbmRpdGlvblxufSBmcm9tICcuL0B0eXBlcydcbmltcG9ydCB7IGlzTnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnLi91dGlscydcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGluc3RhbmNlIG9mIGEgZmllbGQgaW4gYSBmb3JtXG4gKi9cbmV4cG9ydCBjbGFzcyBGaWVsZCB7XG4gIHZhbGlkYXRpb25Db25kaXRpb25zOiBJVmFsaWRhdGlvbkNvbmRpdGlvbltdID0gW11cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nLCAvLyBVbmlxdWUgdG8gdGhlIEZvcm1TY2hlbWEgZS5nLiBtb3RoZXJzRmlyc3ROYW1lXG4gICAgcHVibGljIGxhYmVsOiBzdHJpbmcsIC8vIGUuZy4gTW90aGVyJ3MgZmlyc3QgbmFtZVxuICAgIHB1YmxpYyB2aWV3VHlwZTogc3RyaW5nLCAvLyBEZXRlcm1pbmVzIHdoYXQgY29tcG9uZW50IHdpbGwgYmUgdXNlZCBmb3IgZWRpdGluZy9kaXNwbGF5aW5nIHRoZSBmaWVsZCBlLmcuIGZpcnN0TmFtZVxuICAgIHB1YmxpYyBpc1JlcXVpcmVkOiBUcmlnZ2VyID0gVHJpZ2dlci5BbHdheXNUcnVlXG4gICkge31cblxuICB2YWxpZGF0ZShpZDogc3RyaW5nLCBkYXRhOiBGb3JtRGF0YSk6IElWYWxpZGF0aW9uRXJyb3JbXSB7XG4gICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvbkNvbmRpdGlvbnMubWFwKCh2KSA9PiB2LnZhbGlkYXRlKGlkLCBkYXRhKSkuZmxhdCgpXG4gIH1cblxuICB0b0pzb24oKTogU3RvcmVkUGxhaW5PYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBsYWJlbDogdGhpcy5sYWJlbCxcbiAgICAgIHR5cGU6IEZpZWxkLm5hbWUsXG4gICAgICB2aWV3VHlwZTogdGhpcy52aWV3VHlwZSxcbiAgICAgIHZhbGlkYXRpb25Db25kaXRpb25zOiB0aGlzLnZhbGlkYXRpb25Db25kaXRpb25zLm1hcCgodikgPT4gdi50b0pzb24oKSksXG4gICAgICBpc1JlcXVpcmVkOlxuICAgICAgICB0aGlzLmlzUmVxdWlyZWQudHJpZ2dlciBpbnN0YW5jZW9mIFRydWVUcmlnZ2VyQ29uZGl0aW9uXG4gICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgOiB0aGlzLmlzUmVxdWlyZWQudHJpZ2dlci50b0pzb24oKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihqc29uOiBhbnksIGJ1aWxkZXJzOiBCdWlsZGVyW10pOiBGaWVsZCB7XG4gICAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKGpzb24uaXNSZXF1aXJlZCkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZpZWxkIEpTT04gbWlzc2luZyAnaXNSZXF1aXJlZCcgcHJvcGVydHlgKVxuICAgIGlmICghQXJyYXkuaXNBcnJheShqc29uLnZhbGlkYXRpb25Db25kaXRpb25zKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYEZpZWxkIEpTT04gJ3ZhbGlkYXRpb25Db25kaXRpb25zJyBwcm9wZXJ0eSBpcyBub3QgYW4gYXJyYXlgXG4gICAgICApXG4gICAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKGpzb24ubmFtZSkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZpZWxkIEpTT04gaXMgbWlzc2luZyAnbmFtZScgcHJvcGVydHlgKVxuICAgIGlmIChpc051bGxPclVuZGVmaW5lZChqc29uLmxhYmVsKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmllbGQgSlNPTiBpcyBtaXNzaW5nICdsYWJlbCcgcHJvcGVydHlgKVxuICAgIGlmIChpc051bGxPclVuZGVmaW5lZChqc29uLnZpZXdUeXBlKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmllbGQgSlNPTiBpcyBtb3NzaW5nICd2aWV3VHlwZScgcHJvcGVydHlgKVxuXG4gICAgY29uc3QgaXNSZXF1aXJlZFRyaWdnZXIgPVxuICAgICAganNvbi5pc1JlcXVpcmVkID09PSB0cnVlXG4gICAgICAgID8gbmV3IFRydWVUcmlnZ2VyQ29uZGl0aW9uKClcbiAgICAgICAgOiBidWlsZGVyc1xuICAgICAgICAgICAgLmZpbmQoKGR0KSA9PiBkdC50eXBlID09PSBqc29uLmlzUmVxdWlyZWQudHlwZSlcbiAgICAgICAgICAgID8uZnJvbUpzb24oanNvbi5pc1JlcXVpcmVkKVxuICAgIGlmICh0eXBlb2YgaXNSZXF1aXJlZFRyaWdnZXIgPT09ICd1bmRlZmluZWQnKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBEYXRhVHJpZ2dlciAnJHtqc29uPy5pc1JlcXVpcmVkPy50eXBlfScgbm90IHJlZ2lzdGVyZWRgKVxuXG4gICAgY29uc3QgZmllbGQgPSBuZXcgRmllbGQoXG4gICAgICBqc29uLm5hbWUsXG4gICAgICBqc29uLmxhYmVsLFxuICAgICAganNvbi52aWV3VHlwZSxcbiAgICAgIG5ldyBUcmlnZ2VyKGpzb24ubmFtZSwgaXNSZXF1aXJlZFRyaWdnZXIgYXMgSVRyaWdnZXJDb25kaXRpb24pXG4gICAgKVxuXG4gICAgZmllbGQudmFsaWRhdGlvbkNvbmRpdGlvbnMgPSBqc29uPy52YWxpZGF0aW9uQ29uZGl0aW9ucy5tYXAoKHZKc29uKSA9PiB7XG4gICAgICBjb25zdCBidWlsZGVyID0gYnVpbGRlcnMuZmluZCgodikgPT4gdi50eXBlID09PSB2SnNvbj8udHlwZSlcbiAgICAgIGlmICghYnVpbGRlcilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBWYWxpZGF0aW9uICcke3ZKc29uPy50eXBlfScgbm90IHJlZ2lzdGVyZWRgKVxuICAgICAgcmV0dXJuIGJ1aWxkZXIuZnJvbUpzb24odkpzb24sIGJ1aWxkZXJzKVxuICAgIH0pXG4gICAgcmV0dXJuIGZpZWxkXG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIElWYWxpZGF0aW9uQ29uZGl0aW9uLFxuICBJVmFsaWRhdGlvbkVycm9yLFxuICBTdG9yZWRQbGFpbk9iamVjdCxcbiAgQnVpbGRlcixcbiAgSVRyaWdnZXJDb25kaXRpb25cbn0gZnJvbSAnLi9AdHlwZXMnXG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4vZmllbGQnXG5pbXBvcnQgeyBUcmlnZ2VyIH0gZnJvbSAnLi90cmlnZ2VyJ1xuaW1wb3J0IHsgVHJ1ZVRyaWdnZXJDb25kaXRpb24gfSBmcm9tICcuL2NvcmUvdHJpZ2dlcnMvdHJ1ZSdcbmltcG9ydCB7IGZpbmRJbkZvcm0gfSBmcm9tICcuL3V0aWxzL2ZpbmQnXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGdyb3VwIG9mIGZpZWxkcyBpbiBhIGZvcm1cbiAqL1xuZXhwb3J0IGNsYXNzIEZpZWxkU2V0IHtcbiAgc3RhdGljIHJlYWRvbmx5IHR5cGU6IHN0cmluZyA9ICdGaWVsZFNldCdcbiAgbmFtZTogc3RyaW5nIC8vIGUuZy4gbmV4dE9mS2luRGV0YWlsc1xuICBsYWJlbDogc3RyaW5nIC8vIGUuZy4gTmV4dCBvZiBraW4gZGV0YWlsc1xuICBzdHJ1Y3R1cmU6IChGaWVsZCB8IEZpZWxkU2V0KVtdID0gW11cbiAgdmFsaWRhdGlvbkNvbmRpdGlvbnM6IElWYWxpZGF0aW9uQ29uZGl0aW9uW10gPSBbXVxuICBpc1JlcXVpcmVkOiBUcmlnZ2VyID0gVHJpZ2dlci5BbHdheXNUcnVlXG5cbiAgaXRlbUZvcihkYXRhSWQ6IHN0cmluZyk6IEZpZWxkIHwgRmllbGRTZXQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiBmaW5kSW5Gb3JtKHRoaXMsIGRhdGFJZClcbiAgfVxuXG4gIHdpdGhWYWxpZGF0aW9ucyh2YWxpZGF0aW9uczogSVZhbGlkYXRpb25Db25kaXRpb25bXSk6IEZpZWxkU2V0IHtcbiAgICB0aGlzLnZhbGlkYXRpb25Db25kaXRpb25zLnB1c2goLi4udmFsaWRhdGlvbnMpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHZhbGlkYXRlKGlkOiBzdHJpbmcsIGRhdGE6IGFueSk6IElWYWxpZGF0aW9uRXJyb3JbXSB7XG4gICAgY29uc3QgZm9ybUVycm9ycyA9IHRoaXMudmFsaWRhdGlvbkNvbmRpdGlvbnNcbiAgICAgIC5tYXAoKHZhbGlkYXRpb24pID0+IHZhbGlkYXRpb24udmFsaWRhdGUoaWQsIGRhdGEpKVxuICAgICAgLmZsYXQoKVxuICAgIGNvbnN0IGNvbXBvbmVudEVycm9ycyA9IHRoaXMuc3RydWN0dXJlXG4gICAgICAubWFwKChjb21wb25lbnQpID0+XG4gICAgICAgIGNvbXBvbmVudC52YWxpZGF0ZShjb21wb25lbnQubmFtZSwgZGF0YVtjb21wb25lbnQubmFtZV0pXG4gICAgICApXG4gICAgICAuZmxhdCgpXG5cbiAgICByZXR1cm4gZm9ybUVycm9ycy5jb25jYXQoY29tcG9uZW50RXJyb3JzKVxuICB9XG5cbiAgdG9Kc29uKCk6IFN0b3JlZFBsYWluT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgdHlwZTogRmllbGRTZXQudHlwZSxcbiAgICAgIGxhYmVsOiB0aGlzLmxhYmVsLFxuICAgICAgc3RydWN0dXJlOiB0aGlzLnN0cnVjdHVyZS5tYXAoKHMpID0+IHMudG9Kc29uKCkpLFxuICAgICAgdmFsaWRhdGlvbkNvbmRpdGlvbnM6IHRoaXMudmFsaWRhdGlvbkNvbmRpdGlvbnMubWFwKCh2KSA9PiB2LnRvSnNvbigpKSxcbiAgICAgIGlzUmVxdWlyZWQ6XG4gICAgICAgIHRoaXMuaXNSZXF1aXJlZCBpbnN0YW5jZW9mIFRydWVUcmlnZ2VyQ29uZGl0aW9uXG4gICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgOiB0aGlzLmlzUmVxdWlyZWQudHJpZ2dlci50b0pzb24oKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihqc29uOiBhbnksIGJ1aWxkZXJzOiBCdWlsZGVyW10pOiBGaWVsZFNldCB7XG4gICAgY29uc3QgZmllbGRTZXQgPSBuZXcgRmllbGRTZXQoKVxuICAgIHJldHVybiBGaWVsZFNldC5fcG9wdWxhdGVGcm9tSnNvbihmaWVsZFNldCwganNvbiwgYnVpbGRlcnMpXG4gIH1cblxuICBzdGF0aWMgX3BvcHVsYXRlRnJvbUpzb24oXG4gICAgZmllbGRTZXQ6IEZpZWxkU2V0LFxuICAgIGpzb246IGFueSxcbiAgICBidWlsZGVyczogQnVpbGRlcltdXG4gICk6IEZpZWxkU2V0IHtcbiAgICBmaWVsZFNldC5uYW1lID0ganNvbi5uYW1lXG4gICAgZmllbGRTZXQubGFiZWwgPSBqc29uLmxhYmVsXG4gICAgZmllbGRTZXQudmFsaWRhdGlvbkNvbmRpdGlvbnMgPSBqc29uLnZhbGlkYXRpb25Db25kaXRpb25zLm1hcCgodkpzb24pID0+XG4gICAgICBidWlsZGVycy5maW5kKCh2KSA9PiB2LnR5cGUgPT09IHZKc29uLm5hbWUpPy5mcm9tSnNvbih2SnNvbiwgYnVpbGRlcnMpXG4gICAgKVxuICAgIGNvbnN0IHRyaWdnZXIgPVxuICAgICAganNvbi5pc1JlcXVpcmVkID09PSB0cnVlXG4gICAgICAgID8gbmV3IFRydWVUcmlnZ2VyQ29uZGl0aW9uKClcbiAgICAgICAgOiBidWlsZGVyc1xuICAgICAgICAgICAgLmZpbmQoKGR0KSA9PiBkdC50eXBlID09PSBqc29uLmlzUmVxdWlyZWQudHlwZSlcbiAgICAgICAgICAgID8uZnJvbUpzb24oanNvbi5pc1JlcXVpcmVkKVxuXG4gICAgaWYgKCF0cmlnZ2VyKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICBgQ291bGQgbm90IGZpbmQgdHJpZ2dlciBidWlsZGVyICcke2pzb24uaXNSZXF1aXJlZC50eXBlfSdgXG4gICAgICApXG4gICAgfVxuXG4gICAgZmllbGRTZXQuaXNSZXF1aXJlZCA9IG5ldyBUcmlnZ2VyKGpzb24ubmFtZSwgdHJpZ2dlciBhcyBJVHJpZ2dlckNvbmRpdGlvbilcbiAgICBmaWVsZFNldC5zdHJ1Y3R1cmUgPSBqc29uLnN0cnVjdHVyZS5tYXAoKHZhbE9iaikgPT5cbiAgICAgIHZhbE9iai50eXBlID09PSBGaWVsZC5uYW1lXG4gICAgICAgID8gRmllbGQuZnJvbUpzb24odmFsT2JqLCBidWlsZGVycylcbiAgICAgICAgOiBGaWVsZFNldC5mcm9tSnNvbih2YWxPYmosIGJ1aWxkZXJzKVxuICAgIClcbiAgICByZXR1cm4gZmllbGRTZXRcbiAgfVxufVxuIiwiaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSAnLi9zY2hlbWEnXG5pbXBvcnQgeyBTdG9yZWRQbGFpbk9iamVjdCwgQnVpbGRlciwgSVZpZXcgfSBmcm9tICcuL0B0eXBlcydcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gJy4vdmFsaWRhdG9yJ1xuaW1wb3J0IHsgZmluZEluRm9ybSB9IGZyb20gJy4vdXRpbHMvZmluZCdcblxuZXhwb3J0IHR5cGUgRm9ybURhdGEgPSBhbnlcblxuLyoqXG4gKiBPYmplY3QgdGhhdCBjb250YWlucyB0aGUgZGF0YSBhbG9uZ3NpZGUgdGhlIHNjaGVtYVxuICovXG5leHBvcnQgY2xhc3MgRm9ybSB7XG4gIHN0YXRpYyB0eXBlID0gJ0Zvcm0nXG5cbiAgbmFtZTogc3RyaW5nXG4gIGRhdGE6IEZvcm1EYXRhID0ge31cbiAgc2NoZW1hOiBTY2hlbWFcbiAgdmlldzogSVZpZXdcblxuICBnZXQgdmFsaWRhdG9yKCk6IFZhbGlkYXRvciB7XG4gICAgcmV0dXJuIG5ldyBWYWxpZGF0b3IodGhpcy5zY2hlbWEudmFsaWRhdGlvbkNvbmRpdGlvbnMsIHVuZGVmaW5lZCwgdGhpcy5kYXRhKVxuICB9XG5cbiAgdmFsaWRhdG9yRm9yKGRhdGFJZDogc3RyaW5nKTogVmFsaWRhdG9yIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCB2YWxpZGF0aW9uQ29uZGl0aW9ucyA9IGZpbmRJbkZvcm0odGhpcy5zY2hlbWEsIGRhdGFJZClcbiAgICAgID8udmFsaWRhdGlvbkNvbmRpdGlvbnNcbiAgICByZXR1cm4gdmFsaWRhdGlvbkNvbmRpdGlvbnNcbiAgICAgID8gbmV3IFZhbGlkYXRvcih2YWxpZGF0aW9uQ29uZGl0aW9ucywgZGF0YUlkKVxuICAgICAgOiB1bmRlZmluZWRcbiAgfVxuXG4gIHRvSnNvbigpOiBTdG9yZWRQbGFpbk9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEZvcm0udHlwZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIGRhdGE6IHRoaXMuZGF0YSxcbiAgICAgIHNjaGVtYTogdGhpcy5zY2hlbWEudG9Kc29uKCksXG4gICAgICB2aWV3OiB0aGlzLnZpZXcudG9Kc29uKClcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oanNvbjogYW55LCBidWlsZGVyczogQnVpbGRlcltdKTogRm9ybSB7XG4gICAgY29uc3QgZm9ybSA9IG5ldyBGb3JtKClcbiAgICBmb3JtLmRhdGEgPSBqc29uLmRhdGFcbiAgICBmb3JtLm5hbWUgPSBqc29uLm5hbWVcbiAgICBmb3JtLnNjaGVtYSA9IFNjaGVtYS5mcm9tSnNvbihqc29uLnNjaGVtYSwgYnVpbGRlcnMpXG4gICAgY29uc3Qgdmlld0J1aWxkZXIgPSBidWlsZGVycy5maW5kKFxuICAgICAgKGJ1aWxkZXIpID0+IGJ1aWxkZXIudHlwZSA9PT0ganNvbi52aWV3LnR5cGVcbiAgICApXG4gICAgaWYgKCF2aWV3QnVpbGRlcikgdGhyb3cgRXJyb3IoYE1pc3NpbmcgdmlldyBidWlsZGVyICcke2pzb24udmlldy50eXBlfSdgKVxuICAgIGZvcm0udmlldyA9IHZpZXdCdWlsZGVyLmZyb21Kc29uKGpzb24udmlldykgYXMgSVZpZXdcbiAgICByZXR1cm4gZm9ybVxuICB9XG59XG4iLCJpbXBvcnQgeyBJRm9ybXNCdWlsZGVyUGx1Z2luIH0gZnJvbSAnLi4vbWFrZS1mb3JtLWJ1aWxkZXInXG5pbXBvcnQgeyB2ZXJzaW9uLCBuYW1lIH0gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJ1xuXG5leHBvcnQgY29uc3QgZ2RwcjogSUZvcm1zQnVpbGRlclBsdWdpbiA9IHtcbiAgbmFtZTogYGdkcHJgLFxuICBmcm9tUGFja2FnZTogbmFtZSxcbiAgdmVyc2lvbixcbiAgcmVnaXN0ZXIoYnVpbGRlcikge1xuICAgIC8vIEB0b2RvXG4gIH1cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vZ2Rwci1wbHVnaW4nXG4iLCJleHBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJ1xuZXhwb3J0ICogZnJvbSAnLi9mb3JtJ1xuZXhwb3J0ICogZnJvbSAnLi9leGNlcHRpb25zJ1xuZXhwb3J0ICogZnJvbSAnLi9maWVsZCdcbmV4cG9ydCAqIGZyb20gJy4vZmllbGRzZXQnXG5leHBvcnQgKiBmcm9tICcuL3NjaGVtYSdcbmV4cG9ydCAqIGZyb20gJy4vbWFrZS1mb3JtLWJ1aWxkZXInXG5leHBvcnQgKiBmcm9tICcuL0B0eXBlcydcbmV4cG9ydCAqIGZyb20gJy4vY29yZSdcbmV4cG9ydCAqIGZyb20gJy4vZ2RwcidcbmV4cG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMnXG5leHBvcnQgKiBmcm9tICcuL3RyaWdnZXInXG4iLCJpbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJ1xuaW1wb3J0IHsgU3RvcmVkUGxhaW5PYmplY3QsIEJ1aWxkZXIgfSBmcm9tICcuL0B0eXBlcydcbmltcG9ydCB7IFBsdWdpbkRlcGVuZGVuY3kgfSBmcm9tICcuL3BsdWdpbi1kZXBlbmRlbmN5J1xuXG5leHBvcnQgaW50ZXJmYWNlIElGb3Jtc0J1aWxkZXIge1xuICB3aXRoQnVpbGRlcnMoXG4gICAgYnVpbGRlcnM6IEJ1aWxkZXJbXSxcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgZnJvbVBhY2thZ2U6IHN0cmluZyxcbiAgICB2ZXJzaW9uOiBzdHJpbmdcbiAgKVxuICB3aXRoKHBsdWdpbjogSUZvcm1zQnVpbGRlclBsdWdpbik6IHRoaXNcbiAgZnJvbUpzb24oanNvbjogU3RvcmVkUGxhaW5PYmplY3QpOiBGb3JtXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZvcm1zQnVpbGRlclBsdWdpbiB7XG4gIC8qKlxuICAgKiBJZiB0cnVlLCB0aGlzIHBsdWdpbiB3aWxsIGJlIGluY2x1ZGVkIGluIHNlcmlhbGlzZWQgZm9ybSBzY2hlbWEuIFRoaXMgc2lnbmlmaWVzIHRoYXQgdGhlIGZvcm0gY2Fubm90XG4gICAqIGJlIHJlYnVpbHQgZnJvbSBKU09OIHdpdGhvdXQgdGhpcyBwYWNrYWdlXG4gICAqL1xuICBpc0J1aWxkRGVwZW5kZW5jeT86IGJvb2xlYW5cbiAgLyoqXG4gICAqIFRoZSBOUE0gcGFja2FnZSBuYW1lIHRoYXQgY29udGFpbnMgdGhpcyBwbHVnaW4uIExlYXZlIHVuZGVmaW5lZCBpZiBwbHVnaW4gaXMgbm90IGluIGEgcGFja2FnZVxuICAgKi9cbiAgZnJvbVBhY2thZ2U6IHN0cmluZyB8IHVuZGVmaW5lZFxuICAvKipcbiAgICogVGhlIGh1bWFuIHJlYWRhYmxlIG5hbWUgb2YgdGhlIHBsdWdpbi4gZS5nLiAnY29yZScgb3IgJ2NvcmUudmFsaWRhdGlvbnMnXG4gICAqL1xuICBuYW1lOiBzdHJpbmdcbiAgLyoqXG4gICAqIFNlbWFudGljIHZlcnNpb24gLSBtYWpvciByZWxlYXNlcyByZXNlcnZlZCBmb3Igd2hlcmUgZm9ybXMgYnVpbHQgd2l0aCBwcmV2aW91cyB2ZXJzaW9ucyBjYW5ub3QgYmVcbiAgICogYnVpbHQgd2l0aCB0aGlzIG5ldyB2ZXJzaW9uXG4gICAqL1xuICB2ZXJzaW9uOiBzdHJpbmdcbiAgcmVnaXN0ZXIoYnVpbGRlcjogSUZvcm1zQnVpbGRlcik6IHZvaWRcbiAgW2ZpZWxkOiBzdHJpbmddOiBhbnlcbn1cblxuZXhwb3J0IHR5cGUgQnVpbGRlcldpdGhEZXBlbmRlbmN5ID0gQnVpbGRlciAmIHsgX3BhY2thZ2U6IFBsdWdpbkRlcGVuZGVuY3kgfVxuXG5leHBvcnQgY2xhc3MgRm9ybXNCdWlsZGVyIGltcGxlbWVudHMgSUZvcm1zQnVpbGRlciB7XG4gIHByaXZhdGUgYnVpbGRlcnM6IEJ1aWxkZXJXaXRoRGVwZW5kZW5jeVtdID0gW11cblxuICBwbHVnaW5zOiBJRm9ybXNCdWlsZGVyUGx1Z2luW10gPSBbXVxuXG4gIHdpdGhCdWlsZGVycyhcbiAgICBidWlsZGVyczogQnVpbGRlcltdLFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBmcm9tUGFja2FnZTogc3RyaW5nLFxuICAgIHZlcnNpb246IHN0cmluZ1xuICApOiB0aGlzIHtcbiAgICB0aGlzLmJ1aWxkZXJzLnB1c2goXG4gICAgICAuLi5idWlsZGVycy5tYXAoKGJ1aWxkZXI6IEJ1aWxkZXJXaXRoRGVwZW5kZW5jeSkgPT4ge1xuICAgICAgICBidWlsZGVyLl9wYWNrYWdlID0gbmV3IFBsdWdpbkRlcGVuZGVuY3kobmFtZSwgZnJvbVBhY2thZ2UsIHZlcnNpb24pXG4gICAgICAgIHJldHVybiBidWlsZGVyXG4gICAgICB9KVxuICAgIClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgd2l0aChwbHVnaW46IElGb3Jtc0J1aWxkZXJQbHVnaW4pOiB0aGlzIHtcbiAgICBwbHVnaW4ucmVnaXN0ZXIodGhpcylcbiAgICB0aGlzLnBsdWdpbnMucHVzaChwbHVnaW4pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGZyb21Kc29uKGpzb246IFN0b3JlZFBsYWluT2JqZWN0KTogRm9ybSB7XG4gICAgY29uc3QgZm9ybSA9IEZvcm0uZnJvbUpzb24oanNvbiwgdGhpcy5idWlsZGVycylcbiAgICAvLyBPdmVyd3JpdGUgdGhlIG9yaWdpbmFsIGRlcGVuZGVuY2llcyBzaW5jZSBhbnkgbmV3IHBlcnNpc3RlbmNlIHdpbGwgYmUgd2l0aCB0aGUgbmV3IHBsdWdpbiB2ZXJzaW9uc1xuICAgIGZvcm0uc2NoZW1hLmRlcGVuZGVuY2llcyA9IHRoaXMucGx1Z2luc1xuICAgICAgLmZpbHRlcigocGx1Z2luKSA9PiBwbHVnaW4uaXNCdWlsZERlcGVuZGVuY3kpXG4gICAgICAubWFwKFxuICAgICAgICAocGx1Z2luKSA9PlxuICAgICAgICAgIG5ldyBQbHVnaW5EZXBlbmRlbmN5KFxuICAgICAgICAgICAgcGx1Z2luLm5hbWUsXG4gICAgICAgICAgICBwbHVnaW4uZnJvbVBhY2thZ2UgfHwgJycsXG4gICAgICAgICAgICBwbHVnaW4udmVyc2lvblxuICAgICAgICAgIClcbiAgICAgIClcbiAgICByZXR1cm4gZm9ybVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBtYWtlRm9ybUJ1aWxkZXIgPSAoKTogSUZvcm1zQnVpbGRlciA9PiBuZXcgRm9ybXNCdWlsZGVyKClcbiIsImltcG9ydCB7IFN0b3JlZFBsYWluT2JqZWN0IH0gZnJvbSAnLi9AdHlwZXMnXG5cbmV4cG9ydCBjbGFzcyBQbHVnaW5EZXBlbmRlbmN5IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyxcbiAgICBwdWJsaWMgZnJvbVBhY2thZ2U6IHN0cmluZyxcbiAgICBwdWJsaWMgdmVyc2lvbjogc3RyaW5nXG4gICkge31cblxuICB0b0pzb24oKTogU3RvcmVkUGxhaW5PYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBQbHVnaW5EZXBlbmRlbmN5Lm5hbWUsXG4gICAgICBmcm9tUGFja2FnZTogdGhpcy5mcm9tUGFja2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIHZlcnNpb246IHRoaXMudmVyc2lvblxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihqc29uOiBTdG9yZWRQbGFpbk9iamVjdCk6IFBsdWdpbkRlcGVuZGVuY3kge1xuICAgIHJldHVybiBuZXcgUGx1Z2luRGVwZW5kZW5jeShqc29uLm5hbWUsIGpzb24uZnJvbVBhY2thZ2UsIGpzb24udmVyc2lvbilcbiAgfVxufVxuIiwiaW1wb3J0IHsgU2VtVmVyLCBTdG9yZWRQbGFpbk9iamVjdCwgQnVpbGRlciB9IGZyb20gJy4vQHR5cGVzJ1xuaW1wb3J0IHsgRmllbGRTZXQgfSBmcm9tICcuL2ZpZWxkc2V0J1xuaW1wb3J0IHsgUGx1Z2luRGVwZW5kZW5jeSB9IGZyb20gJy4vcGx1Z2luLWRlcGVuZGVuY3knXG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgc3RydWN0dXJlIG9mIGEgZm9ybVxuICovXG5leHBvcnQgY2xhc3MgU2NoZW1hIGV4dGVuZHMgRmllbGRTZXQge1xuICBzdGF0aWMgcmVhZG9ubHkgdHlwZTogc3RyaW5nID0gJ1NjaGVtYSdcblxuICAvKiogRGV0YWlscyBwbHVnaW5zIG5lY2Vzc2FyeSB0byBwcm9jZXNzIHRoaXMgc2NoZW1hICovXG4gIGRlcGVuZGVuY2llczogUGx1Z2luRGVwZW5kZW5jeVtdID0gW11cblxuICAvKiogVGhlIHJldmlzaW9uIHZlcnNpb24gb2YgdGhpcyBzY2hlbWEgKi9cbiAgc2NoZW1hVmVyc2lvbjogU2VtVmVyXG5cbiAgdG9Kc29uKCk6IFN0b3JlZFBsYWluT2JqZWN0IHtcbiAgICBjb25zdCBvYmogPSBzdXBlci50b0pzb24oKVxuICAgIG9iai50eXBlID0gU2NoZW1hLnR5cGVcbiAgICBvYmouc2NoZW1hVmVyc2lvbiA9IHRoaXMuc2NoZW1hVmVyc2lvblxuICAgIG9iai5kZXBlbmRlbmNpZXMgPSB0aGlzLmRlcGVuZGVuY2llcy5tYXAoKGRlcGVuZGVuY3kpID0+XG4gICAgICBkZXBlbmRlbmN5LnRvSnNvbigpXG4gICAgKVxuICAgIHJldHVybiBvYmpcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihqc29uOiBTdG9yZWRQbGFpbk9iamVjdCwgYnVpbGRlcnM6IEJ1aWxkZXJbXSk6IFNjaGVtYSB7XG4gICAgbGV0IHNjaGVtYSA9IG5ldyBTY2hlbWEoKVxuICAgIHNjaGVtYSA9IHN1cGVyLl9wb3B1bGF0ZUZyb21Kc29uKHNjaGVtYSwganNvbiwgYnVpbGRlcnMpIGFzIFNjaGVtYVxuICAgIHNjaGVtYS5zY2hlbWFWZXJzaW9uID0ganNvbi5zY2hlbWFWZXJzaW9uXG4gICAgc2NoZW1hLm5hbWUgPSBqc29uLm5hbWVcbiAgICBzY2hlbWEuZGVwZW5kZW5jaWVzID0ganNvbi5kZXBlbmRlbmNpZXMubWFwKChkZXBKc29uKSA9PlxuICAgICAgUGx1Z2luRGVwZW5kZW5jeS5mcm9tSnNvbihkZXBKc29uKVxuICAgIClcbiAgICByZXR1cm4gc2NoZW1hXG4gIH1cbn1cbiIsImltcG9ydCB7IElUcmlnZ2VyQ29uZGl0aW9uIH0gZnJvbSAnLi9AdHlwZXMnXG5pbXBvcnQgeyBGb3JtRGF0YSB9IGZyb20gJy4vZm9ybSdcbmltcG9ydCB7IFRydWVUcmlnZ2VyQ29uZGl0aW9uIH0gZnJvbSAnLi9jb3JlL3RyaWdnZXJzL3RydWUnXG5cbmV4cG9ydCBjbGFzcyBUcmlnZ2VyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGRhdGFJZDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHB1YmxpYyB0cmlnZ2VyOiBJVHJpZ2dlckNvbmRpdGlvblxuICApIHt9XG5cbiAgZm9yRGF0YShkYXRhOiBGb3JtRGF0YSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnRyaWdnZXIuaXNUcmlnZ2VyZWQodGhpcy5kYXRhSWQgfHwgJycsIGRhdGEpXG4gIH1cblxuICBzdGF0aWMgQWx3YXlzVHJ1ZTogVHJpZ2dlciA9IG5ldyBUcmlnZ2VyKFxuICAgIHVuZGVmaW5lZCxcbiAgICBuZXcgVHJ1ZVRyaWdnZXJDb25kaXRpb24oKVxuICApXG59XG4iLCJpbXBvcnQgeyBGaWVsZFNldCB9IGZyb20gJy4uL2ZpZWxkc2V0J1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9maWVsZCdcbmltcG9ydCB7IEZvcm1EYXRhIH0gZnJvbSAnLi4vZm9ybSdcbmltcG9ydCB7IGlzTnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnLi90eXBlcydcblxuZXhwb3J0IGNvbnN0IGZpbmRJbkZvcm0gPSAoXG4gIGl0ZW06IEZpZWxkIHwgRmllbGRTZXQsXG4gIG5hbWU6IHN0cmluZ1xuKTogRmllbGQgfCBGaWVsZFNldCB8IHVuZGVmaW5lZCA9PiB7XG4gIGlmIChpdGVtLm5hbWUgPT09IG5hbWUpIHtcbiAgICByZXR1cm4gaXRlbVxuICB9XG4gIGlmIChpdGVtIGluc3RhbmNlb2YgRmllbGQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cbiAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBGaWVsZFNldCkge1xuICAgIGZvciAoY29uc3Qgc3ViSXRlbSBvZiBpdGVtLnN0cnVjdHVyZSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gZmluZEluRm9ybShzdWJJdGVtLCBuYW1lKVxuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBmaW5kSW5EYXRhID0gKFxuICBkYXRhOiBGb3JtRGF0YSxcbiAgZGF0YUlkOiBzdHJpbmdcbik6IEZvcm1EYXRhIHwgdW5kZWZpbmVkID0+IHtcbiAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKGRhdGEpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZGF0YSBpcyBudWxsIG9yIHVuZGVmaW5lZCcpXG4gIH1cblxuICBjb25zdCBfZmluZEluT2JqZWN0ID0gKFxuICAgIG9iajogUmVjb3JkPHN0cmluZywgYW55PixcbiAgICBkYXRhSWQ6IHN0cmluZ1xuICApOiBGb3JtRGF0YSA9PiB7XG4gICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgZGF0YUlkKSkge1xuICAgICAgcmV0dXJuIG9ialtkYXRhSWRdXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBPYmplY3QudmFsdWVzKG9iaikuZmluZChcbiAgICAgICAgKGNoaWxkKSA9PlxuICAgICAgICAgIGNoaWxkICYmXG4gICAgICAgICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKGNoaWxkKSA9PT0gT2JqZWN0LnByb3RvdHlwZSAmJlxuICAgICAgICAgIHR5cGVvZiBfZmluZEluT2JqZWN0KGNoaWxkLCBkYXRhSWQpICE9PSAndW5kZWZpbmVkJ1xuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfZmluZEluT2JqZWN0KGRhdGEsIGRhdGFJZClcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vdHlwZXMnXG4iLCJleHBvcnQgY29uc3QgaXNOdWxsT3JVbmRlZmluZWQgPSAodmFsdWU6IGFueSk6IGJvb2xlYW4gPT5cbiAgdmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJ1xuXG5leHBvcnQgY29uc3QgaXNCb29sZWFuID0gKHZhbHVlOiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nXG5cbmV4cG9ydCBjb25zdCBoYXNQcm9wZXJ0eSA9IChvYmo6IGFueSwgcHJvcDogc3RyaW5nKTogYm9vbGVhbiA9PlxuICB0eXBlb2Ygb2JqICE9PSAndW5kZWZpbmVkJyAmJlxuICBvYmogIT09IG51bGwgJiZcbiAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcClcblxuZXhwb3J0IGNvbnN0IGhhc0xlbmd0aCA9ICh2YWx1ZTogYW55KTogYm9vbGVhbiA9PiBoYXNQcm9wZXJ0eSh2YWx1ZSwgJ2xlbmd0aCcpXG5cbmV4cG9ydCBjb25zdCBpc1N0cmluZyA9ICh2YWx1ZTogYW55KTogYm9vbGVhbiA9PlxuICB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nXG5cbmV4cG9ydCBjb25zdCBpc051bWJlciA9ICh2YWx1ZTogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInXG4iLCJpbXBvcnQgeyBGb3JtRGF0YSB9IGZyb20gJy4vZm9ybSdcbmltcG9ydCB7IElWYWxpZGF0aW9uQ29uZGl0aW9uLCBJVmFsaWRhdGlvbkVycm9yIH0gZnJvbSAnLi9AdHlwZXMnXG5cbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgdmFsaWRhdGlvbkNvbmRpdGlvbnM6IElWYWxpZGF0aW9uQ29uZGl0aW9uW10sXG4gICAgcHVibGljIGRhdGE6IEZvcm1EYXRhID0ge30sXG4gICAgcHVibGljIGRhdGFJZD86IHN0cmluZ1xuICApIHt9XG5cbiAgdmFsaWRhdGUoZGF0YT86IEZvcm1EYXRhKTogSVZhbGlkYXRpb25FcnJvcltdIHtcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB0aGlzLmRhdGEgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdObyBkYXRhIHN1cHBsaWVkIGZvciB2YWxpZGF0aW9uJylcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvbkNvbmRpdGlvbnNcbiAgICAgIC5tYXAoKHYpID0+IHYudmFsaWRhdGUodGhpcy5kYXRhSWQsIGRhdGEpKVxuICAgICAgLmZsYXQoKVxuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgbWFrZUZvcm1CdWlsZGVyLCBjb3JlIH0gZnJvbSAnQHRuZ2JsL2Zvcm1zJ1xuaW1wb3J0IHsgcGFnZVZhbGlkYXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zcmMvYnJvd3NlcidcbmltcG9ydCB7IGhvb2tzIH0gZnJvbSAnLi4vdGVtcGxhdGVzJ1xuXG5jb25zdCBidWlsZGVyID0gbWFrZUZvcm1CdWlsZGVyKCkud2l0aChjb3JlKS53aXRoKHBhZ2VWYWxpZGF0aW9uKHsgaG9va3MgfSkpXG5cbndpbmRvd1sndG5nYmwnXSA9IHtcbiAgYnVpbGRlclxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==