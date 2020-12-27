"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataField = exports.FormSchema = exports.DataSet = exports.StorageType = void 0;
var types_1 = require("@tngbl/utils/types");
var auth_1 = require("@tngbl/auth");
var secure_store_1 = require("@tngbl/secure-store");
var validations_1 = require("./validations");
var triggers_1 = require("./triggers");
var exceptions_1 = require("./exceptions");
/**
 * Defines the type used in the persistence layer
 */
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
})(StorageType = exports.StorageType || (exports.StorageType = {}));
var DataSet = /** @class */ (function () {
    function DataSet() {
        this.schema = [];
        this.validations = [];
        this.isRequired = true;
    }
    DataSet.prototype.validate = function (data) {
        var formErrors = this.validations
            .map(function (validation) { return validation.validate(data); })
            .flatMap(function (vResult) { return vResult.errors; });
        var componentErrors = this.schema
            .map(function (component) { return component.validate(data[component.name]); })
            .flatMap(function (vRes) { return vRes.errors; });
        var result = new validations_1.ValidationResult();
        result.errors = formErrors.concat(componentErrors);
        return result;
    };
    DataSet.prototype.toPlainObject = function () {
        return {
            name: this.name,
            type: DataSet.type,
            schema: this.schema.map(function (s) { return s.toPlainObject(); }),
            validations: this.validations.map(function (v) { return v.toPlainObject(); }),
            isRequired: types_1.isBoolean(this.isRequired)
                ? this.isRequired
                : this.isRequired.toPlainObject()
        };
    };
    DataSet.fromPlainObject = function (obj) {
        var dataSet = new DataSet();
        if (types_1.isNullOrUndefined(obj)) {
            throw new exceptions_1.FormSyntaxError("Cannot convert null or undefined to type '" + DataSet.type + "'");
        }
        if (!types_1.isString(obj.name)) {
            throw new exceptions_1.FormSyntaxError("Property 'name' is not a string");
        }
        dataSet.name = obj.name;
        dataSet.validations = obj.validations.map(function (valObj) { return validations_1.ValidationFactory.fromPlainObject(valObj); });
        dataSet.schema = obj.schema.map(function (valObj) { return valObj.type === DataField.type
            ? DataField.fromPlainObject(valObj)
            : DataSet.fromPlainObject(valObj); });
        dataSet.isRequired = types_1.isBoolean(obj.isRequired)
            ? obj.isRequired
            : triggers_1.DataTriggerFactor.fromPlainObject(obj);
        return dataSet;
    };
    DataSet.type = 'DataSet';
    return DataSet;
}());
exports.DataSet = DataSet;
var FormSchema = /** @class */ (function () {
    function FormSchema(name, schemaVersion) {
        this.schema = [];
        this.validations = [];
        this.name = name;
        this.schemaVersion = schemaVersion;
    }
    FormSchema.prototype.withSchema = function (schemaItems) {
        var _a;
        (_a = this.schema).push.apply(_a, schemaItems);
        return this;
    };
    FormSchema.prototype.withValidations = function (validations) {
        var _a;
        (_a = this.validations).push.apply(_a, validations);
        return this;
    };
    FormSchema.prototype.validate = function (data) {
        var formErrors = this.validations
            .map(function (validation) { return validation.validate(data); })
            .flatMap(function (vResult) { return vResult.errors; });
        var schemaErrors = this.schema
            .map(function (component) { return component.validate(data[component.name]); })
            .flatMap(function (vRes) { return vRes.errors; });
        var result = new validations_1.ValidationResult();
        result.errors = formErrors.concat(schemaErrors);
        return result;
    };
    FormSchema.prototype.toPlainObject = function () {
        return {
            name: this.name,
            type: FormSchema.type,
            storageVersion: FormSchema.storageVersion,
            schemaVersion: this.schemaVersion,
            schema: this.schema.map(function (schemaItem) { return schemaItem.toPlainObject(); }),
            validations: this.validations.map(function (v) { return v.toPlainObject(); })
        };
    };
    FormSchema.prototype.toJson = function () {
        return JSON.stringify(this.toPlainObject(), null, 2);
    };
    FormSchema.fromPlainObject = function (obj) {
        if (types_1.isNullOrUndefined(obj)) {
            throw new exceptions_1.FormSyntaxError("Cannot convert null or undefined to type " + FormSchema.type);
        }
        if (obj.type !== FormSchema.type) {
            throw new exceptions_1.FormSyntaxError("Object is not of " + FormSchema.type + " type, is '" + obj.type + "'");
        }
        if (!types_1.isNumber(obj.storageVersion)) {
            throw new exceptions_1.FormSyntaxError("Property 'storageVersion' is not a string, is '" + obj.storageVersion + "'");
        }
        if (!types_1.isString(obj.name)) {
            throw new exceptions_1.FormSyntaxError("Property 'name' is not a string, is '" + obj.name + "'");
        }
        if (!Array.isArray(obj.schema)) {
            throw new exceptions_1.FormSyntaxError("Property 'schema' is not an array, is '" + obj.schema + "'");
        }
        if (!Array.isArray(obj.validations)) {
            throw new exceptions_1.FormSyntaxError("Property 'validations' is not an array, is " + obj.validations);
        }
        var form = new FormSchema(obj.name, obj.schemaVersion);
        form.validations = obj.validations.map(function (valObj) { return validations_1.ValidationFactory.fromPlainObject(valObj); });
        form.schema = obj.schema.map(function (valObj) { return valObj.type === DataField.type
            ? DataField.fromPlainObject(valObj)
            : DataSet.fromPlainObject(valObj); });
        return form;
    };
    FormSchema.fromJson = function (jsonString) {
        var json;
        try {
            json = JSON.parse(jsonString);
        }
        catch (error) {
            if (error instanceof SyntaxError) {
                throw new exceptions_1.FormSyntaxError('JSON is not valid');
            }
        }
        return FormSchema.fromPlainObject(json);
    };
    /** Increment when make a breaking change to persistence marshalling */
    FormSchema.storageVersion = 1;
    FormSchema.type = 'FormSchema';
    return FormSchema;
}());
exports.FormSchema = FormSchema;
var DataField = /** @class */ (function () {
    function DataField(name, storageType, gdprPolicy) {
        this.permissions = [];
        this.validations = [];
        this.name = name;
        this.storageType = storageType;
        this.gdprPolicy = gdprPolicy;
    }
    DataField.prototype.withValidations = function (validations) {
        var _a;
        (_a = this.validations).push.apply(_a, validations);
        return this;
    };
    DataField.prototype.withPermissions = function (permissions) {
        var _a;
        (_a = this.permissions).push.apply(_a, permissions);
        return this;
    };
    DataField.prototype.validate = function (data) {
        var result = new validations_1.ValidationResult();
        result.errors = this.validations
            .map(function (v) { return v.validate(data); })
            .flatMap(function (vRes) { return vRes.errors; });
        return result;
    };
    DataField.prototype.toPlainObject = function () {
        return {
            name: this.name,
            type: DataField.type,
            storageType: this.storageType,
            gdprPolicy: this.gdprPolicy.toPlainObject(),
            permissions: this.permissions,
            validations: this.validations.map(function (v) { return v.toPlainObject(); })
        };
    };
    DataField.fromPlainObject = function (obj) {
        if (types_1.isNullOrUndefined(obj)) {
            throw new exceptions_1.FormSyntaxError("Cannot convert null or undefined into " + DataField.type + " object");
        }
        if (obj.type !== DataField.type) {
            throw new exceptions_1.FormSyntaxError("Property 'type' is not '" + DataField.type + "', is " + obj.type);
        }
        var gdprPolicy = secure_store_1.GdprPolicy.fromPlainObject(obj.gdprPolicy);
        var field = new DataField(obj.name, obj.storageType, gdprPolicy);
        field.permissions = obj.permissions.map(function (pObj) { return auth_1.PermissionFactory.fromPlainObject(pObj); });
        field.validations = obj.validations.map(function (vObj) { return validations_1.ValidationFactory.fromPlainObject(vObj); });
        return field;
    };
    DataField.type = 'DataField';
    return DataField;
}());
exports.DataField = DataField;
