"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTriggerFactor = void 0;
var DataTriggerFactor = /** @class */ (function () {
    function DataTriggerFactor() {
    }
    DataTriggerFactor.register = function (type, fromPlainObject) {
        {
            DataTriggerFactor._dataTriggerLookup[type] = fromPlainObject;
        }
    };
    DataTriggerFactor.fromPlainObject = function (obj) {
        var fromPlainObject = DataTriggerFactor._dataTriggerLookup[obj.type];
        return fromPlainObject(obj);
    };
    DataTriggerFactor._dataTriggerLookup = {};
    return DataTriggerFactor;
}());
exports.DataTriggerFactor = DataTriggerFactor;
