FROM node:18

WORKDIR /app/auth-service
COPY auth-service/package.json ./package.json
COPY auth-service/index.js ./index.js
COPY auth-service/db.js ./db.js

RUN apt-get update && apt-get install -y netcat-openbsd

COPY wait-for-mysql.sh ./wait-for-mysql.sh
RUN chmod +x wait-for-mysql.sh

RUN npm install

CMD ["./wait-for-mysql.sh", "npm", "start"]

