import axios from "axios";

const DATABASE_URL = "http://localhost:8081/"

export default class MongoDatabase {
  public getDatabaseEntries(): Promise<any> {
    return axios.get(DATABASE_URL).then((response) => {
      return response.data;
    })
  }

  public sendDatabaseEntry(entry: JSON): void {
    const postObject = { "documents": [entry] }

    axios({
      method: "POST",
      url: DATABASE_URL,
      data: postObject,
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }
}

export {
  DATABASE_URL
}