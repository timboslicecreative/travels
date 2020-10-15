FROM node:slim

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY ./web/src/package*.json ./
COPY ./web/src/yarn*.lock ./

RUN yarn install

COPY ./web/src .

CMD ["yarn", "wait-build-start"]