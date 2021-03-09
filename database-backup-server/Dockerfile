FROM python:alpine

WORKDIR /src

RUN pip install pymongo

EXPOSE 8083

COPY . .

CMD ["python3", "src/main.py"]