FROM node:18
WORKDIR /app
COPY . .
COPY seed.js .
RUN mkdir -p /app/uploads
RUN npm install
EXPOSE 5001
CMD ["node", "index.js"]
