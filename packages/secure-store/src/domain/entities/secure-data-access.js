"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureDataAccess = exports.AccessRule = void 0;
var AccessRule;
(function (AccessRule) {
    AccessRule["Permitted"] = "PERMITTED";
    AccessRule["Denied"] = "DENIED";
})(AccessRule = exports.AccessRule || (exports.AccessRule = {}));
var SecureDataAccess = /** @class */ (function () {
    function SecureDataAccess() {
    }
    SecureDataAccess.fromStore = function (storeObj) {
        // @todo
        return new SecureDataAccess();
    };
    return SecureDataAccess;
}());
exports.SecureDataAccess = SecureDataAccess;
