FROM lorisleiva/laravel-docker:7.4

EXPOSE 80

COPY . ./
RUN chmod +x /var/www/run.sh
RUN chown 777 /var/www/run.sh

RUN composer install

RUN apk add yarn

RUN yarn install

RUN apk add --no-cache openssl
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz



