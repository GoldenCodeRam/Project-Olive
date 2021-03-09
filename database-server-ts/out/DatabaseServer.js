"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var MongoServer_1 = __importDefault(require("./MongoServer"));
var DATABASE_SERVER_PORT = 8082;
var DatabaseServer = /** @class */ (function () {
    function DatabaseServer() {
        this.DOCUMENT_MAIN_KEY = 'documents';
        this._application = express_1.default();
        this._mongoServer = new MongoServer_1.default();
        this._application.use(express_1.default.json());
        this.setGetMethods();
        this.setPostMethods();
        this._application.listen(DATABASE_SERVER_PORT, function () {
            console.log("Middleware running at localhost:" + DATABASE_SERVER_PORT);
        });
    }
    DatabaseServer.prototype.setGetMethods = function () {
        this._application.get('/', function (request, response) {
            response.sendStatus(200);
        });
    };
    DatabaseServer.prototype.setPostMethods = function () {
        var _this = this;
        this._application.post('/', function (request, response) {
            var documentPost = request.body;
            if (documentPost[_this.DOCUMENT_MAIN_KEY] != undefined) {
                _this._mongoServer.writeDocumentToDatabase(documentPost[_this.DOCUMENT_MAIN_KEY]);
            }
            response.sendStatus(200);
        });
    };
    return DatabaseServer;
}());
exports.default = DatabaseServer;
