FROM node:16-alpine

WORKDIR /events

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]