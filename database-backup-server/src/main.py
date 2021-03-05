import pymongo as pm

from pymongo import database

database_client: pm.MongoClient = pm.MongoClient("mongodb://192.168.0.14:27017/", serverSelectionTimeoutMs=5000)
database_client.start_session()

test_database: database.Database = database_client.get_database("test-database")
test_collection = test_database.get_collection("test-collection")
test_collection.insert_one({"Test": 1})

cursor = test_collection.find({})

document: dict
for document in cursor:
  print(document.get("Test"))