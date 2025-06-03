FROM node:22-alpine3.21

WORKDIR /usr/src/api

COPY package*.json .

RUN npm install

COPY . .

ENV TZ=America/Sao_Paulo

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]