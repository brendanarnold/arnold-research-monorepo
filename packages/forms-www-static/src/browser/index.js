"use strict";
exports.__esModule = true;
exports.PageValidationPlugin = void 0;
var node_polyglot_1 = require("node-polyglot");
var forms_1 = require("@tngbl/forms");
var components_1 = require("../templates/components");
var PageValidationPlugin = /** @class */ (function () {
    function PageValidationPlugin() {
        this.name = 'page-validation';
        this.pageValidationHooks = [];
    }
    PageValidationPlugin.prototype.register = function (formModule) {
        this.formModule = formModule;
        this.formModule.plugin['page-validation'] = this;
    };
    PageValidationPlugin.prototype.withCore = function () {
        this.withHooks(components_1.eventHooks);
        return this;
    };
    PageValidationPlugin.prototype.withHooks = function (hooks) {
        var _a;
        (_a = this.pageValidationHooks).push.apply(_a, hooks);
        return this;
    };
    PageValidationPlugin.prototype.activate = function (component) {
        var _this = this;
        var _a;
        // @todo Get the proper polyglot instance
        var polyglot = new node_polyglot_1.Polyglot();
        if (component instanceof forms_1.Form) {
            this.activate(component.schema);
        }
        else if (component instanceof forms_1.FieldSet) {
            component.structure.forEach(function (el) { return _this.activate(el); });
        }
        else if (component instanceof forms_1.Field) {
            (_a = this.pageValidationHooks
                .find(function (hook) { return hook.componentName === component.viewType; })) === null || _a === void 0 ? void 0 : _a.registerHook(component.name, component, polyglot);
        }
    };
    return PageValidationPlugin;
}());
exports.PageValidationPlugin = PageValidationPlugin;
