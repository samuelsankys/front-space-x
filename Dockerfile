FROM node:18.16-alpine

WORKDIR /front

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5001

RUN npm run build

CMD [ "npm", "run", "preview" ]