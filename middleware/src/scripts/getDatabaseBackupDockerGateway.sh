#! bin/bash

BACKUP_DATABASE_NETWORK_NAME="database-backup-server_default"

GATEWAY=$(docker network inspect $BACKUP_DATABASE_NETWORK_NAME | grep Gateway)

echo $GATEWAY | sed 's/"//g' | sed 's/Gateway: //g'