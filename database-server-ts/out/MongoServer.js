"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var MongoServer = /** @class */ (function () {
    function MongoServer() {
        this.MONGO_DB_URL = "mongodb://mongo:27017";
        try {
            console.log("Trying to connect to database...");
            mongoose_1.default.connect(this.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(function (database) {
                console.log(database);
            }, function (error) {
                console.log(error);
            });
        }
        catch (exception) {
            console.log(exception);
        }
    }
    MongoServer.prototype.writeDocumentToDatabase = function (document) {
    };
    return MongoServer;
}());
exports.default = MongoServer;
