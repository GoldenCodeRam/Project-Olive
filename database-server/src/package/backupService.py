import threading
import time
import sys

from package.mongoServer import MongoServer
from package.mongoServerBackup import MongoServerBackup

SECONDS_PER_BACKUP = 10

class BackupService: 
  def __init__(self):
    sys.stdout.writelines("Starting database backup server!\n")
    self._mongo_server_backup = MongoServerBackup()
    threading.Thread(name="mongo_monitor", target=self._start_constant_database_backup).start()

  def _start_constant_database_backup(self):
    mongoServer = MongoServer()
    while True:
      try:
        sys.stdout.write("Making database backup...\n")
        self._mongo_server_backup.make_database_backup()
      except Exception:
        print("Database disconnected!")
      time.sleep(SECONDS_PER_BACKUP)
