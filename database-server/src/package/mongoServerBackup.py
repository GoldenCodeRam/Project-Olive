import sys

import pymongo as pm

from pymongo import database
from pymongo import client_session
from package.mongoServer import MongoServer

HOST_NAME = "mongodb://e53cd83f6d9e"
HOST_PORT = 8084

class MongoServerBackup:
  def __init__(self):
    self._database_client = pm.MongoClient(host=HOST_NAME, port=HOST_PORT, serverSelectionTimeoutMs=5000)
    self._mongo_server = MongoServer()

  def make_database_backup(self):
    documents: dict = self._mongo_server.get_document_from_database()
    self._write_document_to_backup_database(documents)

  def _write_document_to_backup_database(self, documents: dict):
    try:
      database = self._database_client.get_database("user_backup_database")
      collection = database.get_collection("user_backup_collection")

      print(collection, database)
      sys.stdout.write("Connection stablished with backup database!\n")
      sys.stdout.write("Writing to backup database...\n")
      element: dict
      for element in documents.get("documents"):
        print(collection.find({}))
        if collection.find_one_and_replace({"_id": element.get("_id")}, element) == None:
          print(collection.insert_one(element))
        
    except Exception as ex:
      sys.stdout.write("The connection to the MongoDB client couldn't be made!\n")
      print(ex)
