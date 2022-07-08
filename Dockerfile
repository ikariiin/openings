FROM node:18-alpine

COPY package.json .
COPY yarn.lock .

COPY packages/ .

RUN yarn install

RUN yarn workspace common build
RUN yarn workspace server build
RUN yarn workspace frontend build

