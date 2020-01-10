# Development
FROM node:10-alpine
WORKDIR /client
COPY package*.json /client/
RUN npm install
ADD . /client/
RUN apk update && apk add bash
RUN npm rebuild node-sass
RUN npm audit fix
EXPOSE 3002
EXPOSE 35729
CMD ["npm", "start"]