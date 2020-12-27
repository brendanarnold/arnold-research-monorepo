"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = exports.isString = exports.hasLength = exports.isBoolean = exports.isNullOrUndefined = void 0;
var isNullOrUndefined = function (value) { return value === null || typeof value === 'undefined'; };
exports.isNullOrUndefined = isNullOrUndefined;
var isBoolean = function (value) { return typeof value === 'boolean'; };
exports.isBoolean = isBoolean;
var hasLength = function (value) { return typeof value !== 'undefined'
    && value !== null
    && value.hasOwnProperty('length'); };
exports.hasLength = hasLength;
var isString = function (value) { return typeof value === 'string' || value instanceof String; };
exports.isString = isString;
var isNumber = function (value) { return typeof value === 'number'; };
exports.isNumber = isNumber;
