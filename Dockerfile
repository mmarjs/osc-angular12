# Stage 1 - Build and compile Angular
FROM node AS build
WORKDIR /usr/src/app
COPY . .
RUN yarn install
ARG configuration=production
RUN yarn build --configuration $configuration

# Stage 2 - Nginx serve the App
FROM nginx:1.23.3-alpine AS nginx
COPY --from=node /usr/src/app/dist/apps/client/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
