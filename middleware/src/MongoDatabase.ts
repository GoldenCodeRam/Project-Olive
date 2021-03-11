import axios from "axios";

const DATABASE_URL = "http://localhost:8081/"

export default class MongoDatabase {
  public getDatabaseEntries(): Promise<any> | undefined {
    try {
      return axios.get(DATABASE_URL).then((response) => {
        return response.data;
      }, (error) => {
        console.log(error.code);
      });
    } catch(exception) {
      console.log(exception);
    }
  }

  public sendDatabaseEntry(entry: JSON): void {
    const postObject = { "documents": [entry] }

    try {
      axios({
        method: "POST",
        url: DATABASE_URL,
        data: postObject,
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        console.log(response.status);
      }, (error) => {
        console.log(error.code);
      });
    } catch(exception) {
      console.log(exception);
    }
  }
}

export {
  DATABASE_URL
}