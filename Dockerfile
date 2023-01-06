FROM node:12.16.3-stretch-slim
WORKDIR /usr/src/app
COPY . .
RUN yarn add phantomjs-prebuilt@2.1.13 --ignore-scripts
RUN yarn
CMD ["yarn","production"]