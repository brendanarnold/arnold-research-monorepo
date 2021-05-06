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

/***/ "../../../auth/src/domain/models.ts":
/*!******************************************!*\
  !*** ../../../auth/src/domain/models.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PermissionFactory": () => (/* binding */ PermissionFactory)
/* harmony export */ });
class PermissionFactory {
    static register(type, fromPlainObject) {
        {
            PermissionFactory._permissionLookup[type] = fromPlainObject;
        }
    }
    static fromPlainObject(obj) {
        const fromPlainObject = PermissionFactory._permissionLookup[obj.type];
        return fromPlainObject(obj);
    }
}
PermissionFactory._permissionLookup = {};


/***/ }),

/***/ "../../../auth/src/index.ts":
/*!**********************************!*\
  !*** ../../../auth/src/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PermissionFactory": () => (/* reexport safe */ _domain_models__WEBPACK_IMPORTED_MODULE_0__.PermissionFactory)
/* harmony export */ });
/* harmony import */ var _domain_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domain/models */ "../../../auth/src/domain/models.ts");



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
const hook = {
    componentName: 'favourite-colour',
    registerHook: (args) => {
        const errorCard = document.getElementById(`${args.dataId}__error-card`);
        const inputField = document.getElementsByName(args.dataId)[0];
        inputField.addEventListener('input', () => {
            const errors = args.validator.validate(args.dataId, inputField.value);
            if (errors.length) {
                errorCard.innerHTML =
                    '<ul>' +
                        errors.map((e) => '<li>' +
                            args.polyglot.t(`@tngbl/forms-www-static.templates.${e.validationName}.${e.errorName}`) +
                            '</li>') +
                        '</ul>';
                errorCard.classList.remove('hidden');
            }
            else {
                errorCard.innerHTML = '';
                errorCard.classList.add('hidden');
            }
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
/* harmony export */   "ErrorBlock": () => (/* reexport safe */ _templates_error_block__WEBPACK_IMPORTED_MODULE_2__.ErrorBlock),
/* harmony export */   "PageValidationPlugin": () => (/* binding */ PageValidationPlugin)
/* harmony export */ });
/* harmony import */ var _tngbl_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tngbl/forms */ "../../../forms/src/index.ts");
/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../templates */ "../../src/templates/index.ts");
/* harmony import */ var _templates_error_block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../templates/error-block */ "../../src/templates/error-block.ts");



class PageValidationPlugin {
    constructor(polyglot) {
        this.name = 'page-validation';
        this.pageValidationHooks = [];
        this.polyglot = polyglot;
    }
    register(formModule) {
        this.formModule = formModule;
        this.formModule.plugin[this.name] = this;
    }
    withCore() {
        this.withHooks(_templates__WEBPACK_IMPORTED_MODULE_1__.eventHooks);
        return this;
    }
    withHooks(hooks) {
        this.pageValidationHooks.push(...hooks);
        return this;
    }
    activateFormFromJson(json) {
        const form = this.formModule.formFromPlainObject(JSON.parse(json));
        this.activate(form);
    }
    activate(component) {
        var _a;
        if (component instanceof _tngbl_forms__WEBPACK_IMPORTED_MODULE_0__.Form) {
            this.activate(component.schema);
        }
        else if (component instanceof _tngbl_forms__WEBPACK_IMPORTED_MODULE_0__.FieldSet) {
            component.structure.forEach((el) => this.activate(el));
        }
        else if (component instanceof _tngbl_forms__WEBPACK_IMPORTED_MODULE_0__.Field) {
            (_a = this.pageValidationHooks
                .find((hook) => hook.componentName === component.viewType)) === null || _a === void 0 ? void 0 : _a.registerHook({
                dataId: component.name,
                validator: component,
                polyglot: this.polyglot
            });
        }
    }
}


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
    registerHook: ({ dataId, polyglot, validator }) => {
        const inputElements = document.querySelectorAll('input');
        let confirmTouched = false;
        const onInputChange = () => {
            const errorBlock = new _browser__WEBPACK_IMPORTED_MODULE_0__.ErrorBlock(dataId);
            if (confirmTouched && inputElements[0].value !== inputElements[1].value) {
                const error = polyglot.t('validations.new-password.confirm-does-not-match');
                errorBlock.add(error);
            }
            validator
                .validate(dataId, inputElements[0].value)
                .map((error) => error.translationKey)
                .forEach((key) => errorBlock.add(key));
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

/***/ "../../../forms/src/data-triggers/index.ts":
/*!*************************************************!*\
  !*** ../../../forms/src/data-triggers/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "../../../forms/src/data-triggers/types.ts");



/***/ }),

/***/ "../../../forms/src/data-triggers/types.ts":
/*!*************************************************!*\
  !*** ../../../forms/src/data-triggers/types.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../../forms/src/domain/models/exceptions.ts":
/*!******************************************************!*\
  !*** ../../../forms/src/domain/models/exceptions.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormSyntaxError": () => (/* binding */ FormSyntaxError)
/* harmony export */ });
class FormSyntaxError extends SyntaxError {
}


/***/ }),

/***/ "../../../forms/src/domain/models/field.ts":
/*!*************************************************!*\
  !*** ../../../forms/src/domain/models/field.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StorageType": () => (/* binding */ StorageType),
/* harmony export */   "Field": () => (/* binding */ Field)
/* harmony export */ });
/* harmony import */ var _tngbl_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tngbl/auth */ "../../../auth/src/index.ts");
/* harmony import */ var _tngbl_secure_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tngbl/secure-store */ "../../../secure-store/src/index.ts");


var StorageType;
(function (StorageType) {
    StorageType["String"] = "STRING";
    StorageType["Uuid"] = "UUID";
    StorageType["Integer"] = "INTEGER";
    StorageType["Float"] = "FLOAT";
    StorageType["Object"] = "OBJECT";
    StorageType["Date"] = "DATE";
    StorageType["Time"] = "TIME";
    StorageType["Timestamp"] = "TIMESTAMP";
    StorageType["Duration"] = "DURATION";
})(StorageType || (StorageType = {}));
class Field {
    constructor(name, label, storageType, gdprPolicy, viewType) {
        this.permissions = [];
        this.validations = [];
        this.name = name;
        this.label = label;
        this.storageType = storageType;
        this.gdprPolicy = gdprPolicy;
        this.viewType = viewType;
    }
    withPermissions(permissions) {
        this.permissions.push(...permissions);
        return this;
    }
    validate(id, data) {
        return this.validations.map((v) => v.validate(id, data)).flat();
    }
    toPlainObject() {
        return {
            name: this.name,
            label: this.label,
            type: Field.type,
            viewType: this.viewType,
            storageType: this.storageType,
            gdprPolicy: this.gdprPolicy.toPlainObject(),
            permissions: this.permissions,
            validations: this.validations.map((v) => v.toPlainObject())
        };
    }
    static fromPlainObject(obj, builders) {
        const gdprPolicy = _tngbl_secure_store__WEBPACK_IMPORTED_MODULE_1__.GdprPolicy.fromPlainObject(obj.gdprPolicy);
        const field = new Field(obj.name, obj.label, obj.storageType, gdprPolicy, obj.viewType);
        field.permissions = obj.permissions.map((pObj) => _tngbl_auth__WEBPACK_IMPORTED_MODULE_0__.PermissionFactory.fromPlainObject(pObj));
        field.validations = obj.validations.map((vObj) => builders.validations[vObj.name].fromPlainObject(vObj, builders.validations));
        return field;
    }
}
Field.type = 'Field';


/***/ }),

/***/ "../../../forms/src/domain/models/fieldset.ts":
/*!****************************************************!*\
  !*** ../../../forms/src/domain/models/fieldset.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FieldSet": () => (/* binding */ FieldSet)
/* harmony export */ });
/* harmony import */ var _tngbl_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tngbl/utils */ "../../../utils/src/utils/types.ts");
/* harmony import */ var _field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./field */ "../../../forms/src/domain/models/field.ts");


class FieldSet {
    constructor() {
        this.structure = [];
        this.validations = [];
        this.isRequired = true;
    }
    withDataSets(dataSets) {
        this.structure.push(...dataSets);
        return this;
    }
    withValidations(validations) {
        this.validations.push(...validations);
        return this;
    }
    validate(id, data) {
        const formErrors = this.validations
            .map((validation) => validation.validate(id, data))
            .flat();
        const componentErrors = this.structure
            .map((component) => component.validate(component.name, data[component.name]))
            .flat();
        return formErrors.concat(componentErrors);
    }
    toPlainObject() {
        return {
            name: this.name,
            type: FieldSet.type,
            label: this.label,
            structure: this.structure.map((s) => s.toPlainObject()),
            validations: this.validations.map((v) => v.toPlainObject()),
            isRequired: (0,_tngbl_utils__WEBPACK_IMPORTED_MODULE_1__.isBoolean)(this.isRequired)
                ? this.isRequired
                : this.isRequired.toPlainObject()
        };
    }
    static fromPlainObject(obj, builders) {
        const fieldSet = new FieldSet();
        fieldSet.name = obj.name;
        fieldSet.label = obj.label;
        fieldSet.validations = obj.validations.map((valObj) => builders.validations[valObj.name].fromPlainObject(valObj, builders.validations));
        fieldSet.structure = obj.structure.map((valObj) => valObj.type === _field__WEBPACK_IMPORTED_MODULE_0__.Field.type
            ? _field__WEBPACK_IMPORTED_MODULE_0__.Field.fromPlainObject(valObj, builders)
            : FieldSet.fromPlainObject(valObj, builders));
        fieldSet.isRequired = (0,_tngbl_utils__WEBPACK_IMPORTED_MODULE_1__.isBoolean)(obj.isRequired)
            ? obj.isRequired
            : builders.dataTriggers[obj.isRequired.name].fromPlainObject(obj.isRequired, builders.dataTriggers);
        return fieldSet;
    }
}
FieldSet.type = 'FieldSet';


/***/ }),

/***/ "../../../forms/src/domain/models/form.ts":
/*!************************************************!*\
  !*** ../../../forms/src/domain/models/form.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Form": () => (/* binding */ Form)
/* harmony export */ });
/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schema */ "../../../forms/src/domain/models/schema.ts");

class Form {
    constructor() {
        this.data = {};
    }
    validate() {
        return this.schema.validate('', this.data);
    }
    toPlainObj() {
        return {
            type: Form.type,
            name: this.name,
            data: this.data,
            schema: this.schema.toPlainObject()
        };
    }
    static fromPlainObj(obj, builders) {
        const form = new Form();
        form.data = obj.data;
        form.name = obj.name;
        form.schema = _schema__WEBPACK_IMPORTED_MODULE_0__.Schema.fromPlainObject(obj.schema, builders);
        return form;
    }
}
Form.type = 'Form';


/***/ }),

/***/ "../../../forms/src/domain/models/index.ts":
/*!*************************************************!*\
  !*** ../../../forms/src/domain/models/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Field": () => (/* reexport safe */ _field__WEBPACK_IMPORTED_MODULE_0__.Field),
/* harmony export */   "StorageType": () => (/* reexport safe */ _field__WEBPACK_IMPORTED_MODULE_0__.StorageType),
/* harmony export */   "Form": () => (/* reexport safe */ _form__WEBPACK_IMPORTED_MODULE_1__.Form),
/* harmony export */   "FieldSet": () => (/* reexport safe */ _fieldset__WEBPACK_IMPORTED_MODULE_2__.FieldSet),
/* harmony export */   "Schema": () => (/* reexport safe */ _schema__WEBPACK_IMPORTED_MODULE_3__.Schema),
/* harmony export */   "FormSyntaxError": () => (/* reexport safe */ _exceptions__WEBPACK_IMPORTED_MODULE_4__.FormSyntaxError)
/* harmony export */ });
/* harmony import */ var _field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./field */ "../../../forms/src/domain/models/field.ts");
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form */ "../../../forms/src/domain/models/form.ts");
/* harmony import */ var _fieldset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fieldset */ "../../../forms/src/domain/models/fieldset.ts");
/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./schema */ "../../../forms/src/domain/models/schema.ts");
/* harmony import */ var _exceptions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./exceptions */ "../../../forms/src/domain/models/exceptions.ts");







/***/ }),

/***/ "../../../forms/src/domain/models/schema.ts":
/*!**************************************************!*\
  !*** ../../../forms/src/domain/models/schema.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Schema": () => (/* binding */ Schema)
/* harmony export */ });
/* harmony import */ var _fieldset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fieldset */ "../../../forms/src/domain/models/fieldset.ts");

class Schema extends _fieldset__WEBPACK_IMPORTED_MODULE_0__.FieldSet {
    toPlainObject() {
        const obj = super.toPlainObject();
        obj.type = Schema.type;
        obj.schemaVersion = this.schemaVersion;
        return obj;
    }
    static fromPlainObject(obj, builders) {
        const schema = _fieldset__WEBPACK_IMPORTED_MODULE_0__.FieldSet.fromPlainObject(obj, builders);
        schema.schemaVersion = obj.schemaVersion;
        schema.name = obj.name;
        return schema;
    }
}
Schema.storageVersion = 1;
Schema.type = 'Schema';


/***/ }),

/***/ "../../../forms/src/form-module.ts":
/*!*****************************************!*\
  !*** ../../../forms/src/form-module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormModule": () => (/* binding */ FormModule)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "../../../forms/src/index.ts");

class FormModule {
    constructor() {
        this.builders = {
            validations: {},
            dataTriggers: {}
        };
        this.plugin = {};
    }
    withPlugin(plugin) {
        this.plugin[plugin.name] = {};
        plugin.register(this);
        return this;
    }
    withValidation(builder) {
        this.builders.validations[builder.name] = builder;
        return this;
    }
    withDataTrigger(builder) {
        this.builders.dataTriggers[builder.name] = builder;
        return this;
    }
    formFromPlainObject(obj) {
        return ___WEBPACK_IMPORTED_MODULE_0__.Form.fromPlainObj(obj, this.builders);
    }
    formToPlainObject(form) {
        return form.toPlainObj();
    }
}


/***/ }),

/***/ "../../../forms/src/index.ts":
/*!***********************************!*\
  !*** ../../../forms/src/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Field": () => (/* reexport safe */ _domain_models__WEBPACK_IMPORTED_MODULE_1__.Field),
/* harmony export */   "FieldSet": () => (/* reexport safe */ _domain_models__WEBPACK_IMPORTED_MODULE_1__.FieldSet),
/* harmony export */   "Form": () => (/* reexport safe */ _domain_models__WEBPACK_IMPORTED_MODULE_1__.Form),
/* harmony export */   "FormSyntaxError": () => (/* reexport safe */ _domain_models__WEBPACK_IMPORTED_MODULE_1__.FormSyntaxError),
/* harmony export */   "Schema": () => (/* reexport safe */ _domain_models__WEBPACK_IMPORTED_MODULE_1__.Schema),
/* harmony export */   "StorageType": () => (/* reexport safe */ _domain_models__WEBPACK_IMPORTED_MODULE_1__.StorageType),
/* harmony export */   "coreValidationBuilders": () => (/* reexport safe */ _validations__WEBPACK_IMPORTED_MODULE_2__.coreValidationBuilders),
/* harmony export */   "FormModule": () => (/* reexport safe */ _form_module__WEBPACK_IMPORTED_MODULE_0__.FormModule),
/* harmony export */   "forms": () => (/* binding */ forms)
/* harmony export */ });
/* harmony import */ var _form_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-module */ "../../../forms/src/form-module.ts");
/* harmony import */ var _domain_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domain/models */ "../../../forms/src/domain/models/index.ts");
/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validations */ "../../../forms/src/validations/index.ts");
/* harmony import */ var _data_triggers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data-triggers */ "../../../forms/src/data-triggers/index.ts");





const forms = new _form_module__WEBPACK_IMPORTED_MODULE_0__.FormModule();


/***/ }),

/***/ "../../../forms/src/validations/core/index.ts":
/*!****************************************************!*\
  !*** ../../../forms/src/validations/core/index.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "coreValidationBuilders": () => (/* binding */ coreValidationBuilders)
/* harmony export */ });
/* harmony import */ var _min_length__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./min-length */ "../../../forms/src/validations/core/min-length.ts");

const coreValidationBuilders = [_min_length__WEBPACK_IMPORTED_MODULE_0__.builder];


/***/ }),

/***/ "../../../forms/src/validations/core/min-length.ts":
/*!*********************************************************!*\
  !*** ../../../forms/src/validations/core/min-length.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "builder": () => (/* binding */ builder)
/* harmony export */ });
/* harmony import */ var _tngbl_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tngbl/utils */ "../../../utils/src/utils/types.ts");

class MinLengthValidation {
    constructor(length) {
        this.length = length;
    }
    validate(id, data) {
        if (!(0,_tngbl_utils__WEBPACK_IMPORTED_MODULE_0__.isNullOrUndefined)(data) || !(0,_tngbl_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(data.length)) {
            return [];
        }
        if (data.length < this.length) {
            return [
                {
                    dataId: id,
                    validationName: builder.name,
                    errorName: 'too-short',
                    translationKey: `validations.${builder.name}.too-short`
                }
            ];
        }
        else {
            return [];
        }
    }
    toPlainObject() {
        return {
            type: builder.name,
            length: this.length
        };
    }
}
const builder = {
    name: 'MinLengthValidation',
    fromPlainObject(obj) {
        const validation = new MinLengthValidation(obj.length);
        return validation;
    }
};


/***/ }),

/***/ "../../../forms/src/validations/index.ts":
/*!***********************************************!*\
  !*** ../../../forms/src/validations/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "coreValidationBuilders": () => (/* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_1__.coreValidationBuilders)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "../../../forms/src/validations/types.ts");
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core */ "../../../forms/src/validations/core/index.ts");




/***/ }),

/***/ "../../../forms/src/validations/types.ts":
/*!***********************************************!*\
  !*** ../../../forms/src/validations/types.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../../secure-store/src/domain/entities/secure-data-access.ts":
/*!***********************************************************************!*\
  !*** ../../../secure-store/src/domain/entities/secure-data-access.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AccessRule": () => (/* binding */ AccessRule),
/* harmony export */   "SecureDataAccess": () => (/* binding */ SecureDataAccess)
/* harmony export */ });
var AccessRule;
(function (AccessRule) {
    AccessRule["Permitted"] = "PERMITTED";
    AccessRule["Denied"] = "DENIED";
})(AccessRule || (AccessRule = {}));
class SecureDataAccess {
    static fromStore(storeObj) {
        return new SecureDataAccess();
    }
}


/***/ }),

/***/ "../../../secure-store/src/domain/entities/secure-data.ts":
/*!****************************************************************!*\
  !*** ../../../secure-store/src/domain/entities/secure-data.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GdprDataType": () => (/* binding */ GdprDataType),
/* harmony export */   "GdprLifetime": () => (/* binding */ GdprLifetime),
/* harmony export */   "GdprPolicy": () => (/* binding */ GdprPolicy),
/* harmony export */   "SecureData": () => (/* binding */ SecureData)
/* harmony export */ });
/* harmony import */ var _tngbl_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tngbl/utils */ "../../../utils/src/utils/types.ts");

var GdprDataType;
(function (GdprDataType) {
    GdprDataType["Anonymised"] = "ANONYMISED";
    GdprDataType["Anonymous"] = "ANONYMOUS";
    GdprDataType["Personal"] = "PERSONAL";
    GdprDataType["SensitivePersonal"] = "SENSITIVE_PERSONAL";
})(GdprDataType || (GdprDataType = {}));
var GdprLifetime;
(function (GdprLifetime) {
    GdprLifetime["Transient"] = "TRANSIENT";
    GdprLifetime["Persistent"] = "PERSISTENT";
})(GdprLifetime || (GdprLifetime = {}));
class GdprPolicy {
    constructor(dataType, lifetimeSeconds) {
        this.lifetimeSeconds = GdprLifetime.Persistent;
        this.dataType = dataType;
        this.lifetimeSeconds = lifetimeSeconds;
    }
    toPlainObject() {
        return {
            type: GdprPolicy.type,
            dataType: this.dataType,
            lifetimeSeconds: this.lifetimeSeconds
        };
    }
    static fromPlainObject(obj) {
        if (obj.type !== GdprPolicy.type) {
            throw TypeError(`Cannot cast an object of type '${obj.type}' to GdprPolicy`);
        }
        if (!(0,_tngbl_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(obj.lifetimeSeconds) &&
            !Object.values(GdprLifetime).includes(obj.lifetimeSeconds)) {
            throw TypeError(`Invalid lifetimeSeconds property on GdprPolicy: ${obj.lifetimeSeconds}`);
        }
        return new GdprPolicy(obj.dataType, obj.lifetimeSeconds);
    }
}
GdprPolicy.type = 'GdprPolicy';
class SecureData {
    static fromDbRow(row) {
        const ed = new SecureData();
        ed.id = row.id;
        ed.keyId = null;
        ed.encryptionMethod = row.encryption_method;
        ed.encryptedJson = row.encrypted_json;
        ed.encryptionIv = row.encryption_iv;
        ed.expiresOn = row.expires_on;
        ed.createdOn = row.created_on;
        ed.gdprType = row.gdpr_type;
        ed.decryptedValue = '';
        return ed;
    }
}


/***/ }),

/***/ "../../../secure-store/src/index.ts":
/*!******************************************!*\
  !*** ../../../secure-store/src/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GdprDataType": () => (/* reexport safe */ _domain_entities_secure_data__WEBPACK_IMPORTED_MODULE_0__.GdprDataType),
/* harmony export */   "GdprLifetime": () => (/* reexport safe */ _domain_entities_secure_data__WEBPACK_IMPORTED_MODULE_0__.GdprLifetime),
/* harmony export */   "GdprPolicy": () => (/* reexport safe */ _domain_entities_secure_data__WEBPACK_IMPORTED_MODULE_0__.GdprPolicy),
/* harmony export */   "SecureData": () => (/* reexport safe */ _domain_entities_secure_data__WEBPACK_IMPORTED_MODULE_0__.SecureData),
/* harmony export */   "AccessRule": () => (/* reexport safe */ _domain_entities_secure_data_access__WEBPACK_IMPORTED_MODULE_1__.AccessRule),
/* harmony export */   "SecureDataAccess": () => (/* reexport safe */ _domain_entities_secure_data_access__WEBPACK_IMPORTED_MODULE_1__.SecureDataAccess)
/* harmony export */ });
/* harmony import */ var _domain_entities_secure_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domain/entities/secure-data */ "../../../secure-store/src/domain/entities/secure-data.ts");
/* harmony import */ var _domain_entities_secure_data_access__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domain/entities/secure-data-access */ "../../../secure-store/src/domain/entities/secure-data-access.ts");




/***/ }),

/***/ "../../../utils/src/utils/types.ts":
/*!*****************************************!*\
  !*** ../../../utils/src/utils/types.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isNullOrUndefined": () => (/* binding */ isNullOrUndefined),
/* harmony export */   "isBoolean": () => (/* binding */ isBoolean),
/* harmony export */   "hasLength": () => (/* binding */ hasLength),
/* harmony export */   "isString": () => (/* binding */ isString),
/* harmony export */   "isNumber": () => (/* binding */ isNumber)
/* harmony export */ });
const isNullOrUndefined = value => value === null || typeof value === 'undefined';
const isBoolean = value => typeof value === 'boolean';
const hasLength = value => typeof value !== 'undefined'
    && value !== null
    && value.hasOwnProperty('length');
const isString = value => typeof value === 'string' || value instanceof String;
const isNumber = value => typeof value === 'number';


/***/ }),

/***/ "./src/locales/en-gb.js":
/*!******************************!*\
  !*** ./src/locales/en-gb.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "phrases": () => (/* binding */ phrases)
/* harmony export */ });
const phrases = {
  validations: {
    'is-string': {
      'is-not-string': 'Please input text'
    },
    'min-length': {
      'too-short': 'Password needs to be at least {} letters long'
    },
    'new-password': {
      'confirm-does-not-match': 'Passwords do not match'
    }
  }
}


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
/* harmony import */ var node_polyglot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! node-polyglot */ "../../../../node_modules/node-polyglot/index.js");
/* harmony import */ var node_polyglot__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_polyglot__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _locales_en_gb_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../locales/en-gb.js */ "./src/locales/en-gb.js");





const polyglot = new node_polyglot__WEBPACK_IMPORTED_MODULE_3__({ phrases: _locales_en_gb_js__WEBPACK_IMPORTED_MODULE_4__.phrases });
const plugin = new _src_browser__WEBPACK_IMPORTED_MODULE_1__.PageValidationPlugin(polyglot).withCore().withHooks(_templates__WEBPACK_IMPORTED_MODULE_2__.hooks);
_tngbl_forms__WEBPACK_IMPORTED_MODULE_0__.forms.withPlugin(plugin);
window['tngbl'] = {
    forms: _tngbl_forms__WEBPACK_IMPORTED_MODULE_0__.forms
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvLi4vbm9kZV9tb2R1bGVzL2NhbGwtYmluZC9jYWxsQm91bmQuanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy13d3ctc3RhdGljLy4uL25vZGVfbW9kdWxlcy9jYWxsLWJpbmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy13d3ctc3RhdGljLy4uL25vZGVfbW9kdWxlcy9kZWZpbmUtcHJvcGVydGllcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvLi4vbm9kZV9tb2R1bGVzL2VzLWFic3RyYWN0LzIwMjAvUmVxdWlyZU9iamVjdENvZXJjaWJsZS5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvLi4vbm9kZV9tb2R1bGVzL2VzLWFic3RyYWN0LzIwMjAvVG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy13d3ctc3RhdGljLy4uL25vZGVfbW9kdWxlcy9lcy1hYnN0cmFjdC81L0NoZWNrT2JqZWN0Q29lcmNpYmxlLmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtd3d3LXN0YXRpYy8uLi9ub2RlX21vZHVsZXMvZm9yLWVhY2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy13d3ctc3RhdGljLy4uL25vZGVfbW9kdWxlcy9mdW5jdGlvbi1iaW5kL2ltcGxlbWVudGF0aW9uLmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtd3d3LXN0YXRpYy8uLi9ub2RlX21vZHVsZXMvZnVuY3Rpb24tYmluZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvLi4vbm9kZV9tb2R1bGVzL2dldC1pbnRyaW5zaWMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy13d3ctc3RhdGljLy4uL25vZGVfbW9kdWxlcy9oYXMtc3ltYm9scy9pbmRleC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvLi4vbm9kZV9tb2R1bGVzL2hhcy1zeW1ib2xzL3NoYW1zLmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtd3d3LXN0YXRpYy8uLi9ub2RlX21vZHVsZXMvaGFzL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvLi4vbm9kZV9tb2R1bGVzL2lzLWNhbGxhYmxlL2luZGV4LmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtd3d3LXN0YXRpYy8uLi9ub2RlX21vZHVsZXMvbm9kZS1wb2x5Z2xvdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvLi4vbm9kZV9tb2R1bGVzL29iamVjdC1rZXlzL2ltcGxlbWVudGF0aW9uLmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtd3d3LXN0YXRpYy8uLi9ub2RlX21vZHVsZXMvb2JqZWN0LWtleXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy13d3ctc3RhdGljLy4uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pc0FyZ3VtZW50cy5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvLi4vbm9kZV9tb2R1bGVzL3N0cmluZy5wcm90b3R5cGUudHJpbS9pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvLi4vbm9kZV9tb2R1bGVzL3N0cmluZy5wcm90b3R5cGUudHJpbS9pbmRleC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvLi4vbm9kZV9tb2R1bGVzL3N0cmluZy5wcm90b3R5cGUudHJpbS9wb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvLi4vbm9kZV9tb2R1bGVzL3N0cmluZy5wcm90b3R5cGUudHJpbS9zaGltLmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtd3d3LXN0YXRpYy8uLi9ub2RlX21vZHVsZXMvd2FybmluZy93YXJuaW5nLmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtd3d3LXN0YXRpYy8uLi9hdXRoL3NyYy9kb21haW4vbW9kZWxzLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtd3d3LXN0YXRpYy8uLi9hdXRoL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvLi9zcmMvdGVtcGxhdGVzL2Zhdm91cml0ZS1jb2xvdXIudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy13d3ctc3RhdGljLy4vc3JjL3RlbXBsYXRlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvLi4vc3JjL2Jyb3dzZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy13d3ctc3RhdGljLy4uL3NyYy90ZW1wbGF0ZXMvZXJyb3ItYmxvY2sudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy13d3ctc3RhdGljLy4uL3NyYy90ZW1wbGF0ZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy13d3ctc3RhdGljLy4uL3NyYy90ZW1wbGF0ZXMvbmV3LXBhc3N3b3JkLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtd3d3LXN0YXRpYy8uLi9mb3Jtcy9zcmMvZGF0YS10cmlnZ2Vycy9pbmRleC50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvLi4vZm9ybXMvc3JjL2RvbWFpbi9tb2RlbHMvZXhjZXB0aW9ucy50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvLi4vZm9ybXMvc3JjL2RvbWFpbi9tb2RlbHMvZmllbGQudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy13d3ctc3RhdGljLy4uL2Zvcm1zL3NyYy9kb21haW4vbW9kZWxzL2ZpZWxkc2V0LnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtd3d3LXN0YXRpYy8uLi9mb3Jtcy9zcmMvZG9tYWluL21vZGVscy9mb3JtLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtd3d3LXN0YXRpYy8uLi9mb3Jtcy9zcmMvZG9tYWluL21vZGVscy9pbmRleC50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvLi4vZm9ybXMvc3JjL2RvbWFpbi9tb2RlbHMvc2NoZW1hLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtd3d3LXN0YXRpYy8uLi9mb3Jtcy9zcmMvZm9ybS1tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy13d3ctc3RhdGljLy4uL2Zvcm1zL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvLi4vZm9ybXMvc3JjL3ZhbGlkYXRpb25zL2NvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy13d3ctc3RhdGljLy4uL2Zvcm1zL3NyYy92YWxpZGF0aW9ucy9jb3JlL21pbi1sZW5ndGgudHMiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy13d3ctc3RhdGljLy4uL2Zvcm1zL3NyYy92YWxpZGF0aW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvLi4vc2VjdXJlLXN0b3JlL3NyYy9kb21haW4vZW50aXRpZXMvc2VjdXJlLWRhdGEtYWNjZXNzLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtd3d3LXN0YXRpYy8uLi9zZWN1cmUtc3RvcmUvc3JjL2RvbWFpbi9lbnRpdGllcy9zZWN1cmUtZGF0YS50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvLi4vc2VjdXJlLXN0b3JlL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvLi4vdXRpbHMvc3JjL3V0aWxzL3R5cGVzLnRzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtd3d3LXN0YXRpYy8uL3NyYy9sb2NhbGVzL2VuLWdiLmpzIiwid2VicGFjazovL2V4YW1wbGUtZm9ybXMtd3d3LXN0YXRpYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZXhhbXBsZS1mb3Jtcy13d3ctc3RhdGljL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9leGFtcGxlLWZvcm1zLXd3dy1zdGF0aWMvLi9zcmMvYnJvd3Nlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7O0FBRWIsbUJBQW1CLG1CQUFPLENBQUMsc0VBQWU7O0FBRTFDLGVBQWUsbUJBQU8sQ0FBQyx1REFBSTs7QUFFM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDZGE7O0FBRWIsV0FBVyxtQkFBTyxDQUFDLHNFQUFlO0FBQ2xDLG1CQUFtQixtQkFBTyxDQUFDLHNFQUFlOztBQUUxQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUSxXQUFXO0FBQ3ZDLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQ0FBMkMsbUJBQW1CO0FBQzlELENBQUM7QUFDRCxDQUFDLG9C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Q0FBQztBQUU1QixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLFlBQVksTUFBTTtBQUU5RSxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVE7Ozs7Ozs7Ozs7Ozs7OztBQ1huRDtBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLG9EQUFvRDtBQUNwRCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ1pBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxnQ0FBZ0MsWUFBWTtXQUM1QztXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7OztBQ05vQztBQUMwQjtBQUMxQjtBQUNLO0FBQ0k7QUFFN0MsTUFBTSxRQUFRLEdBQUcsSUFBSSwwQ0FBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLHNEQUFPLEVBQUUsQ0FBQztBQUVuRCxNQUFNLE1BQU0sR0FBRyxJQUFJLDhEQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FBQyw2Q0FBSyxDQUFDO0FBRTdFLDBEQUFnQixDQUFDLE1BQU0sQ0FBQztBQUV4QixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUc7SUFDaEIsS0FBSztDQUNOIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnLi8nKTtcblxudmFyICRpbmRleE9mID0gY2FsbEJpbmQoR2V0SW50cmluc2ljKCdTdHJpbmcucHJvdG90eXBlLmluZGV4T2YnKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJvdW5kSW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHR2YXIgaW50cmluc2ljID0gR2V0SW50cmluc2ljKG5hbWUsICEhYWxsb3dNaXNzaW5nKTtcblx0aWYgKHR5cGVvZiBpbnRyaW5zaWMgPT09ICdmdW5jdGlvbicgJiYgJGluZGV4T2YobmFtZSwgJy5wcm90b3R5cGUuJykgPiAtMSkge1xuXHRcdHJldHVybiBjYWxsQmluZChpbnRyaW5zaWMpO1xuXHR9XG5cdHJldHVybiBpbnRyaW5zaWM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdnZXQtaW50cmluc2ljJyk7XG5cbnZhciAkYXBwbHkgPSBHZXRJbnRyaW5zaWMoJyVGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHklJyk7XG52YXIgJGNhbGwgPSBHZXRJbnRyaW5zaWMoJyVGdW5jdGlvbi5wcm90b3R5cGUuY2FsbCUnKTtcbnZhciAkcmVmbGVjdEFwcGx5ID0gR2V0SW50cmluc2ljKCclUmVmbGVjdC5hcHBseSUnLCB0cnVlKSB8fCBiaW5kLmNhbGwoJGNhbGwsICRhcHBseSk7XG5cbnZhciAkZ09QRCA9IEdldEludHJpbnNpYygnJU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IlJywgdHJ1ZSk7XG52YXIgJGRlZmluZVByb3BlcnR5ID0gR2V0SW50cmluc2ljKCclT2JqZWN0LmRlZmluZVByb3BlcnR5JScsIHRydWUpO1xudmFyICRtYXggPSBHZXRJbnRyaW5zaWMoJyVNYXRoLm1heCUnKTtcblxuaWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHR0cnkge1xuXHRcdCRkZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IHZhbHVlOiAxIH0pO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0Ly8gSUUgOCBoYXMgYSBicm9rZW4gZGVmaW5lUHJvcGVydHlcblx0XHQkZGVmaW5lUHJvcGVydHkgPSBudWxsO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJpbmQob3JpZ2luYWxGdW5jdGlvbikge1xuXHR2YXIgZnVuYyA9ICRyZWZsZWN0QXBwbHkoYmluZCwgJGNhbGwsIGFyZ3VtZW50cyk7XG5cdGlmICgkZ09QRCAmJiAkZGVmaW5lUHJvcGVydHkpIHtcblx0XHR2YXIgZGVzYyA9ICRnT1BEKGZ1bmMsICdsZW5ndGgnKTtcblx0XHRpZiAoZGVzYy5jb25maWd1cmFibGUpIHtcblx0XHRcdC8vIG9yaWdpbmFsIGxlbmd0aCwgcGx1cyB0aGUgcmVjZWl2ZXIsIG1pbnVzIGFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyAoYWZ0ZXIgdGhlIHJlY2VpdmVyKVxuXHRcdFx0JGRlZmluZVByb3BlcnR5KFxuXHRcdFx0XHRmdW5jLFxuXHRcdFx0XHQnbGVuZ3RoJyxcblx0XHRcdFx0eyB2YWx1ZTogMSArICRtYXgoMCwgb3JpZ2luYWxGdW5jdGlvbi5sZW5ndGggLSAoYXJndW1lbnRzLmxlbmd0aCAtIDEpKSB9XG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZnVuYztcbn07XG5cbnZhciBhcHBseUJpbmQgPSBmdW5jdGlvbiBhcHBseUJpbmQoKSB7XG5cdHJldHVybiAkcmVmbGVjdEFwcGx5KGJpbmQsICRhcHBseSwgYXJndW1lbnRzKTtcbn07XG5cbmlmICgkZGVmaW5lUHJvcGVydHkpIHtcblx0JGRlZmluZVByb3BlcnR5KG1vZHVsZS5leHBvcnRzLCAnYXBwbHknLCB7IHZhbHVlOiBhcHBseUJpbmQgfSk7XG59IGVsc2Uge1xuXHRtb2R1bGUuZXhwb3J0cy5hcHBseSA9IGFwcGx5QmluZDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgPSByZXF1aXJlKCdvYmplY3Qta2V5cycpO1xudmFyIGhhc1N5bWJvbHMgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2woJ2ZvbycpID09PSAnc3ltYm9sJztcblxudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBjb25jYXQgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0O1xudmFyIG9yaWdEZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxudmFyIGlzRnVuY3Rpb24gPSBmdW5jdGlvbiAoZm4pIHtcblx0cmV0dXJuIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0ci5jYWxsKGZuKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn07XG5cbnZhciBhcmVQcm9wZXJ0eURlc2NyaXB0b3JzU3VwcG9ydGVkID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgb2JqID0ge307XG5cdHRyeSB7XG5cdFx0b3JpZ0RlZmluZVByb3BlcnR5KG9iaiwgJ3gnLCB7IGVudW1lcmFibGU6IGZhbHNlLCB2YWx1ZTogb2JqIH0pO1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFycywgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRmb3IgKHZhciBfIGluIG9iaikgeyAvLyBqc2NzOmlnbm9yZSBkaXNhbGxvd1VudXNlZFZhcmlhYmxlc1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gb2JqLnggPT09IG9iajtcblx0fSBjYXRjaCAoZSkgeyAvKiB0aGlzIGlzIElFIDguICovXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59O1xudmFyIHN1cHBvcnRzRGVzY3JpcHRvcnMgPSBvcmlnRGVmaW5lUHJvcGVydHkgJiYgYXJlUHJvcGVydHlEZXNjcmlwdG9yc1N1cHBvcnRlZCgpO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lLCB2YWx1ZSwgcHJlZGljYXRlKSB7XG5cdGlmIChuYW1lIGluIG9iamVjdCAmJiAoIWlzRnVuY3Rpb24ocHJlZGljYXRlKSB8fCAhcHJlZGljYXRlKCkpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGlmIChzdXBwb3J0c0Rlc2NyaXB0b3JzKSB7XG5cdFx0b3JpZ0RlZmluZVByb3BlcnR5KG9iamVjdCwgbmFtZSwge1xuXHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHR2YWx1ZTogdmFsdWUsXG5cdFx0XHR3cml0YWJsZTogdHJ1ZVxuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdG9iamVjdFtuYW1lXSA9IHZhbHVlO1xuXHR9XG59O1xuXG52YXIgZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIChvYmplY3QsIG1hcCkge1xuXHR2YXIgcHJlZGljYXRlcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDoge307XG5cdHZhciBwcm9wcyA9IGtleXMobWFwKTtcblx0aWYgKGhhc1N5bWJvbHMpIHtcblx0XHRwcm9wcyA9IGNvbmNhdC5jYWxsKHByb3BzLCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG1hcCkpO1xuXHR9XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRkZWZpbmVQcm9wZXJ0eShvYmplY3QsIHByb3BzW2ldLCBtYXBbcHJvcHNbaV1dLCBwcmVkaWNhdGVzW3Byb3BzW2ldXSk7XG5cdH1cbn07XG5cbmRlZmluZVByb3BlcnRpZXMuc3VwcG9ydHNEZXNjcmlwdG9ycyA9ICEhc3VwcG9ydHNEZXNjcmlwdG9ycztcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVQcm9wZXJ0aWVzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLzUvQ2hlY2tPYmplY3RDb2VyY2libGUnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyICRTdHJpbmcgPSBHZXRJbnRyaW5zaWMoJyVTdHJpbmclJyk7XG52YXIgJFR5cGVFcnJvciA9IEdldEludHJpbnNpYygnJVR5cGVFcnJvciUnKTtcblxuLy8gaHR0cHM6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXRvc3RyaW5nXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gVG9TdHJpbmcoYXJndW1lbnQpIHtcblx0aWYgKHR5cGVvZiBhcmd1bWVudCA9PT0gJ3N5bWJvbCcpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgYSBTeW1ib2wgdmFsdWUgdG8gYSBzdHJpbmcnKTtcblx0fVxuXHRyZXR1cm4gJFN0cmluZyhhcmd1bWVudCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnZ2V0LWludHJpbnNpYycpO1xuXG52YXIgJFR5cGVFcnJvciA9IEdldEludHJpbnNpYygnJVR5cGVFcnJvciUnKTtcblxuLy8gaHR0cDovLzI2Mi5lY21hLWludGVybmF0aW9uYWwub3JnLzUuMS8jc2VjLTkuMTBcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBDaGVja09iamVjdENvZXJjaWJsZSh2YWx1ZSwgb3B0TWVzc2FnZSkge1xuXHRpZiAodmFsdWUgPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKG9wdE1lc3NhZ2UgfHwgKCdDYW5ub3QgY2FsbCBtZXRob2Qgb24gJyArIHZhbHVlKSk7XG5cdH1cblx0cmV0dXJuIHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCdpcy1jYWxsYWJsZScpO1xuXG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIGZvckVhY2hBcnJheSA9IGZ1bmN0aW9uIGZvckVhY2hBcnJheShhcnJheSwgaXRlcmF0b3IsIHJlY2VpdmVyKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGFycmF5LCBpKSkge1xuICAgICAgICAgICAgaWYgKHJlY2VpdmVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRvcihhcnJheVtpXSwgaSwgYXJyYXkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRvci5jYWxsKHJlY2VpdmVyLCBhcnJheVtpXSwgaSwgYXJyYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIGZvckVhY2hTdHJpbmcgPSBmdW5jdGlvbiBmb3JFYWNoU3RyaW5nKHN0cmluZywgaXRlcmF0b3IsIHJlY2VpdmVyKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHN0cmluZy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAvLyBubyBzdWNoIHRoaW5nIGFzIGEgc3BhcnNlIHN0cmluZy5cbiAgICAgICAgaWYgKHJlY2VpdmVyID09IG51bGwpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yKHN0cmluZy5jaGFyQXQoaSksIGksIHN0cmluZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVyYXRvci5jYWxsKHJlY2VpdmVyLCBzdHJpbmcuY2hhckF0KGkpLCBpLCBzdHJpbmcpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIGZvckVhY2hPYmplY3QgPSBmdW5jdGlvbiBmb3JFYWNoT2JqZWN0KG9iamVjdCwgaXRlcmF0b3IsIHJlY2VpdmVyKSB7XG4gICAgZm9yICh2YXIgayBpbiBvYmplY3QpIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrKSkge1xuICAgICAgICAgICAgaWYgKHJlY2VpdmVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpdGVyYXRvcihvYmplY3Rba10sIGssIG9iamVjdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwocmVjZWl2ZXIsIG9iamVjdFtrXSwgaywgb2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBmb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChsaXN0LCBpdGVyYXRvciwgdGhpc0FyZykge1xuICAgIGlmICghaXNDYWxsYWJsZShpdGVyYXRvcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaXRlcmF0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuXG4gICAgdmFyIHJlY2VpdmVyO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDMpIHtcbiAgICAgICAgcmVjZWl2ZXIgPSB0aGlzQXJnO1xuICAgIH1cblxuICAgIGlmICh0b1N0ci5jYWxsKGxpc3QpID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgIGZvckVhY2hBcnJheShsaXN0LCBpdGVyYXRvciwgcmVjZWl2ZXIpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGZvckVhY2hTdHJpbmcobGlzdCwgaXRlcmF0b3IsIHJlY2VpdmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3JFYWNoT2JqZWN0KGxpc3QsIGl0ZXJhdG9yLCByZWNlaXZlcik7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmb3JFYWNoO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBlc2xpbnQgbm8taW52YWxpZC10aGlzOiAxICovXG5cbnZhciBFUlJPUl9NRVNTQUdFID0gJ0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kIGNhbGxlZCBvbiBpbmNvbXBhdGlibGUgJztcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgZnVuY1R5cGUgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQodGhhdCkge1xuICAgIHZhciB0YXJnZXQgPSB0aGlzO1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSAnZnVuY3Rpb24nIHx8IHRvU3RyLmNhbGwodGFyZ2V0KSAhPT0gZnVuY1R5cGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihFUlJPUl9NRVNTQUdFICsgdGFyZ2V0KTtcbiAgICB9XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgICB2YXIgYm91bmQ7XG4gICAgdmFyIGJpbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBib3VuZCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRhcmdldC5hcHBseShcbiAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoT2JqZWN0KHJlc3VsdCkgPT09IHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQuYXBwbHkoXG4gICAgICAgICAgICAgICAgdGhhdCxcbiAgICAgICAgICAgICAgICBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBib3VuZExlbmd0aCA9IE1hdGgubWF4KDAsIHRhcmdldC5sZW5ndGggLSBhcmdzLmxlbmd0aCk7XG4gICAgdmFyIGJvdW5kQXJncyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm91bmRMZW5ndGg7IGkrKykge1xuICAgICAgICBib3VuZEFyZ3MucHVzaCgnJCcgKyBpKTtcbiAgICB9XG5cbiAgICBib3VuZCA9IEZ1bmN0aW9uKCdiaW5kZXInLCAncmV0dXJuIGZ1bmN0aW9uICgnICsgYm91bmRBcmdzLmpvaW4oJywnKSArICcpeyByZXR1cm4gYmluZGVyLmFwcGx5KHRoaXMsYXJndW1lbnRzKTsgfScpKGJpbmRlcik7XG5cbiAgICBpZiAodGFyZ2V0LnByb3RvdHlwZSkge1xuICAgICAgICB2YXIgRW1wdHkgPSBmdW5jdGlvbiBFbXB0eSgpIHt9O1xuICAgICAgICBFbXB0eS5wcm90b3R5cGUgPSB0YXJnZXQucHJvdG90eXBlO1xuICAgICAgICBib3VuZC5wcm90b3R5cGUgPSBuZXcgRW1wdHkoKTtcbiAgICAgICAgRW1wdHkucHJvdG90eXBlID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gYm91bmQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgfHwgaW1wbGVtZW50YXRpb247XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1bmRlZmluZWQ7XG5cbnZhciAkU3ludGF4RXJyb3IgPSBTeW50YXhFcnJvcjtcbnZhciAkRnVuY3Rpb24gPSBGdW5jdGlvbjtcbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbnZhciBnZXRFdmFsbGVkQ29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZXhwcmVzc2lvblN5bnRheCkge1xuXHR0cnkge1xuXHRcdHJldHVybiAkRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiOyByZXR1cm4gKCcgKyBleHByZXNzaW9uU3ludGF4ICsgJykuY29uc3RydWN0b3I7JykoKTtcblx0fSBjYXRjaCAoZSkge31cbn07XG5cbnZhciAkZ09QRCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5pZiAoJGdPUEQpIHtcblx0dHJ5IHtcblx0XHQkZ09QRCh7fSwgJycpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0JGdPUEQgPSBudWxsOyAvLyB0aGlzIGlzIElFIDgsIHdoaWNoIGhhcyBhIGJyb2tlbiBnT1BEXG5cdH1cbn1cblxudmFyIHRocm93VHlwZUVycm9yID0gZnVuY3Rpb24gKCkge1xuXHR0aHJvdyBuZXcgJFR5cGVFcnJvcigpO1xufTtcbnZhciBUaHJvd1R5cGVFcnJvciA9ICRnT1BEXG5cdD8gKGZ1bmN0aW9uICgpIHtcblx0XHR0cnkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9ucywgbm8tY2FsbGVyLCBuby1yZXN0cmljdGVkLXByb3BlcnRpZXNcblx0XHRcdGFyZ3VtZW50cy5jYWxsZWU7IC8vIElFIDggZG9lcyBub3QgdGhyb3cgaGVyZVxuXHRcdFx0cmV0dXJuIHRocm93VHlwZUVycm9yO1xuXHRcdH0gY2F0Y2ggKGNhbGxlZVRocm93cykge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Ly8gSUUgOCB0aHJvd3Mgb24gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihhcmd1bWVudHMsICcnKVxuXHRcdFx0XHRyZXR1cm4gJGdPUEQoYXJndW1lbnRzLCAnY2FsbGVlJykuZ2V0O1xuXHRcdFx0fSBjYXRjaCAoZ09QRHRocm93cykge1xuXHRcdFx0XHRyZXR1cm4gdGhyb3dUeXBlRXJyb3I7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KCkpXG5cdDogdGhyb3dUeXBlRXJyb3I7XG5cbnZhciBoYXNTeW1ib2xzID0gcmVxdWlyZSgnaGFzLXN5bWJvbHMnKSgpO1xuXG52YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHguX19wcm90b19fOyB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvXG5cbnZhciBuZWVkc0V2YWwgPSB7fTtcblxudmFyIFR5cGVkQXJyYXkgPSB0eXBlb2YgVWludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBnZXRQcm90byhVaW50OEFycmF5KTtcblxudmFyIElOVFJJTlNJQ1MgPSB7XG5cdCclQWdncmVnYXRlRXJyb3IlJzogdHlwZW9mIEFnZ3JlZ2F0ZUVycm9yID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEFnZ3JlZ2F0ZUVycm9yLFxuXHQnJUFycmF5JSc6IEFycmF5LFxuXHQnJUFycmF5QnVmZmVyJSc6IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBcnJheUJ1ZmZlcixcblx0JyVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90byhbXVtTeW1ib2wuaXRlcmF0b3JdKCkpIDogdW5kZWZpbmVkLFxuXHQnJUFzeW5jRnJvbVN5bmNJdGVyYXRvclByb3RvdHlwZSUnOiB1bmRlZmluZWQsXG5cdCclQXN5bmNGdW5jdGlvbiUnOiBuZWVkc0V2YWwsXG5cdCclQXN5bmNHZW5lcmF0b3IlJzogbmVlZHNFdmFsLFxuXHQnJUFzeW5jR2VuZXJhdG9yRnVuY3Rpb24lJzogbmVlZHNFdmFsLFxuXHQnJUFzeW5jSXRlcmF0b3JQcm90b3R5cGUlJzogbmVlZHNFdmFsLFxuXHQnJUF0b21pY3MlJzogdHlwZW9mIEF0b21pY3MgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQXRvbWljcyxcblx0JyVCaWdJbnQlJzogdHlwZW9mIEJpZ0ludCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBCaWdJbnQsXG5cdCclQm9vbGVhbiUnOiBCb29sZWFuLFxuXHQnJURhdGFWaWV3JSc6IHR5cGVvZiBEYXRhVmlldyA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBEYXRhVmlldyxcblx0JyVEYXRlJSc6IERhdGUsXG5cdCclZGVjb2RlVVJJJSc6IGRlY29kZVVSSSxcblx0JyVkZWNvZGVVUklDb21wb25lbnQlJzogZGVjb2RlVVJJQ29tcG9uZW50LFxuXHQnJWVuY29kZVVSSSUnOiBlbmNvZGVVUkksXG5cdCclZW5jb2RlVVJJQ29tcG9uZW50JSc6IGVuY29kZVVSSUNvbXBvbmVudCxcblx0JyVFcnJvciUnOiBFcnJvcixcblx0JyVldmFsJSc6IGV2YWwsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXZhbFxuXHQnJUV2YWxFcnJvciUnOiBFdmFsRXJyb3IsXG5cdCclRmxvYXQzMkFycmF5JSc6IHR5cGVvZiBGbG9hdDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmxvYXQzMkFycmF5LFxuXHQnJUZsb2F0NjRBcnJheSUnOiB0eXBlb2YgRmxvYXQ2NEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZsb2F0NjRBcnJheSxcblx0JyVGaW5hbGl6YXRpb25SZWdpc3RyeSUnOiB0eXBlb2YgRmluYWxpemF0aW9uUmVnaXN0cnkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmluYWxpemF0aW9uUmVnaXN0cnksXG5cdCclRnVuY3Rpb24lJzogJEZ1bmN0aW9uLFxuXHQnJUdlbmVyYXRvckZ1bmN0aW9uJSc6IG5lZWRzRXZhbCxcblx0JyVJbnQ4QXJyYXklJzogdHlwZW9mIEludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQ4QXJyYXksXG5cdCclSW50MTZBcnJheSUnOiB0eXBlb2YgSW50MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQxNkFycmF5LFxuXHQnJUludDMyQXJyYXklJzogdHlwZW9mIEludDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogSW50MzJBcnJheSxcblx0JyVpc0Zpbml0ZSUnOiBpc0Zpbml0ZSxcblx0JyVpc05hTiUnOiBpc05hTixcblx0JyVJdGVyYXRvclByb3RvdHlwZSUnOiBoYXNTeW1ib2xzID8gZ2V0UHJvdG8oZ2V0UHJvdG8oW11bU3ltYm9sLml0ZXJhdG9yXSgpKSkgOiB1bmRlZmluZWQsXG5cdCclSlNPTiUnOiB0eXBlb2YgSlNPTiA9PT0gJ29iamVjdCcgPyBKU09OIDogdW5kZWZpbmVkLFxuXHQnJU1hcCUnOiB0eXBlb2YgTWFwID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IE1hcCxcblx0JyVNYXBJdGVyYXRvclByb3RvdHlwZSUnOiB0eXBlb2YgTWFwID09PSAndW5kZWZpbmVkJyB8fCAhaGFzU3ltYm9scyA/IHVuZGVmaW5lZCA6IGdldFByb3RvKG5ldyBNYXAoKVtTeW1ib2wuaXRlcmF0b3JdKCkpLFxuXHQnJU1hdGglJzogTWF0aCxcblx0JyVOdW1iZXIlJzogTnVtYmVyLFxuXHQnJU9iamVjdCUnOiBPYmplY3QsXG5cdCclcGFyc2VGbG9hdCUnOiBwYXJzZUZsb2F0LFxuXHQnJXBhcnNlSW50JSc6IHBhcnNlSW50LFxuXHQnJVByb21pc2UlJzogdHlwZW9mIFByb21pc2UgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJvbWlzZSxcblx0JyVQcm94eSUnOiB0eXBlb2YgUHJveHkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJveHksXG5cdCclUmFuZ2VFcnJvciUnOiBSYW5nZUVycm9yLFxuXHQnJVJlZmVyZW5jZUVycm9yJSc6IFJlZmVyZW5jZUVycm9yLFxuXHQnJVJlZmxlY3QlJzogdHlwZW9mIFJlZmxlY3QgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUmVmbGVjdCxcblx0JyVSZWdFeHAlJzogUmVnRXhwLFxuXHQnJVNldCUnOiB0eXBlb2YgU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFNldCxcblx0JyVTZXRJdGVyYXRvclByb3RvdHlwZSUnOiB0eXBlb2YgU2V0ID09PSAndW5kZWZpbmVkJyB8fCAhaGFzU3ltYm9scyA/IHVuZGVmaW5lZCA6IGdldFByb3RvKG5ldyBTZXQoKVtTeW1ib2wuaXRlcmF0b3JdKCkpLFxuXHQnJVNoYXJlZEFycmF5QnVmZmVyJSc6IHR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBTaGFyZWRBcnJheUJ1ZmZlcixcblx0JyVTdHJpbmclJzogU3RyaW5nLFxuXHQnJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90bygnJ1tTeW1ib2wuaXRlcmF0b3JdKCkpIDogdW5kZWZpbmVkLFxuXHQnJVN5bWJvbCUnOiBoYXNTeW1ib2xzID8gU3ltYm9sIDogdW5kZWZpbmVkLFxuXHQnJVN5bnRheEVycm9yJSc6ICRTeW50YXhFcnJvcixcblx0JyVUaHJvd1R5cGVFcnJvciUnOiBUaHJvd1R5cGVFcnJvcixcblx0JyVUeXBlZEFycmF5JSc6IFR5cGVkQXJyYXksXG5cdCclVHlwZUVycm9yJSc6ICRUeXBlRXJyb3IsXG5cdCclVWludDhBcnJheSUnOiB0eXBlb2YgVWludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50OEFycmF5LFxuXHQnJVVpbnQ4Q2xhbXBlZEFycmF5JSc6IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50OENsYW1wZWRBcnJheSxcblx0JyVVaW50MTZBcnJheSUnOiB0eXBlb2YgVWludDE2QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDE2QXJyYXksXG5cdCclVWludDMyQXJyYXklJzogdHlwZW9mIFVpbnQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQzMkFycmF5LFxuXHQnJVVSSUVycm9yJSc6IFVSSUVycm9yLFxuXHQnJVdlYWtNYXAlJzogdHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha01hcCxcblx0JyVXZWFrUmVmJSc6IHR5cGVvZiBXZWFrUmVmID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtSZWYsXG5cdCclV2Vha1NldCUnOiB0eXBlb2YgV2Vha1NldCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrU2V0XG59O1xuXG52YXIgZG9FdmFsID0gZnVuY3Rpb24gZG9FdmFsKG5hbWUpIHtcblx0dmFyIHZhbHVlO1xuXHRpZiAobmFtZSA9PT0gJyVBc3luY0Z1bmN0aW9uJScpIHtcblx0XHR2YWx1ZSA9IGdldEV2YWxsZWRDb25zdHJ1Y3RvcignYXN5bmMgZnVuY3Rpb24gKCkge30nKTtcblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUdlbmVyYXRvckZ1bmN0aW9uJScpIHtcblx0XHR2YWx1ZSA9IGdldEV2YWxsZWRDb25zdHJ1Y3RvcignZnVuY3Rpb24qICgpIHt9Jyk7XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVBc3luY0dlbmVyYXRvckZ1bmN0aW9uJScpIHtcblx0XHR2YWx1ZSA9IGdldEV2YWxsZWRDb25zdHJ1Y3RvcignYXN5bmMgZnVuY3Rpb24qICgpIHt9Jyk7XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVBc3luY0dlbmVyYXRvciUnKSB7XG5cdFx0dmFyIGZuID0gZG9FdmFsKCclQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiUnKTtcblx0XHRpZiAoZm4pIHtcblx0XHRcdHZhbHVlID0gZm4ucHJvdG90eXBlO1xuXHRcdH1cblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUFzeW5jSXRlcmF0b3JQcm90b3R5cGUlJykge1xuXHRcdHZhciBnZW4gPSBkb0V2YWwoJyVBc3luY0dlbmVyYXRvciUnKTtcblx0XHRpZiAoZ2VuKSB7XG5cdFx0XHR2YWx1ZSA9IGdldFByb3RvKGdlbi5wcm90b3R5cGUpO1xuXHRcdH1cblx0fVxuXG5cdElOVFJJTlNJQ1NbbmFtZV0gPSB2YWx1ZTtcblxuXHRyZXR1cm4gdmFsdWU7XG59O1xuXG52YXIgTEVHQUNZX0FMSUFTRVMgPSB7XG5cdCclQXJyYXlCdWZmZXJQcm90b3R5cGUlJzogWydBcnJheUJ1ZmZlcicsICdwcm90b3R5cGUnXSxcblx0JyVBcnJheVByb3RvdHlwZSUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUFycmF5UHJvdG9fZW50cmllcyUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICdlbnRyaWVzJ10sXG5cdCclQXJyYXlQcm90b19mb3JFYWNoJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ2ZvckVhY2gnXSxcblx0JyVBcnJheVByb3RvX2tleXMlJzogWydBcnJheScsICdwcm90b3R5cGUnLCAna2V5cyddLFxuXHQnJUFycmF5UHJvdG9fdmFsdWVzJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ3ZhbHVlcyddLFxuXHQnJUFzeW5jRnVuY3Rpb25Qcm90b3R5cGUlJzogWydBc3luY0Z1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFzeW5jR2VuZXJhdG9yJSc6IFsnQXN5bmNHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVBc3luY0dlbmVyYXRvclByb3RvdHlwZSUnOiBbJ0FzeW5jR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJywgJ3Byb3RvdHlwZSddLFxuXHQnJUJvb2xlYW5Qcm90b3R5cGUlJzogWydCb29sZWFuJywgJ3Byb3RvdHlwZSddLFxuXHQnJURhdGFWaWV3UHJvdG90eXBlJSc6IFsnRGF0YVZpZXcnLCAncHJvdG90eXBlJ10sXG5cdCclRGF0ZVByb3RvdHlwZSUnOiBbJ0RhdGUnLCAncHJvdG90eXBlJ10sXG5cdCclRXJyb3JQcm90b3R5cGUlJzogWydFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVFdmFsRXJyb3JQcm90b3R5cGUlJzogWydFdmFsRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclRmxvYXQzMkFycmF5UHJvdG90eXBlJSc6IFsnRmxvYXQzMkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUZsb2F0NjRBcnJheVByb3RvdHlwZSUnOiBbJ0Zsb2F0NjRBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVGdW5jdGlvblByb3RvdHlwZSUnOiBbJ0Z1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUdlbmVyYXRvciUnOiBbJ0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUdlbmVyYXRvclByb3RvdHlwZSUnOiBbJ0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQ4QXJyYXlQcm90b3R5cGUlJzogWydJbnQ4QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclSW50MTZBcnJheVByb3RvdHlwZSUnOiBbJ0ludDE2QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclSW50MzJBcnJheVByb3RvdHlwZSUnOiBbJ0ludDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclSlNPTlBhcnNlJSc6IFsnSlNPTicsICdwYXJzZSddLFxuXHQnJUpTT05TdHJpbmdpZnklJzogWydKU09OJywgJ3N0cmluZ2lmeSddLFxuXHQnJU1hcFByb3RvdHlwZSUnOiBbJ01hcCcsICdwcm90b3R5cGUnXSxcblx0JyVOdW1iZXJQcm90b3R5cGUlJzogWydOdW1iZXInLCAncHJvdG90eXBlJ10sXG5cdCclT2JqZWN0UHJvdG90eXBlJSc6IFsnT2JqZWN0JywgJ3Byb3RvdHlwZSddLFxuXHQnJU9ialByb3RvX3RvU3RyaW5nJSc6IFsnT2JqZWN0JywgJ3Byb3RvdHlwZScsICd0b1N0cmluZyddLFxuXHQnJU9ialByb3RvX3ZhbHVlT2YlJzogWydPYmplY3QnLCAncHJvdG90eXBlJywgJ3ZhbHVlT2YnXSxcblx0JyVQcm9taXNlUHJvdG90eXBlJSc6IFsnUHJvbWlzZScsICdwcm90b3R5cGUnXSxcblx0JyVQcm9taXNlUHJvdG9fdGhlbiUnOiBbJ1Byb21pc2UnLCAncHJvdG90eXBlJywgJ3RoZW4nXSxcblx0JyVQcm9taXNlX2FsbCUnOiBbJ1Byb21pc2UnLCAnYWxsJ10sXG5cdCclUHJvbWlzZV9yZWplY3QlJzogWydQcm9taXNlJywgJ3JlamVjdCddLFxuXHQnJVByb21pc2VfcmVzb2x2ZSUnOiBbJ1Byb21pc2UnLCAncmVzb2x2ZSddLFxuXHQnJVJhbmdlRXJyb3JQcm90b3R5cGUlJzogWydSYW5nZUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVJlZmVyZW5jZUVycm9yUHJvdG90eXBlJSc6IFsnUmVmZXJlbmNlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclUmVnRXhwUHJvdG90eXBlJSc6IFsnUmVnRXhwJywgJ3Byb3RvdHlwZSddLFxuXHQnJVNldFByb3RvdHlwZSUnOiBbJ1NldCcsICdwcm90b3R5cGUnXSxcblx0JyVTaGFyZWRBcnJheUJ1ZmZlclByb3RvdHlwZSUnOiBbJ1NoYXJlZEFycmF5QnVmZmVyJywgJ3Byb3RvdHlwZSddLFxuXHQnJVN0cmluZ1Byb3RvdHlwZSUnOiBbJ1N0cmluZycsICdwcm90b3R5cGUnXSxcblx0JyVTeW1ib2xQcm90b3R5cGUlJzogWydTeW1ib2wnLCAncHJvdG90eXBlJ10sXG5cdCclU3ludGF4RXJyb3JQcm90b3R5cGUlJzogWydTeW50YXhFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVUeXBlZEFycmF5UHJvdG90eXBlJSc6IFsnVHlwZWRBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVUeXBlRXJyb3JQcm90b3R5cGUlJzogWydUeXBlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclVWludDhBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQ4QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVWludDhDbGFtcGVkQXJyYXlQcm90b3R5cGUlJzogWydVaW50OENsYW1wZWRBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVaW50MTZBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQxNkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQzMkFycmF5UHJvdG90eXBlJSc6IFsnVWludDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVVJJRXJyb3JQcm90b3R5cGUlJzogWydVUklFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVXZWFrTWFwUHJvdG90eXBlJSc6IFsnV2Vha01hcCcsICdwcm90b3R5cGUnXSxcblx0JyVXZWFrU2V0UHJvdG90eXBlJSc6IFsnV2Vha1NldCcsICdwcm90b3R5cGUnXVxufTtcblxudmFyIGJpbmQgPSByZXF1aXJlKCdmdW5jdGlvbi1iaW5kJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnaGFzJyk7XG52YXIgJGNvbmNhdCA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBBcnJheS5wcm90b3R5cGUuY29uY2F0KTtcbnZhciAkc3BsaWNlQXBwbHkgPSBiaW5kLmNhbGwoRnVuY3Rpb24uYXBwbHksIEFycmF5LnByb3RvdHlwZS5zcGxpY2UpO1xudmFyICRyZXBsYWNlID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIFN0cmluZy5wcm90b3R5cGUucmVwbGFjZSk7XG52YXIgJHN0clNsaWNlID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIFN0cmluZy5wcm90b3R5cGUuc2xpY2UpO1xuXG4vKiBhZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2xvZGFzaC9sb2Rhc2gvYmxvYi80LjE3LjE1L2Rpc3QvbG9kYXNoLmpzI0w2NzM1LUw2NzQ0ICovXG52YXIgcmVQcm9wTmFtZSA9IC9bXiUuW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JSQpKS9nO1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nOyAvKiogVXNlZCB0byBtYXRjaCBiYWNrc2xhc2hlcyBpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciBzdHJpbmdUb1BhdGggPSBmdW5jdGlvbiBzdHJpbmdUb1BhdGgoc3RyaW5nKSB7XG5cdHZhciBmaXJzdCA9ICRzdHJTbGljZShzdHJpbmcsIDAsIDEpO1xuXHR2YXIgbGFzdCA9ICRzdHJTbGljZShzdHJpbmcsIC0xKTtcblx0aWYgKGZpcnN0ID09PSAnJScgJiYgbGFzdCAhPT0gJyUnKSB7XG5cdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignaW52YWxpZCBpbnRyaW5zaWMgc3ludGF4LCBleHBlY3RlZCBjbG9zaW5nIGAlYCcpO1xuXHR9IGVsc2UgaWYgKGxhc3QgPT09ICclJyAmJiBmaXJzdCAhPT0gJyUnKSB7XG5cdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignaW52YWxpZCBpbnRyaW5zaWMgc3ludGF4LCBleHBlY3RlZCBvcGVuaW5nIGAlYCcpO1xuXHR9XG5cdHZhciByZXN1bHQgPSBbXTtcblx0JHJlcGxhY2Uoc3RyaW5nLCByZVByb3BOYW1lLCBmdW5jdGlvbiAobWF0Y2gsIG51bWJlciwgcXVvdGUsIHN1YlN0cmluZykge1xuXHRcdHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHF1b3RlID8gJHJlcGxhY2Uoc3ViU3RyaW5nLCByZUVzY2FwZUNoYXIsICckMScpIDogbnVtYmVyIHx8IG1hdGNoO1xuXHR9KTtcblx0cmV0dXJuIHJlc3VsdDtcbn07XG4vKiBlbmQgYWRhcHRhdGlvbiAqL1xuXG52YXIgZ2V0QmFzZUludHJpbnNpYyA9IGZ1bmN0aW9uIGdldEJhc2VJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdHZhciBpbnRyaW5zaWNOYW1lID0gbmFtZTtcblx0dmFyIGFsaWFzO1xuXHRpZiAoaGFzT3duKExFR0FDWV9BTElBU0VTLCBpbnRyaW5zaWNOYW1lKSkge1xuXHRcdGFsaWFzID0gTEVHQUNZX0FMSUFTRVNbaW50cmluc2ljTmFtZV07XG5cdFx0aW50cmluc2ljTmFtZSA9ICclJyArIGFsaWFzWzBdICsgJyUnO1xuXHR9XG5cblx0aWYgKGhhc093bihJTlRSSU5TSUNTLCBpbnRyaW5zaWNOYW1lKSkge1xuXHRcdHZhciB2YWx1ZSA9IElOVFJJTlNJQ1NbaW50cmluc2ljTmFtZV07XG5cdFx0aWYgKHZhbHVlID09PSBuZWVkc0V2YWwpIHtcblx0XHRcdHZhbHVlID0gZG9FdmFsKGludHJpbnNpY05hbWUpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyAmJiAhYWxsb3dNaXNzaW5nKSB7XG5cdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignaW50cmluc2ljICcgKyBuYW1lICsgJyBleGlzdHMsIGJ1dCBpcyBub3QgYXZhaWxhYmxlLiBQbGVhc2UgZmlsZSBhbiBpc3N1ZSEnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0YWxpYXM6IGFsaWFzLFxuXHRcdFx0bmFtZTogaW50cmluc2ljTmFtZSxcblx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdH07XG5cdH1cblxuXHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdpbnRyaW5zaWMgJyArIG5hbWUgKyAnIGRvZXMgbm90IGV4aXN0IScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBHZXRJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycgfHwgbmFtZS5sZW5ndGggPT09IDApIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignaW50cmluc2ljIG5hbWUgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcnKTtcblx0fVxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgdHlwZW9mIGFsbG93TWlzc2luZyAhPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ1wiYWxsb3dNaXNzaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBhIGJvb2xlYW4nKTtcblx0fVxuXG5cdHZhciBwYXJ0cyA9IHN0cmluZ1RvUGF0aChuYW1lKTtcblx0dmFyIGludHJpbnNpY0Jhc2VOYW1lID0gcGFydHMubGVuZ3RoID4gMCA/IHBhcnRzWzBdIDogJyc7XG5cblx0dmFyIGludHJpbnNpYyA9IGdldEJhc2VJbnRyaW5zaWMoJyUnICsgaW50cmluc2ljQmFzZU5hbWUgKyAnJScsIGFsbG93TWlzc2luZyk7XG5cdHZhciBpbnRyaW5zaWNSZWFsTmFtZSA9IGludHJpbnNpYy5uYW1lO1xuXHR2YXIgdmFsdWUgPSBpbnRyaW5zaWMudmFsdWU7XG5cdHZhciBza2lwRnVydGhlckNhY2hpbmcgPSBmYWxzZTtcblxuXHR2YXIgYWxpYXMgPSBpbnRyaW5zaWMuYWxpYXM7XG5cdGlmIChhbGlhcykge1xuXHRcdGludHJpbnNpY0Jhc2VOYW1lID0gYWxpYXNbMF07XG5cdFx0JHNwbGljZUFwcGx5KHBhcnRzLCAkY29uY2F0KFswLCAxXSwgYWxpYXMpKTtcblx0fVxuXG5cdGZvciAodmFyIGkgPSAxLCBpc093biA9IHRydWU7IGkgPCBwYXJ0cy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdHZhciBwYXJ0ID0gcGFydHNbaV07XG5cdFx0dmFyIGZpcnN0ID0gJHN0clNsaWNlKHBhcnQsIDAsIDEpO1xuXHRcdHZhciBsYXN0ID0gJHN0clNsaWNlKHBhcnQsIC0xKTtcblx0XHRpZiAoXG5cdFx0XHQoXG5cdFx0XHRcdChmaXJzdCA9PT0gJ1wiJyB8fCBmaXJzdCA9PT0gXCInXCIgfHwgZmlyc3QgPT09ICdgJylcblx0XHRcdFx0fHwgKGxhc3QgPT09ICdcIicgfHwgbGFzdCA9PT0gXCInXCIgfHwgbGFzdCA9PT0gJ2AnKVxuXHRcdFx0KVxuXHRcdFx0JiYgZmlyc3QgIT09IGxhc3Rcblx0XHQpIHtcblx0XHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ3Byb3BlcnR5IG5hbWVzIHdpdGggcXVvdGVzIG11c3QgaGF2ZSBtYXRjaGluZyBxdW90ZXMnKTtcblx0XHR9XG5cdFx0aWYgKHBhcnQgPT09ICdjb25zdHJ1Y3RvcicgfHwgIWlzT3duKSB7XG5cdFx0XHRza2lwRnVydGhlckNhY2hpbmcgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGludHJpbnNpY0Jhc2VOYW1lICs9ICcuJyArIHBhcnQ7XG5cdFx0aW50cmluc2ljUmVhbE5hbWUgPSAnJScgKyBpbnRyaW5zaWNCYXNlTmFtZSArICclJztcblxuXHRcdGlmIChoYXNPd24oSU5UUklOU0lDUywgaW50cmluc2ljUmVhbE5hbWUpKSB7XG5cdFx0XHR2YWx1ZSA9IElOVFJJTlNJQ1NbaW50cmluc2ljUmVhbE5hbWVdO1xuXHRcdH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuXHRcdFx0aWYgKCEocGFydCBpbiB2YWx1ZSkpIHtcblx0XHRcdFx0aWYgKCFhbGxvd01pc3NpbmcpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignYmFzZSBpbnRyaW5zaWMgZm9yICcgKyBuYW1lICsgJyBleGlzdHMsIGJ1dCB0aGUgcHJvcGVydHkgaXMgbm90IGF2YWlsYWJsZS4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdm9pZCB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cdFx0XHRpZiAoJGdPUEQgJiYgKGkgKyAxKSA+PSBwYXJ0cy5sZW5ndGgpIHtcblx0XHRcdFx0dmFyIGRlc2MgPSAkZ09QRCh2YWx1ZSwgcGFydCk7XG5cdFx0XHRcdGlzT3duID0gISFkZXNjO1xuXG5cdFx0XHRcdC8vIEJ5IGNvbnZlbnRpb24sIHdoZW4gYSBkYXRhIHByb3BlcnR5IGlzIGNvbnZlcnRlZCB0byBhbiBhY2Nlc3NvclxuXHRcdFx0XHQvLyBwcm9wZXJ0eSB0byBlbXVsYXRlIGEgZGF0YSBwcm9wZXJ0eSB0aGF0IGRvZXMgbm90IHN1ZmZlciBmcm9tXG5cdFx0XHRcdC8vIHRoZSBvdmVycmlkZSBtaXN0YWtlLCB0aGF0IGFjY2Vzc29yJ3MgZ2V0dGVyIGlzIG1hcmtlZCB3aXRoXG5cdFx0XHRcdC8vIGFuIGBvcmlnaW5hbFZhbHVlYCBwcm9wZXJ0eS4gSGVyZSwgd2hlbiB3ZSBkZXRlY3QgdGhpcywgd2Vcblx0XHRcdFx0Ly8gdXBob2xkIHRoZSBpbGx1c2lvbiBieSBwcmV0ZW5kaW5nIHRvIHNlZSB0aGF0IG9yaWdpbmFsIGRhdGFcblx0XHRcdFx0Ly8gcHJvcGVydHksIGkuZS4sIHJldHVybmluZyB0aGUgdmFsdWUgcmF0aGVyIHRoYW4gdGhlIGdldHRlclxuXHRcdFx0XHQvLyBpdHNlbGYuXG5cdFx0XHRcdGlmIChpc093biAmJiAnZ2V0JyBpbiBkZXNjICYmICEoJ29yaWdpbmFsVmFsdWUnIGluIGRlc2MuZ2V0KSkge1xuXHRcdFx0XHRcdHZhbHVlID0gZGVzYy5nZXQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFsdWUgPSB2YWx1ZVtwYXJ0XTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aXNPd24gPSBoYXNPd24odmFsdWUsIHBhcnQpO1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlW3BhcnRdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaXNPd24gJiYgIXNraXBGdXJ0aGVyQ2FjaGluZykge1xuXHRcdFx0XHRJTlRSSU5TSUNTW2ludHJpbnNpY1JlYWxOYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gdmFsdWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgb3JpZ1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbDtcbnZhciBoYXNTeW1ib2xTaGFtID0gcmVxdWlyZSgnLi9zaGFtcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc05hdGl2ZVN5bWJvbHMoKSB7XG5cdGlmICh0eXBlb2Ygb3JpZ1N5bWJvbCAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2Ygb3JpZ1N5bWJvbCgnZm9vJykgIT09ICdzeW1ib2wnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIFN5bWJvbCgnYmFyJykgIT09ICdzeW1ib2wnKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdHJldHVybiBoYXNTeW1ib2xTaGFtKCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBlc2xpbnQgY29tcGxleGl0eTogWzIsIDE4XSwgbWF4LXN0YXRlbWVudHM6IFsyLCAzM10gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFzU3ltYm9scygpIHtcblx0aWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSAnc3ltYm9sJykgeyByZXR1cm4gdHJ1ZTsgfVxuXG5cdHZhciBvYmogPSB7fTtcblx0dmFyIHN5bSA9IFN5bWJvbCgndGVzdCcpO1xuXHR2YXIgc3ltT2JqID0gT2JqZWN0KHN5bSk7XG5cdGlmICh0eXBlb2Ygc3ltID09PSAnc3RyaW5nJykgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN5bSkgIT09ICdbb2JqZWN0IFN5bWJvbF0nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN5bU9iaikgIT09ICdbb2JqZWN0IFN5bWJvbF0nKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdC8vIHRlbXAgZGlzYWJsZWQgcGVyIGh0dHBzOi8vZ2l0aHViLmNvbS9samhhcmIvb2JqZWN0LmFzc2lnbi9pc3N1ZXMvMTdcblx0Ly8gaWYgKHN5bSBpbnN0YW5jZW9mIFN5bWJvbCkgeyByZXR1cm4gZmFsc2U7IH1cblx0Ly8gdGVtcCBkaXNhYmxlZCBwZXIgaHR0cHM6Ly9naXRodWIuY29tL1dlYlJlZmxlY3Rpb24vZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzL2lzc3Vlcy80XG5cdC8vIGlmICghKHN5bU9iaiBpbnN0YW5jZW9mIFN5bWJvbCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0Ly8gaWYgKHR5cGVvZiBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHQvLyBpZiAoU3RyaW5nKHN5bSkgIT09IFN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzeW0pKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdHZhciBzeW1WYWwgPSA0Mjtcblx0b2JqW3N5bV0gPSBzeW1WYWw7XG5cdGZvciAoc3ltIGluIG9iaikgeyByZXR1cm4gZmFsc2U7IH0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheCwgbm8tdW5yZWFjaGFibGUtbG9vcFxuXHRpZiAodHlwZW9mIE9iamVjdC5rZXlzID09PSAnZnVuY3Rpb24nICYmIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoICE9PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgPT09ICdmdW5jdGlvbicgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5sZW5ndGggIT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0dmFyIHN5bXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iaik7XG5cdGlmIChzeW1zLmxlbmd0aCAhPT0gMSB8fCBzeW1zWzBdICE9PSBzeW0pIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKCFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob2JqLCBzeW0pKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIHN5bSk7XG5cdFx0aWYgKGRlc2NyaXB0b3IudmFsdWUgIT09IHN5bVZhbCB8fCBkZXNjcmlwdG9yLmVudW1lcmFibGUgIT09IHRydWUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZuVG9TdHIgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgcmVmbGVjdEFwcGx5ID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnICYmIFJlZmxlY3QgIT09IG51bGwgJiYgUmVmbGVjdC5hcHBseTtcbnZhciBiYWRBcnJheUxpa2U7XG52YXIgaXNDYWxsYWJsZU1hcmtlcjtcbmlmICh0eXBlb2YgcmVmbGVjdEFwcGx5ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBPYmplY3QuZGVmaW5lUHJvcGVydHkgPT09ICdmdW5jdGlvbicpIHtcblx0dHJ5IHtcblx0XHRiYWRBcnJheUxpa2UgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdsZW5ndGgnLCB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dGhyb3cgaXNDYWxsYWJsZU1hcmtlcjtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRpc0NhbGxhYmxlTWFya2VyID0ge307XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXRocm93LWxpdGVyYWxcblx0XHRyZWZsZWN0QXBwbHkoZnVuY3Rpb24gKCkgeyB0aHJvdyA0MjsgfSwgbnVsbCwgYmFkQXJyYXlMaWtlKTtcblx0fSBjYXRjaCAoXykge1xuXHRcdGlmIChfICE9PSBpc0NhbGxhYmxlTWFya2VyKSB7XG5cdFx0XHRyZWZsZWN0QXBwbHkgPSBudWxsO1xuXHRcdH1cblx0fVxufSBlbHNlIHtcblx0cmVmbGVjdEFwcGx5ID0gbnVsbDtcbn1cblxudmFyIGNvbnN0cnVjdG9yUmVnZXggPSAvXlxccypjbGFzc1xcYi87XG52YXIgaXNFUzZDbGFzc0ZuID0gZnVuY3Rpb24gaXNFUzZDbGFzc0Z1bmN0aW9uKHZhbHVlKSB7XG5cdHRyeSB7XG5cdFx0dmFyIGZuU3RyID0gZm5Ub1N0ci5jYWxsKHZhbHVlKTtcblx0XHRyZXR1cm4gY29uc3RydWN0b3JSZWdleC50ZXN0KGZuU3RyKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBmYWxzZTsgLy8gbm90IGEgZnVuY3Rpb25cblx0fVxufTtcblxudmFyIHRyeUZ1bmN0aW9uT2JqZWN0ID0gZnVuY3Rpb24gdHJ5RnVuY3Rpb25Ub1N0cih2YWx1ZSkge1xuXHR0cnkge1xuXHRcdGlmIChpc0VTNkNsYXNzRm4odmFsdWUpKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGZuVG9TdHIuY2FsbCh2YWx1ZSk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn07XG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGZuQ2xhc3MgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xudmFyIGdlbkNsYXNzID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJztcbnZhciBoYXNUb1N0cmluZ1RhZyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCc7XG4vKiBnbG9iYWxzIGRvY3VtZW50OiBmYWxzZSAqL1xudmFyIGRvY3VtZW50RG90QWxsID0gdHlwZW9mIGRvY3VtZW50ID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgZG9jdW1lbnQuYWxsID09PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5hbGwgIT09IHVuZGVmaW5lZCA/IGRvY3VtZW50LmFsbCA6IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZmxlY3RBcHBseVxuXHQ/IGZ1bmN0aW9uIGlzQ2FsbGFibGUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT09IGRvY3VtZW50RG90QWxsKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0aWYgKCF2YWx1ZSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRpZiAodHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiAhdmFsdWUucHJvdG90eXBlKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0dHJ5IHtcblx0XHRcdHJlZmxlY3RBcHBseSh2YWx1ZSwgbnVsbCwgYmFkQXJyYXlMaWtlKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRpZiAoZSAhPT0gaXNDYWxsYWJsZU1hcmtlcikgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9XG5cdFx0cmV0dXJuICFpc0VTNkNsYXNzRm4odmFsdWUpO1xuXHR9XG5cdDogZnVuY3Rpb24gaXNDYWxsYWJsZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PT0gZG9jdW1lbnREb3RBbGwpIHsgcmV0dXJuIHRydWU7IH1cblx0XHRpZiAoIXZhbHVlKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGlmICh0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JykgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nICYmICF2YWx1ZS5wcm90b3R5cGUpIHsgcmV0dXJuIHRydWU7IH1cblx0XHRpZiAoaGFzVG9TdHJpbmdUYWcpIHsgcmV0dXJuIHRyeUZ1bmN0aW9uT2JqZWN0KHZhbHVlKTsgfVxuXHRcdGlmIChpc0VTNkNsYXNzRm4odmFsdWUpKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdHZhciBzdHJDbGFzcyA9IHRvU3RyLmNhbGwodmFsdWUpO1xuXHRcdHJldHVybiBzdHJDbGFzcyA9PT0gZm5DbGFzcyB8fCBzdHJDbGFzcyA9PT0gZ2VuQ2xhc3M7XG5cdH07XG4iLCIvLyAgICAgKGMpIDIwMTItMjAxOCBBaXJibmIsIEluYy5cbi8vXG4vLyAgICAgcG9seWdsb3QuanMgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEJTRFxuLy8gICAgIGxpY2Vuc2UuIEZvciBhbGwgbGljZW5zaW5nIGluZm9ybWF0aW9uLCBkZXRhaWxzLCBhbmQgZG9jdW1lbnRpb246XG4vLyAgICAgaHR0cDovL2FpcmJuYi5naXRodWIuY29tL3BvbHlnbG90LmpzXG4vL1xuLy9cbi8vIFBvbHlnbG90LmpzIGlzIGFuIEkxOG4gaGVscGVyIGxpYnJhcnkgd3JpdHRlbiBpbiBKYXZhU2NyaXB0LCBtYWRlIHRvXG4vLyB3b3JrIGJvdGggaW4gdGhlIGJyb3dzZXIgYW5kIGluIE5vZGUuIEl0IHByb3ZpZGVzIGEgc2ltcGxlIHNvbHV0aW9uIGZvclxuLy8gaW50ZXJwb2xhdGlvbiBhbmQgcGx1cmFsaXphdGlvbiwgYmFzZWQgb2ZmIG9mIEFpcmJuYidzXG4vLyBleHBlcmllbmNlIGFkZGluZyBJMThuIGZ1bmN0aW9uYWxpdHkgdG8gaXRzIEJhY2tib25lLmpzIGFuZCBOb2RlIGFwcHMuXG4vL1xuLy8gUG9seWxnbG90IGlzIGFnbm9zdGljIHRvIHlvdXIgdHJhbnNsYXRpb24gYmFja2VuZC4gSXQgZG9lc24ndCBwZXJmb3JtIGFueVxuLy8gdHJhbnNsYXRpb247IGl0IHNpbXBseSBnaXZlcyB5b3UgYSB3YXkgdG8gbWFuYWdlIHRyYW5zbGF0ZWQgcGhyYXNlcyBmcm9tXG4vLyB5b3VyIGNsaWVudC0gb3Igc2VydmVyLXNpZGUgSmF2YVNjcmlwdCBhcHBsaWNhdGlvbi5cbi8vXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGZvckVhY2ggPSByZXF1aXJlKCdmb3ItZWFjaCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnaGFzJyk7XG52YXIgdHJpbSA9IHJlcXVpcmUoJ3N0cmluZy5wcm90b3R5cGUudHJpbScpO1xuXG52YXIgd2FybiA9IGZ1bmN0aW9uIHdhcm4obWVzc2FnZSkge1xuICB3YXJuaW5nKGZhbHNlLCBtZXNzYWdlKTtcbn07XG5cbnZhciByZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xudmFyIHNwbGl0ID0gU3RyaW5nLnByb3RvdHlwZS5zcGxpdDtcblxuLy8gIyMjIyBQbHVyYWxpemF0aW9uIG1ldGhvZHNcbi8vIFRoZSBzdHJpbmcgdGhhdCBzZXBhcmF0ZXMgdGhlIGRpZmZlcmVudCBwaHJhc2UgcG9zc2liaWxpdGllcy5cbnZhciBkZWxpbWl0ZXIgPSAnfHx8fCc7XG5cbnZhciBydXNzaWFuUGx1cmFsR3JvdXBzID0gZnVuY3Rpb24gKG4pIHtcbiAgdmFyIGxhc3RUd28gPSBuICUgMTAwO1xuICB2YXIgZW5kID0gbGFzdFR3byAlIDEwO1xuICBpZiAobGFzdFR3byAhPT0gMTEgJiYgZW5kID09PSAxKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgaWYgKDIgPD0gZW5kICYmIGVuZCA8PSA0ICYmICEobGFzdFR3byA+PSAxMiAmJiBsYXN0VHdvIDw9IDE0KSkge1xuICAgIHJldHVybiAxO1xuICB9XG4gIHJldHVybiAyO1xufTtcblxudmFyIGRlZmF1bHRQbHVyYWxSdWxlcyA9IHtcbiAgLy8gTWFwcGluZyBmcm9tIHBsdXJhbGl6YXRpb24gZ3JvdXAgcGx1cmFsIGxvZ2ljLlxuICBwbHVyYWxUeXBlczoge1xuICAgIGFyYWJpYzogZnVuY3Rpb24gKG4pIHtcbiAgICAgIC8vIGh0dHA6Ly93d3cuYXJhYmV5ZXMub3JnL1BsdXJhbF9Gb3Jtc1xuICAgICAgaWYgKG4gPCAzKSB7IHJldHVybiBuOyB9XG4gICAgICB2YXIgbGFzdFR3byA9IG4gJSAxMDA7XG4gICAgICBpZiAobGFzdFR3byA+PSAzICYmIGxhc3RUd28gPD0gMTApIHJldHVybiAzO1xuICAgICAgcmV0dXJuIGxhc3RUd28gPj0gMTEgPyA0IDogNTtcbiAgICB9LFxuICAgIGJvc25pYW5fc2VyYmlhbjogcnVzc2lhblBsdXJhbEdyb3VwcyxcbiAgICBjaGluZXNlOiBmdW5jdGlvbiAoKSB7IHJldHVybiAwOyB9LFxuICAgIGNyb2F0aWFuOiBydXNzaWFuUGx1cmFsR3JvdXBzLFxuICAgIGZyZW5jaDogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4gPiAxID8gMSA6IDA7IH0sXG4gICAgZ2VybWFuOiBmdW5jdGlvbiAobikgeyByZXR1cm4gbiAhPT0gMSA/IDEgOiAwOyB9LFxuICAgIHJ1c3NpYW46IHJ1c3NpYW5QbHVyYWxHcm91cHMsXG4gICAgbGl0aHVhbmlhbjogZnVuY3Rpb24gKG4pIHtcbiAgICAgIGlmIChuICUgMTAgPT09IDEgJiYgbiAlIDEwMCAhPT0gMTEpIHsgcmV0dXJuIDA7IH1cbiAgICAgIHJldHVybiBuICUgMTAgPj0gMiAmJiBuICUgMTAgPD0gOSAmJiAobiAlIDEwMCA8IDExIHx8IG4gJSAxMDAgPiAxOSkgPyAxIDogMjtcbiAgICB9LFxuICAgIGN6ZWNoOiBmdW5jdGlvbiAobikge1xuICAgICAgaWYgKG4gPT09IDEpIHsgcmV0dXJuIDA7IH1cbiAgICAgIHJldHVybiAobiA+PSAyICYmIG4gPD0gNCkgPyAxIDogMjtcbiAgICB9LFxuICAgIHBvbGlzaDogZnVuY3Rpb24gKG4pIHtcbiAgICAgIGlmIChuID09PSAxKSB7IHJldHVybiAwOyB9XG4gICAgICB2YXIgZW5kID0gbiAlIDEwO1xuICAgICAgcmV0dXJuIDIgPD0gZW5kICYmIGVuZCA8PSA0ICYmIChuICUgMTAwIDwgMTAgfHwgbiAlIDEwMCA+PSAyMCkgPyAxIDogMjtcbiAgICB9LFxuICAgIGljZWxhbmRpYzogZnVuY3Rpb24gKG4pIHsgcmV0dXJuIChuICUgMTAgIT09IDEgfHwgbiAlIDEwMCA9PT0gMTEpID8gMSA6IDA7IH0sXG4gICAgc2xvdmVuaWFuOiBmdW5jdGlvbiAobikge1xuICAgICAgdmFyIGxhc3RUd28gPSBuICUgMTAwO1xuICAgICAgaWYgKGxhc3RUd28gPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICBpZiAobGFzdFR3byA9PT0gMikge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIGlmIChsYXN0VHdvID09PSAzIHx8IGxhc3RUd28gPT09IDQpIHtcbiAgICAgICAgcmV0dXJuIDI7XG4gICAgICB9XG4gICAgICByZXR1cm4gMztcbiAgICB9XG4gIH0sXG5cbiAgLy8gTWFwcGluZyBmcm9tIHBsdXJhbGl6YXRpb24gZ3JvdXAgdG8gaW5kaXZpZHVhbCBsYW5ndWFnZSBjb2Rlcy9sb2NhbGVzLlxuICAvLyBXaWxsIGxvb2sgdXAgYmFzZWQgb24gZXhhY3QgbWF0Y2gsIGlmIG5vdCBmb3VuZCBhbmQgaXQncyBhIGxvY2FsZSB3aWxsIHBhcnNlIHRoZSBsb2NhbGVcbiAgLy8gZm9yIGxhbmd1YWdlIGNvZGUsIGFuZCBpZiB0aGF0IGRvZXMgbm90IGV4aXN0IHdpbGwgZGVmYXVsdCB0byAnZW4nXG4gIHBsdXJhbFR5cGVUb0xhbmd1YWdlczoge1xuICAgIGFyYWJpYzogWydhciddLFxuICAgIGJvc25pYW5fc2VyYmlhbjogWydicy1MYXRuLUJBJywgJ2JzLUN5cmwtQkEnLCAnc3JsLVJTJywgJ3NyLVJTJ10sXG4gICAgY2hpbmVzZTogWydpZCcsICdpZC1JRCcsICdqYScsICdrbycsICdrby1LUicsICdsbycsICdtcycsICd0aCcsICd0aC1USCcsICd6aCddLFxuICAgIGNyb2F0aWFuOiBbJ2hyJywgJ2hyLUhSJ10sXG4gICAgZ2VybWFuOiBbJ2ZhJywgJ2RhJywgJ2RlJywgJ2VuJywgJ2VzJywgJ2ZpJywgJ2VsJywgJ2hlJywgJ2hpLUlOJywgJ2h1JywgJ2h1LUhVJywgJ2l0JywgJ25sJywgJ25vJywgJ3B0JywgJ3N2JywgJ3RyJ10sXG4gICAgZnJlbmNoOiBbJ2ZyJywgJ3RsJywgJ3B0LWJyJ10sXG4gICAgcnVzc2lhbjogWydydScsICdydS1SVSddLFxuICAgIGxpdGh1YW5pYW46IFsnbHQnXSxcbiAgICBjemVjaDogWydjcycsICdjcy1DWicsICdzayddLFxuICAgIHBvbGlzaDogWydwbCddLFxuICAgIGljZWxhbmRpYzogWydpcyddLFxuICAgIHNsb3ZlbmlhbjogWydzbC1TTCddXG4gIH1cbn07XG5cbmZ1bmN0aW9uIGxhbmdUb1R5cGVNYXAobWFwcGluZykge1xuICB2YXIgcmV0ID0ge307XG4gIGZvckVhY2gobWFwcGluZywgZnVuY3Rpb24gKGxhbmdzLCB0eXBlKSB7XG4gICAgZm9yRWFjaChsYW5ncywgZnVuY3Rpb24gKGxhbmcpIHtcbiAgICAgIHJldFtsYW5nXSA9IHR5cGU7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBwbHVyYWxUeXBlTmFtZShwbHVyYWxSdWxlcywgbG9jYWxlKSB7XG4gIHZhciBsYW5nVG9QbHVyYWxUeXBlID0gbGFuZ1RvVHlwZU1hcChwbHVyYWxSdWxlcy5wbHVyYWxUeXBlVG9MYW5ndWFnZXMpO1xuICByZXR1cm4gbGFuZ1RvUGx1cmFsVHlwZVtsb2NhbGVdXG4gICAgfHwgbGFuZ1RvUGx1cmFsVHlwZVtzcGxpdC5jYWxsKGxvY2FsZSwgLy0vLCAxKVswXV1cbiAgICB8fCBsYW5nVG9QbHVyYWxUeXBlLmVuO1xufVxuXG5mdW5jdGlvbiBwbHVyYWxUeXBlSW5kZXgocGx1cmFsUnVsZXMsIGxvY2FsZSwgY291bnQpIHtcbiAgcmV0dXJuIHBsdXJhbFJ1bGVzLnBsdXJhbFR5cGVzW3BsdXJhbFR5cGVOYW1lKHBsdXJhbFJ1bGVzLCBsb2NhbGUpXShjb3VudCk7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZSh0b2tlbikge1xuICByZXR1cm4gdG9rZW4ucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0VG9rZW5SZWdleChvcHRzKSB7XG4gIHZhciBwcmVmaXggPSAob3B0cyAmJiBvcHRzLnByZWZpeCkgfHwgJyV7JztcbiAgdmFyIHN1ZmZpeCA9IChvcHRzICYmIG9wdHMuc3VmZml4KSB8fCAnfSc7XG5cbiAgaWYgKHByZWZpeCA9PT0gZGVsaW1pdGVyIHx8IHN1ZmZpeCA9PT0gZGVsaW1pdGVyKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wiJyArIGRlbGltaXRlciArICdcIiB0b2tlbiBpcyByZXNlcnZlZCBmb3IgcGx1cmFsaXphdGlvbicpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBSZWdFeHAoZXNjYXBlKHByZWZpeCkgKyAnKC4qPyknICsgZXNjYXBlKHN1ZmZpeCksICdnJyk7XG59XG5cbnZhciBkZWZhdWx0VG9rZW5SZWdleCA9IC8lXFx7KC4qPylcXH0vZztcblxuLy8gIyMjIHRyYW5zZm9ybVBocmFzZShwaHJhc2UsIHN1YnN0aXR1dGlvbnMsIGxvY2FsZSlcbi8vXG4vLyBUYWtlcyBhIHBocmFzZSBzdHJpbmcgYW5kIHRyYW5zZm9ybXMgaXQgYnkgY2hvb3NpbmcgdGhlIGNvcnJlY3Rcbi8vIHBsdXJhbCBmb3JtIGFuZCBpbnRlcnBvbGF0aW5nIGl0LlxuLy9cbi8vICAgICB0cmFuc2Zvcm1QaHJhc2UoJ0hlbGxvLCAle25hbWV9IScsIHtuYW1lOiAnU3Bpa2UnfSk7XG4vLyAgICAgLy8gXCJIZWxsbywgU3Bpa2UhXCJcbi8vXG4vLyBUaGUgY29ycmVjdCBwbHVyYWwgZm9ybSBpcyBzZWxlY3RlZCBpZiBzdWJzdGl0dXRpb25zLnNtYXJ0X2NvdW50XG4vLyBpcyBzZXQuIFlvdSBjYW4gcGFzcyBpbiBhIG51bWJlciBpbnN0ZWFkIG9mIGFuIE9iamVjdCBhcyBgc3Vic3RpdHV0aW9uc2Bcbi8vIGFzIGEgc2hvcnRjdXQgZm9yIGBzbWFydF9jb3VudGAuXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnJXtzbWFydF9jb3VudH0gbmV3IG1lc3NhZ2VzIHx8fHwgMSBuZXcgbWVzc2FnZScsIHtzbWFydF9jb3VudDogMX0sICdlbicpO1xuLy8gICAgIC8vIFwiMSBuZXcgbWVzc2FnZVwiXG4vL1xuLy8gICAgIHRyYW5zZm9ybVBocmFzZSgnJXtzbWFydF9jb3VudH0gbmV3IG1lc3NhZ2VzIHx8fHwgMSBuZXcgbWVzc2FnZScsIHtzbWFydF9jb3VudDogMn0sICdlbicpO1xuLy8gICAgIC8vIFwiMiBuZXcgbWVzc2FnZXNcIlxuLy9cbi8vICAgICB0cmFuc2Zvcm1QaHJhc2UoJyV7c21hcnRfY291bnR9IG5ldyBtZXNzYWdlcyB8fHx8IDEgbmV3IG1lc3NhZ2UnLCA1LCAnZW4nKTtcbi8vICAgICAvLyBcIjUgbmV3IG1lc3NhZ2VzXCJcbi8vXG4vLyBZb3Ugc2hvdWxkIHBhc3MgaW4gYSB0aGlyZCBhcmd1bWVudCwgdGhlIGxvY2FsZSwgdG8gc3BlY2lmeSB0aGUgY29ycmVjdCBwbHVyYWwgdHlwZS5cbi8vIEl0IGRlZmF1bHRzIHRvIGAnZW4nYCB3aXRoIDIgcGx1cmFsIGZvcm1zLlxuZnVuY3Rpb24gdHJhbnNmb3JtUGhyYXNlKHBocmFzZSwgc3Vic3RpdHV0aW9ucywgbG9jYWxlLCB0b2tlblJlZ2V4LCBwbHVyYWxSdWxlcykge1xuICBpZiAodHlwZW9mIHBocmFzZSAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQb2x5Z2xvdC50cmFuc2Zvcm1QaHJhc2UgZXhwZWN0cyBhcmd1bWVudCAjMSB0byBiZSBzdHJpbmcnKTtcbiAgfVxuXG4gIGlmIChzdWJzdGl0dXRpb25zID09IG51bGwpIHtcbiAgICByZXR1cm4gcGhyYXNlO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9IHBocmFzZTtcbiAgdmFyIGludGVycG9sYXRpb25SZWdleCA9IHRva2VuUmVnZXggfHwgZGVmYXVsdFRva2VuUmVnZXg7XG4gIHZhciBwbHVyYWxSdWxlc09yRGVmYXVsdCA9IHBsdXJhbFJ1bGVzIHx8IGRlZmF1bHRQbHVyYWxSdWxlcztcblxuICAvLyBhbGxvdyBudW1iZXIgYXMgYSBwbHVyYWxpemF0aW9uIHNob3J0Y3V0XG4gIHZhciBvcHRpb25zID0gdHlwZW9mIHN1YnN0aXR1dGlvbnMgPT09ICdudW1iZXInID8geyBzbWFydF9jb3VudDogc3Vic3RpdHV0aW9ucyB9IDogc3Vic3RpdHV0aW9ucztcblxuICAvLyBTZWxlY3QgcGx1cmFsIGZvcm06IGJhc2VkIG9uIGEgcGhyYXNlIHRleHQgdGhhdCBjb250YWlucyBgbmBcbiAgLy8gcGx1cmFsIGZvcm1zIHNlcGFyYXRlZCBieSBgZGVsaW1pdGVyYCwgYSBgbG9jYWxlYCwgYW5kIGEgYHN1YnN0aXR1dGlvbnMuc21hcnRfY291bnRgLFxuICAvLyBjaG9vc2UgdGhlIGNvcnJlY3QgcGx1cmFsIGZvcm0uIFRoaXMgaXMgb25seSBkb25lIGlmIGBjb3VudGAgaXMgc2V0LlxuICBpZiAob3B0aW9ucy5zbWFydF9jb3VudCAhPSBudWxsICYmIHJlc3VsdCkge1xuICAgIHZhciB0ZXh0cyA9IHNwbGl0LmNhbGwocmVzdWx0LCBkZWxpbWl0ZXIpO1xuICAgIHJlc3VsdCA9IHRyaW0odGV4dHNbcGx1cmFsVHlwZUluZGV4KHBsdXJhbFJ1bGVzT3JEZWZhdWx0LCBsb2NhbGUgfHwgJ2VuJywgb3B0aW9ucy5zbWFydF9jb3VudCldIHx8IHRleHRzWzBdKTtcbiAgfVxuXG4gIC8vIEludGVycG9sYXRlOiBDcmVhdGVzIGEgYFJlZ0V4cGAgb2JqZWN0IGZvciBlYWNoIGludGVycG9sYXRpb24gcGxhY2Vob2xkZXIuXG4gIHJlc3VsdCA9IHJlcGxhY2UuY2FsbChyZXN1bHQsIGludGVycG9sYXRpb25SZWdleCwgZnVuY3Rpb24gKGV4cHJlc3Npb24sIGFyZ3VtZW50KSB7XG4gICAgaWYgKCFoYXMob3B0aW9ucywgYXJndW1lbnQpIHx8IG9wdGlvbnNbYXJndW1lbnRdID09IG51bGwpIHsgcmV0dXJuIGV4cHJlc3Npb247IH1cbiAgICByZXR1cm4gb3B0aW9uc1thcmd1bWVudF07XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vICMjIyBQb2x5Z2xvdCBjbGFzcyBjb25zdHJ1Y3RvclxuZnVuY3Rpb24gUG9seWdsb3Qob3B0aW9ucykge1xuICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gIHRoaXMucGhyYXNlcyA9IHt9O1xuICB0aGlzLmV4dGVuZChvcHRzLnBocmFzZXMgfHwge30pO1xuICB0aGlzLmN1cnJlbnRMb2NhbGUgPSBvcHRzLmxvY2FsZSB8fCAnZW4nO1xuICB2YXIgYWxsb3dNaXNzaW5nID0gb3B0cy5hbGxvd01pc3NpbmcgPyB0cmFuc2Zvcm1QaHJhc2UgOiBudWxsO1xuICB0aGlzLm9uTWlzc2luZ0tleSA9IHR5cGVvZiBvcHRzLm9uTWlzc2luZ0tleSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMub25NaXNzaW5nS2V5IDogYWxsb3dNaXNzaW5nO1xuICB0aGlzLndhcm4gPSBvcHRzLndhcm4gfHwgd2FybjtcbiAgdGhpcy50b2tlblJlZ2V4ID0gY29uc3RydWN0VG9rZW5SZWdleChvcHRzLmludGVycG9sYXRpb24pO1xuICB0aGlzLnBsdXJhbFJ1bGVzID0gb3B0cy5wbHVyYWxSdWxlcyB8fCBkZWZhdWx0UGx1cmFsUnVsZXM7XG59XG5cbi8vICMjIyBwb2x5Z2xvdC5sb2NhbGUoW2xvY2FsZV0pXG4vL1xuLy8gR2V0IG9yIHNldCBsb2NhbGUuIEludGVybmFsbHksIFBvbHlnbG90IG9ubHkgdXNlcyBsb2NhbGUgZm9yIHBsdXJhbGl6YXRpb24uXG5Qb2x5Z2xvdC5wcm90b3R5cGUubG9jYWxlID0gZnVuY3Rpb24gKG5ld0xvY2FsZSkge1xuICBpZiAobmV3TG9jYWxlKSB0aGlzLmN1cnJlbnRMb2NhbGUgPSBuZXdMb2NhbGU7XG4gIHJldHVybiB0aGlzLmN1cnJlbnRMb2NhbGU7XG59O1xuXG4vLyAjIyMgcG9seWdsb3QuZXh0ZW5kKHBocmFzZXMpXG4vL1xuLy8gVXNlIGBleHRlbmRgIHRvIHRlbGwgUG9seWdsb3QgaG93IHRvIHRyYW5zbGF0ZSBhIGdpdmVuIGtleS5cbi8vXG4vLyAgICAgcG9seWdsb3QuZXh0ZW5kKHtcbi8vICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgXCJoZWxsb19uYW1lXCI6IFwiSGVsbG8sICV7bmFtZX1cIlxuLy8gICAgIH0pO1xuLy9cbi8vIFRoZSBrZXkgY2FuIGJlIGFueSBzdHJpbmcuICBGZWVsIGZyZWUgdG8gY2FsbCBgZXh0ZW5kYCBtdWx0aXBsZSB0aW1lcztcbi8vIGl0IHdpbGwgb3ZlcnJpZGUgYW55IHBocmFzZXMgd2l0aCB0aGUgc2FtZSBrZXksIGJ1dCBsZWF2ZSBleGlzdGluZyBwaHJhc2VzXG4vLyB1bnRvdWNoZWQuXG4vL1xuLy8gSXQgaXMgYWxzbyBwb3NzaWJsZSB0byBwYXNzIG5lc3RlZCBwaHJhc2Ugb2JqZWN0cywgd2hpY2ggZ2V0IGZsYXR0ZW5lZFxuLy8gaW50byBhbiBvYmplY3Qgd2l0aCB0aGUgbmVzdGVkIGtleXMgY29uY2F0ZW5hdGVkIHVzaW5nIGRvdCBub3RhdGlvbi5cbi8vXG4vLyAgICAgcG9seWdsb3QuZXh0ZW5kKHtcbi8vICAgICAgIFwibmF2XCI6IHtcbi8vICAgICAgICAgXCJoZWxsb1wiOiBcIkhlbGxvXCIsXG4vLyAgICAgICAgIFwiaGVsbG9fbmFtZVwiOiBcIkhlbGxvLCAle25hbWV9XCIsXG4vLyAgICAgICAgIFwic2lkZWJhclwiOiB7XG4vLyAgICAgICAgICAgXCJ3ZWxjb21lXCI6IFwiV2VsY29tZVwiXG4vLyAgICAgICAgIH1cbi8vICAgICAgIH1cbi8vICAgICB9KTtcbi8vXG4vLyAgICAgY29uc29sZS5sb2cocG9seWdsb3QucGhyYXNlcyk7XG4vLyAgICAgLy8ge1xuLy8gICAgIC8vICAgJ25hdi5oZWxsbyc6ICdIZWxsbycsXG4vLyAgICAgLy8gICAnbmF2LmhlbGxvX25hbWUnOiAnSGVsbG8sICV7bmFtZX0nLFxuLy8gICAgIC8vICAgJ25hdi5zaWRlYmFyLndlbGNvbWUnOiAnV2VsY29tZSdcbi8vICAgICAvLyB9XG4vL1xuLy8gYGV4dGVuZGAgYWNjZXB0cyBhbiBvcHRpb25hbCBzZWNvbmQgYXJndW1lbnQsIGBwcmVmaXhgLCB3aGljaCBjYW4gYmUgdXNlZFxuLy8gdG8gcHJlZml4IGV2ZXJ5IGtleSBpbiB0aGUgcGhyYXNlcyBvYmplY3Qgd2l0aCBzb21lIHN0cmluZywgdXNpbmcgZG90XG4vLyBub3RhdGlvbi5cbi8vXG4vLyAgICAgcG9seWdsb3QuZXh0ZW5kKHtcbi8vICAgICAgIFwiaGVsbG9cIjogXCJIZWxsb1wiLFxuLy8gICAgICAgXCJoZWxsb19uYW1lXCI6IFwiSGVsbG8sICV7bmFtZX1cIlxuLy8gICAgIH0sIFwibmF2XCIpO1xuLy9cbi8vICAgICBjb25zb2xlLmxvZyhwb2x5Z2xvdC5waHJhc2VzKTtcbi8vICAgICAvLyB7XG4vLyAgICAgLy8gICAnbmF2LmhlbGxvJzogJ0hlbGxvJyxcbi8vICAgICAvLyAgICduYXYuaGVsbG9fbmFtZSc6ICdIZWxsbywgJXtuYW1lfSdcbi8vICAgICAvLyB9XG4vL1xuLy8gVGhpcyBmZWF0dXJlIGlzIHVzZWQgaW50ZXJuYWxseSB0byBzdXBwb3J0IG5lc3RlZCBwaHJhc2Ugb2JqZWN0cy5cblBvbHlnbG90LnByb3RvdHlwZS5leHRlbmQgPSBmdW5jdGlvbiAobW9yZVBocmFzZXMsIHByZWZpeCkge1xuICBmb3JFYWNoKG1vcmVQaHJhc2VzLCBmdW5jdGlvbiAocGhyYXNlLCBrZXkpIHtcbiAgICB2YXIgcHJlZml4ZWRLZXkgPSBwcmVmaXggPyBwcmVmaXggKyAnLicgKyBrZXkgOiBrZXk7XG4gICAgaWYgKHR5cGVvZiBwaHJhc2UgPT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLmV4dGVuZChwaHJhc2UsIHByZWZpeGVkS2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5waHJhc2VzW3ByZWZpeGVkS2V5XSA9IHBocmFzZTtcbiAgICB9XG4gIH0sIHRoaXMpO1xufTtcblxuLy8gIyMjIHBvbHlnbG90LnVuc2V0KHBocmFzZXMpXG4vLyBVc2UgYHVuc2V0YCB0byBzZWxlY3RpdmVseSByZW1vdmUga2V5cyBmcm9tIGEgcG9seWdsb3QgaW5zdGFuY2UuXG4vL1xuLy8gICAgIHBvbHlnbG90LnVuc2V0KFwic29tZV9rZXlcIik7XG4vLyAgICAgcG9seWdsb3QudW5zZXQoe1xuLy8gICAgICAgXCJoZWxsb1wiOiBcIkhlbGxvXCIsXG4vLyAgICAgICBcImhlbGxvX25hbWVcIjogXCJIZWxsbywgJXtuYW1lfVwiXG4vLyAgICAgfSk7XG4vL1xuLy8gVGhlIHVuc2V0IG1ldGhvZCBjYW4gdGFrZSBlaXRoZXIgYSBzdHJpbmcgKGZvciB0aGUga2V5KSwgb3IgYW4gb2JqZWN0IGhhc2ggd2l0aFxuLy8gdGhlIGtleXMgdGhhdCB5b3Ugd291bGQgbGlrZSB0byB1bnNldC5cblBvbHlnbG90LnByb3RvdHlwZS51bnNldCA9IGZ1bmN0aW9uIChtb3JlUGhyYXNlcywgcHJlZml4KSB7XG4gIGlmICh0eXBlb2YgbW9yZVBocmFzZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgZGVsZXRlIHRoaXMucGhyYXNlc1ttb3JlUGhyYXNlc107XG4gIH0gZWxzZSB7XG4gICAgZm9yRWFjaChtb3JlUGhyYXNlcywgZnVuY3Rpb24gKHBocmFzZSwga2V5KSB7XG4gICAgICB2YXIgcHJlZml4ZWRLZXkgPSBwcmVmaXggPyBwcmVmaXggKyAnLicgKyBrZXkgOiBrZXk7XG4gICAgICBpZiAodHlwZW9mIHBocmFzZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGhpcy51bnNldChwaHJhc2UsIHByZWZpeGVkS2V5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnBocmFzZXNbcHJlZml4ZWRLZXldO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuICB9XG59O1xuXG4vLyAjIyMgcG9seWdsb3QuY2xlYXIoKVxuLy9cbi8vIENsZWFycyBhbGwgcGhyYXNlcy4gVXNlZnVsIGZvciBzcGVjaWFsIGNhc2VzLCBzdWNoIGFzIGZyZWVpbmdcbi8vIHVwIG1lbW9yeSBpZiB5b3UgaGF2ZSBsb3RzIG9mIHBocmFzZXMgYnV0IG5vIGxvbmdlciBuZWVkIHRvXG4vLyBwZXJmb3JtIGFueSB0cmFuc2xhdGlvbi4gQWxzbyB1c2VkIGludGVybmFsbHkgYnkgYHJlcGxhY2VgLlxuUG9seWdsb3QucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnBocmFzZXMgPSB7fTtcbn07XG5cbi8vICMjIyBwb2x5Z2xvdC5yZXBsYWNlKHBocmFzZXMpXG4vL1xuLy8gQ29tcGxldGVseSByZXBsYWNlIHRoZSBleGlzdGluZyBwaHJhc2VzIHdpdGggYSBuZXcgc2V0IG9mIHBocmFzZXMuXG4vLyBOb3JtYWxseSwganVzdCB1c2UgYGV4dGVuZGAgdG8gYWRkIG1vcmUgcGhyYXNlcywgYnV0IHVuZGVyIGNlcnRhaW5cbi8vIGNpcmN1bXN0YW5jZXMsIHlvdSBtYXkgd2FudCB0byBtYWtlIHN1cmUgbm8gb2xkIHBocmFzZXMgYXJlIGx5aW5nIGFyb3VuZC5cblBvbHlnbG90LnByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24gKG5ld1BocmFzZXMpIHtcbiAgdGhpcy5jbGVhcigpO1xuICB0aGlzLmV4dGVuZChuZXdQaHJhc2VzKTtcbn07XG5cblxuLy8gIyMjIHBvbHlnbG90LnQoa2V5LCBvcHRpb25zKVxuLy9cbi8vIFRoZSBtb3N0LXVzZWQgbWV0aG9kLiBQcm92aWRlIGEga2V5LCBhbmQgYHRgIHdpbGwgcmV0dXJuIHRoZVxuLy8gcGhyYXNlLlxuLy9cbi8vICAgICBwb2x5Z2xvdC50KFwiaGVsbG9cIik7XG4vLyAgICAgPT4gXCJIZWxsb1wiXG4vL1xuLy8gVGhlIHBocmFzZSB2YWx1ZSBpcyBwcm92aWRlZCBmaXJzdCBieSBhIGNhbGwgdG8gYHBvbHlnbG90LmV4dGVuZCgpYCBvclxuLy8gYHBvbHlnbG90LnJlcGxhY2UoKWAuXG4vL1xuLy8gUGFzcyBpbiBhbiBvYmplY3QgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byBwZXJmb3JtIGludGVycG9sYXRpb24uXG4vL1xuLy8gICAgIHBvbHlnbG90LnQoXCJoZWxsb19uYW1lXCIsIHtuYW1lOiBcIlNwaWtlXCJ9KTtcbi8vICAgICA9PiBcIkhlbGxvLCBTcGlrZVwiXG4vL1xuLy8gSWYgeW91IGxpa2UsIHlvdSBjYW4gcHJvdmlkZSBhIGRlZmF1bHQgdmFsdWUgaW4gY2FzZSB0aGUgcGhyYXNlIGlzIG1pc3NpbmcuXG4vLyBVc2UgdGhlIHNwZWNpYWwgb3B0aW9uIGtleSBcIl9cIiB0byBzcGVjaWZ5IGEgZGVmYXVsdC5cbi8vXG4vLyAgICAgcG9seWdsb3QudChcImlfbGlrZV90b193cml0ZV9pbl9sYW5ndWFnZVwiLCB7XG4vLyAgICAgICBfOiBcIkkgbGlrZSB0byB3cml0ZSBpbiAle2xhbmd1YWdlfS5cIixcbi8vICAgICAgIGxhbmd1YWdlOiBcIkphdmFTY3JpcHRcIlxuLy8gICAgIH0pO1xuLy8gICAgID0+IFwiSSBsaWtlIHRvIHdyaXRlIGluIEphdmFTY3JpcHQuXCJcbi8vXG5Qb2x5Z2xvdC5wcm90b3R5cGUudCA9IGZ1bmN0aW9uIChrZXksIG9wdGlvbnMpIHtcbiAgdmFyIHBocmFzZSwgcmVzdWx0O1xuICB2YXIgb3B0cyA9IG9wdGlvbnMgPT0gbnVsbCA/IHt9IDogb3B0aW9ucztcbiAgaWYgKHR5cGVvZiB0aGlzLnBocmFzZXNba2V5XSA9PT0gJ3N0cmluZycpIHtcbiAgICBwaHJhc2UgPSB0aGlzLnBocmFzZXNba2V5XTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0cy5fID09PSAnc3RyaW5nJykge1xuICAgIHBocmFzZSA9IG9wdHMuXztcbiAgfSBlbHNlIGlmICh0aGlzLm9uTWlzc2luZ0tleSkge1xuICAgIHZhciBvbk1pc3NpbmdLZXkgPSB0aGlzLm9uTWlzc2luZ0tleTtcbiAgICByZXN1bHQgPSBvbk1pc3NpbmdLZXkoa2V5LCBvcHRzLCB0aGlzLmN1cnJlbnRMb2NhbGUsIHRoaXMudG9rZW5SZWdleCwgdGhpcy5wbHVyYWxSdWxlcyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy53YXJuKCdNaXNzaW5nIHRyYW5zbGF0aW9uIGZvciBrZXk6IFwiJyArIGtleSArICdcIicpO1xuICAgIHJlc3VsdCA9IGtleTtcbiAgfVxuICBpZiAodHlwZW9mIHBocmFzZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXN1bHQgPSB0cmFuc2Zvcm1QaHJhc2UocGhyYXNlLCBvcHRzLCB0aGlzLmN1cnJlbnRMb2NhbGUsIHRoaXMudG9rZW5SZWdleCwgdGhpcy5wbHVyYWxSdWxlcyk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLy8gIyMjIHBvbHlnbG90LmhhcyhrZXkpXG4vL1xuLy8gQ2hlY2sgaWYgcG9seWdsb3QgaGFzIGEgdHJhbnNsYXRpb24gZm9yIGdpdmVuIGtleVxuUG9seWdsb3QucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIGhhcyh0aGlzLnBocmFzZXMsIGtleSk7XG59O1xuXG4vLyBleHBvcnQgdHJhbnNmb3JtUGhyYXNlXG5Qb2x5Z2xvdC50cmFuc2Zvcm1QaHJhc2UgPSBmdW5jdGlvbiB0cmFuc2Zvcm0ocGhyYXNlLCBzdWJzdGl0dXRpb25zLCBsb2NhbGUpIHtcbiAgcmV0dXJuIHRyYW5zZm9ybVBocmFzZShwaHJhc2UsIHN1YnN0aXR1dGlvbnMsIGxvY2FsZSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvbHlnbG90O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5c1NoaW07XG5pZiAoIU9iamVjdC5rZXlzKSB7XG5cdC8vIG1vZGlmaWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2VzLXNoaW1zL2VzNS1zaGltXG5cdHZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXHR2YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXHR2YXIgaXNBcmdzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGdsb2JhbC1yZXF1aXJlXG5cdHZhciBpc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXHR2YXIgaGFzRG9udEVudW1CdWcgPSAhaXNFbnVtZXJhYmxlLmNhbGwoeyB0b1N0cmluZzogbnVsbCB9LCAndG9TdHJpbmcnKTtcblx0dmFyIGhhc1Byb3RvRW51bUJ1ZyA9IGlzRW51bWVyYWJsZS5jYWxsKGZ1bmN0aW9uICgpIHt9LCAncHJvdG90eXBlJyk7XG5cdHZhciBkb250RW51bXMgPSBbXG5cdFx0J3RvU3RyaW5nJyxcblx0XHQndG9Mb2NhbGVTdHJpbmcnLFxuXHRcdCd2YWx1ZU9mJyxcblx0XHQnaGFzT3duUHJvcGVydHknLFxuXHRcdCdpc1Byb3RvdHlwZU9mJyxcblx0XHQncHJvcGVydHlJc0VudW1lcmFibGUnLFxuXHRcdCdjb25zdHJ1Y3Rvcidcblx0XTtcblx0dmFyIGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlID0gZnVuY3Rpb24gKG8pIHtcblx0XHR2YXIgY3RvciA9IG8uY29uc3RydWN0b3I7XG5cdFx0cmV0dXJuIGN0b3IgJiYgY3Rvci5wcm90b3R5cGUgPT09IG87XG5cdH07XG5cdHZhciBleGNsdWRlZEtleXMgPSB7XG5cdFx0JGFwcGxpY2F0aW9uQ2FjaGU6IHRydWUsXG5cdFx0JGNvbnNvbGU6IHRydWUsXG5cdFx0JGV4dGVybmFsOiB0cnVlLFxuXHRcdCRmcmFtZTogdHJ1ZSxcblx0XHQkZnJhbWVFbGVtZW50OiB0cnVlLFxuXHRcdCRmcmFtZXM6IHRydWUsXG5cdFx0JGlubmVySGVpZ2h0OiB0cnVlLFxuXHRcdCRpbm5lcldpZHRoOiB0cnVlLFxuXHRcdCRvbm1vemZ1bGxzY3JlZW5jaGFuZ2U6IHRydWUsXG5cdFx0JG9ubW96ZnVsbHNjcmVlbmVycm9yOiB0cnVlLFxuXHRcdCRvdXRlckhlaWdodDogdHJ1ZSxcblx0XHQkb3V0ZXJXaWR0aDogdHJ1ZSxcblx0XHQkcGFnZVhPZmZzZXQ6IHRydWUsXG5cdFx0JHBhZ2VZT2Zmc2V0OiB0cnVlLFxuXHRcdCRwYXJlbnQ6IHRydWUsXG5cdFx0JHNjcm9sbExlZnQ6IHRydWUsXG5cdFx0JHNjcm9sbFRvcDogdHJ1ZSxcblx0XHQkc2Nyb2xsWDogdHJ1ZSxcblx0XHQkc2Nyb2xsWTogdHJ1ZSxcblx0XHQkc2VsZjogdHJ1ZSxcblx0XHQkd2Via2l0SW5kZXhlZERCOiB0cnVlLFxuXHRcdCR3ZWJraXRTdG9yYWdlSW5mbzogdHJ1ZSxcblx0XHQkd2luZG93OiB0cnVlXG5cdH07XG5cdHZhciBoYXNBdXRvbWF0aW9uRXF1YWxpdHlCdWcgPSAoZnVuY3Rpb24gKCkge1xuXHRcdC8qIGdsb2JhbCB3aW5kb3cgKi9cblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0Zm9yICh2YXIgayBpbiB3aW5kb3cpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGlmICghZXhjbHVkZWRLZXlzWyckJyArIGtdICYmIGhhcy5jYWxsKHdpbmRvdywgaykgJiYgd2luZG93W2tdICE9PSBudWxsICYmIHR5cGVvZiB3aW5kb3dba10gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlKHdpbmRvd1trXSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0oKSk7XG5cdHZhciBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZUlmTm90QnVnZ3kgPSBmdW5jdGlvbiAobykge1xuXHRcdC8qIGdsb2JhbCB3aW5kb3cgKi9cblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgIWhhc0F1dG9tYXRpb25FcXVhbGl0eUJ1Zykge1xuXHRcdFx0cmV0dXJuIGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlKG8pO1xuXHRcdH1cblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlKG8pO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH07XG5cblx0a2V5c1NoaW0gPSBmdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuXHRcdHZhciBpc09iamVjdCA9IG9iamVjdCAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0Jztcblx0XHR2YXIgaXNGdW5jdGlvbiA9IHRvU3RyLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblx0XHR2YXIgaXNBcmd1bWVudHMgPSBpc0FyZ3Mob2JqZWN0KTtcblx0XHR2YXIgaXNTdHJpbmcgPSBpc09iamVjdCAmJiB0b1N0ci5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xuXHRcdHZhciB0aGVLZXlzID0gW107XG5cblx0XHRpZiAoIWlzT2JqZWN0ICYmICFpc0Z1bmN0aW9uICYmICFpc0FyZ3VtZW50cykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmtleXMgY2FsbGVkIG9uIGEgbm9uLW9iamVjdCcpO1xuXHRcdH1cblxuXHRcdHZhciBza2lwUHJvdG8gPSBoYXNQcm90b0VudW1CdWcgJiYgaXNGdW5jdGlvbjtcblx0XHRpZiAoaXNTdHJpbmcgJiYgb2JqZWN0Lmxlbmd0aCA+IDAgJiYgIWhhcy5jYWxsKG9iamVjdCwgMCkpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0Lmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdHRoZUtleXMucHVzaChTdHJpbmcoaSkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChpc0FyZ3VtZW50cyAmJiBvYmplY3QubGVuZ3RoID4gMCkge1xuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBvYmplY3QubGVuZ3RoOyArK2opIHtcblx0XHRcdFx0dGhlS2V5cy5wdXNoKFN0cmluZyhqKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvciAodmFyIG5hbWUgaW4gb2JqZWN0KSB7XG5cdFx0XHRcdGlmICghKHNraXBQcm90byAmJiBuYW1lID09PSAncHJvdG90eXBlJykgJiYgaGFzLmNhbGwob2JqZWN0LCBuYW1lKSkge1xuXHRcdFx0XHRcdHRoZUtleXMucHVzaChTdHJpbmcobmFtZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGhhc0RvbnRFbnVtQnVnKSB7XG5cdFx0XHR2YXIgc2tpcENvbnN0cnVjdG9yID0gZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGVJZk5vdEJ1Z2d5KG9iamVjdCk7XG5cblx0XHRcdGZvciAodmFyIGsgPSAwOyBrIDwgZG9udEVudW1zLmxlbmd0aDsgKytrKSB7XG5cdFx0XHRcdGlmICghKHNraXBDb25zdHJ1Y3RvciAmJiBkb250RW51bXNba10gPT09ICdjb25zdHJ1Y3RvcicpICYmIGhhcy5jYWxsKG9iamVjdCwgZG9udEVudW1zW2tdKSkge1xuXHRcdFx0XHRcdHRoZUtleXMucHVzaChkb250RW51bXNba10pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGVLZXlzO1xuXHR9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBrZXlzU2hpbTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIGlzQXJncyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKTtcblxudmFyIG9yaWdLZXlzID0gT2JqZWN0LmtleXM7XG52YXIga2V5c1NoaW0gPSBvcmlnS2V5cyA/IGZ1bmN0aW9uIGtleXMobykgeyByZXR1cm4gb3JpZ0tleXMobyk7IH0gOiByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbnZhciBvcmlnaW5hbEtleXMgPSBPYmplY3Qua2V5cztcblxua2V5c1NoaW0uc2hpbSA9IGZ1bmN0aW9uIHNoaW1PYmplY3RLZXlzKCkge1xuXHRpZiAoT2JqZWN0LmtleXMpIHtcblx0XHR2YXIga2V5c1dvcmtzV2l0aEFyZ3VtZW50cyA9IChmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBTYWZhcmkgNS4wIGJ1Z1xuXHRcdFx0dmFyIGFyZ3MgPSBPYmplY3Qua2V5cyhhcmd1bWVudHMpO1xuXHRcdFx0cmV0dXJuIGFyZ3MgJiYgYXJncy5sZW5ndGggPT09IGFyZ3VtZW50cy5sZW5ndGg7XG5cdFx0fSgxLCAyKSk7XG5cdFx0aWYgKCFrZXlzV29ya3NXaXRoQXJndW1lbnRzKSB7XG5cdFx0XHRPYmplY3Qua2V5cyA9IGZ1bmN0aW9uIGtleXMob2JqZWN0KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG5cdFx0XHRcdGlmIChpc0FyZ3Mob2JqZWN0KSkge1xuXHRcdFx0XHRcdHJldHVybiBvcmlnaW5hbEtleXMoc2xpY2UuY2FsbChvYmplY3QpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gb3JpZ2luYWxLZXlzKG9iamVjdCk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRPYmplY3Qua2V5cyA9IGtleXNTaGltO1xuXHR9XG5cdHJldHVybiBPYmplY3Qua2V5cyB8fCBrZXlzU2hpbTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5c1NoaW07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcblx0dmFyIHN0ciA9IHRvU3RyLmNhbGwodmFsdWUpO1xuXHR2YXIgaXNBcmdzID0gc3RyID09PSAnW29iamVjdCBBcmd1bWVudHNdJztcblx0aWYgKCFpc0FyZ3MpIHtcblx0XHRpc0FyZ3MgPSBzdHIgIT09ICdbb2JqZWN0IEFycmF5XScgJiZcblx0XHRcdHZhbHVlICE9PSBudWxsICYmXG5cdFx0XHR0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmXG5cdFx0XHR0eXBlb2YgdmFsdWUubGVuZ3RoID09PSAnbnVtYmVyJyAmJlxuXHRcdFx0dmFsdWUubGVuZ3RoID49IDAgJiZcblx0XHRcdHRvU3RyLmNhbGwodmFsdWUuY2FsbGVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblx0fVxuXHRyZXR1cm4gaXNBcmdzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCdlcy1hYnN0cmFjdC8yMDIwL1JlcXVpcmVPYmplY3RDb2VyY2libGUnKTtcbnZhciBUb1N0cmluZyA9IHJlcXVpcmUoJ2VzLWFic3RyYWN0LzIwMjAvVG9TdHJpbmcnKTtcbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJpbmQvY2FsbEJvdW5kJyk7XG52YXIgJHJlcGxhY2UgPSBjYWxsQm91bmQoJ1N0cmluZy5wcm90b3R5cGUucmVwbGFjZScpO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb250cm9sLXJlZ2V4ICovXG52YXIgbGVmdFdoaXRlc3BhY2UgPSAvXltcXHgwOVxceDBBXFx4MEJcXHgwQ1xceDBEXFx4MjBcXHhBMFxcdTE2ODBcXHUxODBFXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMEFcXHUyMDJGXFx1MjA1RlxcdTMwMDBcXHUyMDI4XFx1MjAyOVxcdUZFRkZdKy87XG52YXIgcmlnaHRXaGl0ZXNwYWNlID0gL1tcXHgwOVxceDBBXFx4MEJcXHgwQ1xceDBEXFx4MjBcXHhBMFxcdTE2ODBcXHUxODBFXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMEFcXHUyMDJGXFx1MjA1RlxcdTMwMDBcXHUyMDI4XFx1MjAyOVxcdUZFRkZdKyQvO1xuLyogZXNsaW50LWVuYWJsZSBuby1jb250cm9sLXJlZ2V4ICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJpbSgpIHtcblx0dmFyIFMgPSBUb1N0cmluZyhSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpKTtcblx0cmV0dXJuICRyZXBsYWNlKCRyZXBsYWNlKFMsIGxlZnRXaGl0ZXNwYWNlLCAnJyksIHJpZ2h0V2hpdGVzcGFjZSwgJycpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnY2FsbC1iaW5kJyk7XG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xudmFyIHNoaW0gPSByZXF1aXJlKCcuL3NoaW0nKTtcblxudmFyIGJvdW5kVHJpbSA9IGNhbGxCaW5kKGdldFBvbHlmaWxsKCkpO1xuXG5kZWZpbmUoYm91bmRUcmltLCB7XG5cdGdldFBvbHlmaWxsOiBnZXRQb2x5ZmlsbCxcblx0aW1wbGVtZW50YXRpb246IGltcGxlbWVudGF0aW9uLFxuXHRzaGltOiBzaGltXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBib3VuZFRyaW07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbXBsZW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcblxudmFyIHplcm9XaWR0aFNwYWNlID0gJ1xcdTIwMGInO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldFBvbHlmaWxsKCkge1xuXHRpZiAoU3RyaW5nLnByb3RvdHlwZS50cmltICYmIHplcm9XaWR0aFNwYWNlLnRyaW0oKSA9PT0gemVyb1dpZHRoU3BhY2UpIHtcblx0XHRyZXR1cm4gU3RyaW5nLnByb3RvdHlwZS50cmltO1xuXHR9XG5cdHJldHVybiBpbXBsZW1lbnRhdGlvbjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZpbmUgPSByZXF1aXJlKCdkZWZpbmUtcHJvcGVydGllcycpO1xudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNoaW1TdHJpbmdUcmltKCkge1xuXHR2YXIgcG9seWZpbGwgPSBnZXRQb2x5ZmlsbCgpO1xuXHRkZWZpbmUoU3RyaW5nLnByb3RvdHlwZSwgeyB0cmltOiBwb2x5ZmlsbCB9LCB7XG5cdFx0dHJpbTogZnVuY3Rpb24gdGVzdFRyaW0oKSB7XG5cdFx0XHRyZXR1cm4gU3RyaW5nLnByb3RvdHlwZS50cmltICE9PSBwb2x5ZmlsbDtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gcG9seWZpbGw7XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBfX0RFVl9fID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJztcblxudmFyIHdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAoX19ERVZfXykge1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMSA/IGxlbiAtIDEgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAxOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDFdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXG4gICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfVxuXG4gIHdhcm5pbmcgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMiA/IGxlbiAtIDIgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAyOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDJdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgICAnbWVzc2FnZSBhcmd1bWVudCdcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkobnVsbCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcbiIsImltcG9ydCB7IFVVSUQgfSBmcm9tICdAdG5nYmwvbW9kZWxzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElHcm91cCB7XG4gIHV1aWQ6IFVVSURcbiAgbmFtZTogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVBlcm1pc3Npb24ge1xuICBhbGxvd2VkOiBJR3JvdXBbXVxuICBkZW5pZWQ6IElHcm91cFtdXG59XG5cbmV4cG9ydCBjbGFzcyBQZXJtaXNzaW9uRmFjdG9yeSB7XG4gIHByaXZhdGUgc3RhdGljIF9wZXJtaXNzaW9uTG9va3VwOiB7IFtrZXk6IHN0cmluZ106IChhbnkpID0+IElQZXJtaXNzaW9uIH0gPSB7fVxuXG4gIHN0YXRpYyByZWdpc3Rlcih0eXBlOiBzdHJpbmcsIGZyb21QbGFpbk9iamVjdDogKGFueSkgPT4gSVBlcm1pc3Npb24pOiB2b2lkIHtcbiAgICB7XG4gICAgICBQZXJtaXNzaW9uRmFjdG9yeS5fcGVybWlzc2lvbkxvb2t1cFt0eXBlXSA9IGZyb21QbGFpbk9iamVjdFxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmcm9tUGxhaW5PYmplY3Qob2JqOiBhbnkpOiBJUGVybWlzc2lvbiB7XG4gICAgY29uc3QgZnJvbVBsYWluT2JqZWN0ID0gUGVybWlzc2lvbkZhY3RvcnkuX3Blcm1pc3Npb25Mb29rdXBbb2JqLnR5cGVdXG4gICAgcmV0dXJuIGZyb21QbGFpbk9iamVjdChvYmopXG4gIH1cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vZG9tYWluL21vZGVscydcbiIsImltcG9ydCB7IElQYWdlVmFsaWRhdGlvbkhvb2sgfSBmcm9tICcuLi8uLi8uLi8uLi9zcmMvYnJvd3NlcidcblxuZXhwb3J0IGNvbnN0IGhvb2s6IElQYWdlVmFsaWRhdGlvbkhvb2sgPSB7XG4gIGNvbXBvbmVudE5hbWU6ICdmYXZvdXJpdGUtY29sb3VyJyxcbiAgcmVnaXN0ZXJIb29rOiAoYXJncykgPT4ge1xuICAgIGNvbnN0IGVycm9yQ2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgYCR7YXJncy5kYXRhSWR9X19lcnJvci1jYXJkYFxuICAgICkgYXMgSFRNTEVsZW1lbnRcbiAgICBjb25zdCBpbnB1dEZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoXG4gICAgICBhcmdzLmRhdGFJZFxuICAgIClbMF0gYXMgSFRNTElucHV0RWxlbWVudFxuXG4gICAgaW5wdXRGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGVycm9ycyA9IGFyZ3MudmFsaWRhdG9yLnZhbGlkYXRlKGFyZ3MuZGF0YUlkLCBpbnB1dEZpZWxkLnZhbHVlKVxuICAgICAgaWYgKGVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgZXJyb3JDYXJkLmlubmVySFRNTCA9XG4gICAgICAgICAgJzx1bD4nICtcbiAgICAgICAgICBlcnJvcnMubWFwKFxuICAgICAgICAgICAgKGUpID0+XG4gICAgICAgICAgICAgICc8bGk+JyArXG4gICAgICAgICAgICAgIGFyZ3MucG9seWdsb3QudChcbiAgICAgICAgICAgICAgICBgQHRuZ2JsL2Zvcm1zLXd3dy1zdGF0aWMudGVtcGxhdGVzLiR7ZS52YWxpZGF0aW9uTmFtZX0uJHtlLmVycm9yTmFtZX1gXG4gICAgICAgICAgICAgICkgK1xuICAgICAgICAgICAgICAnPC9saT4nXG4gICAgICAgICAgKSArXG4gICAgICAgICAgJzwvdWw+J1xuICAgICAgICBlcnJvckNhcmQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yQ2FyZC5pbm5lckhUTUwgPSAnJ1xuICAgICAgICBlcnJvckNhcmQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG4iLCJpbXBvcnQgeyBob29rIGFzIGZhdm91cml0ZUNvbG91ckhvb2sgfSBmcm9tICcuL2Zhdm91cml0ZS1jb2xvdXInXG5cbmV4cG9ydCBjb25zdCBob29rcyA9IFtmYXZvdXJpdGVDb2xvdXJIb29rXVxuIiwiaW1wb3J0ICogYXMgUG9seWdsb3QgZnJvbSAnbm9kZS1wb2x5Z2xvdCdcbmltcG9ydCB7XG4gIEZvcm1Nb2R1bGUsXG4gIElWYWxpZGF0aW9uLFxuICBJRm9ybU1vZHVsZVBsdWdpbixcbiAgRmllbGQsXG4gIEZpZWxkU2V0LFxuICBGb3JtXG59IGZyb20gJ0B0bmdibC9mb3JtcydcbmltcG9ydCB7IGV2ZW50SG9va3MgYXMgY29yZUV2ZW50SG9va3MgfSBmcm9tICcuLi90ZW1wbGF0ZXMnXG5leHBvcnQgeyBFcnJvckJsb2NrIH0gZnJvbSAnLi4vdGVtcGxhdGVzL2Vycm9yLWJsb2NrJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElQYWdlVmFsaWRhdGlvbkhvb2tBcmdzIHtcbiAgZGF0YUlkOiBzdHJpbmdcbiAgdmFsaWRhdG9yOiBJVmFsaWRhdGlvblxuICBwb2x5Z2xvdDogUG9seWdsb3Rcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUGFnZVZhbGlkYXRpb25Ib29rIHtcbiAgY29tcG9uZW50TmFtZTogc3RyaW5nXG4gIHJlZ2lzdGVySG9vazogKGFyZ3M6IElQYWdlVmFsaWRhdGlvbkhvb2tBcmdzKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBjbGFzcyBQYWdlVmFsaWRhdGlvblBsdWdpbiBpbXBsZW1lbnRzIElGb3JtTW9kdWxlUGx1Z2luIHtcbiAgbmFtZSA9ICdwYWdlLXZhbGlkYXRpb24nXG4gIGZvcm1Nb2R1bGU6IEZvcm1Nb2R1bGVcbiAgcGFnZVZhbGlkYXRpb25Ib29rczogSVBhZ2VWYWxpZGF0aW9uSG9va1tdID0gW11cbiAgcG9seWdsb3Q6IFBvbHlnbG90XG5cbiAgY29uc3RydWN0b3IocG9seWdsb3Q6IFBvbHlnbG90KSB7XG4gICAgdGhpcy5wb2x5Z2xvdCA9IHBvbHlnbG90XG4gIH1cblxuICByZWdpc3Rlcihmb3JtTW9kdWxlOiBGb3JtTW9kdWxlKTogdm9pZCB7XG4gICAgdGhpcy5mb3JtTW9kdWxlID0gZm9ybU1vZHVsZVxuICAgIHRoaXMuZm9ybU1vZHVsZS5wbHVnaW5bdGhpcy5uYW1lXSA9IHRoaXNcbiAgfVxuXG4gIHdpdGhDb3JlKCk6IHRoaXMge1xuICAgIHRoaXMud2l0aEhvb2tzKGNvcmVFdmVudEhvb2tzKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB3aXRoSG9va3MoaG9va3M6IElQYWdlVmFsaWRhdGlvbkhvb2tbXSk6IHRoaXMge1xuICAgIHRoaXMucGFnZVZhbGlkYXRpb25Ib29rcy5wdXNoKC4uLmhvb2tzKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhY3RpdmF0ZUZvcm1Gcm9tSnNvbihqc29uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmb3JtID0gdGhpcy5mb3JtTW9kdWxlLmZvcm1Gcm9tUGxhaW5PYmplY3QoSlNPTi5wYXJzZShqc29uKSlcbiAgICB0aGlzLmFjdGl2YXRlKGZvcm0pXG4gIH1cblxuICBhY3RpdmF0ZShjb21wb25lbnQ6IEZvcm0gfCBGaWVsZFNldCB8IEZpZWxkKTogdm9pZCB7XG4gICAgaWYgKGNvbXBvbmVudCBpbnN0YW5jZW9mIEZvcm0pIHtcbiAgICAgIHRoaXMuYWN0aXZhdGUoY29tcG9uZW50LnNjaGVtYSlcbiAgICB9IGVsc2UgaWYgKGNvbXBvbmVudCBpbnN0YW5jZW9mIEZpZWxkU2V0KSB7XG4gICAgICBjb21wb25lbnQuc3RydWN0dXJlLmZvckVhY2goKGVsKSA9PiB0aGlzLmFjdGl2YXRlKGVsKSlcbiAgICB9IGVsc2UgaWYgKGNvbXBvbmVudCBpbnN0YW5jZW9mIEZpZWxkKSB7XG4gICAgICB0aGlzLnBhZ2VWYWxpZGF0aW9uSG9va3NcbiAgICAgICAgLmZpbmQoKGhvb2spID0+IGhvb2suY29tcG9uZW50TmFtZSA9PT0gY29tcG9uZW50LnZpZXdUeXBlKVxuICAgICAgICA/LnJlZ2lzdGVySG9vayh7XG4gICAgICAgICAgZGF0YUlkOiBjb21wb25lbnQubmFtZSxcbiAgICAgICAgICB2YWxpZGF0b3I6IGNvbXBvbmVudCxcbiAgICAgICAgICBwb2x5Z2xvdDogdGhpcy5wb2x5Z2xvdFxuICAgICAgICB9KVxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEVycm9yQmxvY2sge1xuICBlbGVtZW50OiBIVE1MVUxpc3RFbGVtZW50XG4gIGVycm9yczogc3RyaW5nW10gPSBbXVxuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgbmFtZSArICdfX2Vycm9yLWJsb2NrJ1xuICAgICkgYXMgSFRNTFVMaXN0RWxlbWVudFxuICB9XG5cbiAgYWRkKGVycm9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmVycm9ycy5wdXNoKGVycm9yKVxuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5lcnJvcnMgPSBbXVxuICB9XG5cbiAgcmVuZGVyKCk6IHZvaWQge1xuICAgIHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLmVycm9yc1xuICAgICAgLm1hcCgoZXJyb3IpID0+IGA8bGk+JHtlcnJvcn08L2xpPmApXG4gICAgICAuam9pbignXFxuJylcbiAgfVxufVxuIiwiaW1wb3J0IG5ld1Bhc3N3b3JkRXZlbnRIb29rIGZyb20gJy4vbmV3LXBhc3N3b3JkJ1xuXG5leHBvcnQgY29uc3QgZXZlbnRIb29rcyA9IFtuZXdQYXNzd29yZEV2ZW50SG9va11cbiIsImltcG9ydCB7IElQYWdlVmFsaWRhdGlvbkhvb2ssIEVycm9yQmxvY2sgfSBmcm9tICcuLi9icm93c2VyJ1xuXG5jb25zdCBldmVudEhvb2s6IElQYWdlVmFsaWRhdGlvbkhvb2sgPSB7XG4gIGNvbXBvbmVudE5hbWU6ICduZXctcGFzc3dvcmQnLFxuICByZWdpc3Rlckhvb2s6ICh7IGRhdGFJZCwgcG9seWdsb3QsIHZhbGlkYXRvciB9KSA9PiB7XG4gICAgY29uc3QgaW5wdXRFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JylcblxuICAgIGxldCBjb25maXJtVG91Y2hlZCA9IGZhbHNlXG5cbiAgICBjb25zdCBvbklucHV0Q2hhbmdlID0gKCkgPT4ge1xuICAgICAgY29uc3QgZXJyb3JCbG9jayA9IG5ldyBFcnJvckJsb2NrKGRhdGFJZClcbiAgICAgIGlmIChjb25maXJtVG91Y2hlZCAmJiBpbnB1dEVsZW1lbnRzWzBdLnZhbHVlICE9PSBpbnB1dEVsZW1lbnRzWzFdLnZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gcG9seWdsb3QudChcbiAgICAgICAgICAndmFsaWRhdGlvbnMubmV3LXBhc3N3b3JkLmNvbmZpcm0tZG9lcy1ub3QtbWF0Y2gnXG4gICAgICAgIClcbiAgICAgICAgZXJyb3JCbG9jay5hZGQoZXJyb3IpXG4gICAgICB9XG5cbiAgICAgIHZhbGlkYXRvclxuICAgICAgICAudmFsaWRhdGUoZGF0YUlkLCBpbnB1dEVsZW1lbnRzWzBdLnZhbHVlKVxuICAgICAgICAubWFwKChlcnJvcikgPT4gZXJyb3IudHJhbnNsYXRpb25LZXkpXG4gICAgICAgIC5mb3JFYWNoKChrZXkpID0+IGVycm9yQmxvY2suYWRkKGtleSkpXG5cbiAgICAgIGVycm9yQmxvY2sucmVuZGVyKClcbiAgICB9XG5cbiAgICBjb25zdCBvbkZvY3VzID0gKCkgPT4ge1xuICAgICAgY29uZmlybVRvdWNoZWQgPSB0cnVlXG4gICAgfVxuXG4gICAgaW5wdXRFbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgb25Gb2N1cylcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvbklucHV0Q2hhbmdlKVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZXZlbnRIb29rXG4iLCJleHBvcnQgKiBmcm9tICcuL3R5cGVzJ1xuIiwiZXhwb3J0IGNsYXNzIEZvcm1TeW50YXhFcnJvciBleHRlbmRzIFN5bnRheEVycm9yIHt9XG4iLCJpbXBvcnQgeyBJUGVybWlzc2lvbiwgUGVybWlzc2lvbkZhY3RvcnkgfSBmcm9tICdAdG5nYmwvYXV0aCdcbmltcG9ydCB7IFN0b3JlZFBsYWluT2JqZWN0IH0gZnJvbSAnQHRuZ2JsL21vZGVscydcbmltcG9ydCB7IEdkcHJQb2xpY3kgfSBmcm9tICdAdG5nYmwvc2VjdXJlLXN0b3JlJ1xuaW1wb3J0IHR5cGUgeyBJQnVpbGRlcnMgfSBmcm9tICcuLi8uLi9mb3JtLW1vZHVsZSdcbmltcG9ydCB7IElWYWxpZGF0aW9uRXJyb3IsIElWYWxpZGF0aW9uIH0gZnJvbSAnLi4vLi4vdmFsaWRhdGlvbnMnXG5cbi8qKlxuICogRGVmaW5lcyB0aGUgdHlwZSB1c2VkIGluIHRoZSBwZXJzaXN0ZW5jZSBsYXllclxuICovXG5leHBvcnQgZW51bSBTdG9yYWdlVHlwZSB7XG4gIFN0cmluZyA9ICdTVFJJTkcnLFxuICBVdWlkID0gJ1VVSUQnLFxuICBJbnRlZ2VyID0gJ0lOVEVHRVInLFxuICBGbG9hdCA9ICdGTE9BVCcsXG4gIE9iamVjdCA9ICdPQkpFQ1QnLFxuICBEYXRlID0gJ0RBVEUnLFxuICBUaW1lID0gJ1RJTUUnLFxuICBUaW1lc3RhbXAgPSAnVElNRVNUQU1QJyxcbiAgRHVyYXRpb24gPSAnRFVSQVRJT04nXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnN0YW5jZSBvZiBhIGZpZWxkIGluIGEgZm9ybVxuICovXG5leHBvcnQgY2xhc3MgRmllbGQge1xuICBzdGF0aWMgcmVhZG9ubHkgdHlwZSA9ICdGaWVsZCdcblxuICBuYW1lOiBzdHJpbmcgLy8gVW5pcXVlIHRvIHRoZSBGb3JtU2NoZW1hIGUuZy4gbW90aGVyc0ZpcnN0TmFtZVxuICBsYWJlbDogc3RyaW5nIC8vIGUuZy4gTW90aGVyJ3MgZmlyc3QgbmFtZVxuICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGVcbiAgdmlld1R5cGU6IHN0cmluZyAvLyBEZXRlcm1pbmVzIHdoYXQgY29tcG9uZW50IHdpbGwgYmUgdXNlZCBmb3IgZWRpdGluZy9kaXNwbGF5aW5nIHRoZSBmaWVsZCBlLmcuIGZpcnN0TmFtZVxuICBnZHByUG9saWN5OiBHZHByUG9saWN5XG4gIHBlcm1pc3Npb25zOiBJUGVybWlzc2lvbltdID0gW11cbiAgdmFsaWRhdGlvbnM6IElWYWxpZGF0aW9uW10gPSBbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBsYWJlbDogc3RyaW5nLFxuICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICBnZHByUG9saWN5OiBHZHByUG9saWN5LFxuICAgIHZpZXdUeXBlOiBzdHJpbmdcbiAgKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZVxuICAgIHRoaXMubGFiZWwgPSBsYWJlbFxuICAgIHRoaXMuc3RvcmFnZVR5cGUgPSBzdG9yYWdlVHlwZVxuICAgIHRoaXMuZ2RwclBvbGljeSA9IGdkcHJQb2xpY3lcbiAgICB0aGlzLnZpZXdUeXBlID0gdmlld1R5cGVcbiAgfVxuXG4gIHdpdGhQZXJtaXNzaW9ucyhwZXJtaXNzaW9uczogSVBlcm1pc3Npb25bXSk6IEZpZWxkIHtcbiAgICB0aGlzLnBlcm1pc3Npb25zLnB1c2goLi4ucGVybWlzc2lvbnMpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHZhbGlkYXRlKGlkOiBzdHJpbmcsIGRhdGE6IEZvcm1EYXRhKTogSVZhbGlkYXRpb25FcnJvcltdIHtcbiAgICByZXR1cm4gdGhpcy52YWxpZGF0aW9ucy5tYXAoKHYpID0+IHYudmFsaWRhdGUoaWQsIGRhdGEpKS5mbGF0KClcbiAgfVxuXG4gIHRvUGxhaW5PYmplY3QoKTogU3RvcmVkUGxhaW5PYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBsYWJlbDogdGhpcy5sYWJlbCxcbiAgICAgIHR5cGU6IEZpZWxkLnR5cGUsXG4gICAgICB2aWV3VHlwZTogdGhpcy52aWV3VHlwZSxcbiAgICAgIHN0b3JhZ2VUeXBlOiB0aGlzLnN0b3JhZ2VUeXBlLFxuICAgICAgZ2RwclBvbGljeTogdGhpcy5nZHByUG9saWN5LnRvUGxhaW5PYmplY3QoKSxcbiAgICAgIHBlcm1pc3Npb25zOiB0aGlzLnBlcm1pc3Npb25zLFxuICAgICAgdmFsaWRhdGlvbnM6IHRoaXMudmFsaWRhdGlvbnMubWFwKCh2KSA9PiB2LnRvUGxhaW5PYmplY3QoKSlcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbVBsYWluT2JqZWN0KG9iajogYW55LCBidWlsZGVyczogSUJ1aWxkZXJzKTogRmllbGQge1xuICAgIGNvbnN0IGdkcHJQb2xpY3kgPSBHZHByUG9saWN5LmZyb21QbGFpbk9iamVjdChvYmouZ2RwclBvbGljeSlcbiAgICBjb25zdCBmaWVsZCA9IG5ldyBGaWVsZChcbiAgICAgIG9iai5uYW1lLFxuICAgICAgb2JqLmxhYmVsLFxuICAgICAgb2JqLnN0b3JhZ2VUeXBlLFxuICAgICAgZ2RwclBvbGljeSxcbiAgICAgIG9iai52aWV3VHlwZVxuICAgIClcbiAgICBmaWVsZC5wZXJtaXNzaW9ucyA9IG9iai5wZXJtaXNzaW9ucy5tYXAoKHBPYmopID0+XG4gICAgICBQZXJtaXNzaW9uRmFjdG9yeS5mcm9tUGxhaW5PYmplY3QocE9iailcbiAgICApXG4gICAgZmllbGQudmFsaWRhdGlvbnMgPSBvYmoudmFsaWRhdGlvbnMubWFwKCh2T2JqKSA9PlxuICAgICAgYnVpbGRlcnMudmFsaWRhdGlvbnNbdk9iai5uYW1lXS5mcm9tUGxhaW5PYmplY3QoXG4gICAgICAgIHZPYmosXG4gICAgICAgIGJ1aWxkZXJzLnZhbGlkYXRpb25zXG4gICAgICApXG4gICAgKVxuICAgIHJldHVybiBmaWVsZFxuICB9XG59XG4iLCJpbXBvcnQgeyBTdG9yZWRQbGFpbk9iamVjdCB9IGZyb20gJ0B0bmdibC9tb2RlbHMnXG5pbXBvcnQgeyBpc0Jvb2xlYW4gfSBmcm9tICdAdG5nYmwvdXRpbHMnXG5pbXBvcnQgeyBJVmFsaWRhdGlvbiwgSVZhbGlkYXRpb25FcnJvciB9IGZyb20gJy4uLy4uL3ZhbGlkYXRpb25zJ1xuaW1wb3J0IHsgSURhdGFUcmlnZ2VyIH0gZnJvbSAnLi4vLi4vZGF0YS10cmlnZ2VycydcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi9maWVsZCdcbmltcG9ydCB0eXBlIHsgSUJ1aWxkZXJzIH0gZnJvbSAnLi4vLi4vZm9ybS1tb2R1bGUnXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGdyb3VwIG9mIGZpZWxkcyBpbiBhIGZvcm1cbiAqL1xuZXhwb3J0IGNsYXNzIEZpZWxkU2V0IHtcbiAgc3RhdGljIHJlYWRvbmx5IHR5cGU6IHN0cmluZyA9ICdGaWVsZFNldCdcbiAgbmFtZTogc3RyaW5nIC8vIGUuZy4gbmV4dE9mS2luRGV0YWlsc1xuICBsYWJlbDogc3RyaW5nIC8vIGUuZy4gTmV4dCBvZiBraW4gZGV0YWlsc1xuICBzdHJ1Y3R1cmU6IChGaWVsZCB8IEZpZWxkU2V0KVtdID0gW11cbiAgdmFsaWRhdGlvbnM6IElWYWxpZGF0aW9uW10gPSBbXVxuICBpc1JlcXVpcmVkOiBJRGF0YVRyaWdnZXIgfCBib29sZWFuID0gdHJ1ZVxuXG4gIHdpdGhEYXRhU2V0cyhkYXRhU2V0czogRmllbGRTZXRbXSk6IEZpZWxkU2V0IHtcbiAgICB0aGlzLnN0cnVjdHVyZS5wdXNoKC4uLmRhdGFTZXRzKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB3aXRoVmFsaWRhdGlvbnModmFsaWRhdGlvbnM6IElWYWxpZGF0aW9uW10pOiBGaWVsZFNldCB7XG4gICAgdGhpcy52YWxpZGF0aW9ucy5wdXNoKC4uLnZhbGlkYXRpb25zKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB2YWxpZGF0ZShpZDogc3RyaW5nLCBkYXRhOiBhbnkpOiBJVmFsaWRhdGlvbkVycm9yW10ge1xuICAgIGNvbnN0IGZvcm1FcnJvcnMgPSB0aGlzLnZhbGlkYXRpb25zXG4gICAgICAubWFwKCh2YWxpZGF0aW9uKSA9PiB2YWxpZGF0aW9uLnZhbGlkYXRlKGlkLCBkYXRhKSlcbiAgICAgIC5mbGF0KClcbiAgICBjb25zdCBjb21wb25lbnRFcnJvcnMgPSB0aGlzLnN0cnVjdHVyZVxuICAgICAgLm1hcCgoY29tcG9uZW50KSA9PlxuICAgICAgICBjb21wb25lbnQudmFsaWRhdGUoY29tcG9uZW50Lm5hbWUsIGRhdGFbY29tcG9uZW50Lm5hbWVdKVxuICAgICAgKVxuICAgICAgLmZsYXQoKVxuXG4gICAgcmV0dXJuIGZvcm1FcnJvcnMuY29uY2F0KGNvbXBvbmVudEVycm9ycylcbiAgfVxuXG4gIHRvUGxhaW5PYmplY3QoKTogU3RvcmVkUGxhaW5PYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICB0eXBlOiBGaWVsZFNldC50eXBlLFxuICAgICAgbGFiZWw6IHRoaXMubGFiZWwsXG4gICAgICBzdHJ1Y3R1cmU6IHRoaXMuc3RydWN0dXJlLm1hcCgocykgPT4gcy50b1BsYWluT2JqZWN0KCkpLFxuICAgICAgdmFsaWRhdGlvbnM6IHRoaXMudmFsaWRhdGlvbnMubWFwKCh2KSA9PiB2LnRvUGxhaW5PYmplY3QoKSksXG4gICAgICBpc1JlcXVpcmVkOiBpc0Jvb2xlYW4odGhpcy5pc1JlcXVpcmVkKVxuICAgICAgICA/IHRoaXMuaXNSZXF1aXJlZFxuICAgICAgICA6ICh0aGlzLmlzUmVxdWlyZWQgYXMgSURhdGFUcmlnZ2VyKS50b1BsYWluT2JqZWN0KClcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbVBsYWluT2JqZWN0KG9iajogYW55LCBidWlsZGVyczogSUJ1aWxkZXJzKTogRmllbGRTZXQge1xuICAgIGNvbnN0IGZpZWxkU2V0ID0gbmV3IEZpZWxkU2V0KClcbiAgICBmaWVsZFNldC5uYW1lID0gb2JqLm5hbWVcbiAgICBmaWVsZFNldC5sYWJlbCA9IG9iai5sYWJlbFxuICAgIGZpZWxkU2V0LnZhbGlkYXRpb25zID0gb2JqLnZhbGlkYXRpb25zLm1hcCgodmFsT2JqKSA9PlxuICAgICAgYnVpbGRlcnMudmFsaWRhdGlvbnNbdmFsT2JqLm5hbWVdLmZyb21QbGFpbk9iamVjdChcbiAgICAgICAgdmFsT2JqLFxuICAgICAgICBidWlsZGVycy52YWxpZGF0aW9uc1xuICAgICAgKVxuICAgIClcbiAgICBmaWVsZFNldC5zdHJ1Y3R1cmUgPSBvYmouc3RydWN0dXJlLm1hcCgodmFsT2JqKSA9PlxuICAgICAgdmFsT2JqLnR5cGUgPT09IEZpZWxkLnR5cGVcbiAgICAgICAgPyBGaWVsZC5mcm9tUGxhaW5PYmplY3QodmFsT2JqLCBidWlsZGVycylcbiAgICAgICAgOiBGaWVsZFNldC5mcm9tUGxhaW5PYmplY3QodmFsT2JqLCBidWlsZGVycylcbiAgICApXG4gICAgZmllbGRTZXQuaXNSZXF1aXJlZCA9IGlzQm9vbGVhbihvYmouaXNSZXF1aXJlZClcbiAgICAgID8gb2JqLmlzUmVxdWlyZWRcbiAgICAgIDogYnVpbGRlcnMuZGF0YVRyaWdnZXJzW29iai5pc1JlcXVpcmVkLm5hbWVdLmZyb21QbGFpbk9iamVjdChcbiAgICAgICAgICBvYmouaXNSZXF1aXJlZCxcbiAgICAgICAgICBidWlsZGVycy5kYXRhVHJpZ2dlcnNcbiAgICAgICAgKVxuICAgIHJldHVybiBmaWVsZFNldFxuICB9XG59XG4iLCJpbXBvcnQgeyBTY2hlbWEgfSBmcm9tICcuL3NjaGVtYSdcbmltcG9ydCB7IFN0b3JlZFBsYWluT2JqZWN0IH0gZnJvbSAnQHRuZ2JsL21vZGVscydcbmltcG9ydCB7IElWYWxpZGF0aW9uRXJyb3IgfSBmcm9tICcuLi8uLi92YWxpZGF0aW9ucydcbmltcG9ydCB0eXBlIHsgSUJ1aWxkZXJzIH0gZnJvbSAnLi4vLi4vZm9ybS1tb2R1bGUnXG5cbmV4cG9ydCB0eXBlIEZvcm1EYXRhID0gYW55XG5cbi8qKlxuICogT2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIGRhdGEgYWxvbmdzaWRlIHRoZSBzY2hlbWFcbiAqL1xuZXhwb3J0IGNsYXNzIEZvcm0ge1xuICBzdGF0aWMgdHlwZSA9ICdGb3JtJ1xuXG4gIG5hbWU6IHN0cmluZ1xuICBkYXRhOiBGb3JtRGF0YSA9IHt9XG4gIHNjaGVtYTogU2NoZW1hXG5cbiAgdmFsaWRhdGUoKTogSVZhbGlkYXRpb25FcnJvcltdIHtcbiAgICByZXR1cm4gdGhpcy5zY2hlbWEudmFsaWRhdGUoJycsIHRoaXMuZGF0YSlcbiAgfVxuXG4gIHRvUGxhaW5PYmooKTogU3RvcmVkUGxhaW5PYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBGb3JtLnR5cGUsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICBzY2hlbWE6IHRoaXMuc2NoZW1hLnRvUGxhaW5PYmplY3QoKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmcm9tUGxhaW5PYmoob2JqOiBhbnksIGJ1aWxkZXJzOiBJQnVpbGRlcnMpOiBGb3JtIHtcbiAgICBjb25zdCBmb3JtID0gbmV3IEZvcm0oKVxuICAgIGZvcm0uZGF0YSA9IG9iai5kYXRhXG4gICAgZm9ybS5uYW1lID0gb2JqLm5hbWVcbiAgICBmb3JtLnNjaGVtYSA9IFNjaGVtYS5mcm9tUGxhaW5PYmplY3Qob2JqLnNjaGVtYSwgYnVpbGRlcnMpXG4gICAgcmV0dXJuIGZvcm1cbiAgfVxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9maWVsZCdcbmV4cG9ydCAqIGZyb20gJy4vZm9ybSdcbmV4cG9ydCAqIGZyb20gJy4vZmllbGRzZXQnXG5leHBvcnQgKiBmcm9tICcuL3NjaGVtYSdcbmV4cG9ydCAqIGZyb20gJy4vZXhjZXB0aW9ucydcbiIsImltcG9ydCB7IFNlbVZlciwgSW50VmVyIH0gZnJvbSAnQHRuZ2JsL21vZGVscydcbmltcG9ydCB7IFN0b3JlZFBsYWluT2JqZWN0IH0gZnJvbSAnQHRuZ2JsL21vZGVscydcbmltcG9ydCB0eXBlIHsgSUJ1aWxkZXJzIH0gZnJvbSAnLi4vLi4vZm9ybS1tb2R1bGUnXG5pbXBvcnQgeyBGaWVsZFNldCB9IGZyb20gJy4vZmllbGRzZXQnXG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgc3RydWN0dXJlIG9mIGEgZm9ybVxuICovXG5leHBvcnQgY2xhc3MgU2NoZW1hIGV4dGVuZHMgRmllbGRTZXQge1xuICAvKiogSW5jcmVtZW50IHdoZW4gbWFrZSBhIGJyZWFraW5nIGNoYW5nZSB0byBwZXJzaXN0ZW5jZSBtYXJzaGFsbGluZyAqL1xuICBzdGF0aWMgcmVhZG9ubHkgc3RvcmFnZVZlcnNpb246IEludFZlciA9IDFcbiAgc3RhdGljIHJlYWRvbmx5IHR5cGU6IHN0cmluZyA9ICdTY2hlbWEnXG5cbiAgc2NoZW1hVmVyc2lvbjogU2VtVmVyXG5cbiAgdG9QbGFpbk9iamVjdCgpOiBTdG9yZWRQbGFpbk9iamVjdCB7XG4gICAgY29uc3Qgb2JqID0gc3VwZXIudG9QbGFpbk9iamVjdCgpXG4gICAgb2JqLnR5cGUgPSBTY2hlbWEudHlwZVxuICAgIG9iai5zY2hlbWFWZXJzaW9uID0gdGhpcy5zY2hlbWFWZXJzaW9uXG4gICAgcmV0dXJuIG9ialxuICB9XG5cbiAgc3RhdGljIGZyb21QbGFpbk9iamVjdChvYmo6IGFueSwgYnVpbGRlcnM6IElCdWlsZGVycyk6IFNjaGVtYSB7XG4gICAgY29uc3Qgc2NoZW1hID0gRmllbGRTZXQuZnJvbVBsYWluT2JqZWN0KG9iaiwgYnVpbGRlcnMpIGFzIFNjaGVtYVxuICAgIHNjaGVtYS5zY2hlbWFWZXJzaW9uID0gb2JqLnNjaGVtYVZlcnNpb25cbiAgICBzY2hlbWEubmFtZSA9IG9iai5uYW1lXG5cbiAgICByZXR1cm4gc2NoZW1hXG4gIH1cbn1cbiIsImltcG9ydCB7IFN0b3JlZFBsYWluT2JqZWN0IH0gZnJvbSAnQHRuZ2JsL21vZGVscydcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuJ1xuaW1wb3J0IHsgSURhdGFUcmlnZ2VyQnVpbGRlciB9IGZyb20gJy4vZGF0YS10cmlnZ2VycydcbmltcG9ydCB7IElWYWxpZGF0aW9uQnVpbGRlciB9IGZyb20gJy4vdmFsaWRhdGlvbnMnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSUJ1aWxkZXJzIHtcbiAgdmFsaWRhdGlvbnM6IFJlY29yZDxzdHJpbmcsIElWYWxpZGF0aW9uQnVpbGRlcj5cbiAgZGF0YVRyaWdnZXJzOiBSZWNvcmQ8c3RyaW5nLCBJRGF0YVRyaWdnZXJCdWlsZGVyPlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElGb3JtTW9kdWxlUGx1Z2luIHtcbiAgbmFtZTogc3RyaW5nXG4gIHJlZ2lzdGVyOiAoRm9ybU1vZHVsZSkgPT4gdm9pZFxufVxuXG5leHBvcnQgY2xhc3MgRm9ybU1vZHVsZSB7XG4gIGJ1aWxkZXJzOiBJQnVpbGRlcnMgPSB7XG4gICAgdmFsaWRhdGlvbnM6IHt9LFxuICAgIGRhdGFUcmlnZ2Vyczoge31cbiAgfVxuXG4gIC8qKlxuICAgKiBBIG5hbWVzcGFjZSBmb3IgcGx1Z2lucyB0byBkcm9wIHNoYXJlZCBmdW5jdGlvbmFsaXR5IG9udG8gdGhlIGZvcm0gY29uZmlndXJhdGlvblxuICAgKi9cbiAgcGx1Z2luOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge31cblxuICAvKipcbiAgICogUmVnaXN0ZXIgcGx1Z2luIHdpdGggdGhlIEZvcm1NYW5hZ2VyIGluc3RhbmNlXG4gICAqIEBwYXJhbSBwbHVnaW5cbiAgICovXG4gIHdpdGhQbHVnaW4ocGx1Z2luOiBJRm9ybU1vZHVsZVBsdWdpbik6IHRoaXMge1xuICAgIHRoaXMucGx1Z2luW3BsdWdpbi5uYW1lXSA9IHt9XG4gICAgcGx1Z2luLnJlZ2lzdGVyKHRoaXMpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHdpdGhWYWxpZGF0aW9uKGJ1aWxkZXI6IElWYWxpZGF0aW9uQnVpbGRlcik6IHRoaXMge1xuICAgIHRoaXMuYnVpbGRlcnMudmFsaWRhdGlvbnNbYnVpbGRlci5uYW1lXSA9IGJ1aWxkZXJcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgd2l0aERhdGFUcmlnZ2VyKGJ1aWxkZXI6IElEYXRhVHJpZ2dlckJ1aWxkZXIpOiB0aGlzIHtcbiAgICB0aGlzLmJ1aWxkZXJzLmRhdGFUcmlnZ2Vyc1tidWlsZGVyLm5hbWVdID0gYnVpbGRlclxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBmb3JtRnJvbVBsYWluT2JqZWN0KG9iajogU3RvcmVkUGxhaW5PYmplY3QpOiBGb3JtIHtcbiAgICAvLyBAdG9kb1xuICAgIHJldHVybiBGb3JtLmZyb21QbGFpbk9iaihvYmosIHRoaXMuYnVpbGRlcnMpXG4gIH1cblxuICBmb3JtVG9QbGFpbk9iamVjdChmb3JtOiBGb3JtKTogU3RvcmVkUGxhaW5PYmplY3Qge1xuICAgIHJldHVybiBmb3JtLnRvUGxhaW5PYmooKVxuICB9XG59XG4iLCJpbXBvcnQgeyBGb3JtTW9kdWxlIH0gZnJvbSAnLi9mb3JtLW1vZHVsZSdcblxuZXhwb3J0ICogZnJvbSAnLi9kb21haW4vbW9kZWxzJ1xuZXhwb3J0ICogZnJvbSAnLi92YWxpZGF0aW9ucydcbmV4cG9ydCAqIGZyb20gJy4vZGF0YS10cmlnZ2VycydcbmV4cG9ydCAqIGZyb20gJy4vZm9ybS1tb2R1bGUnXG5cbmV4cG9ydCBjb25zdCBmb3JtcyA9IG5ldyBGb3JtTW9kdWxlKClcbiIsImltcG9ydCB7IGJ1aWxkZXIgYXMgbWluTGVuZ3RoQnVpbGRlciB9IGZyb20gJy4vbWluLWxlbmd0aCdcblxuZXhwb3J0IGNvbnN0IGNvcmVWYWxpZGF0aW9uQnVpbGRlcnMgPSBbbWluTGVuZ3RoQnVpbGRlcl1cbiIsImltcG9ydCB7IFN0b3JlZFBsYWluT2JqZWN0IH0gZnJvbSAnQHRuZ2JsL21vZGVscydcbmltcG9ydCB7IGlzTnVsbE9yVW5kZWZpbmVkLCBpc051bWJlciB9IGZyb20gJ0B0bmdibC91dGlscydcbmltcG9ydCB7IElWYWxpZGF0aW9uLCBJVmFsaWRhdGlvbkJ1aWxkZXIsIElWYWxpZGF0aW9uRXJyb3IgfSBmcm9tICcuLi90eXBlcydcbmltcG9ydCB7IEZvcm1EYXRhIH0gZnJvbSAnLi4vLi4vZG9tYWluL21vZGVscy9mb3JtJ1xuXG5pbnRlcmZhY2UgSU1lYXN1cmFibGUge1xuICBsZW5ndGg6IG51bWJlclxufVxuXG5jbGFzcyBNaW5MZW5ndGhWYWxpZGF0aW9uIGltcGxlbWVudHMgSVZhbGlkYXRpb24ge1xuICBsZW5ndGg6IG51bWJlclxuXG4gIGNvbnN0cnVjdG9yKGxlbmd0aDogbnVtYmVyKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGhcbiAgfVxuXG4gIHZhbGlkYXRlKGlkOiBzdHJpbmcsIGRhdGE6IEZvcm1EYXRhKTogSVZhbGlkYXRpb25FcnJvcltdIHtcbiAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKGRhdGEpIHx8ICFpc051bWJlcigoZGF0YSBhcyBJTWVhc3VyYWJsZSkubGVuZ3RoKSkge1xuICAgICAgcmV0dXJuIFtdXG4gICAgfVxuICAgIGlmIChkYXRhLmxlbmd0aCA8IHRoaXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICB7XG4gICAgICAgICAgZGF0YUlkOiBpZCxcbiAgICAgICAgICB2YWxpZGF0aW9uTmFtZTogYnVpbGRlci5uYW1lLFxuICAgICAgICAgIGVycm9yTmFtZTogJ3Rvby1zaG9ydCcsXG4gICAgICAgICAgdHJhbnNsYXRpb25LZXk6IGB2YWxpZGF0aW9ucy4ke2J1aWxkZXIubmFtZX0udG9vLXNob3J0YFxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXVxuICAgIH1cbiAgfVxuXG4gIHRvUGxhaW5PYmplY3QoKTogU3RvcmVkUGxhaW5PYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBidWlsZGVyLm5hbWUsXG4gICAgICBsZW5ndGg6IHRoaXMubGVuZ3RoXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBidWlsZGVyOiBJVmFsaWRhdGlvbkJ1aWxkZXIgPSB7XG4gIG5hbWU6ICdNaW5MZW5ndGhWYWxpZGF0aW9uJyxcbiAgZnJvbVBsYWluT2JqZWN0KG9iajogU3RvcmVkUGxhaW5PYmplY3QpOiBJVmFsaWRhdGlvbiB7XG4gICAgY29uc3QgdmFsaWRhdGlvbiA9IG5ldyBNaW5MZW5ndGhWYWxpZGF0aW9uKG9iai5sZW5ndGgpXG4gICAgcmV0dXJuIHZhbGlkYXRpb25cbiAgfVxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi90eXBlcydcbmV4cG9ydCAqIGZyb20gJy4vY29yZSdcbiIsIlxuZXhwb3J0IGVudW0gQWNjZXNzUnVsZSB7XG4gIFBlcm1pdHRlZCA9ICdQRVJNSVRURUQnLFxuICBEZW5pZWQgPSAnREVOSUVEJ1xufVxuXG5leHBvcnQgY2xhc3MgU2VjdXJlRGF0YUFjY2VzcyB7XG4gIGlkOiBzdHJpbmdcbiAgY3JlYXRlZE9uOiBEYXRlXG4gIGFjY2Vzc2luZ0VudGl0eUlkOiBzdHJpbmdcbiAgZW5jcnlwdGVkRGF0YUlkOiBzdHJpbmdcbiAgYWNjZXNzUnVsZTogQWNjZXNzUnVsZVxuXG4gIHN0YXRpYyBmcm9tU3RvcmUgKHN0b3JlT2JqKSB7XG4gICAgLy8gQHRvZG9cbiAgICByZXR1cm4gbmV3IFNlY3VyZURhdGFBY2Nlc3MoKVxuICB9XG59XG4iLCJpbXBvcnQgeyBTdG9yZWRQbGFpbk9iamVjdCB9IGZyb20gJ0B0bmdibC9tb2RlbHMnXG4vLyBpbXBvcnQgeyBkZWNyeXB0QWVzLCBpc051bWJlciB9IGZyb20gJ0B0bmdibC91dGlscydcbmltcG9ydCB7IGlzTnVtYmVyIH0gZnJvbSAnQHRuZ2JsL3V0aWxzJ1xuXG5leHBvcnQgZW51bSBHZHByRGF0YVR5cGUge1xuICBBbm9ueW1pc2VkID0gJ0FOT05ZTUlTRUQnLFxuICBBbm9ueW1vdXMgPSAnQU5PTllNT1VTJyxcbiAgUGVyc29uYWwgPSAnUEVSU09OQUwnLFxuICBTZW5zaXRpdmVQZXJzb25hbCA9ICdTRU5TSVRJVkVfUEVSU09OQUwnXG59XG5cbmV4cG9ydCBlbnVtIEdkcHJMaWZldGltZSB7XG4gIFRyYW5zaWVudCA9ICdUUkFOU0lFTlQnLFxuICBQZXJzaXN0ZW50ID0gJ1BFUlNJU1RFTlQnXG59XG5cbmV4cG9ydCBjbGFzcyBHZHByUG9saWN5IHtcbiAgc3RhdGljIHR5cGUgPSAnR2RwclBvbGljeSdcbiAgZGF0YVR5cGU6IEdkcHJEYXRhVHlwZVxuICAvLyBMaWZldGltZSBpbiBzZWNvbmRzXG4gIGxpZmV0aW1lU2Vjb25kczogR2RwckxpZmV0aW1lIHwgbnVtYmVyID0gR2RwckxpZmV0aW1lLlBlcnNpc3RlbnRcblxuICBjb25zdHJ1Y3RvcihkYXRhVHlwZTogR2RwckRhdGFUeXBlLCBsaWZldGltZVNlY29uZHM6IEdkcHJMaWZldGltZSB8IG51bWJlcikge1xuICAgIHRoaXMuZGF0YVR5cGUgPSBkYXRhVHlwZVxuICAgIHRoaXMubGlmZXRpbWVTZWNvbmRzID0gbGlmZXRpbWVTZWNvbmRzXG4gIH1cblxuICB0b1BsYWluT2JqZWN0KCk6IFN0b3JlZFBsYWluT2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogR2RwclBvbGljeS50eXBlLFxuICAgICAgZGF0YVR5cGU6IHRoaXMuZGF0YVR5cGUsXG4gICAgICBsaWZldGltZVNlY29uZHM6IHRoaXMubGlmZXRpbWVTZWNvbmRzXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZyb21QbGFpbk9iamVjdChvYmo6IGFueSk6IEdkcHJQb2xpY3kge1xuICAgIGlmIChvYmoudHlwZSAhPT0gR2RwclBvbGljeS50eXBlKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoXG4gICAgICAgIGBDYW5ub3QgY2FzdCBhbiBvYmplY3Qgb2YgdHlwZSAnJHtvYmoudHlwZX0nIHRvIEdkcHJQb2xpY3lgXG4gICAgICApXG4gICAgfVxuICAgIGlmIChcbiAgICAgICFpc051bWJlcihvYmoubGlmZXRpbWVTZWNvbmRzKSAmJlxuICAgICAgIU9iamVjdC52YWx1ZXMoR2RwckxpZmV0aW1lKS5pbmNsdWRlcyhvYmoubGlmZXRpbWVTZWNvbmRzKVxuICAgICkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKFxuICAgICAgICBgSW52YWxpZCBsaWZldGltZVNlY29uZHMgcHJvcGVydHkgb24gR2RwclBvbGljeTogJHtvYmoubGlmZXRpbWVTZWNvbmRzfWBcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBHZHByUG9saWN5KG9iai5kYXRhVHlwZSwgb2JqLmxpZmV0aW1lU2Vjb25kcylcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBTdG9yYWJsZSA9XG4gIHwgUmVjb3JkPHN0cmluZywgdW5rbm93bj5cbiAgfCBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPltdXG4gIHwgc3RyaW5nXG4gIHwgc3RyaW5nW11cbiAgfCBudW1iZXJcbiAgfCBudW1iZXJbXVxuICB8IG51bGxcbiAgfCB1bmRlZmluZWRcblxuZXhwb3J0IGNsYXNzIFNlY3VyZURhdGEge1xuICBpZDogc3RyaW5nXG4gIGtleUlkOiBzdHJpbmcgfCBudWxsXG4gIGVuY3J5cHRpb25NZXRob2Q6IHN0cmluZ1xuICBlbmNyeXB0ZWRKc29uOiBVaW50OEFycmF5XG4gIGRlY3J5cHRlZFZhbHVlOiBTdG9yYWJsZVxuICBlbmNyeXB0aW9uSXY6IFVpbnQ4QXJyYXlcbiAgZXhwaXJlc09uOiBEYXRlXG4gIGNyZWF0ZWRPbjogRGF0ZVxuICBnZHByVHlwZTogR2RwckRhdGFUeXBlXG5cbiAgc3RhdGljIGZyb21EYlJvdyhyb3c6IFJlY29yZDxzdHJpbmcsIGFueT4pOiBTZWN1cmVEYXRhIHtcbiAgICBjb25zdCBlZCA9IG5ldyBTZWN1cmVEYXRhKClcbiAgICBlZC5pZCA9IHJvdy5pZFxuICAgIGVkLmtleUlkID0gbnVsbFxuICAgIGVkLmVuY3J5cHRpb25NZXRob2QgPSByb3cuZW5jcnlwdGlvbl9tZXRob2RcbiAgICBlZC5lbmNyeXB0ZWRKc29uID0gcm93LmVuY3J5cHRlZF9qc29uXG4gICAgZWQuZW5jcnlwdGlvbkl2ID0gcm93LmVuY3J5cHRpb25faXZcbiAgICBlZC5leHBpcmVzT24gPSByb3cuZXhwaXJlc19vblxuICAgIGVkLmNyZWF0ZWRPbiA9IHJvdy5jcmVhdGVkX29uXG4gICAgZWQuZ2RwclR5cGUgPSByb3cuZ2Rwcl90eXBlXG5cbiAgICAvLyBAZml4bWVcbiAgICBlZC5kZWNyeXB0ZWRWYWx1ZSA9ICcnXG4gICAgLy8gZWQuZGVjcnlwdGVkVmFsdWUgPSBkZWNyeXB0QWVzKFxuICAgIC8vICAgZWQuZW5jcnlwdGVkSnNvbixcbiAgICAvLyAgIGVkLmVuY3J5cHRpb25JdixcbiAgICAvLyAgIGVkLmVuY3J5cHRpb25NZXRob2QsXG4gICAgLy8gICAnJyAvLyBAdG9kbyBHZXQgdGhlIGtleVxuICAgIC8vIClcblxuICAgIHJldHVybiBlZFxuICB9XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL2RvbWFpbi9lbnRpdGllcy9zZWN1cmUtZGF0YSdcbmV4cG9ydCAqIGZyb20gJy4vZG9tYWluL2VudGl0aWVzL3NlY3VyZS1kYXRhLWFjY2VzcydcbiIsIlxuZXhwb3J0IGNvbnN0IGlzTnVsbE9yVW5kZWZpbmVkID0gdmFsdWUgPT4gdmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJ1xuXG5leHBvcnQgY29uc3QgaXNCb29sZWFuID0gdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbidcblxuZXhwb3J0IGNvbnN0IGhhc0xlbmd0aCA9IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCdcbiAgJiYgdmFsdWUgIT09IG51bGxcbiAgJiYgdmFsdWUuaGFzT3duUHJvcGVydHkoJ2xlbmd0aCcpXG5cbmV4cG9ydCBjb25zdCBpc1N0cmluZyA9IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmdcblxuZXhwb3J0IGNvbnN0IGlzTnVtYmVyID0gdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJ1xuIiwiZXhwb3J0IGNvbnN0IHBocmFzZXMgPSB7XG4gIHZhbGlkYXRpb25zOiB7XG4gICAgJ2lzLXN0cmluZyc6IHtcbiAgICAgICdpcy1ub3Qtc3RyaW5nJzogJ1BsZWFzZSBpbnB1dCB0ZXh0J1xuICAgIH0sXG4gICAgJ21pbi1sZW5ndGgnOiB7XG4gICAgICAndG9vLXNob3J0JzogJ1Bhc3N3b3JkIG5lZWRzIHRvIGJlIGF0IGxlYXN0IHt9IGxldHRlcnMgbG9uZydcbiAgICB9LFxuICAgICduZXctcGFzc3dvcmQnOiB7XG4gICAgICAnY29uZmlybS1kb2VzLW5vdC1tYXRjaCc6ICdQYXNzd29yZHMgZG8gbm90IG1hdGNoJ1xuICAgIH1cbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGZvcm1zIH0gZnJvbSAnQHRuZ2JsL2Zvcm1zJ1xuaW1wb3J0IHsgUGFnZVZhbGlkYXRpb25QbHVnaW4gfSBmcm9tICcuLi8uLi8uLi8uLi9zcmMvYnJvd3NlcidcbmltcG9ydCB7IGhvb2tzIH0gZnJvbSAnLi4vdGVtcGxhdGVzJ1xuaW1wb3J0ICogYXMgUG9seWdsb3QgZnJvbSAnbm9kZS1wb2x5Z2xvdCdcbmltcG9ydCB7IHBocmFzZXMgfSBmcm9tICcuLi9sb2NhbGVzL2VuLWdiLmpzJ1xuXG5jb25zdCBwb2x5Z2xvdCA9IG5ldyBQb2x5Z2xvdCh7IHBocmFzZXM6IHBocmFzZXMgfSlcblxuY29uc3QgcGx1Z2luID0gbmV3IFBhZ2VWYWxpZGF0aW9uUGx1Z2luKHBvbHlnbG90KS53aXRoQ29yZSgpLndpdGhIb29rcyhob29rcylcblxuZm9ybXMud2l0aFBsdWdpbihwbHVnaW4pXG5cbndpbmRvd1sndG5nYmwnXSA9IHtcbiAgZm9ybXNcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=