FROM node:12

# RUN npm install -g @vue/cli @vue/cli-service-global

RUN mkdir -p /project/frontend/
WORKDIR /project/frontend/

COPY ./package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY ./ /project/frontend/