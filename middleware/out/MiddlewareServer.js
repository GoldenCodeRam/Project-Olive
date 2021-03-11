"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var MongoDatabase_1 = __importDefault(require("./MongoDatabase"));
var DatabaseMonitor_1 = __importDefault(require("./DatabaseMonitor"));
var MiddlewareServer = /** @class */ (function () {
    function MiddlewareServer() {
        this._application = express_1.default();
        this._mongoDatabase = new MongoDatabase_1.default();
        this._databaseMonitor = new DatabaseMonitor_1.default();
        this._databaseMonitor.startMonitoring();
        this._application.use(express_1.default.json());
        this._application.use(function (request, response, next) {
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Headers', '*');
            next();
        });
        this.setGetMethods();
        this.setPostMethods();
        this._application.listen(8082, function () {
            console.log("Middleware running at localhost:8082");
        });
    }
    MiddlewareServer.prototype.setGetMethods = function () {
        var _this = this;
        this._application.get('/getInformation', function (request, response) {
            console.log("Sending information to client...");
            var databaseEntriesPromise = _this._mongoDatabase.getDatabaseEntries();
            if (databaseEntriesPromise) {
                databaseEntriesPromise.then(function (entries) {
                    response.json({ documents: entries });
                });
            }
            else {
                response.sendStatus(500);
            }
        });
    };
    MiddlewareServer.prototype.setPostMethods = function () {
        var _this = this;
        this._application.post('/sendInformation', function (request, response) {
            console.log("Getting information from client...");
            _this._mongoDatabase.sendDatabaseEntry(request.body);
            response.sendStatus(200);
        });
    };
    return MiddlewareServer;
}());
exports.default = MiddlewareServer;
