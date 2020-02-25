# Base image
FROM navikt/node-express:12.2.0-alpine

# Copy client production build to image
COPY ./client/build ./client/build

# Copy compiled server Typescript files to image as Javascript files
COPY ./server/build ./server/build
COPY ./server/package.json ./server/

# Change working directory to the server
WORKDIR /server

# Install dependencies for server
RUN npm install

CMD ["npm", "start"] 