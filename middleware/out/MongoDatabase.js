"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_URL = void 0;
var axios_1 = __importDefault(require("axios"));
var DATABASE_URL = "http://localhost:8081/";
exports.DATABASE_URL = DATABASE_URL;
var MongoDatabase = /** @class */ (function () {
    function MongoDatabase() {
    }
    MongoDatabase.prototype.getDatabaseEntries = function () {
        try {
            return axios_1.default.get(DATABASE_URL).then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error.code);
            });
        }
        catch (exception) {
            console.log(exception);
        }
    };
    MongoDatabase.prototype.sendDatabaseEntry = function (entry) {
        var postObject = { "documents": [entry] };
        try {
            axios_1.default({
                method: "POST",
                url: DATABASE_URL,
                data: postObject,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                console.log(response.status);
            }, function (error) {
                console.log(error.code);
            });
        }
        catch (exception) {
            console.log(exception);
        }
    };
    return MongoDatabase;
}());
exports.default = MongoDatabase;
