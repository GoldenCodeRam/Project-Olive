FROM python:alpine

WORKDIR /src

RUN pip install pymongo

EXPOSE 8081

COPY . .

CMD ["python3", "-u", "src/main.py"]