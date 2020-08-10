FROM node:13.10.1-alpine
WORKDIR /usr/app
COPY package.json .
#"--quiet" -> disable automatic printing of installed dependencies
#"--no-optional" -> should hide 'fsevents warning' when running on linux
RUN npm install --quiet --no-optional
COPY . .
CMD node app.js