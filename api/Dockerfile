FROM strapi/base
ENV NODE_ENV production

WORKDIR /usr/src/app

COPY ./src/package*.json ./
COPY ./src/yarn.lock ./

RUN yarn install

COPY ./src .

RUN yarn build

EXPOSE 1337
CMD ["yarn", "start"]
