import pymongo as pm

from pymongo import database
from pymongo import client_session

# database_client = pm.MongoClient("mongodb://192.168.0.14:27017/", serverSelectionTimeoutMs=5000)
# database_client.start_session()
# 
# test_database = database_client.get_database("test-database")
# test_collection = test_database.get_collection("test-collection")
# test_collection.insert_one({"Test": 1, "TEsting": "Generalitat", "Testing": {"testing": 123, "test": [1, 2, 3, 4]}})
# 
# cursor = test_collection.find({})
# 
# document: dict
# for document in cursor:
#   print(document)

HOST_NAME = "mongodb://192.168.0.14"
HOST_PORT = 27017

class MongoServer:
  def __init__(self):
    super().__init__()
    self._database_client = pm.MongoClient("mongodb://192.168.0.14:27017/", serverSelectionTimeoutMs=5000)

  def write_document_to_database(self, documents: dict):
    try:
      database = self._database_client.get_database("user_database")
      collection = database.get_collection("user_collection")
      for element in documents.items():
        collection.insert_one({element[0]: element[1]})
        
    except Exception as ex:
      print("The connection to the MongoDB client couldn't be made!")
      print(ex)

  def get_document_from_database(self):
    pass