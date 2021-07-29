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
        var _a;
        const fieldSet = new FieldSet();
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
    constructor(fromPackage, name, version) {
        this.fromPackage = fromPackage;
        this.name = name;
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
        const schema = _fieldset__WEBPACK_IMPORTED_MODULE_0__.FieldSet.fromJson(json, builders);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9jYWxsLWJpbmQvY2FsbEJvdW5kLmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vbm9kZV9tb2R1bGVzL2NhbGwtYmluZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9kZWZpbmUtcHJvcGVydGllcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9lcy1hYnN0cmFjdC8yMDIwL1JlcXVpcmVPYmplY3RDb2VyY2libGUuanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9ub2RlX21vZHVsZXMvZXMtYWJzdHJhY3QvMjAyMC9Ub1N0cmluZy5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9lcy1hYnN0cmFjdC81L0NoZWNrT2JqZWN0Q29lcmNpYmxlLmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vbm9kZV9tb2R1bGVzL2Zvci1lYWNoL2luZGV4LmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vbm9kZV9tb2R1bGVzL2Z1bmN0aW9uLWJpbmQvaW1wbGVtZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9ub2RlX21vZHVsZXMvZnVuY3Rpb24tYmluZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9nZXQtaW50cmluc2ljL2luZGV4LmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vbm9kZV9tb2R1bGVzL2hhcy1zeW1ib2xzL2luZGV4LmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vbm9kZV9tb2R1bGVzL2hhcy1zeW1ib2xzL3NoYW1zLmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vbm9kZV9tb2R1bGVzL2hhcy9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9ub2RlX21vZHVsZXMvaXMtY2FsbGFibGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9ub2RlX21vZHVsZXMvbm9kZS1wb2x5Z2xvdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pc0FyZ3VtZW50cy5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9zdHJpbmcucHJvdG90eXBlLnRyaW0vaW1wbGVtZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9ub2RlX21vZHVsZXMvc3RyaW5nLnByb3RvdHlwZS50cmltL2luZGV4LmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vbm9kZV9tb2R1bGVzL3N0cmluZy5wcm90b3R5cGUudHJpbS9wb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy9zdHJpbmcucHJvdG90eXBlLnRyaW0vc2hpbS5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL25vZGVfbW9kdWxlcy93YXJuaW5nL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uL3NyYy90ZW1wbGF0ZXMvZmF2b3VyaXRlLWNvbG91ci50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4vc3JjL3RlbXBsYXRlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL3NyYy9icm93c2VyL2luZGV4LnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vc3JjL2Jyb3dzZXIvcGFnZS12YWxpZGF0aW9uLXBsdWdpbi50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL3NyYy90ZW1wbGF0ZXMvZXJyb3ItYmxvY2sudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9zcmMvdGVtcGxhdGVzL2luZGV4LnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vc3JjL3RlbXBsYXRlcy9uZXctcGFzc3dvcmQudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvY29yZS9jb3JlLXBsdWdpbi50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL2Zvcm1zL3NyYy9jb3JlL2luZGV4LnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL2NvcmUvdHJpZ2dlcnMvZXF1YWxzLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL2NvcmUvdHJpZ2dlcnMvZmFsc2UudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvY29yZS90cmlnZ2Vycy9pbmRleC50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL2Zvcm1zL3NyYy9jb3JlL3RyaWdnZXJzL3RydWUudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvY29yZS92YWxpZGF0aW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL2Zvcm1zL3NyYy9jb3JlL3ZhbGlkYXRpb25zL21pbi1sZW5ndGgudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvY29yZS92aWV3cy9iYXNpYy1mb3JtLXZpZXcudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvY29yZS92aWV3cy9pbmRleC50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL2Zvcm1zL3NyYy9leGNlcHRpb25zLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL2ZpZWxkLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL2ZpZWxkc2V0LnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL2Zvcm0udHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvZ2Rwci9nZHByLXBsdWdpbi50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL2Zvcm1zL3NyYy9nZHByL2luZGV4LnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL2luZGV4LnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL21ha2UtZm9ybS1idWlsZGVyLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL3BsdWdpbi1kZXBlbmRlbmN5LnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL3NjaGVtYS50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzLy4uL2Zvcm1zL3NyYy90cmlnZ2VyLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi4vZm9ybXMvc3JjL3V0aWxzL2ZpbmQudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvdXRpbHMvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy8uLi9mb3Jtcy9zcmMvdmFsaWRhdG9yLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLW51bmp1Y2tzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy1udW5qdWNrcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtbnVuanVja3MvLi9zcmMvYnJvd3Nlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7O0FBRWIsbUJBQW1CLG1CQUFPLENBQUMsc0VBQWU7O0FBRTFDLGVBQWUsbUJBQU8sQ0FBQyx1REFBSTs7QUFFM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDZGE7O0FBRWIsV0FBVyxtQkFBTyxDQUFDLHNFQUFlO0FBQ2xDLG1CQUFtQixtQkFBTyxDQUFDLHNFQUFlOztBQUUxQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUSxXQUFXO0FBQ3ZDLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQ0FBMkMsbUJBQW1CO0FBQzlELENBQUM7QUFDRCxDQUFDLG9CQUFvQjtBQUNyQjs7Ozs7Ozs7Ozs7QUM5Q2E7O0FBRWIsV0FBVyxtQkFBTyxDQUFDLGtFQUFhO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGdDQUFnQztBQUNoRTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQSxFQUFFLFlBQVk7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixrQkFBa0I7QUFDbEM7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7Ozs7Ozs7OztBQ3pEYTs7QUFFYix1SUFBcUQ7Ozs7Ozs7Ozs7O0FDRnhDOztBQUViLG1CQUFtQixtQkFBTyxDQUFDLHNFQUFlOztBQUUxQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNkYTs7QUFFYixtQkFBbUIsbUJBQU8sQ0FBQyxzRUFBZTs7QUFFMUM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2JhOztBQUViLGlCQUFpQixtQkFBTyxDQUFDLGtFQUFhOztBQUV0QztBQUNBOztBQUVBO0FBQ0EsdUNBQXVDLFNBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3Q0FBd0MsU0FBUztBQUNqRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQzdEYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTs7QUFFQSw4RUFBOEUscUNBQXFDLEVBQUU7O0FBRXJIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQ25EYTs7QUFFYixxQkFBcUIsbUJBQU8sQ0FBQyxrRkFBa0I7O0FBRS9DOzs7Ozs7Ozs7OztBQ0phOztBQUViOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsK0NBQStDO0FBQ2hGLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsRUFBRTtBQUNGLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUEsaUJBQWlCLG1CQUFPLENBQUMsa0VBQWE7O0FBRXRDLHNEQUFzRCxvQkFBb0IsR0FBRzs7QUFFN0U7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRCxFQUFFO0FBQ0YsZ0RBQWdEO0FBQ2hELEVBQUU7QUFDRixzREFBc0Q7QUFDdEQsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVcsbUJBQU8sQ0FBQyxzRUFBZTtBQUNsQyxhQUFhLG1CQUFPLENBQUMsc0RBQUs7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhCQUE4QixrQkFBa0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3pVYTs7QUFFYjtBQUNBLG9CQUFvQixtQkFBTyxDQUFDLDhEQUFTOztBQUVyQztBQUNBLHdDQUF3QyxjQUFjO0FBQ3RELG9DQUFvQyxjQUFjO0FBQ2xELDZDQUE2QyxjQUFjO0FBQzNELHlDQUF5QyxjQUFjOztBQUV2RDtBQUNBOzs7Ozs7Ozs7OztBQ1phOztBQUViO0FBQ0E7QUFDQSwwRkFBMEYsY0FBYztBQUN4RywyQ0FBMkMsYUFBYTs7QUFFeEQ7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGNBQWM7O0FBRTdDLGlFQUFpRSxjQUFjO0FBQy9FLG9FQUFvRSxjQUFjOztBQUVsRjtBQUNBLGdDQUFnQyxjQUFjO0FBQzlDO0FBQ0Esc0NBQXNDLGNBQWM7O0FBRXBELDBEQUEwRCxjQUFjO0FBQ3hFLDhEQUE4RCxjQUFjOztBQUU1RTtBQUNBO0FBQ0EsbUJBQW1CLGNBQWMsRUFBRTtBQUNuQywwRUFBMEUsY0FBYzs7QUFFeEYsd0dBQXdHLGNBQWM7O0FBRXRIO0FBQ0EsNENBQTRDLGNBQWM7O0FBRTFELDZEQUE2RCxjQUFjOztBQUUzRTtBQUNBO0FBQ0Esc0VBQXNFLGNBQWM7QUFDcEY7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUN6Q2E7O0FBRWIsV0FBVyxtQkFBTyxDQUFDLHNFQUFlOztBQUVsQzs7Ozs7Ozs7Ozs7QUNKYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVSxFQUFFO0FBQ3hDLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0YsZUFBZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRCQUE0QixjQUFjO0FBQzFDO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQ0FBaUMsYUFBYTtBQUM5QyxlQUFlLGNBQWM7QUFDN0IsaUVBQWlFLGNBQWM7QUFDL0Usd0RBQXdELGFBQWE7QUFDckU7QUFDQTtBQUNBLEdBQUc7QUFDSCxnQ0FBZ0MsY0FBYztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxhQUFhO0FBQzlDLGVBQWUsY0FBYztBQUM3QixpRUFBaUUsY0FBYztBQUMvRSx3REFBd0QsYUFBYTtBQUNyRSx1QkFBdUIsaUNBQWlDO0FBQ3hELDRCQUE0QixjQUFjO0FBQzFDO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFYTs7QUFFYixjQUFjLG1CQUFPLENBQUMsNERBQVU7QUFDaEMsY0FBYyxtQkFBTyxDQUFDLDREQUFTO0FBQy9CLFVBQVUsbUJBQU8sQ0FBQyxzREFBSztBQUN2QixXQUFXLG1CQUFPLENBQUMsc0ZBQXVCOztBQUUxQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFVBQVU7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsMEJBQTBCLFVBQVUsRUFBRTtBQUN0QztBQUNBLDBCQUEwQixzQkFBc0IsRUFBRTtBQUNsRCwwQkFBMEIsd0JBQXdCLEVBQUU7QUFDcEQ7QUFDQTtBQUNBLDJDQUEyQyxVQUFVO0FBQ3JEO0FBQ0EsS0FBSztBQUNMO0FBQ0Esb0JBQW9CLFVBQVU7QUFDOUI7QUFDQSxLQUFLO0FBQ0w7QUFDQSxvQkFBb0IsVUFBVTtBQUM5QjtBQUNBO0FBQ0EsS0FBSztBQUNMLDZCQUE2QixpREFBaUQsRUFBRTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQztBQUNqQzs7QUFFQTtBQUNBLDJDQUEyQztBQUMzQywwQ0FBMEM7O0FBRTFDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDRCQUE0QixPQUFPOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLEtBQUssS0FBSyxjQUFjO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixZQUFZLG9DQUFvQyxlQUFlO0FBQ3pGO0FBQ0E7QUFDQSwwQkFBMEIsWUFBWSxvQ0FBb0MsZUFBZTtBQUN6RjtBQUNBO0FBQ0EsMEJBQTBCLFlBQVk7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EscURBQXFELDZCQUE2Qjs7QUFFbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtEQUErRCxtQkFBbUI7QUFDbEY7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLEtBQUs7QUFDdEMsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsS0FBSztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxLQUFLO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxLQUFLO0FBQ3RDLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxLQUFLO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsS0FBSztBQUN0QyxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsY0FBYztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsU0FBUztBQUMzQztBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ3RZYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLDBFQUFlLEVBQUU7QUFDdkM7QUFDQSwwQ0FBMEMsaUJBQWlCO0FBQzNELHVEQUF1RDtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxjQUFjO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsbUJBQW1CO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixtQkFBbUI7QUFDckM7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0Isc0JBQXNCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN6SGE7O0FBRWI7QUFDQSxhQUFhLG1CQUFPLENBQUMsMEVBQWU7O0FBRXBDO0FBQ0EsNENBQTRDLG9CQUFvQixFQUFFLEdBQUcsbUJBQU8sQ0FBQyxnRkFBa0I7O0FBRS9GOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDL0JhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2hCYTs7QUFFYiw2QkFBNkIsbUJBQU8sQ0FBQyxvSEFBeUM7QUFDOUUsZUFBZSxtQkFBTyxDQUFDLHdGQUEyQjtBQUNsRCxnQkFBZ0IsbUJBQU8sQ0FBQyw0RUFBcUI7QUFDN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDZmE7O0FBRWIsZUFBZSxtQkFBTyxDQUFDLDhEQUFXO0FBQ2xDLGFBQWEsbUJBQU8sQ0FBQyw4RUFBbUI7O0FBRXhDLHFCQUFxQixtQkFBTyxDQUFDLDBGQUFrQjtBQUMvQyxrQkFBa0IsbUJBQU8sQ0FBQyw4RUFBWTtBQUN0QyxXQUFXLG1CQUFPLENBQUMsc0VBQVE7O0FBRTNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7Ozs7Ozs7Ozs7QUNqQmE7O0FBRWIscUJBQXFCLG1CQUFPLENBQUMsMEZBQWtCOztBQUUvQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDWGE7O0FBRWIsYUFBYSxtQkFBTyxDQUFDLDhFQUFtQjtBQUN4QyxrQkFBa0IsbUJBQU8sQ0FBQyw4RUFBWTs7QUFFdEM7QUFDQTtBQUNBLDJCQUEyQixpQkFBaUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7Ozs7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLGFBQW9COztBQUVsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixXQUFXO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixXQUFXO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0R5RTtBQUVsRSxNQUFNLElBQUksR0FBd0I7SUFDdkMsYUFBYSxFQUFFLGtCQUFrQjtJQUNqQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzdCLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQXFCO1FBRTVFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFOztZQUN4QyxNQUFNLFVBQVUsR0FBRyxJQUFJLG9EQUFVLENBQUMsTUFBTSxDQUFDO1lBQ3pDLFVBQUk7aUJBQ0QsWUFBWSxDQUFDLE1BQU0sQ0FBQywwQ0FDbkIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQzFCLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELFVBQVUsQ0FBQyxNQUFNLEVBQUU7UUFDckIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEIrRDtBQUV6RCxNQUFNLEtBQUssR0FBRyxDQUFDLG1EQUFtQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGRjtBQUNhOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEb0I7QUFDZDtBQUNUO0FBMkIzQyxNQUFNLGNBQWMsR0FBRyxDQUM1QixJQUFpQyxFQUNaLEVBQUU7SUFDdkIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFHLGtEQUFjLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7SUFFeEQsT0FBTztRQUNMLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsV0FBVyxFQUFFLCtDQUFJO1FBQ2pCLE9BQU87UUFDUCxRQUFRO1lBQ04sbUVBQXlCLEdBQUc7Z0JBQzFCLE1BQU0sS0FBSyxHQUFHLENBQUMsU0FBa0MsRUFBUSxFQUFFO29CQUN6RCxJQUFJLFNBQVMsWUFBWSw4Q0FBSSxFQUFFO3dCQUM3QixLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztxQkFDeEI7eUJBQU0sSUFBSSxTQUFTLFlBQVksa0RBQVEsRUFBRTt3QkFDeEMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO3FCQUNuQzt5QkFBTSxJQUFJLFNBQVMsWUFBWSwrQ0FBSyxFQUFFO3dCQUNyQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUNyQixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsS0FBSyxTQUFTLENBQUMsUUFBUSxDQUNwRDt3QkFDRCxJQUFJLENBQUMsSUFBSTs0QkFBRSxNQUFNLEtBQUssQ0FBQyxzQkFBc0IsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUNsRSxJQUFJLENBQUMsUUFBUSxDQUFDOzRCQUNaLE1BQU0sRUFBRSxTQUFTLENBQUMsSUFBSTs0QkFDdEIsSUFBSSxFQUFFLElBQUk7eUJBQ1gsQ0FBQztxQkFDSDt5QkFBTTt3QkFDTCxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxTQUFTLEVBQUUsQ0FBQztxQkFDbEU7Z0JBQ0gsQ0FBQztnQkFDRCxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ2IsQ0FBQztRQUNILENBQUM7S0FDRjtBQUNILENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzlETSxNQUFNLFVBQVU7SUFJckIsWUFBWSxJQUFZO1FBRnhCLFdBQU0sR0FBYSxFQUFFO1FBR25CLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FDcEMsSUFBSSxHQUFHLGVBQWUsQ0FDSDtJQUN2QixDQUFDO0lBRUQsR0FBRyxDQUFDLEtBQWE7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUU7SUFDbEIsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTTthQUNqQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUM7YUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNmLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCZ0Q7QUFFMUMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxrREFBb0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZZO0FBRTVELE1BQU0sU0FBUyxHQUF3QjtJQUNyQyxhQUFhLEVBQUUsY0FBYztJQUM3QixRQUFRLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzdCLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7UUFFeEQsSUFBSSxjQUFjLEdBQUcsS0FBSztRQUUxQixNQUFNLGFBQWEsR0FBRyxHQUFHLEVBQUU7O1lBQ3pCLE1BQU0sVUFBVSxHQUFHLElBQUksZ0RBQVUsQ0FBQyxNQUFNLENBQUM7WUFFekMsSUFBSSxjQUFjLEVBQUU7Z0JBQ2xCLFVBQUk7cUJBQ0QsWUFBWSxDQUFDLE1BQU0sQ0FBQywwQ0FDbkIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQ2hDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUdqRSxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTtvQkFDckQsVUFBVSxDQUFDLEdBQUcsQ0FDWixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzt3QkFDbEIsWUFBWSxFQUFFLGlEQUFpRDtxQkFDaEUsQ0FBQyxDQUNIO2lCQUNGO2FBQ0Y7WUFDRCxVQUFVLENBQUMsTUFBTSxFQUFFO1FBQ3JCLENBQUM7UUFFRCxNQUFNLE9BQU8sR0FBRyxHQUFHLEVBQUU7WUFDbkIsY0FBYyxHQUFHLElBQUk7UUFDdkIsQ0FBQztRQUVELGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNoQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztZQUMxQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQztRQUNsRCxDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRCxpRUFBZSxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEM4QjtBQUNHO0FBQ2Y7QUFDbUI7QUFFdEQsTUFBTSxJQUFJLEdBSWI7SUFDRixJQUFJLEVBQUUsTUFBTTtJQUNaLE9BQU87SUFDUCxXQUFXLEVBQUUsK0NBQU87SUFDcEIsUUFBUSxDQUFDLE9BQU87UUFDZCxPQUFPLENBQUMsWUFBWSxDQUNsQjtZQUNFLEdBQUcsZ0VBQXNCO1lBQ3pCLEdBQUcsbUVBQTRCO1lBQy9CLEdBQUcsb0RBQWdCO1NBQ3BCLEVBQ0QsTUFBTSxFQUNOLCtDQUFPLEVBQ1Asa0RBQU8sQ0FDUjtJQUNILENBQUM7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLE9BQU87UUFDUCxXQUFXLEVBQUUsK0NBQU87UUFDcEIsUUFBUSxDQUFDLE9BQU87WUFDZCxPQUFPLENBQUMsWUFBWSxDQUNsQixnRUFBc0IsRUFDdEIsa0JBQWtCLEVBQ2xCLCtDQUFPLEVBQ1Asa0RBQU8sQ0FDUjtRQUNILENBQUM7S0FDRjtJQUNELFlBQVksRUFBRTtRQUNaLElBQUksRUFBRSxtQkFBbUI7UUFDekIsT0FBTztRQUNQLFdBQVcsRUFBRSwrQ0FBTztRQUNwQixRQUFRLENBQUMsT0FBTztZQUNkLE9BQU8sQ0FBQyxZQUFZLENBQ2xCLG1FQUE0QixFQUM1QixtQkFBbUIsRUFDbkIsK0NBQU8sRUFDUCxrREFBTyxDQUNSO1FBQ0gsQ0FBQztLQUNGO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFlBQVk7UUFDbEIsT0FBTztRQUNQLFdBQVcsRUFBRSwrQ0FBTztRQUNwQixRQUFRLENBQUMsT0FBTztZQUNkLE9BQU8sQ0FBQyxZQUFZLENBQUMsb0RBQWdCLEVBQUUsWUFBWSxFQUFFLCtDQUFPLEVBQUUsa0RBQU8sQ0FBQztRQUN4RSxDQUFDO0tBQ0Y7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUQ0QjtBQUNIO0FBQ0c7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNJZ0I7QUFDSjtBQUNoQjtBQU96QixvQ0FBSztBQUNFLE1BQU0sc0JBQXNCO0lBR2pDLFlBQ1MsSUFBVyxFQUNYLFFBQWUsc0JBQXNCLENBQUMsSUFBSTtRQUQxQyxTQUFJLEdBQUosSUFBSSxDQUFPO1FBQ1gsVUFBSyxHQUFMLEtBQUssQ0FBcUM7SUFDaEQsQ0FBQztJQUVKLFdBQVcsQ0FBQyxNQUFjLEVBQUUsSUFBYztRQUN4QyxNQUFNLElBQUksR0FBRyxtREFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDO1lBQzNDLENBQUMsQ0FBQyx1REFBVSxDQUNSLElBQUksRUFDSixJQUFJLENBQUMsSUFBSSxLQUFLLHNCQUFzQixDQUFDLElBQUk7Z0JBQ3ZDLENBQUMsQ0FBQyxNQUFNO2dCQUNSLENBQUMsQ0FBRSxJQUFJLENBQUMsSUFBMkIsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUNuRDtZQUNILENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSTtRQUNiLE1BQU0sS0FBSyxHQUFHLG1EQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUM7WUFDN0MsQ0FBQyxDQUFDLHVEQUFVLENBQ1IsSUFBSSxFQUNKLElBQUksQ0FBQyxLQUFLLEtBQUssc0JBQXNCLENBQUMsSUFBSTtnQkFDeEMsQ0FBQyxDQUFDLE1BQU07Z0JBQ1IsQ0FBQyxDQUFFLElBQUksQ0FBQyxLQUE0QixDQUFDLE1BQU0sSUFBSSxFQUFFLENBQ3BEO1lBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLO1FBQ2QsT0FBTyxJQUFJLEtBQUssS0FBSztJQUN2QixDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU87WUFDTCxJQUFJLEVBQUUsc0JBQXNCLENBQUMsSUFBSTtZQUNqQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDbEI7SUFDSCxDQUFDOztBQWpDTSwyQkFBSSxHQUFHLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRTtBQW9DOUIsTUFBTSxPQUFPLEdBQTZCO0lBQy9DLElBQUksRUFBRSxzQkFBc0IsQ0FBQyxJQUFJO0lBQ2pDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUztRQUN0QixPQUFPLElBQUksc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzFELENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7OztBQ3BETSxNQUFNLHFCQUFxQjtJQUNoQyxXQUFXO1FBQ1QsT0FBTyxLQUFLO0lBQ2QsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixDQUFDLElBQUksRUFBRTtJQUM3QyxDQUFDO0NBQ0Y7QUFFTSxNQUFNLE9BQU8sR0FBNkI7SUFDL0MsSUFBSSxFQUFFLHFCQUFxQixDQUFDLElBQUk7SUFDaEMsUUFBUTtRQUNOLE9BQU8sSUFBSSxxQkFBcUIsRUFBRTtJQUNwQyxDQUFDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCb0U7QUFDRztBQUNHO0FBTTFFO0FBQ00sTUFBTSw0QkFBNEIsR0FBRztJQUMxQywwQ0FBVztJQUNYLDJDQUFZO0lBQ1osNENBQWE7Q0FDZDs7Ozs7Ozs7Ozs7Ozs7OztBQ1BNLE1BQU0sb0JBQW9CO0lBQy9CLFdBQVc7UUFDVCxPQUFPLElBQUk7SUFDYixDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU8sRUFBRSxJQUFJLEVBQUUsb0JBQW9CLENBQUMsSUFBSSxFQUFFO0lBQzVDLENBQUM7Q0FDRjtBQUVNLE1BQU0sT0FBTyxHQUE2QjtJQUMvQyxJQUFJLEVBQUUsb0JBQW9CLENBQUMsSUFBSTtJQUMvQixRQUFRO1FBQ04sT0FBTyxJQUFJLG9CQUFvQixFQUFFO0lBQ25DLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQjhFO0FBRWpEO0FBQ3ZCLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxnREFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNITztBQWF4RCxNQUFNLG1CQUFtQjtJQUc5QixZQUFZLE1BQWM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNO0lBQ3RCLENBQUM7SUFFRCxRQUFRLENBQUMsRUFBVSxFQUFFLElBQWM7UUFDakMsSUFBSSxDQUFDLCtEQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsc0RBQVEsQ0FBRSxJQUFvQixDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3ZFLE9BQU8sRUFBRTtTQUNWO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDN0IsT0FBTztnQkFDTDtvQkFDRSxNQUFNLEVBQUUsRUFBRTtvQkFDVixVQUFVLEVBQUUsbUJBQW1CLENBQUMsSUFBSTtvQkFDcEMsS0FBSyxFQUFFLFdBQVc7b0JBQ2xCLFlBQVksRUFBRSxlQUFlLG1CQUFtQixDQUFDLElBQUksWUFBWTtvQkFDakUsYUFBYSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7aUJBQ3ZDO2FBQ0Y7U0FDRjthQUFNO1lBQ0wsT0FBTyxFQUFFO1NBQ1Y7SUFDSCxDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU87WUFDTCxJQUFJLEVBQUUsbUJBQW1CLENBQUMsSUFBSTtZQUM5QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEI7SUFDSCxDQUFDO0NBQ0Y7QUFFTSxNQUFNLE9BQU8sR0FBZ0M7SUFDbEQsSUFBSSxFQUFFLG1CQUFtQixDQUFDLElBQUk7SUFDOUIsUUFBUSxDQUFDLEdBQXNCO1FBQzdCLE1BQU0sVUFBVSxHQUFHLElBQUksbUJBQW1CLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUN0RCxPQUFPLFVBQVU7SUFDbkIsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5Q3dDO0FBRWxDLE1BQU0sYUFBYTtJQU14QixJQUFXLFlBQVksQ0FBQyxZQUF3QjtRQUM5QyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVk7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLDBDQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUVELElBQVcsWUFBWTtRQUNyQixPQUFPLElBQUksQ0FBQyxhQUFhO0lBQzNCLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBbUI7UUFDM0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDaEUsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPO1lBQ0wsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJO1lBQ3hCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWE7U0FDakM7SUFDSCxDQUFDO0NBQ0Y7QUFFTSxNQUFNLE9BQU8sR0FBaUI7SUFDbkMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJO0lBQ3hCLFFBQVEsQ0FBQyxJQUF1QjtRQUM5QixNQUFNLElBQUksR0FBRyxJQUFJLGFBQWEsRUFBRTtRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNO1FBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVk7UUFDckMsT0FBTyxJQUFJO0lBQ2IsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdDeUQ7QUFFbEM7QUFDakIsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLHFEQUFPLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ0hsQyxNQUFNLGVBQWdCLFNBQVEsV0FBVztDQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBUTtBQUN4QjtBQVFRO0FBS3BDLE1BQU0sS0FBSztJQUdoQixZQUNTLElBQVksRUFDWixLQUFhLEVBQ2IsUUFBZ0IsRUFDaEIsYUFBc0Isd0RBQWtCO1FBSHhDLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUNoQixlQUFVLEdBQVYsVUFBVSxDQUE4QjtRQU5qRCx5QkFBb0IsR0FBMkIsRUFBRTtJQU85QyxDQUFDO0lBRUosUUFBUSxDQUFDLEVBQVUsRUFBRSxJQUFjO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7SUFDMUUsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtZQUNoQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RFLFVBQVUsRUFDUixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sWUFBWSxxRUFBb0I7Z0JBQ3JELENBQUMsQ0FBQyxJQUFJO2dCQUNOLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7U0FDdkM7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFTLEVBQUUsUUFBbUI7O1FBQzVDLElBQUkseURBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNwQyxNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDO1FBQzdELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztZQUMzQyxNQUFNLElBQUksS0FBSyxDQUNiLDREQUE0RCxDQUM3RDtRQUNILElBQUkseURBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDO1FBQzFELElBQUkseURBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDO1FBQzNELElBQUkseURBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDO1FBRTlELE1BQU0saUJBQWlCLEdBQ3JCLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSTtZQUN0QixDQUFDLENBQUMsSUFBSSxxRUFBb0IsRUFBRTtZQUM1QixDQUFDLENBQUMsY0FBUTtpQkFDTCxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsMENBQzdDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ25DLElBQUksT0FBTyxpQkFBaUIsS0FBSyxXQUFXO1lBQzFDLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLFVBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxVQUFVLDBDQUFFLElBQUksa0JBQWtCLENBQUM7UUFFM0UsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQ3JCLElBQUksQ0FBQyxJQUFJLEVBQ1QsSUFBSSxDQUFDLEtBQUssRUFDVixJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksNkNBQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGlCQUFzQyxDQUFDLENBQy9EO1FBRUQsS0FBSyxDQUFDLG9CQUFvQixHQUFHLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNwRSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFLLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxJQUFJLEVBQUM7WUFDNUQsSUFBSSxDQUFDLE9BQU87Z0JBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxJQUFJLGtCQUFrQixDQUFDO1lBQy9ELE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDO1FBQzFDLENBQUMsQ0FBQztRQUNGLE9BQU8sS0FBSztJQUNkLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pFOEI7QUFDSTtBQUN3QjtBQUNsQjtBQUtsQyxNQUFNLFFBQVE7SUFBckI7UUFJRSxjQUFTLEdBQXlCLEVBQUU7UUFDcEMseUJBQW9CLEdBQTJCLEVBQUU7UUFDakQsZUFBVSxHQUFZLHdEQUFrQjtJQWtFMUMsQ0FBQztJQWhFQyxPQUFPLENBQUMsTUFBYztRQUNwQixPQUFPLHVEQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztJQUNqQyxDQUFDO0lBRUQsZUFBZSxDQUFDLFdBQW1DO1FBQ2pELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUM7UUFDOUMsT0FBTyxJQUFJO0lBQ2IsQ0FBQztJQUVELFFBQVEsQ0FBQyxFQUFVLEVBQUUsSUFBUztRQUM1QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsb0JBQW9CO2FBQ3pDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDbEQsSUFBSSxFQUFFO1FBQ1QsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVM7YUFDbkMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FDakIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDekQ7YUFDQSxJQUFJLEVBQUU7UUFFVCxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO0lBQzNDLENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtZQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDaEQsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RFLFVBQVUsRUFDUixJQUFJLENBQUMsVUFBVSxZQUFZLHFFQUFvQjtnQkFDN0MsQ0FBQyxDQUFDLElBQUk7Z0JBQ04sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtTQUN2QztJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQVMsRUFBRSxRQUFtQjs7UUFDNUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUU7UUFDL0IsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSTtRQUN6QixRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLO1FBQzNCLFFBQVEsQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsV0FDdEUscUJBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQywwQ0FBRSxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUN2RTtRQUNELE1BQU0sT0FBTyxHQUNYLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSTtZQUN0QixDQUFDLENBQUMsSUFBSSxxRUFBb0IsRUFBRTtZQUM1QixDQUFDLENBQUMsY0FBUTtpQkFDTCxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsMENBQzdDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBRW5DLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixNQUFNLElBQUksU0FBUyxDQUNqQixtQ0FBbUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FDM0Q7U0FDRjtRQUVELFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSw2Q0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBNEIsQ0FBQztRQUMxRSxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FDakQsTUFBTSxDQUFDLElBQUksS0FBSyw4Q0FBVTtZQUN4QixDQUFDLENBQUMsa0RBQWMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FDeEM7UUFDRCxPQUFPLFFBQVE7SUFDakIsQ0FBQzs7QUF0RWUsYUFBSSxHQUFXLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCVjtBQUVNO0FBQ0U7QUFPbEMsTUFBTSxJQUFJO0lBQWpCO1FBSUUsU0FBSSxHQUFhLEVBQUU7SUFzQ3JCLENBQUM7SUFsQ0MsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLGlEQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQztJQUM5RSxDQUFDO0lBRUQsWUFBWSxDQUFDLE1BQWM7O1FBQ3pCLE1BQU0sb0JBQW9CLEdBQUcsNkRBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQywwQ0FDeEQsb0JBQW9CO1FBQ3hCLE9BQU8sb0JBQW9CO1lBQ3pCLENBQUMsQ0FBQyxJQUFJLGlEQUFTLENBQUMsb0JBQW9CLEVBQUUsTUFBTSxDQUFDO1lBQzdDLENBQUMsQ0FBQyxTQUFTO0lBQ2YsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQzVCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtTQUN6QjtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQVMsRUFBRSxRQUFtQjtRQUM1QyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUk7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxvREFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDO1FBQ3BELE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQy9CLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUM3QztRQUNELElBQUksQ0FBQyxXQUFXO1lBQUUsTUFBTSxLQUFLLENBQUMseUJBQXlCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUM7UUFDekUsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQVU7UUFDcEQsT0FBTyxJQUFJO0lBQ2IsQ0FBQzs7QUF4Q00sU0FBSSxHQUFHLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7QUNWNEI7QUFFM0MsTUFBTSxJQUFJLEdBQXdCO0lBQ3ZDLElBQUksRUFBRSxNQUFNO0lBQ1osV0FBVyxFQUFFLCtDQUFJO0lBQ2pCLE9BQU87SUFDUCxRQUFRLENBQUMsT0FBTztJQUVoQixDQUFDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWNEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ1A7QUFDTTtBQUNMO0FBQ0c7QUFDRjtBQUNXO0FBQ1g7QUFDRjtBQUNBO0FBQ1U7QUFBZjtBQUNROzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYSTtBQUV5QjtBQXNDL0MsTUFBTSxZQUFZO0lBQXpCO1FBQ1UsYUFBUSxHQUE0QixFQUFFO1FBRTlDLFlBQU8sR0FBMEIsRUFBRTtJQXNDckMsQ0FBQztJQXBDQyxZQUFZLENBQ1YsUUFBbUIsRUFDbkIsSUFBWSxFQUNaLFdBQW1CLEVBQ25CLE9BQWU7UUFFZixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDaEIsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBOEIsRUFBRSxFQUFFO1lBQ2pELE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxnRUFBZ0IsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQztZQUNuRSxPQUFPLE9BQU87UUFDaEIsQ0FBQyxDQUFDLENBQ0g7UUFDRCxPQUFPLElBQUk7SUFDYixDQUFDO0lBRUQsSUFBSSxDQUFDLE1BQTJCO1FBQzlCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN6QixPQUFPLElBQUk7SUFDYixDQUFDO0lBRUQsUUFBUSxDQUFDLElBQXVCO1FBQzlCLE1BQU0sSUFBSSxHQUFHLGdEQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7UUFFL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU87YUFDcEMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUM7YUFDNUMsR0FBRyxDQUNGLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FDVCxJQUFJLGdFQUFnQixDQUNsQixNQUFNLENBQUMsSUFBSSxFQUNYLE1BQU0sQ0FBQyxXQUFXLElBQUksRUFBRSxFQUN4QixNQUFNLENBQUMsT0FBTyxDQUNmLENBQ0o7UUFDSCxPQUFPLElBQUk7SUFDYixDQUFDO0NBQ0Y7QUFFTSxNQUFNLGVBQWUsR0FBRyxHQUFrQixFQUFFLENBQUMsSUFBSSxZQUFZLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztBQ2pGL0QsTUFBTSxnQkFBZ0I7SUFDM0IsWUFDUyxXQUFtQixFQUNuQixJQUFZLEVBQ1osT0FBZTtRQUZmLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQ25CLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixZQUFPLEdBQVAsT0FBTyxDQUFRO0lBQ3JCLENBQUM7SUFFSixNQUFNO1FBQ0osT0FBTztZQUNMLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJO1lBQzNCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEI7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUF1QjtRQUNyQyxPQUFPLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEUsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCb0M7QUFDaUI7QUFLL0MsTUFBTSxNQUFPLFNBQVEsK0NBQVE7SUFBcEM7O1FBSUUsaUJBQVksR0FBdUIsRUFBRTtJQXlCdkMsQ0FBQztJQXBCQyxNQUFNO1FBQ0osTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRTtRQUMxQixHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJO1FBQ3RCLEdBQUcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWE7UUFDdEMsR0FBRyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQ3RELFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FDcEI7UUFDRCxPQUFPLEdBQUc7SUFDWixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUF1QixFQUFFLFFBQW1CO1FBQzFELE1BQU0sTUFBTSxHQUFHLHdEQUFpQixDQUFDLElBQUksRUFBRSxRQUFRLENBQVc7UUFDMUQsTUFBTSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYTtRQUN6QyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJO1FBQ3ZCLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUN0RCx5RUFBeUIsQ0FBQyxPQUFPLENBQUMsQ0FDbkM7UUFFRCxPQUFPLE1BQU07SUFDZixDQUFDOztBQTNCZSxXQUFJLEdBQVcsUUFBUTs7Ozs7Ozs7Ozs7Ozs7OztBQ05rQjtBQUVwRCxNQUFNLE9BQU87SUFDbEIsWUFDUyxNQUEwQixFQUMxQixPQUEwQjtRQUQxQixXQUFNLEdBQU4sTUFBTSxDQUFvQjtRQUMxQixZQUFPLEdBQVAsT0FBTyxDQUFtQjtJQUNoQyxDQUFDO0lBRUosT0FBTyxDQUFDLElBQWM7UUFDcEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUM7SUFDMUQsQ0FBQzs7QUFFTSxrQkFBVSxHQUFZLElBQUksT0FBTyxDQUN0QyxTQUFTLEVBQ1QsSUFBSSxxRUFBb0IsRUFBRSxDQUMzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCbUM7QUFDTjtBQUVXO0FBRXBDLE1BQU0sVUFBVSxHQUFHLENBQ3hCLElBQXNCLEVBQ3RCLElBQVksRUFDa0IsRUFBRTtJQUNoQyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO1FBQ3RCLE9BQU8sSUFBSTtLQUNaO0lBQ0QsSUFBSSxJQUFJLFlBQVkseUNBQUssRUFBRTtRQUN6QixPQUFPLFNBQVM7S0FDakI7SUFDRCxJQUFJLElBQUksWUFBWSwrQ0FBUSxFQUFFO1FBQzVCLEtBQUssTUFBTSxPQUFPLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNwQyxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQztZQUN4QyxJQUFJLE1BQU0sRUFBRTtnQkFDVixPQUFPLE1BQU07YUFDZDtTQUNGO0tBQ0Y7QUFDSCxDQUFDO0FBRU0sTUFBTSxVQUFVLEdBQUcsQ0FDeEIsSUFBYyxFQUNkLE1BQWMsRUFDUSxFQUFFO0lBQ3hCLElBQUkseURBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDM0IsTUFBTSxJQUFJLFNBQVMsQ0FBQywyQkFBMkIsQ0FBQztLQUNqRDtJQUVELE1BQU0sYUFBYSxHQUFHLENBQ3BCLEdBQXdCLEVBQ3hCLE1BQWMsRUFDSixFQUFFO1FBQ1osSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDM0MsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDO1NBQ25CO2FBQU07WUFDTCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUM1QixDQUFDLEtBQUssRUFBRSxFQUFFLENBQ1IsS0FBSztnQkFDTCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLE1BQU0sQ0FBQyxTQUFTO2dCQUNqRCxPQUFPLGFBQWEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssV0FBVyxDQUN0RDtTQUNGO0lBQ0gsQ0FBQztJQUVELE9BQU8sYUFBYSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7QUFDcEMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbERzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBaEIsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEtBQVUsRUFBVyxFQUFFLENBQ3ZELEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVztBQUV6QyxNQUFNLFNBQVMsR0FBRyxDQUFDLEtBQVUsRUFBVyxFQUFFLENBQUMsT0FBTyxLQUFLLEtBQUssU0FBUztBQUVyRSxNQUFNLFdBQVcsR0FBRyxDQUFDLEdBQVEsRUFBRSxJQUFZLEVBQVcsRUFBRSxDQUM3RCxPQUFPLEdBQUcsS0FBSyxXQUFXO0lBQzFCLEdBQUcsS0FBSyxJQUFJO0lBQ1osTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7QUFFMUMsTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFVLEVBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDO0FBRXZFLE1BQU0sUUFBUSxHQUFHLENBQUMsS0FBVSxFQUFXLEVBQUUsQ0FDOUMsT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssWUFBWSxNQUFNO0FBRS9DLE1BQU0sUUFBUSxHQUFHLENBQUMsS0FBVSxFQUFXLEVBQUUsQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFROzs7Ozs7Ozs7Ozs7Ozs7QUNabkUsTUFBTSxTQUFTO0lBQ3BCLFlBQ1Msb0JBQTRDLEVBQzVDLE9BQWlCLEVBQUUsRUFDbkIsTUFBZTtRQUZmLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBd0I7UUFDNUMsU0FBSSxHQUFKLElBQUksQ0FBZTtRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUFTO0lBQ3JCLENBQUM7SUFFSixRQUFRLENBQUMsSUFBZTtRQUN0QixJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVcsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQ25FLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQWlDLENBQUM7U0FDdkQ7UUFDRCxPQUFPLElBQUksQ0FBQyxvQkFBb0I7YUFDN0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDekMsSUFBSSxFQUFFO0lBQ1gsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNsQkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGdDQUFnQyxZQUFZO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7O0FDTm9EO0FBQ0k7QUFDcEI7QUFFcEMsTUFBTSxPQUFPLEdBQUcsNkRBQWUsRUFBRSxDQUFDLElBQUksQ0FBQyw4Q0FBSSxDQUFDLENBQUMsSUFBSSxDQUFDLDREQUFjLENBQUMsRUFBRSxLQUFLLGlEQUFFLENBQUMsQ0FBQztBQUU1RSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUc7SUFDaEIsT0FBTztDQUNSIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnLi8nKTtcblxudmFyICRpbmRleE9mID0gY2FsbEJpbmQoR2V0SW50cmluc2ljKCdTdHJpbmcucHJvdG90eXBlLmluZGV4T2YnKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJvdW5kSW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHR2YXIgaW50cmluc2ljID0gR2V0SW50cmluc2ljKG5hbWUsICEhYWxsb3dNaXNzaW5nKTtcblx0aWYgKHR5cGVvZiBpbnRyaW5zaWMgPT09ICdmdW5jdGlvbicgJiYgJGluZGV4T2YobmFtZSwgJy5wcm90b3R5cGUuJykgPiAtMSkge1xuXHRcdHJldHVybiBjYWxsQmluZChpbnRyaW5zaWMpO1xuXHR9XG5cdHJldHVybiBpbnRyaW5zaWM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdnZXQtaW50cmluc2ljJyk7XG5cbnZhciAkYXBwbHkgPSBHZXRJbnRyaW5zaWMoJyVGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHklJyk7XG52YXIgJGNhbGwgPSBHZXRJbnRyaW5zaWMoJyVGdW5jdGlvbi5wcm90b3R5cGUuY2FsbCUnKTtcbnZhciAkcmVmbGVjdEFwcGx5ID0gR2V0SW50cmluc2ljKCclUmVmbGVjdC5hcHBseSUnLCB0cnVlKSB8fCBiaW5kLmNhbGwoJGNhbGwsICRhcHBseSk7XG5cbnZhciAkZ09QRCA9IEdldEludHJpbnNpYygnJU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IlJywgdHJ1ZSk7XG52YXIgJGRlZmluZVByb3BlcnR5ID0gR2V0SW50cmluc2ljKCclT2JqZWN0LmRlZmluZVByb3BlcnR5JScsIHRydWUpO1xudmFyICRtYXggPSBHZXRJbnRyaW5zaWMoJyVNYXRoLm1heCUnKTtcblxuaWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHR0cnkge1xuXHRcdCRkZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IHZhbHVlOiAxIH0pO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0Ly8gSUUgOCBoYXMgYSBicm9rZW4gZGVmaW5lUHJvcGVydHlcblx0XHQkZGVmaW5lUHJvcGVydHkgPSBudWxsO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJpbmQob3JpZ2luYWxGdW5jdGlvbikge1xuXHR2YXIgZnVuYyA9ICRyZWZsZWN0QXBwbHkoYmluZCwgJGNhbGwsIGFyZ3VtZW50cyk7XG5cdGlmICgkZ09QRCAmJiAkZGVmaW5lUHJvcGVydHkpIHtcblx0XHR2YXIgZGVzYyA9ICRnT1BEKGZ1bmMsICdsZW5ndGgnKTtcblx0XHRpZiAoZGVzYy5jb25maWd1cmFibGUpIHtcblx0XHRcdC8vIG9yaWdpbmFsIGxlbmd0aCwgcGx1cyB0aGUgcmVjZWl2ZXIsIG1pbnVzIGFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyAoYWZ0ZXIgdGhlIHJlY2VpdmVyKVxuXHRcdFx0JGRlZmluZVByb3BlcnR5KFxuXHRcdFx0XHRmdW5jLFxuXHRcdFx0XHQnbGVuZ3RoJyxcblx0XHRcdFx0eyB2YWx1ZTogMSArICRtYXgoMCwgb3JpZ2luYWxGdW5jdGlvbi5sZW5ndGggLSAoYXJndW1lbnRzLmxlbmd0aCAtIDEpKSB9XG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZnVuYztcbn07XG5cbnZhciBhcHBseUJpbmQgPSBmdW5jdGlvbiBhcHBseUJpbmQoKSB7XG5cdHJldHVybiAkcmVmbGVjdEFwcGx5KGJpbmQsICRhcHBseSwgYXJndW1lbnRzKTtcbn07XG5cbmlmICgkZGVmaW5lUHJvcGVydHkpIHtcblx0JGRlZmluZVByb3BlcnR5KG1vZHVsZS5leHBvcnRzLCAnYXBwbHknLCB7IHZhbHVlOiBhcHBseUJpbmQgfSk7XG59IGVsc2Uge1xuXHRtb2R1bGUuZXhwb3J0cy5hcHBseSA9IGFwcGx5QmluZDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgPSByZXF1aXJlKCdvYmplY3Qta2V5cycpO1xudmFyIGhhc1N5bWJvbHMgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2woJ2ZvbycpID09PSAnc3ltYm9sJztcblxudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBjb25jYXQgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0O1xudmFyIG9yaWdEZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxudmFyIGlzRnVuY3Rpb24gPSBmdW5jdGlvbiAoZm4pIHtcblx0cmV0dXJuIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0ci5jYWxsKGZuKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn07XG5cbnZhciBhcmVQcm9wZXJ0eURlc2NyaXB0b3JzU3VwcG9ydGVkID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgb2JqID0ge307XG5cdHRyeSB7XG5cdFx0b3JpZ0RlZmluZVByb3BlcnR5KG9iaiwgJ3gnLCB7IGVudW1lcmFibGU6IGZhbHNlLCB2YWx1ZTogb2JqIH0pO1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFycywgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRmb3IgKHZhciBfIGluIG9iaikgeyAvLyBqc2NzOmlnbm9yZSBkaXNhbGxvd1VudXNlZFZhcmlhYmxlc1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gb2JqLnggPT09IG9iajtcblx0fSBjYXRjaCAoZSkgeyAvKiB0aGlzIGlzIElFIDguICovXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59O1xudmFyIHN1cHBvcnRzRGVzY3JpcHRvcnMgPSBvcmlnRGVmaW5lUHJvcGVydHkgJiYgYXJlUHJvcGVydHlEZXNjcmlwdG9yc1N1cHBvcnRlZCgpO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lLCB2YWx1ZSwgcHJlZGljYXRlKSB7XG5cdGlmIChuYW1lIGluIG9iamVjdCAmJiAoIWlzRnVuY3Rpb24ocHJlZGljYXRlKSB8fCAhcHJlZGljYXRlKCkpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGlmIChzdXBwb3J0c0Rlc2NyaXB0b3JzKSB7XG5cdFx0b3JpZ0RlZmluZVByb3BlcnR5KG9iamVjdCwgbmFtZSwge1xuXHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHR2YWx1ZTogdmFsdWUsXG5cdFx0XHR3cml0YWJsZTogdHJ1ZVxuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdG9iamVjdFtuYW1lXSA9IHZhbHVlO1xuXHR9XG59O1xuXG52YXIgZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIChvYmplY3QsIG1hcCkge1xuXHR2YXIgcHJlZGljYXRlcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDoge307XG5cdHZhciBwcm9wcyA9IGtleXMobWFwKTtcblx0aWYgKGhhc1N5bWJvbHMpIHtcblx0XHRwcm9wcyA9IGNvbmNhdC5jYWxsKHByb3BzLCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG1hcCkpO1xuXHR9XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRkZWZpbmVQcm9wZXJ0eShvYmplY3QsIHByb3BzW2ldLCBtYXBbcHJvcHNbaV1dLCBwcmVkaWNhdGVzW3Byb3BzW2ldXSk7XG5cdH1cbn07XG5cbmRlZmluZVByb3BlcnRpZXMuc3VwcG9ydHNEZXNjcmlwdG9ycyA9ICEhc3VwcG9ydHNEZXNjcmlwdG9ycztcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVQcm9wZXJ0aWVzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLzUvQ2hlY2tPYmplY3RDb2VyY2libGUnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyICRTdHJpbmcgPSBHZXRJbnRyaW5zaWMoJyVTdHJpbmclJyk7XG52YXIgJFR5cGVFcnJvciA9IEdldEludHJpbnNpYygnJVR5cGVFcnJvciUnKTtcblxuLy8gaHR0cHM6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXRvc3RyaW5nXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gVG9TdHJpbmcoYXJndW1lbnQpIHtcblx0aWYgKHR5cGVvZiBhcmd1bWVudCA9PT0gJ3N5bWJvbCcpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgYSBTeW1ib2wgdmFsdWUgdG8gYSBzdHJpbmcnKTtcblx0fVxuXHRyZXR1cm4gJFN0cmluZyhhcmd1bWVudCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnZ2V0LWludHJpbnNpYycpO1xuXG52YXIgJFR5cGVFcnJvciA9IEdldEludHJpbnNpYygnJVR5cGVFcnJvciUnKTtcblxuLy8gaHR0cDovLzI2Mi5lY21hLWludGVybmF0aW9uYWwub3JnLzUuMS8jc2VjLTkuMTBcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBDaGVja09iamVjdENvZXJjaWJsZSh2YWx1ZSwgb3B0TWVzc2FnZSkge1xuXHRpZiAodmFsdWUgPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKG9wdE1lc3NhZ2UgfHwgKCdDYW5ub3QgY2FsbCBtZXRob2Qgb24gJyArIHZhbHVlKSk7XG5cdH1cblx0cmV0dXJuIHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCdpcy1jYWxsYWJsZScpO1xuXG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIGZvckVhY2hBcnJheSA9IGZ1bmN0aW9uIGZvckVhY2hBcnJheShhcnJheSwgaXRlcmF0b3IsIHJlY2VpdmVyKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGFycmF5LCBpKSkge1xuICAgICAgICAgICAgaWYgKHJlY2VpdmVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRvcihhcnJheVtpXSwgaSwgYXJyYXkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRvci5jYWxsKHJlY2VpdmVyLCBhcnJheVtpXSwgaSwgYXJyYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIGZvckVhY2hTdHJpbmcgPSBmdW5jdGlvbiBmb3JFYWNoU3RyaW5nKHN0cmluZywgaXRlcmF0b3IsIHJlY2VpdmVyKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHN0cmluZy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAvLyBubyBzdWNoIHRoaW5nIGFzIGEgc3BhcnNlIHN0cmluZy5cbiAgICAgICAgaWYgKHJlY2VpdmVyID09IG51bGwpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yKHN0cmluZy5jaGFyQXQoaSksIGksIHN0cmluZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVyYXRvci5jYWxsKHJlY2VpdmVyLCBzdHJpbmcuY2hhckF0KGkpLCBpLCBzdHJpbmcpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIGZvckVhY2hPYmplY3QgPSBmdW5jdGlvbiBmb3JFYWNoT2JqZWN0KG9iamVjdCwgaXRlcmF0b3IsIHJlY2VpdmVyKSB7XG4gICAgZm9yICh2YXIgayBpbiBvYmplY3QpIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrKSkge1xuICAgICAgICAgICAgaWYgKHJlY2VpdmVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRvcihvYmplY3Rba10sIGssIG9iamVjdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwocmVjZWl2ZXIsIG9iamVjdFtrXSwgaywgb2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBmb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChsaXN0LCBpdGVyYXRvciwgdGhpc0FyZykge1xuICAgIGlmICghaXNDYWxsYWJsZShpdGVyYXRvcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaXRlcmF0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuXG4gICAgdmFyIHJlY2VpdmVyO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDMpIHtcbiAgICAgICAgcmVjZWl2ZXIgPSB0aGlzQXJnO1xuICAgIH1cblxuICAgIGlmICh0b1N0ci5jYWxsKGxpc3QpID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgIGZvckVhY2hBcnJheShsaXN0LCBpdGVyYXRvciwgcmVjZWl2ZXIpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGZvckVhY2hTdHJpbmcobGlzdCwgaXRlcmF0b3IsIHJlY2VpdmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3JFYWNoT2JqZWN0KGxpc3QsIGl0ZXJhdG9yLCByZWNlaXZlcik7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmb3JFYWNoO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBlc2xpbnQgbm8taW52YWxpZC10aGlzOiAxICovXG5cbnZhciBFUlJPUl9NRVNTQUdFID0gJ0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kIGNhbGxlZCBvbiBpbmNvbXBhdGlibGUgJztcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgZnVuY1R5cGUgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQodGhhdCkge1xuICAgIHZhciB0YXJnZXQgPSB0aGlzO1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSAnZnVuY3Rpb24nIHx8IHRvU3RyLmNhbGwodGFyZ2V0KSAhPT0gZnVuY1R5cGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihFUlJPUl9NRVNTQUdFICsgdGFyZ2V0KTtcbiAgICB9XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgICB2YXIgYm91bmQ7XG4gICAgdmFyIGJpbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBib3VuZCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRhcmdldC5hcHBseShcbiAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoT2JqZWN0KHJlc3VsdCkgPT09IHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQuYXBwbHkoXG4gICAgICAgICAgICAgICAgdGhhdCxcbiAgICAgICAgICAgICAgICBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBib3VuZExlbmd0aCA9IE1hdGgubWF4KDAsIHRhcmdldC5sZW5ndGggLSBhcmdzLmxlbmd0aCk7XG4gICAgdmFyIGJvdW5kQXJncyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm91bmRMZW5ndGg7IGkrKykge1xuICAgICAgICBib3VuZEFyZ3MucHVzaCgnJCcgKyBpKTtcbiAgICB9XG5cbiAgICBib3VuZCA9IEZ1bmN0aW9uKCdiaW5kZXInLCAncmV0dXJuIGZ1bmN0aW9uICgnICsgYm91bmRBcmdzLmpvaW4oJywnKSArICcpeyByZXR1cm4gYmluZGVyLmFwcGx5KHRoaXMsYXJndW1lbnRzKTsgfScpKGJpbmRlcik7XG5cbiAgICBpZiAodGFyZ2V0LnByb3RvdHlwZSkge1xuICAgICAgICB2YXIgRW1wdHkgPSBmdW5jdGlvbiBFbXB0eSgpIHt9O1xuICAgICAgICBFbXB0eS5wcm90b3R5cGUgPSB0YXJnZXQucHJvdG90eXBlO1xuICAgICAgICBib3VuZC5wcm90b3R5cGUgPSBuZXcgRW1wdHkoKTtcbiAgICAgICAgRW1wdHkucHJvdG90eXBlID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gYm91bmQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgfHwgaW1wbGVtZW50YXRpb247XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1bmRlZmluZWQ7XG5cbnZhciAkU3ludGF4RXJyb3IgPSBTeW50YXhFcnJvcjtcbnZhciAkRnVuY3Rpb24gPSBGdW5jdGlvbjtcbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbnZhciBnZXRFdmFsbGVkQ29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZXhwcmVzc2lvblN5bnRheCkge1xuXHR0cnkge1xuXHRcdHJldHVybiAkRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiOyByZXR1cm4gKCcgKyBleHByZXNzaW9uU3ludGF4ICsgJykuY29uc3RydWN0b3I7JykoKTtcblx0fSBjYXRjaCAoZSkge31cbn07XG5cbnZhciAkZ09QRCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5pZiAoJGdPUEQpIHtcblx0dHJ5IHtcblx0XHQkZ09QRCh7fSwgJycpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0JGdPUEQgPSBudWxsOyAvLyB0aGlzIGlzIElFIDgsIHdoaWNoIGhhcyBhIGJyb2tlbiBnT1BEXG5cdH1cbn1cblxudmFyIHRocm93VHlwZUVycm9yID0gZnVuY3Rpb24gKCkge1xuXHR0aHJvdyBuZXcgJFR5cGVFcnJvcigpO1xufTtcbnZhciBUaHJvd1R5cGVFcnJvciA9ICRnT1BEXG5cdD8gKGZ1bmN0aW9uICgpIHtcblx0XHR0cnkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9ucywgbm8tY2FsbGVyLCBuby1yZXN0cmljdGVkLXByb3BlcnRpZXNcblx0XHRcdGFyZ3VtZW50cy5jYWxsZWU7IC8vIElFIDggZG9lcyBub3QgdGhyb3cgaGVyZVxuXHRcdFx0cmV0dXJuIHRocm93VHlwZUVycm9yO1xuXHRcdH0gY2F0Y2ggKGNhbGxlZVRocm93cykge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Ly8gSUUgOCB0aHJvd3Mgb24gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihhcmd1bWVudHMsICcnKVxuXHRcdFx0XHRyZXR1cm4gJGdPUEQoYXJndW1lbnRzLCAnY2FsbGVlJykuZ2V0O1xuXHRcdFx0fSBjYXRjaCAoZ09QRHRocm93cykge1xuXHRcdFx0XHRyZXR1cm4gdGhyb3dUeXBlRXJyb3I7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KCkpXG5cdDogdGhyb3dUeXBlRXJyb3I7XG5cbnZhciBoYXNTeW1ib2xzID0gcmVxdWlyZSgnaGFzLXN5bWJvbHMnKSgpO1xuXG52YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHguX19wcm90b19fOyB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvXG5cbnZhciBuZWVkc0V2YWwgPSB7fTtcblxudmFyIFR5cGVkQXJyYXkgPSB0eXBlb2YgVWludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBnZXRQcm90byhVaW50OEFycmF5KTtcblxudmFyIElOVFJJTlNJQ1MgPSB7XG5cdCclQWdncmVnYXRlRXJyb3IlJzogdHlwZW9mIEFnZ3JlZ2F0ZUVycm9yID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEFnZ3JlZ2F0ZUVycm9yLFxuXHQnJUFycmF5JSc6IEFycmF5LFxuXHQnJUFycmF5QnVmZmVyJSc6IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBcnJheUJ1ZmZlcixcblx0JyVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90byhbXVtTeW1ib2wuaXRlcmF0b3JdKCkpIDogdW5kZWZpbmVkLFxuXHQnJUFzeW5jRnJvbVN5bmNJdGVyYXRvclByb3RvdHlwZSUnOiB1bmRlZmluZWQsXG5cdCclQXN5bmNGdW5jdGlvbiUnOiBuZWVkc0V2YWwsXG5cdCclQXN5bmNHZW5lcmF0b3IlJzogbmVlZHNFdmFsLFxuXHQnJUFzeW5jR2VuZXJhdG9yRnVuY3Rpb24lJzogbmVlZHNFdmFsLFxuXHQnJUFzeW5jSXRlcmF0b3JQcm90b3R5cGUlJzogbmVlZHNFdmFsLFxuXHQnJUF0b21pY3MlJzogdHlwZW9mIEF0b21pY3MgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQXRvbWljcyxcblx0JyVCaWdJbnQlJzogdHlwZW9mIEJpZ0ludCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBCaWdJbnQsXG5cdCclQm9vbGVhbiUnOiBCb29sZWFuLFxuXHQnJURhdGFWaWV3JSc6IHR5cGVvZiBEYXRhVmlldyA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBEYXRhVmlldyxcblx0JyVEYXRlJSc6IERhdGUsXG5cdCclZGVjb2RlVVJJJSc6IGRlY29kZVVSSSxcblx0JyVkZWNvZGVVUklDb21wb25lbnQlJzogZGVjb2RlVVJJQ29tcG9uZW50LFxuXHQnJWVuY29kZVVSSSUnOiBlbmNvZGVVUkksXG5cdCclZW5jb2RlVVJJQ29tcG9uZW50JSc6IGVuY29kZVVSSUNvbXBvbmVudCxcblx0JyVFcnJvciUnOiBFcnJvcixcblx0JyVldmFsJSc6IGV2YWwsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXZhbFxuXHQnJUV2YWxFcnJvciUnOiBFdmFsRXJyb3IsXG5cdCclRmxvYXQzMkFycmF5JSc6IHR5cGVvZiBGbG9hdDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmxvYXQzMkFycmF5LFxuXHQnJUZsb2F0NjRBcnJheSUnOiB0eXBlb2YgRmxvYXQ2NEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZsb2F0NjRBcnJheSxcblx0JyVGaW5hbGl6YXRpb25SZWdpc3RyeSUnOiB0eXBlb2YgRmluYWxpemF0aW9uUmVnaXN0cnkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmluYWxpemF0aW9uUmVnaXN0cnksXG5cdCclRnVuY3Rpb24lJzogJEZ1bmN0aW9uLFxuXHQnJUdlbmVyYXRvckZ1bmN0aW9uJSc6IG5lZWRzRXZhbCxcblx0JyVJbnQ4QXJyYXklJzogdHlwZW9mIEludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQ4QXJyYXksXG5cdCclSW50MTZBcnJheSUnOiB0eXBlb2YgSW50MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQxNkFycmF5LFxuXHQnJUludDMyQXJyYXklJzogdHlwZW9mIEludDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogSW50MzJBcnJheSxcblx0JyVpc0Zpbml0ZSUnOiBpc0Zpbml0ZSxcblx0JyVpc05hTiUnOiBpc05hTixcblx0JyVJdGVyYXRvclByb3RvdHlwZSUnOiBoYXNTeW1ib2xzID8gZ2V0UHJvdG8oZ2V0UHJvdG8oW11bU3ltYm9sLml0ZXJhdG9yXSgpKSkgOiB1bmRlZmluZWQsXG5cdCclSlNPTiUnOiB0eXBlb2YgSlNPTiA9PT0gJ29iamVjdCcgPyBKU09OIDogdW5kZWZpbmVkLFxuXHQnJU1hcCUnOiB0eXBlb2YgTWFwID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IE1hcCxcblx0JyVNYXBJdGVyYXRvclByb3RvdHlwZSUnOiB0eXBlb2YgTWFwID09PSAndW5kZWZpbmVkJyB8fCAhaGFzU3ltYm9scyA/IHVuZGVmaW5lZCA6IGdldFByb3RvKG5ldyBNYXAoKVtTeW1ib2wuaXRlcmF0b3JdKCkpLFxuXHQnJU1hdGglJzogTWF0aCxcblx0JyVOdW1iZXIlJzogTnVtYmVyLFxuXHQnJU9iamVjdCUnOiBPYmplY3QsXG5cdCclcGFyc2VGbG9hdCUnOiBwYXJzZUZsb2F0LFxuXHQnJXBhcnNlSW50JSc6IHBhcnNlSW50LFxuXHQnJVByb21pc2UlJzogdHlwZW9mIFByb21pc2UgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJvbWlzZSxcblx0JyVQcm94eSUnOiB0eXBlb2YgUHJveHkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJveHksXG5cdCclUmFuZ2VFcnJvciUnOiBSYW5nZUVycm9yLFxuXHQnJVJlZmVyZW5jZUVycm9yJSc6IFJlZmVyZW5jZUVycm9yLFxuXHQnJVJlZmxlY3QlJzogdHlwZW9mIFJlZmxlY3QgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUmVmbGVjdCxcblx0JyVSZWdFeHAlJzogUmVnRXhwLFxuXHQnJVNldCUnOiB0eXBlb2YgU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFNldCxcblx0JyVTZXRJdGVyYXRvclByb3RvdHlwZSUnOiB0eXBlb2YgU2V0ID09PSAndW5kZWZpbmVkJyB8fCAhaGFzU3ltYm9scyA/IHVuZGVmaW5lZCA6IGdldFByb3RvKG5ldyBTZXQoKVtTeW1ib2wuaXRlcmF0b3JdKCkpLFxuXHQnJVNoYXJlZEFycmF5QnVmZmVyJSc6IHR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBTaGFyZWRBcnJheUJ1ZmZlcixcblx0JyVTdHJpbmclJzogU3RyaW5nLFxuXHQnJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90bygnJ1tTeW1ib2wuaXRlcmF0b3JdKCkpIDogdW5kZWZpbmVkLFxuXHQnJVN5bWJvbCUnOiBoYXNTeW1ib2xzID8gU3ltYm9sIDogdW5kZWZpbmVkLFxuXHQnJVN5bnRheEVycm9yJSc6ICRTeW50YXhFcnJvcixcblx0JyVUaHJvd1R5cGVFcnJvciUnOiBUaHJvd1R5cGVFcnJvcixcblx0JyVUeXBlZEFycmF5JSc6IFR5cGVkQXJyYXksXG5cdCclVHlwZUVycm9yJSc6ICRUeXBlRXJyb3IsXG5cdCclVWludDhBcnJheSUnOiB0eXBlb2YgVWludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50OEFycmF5LFxuXHQnJVVpbnQ4Q2xhbXBlZEFycmF5JSc6IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50OENsYW1wZWRBcnJheSxcblx0JyVVaW50MTZBcnJheSUnOiB0eXBlb2YgVWludDE2QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDE2QXJyYXksXG5cdCclVWludDMyQXJyYXklJzogdHlwZW9mIFVpbnQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQzMkFycmF5LFxuXHQnJVVSSUVycm9yJSc6IFVSSUVycm9yLFxuXHQnJVdlYWtNYXAlJzogdHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha01hcCxcblx0JyVXZWFrUmVmJSc6IHR5cGVvZiBXZWFrUmVmID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtSZWYsXG5cdCclV2Vha1NldCUnOiB0eXBlb2YgV2Vha1NldCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrU2V0XG59O1xuXG52YXIgZG9FdmFsID0gZnVuY3Rpb24gZG9FdmFsKG5hbWUpIHtcblx0dmFyIHZhbHVlO1xuXHRpZiAobmFtZSA9PT0gJyVBc3luY0Z1bmN0aW9uJScpIHtcblx0XHR2YWx1ZSA9IGdldEV2YWxsZWRDb25zdHJ1Y3RvcignYXN5bmMgZnVuY3Rpb24gKCkge30nKTtcblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUdlbmVyYXRvckZ1bmN0aW9uJScpIHtcblx0XHR2YWx1ZSA9IGdldEV2YWxsZWRDb25zdHJ1Y3RvcignZnVuY3Rpb24qICgpIHt9Jyk7XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVBc3luY0dlbmVyYXRvckZ1bmN0aW9uJScpIHtcblx0XHR2YWx1ZSA9IGdldEV2YWxsZWRDb25zdHJ1Y3RvcignYXN5bmMgZnVuY3Rpb24qICgpIHt9Jyk7XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVBc3luY0dlbmVyYXRvciUnKSB7XG5cdFx0dmFyIGZuID0gZG9FdmFsKCclQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiUnKTtcblx0XHRpZiAoZm4pIHtcblx0XHRcdHZhbHVlID0gZm4ucHJvdG90eXBlO1xuXHRcdH1cblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUFzeW5jSXRlcmF0b3JQcm90b3R5cGUlJykge1xuXHRcdHZhciBnZW4gPSBkb0V2YWwoJyVBc3luY0dlbmVyYXRvciUnKTtcblx0XHRpZiAoZ2VuKSB7XG5cdFx0XHR2YWx1ZSA9IGdldFByb3RvKGdlbi5wcm90b3R5cGUpO1xuXHRcdH1cblx0fVxuXG5cdElOVFJJTlNJQ1NbbmFtZV0gPSB2YWx1ZTtcblxuXHRyZXR1cm4gdmFsdWU7XG59O1xuXG52YXIgTEVHQUNZX0FMSUFTRVMgPSB7XG5cdCclQXJyYXlCdWZmZXJQcm90b3R5cGUlJzogWydBcnJheUJ1ZmZlcicsICdwcm90b3R5cGUnXSxcblx0JyVBcnJheVByb3RvdHlwZSUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUFycmF5UHJvdG9fZW50cmllcyUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICdlbnRyaWVzJ10sXG5cdCclQXJyYXlQcm90b19mb3JFYWNoJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ2ZvckVhY2gnXSxcblx0JyVBcnJheVByb3RvX2tleXMlJzogWydBcnJheScsICdwcm90b3R5cGUnLCAna2V5cyddLFxuXHQnJUFycmF5UHJvdG9fdmFsdWVzJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ3ZhbHVlcyddLFxuXHQnJUFzeW5jRnVuY3Rpb25Qcm90b3R5cGUlJzogWydBc3luY0Z1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFzeW5jR2VuZXJhdG9yJSc6IFsnQXN5bmNHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVBc3luY0dlbmVyYXRvclByb3RvdHlwZSUnOiBbJ0FzeW5jR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJywgJ3Byb3RvdHlwZSddLFxuXHQnJUJvb2xlYW5Qcm90b3R5cGUlJzogWydCb29sZWFuJywgJ3Byb3RvdHlwZSddLFxuXHQnJURhdGFWaWV3UHJvdG90eXBlJSc6IFsnRGF0YVZpZXcnLCAncHJvdG90eXBlJ10sXG5cdCclRGF0ZVByb3RvdHlwZSUnOiBbJ0RhdGUnLCAncHJvdG90eXBlJ10sXG5cdCclRXJyb3JQcm90b3R5cGUlJzogWydFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVFdmFsRXJyb3JQcm90b3R5cGUlJzogWydFdmFsRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclRmxvYXQzMkFycmF5UHJvdG90eXBlJSc6IFsnRmxvYXQzMkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUZsb2F0NjRBcnJheVByb3RvdHlwZSUnOiBbJ0Zsb2F0NjRBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVGdW5jdGlvblByb3RvdHlwZSUnOiBbJ0Z1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUdlbmVyYXRvciUnOiBbJ0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUdlbmVyYXRvclByb3RvdHlwZSUnOiBbJ0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQ4QXJyYXlQcm90b3R5cGUlJzogWydJbnQ4QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclSW50MTZBcnJheVByb3RvdHlwZSUnOiBbJ0ludDE2QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclSW50MzJBcnJheVByb3RvdHlwZSUnOiBbJ0ludDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclSlNPTlBhcnNlJSc6IFsnSlNPTicsICdwYXJzZSddLFxuXHQnJUpTT05TdHJpbmdpZnklJzogWydKU09OJywgJ3N0cmluZ2lmeSddLFxuXHQnJU1hcFByb3RvdHlwZSUnOiBbJ01hcCcsICdwcm90b3R5cGUnXSxcblx0JyVOdW1iZXJQcm90b3R5cGUlJzogWydOdW1iZXInLCAncHJvdG90eXBlJ10sXG5cdCclT2JqZWN0UHJvdG90eXBlJSc6IFsnT2JqZWN0JywgJ3Byb3RvdHlwZSddLFxuXHQnJU9ialByb3RvX3RvU3RyaW5nJSc6IFsnT2JqZWN0JywgJ3Byb3RvdHlwZScsICd0b1N0cmluZyddLFxuXHQnJU9ialByb3RvX3ZhbHVlT2YlJzogWydPYmplY3QnLCAncHJvdG90eXBlJywgJ3ZhbHVlT2YnXSxcblx0JyVQcm9taXNlUHJvdG90eXBlJSc6IFsnUHJvbWlzZScsICdwcm90b3R5cGUnXSxcblx0JyVQcm9taXNlUHJvdG9fdGhlbiUnOiBbJ1Byb21pc2UnLCAncHJvdG90eXBlJywgJ3RoZW4nXSxcblx0JyVQcm9taXNlX2FsbCUnOiBbJ1Byb21pc2UnLCAnYWxsJ10sXG5cdCclUHJvbWlzZV9yZWplY3QlJzogWydQcm9taXNlJywgJ3JlamVjdCddLFxuXHQnJVByb21pc2VfcmVzb2x2ZSUnOiBbJ1Byb21pc2UnLCAncmVzb2x2ZSddLFxuXHQnJVJhbmdlRXJyb3JQcm90b3R5cGUlJzogWydSYW5nZUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVJlZmVyZW5jZUVycm9yUHJvdG90eXBlJSc6IFsnUmVmZXJlbmNlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclUmVnRXhwUHJvdG90eXBlJSc6IFsnUmVnRXhwJywgJ3Byb3RvdHlwZSddLFxuXHQnJVNldFByb3RvdHlwZSUnOiBbJ1NldCcsICdwcm90b3R5cGUnXSxcblx0JyVTaGFyZWRBcnJheUJ1ZmZlclByb3RvdHlwZSUnOiBbJ1NoYXJlZEFycmF5QnVmZmVyJywgJ3Byb3RvdHlwZSddLFxuXHQnJVN0cmluZ1Byb3RvdHlwZSUnOiBbJ1N0cmluZycsICdwcm90b3R5cGUnXSxcblx0JyVTeW1ib2xQcm90b3R5cGUlJzogWydTeW1ib2wnLCAncHJvdG90eXBlJ10sXG5cdCclU3ludGF4RXJyb3JQcm90b3R5cGUlJzogWydTeW50YXhFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVUeXBlZEFycmF5UHJvdG90eXBlJSc6IFsnVHlwZWRBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVUeXBlRXJyb3JQcm90b3R5cGUlJzogWydUeXBlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclVWludDhBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQ4QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVWludDhDbGFtcGVkQXJyYXlQcm90b3R5cGUlJzogWydVaW50OENsYW1wZWRBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVaW50MTZBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQxNkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQzMkFycmF5UHJvdG90eXBlJSc6IFsnVWludDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVVJJRXJyb3JQcm90b3R5cGUlJzogWydVUklFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVXZWFrTWFwUHJvdG90eXBlJSc6IFsnV2Vha01hcCcsICdwcm90b3R5cGUnXSxcblx0JyVXZWFrU2V0UHJvdG90eXBlJSc6IFsnV2Vha1NldCcsICdwcm90b3R5cGUnXVxufTtcblxudmFyIGJpbmQgPSByZXF1aXJlKCdmdW5jdGlvbi1iaW5kJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnaGFzJyk7XG52YXIgJGNvbmNhdCA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBBcnJheS5wcm90b3R5cGUuY29uY2F0KTtcbnZhciAkc3BsaWNlQXBwbHkgPSBiaW5kLmNhbGwoRnVuY3Rpb24uYXBwbHksIEFycmF5LnByb3RvdHlwZS5zcGxpY2UpO1xudmFyICRyZXBsYWNlID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIFN0cmluZy5wcm90b3R5cGUucmVwbGFjZSk7XG52YXIgJHN0clNsaWNlID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIFN0cmluZy5wcm90b3R5cGUuc2xpY2UpO1xuXG4vKiBhZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2xvZGFzaC9sb2Rhc2gvYmxvYi80LjE3LjE1L2Rpc3QvbG9kYXNoLmpzI0w2NzM1LUw2NzQ0ICovXG52YXIgcmVQcm9wTmFtZSA9IC9bXiUuW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JSQpKS9nO1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nOyAvKiogVXNlZCB0byBtYXRjaCBiYWNrc2xhc2hlcyBpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciBzdHJpbmdUb1BhdGggPSBmdW5jdGlvbiBzdHJpbmdUb1BhdGgoc3RyaW5nKSB7XG5cdHZhciBmaXJzdCA9ICRzdHJTbGljZShzdHJpbmcsIDAsIDEpO1xuXHR2YXIgbGFzdCA9ICRzdHJTbGljZShzdHJpbmcsIC0xKTtcblx0aWYgKGZpcnN0ID09PSAnJScgJiYgbGFzdCAhPT0gJyUnKSB7XG5cdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignaW52YWxpZCBpbnRyaW5zaWMgc3ludGF4LCBleHBlY3RlZCBjbG9zaW5nIGAlYCcpO1xuXHR9IGVsc2UgaWYgKGxhc3QgPT09ICclJyAmJiBmaXJzdCAhPT0gJyUnKSB7XG5cdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignaW52YWxpZCBpbnRyaW5zaWMgc3ludGF4LCBleHBlY3RlZCBvcGVuaW5nIGAlYCcpO1xuXHR9XG5cdHZhciByZXN1bHQgPSBbXTtcblx0JHJlcGxhY2Uoc3RyaW5nLCByZVByb3BOYW1lLCBmdW5jdGlvbiAobWF0Y2gsIG51bWJlciwgcXVvdGUsIHN1YlN0cmluZykge1xuXHRcdHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHF1b3RlID8gJHJlcGxhY2Uoc3ViU3RyaW5nLCByZUVzY2FwZUNoYXIsICckMScpIDogbnVtYmVyIHx8IG1hdGNoO1xuXHR9KTtcblx0cmV0dXJuIHJlc3VsdDtcbn07XG4vKiBlbmQgYWRhcHRhdGlvbiAqL1xuXG52YXIgZ2V0QmFzZUludHJpbnNpYyA9IGZ1bmN0aW9uIGdldEJhc2VJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdHZhciBpbnRyaW5zaWNOYW1lID0gbmFtZTtcblx0dmFyIGFsaWFzO1xuXHRpZiAoaGFzT3duKExFR0FDWV9BTElBU0VTLCBpbnRyaW5zaWNOYW1lKSkge1xuXHRcdGFsaWFzID0gTEVHQUNZX0FMSUFTRVNbaW50cmluc2ljTmFtZV07XG5cdFx0aW50cmluc2ljTmFtZSA9ICclJyArIGFsaWFzWzBdICsgJyUnO1xuXHR9XG5cblx0aWYgKGhhc093bihJTlRSSU5TSUNTLCBpbnRyaW5zaWNOYW1lKSkge1xuXHRcdHZhciB2YWx1ZSA9IElOVFJJTlNJQ1NbaW50cmluc2ljTmFtZV07XG5cdFx0aWYgKHZhbHVlID09PSBuZWVkc0V2YWwpIHtcblx0XHRcdHZhbHVlID0gZG9FdmFsKGludHJpbnNpY05hbWUpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyAmJiAhYWxsb3dNaXNzaW5nKSB7XG5cdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignaW50cmluc2ljICcgKyBuYW1lICsgJyBleGlzdHMsIGJ1dCBpcyBub3QgYXZhaWxhYmxlLiBQbGVhc2UgZmlsZSBhbiBpc3N1ZSEnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0YWxpYXM6IGFsaWFzLFxuXHRcdFx0bmFtZTogaW50cmluc2ljTmFtZSxcblx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdH07XG5cdH1cblxuXHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdpbnRyaW5zaWMgJyArIG5hbWUgKyAnIGRvZXMgbm90IGV4aXN0IScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBHZXRJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycgfHwgbmFtZS5sZW5ndGggPT09IDApIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignaW50cmluc2ljIG5hbWUgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcnKTtcblx0fVxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgdHlwZW9mIGFsbG93TWlzc2luZyAhPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ1wiYWxsb3dNaXNzaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBhIGJvb2xlYW4nKTtcblx0fVxuXG5cdHZhciBwYXJ0cyA9IHN0cmluZ1RvUGF0aChuYW1lKTtcblx0dmFyIGludHJpbnNpY0Jhc2VOYW1lID0gcGFydHMubGVuZ3RoID4gMCA/IHBhcnRzWzBdIDogJyc7XG5cblx0dmFyIGludHJpbnNpYyA9IGdldEJhc2VJbnRyaW5zaWMoJyUnICsgaW50cmluc2ljQmFzZU5hbWUgKyAnJScsIGFsbG93TWlzc2luZyk7XG5cdHZhciBpbnRyaW5zaWNSZWFsTmFtZSA9IGludHJpbnNpYy5uYW1lO1xuXHR2YXIgdmFsdWUgPSBpbnRyaW5zaWMudmFsdWU7XG5cdHZhciBza2lwRnVydGhlckNhY2hpbmcgPSBmYWxzZTtcblxuXHR2YXIgYWxpYXMgPSBpbnRyaW5zaWMuYWxpYXM7XG5cdGlmIChhbGlhcykge1xuXHRcdGludHJpbnNpY0Jhc2VOYW1lID0gYWxpYXNbMF07XG5cdFx0JHNwbGljZUFwcGx5KHBhcnRzLCAkY29uY2F0KFswLCAxXSwgYWxpYXMpKTtcblx0fVxuXG5cdGZvciAodmFyIGkgPSAxLCBpc093biA9IHRydWU7IGkgPCBwYXJ0cy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdHZhciBwYXJ0ID0gcGFydHNbaV07XG5cdFx0dmFyIGZpcnN0ID0gJHN0clNsaWNlKHBhcnQsIDAsIDEpO1xuXHRcdHZhciBsYXN0ID0gJHN0clNsaWNlKHBhcnQsIC0xKTtcblx0XHRpZiAoXG5cdFx0XHQoXG5cdFx0XHRcdChmaXJzdCA9PT0gJ1wiJyB8fCBmaXJzdCA9PT0gXCInXCIgfHwgZmlyc3QgPT09ICdgJylcblx0XHRcdFx0fHwgKGxhc3QgPT09ICdcIicgfHwgbGFzdCA9PT0gXCInXCIgfHwgbGFzdCA9PT0gJ2AnKVxuXHRcdFx0KVxuXHRcdFx0JiYgZmlyc3QgIT09IGxhc3Rcblx0XHQpIHtcblx0XHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ3Byb3BlcnR5IG5hbWVzIHdpdGggcXVvdGVzIG11c3QgaGF2ZSBtYXRjaGluZyBxdW90ZXMnKTtcblx0XHR9XG5cdFx0aWYgKHBhcnQgPT09ICdjb25zdHJ1Y3RvcicgfHwgIWlzT3duKSB7XG5cdFx0XHRza2lwRnVydGhlckNhY2hpbmcgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGludHJpbnNpY0Jhc2VOYW1lICs9ICcuJyArIHBhcnQ7XG5cdFx0aW50cmluc2ljUmVhbE5hbWUgPSAnJScgKyBpbnRyaW5zaWNCYXNlTmFtZSArICclJztcblxuXHRcdGlmIChoYXNPd24oSU5UUklOU0lDUywgaW50cmluc2ljUmVhbE5hbWUpKSB7XG5cdFx0XHR2YWx1ZSA9IElOVFJJTlNJQ1NbaW50cmluc2ljUmVhbE5hbWVdO1xuXHRcdH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuXHRcdFx0aWYgKCEocGFydCBpbiB2YWx1ZSkpIHtcblx0XHRcdFx0aWYgKCFhbGxvd01pc3NpbmcpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignYmFzZSBpbnRyaW5zaWMgZm9yICcgKyBuYW1lICsgJyBleGlzdHMsIGJ1dCB0aGUgcHJvcGVydHkgaXMgbm90IGF2YWlsYWJsZS4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdm9pZCB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cdFx0XHRpZiAoJGdPUEQgJiYgKGkgKyAxKSA+PSBwYXJ0cy5sZW5ndGgpIHtcblx0XHRcdFx0dmFyIGRlc2MgPSAkZ09QRCh2YWx1ZSwgcGFydCk7XG5cdFx0XHRcdGlzT3duID0gISFkZXNjO1xuXG5cdFx0XHRcdC8vIEJ5IGNvbnZlbnRpb24sIHdoZW4gYSBkYXRhIHByb3BlcnR5IGlzIGNvbnZlcnRlZCB0byBhbiBhY2Nlc3NvclxuXHRcdFx0XHQvLyBwcm9wZXJ0eSB0byBlbXVsYXRlIGEgZGF0YSBwcm9wZXJ0eSB0aGF0IGRvZXMgbm90IHN1ZmZlciBmcm9tXG5cdFx0XHRcdC8vIHRoZSBvdmVycmlkZSBtaXN0YWtlLCB0aGF0IGFjY2Vzc29yJ3MgZ2V0dGVyIGlzIG1hcmtlZCB3aXRoXG5cdFx0XHRcdC8vIGFuIGBvcmlnaW5hbFZhbHVlYCBwcm9wZXJ0eS4gSGVyZSwgd2hlbiB3ZSBkZXRlY3QgdGhpcywgd2Vcblx0XHRcdFx0Ly8gdXBob2xkIHRoZSBpbGx1c2lvbiBieSBwcmV0ZW5kaW5nIHRvIHNlZSB0aGF0IG9yaWdpbmFsIGRhdGFcblx0XHRcdFx0Ly8gcHJvcGVydHksIGkuZS4sIHJldHVybmluZyB0aGUgdmFsdWUgcmF0aGVyIHRoYW4gdGhlIGdldHRlclxuXHRcdFx0XHQvLyBpdHNlbGYuXG5cdFx0XHRcdGlmIChpc093biAmJiAnZ2V0JyBpbiBkZXNjICYmICEoJ29yaWdpbmFsVmFsdWUnIGluIGRlc2MuZ2V0KSkge1xuXHRcdFx0XHRcdHZhbHVlID0gZGVzYy5nZXQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFsdWUgPSB2YWx1ZVtwYXJ0XTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aXNPd24gPSBoYXNPd24odmFsdWUsIHBhcnQpO1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlW3BhcnRdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaXNPd24gJiYgIXNraXBGdXJ0aGVyQ2FjaGluZykge1xuXHRcdFx0XHRJTlRSSU5TSUNTW2ludHJpbnNpY1JlYWxOYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gdmFsdWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgb3JpZ1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbDtcbnZhciBoYXNTeW1ib2xTaGFtID0gcmVxdWlyZSgnLi9zaGFtcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc05hdGl2ZVN5bWJvbHMoKSB7XG5cdGlmICh0eXBlb2Ygb3JpZ1N5bWJvbCAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2Ygb3JpZ1N5bWJvbCgnZm9vJykgIT09ICdzeW1ib2wnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIFN5bWJvbCgnYmFyJykgIT09ICdzeW1ib2wnKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdHJldHVybiBoYXNTeW1ib2xTaGFtKCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBlc2xpbnQgY29tcGxleGl0eTogWzIsIDE4XSwgbWF4LXN0YXRlbWVudHM6IFsyLCAzM10gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFzU3ltYm9scygpIHtcblx0aWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSAnc3ltYm9sJykgeyByZXR1cm4gdHJ1ZTsgfVxuXG5cdHZhciBvYmogPSB7fTtcblx0dmFyIHN5bSA9IFN5bWJvbCgndGVzdCcpO1xuXHR2YXIgc3ltT2JqID0gT2JqZWN0KHN5bSk7XG5cdGlmICh0eXBlb2Ygc3ltID09PSAnc3RyaW5nJykgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN5bSkgIT09ICdbb2JqZWN0IFN5bWJvbF0nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN5bU9iaikgIT09ICdbb2JqZWN0IFN5bWJvbF0nKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdC8vIHRlbXAgZGlzYWJsZWQgcGVyIGh0dHBzOi8vZ2l0aHViLmNvbS9samhhcmIvb2JqZWN0LmFzc2lnbi9pc3N1ZXMvMTdcblx0Ly8gaWYgKHN5bSBpbnN0YW5jZW9mIFN5bWJvbCkgeyByZXR1cm4gZmFsc2U7IH1cblx0Ly8gdGVtcCBkaXNhYmxlZCBwZXIgaHR0cHM6Ly9naXRodWIuY29tL1dlYlJlZmxlY3Rpb24vZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzL2lzc3Vlcy80XG5cdC8vIGlmICghKHN5bU9iaiBpbnN0YW5jZW9mIFN5bWJvbCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0Ly8gaWYgKHR5cGVvZiBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHQvLyBpZiAoU3RyaW5nKHN5bSkgIT09IFN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzeW0pKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdHZhciBzeW1WYWwgPSA0Mjtcblx0b2JqW3N5bV0gPSBzeW1WYWw7XG5cdGZvciAoc3ltIGluIG9iaikgeyByZXR1cm4gZmFsc2U7IH0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheCwgbm8tdW5yZWFjaGFibGUtbG9vcFxuXHRpZiAodHlwZW9mIE9iamVjdC5rZXlzID09PSAnZnVuY3Rpb24nICYmIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoICE9PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgPT09ICdmdW5jdGlvbicgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5sZW5ndGggIT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0dmFyIHN5bXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iaik7XG5cdGlmIChzeW1zLmxlbmd0aCAhPT0gMSB8fCBzeW1zWzBdICE9PSBzeW0pIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKCFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob2JqLCBzeW0pKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIHN5bSk7XG5cdFx0aWYgKGRlc2NyaXB0b3IudmFsdWUgIT09IHN5bVZhbCB8fCBkZXNjcmlwdG9yLmVudW1lcmFibGUgIT09IHRydWUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZuVG9TdHIgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgcmVmbGVjdEFwcGx5ID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnICYmIFJlZmxlY3QgIT09IG51bGwgJiYgUmVmbGVjdC5hcHBseTtcbnZhciBiYWRBcnJheUxpa2U7XG52YXIgaXNDYWxsYWJsZU1hcmtlcjtcbmlmICh0eXBlb2YgcmVmbGVjdEFwcGx5ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBPYmplY3QuZGVmaW5lUHJvcGVydHkgPT09ICdmdW5jdGlvbicpIHtcblx0dHJ5IHtcblx0XHRiYWRBcnJheUxpa2UgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdsZW5ndGgnLCB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dGhyb3cgaXNDYWxsYWJsZU1hcmtlcjtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRpc0NhbGxhYmxlTWFya2VyID0ge307XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXRocm93LWxpdGVyYWxcblx0XHRyZWZsZWN0QXBwbHkoZnVuY3Rpb24gKCkgeyB0aHJvdyA0MjsgfSwgbnVsbCwgYmFkQXJyYXlMaWtlKTtcblx0fSBjYXRjaCAoXykge1xuXHRcdGlmIChfICE9PSBpc0NhbGxhYmxlTWFya2VyKSB7XG5cdFx0XHRyZWZsZWN0QXBwbHkgPSBudWxsO1xuXHRcdH1cblx0fVxufSBlbHNlIHtcblx0cmVmbGVjdEFwcGx5ID0gbnVsbDtcbn1cblxudmFyIGNvbnN0cnVjdG9yUmVnZXggPSAvXlxccypjbGFzc1xcYi87XG52YXIgaXNFUzZDbGFzc0ZuID0gZnVuY3Rpb24gaXNFUzZDbGFzc0Z1bmN0aW9uKHZhbHVlKSB7XG5cdHRyeSB7XG5cdFx0dmFyIGZuU3RyID0gZm5Ub1N0ci5jYWxsKHZhbHVlKTtcblx0XHRyZXR1cm4gY29uc3RydWN0b3JSZWdleC50ZXN0KGZuU3RyKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBmYWxzZTsgLy8gbm90IGEgZnVuY3Rpb25cblx0fVxufTtcblxudmFyIHRyeUZ1bmN0aW9uT2JqZWN0ID0gZnVuY3Rpb24gdHJ5RnVuY3Rpb25Ub1N0cih2YWx1ZSkge1xuXHR0cnkge1xuXHRcdGlmIChpc0VTNkNsYXNzRm4odmFsdWUpKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGZuVG9TdHIuY2FsbCh2YWx1ZSk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn07XG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGZuQ2xhc3MgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xudmFyIGdlbkNsYXNzID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJztcbnZhciBoYXNUb1N0cmluZ1RhZyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCc7XG4vKiBnbG9iYWxzIGRvY3VtZW50OiBmYWxzZSAqL1xudmFyIGRvY3VtZW50RG90QWxsID0gdHlwZW9mIGRvY3VtZW50ID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgZG9jdW1lbnQuYWxsID09PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5hbGwgIT09IHVuZGVmaW5lZCA/IGRvY3VtZW50LmFsbCA6IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZmxlY3RBcHBseVxuXHQ/IGZ1bmN0aW9uIGlzQ2FsbGFibGUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT09IGRvY3VtZW50RG90QWxsKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0aWYgKCF2YWx1ZSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRpZiAodHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiAhdmFsdWUucHJvdG90eXBlKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0dHJ5IHtcblx0XHRcdHJlZmxlY3RBcHBseSh2YWx1ZSwgbnVsbCwgYmFkQXJyYXlMaWtlKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRpZiAoZSAhPT0gaXNDYWxsYWJsZU1hcmtlcikgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9XG5cdFx0cmV0dXJuICFpc0VTNkNsYXNzRm4odmFsdWUpO1xuXHR9XG5cdDogZnVuY3Rpb24gaXNDYWxsYWJsZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PT0gZG9jdW1lbnREb3RBbGwpIHsgcmV0dXJuIHRydWU7IH1cblx0XHRpZiAoIXZhbHVlKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGlmICh0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JykgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nICYmICF2YWx1ZS5wcm90b3R5cGUpIHsgcmV0dXJuIHRydWU7IH1cblx0XHRpZiAoaGFzVG9TdHJpbmdUYWcpIHsgcmV0dXJuIHRyeUZ1bmN0aW9uT2JqZWN0KHZhbHVlKTsgfVxuXHRcdGlmIChpc0VTNkNsYXNzRm4odmFsdWUpKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdHZhciBzdHJDbGFzcyA9IHRvU3RyLmNhbGwodmFsdWUpO1xuXHRcdHJldHVybiBzdHJDbGFzcyA9PT0gZm5DbGFzcyB8fCBzdHJDbGFzcyA9PT0gZ2VuQ2xhc3M7XG5cdH07XG4iLCIvLyAgICAgKGMpIDIwMTItMjAxOCBBaXJibmIsIEluYy5cbi8vXG4vLyAgICAgcG9seWdsb3QuanMgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEJTRFxuLy8gICAgIGxpY2Vuc2UuIEZvciBhbGwgbGljZW5zaW5nIGluZm9ybWF0aW9uLCBkZXRhaWxzLCBhbmQgZG9jdW1lbnRpb246XG4vLyAgICAgaHR0cDovL2FpcmJuYi5naXRodWIuY29tL3BvbHlnbG90LmpzXG4vL1xuLy9cbi8vIFBvbHlnbG90LmpzIGlzIGFuIEkxOG4gaGVscGVyIGxpYnJhcnkgd3JpdHRlbiBpbiBKYXZhU2NyaXB0LCBtYWRlIHRvXG4vLyB3b3JrIGJvdGggaW4gdGhlIGJyb3dzZXIgYW5kIGluIE5vZGUuIEl0IHByb3ZpZGVzIGEgc2ltcGxlIHNvbHV0aW9uIGZvclxuLy8gaW50ZXJwb2xhdGlvbiBhbmQgcGx1cmFsaXphdGlvbiwgYmFzZWQgb2ZmIG9mIEFpcmJuYidzXG4vLyBleHBlcmllbmNlIGFkZGluZyBJMThuIGZ1bmN0aW9uYWxpdHkgdG8gaXRzIEJhY2tib25lLmpzIGFuZCBOb2RlIGFwcHMuXG4vL1xuLy8gUG9seWxnbG90IGlzIGFnbm9zdGljIHRvIHlvdXIgdHJhbnNsYXRpb24gYmFja2VuZC4gSXQgZG9lc24ndCBwZXJmb3JtIGFueVxuLy8gdHJhbnNsYXRpb247IGl0IHNpbXBseSBnaXZlcyB5b3UgYSB3YXkgdG8gbWFuYWdlIHRyYW5zbGF0ZWQgcGhyYXNlcyBmcm9tXG4vLyB5b3VyIGNsaWVudC0gb3Igc2VydmVyLXNpZGUgSmF2YVNjcmlwdCBhcHBsaWNhdGlvbi5cbi8vXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGZvckVhY2ggPSByZXF1aXJlKCdmb3ItZWFjaCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnaGFzJyk7XG52YXIgdHJpbSA9IHJlcXVpcmUoJ3N0cmluZy5wcm90b3R5cGUudHJpbScpO1xuXG52YXIgd2FybiA9IGZ1bmN0aW9uIHdhcm4obWVzc2FnZSkge1xuICB3YXJuaW5nKGZhbHNlLCBtZXNzYWdlKTtcbn07XG5cbnZhciByZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xudmFyIHNwbGl0ID0gU3RyaW5nLnByb3RvdHlwZS5zcGxpdDtcblxuLy8gIyMjIyBQbHVyYWxpemF0aW9uIG1ldGhvZHNcbi8vIFRoZSBzdHJpbmcgdGhhdCBzZXBhcmF0ZXMgdGhlIGRpZmZlcmVudCBwaHJhc2UgcG9zc2liaWxpdGllcy5cbnZhciBkZWxpbWl0ZXIgPSAnfHx8fCc7XG5cbnZhciBydXNzaWFuUGx1cmFsR3JvdXBzID0gZnVuY3Rpb24gKG4pIHtcbiAgdmFyIGxhc3RUd28gPSBuICUgMTAwO1xuICB2YXIgZW5kID0gbGFzdFR3byAlIDEwO1xuICBpZiAobGFzdFR3byAhPT0gMTEgJiYgZW5kID09PSAxKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgaWYgKDIgPD0gZW5kICYmIGVuZCA8PSA0ICYmICEobGFzdFR3byA+PSAxMiAmJiBsYXN0VHdvIDw9IDE0KSkge1xuICAgIHJldHVybiAxO1xuICB9XG4gIHJldHVybiAyO1xufTtcblxudmFyIGRlZmF1bHRQbHVyYWxSdWxlcyA9IHtcbiAgLy8gTWFwcGluZyBmcm9tIHBsdXJhbGl6YXRpb24gZ3JvdXAgcGx1cmFsIGxvZ2ljLlxuICBwbHVyYWxUeXBlczoge1xuICAgIGFyYWJpYzogZnVuY3Rpb24gKG4pIHtcbiAgICAgIC8vIGh0dHA6Ly93d3cuYXJhYmV5ZXMub3JnL1BsdXJhbF9Gb3Jtc1xuICAgICAgaWYgKG4gPCAzKSB7IHJldHVybiBuOyB9XG4gICAgICB2YXIgbGFzdFR3byA9IG4gJSAxMDA7XG4gICAgICBpZiAobGFzdFR3byA+PSAzICYmIGxhc3RUd28gPD0gMTApIHJldHVybiAzO1xuICAgICAgcmV0dXJuIGxhc3RUd28gPj0gMTEgPyA0IDogNTtcbiAgICB9LFxuICAgIGJvc25pYW5fc2VyYmlhbjogcnVzc2lhblBsdXJhbEdyb3VwcyxcbiAgICBjaGluZXNlOiBmdW5jdGlvbiAoKSB7IHJldHVybiAwOyB9LFxuICAgIGNyb2F0aWFuOiBydXNzaWFuUGx1cmFsR3JvdXBzLFxuICAgIGZyZW5jaDogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4gPiAxID8gMSA6IDA7IH0sXG4gICAgZ2VybWFuOiBmdW5jdGlvbiAobikgeyByZXR1cm4gbiAhPT0gMSA/IDEgOiAwOyB9LFxuICAgIHJ1c3NpYW46IHJ1c3NpYW5QbHVyYWxHcm91cHMsXG4gICAgbGl0aHVhbmlhbjogZnVuY3Rpb24gKG4pIHtcbiAgICAgIGlmIChuICUgMTAgPT09IDEgJiYgbiAlIDEwMCAhPT0gMTEpIHsgcmV0dXJuIDA7IH1cbiAgICAgIHJldHVybiBuICUgMTAgPj0gMiAmJiBuICUgMTAgPD0gOSAmJiAobiAlIDEwMCA8IDExIHx8IG4gJSAxMDAgPiAxOSkgPyAxIDogMjtcbiAgICB9LFxuICAgIGN6ZWNoOiBmdW5jdGlvbiAobikge1xuICAgICAgaWYgKG4gPT09IDEpIHsgcmV0dXJuIDA7IH1cbiAgICAgIHJldHVybiAobiA+PSAyICYmIG4gPD0gNCkgPyAxIDogMjtcbiAgICB9LFxuICAgIHBvbGlzaDogZnVuY3Rpb24gKG4pIHtcbiAgICAgIGlmIChuID09PSAxKSB7IHJldHVybiAwOyB9XG4gICAgICB2YXIgZW5kID0gbiAlIDEwO1xuICAgICAgcmV0dXJuIDIgPD0gZW5kICYmIGVuZCA8PSA0ICYmIChuICUgMTAwIDwgMTAgfHwgbiAlIDEwMCA+PSAyMCkgPyAxIDogMjtcbiAgICB9LFxuICAgIGljZWxhbmRpYzogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIChuICUgMTAgIT09IDEgfHwgbiAlIDEwMCA9PT0gMTEpID8gMSA6IDA7IH0sXG4gICAgc2xvdmVuaWFuOiBmdW5jdGlvbiAobikge1xuICAgICAgdmFyIGxhc3RUd28gPSBuICUgMTAwO1xuICAgICAgaWYgKGxhc3RUd28gPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICBpZiAobGFzdFR3byA9PT0gMikge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIGlmIChsYXN0VHdvID09PSAzIHx8IGxhc3RUd28gPT09IDQpIHtcbiAgICAgICAgcmV0dXJuIDI7XG4gICAgICB9XG4gICAgICByZXR1cm4gMztcbiAgICB9XG4gIH0sXG5cbiAgLy8gTWFwcGluZyBmcm9tIHBsdXJhbGl6YXRpb24gZ3JvdXAgdG8gaW5kaXZpZHVhbCBsYW5ndWFnZSBjb2Rlcy9sb2NhbGVzLlxuICAvLyBXaWxsIGxvb2sgdXAgYmFzZWQgb24gZXhhY3QgbWF0Y2gsIGlmIG5vdCBmb3VuZCBhbmQgaXQncyBhIGxvY2FsZSB3aWxsIHBhcnNlIHRoZSBsb2NhbGVcbiAgLy8gZm9yIGxhbmd1YWdlIGNvZGUsIGFuZCBpZiB0aGF0IGRvZXMgbm90IGV4aXN0IHdpbGwgZGVmYXVsdCB0byAnZW4nXG4gIHBsdXJhbFR5cGVUb0xhbmd1YWdlczoge1xuICAgIGFyYWJpYzogWydhciddLFxuICAgIGJvc25pYW5fc2VyYmlhbjogWydicy1MYXRuLUJBJywgJ2JzLUN5cmwtQkEnLCAnc3JsLVJTJywgJ3NyLVJTJ10sXG4gICAgY2hpbmVzZTogWydpZCcsICdpZC1JRCcsICdqYScsICdrbycsICdrby1LUicsICdsbycsICdtcycsICd0aCcsICd0aC1USCcsICd6aCddLFxuICAgIGNyb2F0aWFuOiBbJ2hyJywgJ2hyLUhSJ10sXG4gICAgZ2VybWFuOiBbJ2ZhJywgJ2RhJywgJ2RlJywgJ2VuJywgJ2VzJywgJ2ZpJywgJ2VsJywgJ2hlJywgJ2hpLUlOJywgJ2h1JywgJ2h1LUhVJywgJ2l0JywgJ25sJywgJ25vJywgJ3B0JywgJ3N2JywgJ3RyJ10sXG4gICAgZnJlbmNoOiBbJ2ZyJywgJ3RsJywgJ3B0LWJyJ10sXG4gICAgcnVzc2lhbjogWydydScsICdydS1SVSddLFxuICAgIGxpdGh1YW5pYW46IFsnbHQnXSxcbiAgICBjemVjaDogWydjcycsICdjcy1DWicsICdzayddLFxuICAgIHBvbGlzaDogWydwbCddLFxuICAgIGljZWxhbmRpYzogWydpcyddLFxuICAgIHNsb3ZlbmlhbjogWydzbC1TTCddXG4gIH1cbn07XG5cbmZ1bmN0aW9uIGxhbmdUb1R5cGVNYXAobWFwcGluZykge1xuICB2YXIgcmV0ID0ge307XG4gIGZvckVhY2gobWFwcGluZywgZnVuY3Rpb24gKGxhbmdzLCB0eXBlKSB7XG4gICAgZm9yRWFjaChsYW5ncywgZnVuY3Rpb24gKGxhbmcpIHtcbiAgICAgIHJldFtsYW5nXSA9IHR5cGU7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBwbHVyYWxUeXBlTmFtZShwbHVyYWxSdWxlcywgbG9jYWxlKSB7XG4gIHZhciBsYW5nVG9QbHVyYWxUeXBlID0gbGFuZ1RvVHlwZU1hcChwbHVyYWxSdWxlcy5wbHVyYWxUeXBlVG9MYW5ndWFnZXMpO1xuICByZXR1cm4gbGFuZ1RvUGx1cmFsVHlwZVtsb2NhbGVdXG4gICAgfHwgbGFuZ1RvUGx1cmFsVHlwZVtzcGxpdC5jYWxsKGxvY2FsZSwgLy0vLCAxKVswXV1cbiAgICB8fCBsYW5nVG9QbHVyYWxUeXBlLmVuO1xufVxuXG5mdW5jdGlvbiBwbHVyYWxUeXBlSW5kZXgocGx1cmFsUnVsZXMsIGxvY2FsZSwgY291bnQpIHtcbiAgcmV0dXJuIHBsdXJhbFJ1bGVzLnBsdXJhbFR5cGVzW3BsdXJhbFR5cGVOYW1lKHBsdXJhbFJ1bGVzLCBsb2NhbGUpXShjb3VudCk7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZSh0b2tlbikge1xuICByZXR1cm4gdG9rZW4ucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0VG9rZW5SZWdleChvcHRzKSB7XG4gIHZhciBwcmVmaXggPSAob3B0cyAmJiBvcHRzLnByZWZpeCkgfHwgJyV7JztcbiAgdmFyIHN1ZmZpeCA9IChvcHRzICYmIG9wdHMuc3VmZml4KSB8fCAnfSc7XG5cbiAgaWYgKHByZWZpeCA9PT0gZGVsaW1pdGVyIHx8IHN1ZmZpeCA9PT0gZGVsaW1pdGVyKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wiJyArIGRlbGltaXRlciArICdcIiB0b2tlbiBpcyByZXNlcnZlZCBmb3IgcGx1cmFsaXphdGlvbicpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBSZWdFeHAoZXNjYXBlKHByZWZpeCkgKyAnKC4qPyknICsgZXNjYXBlKHN1ZmZpeCksICdnJyk7XG59XG5cbnZhciBkZWZhdWx0VG9rZW5SZWdleCA9IC8lXFx7KC4qPylcXH0vZztcblxuLy8gIyMjIHRyYW5zZm9ybVBocmFzZShwaHJhc2UsIHN1YnN0aXR1dGlvbnMsIGxvY2FsZSlcbi8vXG4vLyBUYWtlcyBhIHBocmFzZSBzdHJpbmcgYW5kIHRyYW5zZm9ybXMgaXQgYnkgY2hvb3NpbmcgdGhlIGNvcnJlY3Rcbi8vIHBsdXJhbCBmb3JtIGFuZCBpbnRlcnBvbGF0aW5nIGl0LlxuLy9cbi8vICAgICB0cmFuc2Zvcm1QaHJhc2UoJ0hlbGxvLCAle25hbWV9IScsIHtuYW1lOiAnU3Bpa2UnfSk7XG4vLyAgICAgLy8gXCJIZWxsbywgU3Bpa2UhXCJcbi8vXG4vLyBUaGUgY29ycmVjdCBwbHVyYWwgZm9ybSBpcyBzZWxlY3RlZCBpZiBzdWJzdGl0dXRpb25zLnNtYXJ0X2NvdW50XG4vLyBpcyBzZXQuIFlvdSBjYW4gcGFzcyBpbiBhIG51bWJlciBpbnN0ZWFkIG9mIGFuIE9iamVjdCBhcyBgc3Vic3RpdHV0aW9uc2Bcbi8vIGFzIGEgc2hvcnRjdXQgZm9yIGBzbWFydF9jb3VudGAuXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnJXtzbWFydF9jb3VudH0gbmV3IG1lc3NhZ2VzIHx8fHwgMSBuZXcgbWVzc2FnZScsIHtzbWFydF9jb3VudDogMX0sICdlbicpO1xuLy8gICAgIC8vIFwiMSBuZXcgbWVzc2FnZVwiXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnJXtzbWFydF9jb3VudH0gbmV3IG1lc3NhZ2VzIHx8fHwgMSBuZXcgbWVzc2FnZScsIHtzbWFydF9jb3VudDogMn0sICdlbicpO1xuLy8gICAgIC8vIFwiMiBuZXcgbWVzc2FnZXNcIlxuLy9cbi8vICAgICB0cmFuc2Zvcm1QaHJhc2UoJyV7c21hcnRfY291bnR9IG5ldyBtZXNzYWdlcyB8fHx8IDEgbmV3IG1lc3NhZ2UnLCA1LCAnZW4nKTtcbi8vICAgICAvLyBcIjUgbmV3IG1lc3NhZ2VzXCJcbi8vXG4vLyBZb3Ugc2hvdWxkIHBhc3MgaW4gYSB0aGlyZCBhcmd1bWVudCwgdGhlIGxvY2FsZSwgdG8gc3BlY2lmeSB0aGUgY29ycmVjdCBwbHVyYWwgdHlwZS5cbi8vIEl0IGRlZmF1bHRzIHRvIGAnZW4nYCB3aXRoIDIgcGx1cmFsIGZvcm1zLlxuZnVuY3Rpb24gdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlLCB0b2tlblJlZ2V4LCBwbHVyYWxSdWxlcykge1xuICBpZiAodHlwZW9mIHBocmFzZSAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQb2x5Z2xvdC50cmFuc2Zvcm1QaHJhc2UgZXhwZWN0cyBhcmd1bWVudCAjMSB0byBiZSBzdHJpbmcnKTtcbiAgfVxuXG4gIGlmIChzdWJzdGl0dXRpb25zID09IG51bGwpIHtcbiAgICByZXR1cm4gcGhyYXNlO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9IHBocmFzZTtcbiAgdmFyIGludGVycG9sYXRpb25SZWdleCA9IHRva2VuUmVnZXggfHwgZGVmYXVsdFRva2VuUmVnZXg7XG4gIHZhciBwbHVyYWxSdWxlc09yRGVmYXVsdCA9IHBsdXJhbFJ1bGVzIHx8IGRlZmF1bHRQbHVyYWxSdWxlcztcblxuICAvLyBhbGxvdyBudW1iZXIgYXMgYSBwbHVyYWxpemF0aW9uIHNob3J0Y3V0XG4gIHZhciBvcHRpb25zID0gdHlwZW9mIHN1YnN0aXR1dGlvbnMgPT09ICdudW1iZXInID8geyBzbWFydF9jb3VudDogc3Vic3RpdHV0aW9ucyB9IDogc3Vic3RpdHV0aW9ucztcblxuICAvLyBTZWxlY3QgcGx1cmFsIGZvcm06IGJhc2VkIG9uIGEgcGhyYXNlIHRleHQgdGhhdCBjb250YWlucyBgbmBcbiAgLy8gcGx1cmFsIGZvcm1zIHNlcGFyYXRlZCBieSBgZGVsaW1pdGVyYCwgYSBgbG9jYWxlYCwgYW5kIGEgYHN1YnN0aXR1dGlvbnMuc21hcnRfY291bnRgLFxuICAvLyBjaG9vc2UgdGhlIGNvcnJlY3QgcGx1cmFsIGZvcm0uIFRoaXMgaXMgb25seSBkb25lIGlmIGBjb3VudGAgaXMgc2V0LlxuICBpZiAob3B0aW9ucy5zbWFydF9jb3VudCAhPSBudWxsICYmIHJlc3VsdCkge1xuICAgIHZhciB0ZXh0cyA9IHNwbGl0LmNhbGwocmVzdWx0LCBkZWxpbWl0ZXIpO1xuICAgIHJlc3VsdCA9IHRyaW0odGV4dHNbcGx1cmFsVHlwZUluZGV4KHBsdXJhbFJ1bGVzT3JEZWZhdWx0LCBsb2NhbGUgfHwgJ2VuJywgb3B0aW9ucy5zbWFydF9jb3VudCldIHx8IHRleHRzWzBdKTtcbiAgfVxuXG4gIC8vIEludGVycG9sYXRlOiBDcmVhdGVzIGEgYFJlZ0V4cGAgb2JqZWN0IGZvciBlYWNoIGludGVycG9sYXRpb24gcGxhY2Vob2xkZXIuXG4gIHJlc3VsdCA9IHJlcGxhY2UuY2FsbChyZXN1bHQsIGludGVycG9sYXRpb25SZWdleCwgZnVuY3Rpb24gKGV4cHJlc3Npb24sIGFyZ3VtZW50KSB7XG4gICAgaWYgKCFoYXMob3B0aW9ucywgYXJndW1lbnQpIHx8IG9wdGlvbnNbYXJndW1lbnRdID09IG51bGwpIHsgcmV0dXJuIGV4cHJlc3Npb247IH1cbiAgICByZXR1cm4gb3B0aW9uc1thcmd1bWVudF07XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vICMjIyBQb2x5Z2xvdCBjbGFzcyBjb25zdHJ1Y3RvclxuZnVuY3Rpb24gUG9seWdsb3Qob3B0aW9ucykge1xuICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gIHRoaXMucGhyYXNlcyA9IHt9O1xuICB0aGlzLmV4dGVuZChvcHRzLnBocmFzZXMgfHwge30pO1xuICB0aGlzLmN1cnJlbnRMb2NhbGUgPSBvcHRzLmxvY2FsZSB8fCAnZW4nO1xuICB2YXIgYWxsb3dNaXNzaW5nID0gb3B0cy5hbGxvd01pc3NpbmcgPyB0cmFuc2Zvcm1QaHJhc2UgOiBudWxsO1xuICB0aGlzLm9uTWlzc2luZ0tleSA9IHR5cGVvZiBvcHRzLm9uTWlzc2luZ0tleSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMub25NaXNzaW5nS2V5IDogYWxsb3dNaXNzaW5nO1xuICB0aGlzLndhcm4gPSBvcHRzLndhcm4gfHwgd2FybjtcbiAgdGhpcy50b2tlblJlZ2V4ID0gY29uc3RydWN0VG9rZW5SZWdleChvcHRzLmludGVycG9sYXRpb24pO1xuICB0aGlzLnBsdXJhbFJ1bGVzID0gb3B0cy5wbHVyYWxSdWxlcyB8fCBkZWZhdWx0UGx1cmFsUnVsZXM7XG59XG5cbi8vICMjIyBwb2x5Z2xvdC5sb2NhbGUoW2xvY2FsZV0pXG4vL1xuLy8gR2V0IG9yIHNldCBsb2NhbGUuIEludGVybmFsbHksIFBvbHlnbG90IG9ubHkgdXNlcyBsb2NhbGUgZm9yIHBsdXJhbGl6YXRpb24uXG5Qb2x5Z2xvdC5wcm90b3R5cGUubG9jYWxlID0gZnVuY3Rpb24gKG5ld0xvY2FsZSkge1xuICBpZiAobmV3TG9jYWxlKSB0aGlzLmN1cnJlbnRMb2NhbGUgPSBuZXdMb2NhbGU7XG4gIHJldHVybiB0aGlzLmN1cnJlbnRMb2NhbGU7XG59O1xuXG4vLyAjIyMgcG9seWdsb3QuZXh0ZW5kKHBocmFzZXMpXG4vL1xuLy8gVXNlIGBleHRlbmRgIHRvIHRlbGwgUG9seWdsb3QgaG93IHRvIHRyYW5zbGF0ZSBhIGdpdmVuIGtleS5cbi8vXG4vLyAgICAgcG9seWdsb3QuZXh0ZW5kKHtcbi8vICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgXCJoZWxsb19uYW1lXCI6IFwiSGVsbG8sICV7bmFtZX1cIlxuLy8gICAgIH0pO1xuLy9cbi8vIFRoZSBrZXkgY2FuIGJlIGFueSBzdHJpbmcuICBGZWVsIGZyZWUgdG8gY2FsbCBgZXh0ZW5kYCBtdWx0aXBsZSB0aW1lcztcbi8vIGl0IHdpbGwgb3ZlcnJpZGUgYW55IHBocmFzZXMgd2l0aCB0aGUgc2FtZSBrZXksIGJ1dCBsZWF2ZSBleGlzdGluZyBwaHJhc2VzXG4vLyB1bnRvdWNoZWQuXG4vL1xuLy8gSXQgaXMgYWxzbyBwb3NzaWJsZSB0byBwYXNzIG5lc3RlZCBwaHJhc2Ugb2JqZWN0cywgd2hpY2ggZ2V0IGZsYXR0ZW5lZFxuLy8gaW50byBhbiBvYmplY3Qgd2l0aCB0aGUgbmVzdGVkIGtleXMgY29uY2F0ZW5hdGVkIHVzaW5nIGRvdCBub3RhdGlvbi5cbi8vXG4vLyAgICAgcG9seWdsb3QuZXh0ZW5kKHtcbi8vICAgICAgIFwibmF2XCI6IHtcbi8vICAgICAgICAgXCJoZWxsb1wiOiBcIkhlbGxvXCIsXG4vLyAgICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCIsXG4vLyAgICAgICAgIFwic2lkZWJhclwiOiB7XG4vLyAgICAgICAgICAgXCJ3ZWxjb21lXCI6IFwiV2VsY29tZVwiXG4vLyAgICAgICAgIH1cbi8vICAgICAgIH1cbi8vICAgICB9KTtcbi8vXG4vLyAgICAgY29uc29sZS5sb2cocG9seWdsb3QucGhyYXNlcyk7XG4vLyAgICAgLy8ge1xuLy8gICAgIC8vICAgJ25hdi5oZWxsbyc6ICdIZWxsbycsXG4vLyAgICAgLy8gICAnbmF2LmhlbGxvX25hbWUnOiAnSGVsbG8sICV7bmFtZX0nLFxuLy8gICAgIC8vICAgJ25hdi5zaWRlYmFyLndlbGNvbWUnOiAnV2VsY29tZSdcbi8vICAgICAvLyB9XG4vL1xuLy8gYGV4dGVuZGAgYWNjZXB0cyBhbiBvcHRpb25hbCBzZWNvbmQgYXJndW1lbnQsIGBwcmVmaXhgLCB3aGljaCBjYW4gYmUgdXNlZFxuLy8gdG8gcHJlZml4IGV2ZXJ5IGtleSBpbiB0aGUgcGhyYXNlcyBvYmplY3Qgd2l0aCBzb21lIHN0cmluZywgdXNpbmcgZG90XG4vLyBub3RhdGlvbi5cbi8vXG4vLyAgICAgcG9seWdsb3QuZXh0ZW5kKHtcbi8vICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgXCJoZWxsb19uYW1lXCI6IFwiSGVsbG8sICV7bmFtZX1cIlxuLy8gICAgIH0sIFwibmF2XCIpO1xuLy9cbi8vICAgICBjb25zb2xlLmxvZyhwb2x5Z2xvdC5waHJhc2VzKTtcbi8vICAgICAvLyB7XG4vLyAgICAgLy8gICAnbmF2LmhlbGxvJzogJ0hlbGxvJyxcbi8vICAgICAvLyAgICduYXYuaGVsbG9fbmFtZSc6ICdIZWxsbywgJXtuYW1lfSdcbi8vICAgICAvLyB9XG4vL1xuLy8gVGhpcyBmZWF0dXJlIGlzIHVzZWQgaW50ZXJuYWxseSB0byBzdXBwb3J0IG5lc3RlZCBwaHJhc2Ugb2JqZWN0cy5cblBvbHlnbG90LnByb3RvdHlwZS5leHRlbmQgPSBmdW5jdGlvbiAobW9yZVBocmFzZXMsIHByZWZpeCkge1xuICBmb3JFYWNoKG1vcmVQaHJhc2VzLCBmdW5jdGlvbiAocGhyYXNlLCBrZXkpIHtcbiAgICB2YXIgcHJlZml4ZWRLZXkgPSBwcmVmaXggPyBwcmVmaXggKyAnLicgKyBrZXkgOiBrZXk7XG4gICAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLmV4dGVuZChwaHJhc2UsIHByZWZpeGVkS2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5waHJhc2VzW3ByZWZpeGVkS2V5XSA9IHBocmFzZTtcbiAgICB9XG4gIH0sIHRoaXMpO1xufTtcblxuLy8gIyMjIHBvbHlnbG90LnVuc2V0KHBocmFzZXMpXG4vLyBVc2UgYHVuc2V0YCB0byBzZWxlY3RpdmVseSByZW1vdmUga2V5cyBmcm9tIGEgcG9seWdsb3QgaW5zdGFuY2UuXG4vL1xuLy8gICAgIHBvbHlnbG90LnVuc2V0KFwic29tZV9rZXlcIik7XG4vLyAgICAgcG9seWdsb3QudW5zZXQoe1xuLy8gICAgICAgXCJoZWxsb1wiOiBcIkhlbGxvXCIsXG4vLyAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiXG4vLyAgICAgfSk7XG4vL1xuLy8gVGhlIHVuc2V0IG1ldGhvZCBjYW4gdGFrZSBlaXRoZXIgYSBzdHJpbmcgKGZvciB0aGUga2V5KSwgb3IgYW4gb2JqZWN0IGhhc2ggd2l0aFxuLy8gdGhlIGtleXMgdGhhdCB5b3Ugd291bGQgbGlrZSB0byB1bnNldC5cblBvbHlnbG90LnByb3RvdHlwZS51bnNldCA9IGZ1bmN0aW9uIChtb3JlUGhyYXNlcywgcHJlZml4KSB7XG4gIGlmICh0eXBlb2YgbW9yZVBocmFzZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgZGVsZXRlIHRoaXMucGhyYXNlc1ttb3JlUGhyYXNlc107XG4gIH0gZWxzZSB7XG4gICAgZm9yRWFjaChtb3JlUGhyYXNlcywgZnVuY3Rpb24gKHBocmFzZSwga2V5KSB7XG4gICAgICB2YXIgcHJlZml4ZWRLZXkgPSBwcmVmaXggPyBwcmVmaXggKyAnLicgKyBrZXkgOiBrZXk7XG4gICAgICBpZiAodHlwZW9mIHBocmFzZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGhpcy51bnNldChwaHJhc2UsIHByZWZpeGVkS2V5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnBocmFzZXNbcHJlZml4ZWRLZXldO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICB9XG59O1xuXG4vLyAjIyMgcG9seWdsb3QuY2xlYXIoKVxuLy9cbi8vIENsZWFycyBhbGwgcGhyYXNlcy4gVXNlZnVsIGZvciBzcGVjaWFsIGNhc2VzLCBzdWNoIGFzIGZyZWVpbmdcbi8vIHVwIG1lbW9yeSBpZiB5b3UgaGF2ZSBsb3RzIG9mIHBocmFzZXMgYnV0IG5vIGxvbmdlciBuZWVkIHRvXG4vLyBwZXJmb3JtIGFueSB0cmFuc2xhdGlvbi4gQWxzbyB1c2VkIGludGVybmFsbHkgYnkgYHJlcGxhY2VgLlxuUG9seWdsb3QucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnBocmFzZXMgPSB7fTtcbn07XG5cbi8vICMjIyBwb2x5Z2xvdC5yZXBsYWNlKHBocmFzZXMpXG4vL1xuLy8gQ29tcGxldGVseSByZXBsYWNlIHRoZSBleGlzdGluZyBwaHJhc2VzIHdpdGggYSBuZXcgc2V0IG9mIHBocmFzZXMuXG4vLyBOb3JtYWxseSwganVzdCB1c2UgYGV4dGVuZGAgdG8gYWRkIG1vcmUgcGhyYXNlcywgYnV0IHVuZGVyIGNlcnRhaW5cbi8vIGNpcmN1bXN0YW5jZXMsIHlvdSBtYXkgd2FudCB0byBtYWtlIHN1cmUgbm8gb2xkIHBocmFzZXMgYXJlIGx5aW5nIGFyb3VuZC5cblBvbHlnbG90LnByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24gKG5ld1BocmFzZXMpIHtcbiAgdGhpcy5jbGVhcigpO1xuICB0aGlzLmV4dGVuZChuZXdQaHJhc2VzKTtcbn07XG5cblxuLy8gIyMjIHBvbHlnbG90LnQoa2V5LCBvcHRpb25zKVxuLy9cbi8vIFRoZSBtb3N0LXVzZWQgbWV0aG9kLiBQcm92aWRlIGEga2V5LCBhbmQgYHRgIHdpbGwgcmV0dXJuIHRoZVxuLy8gcGhyYXNlLlxuLy9cbi8vICAgICBwb2x5Z2xvdC50KFwiaGVsbG9cIik7XG4vLyAgICAgPT4gXCJIZWxsb1wiXG4vL1xuLy8gVGhlIHBocmFzZSB2YWx1ZSBpcyBwcm92aWRlZCBmaXJzdCBieSBhIGNhbGwgdG8gYHBvbHlnbG90LmV4dGVuZCgpYCBvclxuLy8gYHBvbHlnbG90LnJlcGxhY2UoKWAuXG4vL1xuLy8gUGFzcyBpbiBhbiBvYmplY3QgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byBwZXJmb3JtIGludGVycG9sYXRpb24uXG4vL1xuLy8gICAgIHBvbHlnbG90LnQoXCJoZWxsb19uYW1lXCIsIHtuYW1lOiBcIlNwaWtlXCJ9KTtcbi8vICAgICA9PiBcIkhlbGxvLCBTcGlrZVwiXG4vL1xuLy8gSWYgeW91IGxpa2UsIHlvdSBjYW4gcHJvdmlkZSBhIGRlZmF1bHQgdmFsdWUgaW4gY2FzZSB0aGUgcGhyYXNlIGlzIG1pc3NpbmcuXG4vLyBVc2UgdGhlIHNwZWNpYWwgb3B0aW9uIGtleSBcIl9cIiB0byBzcGVjaWZ5IGEgZGVmYXVsdC5cbi8vXG4vLyAgICAgcG9seWdsb3QudChcImlfbGlrZV90b193cml0ZV9pbl9sYW5ndWFnZVwiLCB7XG4vLyAgICAgICBfOiBcIkkgbGlrZSB0byB3cml0ZSBpbiAle2xhbmd1YWdlfS5cIixcbi8vICAgICAgIGxhbmd1YWdlOiBcIkphdmFTY3JpcHRcIlxuLy8gICAgIH0pO1xuLy8gICAgID0+IFwiSSBsaWtlIHRvIHdyaXRlIGluIEphdmFTY3JpcHQuXCJcbi8vXG5Qb2x5Z2xvdC5wcm90b3R5cGUudCA9IGZ1bmN0aW9uIChrZXksIG9wdGlvbnMpIHtcbiAgdmFyIHBocmFzZSwgcmVzdWx0O1xuICB2YXIgb3B0cyA9IG9wdGlvbnMgPT0gbnVsbCA/IHt9IDogb3B0aW9ucztcbiAgaWYgKHR5cGVvZiB0aGlzLnBocmFzZXNba2V5XSA9PT0gJ3N0cmluZycpIHtcbiAgICBwaHJhc2UgPSB0aGlzLnBocmFzZXNba2V5XTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0cy5fID09PSAnc3RyaW5nJykge1xuICAgIHBocmFzZSA9IG9wdHMuXztcbiAgfSBlbHNlIGlmICh0aGlzLm9uTWlzc2luZ0tleSkge1xuICAgIHZhciBvbk1pc3NpbmdLZXkgPSB0aGlzLm9uTWlzc2luZ0tleTtcbiAgICByZXN1bHQgPSBvbk1pc3NpbmdLZXkoa2V5LCBvcHRzLCB0aGlzLmN1cnJlbnRMb2NhbGUsIHRoaXMudG9rZW5SZWdleCwgdGhpcy5wbHVyYWxSdWxlcyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy53YXJuKCdNaXNzaW5nIHRyYW5zbGF0aW9uIGZvciBrZXk6IFwiJyArIGtleSArICdcIicpO1xuICAgIHJlc3VsdCA9IGtleTtcbiAgfVxuICBpZiAodHlwZW9mIHBocmFzZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXN1bHQgPSB0cmFuc2Zvcm1QaHJhc2UocGhyYXNlLCBvcHRzLCB0aGlzLmN1cnJlbnRMb2NhbGUsIHRoaXMudG9rZW5SZWdleCwgdGhpcy5wbHVyYWxSdWxlcyk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLy8gIyMjIHBvbHlnbG90LmhhcyhrZXkpXG4vL1xuLy8gQ2hlY2sgaWYgcG9seWdsb3QgaGFzIGEgdHJhbnNsYXRpb24gZm9yIGdpdmVuIGtleVxuUG9seWdsb3QucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIGhhcyh0aGlzLnBocmFzZXMsIGtleSk7XG59O1xuXG4vLyBleHBvcnQgdHJhbnNmb3JtUGhyYXNlXG5Qb2x5Z2xvdC50cmFuc2Zvcm1QaHJhc2UgPSBmdW5jdGlvbiB0cmFuc2Zvcm0ocGhyYXNlLCBzdWJzdGl0dXRpb25zLCBsb2NhbGUpIHtcbiAgcmV0dXJuIHRyYW5zZm9ybVBocmFzZShwaHJhc2UsIHN1YnN0aXR1dGlvbnMsIGxvY2FsZSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvbHlnbG90O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5c1NoaW07XG5pZiAoIU9iamVjdC5rZXlzKSB7XG5cdC8vIG1vZGlmaWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2VzLXNoaW1zL2VzNS1zaGltXG5cdHZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXHR2YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXHR2YXIgaXNBcmdzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGdsb2JhbC1yZXF1aXJlXG5cdHZhciBpc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXHR2YXIgaGFzRG9udEVudW1CdWcgPSAhaXNFbnVtZXJhYmxlLmNhbGwoeyB0b1N0cmluZzogbnVsbCB9LCAndG9TdHJpbmcnKTtcblx0dmFyIGhhc1Byb3RvRW51bUJ1ZyA9IGlzRW51bWVyYWJsZS5jYWxsKGZ1bmN0aW9uICgpIHt9LCAncHJvdG90eXBlJyk7XG5cdHZhciBkb250RW51bXMgPSBbXG5cdFx0J3RvU3RyaW5nJyxcblx0XHQndG9Mb2NhbGVTdHJpbmcnLFxuXHRcdCd2YWx1ZU9mJyxcblx0XHQnaGFzT3duUHJvcGVydHknLFxuXHRcdCdpc1Byb3RvdHlwZU9mJyxcblx0XHQncHJvcGVydHlJc0VudW1lcmFibGUnLFxuXHRcdCdjb25zdHJ1Y3Rvcidcblx0XTtcblx0dmFyIGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlID0gZnVuY3Rpb24gKG8pIHtcblx0XHR2YXIgY3RvciA9IG8uY29uc3RydWN0b3I7XG5cdFx0cmV0dXJuIGN0b3IgJiYgY3Rvci5wcm90b3R5cGUgPT09IG87XG5cdH07XG5cdHZhciBleGNsdWRlZEtleXMgPSB7XG5cdFx0JGFwcGxpY2F0aW9uQ2FjaGU6IHRydWUsXG5cdFx0JGNvbnNvbGU6IHRydWUsXG5cdFx0JGV4dGVybmFsOiB0cnVlLFxuXHRcdCRmcmFtZTogdHJ1ZSxcblx0XHQkZnJhbWVFbGVtZW50OiB0cnVlLFxuXHRcdCRmcmFtZXM6IHRydWUsXG5cdFx0JGlubmVySGVpZ2h0OiB0cnVlLFxuXHRcdCRpbm5lcldpZHRoOiB0cnVlLFxuXHRcdCRvbm1vemZ1bGxzY3JlZW5jaGFuZ2U6IHRydWUsXG5cdFx0JG9ubW96ZnVsbHNjcmVlbmVycm9yOiB0cnVlLFxuXHRcdCRvdXRlckhlaWdodDogdHJ1ZSxcblx0XHQkb3V0ZXJXaWR0aDogdHJ1ZSxcblx0XHQkcGFnZVhPZmZzZXQ6IHRydWUsXG5cdFx0JHBhZ2VZT2Zmc2V0OiB0cnVlLFxuXHRcdCRwYXJlbnQ6IHRydWUsXG5cdFx0JHNjcm9sbExlZnQ6IHRydWUsXG5cdFx0JHNjcm9sbFRvcDogdHJ1ZSxcblx0XHQkc2Nyb2xsWDogdHJ1ZSxcblx0XHQkc2Nyb2xsWTogdHJ1ZSxcblx0XHQkc2VsZjogdHJ1ZSxcblx0XHQkd2Via2l0SW5kZXhlZERCOiB0cnVlLFxuXHRcdCR3ZWJraXRTdG9yYWdlSW5mbzogdHJ1ZSxcblx0XHQkd2luZG93OiB0cnVlXG5cdH07XG5cdHZhciBoYXNBdXRvbWF0aW9uRXF1YWxpdHlCdWcgPSAoZnVuY3Rpb24gKCkge1xuXHRcdC8qIGdsb2JhbCB3aW5kb3cgKi9cblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0Zm9yICh2YXIgayBpbiB3aW5kb3cpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGlmICghZXhjbHVkZWRLZXlzWyckJyArIGtdICYmIGhhcy5jYWxsKHdpbmRvdywgaykgJiYgd2luZG93W2tdICE9PSBudWxsICYmIHR5cGVvZiB3aW5kb3dba10gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlKHdpbmRvd1trXSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0oKSk7XG5cdHZhciBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZUlmTm90QnVnZ3kgPSBmdW5jdGlvbiAobykge1xuXHRcdC8qIGdsb2JhbCB3aW5kb3cgKi9cblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgIWhhc0F1dG9tYXRpb25FcXVhbGl0eUJ1Zykge1xuXHRcdFx0cmV0dXJuIGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlKG8pO1xuXHRcdH1cblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlKG8pO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH07XG5cblx0a2V5c1NoaW0gPSBmdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuXHRcdHZhciBpc09iamVjdCA9IG9iamVjdCAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0Jztcblx0XHR2YXIgaXNGdW5jdGlvbiA9IHRvU3RyLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblx0XHR2YXIgaXNBcmd1bWVudHMgPSBpc0FyZ3Mob2JqZWN0KTtcblx0XHR2YXIgaXNTdHJpbmcgPSBpc09iamVjdCAmJiB0b1N0ci5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xuXHRcdHZhciB0aGVLZXlzID0gW107XG5cblx0XHRpZiAoIWlzT2JqZWN0ICYmICFpc0Z1bmN0aW9uICYmICFpc0FyZ3VtZW50cykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmtleXMgY2FsbGVkIG9uIGEgbm9uLW9iamVjdCcpO1xuXHRcdH1cblxuXHRcdHZhciBza2lwUHJvdG8gPSBoYXNQcm90b0VudW1CdWcgJiYgaXNGdW5jdGlvbjtcblx0XHRpZiAoaXNTdHJpbmcgJiYgb2JqZWN0Lmxlbmd0aCA+IDAgJiYgIWhhcy5jYWxsKG9iamVjdCwgMCkpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0Lmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdHRoZUtleXMucHVzaChTdHJpbmcoaSkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChpc0FyZ3VtZW50cyAmJiBvYmplY3QubGVuZ3RoID4gMCkge1xuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBvYmplY3QubGVuZ3RoOyArK2opIHtcblx0XHRcdFx0dGhlS2V5cy5wdXNoKFN0cmluZyhqKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvciAodmFyIG5hbWUgaW4gb2JqZWN0KSB7XG5cdFx0XHRcdGlmICghKHNraXBQcm90byAmJiBuYW1lID09PSAncHJvdG90eXBlJykgJiYgaGFzLmNhbGwob2JqZWN0LCBuYW1lKSkge1xuXHRcdFx0XHRcdHRoZUtleXMucHVzaChTdHJpbmcobmFtZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGhhc0RvbnRFbnVtQnVnKSB7XG5cdFx0XHR2YXIgc2tpcENvbnN0cnVjdG9yID0gZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGVJZk5vdEJ1Z2d5KG9iamVjdCk7XG5cblx0XHRcdGZvciAodmFyIGsgPSAwOyBrIDwgZG9udEVudW1zLmxlbmd0aDsgKytrKSB7XG5cdFx0XHRcdGlmICghKHNraXBDb25zdHJ1Y3RvciAmJiBkb250RW51bXNba10gPT09ICdjb25zdHJ1Y3RvcicpICYmIGhhcy5jYWxsKG9iamVjdCwgZG9udEVudW1zW2tdKSkge1xuXHRcdFx0XHRcdHRoZUtleXMucHVzaChkb250RW51bXNba10pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGVLZXlzO1xuXHR9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBrZXlzU2hpbTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIGlzQXJncyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKTtcblxudmFyIG9yaWdLZXlzID0gT2JqZWN0LmtleXM7XG52YXIga2V5c1NoaW0gPSBvcmlnS2V5cyA/IGZ1bmN0aW9uIGtleXMobykgeyByZXR1cm4gb3JpZ0tleXMobyk7IH0gOiByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbnZhciBvcmlnaW5hbEtleXMgPSBPYmplY3Qua2V5cztcblxua2V5c1NoaW0uc2hpbSA9IGZ1bmN0aW9uIHNoaW1PYmplY3RLZXlzKCkge1xuXHRpZiAoT2JqZWN0LmtleXMpIHtcblx0XHR2YXIga2V5c1dvcmtzV2l0aEFyZ3VtZW50cyA9IChmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBTYWZhcmkgNS4wIGJ1Z1xuXHRcdFx0dmFyIGFyZ3MgPSBPYmplY3Qua2V5cyhhcmd1bWVudHMpO1xuXHRcdFx0cmV0dXJuIGFyZ3MgJiYgYXJncy5sZW5ndGggPT09IGFyZ3VtZW50cy5sZW5ndGg7XG5cdFx0fSgxLCAyKSk7XG5cdFx0aWYgKCFrZXlzV29ya3NXaXRoQXJndW1lbnRzKSB7XG5cdFx0XHRPYmplY3Qua2V5cyA9IGZ1bmN0aW9uIGtleXMob2JqZWN0KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG5cdFx0XHRcdGlmIChpc0FyZ3Mob2JqZWN0KSkge1xuXHRcdFx0XHRcdHJldHVybiBvcmlnaW5hbEtleXMoc2xpY2UuY2FsbChvYmplY3QpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gb3JpZ2luYWxLZXlzKG9iamVjdCk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRPYmplY3Qua2V5cyA9IGtleXNTaGltO1xuXHR9XG5cdHJldHVybiBPYmplY3Qua2V5cyB8fCBrZXlzU2hpbTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5c1NoaW07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcblx0dmFyIHN0ciA9IHRvU3RyLmNhbGwodmFsdWUpO1xuXHR2YXIgaXNBcmdzID0gc3RyID09PSAnW29iamVjdCBBcmd1bWVudHNdJztcblx0aWYgKCFpc0FyZ3MpIHtcblx0XHRpc0FyZ3MgPSBzdHIgIT09ICdbb2JqZWN0IEFycmF5XScgJiZcblx0XHRcdHZhbHVlICE9PSBudWxsICYmXG5cdFx0XHR0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmXG5cdFx0XHR0eXBlb2YgdmFsdWUubGVuZ3RoID09PSAnbnVtYmVyJyAmJlxuXHRcdFx0dmFsdWUubGVuZ3RoID49IDAgJiZcblx0XHRcdHRvU3RyLmNhbGwodmFsdWUuY2FsbGVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblx0fVxuXHRyZXR1cm4gaXNBcmdzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCdlcy1hYnN0cmFjdC8yMDIwL1JlcXVpcmVPYmplY3RDb2VyY2libGUnKTtcbnZhciBUb1N0cmluZyA9IHJlcXVpcmUoJ2VzLWFic3RyYWN0LzIwMjAvVG9TdHJpbmcnKTtcbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJpbmQvY2FsbEJvdW5kJyk7XG52YXIgJHJlcGxhY2UgPSBjYWxsQm91bmQoJ1N0cmluZy5wcm90b3R5cGUucmVwbGFjZScpO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb250cm9sLXJlZ2V4ICovXG52YXIgbGVmdFdoaXRlc3BhY2UgPSAvXltcXHgwOVxceDBBXFx4MEJcXHgwQ1xceDBEXFx4MjBcXHhBMFxcdTE2ODBcXHUxODBFXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMEFcXHUyMDJGXFx1MjA1RlxcdTMwMDBcXHUyMDI4XFx1MjAyOVxcdUZFRkZdKy87XG52YXIgcmlnaHRXaGl0ZXNwYWNlID0gL1tcXHgwOVxceDBBXFx4MEJcXHgwQ1xceDBEXFx4MjBcXHhBMFxcdTE2ODBcXHUxODBFXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMEFcXHUyMDJGXFx1MjA1RlxcdTMwMDBcXHUyMDI4XFx1MjAyOVxcdUZFRkZdKyQvO1xuLyogZXNsaW50LWVuYWJsZSBuby1jb250cm9sLXJlZ2V4ICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJpbSgpIHtcblx0dmFyIFMgPSBUb1N0cmluZyhSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpKTtcblx0cmV0dXJuICRyZXBsYWNlKCRyZXBsYWNlKFMsIGxlZnRXaGl0ZXNwYWNlLCAnJyksIHJpZ2h0V2hpdGVzcGFjZSwgJycpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnY2FsbC1iaW5kJyk7XG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xudmFyIHNoaW0gPSByZXF1aXJlKCcuL3NoaW0nKTtcblxudmFyIGJvdW5kVHJpbSA9IGNhbGxCaW5kKGdldFBvbHlmaWxsKCkpO1xuXG5kZWZpbmUoYm91bmRUcmltLCB7XG5cdGdldFBvbHlmaWxsOiBnZXRQb2x5ZmlsbCxcblx0aW1wbGVtZW50YXRpb246IGltcGxlbWVudGF0aW9uLFxuXHRzaGltOiBzaGltXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBib3VuZFRyaW07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbXBsZW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcblxudmFyIHplcm9XaWR0aFNwYWNlID0gJ1xcdTIwMGInO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldFBvbHlmaWxsKCkge1xuXHRpZiAoU3RyaW5nLnByb3RvdHlwZS50cmltICYmIHplcm9XaWR0aFNwYWNlLnRyaW0oKSA9PT0gemVyb1dpZHRoU3BhY2UpIHtcblx0XHRyZXR1cm4gU3RyaW5nLnByb3RvdHlwZS50cmltO1xuXHR9XG5cdHJldHVybiBpbXBsZW1lbnRhdGlvbjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZpbmUgPSByZXF1aXJlKCdkZWZpbmUtcHJvcGVydGllcycpO1xudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNoaW1TdHJpbmdUcmltKCkge1xuXHR2YXIgcG9seWZpbGwgPSBnZXRQb2x5ZmlsbCgpO1xuXHRkZWZpbmUoU3RyaW5nLnByb3RvdHlwZSwgeyB0cmltOiBwb2x5ZmlsbCB9LCB7XG5cdFx0dHJpbTogZnVuY3Rpb24gdGVzdFRyaW0oKSB7XG5cdFx0XHRyZXR1cm4gU3RyaW5nLnByb3RvdHlwZS50cmltICE9PSBwb2x5ZmlsbDtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gcG9seWZpbGw7XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBfX0RFVl9fID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJztcblxudmFyIHdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAoX19ERVZfXykge1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMSA/IGxlbiAtIDEgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAxOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDFdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXG4gICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfVxuXG4gIHdhcm5pbmcgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMiA/IGxlbiAtIDIgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAyOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDJdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgICAnbWVzc2FnZSBhcmd1bWVudCdcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkobnVsbCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcbiIsImltcG9ydCB7IElQYWdlVmFsaWRhdGlvbkhvb2ssIEVycm9yQmxvY2sgfSBmcm9tICcuLi8uLi8uLi8uLi9zcmMvYnJvd3NlcidcblxuZXhwb3J0IGNvbnN0IGhvb2s6IElQYWdlVmFsaWRhdGlvbkhvb2sgPSB7XG4gIGNvbXBvbmVudE5hbWU6ICdmYXZvdXJpdGUtY29sb3VyJyxcbiAgcmVnaXN0ZXI6ICh7IGRhdGFJZCwgZm9ybSB9KSA9PiB7XG4gICAgY29uc3QgaW5wdXRGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKGRhdGFJZClbMF0gYXMgSFRNTElucHV0RWxlbWVudFxuXG4gICAgaW5wdXRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGVycm9yQmxvY2sgPSBuZXcgRXJyb3JCbG9jayhkYXRhSWQpXG4gICAgICBmb3JtXG4gICAgICAgIC52YWxpZGF0b3JGb3IoZGF0YUlkKVxuICAgICAgICA/LnZhbGlkYXRlKGlucHV0RmllbGQudmFsdWUpXG4gICAgICAgIC5mb3JFYWNoKChlKSA9PiBlcnJvckJsb2NrLmFkZChmb3JtLnZpZXcudHJhbnNsYXRlKGUpKSlcbiAgICAgIGVycm9yQmxvY2sucmVuZGVyKClcbiAgICB9KVxuICB9XG59XG4iLCJpbXBvcnQgeyBob29rIGFzIGZhdm91cml0ZUNvbG91ckhvb2sgfSBmcm9tICcuL2Zhdm91cml0ZS1jb2xvdXInXG5cbmV4cG9ydCBjb25zdCBob29rcyA9IFtmYXZvdXJpdGVDb2xvdXJIb29rXVxuIiwiZXhwb3J0ICogZnJvbSAnLi9wYWdlLXZhbGlkYXRpb24tcGx1Z2luJ1xuZXhwb3J0IHsgRXJyb3JCbG9jayB9IGZyb20gJy4uL3RlbXBsYXRlcy9lcnJvci1ibG9jaydcbiIsImltcG9ydCB7IElGb3Jtc0J1aWxkZXJQbHVnaW4sIEZvcm0sIEZpZWxkU2V0LCBGaWVsZCB9IGZyb20gJ0B0bmdibC9mb3JtcydcbmltcG9ydCB7IGV2ZW50SG9va3MgYXMgY29yZUV2ZW50SG9va3MgfSBmcm9tICcuLi90ZW1wbGF0ZXMnXG5pbXBvcnQgeyB2ZXJzaW9uLCBuYW1lIH0gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJ1xuXG5kZWNsYXJlIG1vZHVsZSAnQHRuZ2JsL2Zvcm1zJyB7XG4gIGludGVyZmFjZSBGb3JtIHtcbiAgICAvKipcbiAgICAgKiBCaW5kcyBhbGwgcGFnZSBiaW5kaW5ncyByZWxldmFudCB0byB0aGUgZm9ybSBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQWRkZWQgYnkgdGhlIEB0bmdibC9mb3Jtcy1udW5qdWNrcyBwbHVnaW5cbiAgICAgKi9cbiAgICBiaW5kVG9QYWdlKCk6IHZvaWRcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElQYWdlVmFsaWRhdGlvbkhvb2tBcmdzIHtcbiAgZGF0YUlkOiBzdHJpbmdcbiAgZm9ybTogRm9ybVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElQYWdlVmFsaWRhdGlvbkhvb2sge1xuICBjb21wb25lbnROYW1lOiBzdHJpbmdcbiAgcmVnaXN0ZXI6IChhcmdzOiBJUGFnZVZhbGlkYXRpb25Ib29rQXJncykgPT4gdm9pZFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhZ2VWYWxpZGF0aW9uUGx1Z2luT3B0aW9ucyB7XG4gIGhvb2tzOiBJUGFnZVZhbGlkYXRpb25Ib29rW11cbn1cblxuZXhwb3J0IGNvbnN0IHBhZ2VWYWxpZGF0aW9uID0gKFxuICBvcHRzOiBQYWdlVmFsaWRhdGlvblBsdWdpbk9wdGlvbnNcbik6IElGb3Jtc0J1aWxkZXJQbHVnaW4gPT4ge1xuICBjb25zdCBob29rcyA9IFsuLi5jb3JlRXZlbnRIb29rcywgLi4uKG9wdHMuaG9va3MgfHwgW10pXVxuXG4gIHJldHVybiB7XG4gICAgbmFtZTogYHBhZ2UtdmFsaWRhdGlvbmAsXG4gICAgZnJvbVBhY2thZ2U6IG5hbWUsXG4gICAgdmVyc2lvbixcbiAgICByZWdpc3RlcigpOiB2b2lkIHtcbiAgICAgIEZvcm0ucHJvdG90eXBlLmJpbmRUb1BhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IF9iaW5kID0gKGNvbXBvbmVudDogRm9ybSB8IEZpZWxkU2V0IHwgRmllbGQpOiB2b2lkID0+IHtcbiAgICAgICAgICBpZiAoY29tcG9uZW50IGluc3RhbmNlb2YgRm9ybSkge1xuICAgICAgICAgICAgX2JpbmQoY29tcG9uZW50LnNjaGVtYSlcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvbXBvbmVudCBpbnN0YW5jZW9mIEZpZWxkU2V0KSB7XG4gICAgICAgICAgICBjb21wb25lbnQuc3RydWN0dXJlLmZvckVhY2goX2JpbmQpXG4gICAgICAgICAgfSBlbHNlIGlmIChjb21wb25lbnQgaW5zdGFuY2VvZiBGaWVsZCkge1xuICAgICAgICAgICAgY29uc3QgaG9vayA9IGhvb2tzLmZpbmQoXG4gICAgICAgICAgICAgIChob29rKSA9PiBob29rLmNvbXBvbmVudE5hbWUgPT09IGNvbXBvbmVudC52aWV3VHlwZVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgaWYgKCFob29rKSB0aHJvdyBFcnJvcihgTWlzc2luZyBob29rIG5hbWVkICR7Y29tcG9uZW50LnZpZXdUeXBlfWApXG4gICAgICAgICAgICBob29rLnJlZ2lzdGVyKHtcbiAgICAgICAgICAgICAgZGF0YUlkOiBjb21wb25lbnQubmFtZSxcbiAgICAgICAgICAgICAgZm9ybTogdGhpc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIGl0ZW0gaW4gZm9ybSBzdHJ1Y3R1cmUgJHtjb21wb25lbnR9YClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX2JpbmQodGhpcylcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBFcnJvckJsb2NrIHtcbiAgZWxlbWVudDogSFRNTFVMaXN0RWxlbWVudFxuICBlcnJvcnM6IHN0cmluZ1tdID0gW11cblxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgIG5hbWUgKyAnX19lcnJvci1ibG9jaydcbiAgICApIGFzIEhUTUxVTGlzdEVsZW1lbnRcbiAgfVxuXG4gIGFkZChlcnJvcjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5lcnJvcnMucHVzaChlcnJvcilcbiAgfVxuXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuZXJyb3JzID0gW11cbiAgfVxuXG4gIHJlbmRlcigpOiB2b2lkIHtcbiAgICB0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5lcnJvcnNcbiAgICAgIC5tYXAoKGVycm9yKSA9PiBgPGxpPiR7ZXJyb3J9PC9saT5gKVxuICAgICAgLmpvaW4oJ1xcbicpXG4gIH1cbn1cbiIsImltcG9ydCBuZXdQYXNzd29yZEV2ZW50SG9vayBmcm9tICcuL25ldy1wYXNzd29yZCdcblxuZXhwb3J0IGNvbnN0IGV2ZW50SG9va3MgPSBbbmV3UGFzc3dvcmRFdmVudEhvb2tdXG4iLCJpbXBvcnQgeyBJUGFnZVZhbGlkYXRpb25Ib29rLCBFcnJvckJsb2NrIH0gZnJvbSAnLi4vYnJvd3NlcidcblxuY29uc3QgZXZlbnRIb29rOiBJUGFnZVZhbGlkYXRpb25Ib29rID0ge1xuICBjb21wb25lbnROYW1lOiAnbmV3LXBhc3N3b3JkJyxcbiAgcmVnaXN0ZXI6ICh7IGRhdGFJZCwgZm9ybSB9KSA9PiB7XG4gICAgY29uc3QgaW5wdXRFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JylcblxuICAgIGxldCBjb25maXJtVG91Y2hlZCA9IGZhbHNlXG5cbiAgICBjb25zdCBvbklucHV0Q2hhbmdlID0gKCkgPT4ge1xuICAgICAgY29uc3QgZXJyb3JCbG9jayA9IG5ldyBFcnJvckJsb2NrKGRhdGFJZClcblxuICAgICAgaWYgKGNvbmZpcm1Ub3VjaGVkKSB7XG4gICAgICAgIGZvcm1cbiAgICAgICAgICAudmFsaWRhdG9yRm9yKGRhdGFJZClcbiAgICAgICAgICA/LnZhbGlkYXRlKGlucHV0RWxlbWVudHNbMF0udmFsdWUpXG4gICAgICAgICAgLmZvckVhY2goKGVycm9yKSA9PiBlcnJvckJsb2NrLmFkZChmb3JtLnZpZXcudHJhbnNsYXRlKGVycm9yKSkpXG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgbWF0Y2hpbmdcbiAgICAgICAgaWYgKGlucHV0RWxlbWVudHNbMF0udmFsdWUgIT09IGlucHV0RWxlbWVudHNbMV0udmFsdWUpIHtcbiAgICAgICAgICBlcnJvckJsb2NrLmFkZChcbiAgICAgICAgICAgIGZvcm0udmlldy50cmFuc2xhdGUoe1xuICAgICAgICAgICAgICB0cmFuc2xhdGVLZXk6ICd2YWxpZGF0aW9ucy5uZXctcGFzc3dvcmQuY29uZmlybS1kb2VzLW5vdC1tYXRjaCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlcnJvckJsb2NrLnJlbmRlcigpXG4gICAgfVxuXG4gICAgY29uc3Qgb25Gb2N1cyA9ICgpID0+IHtcbiAgICAgIGNvbmZpcm1Ub3VjaGVkID0gdHJ1ZVxuICAgIH1cblxuICAgIGlucHV0RWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIG9uRm9jdXMpXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25JbnB1dENoYW5nZSlcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGV2ZW50SG9va1xuIiwiaW1wb3J0IHsgSUZvcm1zQnVpbGRlclBsdWdpbiB9IGZyb20gJy4uL21ha2UtZm9ybS1idWlsZGVyJ1xuaW1wb3J0IHsgY29yZVZhbGlkYXRpb25CdWlsZGVycyB9IGZyb20gJy4vdmFsaWRhdGlvbnMnXG5pbXBvcnQgeyBjb3JlVHJpZ2dlckNvbmRpdGlvbkJ1aWxkZXJzIH0gZnJvbSAnLi90cmlnZ2VycydcbmltcG9ydCB7IGNvcmVWaWV3QnVpbGRlcnMgfSBmcm9tICcuL3ZpZXdzJ1xuaW1wb3J0IHsgdmVyc2lvbiwgbmFtZSBhcyBwa2dOYW1lIH0gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJ1xuXG5leHBvcnQgY29uc3QgY29yZTogSUZvcm1zQnVpbGRlclBsdWdpbiAmIHtcbiAgdmFsaWRhdGlvbnM6IElGb3Jtc0J1aWxkZXJQbHVnaW5cbiAgZGF0YVRyaWdnZXJzOiBJRm9ybXNCdWlsZGVyUGx1Z2luXG4gIHZpZXdzOiBJRm9ybXNCdWlsZGVyUGx1Z2luXG59ID0ge1xuICBuYW1lOiBgY29yZWAsXG4gIHZlcnNpb24sXG4gIGZyb21QYWNrYWdlOiBwa2dOYW1lLFxuICByZWdpc3RlcihidWlsZGVyKSB7XG4gICAgYnVpbGRlci53aXRoQnVpbGRlcnMoXG4gICAgICBbXG4gICAgICAgIC4uLmNvcmVWYWxpZGF0aW9uQnVpbGRlcnMsXG4gICAgICAgIC4uLmNvcmVUcmlnZ2VyQ29uZGl0aW9uQnVpbGRlcnMsXG4gICAgICAgIC4uLmNvcmVWaWV3QnVpbGRlcnNcbiAgICAgIF0sXG4gICAgICAnY29yZScsXG4gICAgICBwa2dOYW1lLFxuICAgICAgdmVyc2lvblxuICAgIClcbiAgfSxcbiAgdmFsaWRhdGlvbnM6IHtcbiAgICBuYW1lOiBgY29yZS52YWxpZGF0aW9uc2AsXG4gICAgdmVyc2lvbixcbiAgICBmcm9tUGFja2FnZTogcGtnTmFtZSxcbiAgICByZWdpc3RlcihidWlsZGVyKSB7XG4gICAgICBidWlsZGVyLndpdGhCdWlsZGVycyhcbiAgICAgICAgY29yZVZhbGlkYXRpb25CdWlsZGVycyxcbiAgICAgICAgJ2NvcmUudmFsaWRhdGlvbnMnLFxuICAgICAgICBwa2dOYW1lLFxuICAgICAgICB2ZXJzaW9uXG4gICAgICApXG4gICAgfVxuICB9LFxuICBkYXRhVHJpZ2dlcnM6IHtcbiAgICBuYW1lOiBgY29yZS5kYXRhVHJpZ2dlcnNgLFxuICAgIHZlcnNpb24sXG4gICAgZnJvbVBhY2thZ2U6IHBrZ05hbWUsXG4gICAgcmVnaXN0ZXIoYnVpbGRlcikge1xuICAgICAgYnVpbGRlci53aXRoQnVpbGRlcnMoXG4gICAgICAgIGNvcmVUcmlnZ2VyQ29uZGl0aW9uQnVpbGRlcnMsXG4gICAgICAgICdjb3JlLmRhdGFUcmlnZ2VycycsXG4gICAgICAgIHBrZ05hbWUsXG4gICAgICAgIHZlcnNpb25cbiAgICAgIClcbiAgICB9XG4gIH0sXG4gIHZpZXdzOiB7XG4gICAgbmFtZTogYGNvcmUudmlld3NgLFxuICAgIHZlcnNpb24sXG4gICAgZnJvbVBhY2thZ2U6IHBrZ05hbWUsXG4gICAgcmVnaXN0ZXIoYnVpbGRlcikge1xuICAgICAgYnVpbGRlci53aXRoQnVpbGRlcnMoY29yZVZpZXdCdWlsZGVycywgJ2NvcmUudmlld3MnLCBwa2dOYW1lLCB2ZXJzaW9uKVxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi92YWxpZGF0aW9ucydcbmV4cG9ydCAqIGZyb20gJy4vdHJpZ2dlcnMnXG5leHBvcnQgKiBmcm9tICcuL2NvcmUtcGx1Z2luJ1xuIiwiaW1wb3J0IHtcbiAgSVRyaWdnZXJDb25kaXRpb24sXG4gIElUcmlnZ2VyQ29uZGl0aW9uQnVpbGRlcixcbiAgU3RvcmVkUGxhaW5PYmplY3Rcbn0gZnJvbSAnLi4vLi4vQHR5cGVzJ1xuaW1wb3J0IHsgRm9ybURhdGEgfSBmcm9tICcuLi8uLi9mb3JtJ1xuaW1wb3J0IHsgZmluZEluRGF0YSB9IGZyb20gJy4uLy4uL3V0aWxzL2ZpbmQnXG5pbXBvcnQgeyBoYXNQcm9wZXJ0eSB9IGZyb20gJy4uLy4uL3V0aWxzJ1xuaW1wb3J0IHsgRmFsc2UgfSBmcm9tICcuJ1xuXG5pbnRlcmZhY2UgSUZvcm1EYXRhUmVmZXJlbmNlIHtcbiAgZGF0YUlkOiBzdHJpbmcgfCB1bmRlZmluZWRcbn1cblxudHlwZSBNYXRjaCA9IG51bWJlciB8IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGwgfCBJRm9ybURhdGFSZWZlcmVuY2VcbkZhbHNlXG5leHBvcnQgY2xhc3MgRXF1YWxzVHJpZ2dlckNvbmRpdGlvbiBpbXBsZW1lbnRzIElUcmlnZ2VyQ29uZGl0aW9uIHtcbiAgc3RhdGljIFNlbGYgPSB7IGRhdGFJZDogdW5kZWZpbmVkIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbGVmdDogTWF0Y2gsXG4gICAgcHVibGljIHJpZ2h0OiBNYXRjaCA9IEVxdWFsc1RyaWdnZXJDb25kaXRpb24uU2VsZlxuICApIHt9XG5cbiAgaXNUcmlnZ2VyZWQoZGF0YUlkOiBzdHJpbmcsIGRhdGE6IEZvcm1EYXRhKTogYm9vbGVhbiB7XG4gICAgY29uc3QgbGVmdCA9IGhhc1Byb3BlcnR5KHRoaXMubGVmdCwgJ2RhdGFJZCcpXG4gICAgICA/IGZpbmRJbkRhdGEoXG4gICAgICAgICAgZGF0YSxcbiAgICAgICAgICB0aGlzLmxlZnQgPT09IEVxdWFsc1RyaWdnZXJDb25kaXRpb24uU2VsZlxuICAgICAgICAgICAgPyBkYXRhSWRcbiAgICAgICAgICAgIDogKHRoaXMubGVmdCBhcyBJRm9ybURhdGFSZWZlcmVuY2UpLmRhdGFJZCB8fCAnJ1xuICAgICAgICApXG4gICAgICA6IHRoaXMubGVmdFxuICAgIGNvbnN0IHJpZ2h0ID0gaGFzUHJvcGVydHkodGhpcy5yaWdodCwgJ2RhdGFJZCcpXG4gICAgICA/IGZpbmRJbkRhdGEoXG4gICAgICAgICAgZGF0YSxcbiAgICAgICAgICB0aGlzLnJpZ2h0ID09PSBFcXVhbHNUcmlnZ2VyQ29uZGl0aW9uLlNlbGZcbiAgICAgICAgICAgID8gZGF0YUlkXG4gICAgICAgICAgICA6ICh0aGlzLnJpZ2h0IGFzIElGb3JtRGF0YVJlZmVyZW5jZSkuZGF0YUlkIHx8ICcnXG4gICAgICAgIClcbiAgICAgIDogdGhpcy5yaWdodFxuICAgIHJldHVybiBsZWZ0ID09PSByaWdodFxuICB9XG5cbiAgdG9Kc29uKCk6IFN0b3JlZFBsYWluT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogRXF1YWxzVHJpZ2dlckNvbmRpdGlvbi5uYW1lLFxuICAgICAgbGVmdDogdGhpcy5sZWZ0LFxuICAgICAgcmlnaHQ6IHRoaXMucmlnaHRcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGJ1aWxkZXI6IElUcmlnZ2VyQ29uZGl0aW9uQnVpbGRlciA9IHtcbiAgdHlwZTogRXF1YWxzVHJpZ2dlckNvbmRpdGlvbi5uYW1lLFxuICBmcm9tSnNvbihqc29uLCBfYnVpbGRlcnMpOiBFcXVhbHNUcmlnZ2VyQ29uZGl0aW9uIHtcbiAgICByZXR1cm4gbmV3IEVxdWFsc1RyaWdnZXJDb25kaXRpb24oanNvbi5sZWZ0LCBqc29uLnJpZ2h0KVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBJVHJpZ2dlckNvbmRpdGlvbixcbiAgSVRyaWdnZXJDb25kaXRpb25CdWlsZGVyLFxuICBTdG9yZWRQbGFpbk9iamVjdFxufSBmcm9tICcuLi8uLi9AdHlwZXMnXG5cbmV4cG9ydCBjbGFzcyBGYWxzZVRyaWdnZXJDb25kaXRpb24gaW1wbGVtZW50cyBJVHJpZ2dlckNvbmRpdGlvbiB7XG4gIGlzVHJpZ2dlcmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgdG9Kc29uKCk6IFN0b3JlZFBsYWluT2JqZWN0IHtcbiAgICByZXR1cm4geyB0eXBlOiBGYWxzZVRyaWdnZXJDb25kaXRpb24ubmFtZSB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGJ1aWxkZXI6IElUcmlnZ2VyQ29uZGl0aW9uQnVpbGRlciA9IHtcbiAgdHlwZTogRmFsc2VUcmlnZ2VyQ29uZGl0aW9uLm5hbWUsXG4gIGZyb21Kc29uKCk6IEZhbHNlVHJpZ2dlckNvbmRpdGlvbiB7XG4gICAgcmV0dXJuIG5ldyBGYWxzZVRyaWdnZXJDb25kaXRpb24oKVxuICB9XG59XG4iLCJpbXBvcnQgeyBUcnVlVHJpZ2dlckNvbmRpdGlvbiwgYnVpbGRlciBhcyB0cnVlQnVpbGRlciB9IGZyb20gJy4vdHJ1ZSdcbmltcG9ydCB7IEZhbHNlVHJpZ2dlckNvbmRpdGlvbiwgYnVpbGRlciBhcyBmYWxzZUJ1aWxkZXIgfSBmcm9tICcuL2ZhbHNlJ1xuaW1wb3J0IHsgRXF1YWxzVHJpZ2dlckNvbmRpdGlvbiwgYnVpbGRlciBhcyBlcXVhbHNCdWlsZGVyIH0gZnJvbSAnLi9lcXVhbHMnXG5cbmV4cG9ydCB7XG4gIFRydWVUcmlnZ2VyQ29uZGl0aW9uIGFzIFRydWUsXG4gIEZhbHNlVHJpZ2dlckNvbmRpdGlvbiBhcyBGYWxzZSxcbiAgRXF1YWxzVHJpZ2dlckNvbmRpdGlvbiBhcyBFcXVhbHNcbn1cbmV4cG9ydCBjb25zdCBjb3JlVHJpZ2dlckNvbmRpdGlvbkJ1aWxkZXJzID0gW1xuICB0cnVlQnVpbGRlcixcbiAgZmFsc2VCdWlsZGVyLFxuICBlcXVhbHNCdWlsZGVyXG5dXG4iLCJpbXBvcnQge1xuICBJVHJpZ2dlckNvbmRpdGlvbixcbiAgSVRyaWdnZXJDb25kaXRpb25CdWlsZGVyLFxuICBTdG9yZWRQbGFpbk9iamVjdFxufSBmcm9tICcuLi8uLi9AdHlwZXMnXG5cbmV4cG9ydCBjbGFzcyBUcnVlVHJpZ2dlckNvbmRpdGlvbiBpbXBsZW1lbnRzIElUcmlnZ2VyQ29uZGl0aW9uIHtcbiAgaXNUcmlnZ2VyZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHRvSnNvbigpOiBTdG9yZWRQbGFpbk9iamVjdCB7XG4gICAgcmV0dXJuIHsgdHlwZTogVHJ1ZVRyaWdnZXJDb25kaXRpb24ubmFtZSB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGJ1aWxkZXI6IElUcmlnZ2VyQ29uZGl0aW9uQnVpbGRlciA9IHtcbiAgdHlwZTogVHJ1ZVRyaWdnZXJDb25kaXRpb24ubmFtZSxcbiAgZnJvbUpzb24oKTogVHJ1ZVRyaWdnZXJDb25kaXRpb24ge1xuICAgIHJldHVybiBuZXcgVHJ1ZVRyaWdnZXJDb25kaXRpb24oKVxuICB9XG59XG4iLCJpbXBvcnQgeyBidWlsZGVyIGFzIG1pbkxlbmd0aEJ1aWxkZXIsIE1pbkxlbmd0aFZhbGlkYXRpb24gfSBmcm9tICcuL21pbi1sZW5ndGgnXG5cbmV4cG9ydCB7IE1pbkxlbmd0aFZhbGlkYXRpb24gfVxuZXhwb3J0IGNvbnN0IGNvcmVWYWxpZGF0aW9uQnVpbGRlcnMgPSBbbWluTGVuZ3RoQnVpbGRlcl1cbiIsImltcG9ydCB7IGlzTnVsbE9yVW5kZWZpbmVkLCBpc051bWJlciB9IGZyb20gJy4uLy4uL3V0aWxzL3R5cGVzJ1xuaW1wb3J0IHtcbiAgSVZhbGlkYXRpb25Db25kaXRpb24sXG4gIElWYWxpZGF0aW9uQ29uZGl0aW9uQnVpbGRlcixcbiAgSVZhbGlkYXRpb25FcnJvcixcbiAgU3RvcmVkUGxhaW5PYmplY3Rcbn0gZnJvbSAnLi4vLi4vQHR5cGVzJ1xuaW1wb3J0IHsgRm9ybURhdGEgfSBmcm9tICcuLi8uLi9mb3JtJ1xuXG5pbnRlcmZhY2UgSU1lYXN1cmFibGUge1xuICBsZW5ndGg6IG51bWJlclxufVxuXG5leHBvcnQgY2xhc3MgTWluTGVuZ3RoVmFsaWRhdGlvbiBpbXBsZW1lbnRzIElWYWxpZGF0aW9uQ29uZGl0aW9uIHtcbiAgbGVuZ3RoOiBudW1iZXJcblxuICBjb25zdHJ1Y3RvcihsZW5ndGg6IG51bWJlcikge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoXG4gIH1cblxuICB2YWxpZGF0ZShpZDogc3RyaW5nLCBkYXRhOiBGb3JtRGF0YSk6IElWYWxpZGF0aW9uRXJyb3JbXSB7XG4gICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChkYXRhKSB8fCAhaXNOdW1iZXIoKGRhdGEgYXMgSU1lYXN1cmFibGUpLmxlbmd0aCkpIHtcbiAgICAgIHJldHVybiBbXVxuICAgIH1cbiAgICBpZiAoZGF0YS5sZW5ndGggPCB0aGlzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAge1xuICAgICAgICAgIGRhdGFJZDogaWQsXG4gICAgICAgICAgdmFsaWRhdGlvbjogTWluTGVuZ3RoVmFsaWRhdGlvbi5uYW1lLFxuICAgICAgICAgIGVycm9yOiAndG9vLXNob3J0JyxcbiAgICAgICAgICB0cmFuc2xhdGVLZXk6IGB2YWxpZGF0aW9ucy4ke01pbkxlbmd0aFZhbGlkYXRpb24ubmFtZX0udG9vLXNob3J0YCxcbiAgICAgICAgICB0cmFuc2xhdGVWYXJzOiB7IGxlbmd0aDogdGhpcy5sZW5ndGggfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXVxuICAgIH1cbiAgfVxuXG4gIHRvSnNvbigpOiBTdG9yZWRQbGFpbk9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IE1pbkxlbmd0aFZhbGlkYXRpb24ubmFtZSxcbiAgICAgIGxlbmd0aDogdGhpcy5sZW5ndGhcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGJ1aWxkZXI6IElWYWxpZGF0aW9uQ29uZGl0aW9uQnVpbGRlciA9IHtcbiAgdHlwZTogTWluTGVuZ3RoVmFsaWRhdGlvbi5uYW1lLFxuICBmcm9tSnNvbihvYmo6IFN0b3JlZFBsYWluT2JqZWN0KTogSVZhbGlkYXRpb25Db25kaXRpb24ge1xuICAgIGNvbnN0IHZhbGlkYXRpb24gPSBuZXcgTWluTGVuZ3RoVmFsaWRhdGlvbihvYmoubGVuZ3RoKVxuICAgIHJldHVybiB2YWxpZGF0aW9uXG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIElUcmFuc2xhdGFibGUsXG4gIFN0b3JlZFBsYWluT2JqZWN0LFxuICBTdHJpbmdUcmVlLFxuICBJVmlldyxcbiAgSVZpZXdCdWlsZGVyXG59IGZyb20gJy4uLy4uL0B0eXBlcydcbmltcG9ydCAqIGFzIFBvbHlnbG90IGZyb20gJ25vZGUtcG9seWdsb3QnXG5cbmV4cG9ydCBjbGFzcyBCYXNpY0Zvcm1WaWV3IGltcGxlbWVudHMgSVZpZXcge1xuICBsb2NhbGU6IHN0cmluZ1xuXG4gIHByaXZhdGUgX3RyYW5zbGF0aW9uczogU3RyaW5nVHJlZVxuICBwcml2YXRlIF9wb2x5Z2xvdDogUG9seWdsb3RcblxuICBwdWJsaWMgc2V0IHRyYW5zbGF0aW9ucyh0cmFuc2xhdGlvbnM6IFN0cmluZ1RyZWUpIHtcbiAgICB0aGlzLl90cmFuc2xhdGlvbnMgPSB0cmFuc2xhdGlvbnNcbiAgICB0aGlzLl9wb2x5Z2xvdCA9IG5ldyBQb2x5Z2xvdCh7IHBocmFzZXM6IHRyYW5zbGF0aW9ucyB9KVxuICB9XG5cbiAgcHVibGljIGdldCB0cmFuc2xhdGlvbnMoKTogU3RyaW5nVHJlZSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zbGF0aW9uc1xuICB9XG5cbiAgdHJhbnNsYXRlKGl0ZW06IElUcmFuc2xhdGFibGUpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9wb2x5Z2xvdC50KGl0ZW0udHJhbnNsYXRlS2V5LCBpdGVtLnRyYW5zbGF0ZVZhcnMpXG4gIH1cblxuICB0b0pzb24oKTogU3RvcmVkUGxhaW5PYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBCYXNpY0Zvcm1WaWV3Lm5hbWUsXG4gICAgICBsb2NhbGU6IHRoaXMubG9jYWxlLFxuICAgICAgdHJhbnNsYXRpb25zOiB0aGlzLl90cmFuc2xhdGlvbnNcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGJ1aWxkZXI6IElWaWV3QnVpbGRlciA9IHtcbiAgdHlwZTogQmFzaWNGb3JtVmlldy5uYW1lLFxuICBmcm9tSnNvbihqc29uOiBTdG9yZWRQbGFpbk9iamVjdCk6IEJhc2ljRm9ybVZpZXcge1xuICAgIGNvbnN0IHZpZXcgPSBuZXcgQmFzaWNGb3JtVmlldygpXG4gICAgdmlldy5sb2NhbGUgPSBqc29uLmxvY2FsZVxuICAgIHZpZXcudHJhbnNsYXRpb25zID0ganNvbi50cmFuc2xhdGlvbnNcbiAgICByZXR1cm4gdmlld1xuICB9XG59XG4iLCJpbXBvcnQgeyBCYXNpY0Zvcm1WaWV3LCBidWlsZGVyIH0gZnJvbSAnLi9iYXNpYy1mb3JtLXZpZXcnXG5cbmV4cG9ydCB7IEJhc2ljRm9ybVZpZXcgfVxuZXhwb3J0IGNvbnN0IGNvcmVWaWV3QnVpbGRlcnMgPSBbYnVpbGRlcl1cbiIsImV4cG9ydCBjbGFzcyBGb3JtU3ludGF4RXJyb3IgZXh0ZW5kcyBTeW50YXhFcnJvciB7fVxuIiwiaW1wb3J0IHsgVHJ1ZVRyaWdnZXJDb25kaXRpb24gfSBmcm9tICcuL2NvcmUvdHJpZ2dlcnMvdHJ1ZSdcbmltcG9ydCB7IFRyaWdnZXIgfSBmcm9tICcuL3RyaWdnZXInXG5pbXBvcnQge1xuICBJVmFsaWRhdGlvbkVycm9yLFxuICBJVmFsaWRhdGlvbkNvbmRpdGlvbixcbiAgU3RvcmVkUGxhaW5PYmplY3QsXG4gIEJ1aWxkZXIsXG4gIElUcmlnZ2VyQ29uZGl0aW9uXG59IGZyb20gJy4vQHR5cGVzJ1xuaW1wb3J0IHsgaXNOdWxsT3JVbmRlZmluZWQgfSBmcm9tICcuL3V0aWxzJ1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW5zdGFuY2Ugb2YgYSBmaWVsZCBpbiBhIGZvcm1cbiAqL1xuZXhwb3J0IGNsYXNzIEZpZWxkIHtcbiAgdmFsaWRhdGlvbkNvbmRpdGlvbnM6IElWYWxpZGF0aW9uQ29uZGl0aW9uW10gPSBbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcsIC8vIFVuaXF1ZSB0byB0aGUgRm9ybVNjaGVtYSBlLmcuIG1vdGhlcnNGaXJzdE5hbWVcbiAgICBwdWJsaWMgbGFiZWw6IHN0cmluZywgLy8gZS5nLiBNb3RoZXIncyBmaXJzdCBuYW1lXG4gICAgcHVibGljIHZpZXdUeXBlOiBzdHJpbmcsIC8vIERldGVybWluZXMgd2hhdCBjb21wb25lbnQgd2lsbCBiZSB1c2VkIGZvciBlZGl0aW5nL2Rpc3BsYXlpbmcgdGhlIGZpZWxkIGUuZy4gZmlyc3ROYW1lXG4gICAgcHVibGljIGlzUmVxdWlyZWQ6IFRyaWdnZXIgPSBUcmlnZ2VyLkFsd2F5c1RydWVcbiAgKSB7fVxuXG4gIHZhbGlkYXRlKGlkOiBzdHJpbmcsIGRhdGE6IEZvcm1EYXRhKTogSVZhbGlkYXRpb25FcnJvcltdIHtcbiAgICByZXR1cm4gdGhpcy52YWxpZGF0aW9uQ29uZGl0aW9ucy5tYXAoKHYpID0+IHYudmFsaWRhdGUoaWQsIGRhdGEpKS5mbGF0KClcbiAgfVxuXG4gIHRvSnNvbigpOiBTdG9yZWRQbGFpbk9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIGxhYmVsOiB0aGlzLmxhYmVsLFxuICAgICAgdHlwZTogRmllbGQubmFtZSxcbiAgICAgIHZpZXdUeXBlOiB0aGlzLnZpZXdUeXBlLFxuICAgICAgdmFsaWRhdGlvbkNvbmRpdGlvbnM6IHRoaXMudmFsaWRhdGlvbkNvbmRpdGlvbnMubWFwKCh2KSA9PiB2LnRvSnNvbigpKSxcbiAgICAgIGlzUmVxdWlyZWQ6XG4gICAgICAgIHRoaXMuaXNSZXF1aXJlZC50cmlnZ2VyIGluc3RhbmNlb2YgVHJ1ZVRyaWdnZXJDb25kaXRpb25cbiAgICAgICAgICA/IHRydWVcbiAgICAgICAgICA6IHRoaXMuaXNSZXF1aXJlZC50cmlnZ2VyLnRvSnNvbigpXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGpzb246IGFueSwgYnVpbGRlcnM6IEJ1aWxkZXJbXSk6IEZpZWxkIHtcbiAgICBpZiAoaXNOdWxsT3JVbmRlZmluZWQoanNvbi5pc1JlcXVpcmVkKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmllbGQgSlNPTiBtaXNzaW5nICdpc1JlcXVpcmVkJyBwcm9wZXJ0eWApXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGpzb24udmFsaWRhdGlvbkNvbmRpdGlvbnMpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgRmllbGQgSlNPTiAndmFsaWRhdGlvbkNvbmRpdGlvbnMnIHByb3BlcnR5IGlzIG5vdCBhbiBhcnJheWBcbiAgICAgIClcbiAgICBpZiAoaXNOdWxsT3JVbmRlZmluZWQoanNvbi5uYW1lKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmllbGQgSlNPTiBpcyBtaXNzaW5nICduYW1lJyBwcm9wZXJ0eWApXG4gICAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKGpzb24ubGFiZWwpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWVsZCBKU09OIGlzIG1pc3NpbmcgJ2xhYmVsJyBwcm9wZXJ0eWApXG4gICAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKGpzb24udmlld1R5cGUpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGaWVsZCBKU09OIGlzIG1vc3NpbmcgJ3ZpZXdUeXBlJyBwcm9wZXJ0eWApXG5cbiAgICBjb25zdCBpc1JlcXVpcmVkVHJpZ2dlciA9XG4gICAgICBqc29uLmlzUmVxdWlyZWQgPT09IHRydWVcbiAgICAgICAgPyBuZXcgVHJ1ZVRyaWdnZXJDb25kaXRpb24oKVxuICAgICAgICA6IGJ1aWxkZXJzXG4gICAgICAgICAgICAuZmluZCgoZHQpID0+IGR0LnR5cGUgPT09IGpzb24uaXNSZXF1aXJlZC50eXBlKVxuICAgICAgICAgICAgPy5mcm9tSnNvbihqc29uLmlzUmVxdWlyZWQpXG4gICAgaWYgKHR5cGVvZiBpc1JlcXVpcmVkVHJpZ2dlciA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYERhdGFUcmlnZ2VyICcke2pzb24/LmlzUmVxdWlyZWQ/LnR5cGV9JyBub3QgcmVnaXN0ZXJlZGApXG5cbiAgICBjb25zdCBmaWVsZCA9IG5ldyBGaWVsZChcbiAgICAgIGpzb24ubmFtZSxcbiAgICAgIGpzb24ubGFiZWwsXG4gICAgICBqc29uLnZpZXdUeXBlLFxuICAgICAgbmV3IFRyaWdnZXIoanNvbi5uYW1lLCBpc1JlcXVpcmVkVHJpZ2dlciBhcyBJVHJpZ2dlckNvbmRpdGlvbilcbiAgICApXG5cbiAgICBmaWVsZC52YWxpZGF0aW9uQ29uZGl0aW9ucyA9IGpzb24/LnZhbGlkYXRpb25Db25kaXRpb25zLm1hcCgodkpzb24pID0+IHtcbiAgICAgIGNvbnN0IGJ1aWxkZXIgPSBidWlsZGVycy5maW5kKCh2KSA9PiB2LnR5cGUgPT09IHZKc29uPy50eXBlKVxuICAgICAgaWYgKCFidWlsZGVyKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFZhbGlkYXRpb24gJyR7dkpzb24/LnR5cGV9JyBub3QgcmVnaXN0ZXJlZGApXG4gICAgICByZXR1cm4gYnVpbGRlci5mcm9tSnNvbih2SnNvbiwgYnVpbGRlcnMpXG4gICAgfSlcbiAgICByZXR1cm4gZmllbGRcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgSVZhbGlkYXRpb25Db25kaXRpb24sXG4gIElWYWxpZGF0aW9uRXJyb3IsXG4gIFN0b3JlZFBsYWluT2JqZWN0LFxuICBCdWlsZGVyLFxuICBJVHJpZ2dlckNvbmRpdGlvblxufSBmcm9tICcuL0B0eXBlcydcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi9maWVsZCdcbmltcG9ydCB7IFRyaWdnZXIgfSBmcm9tICcuL3RyaWdnZXInXG5pbXBvcnQgeyBUcnVlVHJpZ2dlckNvbmRpdGlvbiB9IGZyb20gJy4vY29yZS90cmlnZ2Vycy90cnVlJ1xuaW1wb3J0IHsgZmluZEluRm9ybSB9IGZyb20gJy4vdXRpbHMvZmluZCdcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZ3JvdXAgb2YgZmllbGRzIGluIGEgZm9ybVxuICovXG5leHBvcnQgY2xhc3MgRmllbGRTZXQge1xuICBzdGF0aWMgcmVhZG9ubHkgdHlwZTogc3RyaW5nID0gJ0ZpZWxkU2V0J1xuICBuYW1lOiBzdHJpbmcgLy8gZS5nLiBuZXh0T2ZLaW5EZXRhaWxzXG4gIGxhYmVsOiBzdHJpbmcgLy8gZS5nLiBOZXh0IG9mIGtpbiBkZXRhaWxzXG4gIHN0cnVjdHVyZTogKEZpZWxkIHwgRmllbGRTZXQpW10gPSBbXVxuICB2YWxpZGF0aW9uQ29uZGl0aW9uczogSVZhbGlkYXRpb25Db25kaXRpb25bXSA9IFtdXG4gIGlzUmVxdWlyZWQ6IFRyaWdnZXIgPSBUcmlnZ2VyLkFsd2F5c1RydWVcblxuICBpdGVtRm9yKGRhdGFJZDogc3RyaW5nKTogRmllbGQgfCBGaWVsZFNldCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIGZpbmRJbkZvcm0odGhpcywgZGF0YUlkKVxuICB9XG5cbiAgd2l0aFZhbGlkYXRpb25zKHZhbGlkYXRpb25zOiBJVmFsaWRhdGlvbkNvbmRpdGlvbltdKTogRmllbGRTZXQge1xuICAgIHRoaXMudmFsaWRhdGlvbkNvbmRpdGlvbnMucHVzaCguLi52YWxpZGF0aW9ucylcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdmFsaWRhdGUoaWQ6IHN0cmluZywgZGF0YTogYW55KTogSVZhbGlkYXRpb25FcnJvcltdIHtcbiAgICBjb25zdCBmb3JtRXJyb3JzID0gdGhpcy52YWxpZGF0aW9uQ29uZGl0aW9uc1xuICAgICAgLm1hcCgodmFsaWRhdGlvbikgPT4gdmFsaWRhdGlvbi52YWxpZGF0ZShpZCwgZGF0YSkpXG4gICAgICAuZmxhdCgpXG4gICAgY29uc3QgY29tcG9uZW50RXJyb3JzID0gdGhpcy5zdHJ1Y3R1cmVcbiAgICAgIC5tYXAoKGNvbXBvbmVudCkgPT5cbiAgICAgICAgY29tcG9uZW50LnZhbGlkYXRlKGNvbXBvbmVudC5uYW1lLCBkYXRhW2NvbXBvbmVudC5uYW1lXSlcbiAgICAgIClcbiAgICAgIC5mbGF0KClcblxuICAgIHJldHVybiBmb3JtRXJyb3JzLmNvbmNhdChjb21wb25lbnRFcnJvcnMpXG4gIH1cblxuICB0b0pzb24oKTogU3RvcmVkUGxhaW5PYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICB0eXBlOiBGaWVsZFNldC50eXBlLFxuICAgICAgbGFiZWw6IHRoaXMubGFiZWwsXG4gICAgICBzdHJ1Y3R1cmU6IHRoaXMuc3RydWN0dXJlLm1hcCgocykgPT4gcy50b0pzb24oKSksXG4gICAgICB2YWxpZGF0aW9uQ29uZGl0aW9uczogdGhpcy52YWxpZGF0aW9uQ29uZGl0aW9ucy5tYXAoKHYpID0+IHYudG9Kc29uKCkpLFxuICAgICAgaXNSZXF1aXJlZDpcbiAgICAgICAgdGhpcy5pc1JlcXVpcmVkIGluc3RhbmNlb2YgVHJ1ZVRyaWdnZXJDb25kaXRpb25cbiAgICAgICAgICA/IHRydWVcbiAgICAgICAgICA6IHRoaXMuaXNSZXF1aXJlZC50cmlnZ2VyLnRvSnNvbigpXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGpzb246IGFueSwgYnVpbGRlcnM6IEJ1aWxkZXJbXSk6IEZpZWxkU2V0IHtcbiAgICBjb25zdCBmaWVsZFNldCA9IG5ldyBGaWVsZFNldCgpXG4gICAgZmllbGRTZXQubmFtZSA9IGpzb24ubmFtZVxuICAgIGZpZWxkU2V0LmxhYmVsID0ganNvbi5sYWJlbFxuICAgIGZpZWxkU2V0LnZhbGlkYXRpb25Db25kaXRpb25zID0ganNvbi52YWxpZGF0aW9uQ29uZGl0aW9ucy5tYXAoKHZKc29uKSA9PlxuICAgICAgYnVpbGRlcnMuZmluZCgodikgPT4gdi50eXBlID09PSB2SnNvbi5uYW1lKT8uZnJvbUpzb24odkpzb24sIGJ1aWxkZXJzKVxuICAgIClcbiAgICBjb25zdCB0cmlnZ2VyID1cbiAgICAgIGpzb24uaXNSZXF1aXJlZCA9PT0gdHJ1ZVxuICAgICAgICA/IG5ldyBUcnVlVHJpZ2dlckNvbmRpdGlvbigpXG4gICAgICAgIDogYnVpbGRlcnNcbiAgICAgICAgICAgIC5maW5kKChkdCkgPT4gZHQudHlwZSA9PT0ganNvbi5pc1JlcXVpcmVkLnR5cGUpXG4gICAgICAgICAgICA/LmZyb21Kc29uKGpzb24uaXNSZXF1aXJlZClcblxuICAgIGlmICghdHJpZ2dlcikge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgYENvdWxkIG5vdCBmaW5kIHRyaWdnZXIgYnVpbGRlciAnJHtqc29uLmlzUmVxdWlyZWQudHlwZX0nYFxuICAgICAgKVxuICAgIH1cblxuICAgIGZpZWxkU2V0LmlzUmVxdWlyZWQgPSBuZXcgVHJpZ2dlcihqc29uLm5hbWUsIHRyaWdnZXIgYXMgSVRyaWdnZXJDb25kaXRpb24pXG4gICAgZmllbGRTZXQuc3RydWN0dXJlID0ganNvbi5zdHJ1Y3R1cmUubWFwKCh2YWxPYmopID0+XG4gICAgICB2YWxPYmoudHlwZSA9PT0gRmllbGQubmFtZVxuICAgICAgICA/IEZpZWxkLmZyb21Kc29uKHZhbE9iaiwgYnVpbGRlcnMpXG4gICAgICAgIDogRmllbGRTZXQuZnJvbUpzb24odmFsT2JqLCBidWlsZGVycylcbiAgICApXG4gICAgcmV0dXJuIGZpZWxkU2V0XG4gIH1cbn1cbiIsImltcG9ydCB7IFNjaGVtYSB9IGZyb20gJy4vc2NoZW1hJ1xuaW1wb3J0IHsgU3RvcmVkUGxhaW5PYmplY3QsIEJ1aWxkZXIsIElWaWV3IH0gZnJvbSAnLi9AdHlwZXMnXG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICcuL3ZhbGlkYXRvcidcbmltcG9ydCB7IGZpbmRJbkZvcm0gfSBmcm9tICcuL3V0aWxzL2ZpbmQnXG5cbmV4cG9ydCB0eXBlIEZvcm1EYXRhID0gYW55XG5cbi8qKlxuICogT2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIGRhdGEgYWxvbmdzaWRlIHRoZSBzY2hlbWFcbiAqL1xuZXhwb3J0IGNsYXNzIEZvcm0ge1xuICBzdGF0aWMgdHlwZSA9ICdGb3JtJ1xuXG4gIG5hbWU6IHN0cmluZ1xuICBkYXRhOiBGb3JtRGF0YSA9IHt9XG4gIHNjaGVtYTogU2NoZW1hXG4gIHZpZXc6IElWaWV3XG5cbiAgZ2V0IHZhbGlkYXRvcigpOiBWYWxpZGF0b3Ige1xuICAgIHJldHVybiBuZXcgVmFsaWRhdG9yKHRoaXMuc2NoZW1hLnZhbGlkYXRpb25Db25kaXRpb25zLCB1bmRlZmluZWQsIHRoaXMuZGF0YSlcbiAgfVxuXG4gIHZhbGlkYXRvckZvcihkYXRhSWQ6IHN0cmluZyk6IFZhbGlkYXRvciB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSBmaW5kSW5Gb3JtKHRoaXMuc2NoZW1hLCBkYXRhSWQpXG4gICAgICA/LnZhbGlkYXRpb25Db25kaXRpb25zXG4gICAgcmV0dXJuIHZhbGlkYXRpb25Db25kaXRpb25zXG4gICAgICA/IG5ldyBWYWxpZGF0b3IodmFsaWRhdGlvbkNvbmRpdGlvbnMsIGRhdGFJZClcbiAgICAgIDogdW5kZWZpbmVkXG4gIH1cblxuICB0b0pzb24oKTogU3RvcmVkUGxhaW5PYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBGb3JtLnR5cGUsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICBzY2hlbWE6IHRoaXMuc2NoZW1hLnRvSnNvbigpLFxuICAgICAgdmlldzogdGhpcy52aWV3LnRvSnNvbigpXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGpzb246IGFueSwgYnVpbGRlcnM6IEJ1aWxkZXJbXSk6IEZvcm0ge1xuICAgIGNvbnN0IGZvcm0gPSBuZXcgRm9ybSgpXG4gICAgZm9ybS5kYXRhID0ganNvbi5kYXRhXG4gICAgZm9ybS5uYW1lID0ganNvbi5uYW1lXG4gICAgZm9ybS5zY2hlbWEgPSBTY2hlbWEuZnJvbUpzb24oanNvbi5zY2hlbWEsIGJ1aWxkZXJzKVxuICAgIGNvbnN0IHZpZXdCdWlsZGVyID0gYnVpbGRlcnMuZmluZChcbiAgICAgIChidWlsZGVyKSA9PiBidWlsZGVyLnR5cGUgPT09IGpzb24udmlldy50eXBlXG4gICAgKVxuICAgIGlmICghdmlld0J1aWxkZXIpIHRocm93IEVycm9yKGBNaXNzaW5nIHZpZXcgYnVpbGRlciAnJHtqc29uLnZpZXcudHlwZX0nYClcbiAgICBmb3JtLnZpZXcgPSB2aWV3QnVpbGRlci5mcm9tSnNvbihqc29uLnZpZXcpIGFzIElWaWV3XG4gICAgcmV0dXJuIGZvcm1cbiAgfVxufVxuIiwiaW1wb3J0IHsgSUZvcm1zQnVpbGRlclBsdWdpbiB9IGZyb20gJy4uL21ha2UtZm9ybS1idWlsZGVyJ1xuaW1wb3J0IHsgdmVyc2lvbiwgbmFtZSB9IGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbidcblxuZXhwb3J0IGNvbnN0IGdkcHI6IElGb3Jtc0J1aWxkZXJQbHVnaW4gPSB7XG4gIG5hbWU6IGBnZHByYCxcbiAgZnJvbVBhY2thZ2U6IG5hbWUsXG4gIHZlcnNpb24sXG4gIHJlZ2lzdGVyKGJ1aWxkZXIpIHtcbiAgICAvLyBAdG9kb1xuICB9XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL2dkcHItcGx1Z2luJ1xuIiwiZXhwb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSdcbmV4cG9ydCAqIGZyb20gJy4vZm9ybSdcbmV4cG9ydCAqIGZyb20gJy4vZXhjZXB0aW9ucydcbmV4cG9ydCAqIGZyb20gJy4vZmllbGQnXG5leHBvcnQgKiBmcm9tICcuL2ZpZWxkc2V0J1xuZXhwb3J0ICogZnJvbSAnLi9zY2hlbWEnXG5leHBvcnQgKiBmcm9tICcuL21ha2UtZm9ybS1idWlsZGVyJ1xuZXhwb3J0ICogZnJvbSAnLi9AdHlwZXMnXG5leHBvcnQgKiBmcm9tICcuL2NvcmUnXG5leHBvcnQgKiBmcm9tICcuL2dkcHInXG5leHBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJ1xuZXhwb3J0ICogZnJvbSAnLi90cmlnZ2VyJ1xuIiwiaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vZm9ybSdcbmltcG9ydCB7IFN0b3JlZFBsYWluT2JqZWN0LCBCdWlsZGVyIH0gZnJvbSAnLi9AdHlwZXMnXG5pbXBvcnQgeyBQbHVnaW5EZXBlbmRlbmN5IH0gZnJvbSAnLi9wbHVnaW4tZGVwZW5kZW5jeSdcblxuZXhwb3J0IGludGVyZmFjZSBJRm9ybXNCdWlsZGVyIHtcbiAgd2l0aEJ1aWxkZXJzKFxuICAgIGJ1aWxkZXJzOiBCdWlsZGVyW10sXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGZyb21QYWNrYWdlOiBzdHJpbmcsXG4gICAgdmVyc2lvbjogc3RyaW5nXG4gIClcbiAgd2l0aChwbHVnaW46IElGb3Jtc0J1aWxkZXJQbHVnaW4pOiB0aGlzXG4gIGZyb21Kc29uKGpzb246IFN0b3JlZFBsYWluT2JqZWN0KTogRm9ybVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElGb3Jtc0J1aWxkZXJQbHVnaW4ge1xuICAvKipcbiAgICogSWYgdHJ1ZSwgdGhpcyBwbHVnaW4gd2lsbCBiZSBpbmNsdWRlZCBpbiBzZXJpYWxpc2VkIGZvcm0gc2NoZW1hLiBUaGlzIHNpZ25pZmllcyB0aGF0IHRoZSBmb3JtIGNhbm5vdFxuICAgKiBiZSByZWJ1aWx0IGZyb20gSlNPTiB3aXRob3V0IHRoaXMgcGFja2FnZVxuICAgKi9cbiAgaXNCdWlsZERlcGVuZGVuY3k/OiBib29sZWFuXG4gIC8qKlxuICAgKiBUaGUgTlBNIHBhY2thZ2UgbmFtZSB0aGF0IGNvbnRhaW5zIHRoaXMgcGx1Z2luLiBMZWF2ZSB1bmRlZmluZWQgaWYgcGx1Z2luIGlzIG5vdCBpbiBhIHBhY2thZ2VcbiAgICovXG4gIGZyb21QYWNrYWdlOiBzdHJpbmcgfCB1bmRlZmluZWRcbiAgLyoqXG4gICAqIFRoZSBodW1hbiByZWFkYWJsZSBuYW1lIG9mIHRoZSBwbHVnaW4uIGUuZy4gJ2NvcmUnIG9yICdjb3JlLnZhbGlkYXRpb25zJ1xuICAgKi9cbiAgbmFtZTogc3RyaW5nXG4gIC8qKlxuICAgKiBTZW1hbnRpYyB2ZXJzaW9uIC0gbWFqb3IgcmVsZWFzZXMgcmVzZXJ2ZWQgZm9yIHdoZXJlIGZvcm1zIGJ1aWx0IHdpdGggcHJldmlvdXMgdmVyc2lvbnMgY2Fubm90IGJlXG4gICAqIGJ1aWx0IHdpdGggdGhpcyBuZXcgdmVyc2lvblxuICAgKi9cbiAgdmVyc2lvbjogc3RyaW5nXG4gIHJlZ2lzdGVyKGJ1aWxkZXI6IElGb3Jtc0J1aWxkZXIpOiB2b2lkXG4gIFtmaWVsZDogc3RyaW5nXTogYW55XG59XG5cbmV4cG9ydCB0eXBlIEJ1aWxkZXJXaXRoRGVwZW5kZW5jeSA9IEJ1aWxkZXIgJiB7IF9wYWNrYWdlOiBQbHVnaW5EZXBlbmRlbmN5IH1cblxuZXhwb3J0IGNsYXNzIEZvcm1zQnVpbGRlciBpbXBsZW1lbnRzIElGb3Jtc0J1aWxkZXIge1xuICBwcml2YXRlIGJ1aWxkZXJzOiBCdWlsZGVyV2l0aERlcGVuZGVuY3lbXSA9IFtdXG5cbiAgcGx1Z2luczogSUZvcm1zQnVpbGRlclBsdWdpbltdID0gW11cblxuICB3aXRoQnVpbGRlcnMoXG4gICAgYnVpbGRlcnM6IEJ1aWxkZXJbXSxcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgZnJvbVBhY2thZ2U6IHN0cmluZyxcbiAgICB2ZXJzaW9uOiBzdHJpbmdcbiAgKTogdGhpcyB7XG4gICAgdGhpcy5idWlsZGVycy5wdXNoKFxuICAgICAgLi4uYnVpbGRlcnMubWFwKChidWlsZGVyOiBCdWlsZGVyV2l0aERlcGVuZGVuY3kpID0+IHtcbiAgICAgICAgYnVpbGRlci5fcGFja2FnZSA9IG5ldyBQbHVnaW5EZXBlbmRlbmN5KG5hbWUsIGZyb21QYWNrYWdlLCB2ZXJzaW9uKVxuICAgICAgICByZXR1cm4gYnVpbGRlclxuICAgICAgfSlcbiAgICApXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHdpdGgocGx1Z2luOiBJRm9ybXNCdWlsZGVyUGx1Z2luKTogdGhpcyB7XG4gICAgcGx1Z2luLnJlZ2lzdGVyKHRoaXMpXG4gICAgdGhpcy5wbHVnaW5zLnB1c2gocGx1Z2luKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBmcm9tSnNvbihqc29uOiBTdG9yZWRQbGFpbk9iamVjdCk6IEZvcm0ge1xuICAgIGNvbnN0IGZvcm0gPSBGb3JtLmZyb21Kc29uKGpzb24sIHRoaXMuYnVpbGRlcnMpXG4gICAgLy8gT3ZlcndyaXRlIHRoZSBvcmlnaW5hbCBkZXBlbmRlbmNpZXMgc2luY2UgYW55IG5ldyBwZXJzaXN0ZW5jZSB3aWxsIGJlIHdpdGggdGhlIG5ldyBwbHVnaW4gdmVyc2lvbnNcbiAgICBmb3JtLnNjaGVtYS5kZXBlbmRlbmNpZXMgPSB0aGlzLnBsdWdpbnNcbiAgICAgIC5maWx0ZXIoKHBsdWdpbikgPT4gcGx1Z2luLmlzQnVpbGREZXBlbmRlbmN5KVxuICAgICAgLm1hcChcbiAgICAgICAgKHBsdWdpbikgPT5cbiAgICAgICAgICBuZXcgUGx1Z2luRGVwZW5kZW5jeShcbiAgICAgICAgICAgIHBsdWdpbi5uYW1lLFxuICAgICAgICAgICAgcGx1Z2luLmZyb21QYWNrYWdlIHx8ICcnLFxuICAgICAgICAgICAgcGx1Z2luLnZlcnNpb25cbiAgICAgICAgICApXG4gICAgICApXG4gICAgcmV0dXJuIGZvcm1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbWFrZUZvcm1CdWlsZGVyID0gKCk6IElGb3Jtc0J1aWxkZXIgPT4gbmV3IEZvcm1zQnVpbGRlcigpXG4iLCJpbXBvcnQgeyBTdG9yZWRQbGFpbk9iamVjdCB9IGZyb20gJy4vQHR5cGVzJ1xuXG5leHBvcnQgY2xhc3MgUGx1Z2luRGVwZW5kZW5jeSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBmcm9tUGFja2FnZTogc3RyaW5nLFxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcsXG4gICAgcHVibGljIHZlcnNpb246IHN0cmluZ1xuICApIHt9XG5cbiAgdG9Kc29uKCk6IFN0b3JlZFBsYWluT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogUGx1Z2luRGVwZW5kZW5jeS5uYW1lLFxuICAgICAgZnJvbVBhY2thZ2U6IHRoaXMuZnJvbVBhY2thZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICB2ZXJzaW9uOiB0aGlzLnZlcnNpb25cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oanNvbjogU3RvcmVkUGxhaW5PYmplY3QpOiBQbHVnaW5EZXBlbmRlbmN5IHtcbiAgICByZXR1cm4gbmV3IFBsdWdpbkRlcGVuZGVuY3koanNvbi5uYW1lLCBqc29uLmZyb21QYWNrYWdlLCBqc29uLnZlcnNpb24pXG4gIH1cbn1cbiIsImltcG9ydCB7IFNlbVZlciwgU3RvcmVkUGxhaW5PYmplY3QsIEJ1aWxkZXIgfSBmcm9tICcuL0B0eXBlcydcbmltcG9ydCB7IEZpZWxkU2V0IH0gZnJvbSAnLi9maWVsZHNldCdcbmltcG9ydCB7IFBsdWdpbkRlcGVuZGVuY3kgfSBmcm9tICcuL3BsdWdpbi1kZXBlbmRlbmN5J1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIHN0cnVjdHVyZSBvZiBhIGZvcm1cbiAqL1xuZXhwb3J0IGNsYXNzIFNjaGVtYSBleHRlbmRzIEZpZWxkU2V0IHtcbiAgc3RhdGljIHJlYWRvbmx5IHR5cGU6IHN0cmluZyA9ICdTY2hlbWEnXG5cbiAgLyoqIERldGFpbHMgcGx1Z2lucyBuZWNlc3NhcnkgdG8gcHJvY2VzcyB0aGlzIHNjaGVtYSAqL1xuICBkZXBlbmRlbmNpZXM6IFBsdWdpbkRlcGVuZGVuY3lbXSA9IFtdXG5cbiAgLyoqIFRoZSByZXZpc2lvbiB2ZXJzaW9uIG9mIHRoaXMgc2NoZW1hICovXG4gIHNjaGVtYVZlcnNpb246IFNlbVZlclxuXG4gIHRvSnNvbigpOiBTdG9yZWRQbGFpbk9iamVjdCB7XG4gICAgY29uc3Qgb2JqID0gc3VwZXIudG9Kc29uKClcbiAgICBvYmoudHlwZSA9IFNjaGVtYS50eXBlXG4gICAgb2JqLnNjaGVtYVZlcnNpb24gPSB0aGlzLnNjaGVtYVZlcnNpb25cbiAgICBvYmouZGVwZW5kZW5jaWVzID0gdGhpcy5kZXBlbmRlbmNpZXMubWFwKChkZXBlbmRlbmN5KSA9PlxuICAgICAgZGVwZW5kZW5jeS50b0pzb24oKVxuICAgIClcbiAgICByZXR1cm4gb2JqXG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oanNvbjogU3RvcmVkUGxhaW5PYmplY3QsIGJ1aWxkZXJzOiBCdWlsZGVyW10pOiBTY2hlbWEge1xuICAgIGNvbnN0IHNjaGVtYSA9IEZpZWxkU2V0LmZyb21Kc29uKGpzb24sIGJ1aWxkZXJzKSBhcyBTY2hlbWFcbiAgICBzY2hlbWEuc2NoZW1hVmVyc2lvbiA9IGpzb24uc2NoZW1hVmVyc2lvblxuICAgIHNjaGVtYS5uYW1lID0ganNvbi5uYW1lXG4gICAgc2NoZW1hLmRlcGVuZGVuY2llcyA9IGpzb24uZGVwZW5kZW5jaWVzLm1hcCgoZGVwSnNvbikgPT5cbiAgICAgIFBsdWdpbkRlcGVuZGVuY3kuZnJvbUpzb24oZGVwSnNvbilcbiAgICApXG5cbiAgICByZXR1cm4gc2NoZW1hXG4gIH1cbn1cbiIsImltcG9ydCB7IElUcmlnZ2VyQ29uZGl0aW9uIH0gZnJvbSAnLi9AdHlwZXMnXG5pbXBvcnQgeyBGb3JtRGF0YSB9IGZyb20gJy4vZm9ybSdcbmltcG9ydCB7IFRydWVUcmlnZ2VyQ29uZGl0aW9uIH0gZnJvbSAnLi9jb3JlL3RyaWdnZXJzL3RydWUnXG5cbmV4cG9ydCBjbGFzcyBUcmlnZ2VyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGRhdGFJZDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHB1YmxpYyB0cmlnZ2VyOiBJVHJpZ2dlckNvbmRpdGlvblxuICApIHt9XG5cbiAgZm9yRGF0YShkYXRhOiBGb3JtRGF0YSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnRyaWdnZXIuaXNUcmlnZ2VyZWQodGhpcy5kYXRhSWQgfHwgJycsIGRhdGEpXG4gIH1cblxuICBzdGF0aWMgQWx3YXlzVHJ1ZTogVHJpZ2dlciA9IG5ldyBUcmlnZ2VyKFxuICAgIHVuZGVmaW5lZCxcbiAgICBuZXcgVHJ1ZVRyaWdnZXJDb25kaXRpb24oKVxuICApXG59XG4iLCJpbXBvcnQgeyBGaWVsZFNldCB9IGZyb20gJy4uL2ZpZWxkc2V0J1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9maWVsZCdcbmltcG9ydCB7IEZvcm1EYXRhIH0gZnJvbSAnLi4vZm9ybSdcbmltcG9ydCB7IGlzTnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnLi90eXBlcydcblxuZXhwb3J0IGNvbnN0IGZpbmRJbkZvcm0gPSAoXG4gIGl0ZW06IEZpZWxkIHwgRmllbGRTZXQsXG4gIG5hbWU6IHN0cmluZ1xuKTogRmllbGQgfCBGaWVsZFNldCB8IHVuZGVmaW5lZCA9PiB7XG4gIGlmIChpdGVtLm5hbWUgPT09IG5hbWUpIHtcbiAgICByZXR1cm4gaXRlbVxuICB9XG4gIGlmIChpdGVtIGluc3RhbmNlb2YgRmllbGQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cbiAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBGaWVsZFNldCkge1xuICAgIGZvciAoY29uc3Qgc3ViSXRlbSBvZiBpdGVtLnN0cnVjdHVyZSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gZmluZEluRm9ybShzdWJJdGVtLCBuYW1lKVxuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBmaW5kSW5EYXRhID0gKFxuICBkYXRhOiBGb3JtRGF0YSxcbiAgZGF0YUlkOiBzdHJpbmdcbik6IEZvcm1EYXRhIHwgdW5kZWZpbmVkID0+IHtcbiAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKGRhdGEpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZGF0YSBpcyBudWxsIG9yIHVuZGVmaW5lZCcpXG4gIH1cblxuICBjb25zdCBfZmluZEluT2JqZWN0ID0gKFxuICAgIG9iajogUmVjb3JkPHN0cmluZywgYW55PixcbiAgICBkYXRhSWQ6IHN0cmluZ1xuICApOiBGb3JtRGF0YSA9PiB7XG4gICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgZGF0YUlkKSkge1xuICAgICAgcmV0dXJuIG9ialtkYXRhSWRdXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBPYmplY3QudmFsdWVzKG9iaikuZmluZChcbiAgICAgICAgKGNoaWxkKSA9PlxuICAgICAgICAgIGNoaWxkICYmXG4gICAgICAgICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKGNoaWxkKSA9PT0gT2JqZWN0LnByb3RvdHlwZSAmJlxuICAgICAgICAgIHR5cGVvZiBfZmluZEluT2JqZWN0KGNoaWxkLCBkYXRhSWQpICE9PSAndW5kZWZpbmVkJ1xuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfZmluZEluT2JqZWN0KGRhdGEsIGRhdGFJZClcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vdHlwZXMnXG4iLCJleHBvcnQgY29uc3QgaXNOdWxsT3JVbmRlZmluZWQgPSAodmFsdWU6IGFueSk6IGJvb2xlYW4gPT5cbiAgdmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJ1xuXG5leHBvcnQgY29uc3QgaXNCb29sZWFuID0gKHZhbHVlOiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nXG5cbmV4cG9ydCBjb25zdCBoYXNQcm9wZXJ0eSA9IChvYmo6IGFueSwgcHJvcDogc3RyaW5nKTogYm9vbGVhbiA9PlxuICB0eXBlb2Ygb2JqICE9PSAndW5kZWZpbmVkJyAmJlxuICBvYmogIT09IG51bGwgJiZcbiAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcClcblxuZXhwb3J0IGNvbnN0IGhhc0xlbmd0aCA9ICh2YWx1ZTogYW55KTogYm9vbGVhbiA9PiBoYXNQcm9wZXJ0eSh2YWx1ZSwgJ2xlbmd0aCcpXG5cbmV4cG9ydCBjb25zdCBpc1N0cmluZyA9ICh2YWx1ZTogYW55KTogYm9vbGVhbiA9PlxuICB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nXG5cbmV4cG9ydCBjb25zdCBpc051bWJlciA9ICh2YWx1ZTogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInXG4iLCJpbXBvcnQgeyBGb3JtRGF0YSB9IGZyb20gJy4vZm9ybSdcbmltcG9ydCB7IElWYWxpZGF0aW9uQ29uZGl0aW9uLCBJVmFsaWRhdGlvbkVycm9yIH0gZnJvbSAnLi9AdHlwZXMnXG5cbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgdmFsaWRhdGlvbkNvbmRpdGlvbnM6IElWYWxpZGF0aW9uQ29uZGl0aW9uW10sXG4gICAgcHVibGljIGRhdGE6IEZvcm1EYXRhID0ge30sXG4gICAgcHVibGljIGRhdGFJZD86IHN0cmluZ1xuICApIHt9XG5cbiAgdmFsaWRhdGUoZGF0YT86IEZvcm1EYXRhKTogSVZhbGlkYXRpb25FcnJvcltdIHtcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB0aGlzLmRhdGEgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdObyBkYXRhIHN1cHBsaWVkIGZvciB2YWxpZGF0aW9uJylcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvbkNvbmRpdGlvbnNcbiAgICAgIC5tYXAoKHYpID0+IHYudmFsaWRhdGUodGhpcy5kYXRhSWQsIGRhdGEpKVxuICAgICAgLmZsYXQoKVxuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgbWFrZUZvcm1CdWlsZGVyLCBjb3JlIH0gZnJvbSAnQHRuZ2JsL2Zvcm1zJ1xuaW1wb3J0IHsgcGFnZVZhbGlkYXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zcmMvYnJvd3NlcidcbmltcG9ydCB7IGhvb2tzIH0gZnJvbSAnLi4vdGVtcGxhdGVzJ1xuXG5jb25zdCBidWlsZGVyID0gbWFrZUZvcm1CdWlsZGVyKCkud2l0aChjb3JlKS53aXRoKHBhZ2VWYWxpZGF0aW9uKHsgaG9va3MgfSkpXG5cbndpbmRvd1sndG5nYmwnXSA9IHtcbiAgYnVpbGRlclxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==