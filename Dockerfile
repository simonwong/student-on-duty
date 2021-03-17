FROM node:14-alpine

WORKDIR /code

COPY package.json /code
COPY yarn.lock /code

RUN yarn install --frozen-lockfile

COPY . /code

RUN yarn build

EXPOSE 7404

CMD yarn start
