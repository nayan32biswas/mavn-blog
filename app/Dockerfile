FROM node:12

RUN mkdir -p /project/app/
WORKDIR /project/app/

COPY ./package*.json ./
COPY ./yarn.lock ./
RUN yarn install

COPY ./ /project/app/