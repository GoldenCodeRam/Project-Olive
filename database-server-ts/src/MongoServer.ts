import mongoose from 'mongoose';

export default class MongoServer {
  private MONGO_DB_URL = "mongodb://mongo:27017/userDatabase"

  private _schema = new mongoose.Schema({
    name: String,
    game: String,
    food: String
  }, { versionKey: false });

  private _connection: typeof mongoose | undefined;

  constructor() {
    this.connectToDatabase()?.then((mongoose) => {
      this._connection = mongoose;
    }, (error) => {
      console.log(error);
    });
  }

  public writeDocumentToDatabase(document: any) {
    if (this._connection) {
      const Model = mongoose.model("Model", this._schema);

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
      return mongoose.connect(this.MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    console.log(error)
  }
}