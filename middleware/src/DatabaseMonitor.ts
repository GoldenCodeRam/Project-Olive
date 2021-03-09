import axios from "axios";
import { DATABASE_URL } from "./MongoDatabase";

const MONITOR_TIMEOUT = 5000

export default class DatabaseMonitor {
  public startMonitoring(): void {
    this.checkDatabaseStatus();
  }

  private checkDatabaseStatus(): void{
    axios.get(DATABASE_URL).then((result) => {
      setTimeout(() => this.checkDatabaseStatus(), MONITOR_TIMEOUT.valueOf())
    }, (error) => {
      console.log("Error from the database! Trying to make a new one with the backup...")
    });
  }
}