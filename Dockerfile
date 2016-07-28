FROM node
MAINTAINER yejingx@gmail.com

ADD . /src
RUN npm install uglify-js uglifycss

EXPOSE 8080

CMD cd /src && node app.js
