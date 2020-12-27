"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.config();
exports.default = {
    // Postgres
    POSTGRES_CONNECTION_STRING: process.env.POSTGRES_CONNECTION_STRING
};
