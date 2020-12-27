"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureData = exports.GdprPolicy = exports.GdprLifetime = exports.GdprDataType = void 0;
var utils_1 = __importDefault(require("@tngbl/utils"));
var GdprDataType;
(function (GdprDataType) {
    GdprDataType["Anonymised"] = "ANONYMISED";
    GdprDataType["Anonymous"] = "ANONYMOUS";
    GdprDataType["Personal"] = "PERSONAL";
    GdprDataType["SensitivePersonal"] = "SENSITIVE_PERSONAL";
})(GdprDataType = exports.GdprDataType || (exports.GdprDataType = {}));
var GdprLifetime;
(function (GdprLifetime) {
    GdprLifetime["Transient"] = "TRANSIENT";
    GdprLifetime["Persistent"] = "PERSISTENT";
})(GdprLifetime = exports.GdprLifetime || (exports.GdprLifetime = {}));
var GdprPolicy = /** @class */ (function () {
    function GdprPolicy(dataType, lifetimeSeconds) {
        // Lifetime in seconds
        this.lifetimeSeconds = GdprLifetime.Persistent;
        this.dataType = dataType;
        this.lifetimeSeconds = lifetimeSeconds;
    }
    GdprPolicy.prototype.toPlainObject = function () {
        return {
            type: GdprPolicy.type,
            dataType: this.dataType,
            lifetimeSeconds: this.lifetimeSeconds
        };
    };
    GdprPolicy.fromPlainObject = function (obj) {
        if (obj.type !== GdprPolicy.type) {
            throw TypeError("Cannot cast an object of type '" + obj.type + "' to GdprPolicy");
        }
        if (!utils_1.default.isNumber(obj.lifetimeSeconds)
            && !Object.values(GdprLifetime).includes(obj.lifetimeSeconds)) {
            throw TypeError("Invalid lifetimeSeconds property on GdprPolicy: " + obj.lifetimeSeconds);
        }
        return new GdprPolicy(obj.dataType, obj.lifetimeSeconds);
    };
    GdprPolicy.type = 'GdprPolicy';
    return GdprPolicy;
}());
exports.GdprPolicy = GdprPolicy;
var SecureData = /** @class */ (function () {
    function SecureData() {
    }
    SecureData.fromDbRow = function (row) {
        var ed = new SecureData();
        ed.id = row.id;
        ed.keyId = null;
        ed.encryptionMethod = row.encryption_method;
        ed.encryptedJson = row.encrypted_json;
        ed.encryptionIv = row.encryption_iv;
        ed.expiresOn = row.expires_on;
        ed.createdOn = row.created_on;
        ed.gdprType = row.gdpr_type;
        ed.decryptedValue = utils_1.default.decryptAes(ed.encryptedJson, ed.encryptionIv, ed.encryptionMethod);
        return ed;
    };
    return SecureData;
}());
exports.SecureData = SecureData;
