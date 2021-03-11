import mongoose from 'mongoose';

export default class MongoServer {
  private MONGO_DB_URL = "mongodb://mongo:27017/userDatabase"

  private _schema = new mongoose.Schema({
    name: String,
    game: String,
    food: String
  }, { versionKey: false });

  private _connection: mongoose.Connection | undefined;

  constructor() {
    this.connectToDatabase()?.then((mongoose) => {
      this._connection = mongoose;
    }, (error) => {
      console.log(error);
    });
  }

  public writeDocumentToDatabase(document: any) {
    if (this._connection) {
      const Model = this._connection.model("Model", this._schema);

      if (document["_id"]) {
        Model.create({
          _id: document["_id"],
          name: document["name"],
          game: document["game"],
          food: document["food"]
        }, (error: any, doc: any) => {
          if (error) console.log(error);
          console.log(doc);
        });
      } else {
        Model.create({
          name: document["name"],
          game: document["game"],
          food: document["food"]
        }, (error, doc) => {
          if (error) console.log(error);
          console.log(doc);
        });
      }
    }
  }

  public async getDocumentsFromDatabase() {
    const documentList = []

    if (this._connection) {
      const Model = this._connection.model("Model", this._schema);
      for (const document of await Model.find()) {
        documentList.push(document);
      }
    }
    return documentList;
  }

  private async connectToDatabase() {
    try {
      console.log("Trying to connect to local database...");
      return mongoose.createConnection(this.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    console.log(error)
  }
}