"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionFactory = void 0;
var PermissionFactory = /** @class */ (function () {
    function PermissionFactory() {
    }
    PermissionFactory.register = function (type, fromPlainObject) {
        {
            PermissionFactory._permissionLookup[type] = fromPlainObject;
        }
    };
    PermissionFactory.fromPlainObject = function (obj) {
        var fromPlainObject = PermissionFactory._permissionLookup[obj.type];
        return fromPlainObject(obj);
    };
    PermissionFactory._permissionLookup = {};
    return PermissionFactory;
}());
exports.PermissionFactory = PermissionFactory;
