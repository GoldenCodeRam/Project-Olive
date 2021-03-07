"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Middleware = /** @class */ (function () {
    function Middleware() {
        this._application = express_1.default();
        this._application.use(express_1.default.json());
        this.setGetMethods();
        this.setPostMethods();
        this._application.listen(8081, function () {
            console.log("Middleware running at localhost:8080");
        });
    }
    Middleware.prototype.setGetMethods = function () {
    };
    Middleware.prototype.setPostMethods = function () {
        this._application.post('/sendInformation', function (request, response) {
            console.log(request.headers);
            console.log(request.body);
            response.sendStatus(200);
        });
    };
    return Middleware;
}());
exports.default = Middleware;
