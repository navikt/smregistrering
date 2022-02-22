# Base image
FROM navikt/node-express:12.2.0-alpine

# Copy init script for loading vault credentials into environment variables
COPY init.sh /init-scripts/init.sh

COPY ./server/dist/index.js ./server/
COPY ./client/build ./server/build

# Change working directory to the server
WORKDIR /var/server/server

ENV NODE_ENV=production

CMD ["node", "index.js"]
