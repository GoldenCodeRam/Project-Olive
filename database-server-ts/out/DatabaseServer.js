"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var MongoServer_1 = __importDefault(require("./MongoServer"));
var MongoServerBackup_1 = __importDefault(require("./MongoServerBackup"));
var DATABASE_SERVER_PORT = 8081;
var DatabaseServer = /** @class */ (function () {
    function DatabaseServer() {
        this.DOCUMENT_MAIN_KEY = 'documents';
        this._application = express_1.default();
        this._mongoServer = new MongoServer_1.default();
        this._mongoServerBackup = new MongoServerBackup_1.default();
        this._application.use(express_1.default.json());
        this.setGetMethods();
        this.setPostMethods();
        this._application.listen(DATABASE_SERVER_PORT, function () {
            console.log("Middleware running at localhost:" + DATABASE_SERVER_PORT);
        });
    }
    DatabaseServer.prototype.setGetMethods = function () {
        var _this = this;
        this._application.get('/', function (request, response) {
            _this._mongoServer.getDocumentsFromDatabase().then(function (documentList) {
                response.json(documentList);
            }, function (error) {
                response.sendStatus(400);
            });
        });
    };
    DatabaseServer.prototype.setPostMethods = function () {
        var _this = this;
        this._application.post('/', function (request, response) {
            var documentPost = request.body;
            if (documentPost[_this.DOCUMENT_MAIN_KEY] != undefined) {
                _this._mongoServer.writeDocumentToDatabase(documentPost[_this.DOCUMENT_MAIN_KEY][0]);
            }
            response.sendStatus(200);
        });
    };
    return DatabaseServer;
}());
exports.default = DatabaseServer;
