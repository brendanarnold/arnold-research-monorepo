"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptAes = exports.encryptAes = void 0;
var crypto = __importStar(require("crypto"));
var config_1 = __importDefault(require("../config"));
var encryptAes = function (value) {
    var iv = crypto.randomBytes(16);
    var encryptionMethod = 'aes-256-ctr';
    var cipher = crypto.createCipheriv(encryptionMethod, config_1.default.MASTER_AES_KEY, iv);
    // cipher.update(value, 'utf8', 'binary')
    var encryptedValue = cipher.final('binary');
    return {
        iv: iv,
        encryptedValue: encryptedValue,
        encryptionMethod: encryptionMethod
    };
};
exports.encryptAes = encryptAes;
var decryptAes = function (encryptedValue, iv, encryptionMethod) {
    var decipher = crypto.createDecipheriv(encryptionMethod, config_1.default.MASTER_AES_KEY, iv);
    // decipher.update(encryptedValue, 'binary', 'utf8')
    var value = decipher.final('utf8');
    return { value: value };
};
exports.decryptAes = decryptAes;
