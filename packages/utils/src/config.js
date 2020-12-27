"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.config();
exports.default = {
    // Certs
    MASTER_RSA_PUBLIC_KEY: process.env.MASTER_RSA_PUBLIC_KEY,
    MASTER_RSA_PRIVATE_KEY: process.env.MASTER_RSA_PUBLIC_KEY,
    MASTER_AES_KEY: process.env.MASTER_AES_KEY,
};
