"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var MongoDatabase_1 = require("./MongoDatabase");
var MONITOR_TIMEOUT = 5000;
var DatabaseMonitor = /** @class */ (function () {
    function DatabaseMonitor() {
    }
    DatabaseMonitor.prototype.startMonitoring = function () {
        this.checkDatabaseStatus();
    };
    DatabaseMonitor.prototype.checkDatabaseStatus = function () {
        var _this = this;
        axios_1.default.get(MongoDatabase_1.DATABASE_URL).then(function (result) {
            setTimeout(function () { return _this.checkDatabaseStatus(); }, MONITOR_TIMEOUT.valueOf());
        }, function (error) {
            console.log("Error from the database! Trying to make a new one with the backup...");
        });
    };
    return DatabaseMonitor;
}());
exports.default = DatabaseMonitor;
