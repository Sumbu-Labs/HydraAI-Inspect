FROM node:18-alpine

WORKDIR /app

COPY landing-page/package*.json ./
RUN npm install

COPY landing-page/ .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
