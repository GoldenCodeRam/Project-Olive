import logging

from http.server import HTTPServer
from package.server import Server

import threading

HOST_NAME = "0.0.0.0"
SERVER_PORT = 8081

# Entry point for the server

if __name__ == "__main__":
  httpServer = HTTPServer((HOST_NAME, SERVER_PORT), Server)
  logging.info(f"Server started at http://{HOST_NAME}:{SERVER_PORT}")
  try:
    httpServer.serve_forever()
  except KeyboardInterrupt:
    httpServer.server_close()
    threading._shutdown()
    print("Server stopped")