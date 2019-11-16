FROM node:10 as base
LABEL author="Luiz Motta <luizjoaomotta@gmail.com>"
EXPOSE 3000
WORKDIR  /var/www
COPY package.json yarn.lock ./
RUN yarn install --production=true && yarn cache clean

FROM base as build
COPY . .
RUN yarn build

# use bind mounting with dev
FROM build as dev
RUN yarn install --production=false && yarn cache clean
CMD [ "yarn", "start:dev" ]

FROM dev as test
CMD [ "yarn", "test:all"]

FROM base as prod
COPY ./.env ./
COPY --from=build /var/www/dist/src ./
USER node
CMD [ "node", "index" ]