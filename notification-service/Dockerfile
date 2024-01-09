FROM node:alpine

RUN npm install -g pm2

WORKDIR /usr/app

COPY ./package.json ./ 

RUN npm install

# Make sure you delete node modules before building the image

COPY ./ ./

CMD ["npm", "run", "docker-start"]