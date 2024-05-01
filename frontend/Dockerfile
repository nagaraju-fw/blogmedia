FROM node:12.19.1

RUN mkdir /ui
WORKDIR /ui

COPY package*.json ./

RUN npm install

ADD . /ui

