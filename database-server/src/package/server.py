import json

from http.server import BaseHTTPRequestHandler
from package.mongoServer import MongoServer
from package.backupService import BackupService

DOCUMENT_MAIN_KEY = "documents"

server_backup_service = BackupService()

class Server(BaseHTTPRequestHandler):
  def __init__(self, request, client_address, server):
    self._mongo_server = MongoServer()
    super().__init__(request, client_address, server)

  def do_OPTIONS(self):
    self.send_response(200)
    self.send_header('Access-Control-Allow-Origin', '*')
    self.send_header("Access-Control-Allow-Headers", "Content-Type")
    self.end_headers()

  def do_GET(self):
    self.send_response(200)
    self.send_header("Content-type", "application/json")
    self.send_header('Access-Control-Allow-Origin', '*')
    self.send_header("Access-Control-Allow-Headers", "Content-Type")
    self.end_headers()

    documents = json.dumps(self._mongo_server.get_document_from_database(), skipkeys=True, default=lambda x: str(x))

    self.wfile.write(bytes(documents, "utf8"))

  def do_POST(self):
    document_post: dict = self._get_json_content_from_request()
    if document_post.get(DOCUMENT_MAIN_KEY) != None:
      self._mongo_server.write_document_to_database(document_post.get(DOCUMENT_MAIN_KEY))
      self._set_response()
    else:
      self._set_error_response("The json request does not have an document key!")


  def _get_json_content_from_request(self) -> object:
    content_type = self.headers.get("content-type")
    if content_type != "application/json":
      self._set_error_response("Bad formatted request! It is not an application/json.")
    else:
      content_length = int(self.headers.get("content-length"))
      return json.loads(self.rfile.read(content_length))

  def _set_response(self):
    self.send_response(200)
    self.end_headers()

  def _set_error_response(self, message: str):
    self.send_response(400, message)
    self.end_headers()