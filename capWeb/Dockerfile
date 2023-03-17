FROM node:16


WORKDIR /capweb
COPY package.json .

RUN  yarn

COPY . . 

EXPOSE 5173

CMD [ "npm", "run", "dev" ]





