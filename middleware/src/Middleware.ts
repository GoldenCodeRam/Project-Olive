import express from 'express';
import MongoDatabase from './MongoDatabase';
import DatabaseMonitor from './DatabaseMonitor';

export default class Middleware {
  private _application: express.Express = express();
  private _mongoDatabase: MongoDatabase = new MongoDatabase();

  private _databaseMonitor: DatabaseMonitor = new DatabaseMonitor();

  constructor() {
    this._databaseMonitor.startMonitoring();

    this._application.use(express.json());
    this._application.use((request, response, next) => {
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Headers', '*');
      next();
    })

    this.setGetMethods();
    this.setPostMethods();

    this._application.listen(8082, () => {
      console.log(`Middleware running at localhost:8082`)
    })
  }

  private setGetMethods() {
    this._application.get('/getInformation', (request, response) => {
      console.log("Sending information to client...")
      const databaseEntriesPromise = this._mongoDatabase.getDatabaseEntries();
      databaseEntriesPromise.then((entries) => {
        response.json(entries);
      })
    })
  }

  private setPostMethods() {
    this._application.post('/sendInformation', (request, response) => {
      console.log("Getting information from client...")
      this._mongoDatabase.sendDatabaseEntry(request.body);
      response.sendStatus(200);
    });
  }
}