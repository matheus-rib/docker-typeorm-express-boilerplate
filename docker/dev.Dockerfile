FROM node:18-alpine

RUN apk add --update linux-headers;

RUN apk add git bash curl \
  && apk --no-cache add --virtual build-deps build-base