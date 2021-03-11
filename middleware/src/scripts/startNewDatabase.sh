#! bin/null

cd ../database-server-ts

sleep 10s

BACKUP_DATABASE_GATEWAY=$1 docker-compose up -d &> /dev/null;

DATABASE_STATUS=$(curl -sI localhost:8081 | grep HTTP/1.1)

while [[ $(curl -sI localhost:8081 | grep HTTP/1.1) != *200* ]]
do
sleep 1s
done

echo 1