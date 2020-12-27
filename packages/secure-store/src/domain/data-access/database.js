"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var pg_1 = require("pg");
var monitor_1 = require("@tngbl/monitor");
var config_1 = __importDefault(require("../../config"));
var _pool;
var _init = function () {
    _pool = new pg_1.Pool({
        connectionString: config_1.default.POSTGRES_CONNECTION_STRING
    });
    var monitor = new monitor_1.Monitor();
    // Handles errors for idle connections in the pool
    _pool.on('error', function (error, client) {
        monitor.trace({ error: error });
        process.exit(-1); // @fixme Should this exit?
    });
};
var pool = function () {
    if (!_pool) {
        _init();
    }
    return _pool;
};
exports.pool = pool;
