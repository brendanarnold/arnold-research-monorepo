"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidation = exports.StringMaxLengthValidation = exports.StringMinLengthValidation = exports.ValidationFactory = exports.ValidationResult = exports.ValidationError = void 0;
var localisation_1 = require("../../localisation");
var utils_1 = require("@tngbl/utils");
var ValidationError = /** @class */ (function () {
    function ValidationError(fields, validationType, errorString) {
        this.fields = fields;
        this.validationType = validationType;
        this.errorString = errorString;
    }
    return ValidationError;
}());
exports.ValidationError = ValidationError;
var ValidationResult = /** @class */ (function () {
    function ValidationResult() {
        this.errors = [];
    }
    Object.defineProperty(ValidationResult.prototype, "isValid", {
        get: function () { return !!this.errors.length; },
        enumerable: false,
        configurable: true
    });
    return ValidationResult;
}());
exports.ValidationResult = ValidationResult;
var ValidationFactory = /** @class */ (function () {
    function ValidationFactory() {
    }
    ValidationFactory.register = function (type, fromPlainObject) {
        {
            ValidationFactory._validationLookup[type] = fromPlainObject;
        }
    };
    ValidationFactory.fromPlainObject = function (obj) {
        var fromPlainObject = ValidationFactory._validationLookup[obj.type];
        return fromPlainObject(obj);
    };
    ValidationFactory._validationLookup = {};
    return ValidationFactory;
}());
exports.ValidationFactory = ValidationFactory;
var StringMinLengthValidation = /** @class */ (function () {
    function StringMinLengthValidation(name, length) {
        this.name = name;
        this.length = length;
    }
    StringMinLengthValidation.prototype.validate = function (data) {
        var result = new ValidationResult();
        if (!utils_1.hasLength(data)) {
            return result;
        }
        if (data.length < this.length) {
            var errorString = localisation_1.i18n.__('Minimum length is {{ length }} characters', { length: this.length });
            result.errors.push(new ValidationError([this.name], StringMinLengthValidation.type, errorString));
        }
        return result;
    };
    StringMinLengthValidation.prototype.toPlainObject = function () {
        return {
            name: this.name,
            type: StringMinLengthValidation.type,
            length: this.length,
        };
    };
    StringMinLengthValidation.fromPlainObject = function (obj) {
        if (obj.type !== StringMinLengthValidation.type) {
            throw TypeError("Cannot cast an object of type '" + obj.type + "' to StringMinLengthValidation");
        }
        return new StringMinLengthValidation(obj.name, obj.length);
    };
    StringMinLengthValidation.type = 'StringMinLengthValidation';
    return StringMinLengthValidation;
}());
exports.StringMinLengthValidation = StringMinLengthValidation;
ValidationFactory.register(StringMinLengthValidation.type, StringMinLengthValidation.fromPlainObject);
var StringMaxLengthValidation = /** @class */ (function () {
    function StringMaxLengthValidation(name, length) {
        this.name = name;
        this.length = length;
    }
    StringMaxLengthValidation.prototype.validate = function (data) {
        var result = new ValidationResult();
        if (!utils_1.hasLength(data)) {
            return result;
        }
        if (data.length > this.length) {
            var errorString = localisation_1.i18n.__('Maximum length is {{ length }} characters', { length: this.length });
            result.errors.push(new ValidationError([this.name], StringMaxLengthValidation.type, errorString));
        }
        return result;
    };
    StringMaxLengthValidation.prototype.toPlainObject = function () {
        return {
            name: this.name,
            type: StringMaxLengthValidation.type,
            length: this.length,
        };
    };
    StringMaxLengthValidation.fromPlainObject = function (obj) {
        if (obj.type !== StringMaxLengthValidation.type) {
            throw TypeError("Cannot cast an object of type '" + obj.type + "' to StringMaxLengthValidation");
        }
        return new StringMaxLengthValidation(obj.name, obj.length);
    };
    StringMaxLengthValidation.type = 'StringMaxLengthValidation';
    return StringMaxLengthValidation;
}());
exports.StringMaxLengthValidation = StringMaxLengthValidation;
ValidationFactory.register(StringMaxLengthValidation.type, StringMaxLengthValidation.fromPlainObject);
var EmailValidation = /** @class */ (function () {
    function EmailValidation(name) {
        this.name = name;
    }
    EmailValidation.prototype.validate = function (data) {
        var emailRegex = /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        var result = new ValidationResult();
        if (!emailRegex.test(data)) {
            var errorString = localisation_1.i18n.__('Not a valid email address');
            var error = new ValidationError([this.name], EmailValidation.type, errorString);
            result.errors.push(error);
        }
        return result;
    };
    EmailValidation.prototype.toPlainObject = function () {
        return {
            name: this.name,
            type: EmailValidation.type
        };
    };
    EmailValidation.fromPlainObject = function (obj) {
        if (obj.type !== EmailValidation.type) {
            throw TypeError("Cannot cast an object of type '" + obj.type + "' to EmailValidation");
        }
        return new EmailValidation(obj.name);
    };
    EmailValidation.type = 'EmailValidation';
    return EmailValidation;
}());
exports.EmailValidation = EmailValidation;
ValidationFactory.register(EmailValidation.type, EmailValidation.fromPlainObject);
