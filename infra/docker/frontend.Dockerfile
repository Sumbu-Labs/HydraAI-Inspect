FROM node:20-alpine AS build
WORKDIR /app
COPY ../../frontend ./frontend
WORKDIR /app/frontend
RUN npm install && npm run build

FROM nginx:1.25-alpine
COPY --from=build /app/frontend/dist /usr/share/nginx/html
