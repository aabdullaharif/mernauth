FROM node:latest

COPY . /home/app
WORKDIR /home/app
RUN npm install
EXPOSE 8000
CMD ["node", "./backend/server.js"]

