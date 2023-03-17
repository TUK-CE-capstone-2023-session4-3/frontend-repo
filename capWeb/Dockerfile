FROM node:16


WORKDIR /capweb
COPY package.json .
COPY . . /
RUN  yarn

EXPOSE 5173

CMD [ "npm", "run", "dev" ]





