FROM node:alpine3.20
RUN addgroup nodeuser && adduser -S -G nodeuser nodeuser
USER nodeuser
WORKDIR /app/server/
COPY package*.json .
RUN ["npm", "install"]
COPY . .
EXPOSE 4000
ENTRYPOINT [ "npm", "run", "start" ]