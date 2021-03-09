import mongoose from "mongoose";

export default class MongoServerBackup {
  private MONGO_DB_URL = "mongodb://172.31.0.1:8084/userDatabase"

  private _schema = new mongoose.Schema({
    name: String,
    game: String,
    food: String
  }, { versionKey: false });

  private _connection: mongoose.Connection | undefined;

  constructor() {
    this.connectToDatabase()?.then((mongoose) => {
      this._connection = mongoose;
      this.startBackupService();
    }, (error) => {
      console.log(error);
    });
  }

  public startBackupService() {
    (async () => {
      console.log("Making backup of the database...")
      this.writeDocumentToBackupDatabase({x: 1});
      setTimeout(() => this.startBackupService(), 5000);
    })();
  }

  public writeDocumentToBackupDatabase(document: any) {
    if (this._connection) {
      const Model = this._connection.model("Model", this._schema);

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

  public async getDocumentFromDatabase() {
    const documentList = []

    if (this._connection) {
      const Model = mongoose.model("Model", this._schema);
      const cursor = Model.find().cursor();

      for(let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        documentList.push(doc);
      }
    }
    return documentList;
  }

  private connectToDatabase() {
    try {
      console.log("Trying to connect to database...");
      return mongoose.createConnection(this.MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    console.log(error)
  }
}