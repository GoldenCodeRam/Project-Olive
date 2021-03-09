import express from 'express';
import MongoServer from './MongoServer';
import MongoServerBackup from './MongoServerBackup';

const DATABASE_SERVER_PORT = 8081

export default class DatabaseServer {
  private DOCUMENT_MAIN_KEY = 'documents'
  private _application: express.Express = express();
  private _mongoServer: MongoServer = new MongoServer();
  private _mongoServerBackup: MongoServerBackup = new MongoServerBackup();
  
  constructor() {
    this._application.use(express.json());

    this.setGetMethods();
    this.setPostMethods();

    this._application.listen(DATABASE_SERVER_PORT, () => {
      console.log(`Middleware running at localhost:${DATABASE_SERVER_PORT}`)
    })
  }

  private setGetMethods() {
    this._application.get('/', (request, response) => {
      this._mongoServer.getDocumentFromDatabase().then((documentList) => {
        response.json(documentList);
        response.sendStatus(200);
      }, (error) => {
        response.sendStatus(400);
      });
    })
  }

  private setPostMethods() {
    this._application.post('/', (request, response) => {
      const documentPost = request.body
      if (documentPost[this.DOCUMENT_MAIN_KEY] != undefined) {
        this._mongoServer.writeDocumentToDatabase(documentPost[this.DOCUMENT_MAIN_KEY][0])
      }
      response.sendStatus(200);
    });
  }
}