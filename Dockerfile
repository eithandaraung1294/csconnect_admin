FROM node:alpine

#set working directory
WORKDIR /app

COPY package.json .

RUN npm install

RUN chown -R node /app/node_modules

COPY . .


VOLUME [ "/app/node_modules" ]

#start app
CMD ["npm", "start"]