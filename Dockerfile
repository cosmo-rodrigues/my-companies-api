FROM node:16.19.1
WORKDIR /usr/src/server
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3001
# CMD ["npm", "run", "start"]
CMD ["npm", "run", "start:dev"]
