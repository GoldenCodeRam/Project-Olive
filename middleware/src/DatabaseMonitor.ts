/* eslint-disable @typescript-eslint/no-var-requires */
import axios from "axios";
import MongoDatabase, { DATABASE_URL } from "./MongoDatabase";
import { MongoClient } from "mongodb";
import { exec } from "child_process";

const MONGO_DB_BACKUP_URL = "mongodb://0.0.0.0:8084/";
const MONITOR_TIMEOUT = 5000;

export default class DatabaseMonitor {
  private _mongoBackupDatabase: MongoClient = new MongoClient(MONGO_DB_BACKUP_URL);

  public startMonitoring(): void {
    console.log("Starting database monitoring...")
    this.checkDatabaseStatus();
  }

  private async checkDatabaseStatus(): Promise<void> {
    axios.get(DATABASE_URL).then(async (result) => {
      setTimeout(() => this.checkDatabaseStatus(), MONITOR_TIMEOUT.valueOf());
    }, async (error) => {
      console.log("Error from the database! Trying to make a new one with the backup...")
      this.generateDatabaseFromBackup();
    });
  }

  private async generateDatabaseFromBackup() {
    try {
      this._mongoBackupDatabase = new MongoClient(MONGO_DB_BACKUP_URL);
      await this._mongoBackupDatabase.connect();
      await this._mongoBackupDatabase.db("admin").command({ ping: 1 });
      console.log("Successfully connected to backup server!");

      exec("bash ./src/scripts/getDatabaseBackupDockerGateway.sh", async (error, stdout, stderr) => {
        if (error) {
          console.error("Error on getting gateway: " + error);
          return;
        }
        console.log("Getting database gateway...")
        const backupDatabaseGateway = stdout;
        await this.createDatabase(backupDatabaseGateway);
      });
    } catch (error) {
      console.log(error);
    }
  }

  private async createDatabase(backupDatabaseGateway: string) {
    exec(`bash ./src/scripts/startNewDatabase.sh ${backupDatabaseGateway}`, async (error, stdout, stderr) => {
      if (stderr) {
        console.error(stderr);
        return;
      }
      if (stdout) {
        console.log("Finished loading new database");
        const databaseCursor = this._mongoBackupDatabase.db("userDatabase").collection("models").find()
        await databaseCursor.forEach((document) => {
          new MongoDatabase().sendDatabaseEntry(document)
        });
        this._mongoBackupDatabase.close();
        this.checkDatabaseStatus();
      }
    });
  }
}