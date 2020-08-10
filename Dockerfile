FROM node:13.10.1-alpine
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet --no-optional
CMD node app.js