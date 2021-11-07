FROM node:14.7.0

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

ENV NEO4J_HOST='neo4j://neo4j'
ENV NEO4J_USERNAME=neo4j 
ENV NEO4J_PASSWORD=test
ENV NEO4J_DATABASE=neo4j 

ENV PAGES_TO_FETCH=10

EXPOSE 7474
EXPOSE 7687
EXPOSE 6379

CMD [ "npm" , "start"]