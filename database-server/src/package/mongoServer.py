import pymongo as pm

from pymongo import database
from pymongo import client_session

TEST_HOST_DIRECTION = "mongodb://192.168.0.14:27017/"

HOST_NAME = "mongo"
HOST_PORT = 27017

class MongoServer:
  def __init__(self):
    self._database_client = pm.MongoClient(HOST_NAME, HOST_PORT, serverSelectionTimeoutMs=5000)

  def write_document_to_database(self, documents: dict):
    try:
      database = self._database_client.get_database("user_database")
      collection = database.get_collection("user_collection")
      for element in documents:
        collection.insert_one(element)
        
    except Exception as ex:
      print("The connection to the MongoDB client couldn't be made!")
      print(ex)

  def get_document_from_database(self) -> dict:
    dictionaries: dict = {}

    try:
      database = self._database_client.get_database("user_database")
      collection = database.get_collection("user_collection")
      cursor = collection.find({})

      documents = []

      document: dict
      for document in cursor:
        dictionary = dict(zip(document.keys(), document.values()))
        documents.append(dictionary)

      dictionaries.setdefault("documents", documents)

    except Exception: 
      print("The connection to the MongoDB client couldn't be made!")

    finally:
      return dictionaries
