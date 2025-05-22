FROM node:18

WORKDIR /app/books-service
COPY books-service/package.json ./package.json
COPY books-service/index.js ./index.js
COPY books-service/db.js ./db.js

RUN apt-get update && apt-get install -y netcat-openbsd

COPY wait-for-mysql.sh ./wait-for-mysql.sh
RUN chmod +x wait-for-mysql.sh

RUN npm install

CMD ["./wait-for-mysql.sh", "npm", "start"]

