FROM node:12

WORKDIR /dylang21-momula2.0-1ad86bfd0ac6

COPY package*.json ./

RUN npm install

COPY . .


ENV PORT=8080

EXPOSE 8080

CMD [ "npm", "start"]