import express from 'express';

export default class Middleware {
  private _application: express.Express = express();

  constructor() {
    this._application.use(express.json());

    this.setGetMethods();
    this.setPostMethods();

    this._application.listen(8081, () => {
      console.log(`Middleware running at localhost:8080`)
    })
  }

  private setGetMethods() {
    this._application.get('/getInformation', (request, response) => {
      
    })
  }

  private setPostMethods() {
    this._application.post('/sendInformation', (request, response) => {
      console.log(request.headers);
      console.log(request.body);
      response.sendStatus(200);
    });
  }
}