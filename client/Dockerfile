# Base Package
FROM node:14

MAINTAINER Ujjaval Desai

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./client/package*.json ./

RUN npm install

# Bundle app source
COPY . .

#RUN yarn install

# Initiate npm start
CMD [ "npm", "start" ]