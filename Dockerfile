FROM node:16-alpine

RUN apk add --no-cache

ARG NPM_AUTH_TOKEN

# Copy init script for loading vault credentials into environment variables
COPY init.sh /init-scripts/init.sh

WORKDIR /app

ENV NODE_ENV production

COPY package*.json /app/
COPY .yarn /app/.yarn
COPY .yarnrc.yml /app/
COPY yarn.lock /app/
COPY scripts /app/scripts
COPY client /app/client
COPY server /app/server

RUN yarn --immutable

CMD ["yarn", "start:prod"]
