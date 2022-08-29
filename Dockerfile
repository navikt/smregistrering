FROM node:16-alpine

RUN apk add --no-cache bash

ARG NPM_AUTH_TOKEN

WORKDIR /app

ENV NODE_ENV production

COPY package*.json /app/
COPY .yarn /app/.yarn
COPY .yarnrc.yml /app/
COPY yarn.lock /app/
COPY scripts /app/scripts
COPY src /app/src
COPY .next /app/.next
COPY *config* /app/

RUN yarn --immutable

CMD ["yarn", "start:prod"]
