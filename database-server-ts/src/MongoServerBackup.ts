import mongoose from "mongoose";
import MongoServer from "./MongoServer";

export default class MongoServerBackup {
  private MONGO_DB_BACKUP_URL = "mongodb://172.18.0.1:8084/userDatabase"

  private _schema = new mongoose.Schema({
    name: String,
    game: String,
    food: String
  }, { versionKey: false });

  private _mongoServer: MongoServer = new MongoServer();

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
      this._mongoServer.getDocumentsFromDatabase().then((documents: any[]) => {
        this.writeDocumentsToBackupDatabase(documents)
        setTimeout(() => this.startBackupService(), 5000);
      });
    })();
  }

  public writeDocumentsToBackupDatabase(documents: any[]) {
    if (this._connection) {
      const Model = this._connection.model("Model", this._schema);

      for (const index in documents) {
        Model.findByIdAndUpdate(documents[index]["_id"], documents[index], { useFindAndModify: false }).then((document) => {
          if (!document) {
            Model.create({
              _id: documents[index]["_id"],
              name: documents[index]["name"],
              game: documents[index]["game"],
              food: documents[index]["food"]
            }, (error: any, doc: any) => {
              if (error) console.log(error);
              console.log(doc);
            })
          }
        }, (error) => {
          console.log("Error: " + error);
        });
      }
    }
  }

  public async getDocumentFromDatabase(): Promise<any[]> {
    const documentList = []

    if (this._connection) {
      const Model = mongoose.model("Model", this._schema);
      const cursor = Model.find().cursor();

      for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        documentList.push(doc);
      }
    }
    return documentList;
  }

  private connectToDatabase() {
    try {
      console.log("Trying to connect to backup database...");
      return mongoose.createConnection(this.MONGO_DB_BACKUP_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    console.log(error)
  }
}