FROM node:8.4
COPY . /app/duer-oauth
WORKDIR /app/duer-oauth
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 8016
CMD node /app/duer-oauth/app.js