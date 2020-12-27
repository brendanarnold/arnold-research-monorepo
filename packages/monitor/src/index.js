"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monitor = exports.AuditToken = void 0;
var AuditToken = /** @class */ (function () {
    function AuditToken() {
    }
    return AuditToken;
}());
exports.AuditToken = AuditToken;
var Monitor = /** @class */ (function () {
    function Monitor() {
        var _this = this;
        this.tags = [];
        this.withTags = function (tags) {
            var _a;
            (_a = _this.tags).push.apply(_a, tags);
            return _this;
        };
        this.audit = function (_a) {
            var message = _a.message, error = _a.error;
            if (error) {
                console.error(error);
            }
            else {
                console.log(message);
            }
        };
        this.trace = function (_a) {
            var message = _a.message, error = _a.error;
            if (error) {
                console.error(error);
            }
            else {
                console.log(message);
            }
        };
        this.metric = function (_a) {
            var message = _a.message, value = _a.value;
            console.log(message + " [" + value + "]");
        };
    }
    return Monitor;
}());
exports.Monitor = Monitor;
