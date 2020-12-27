"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var monitor_1 = require("@tngbl/monitor");
var info_1 = __importDefault(require("./routes/info"));
var monitor = new monitor_1.Monitor();
var app = express_1.default();
app.use('/info', info_1.default);
var server = app.listen(8080, function () {
    var address = server.address().address;
    var port = server.address().port;
    monitor.trace({ message: "Example app listening at http://" + address + ":" + port });
});
