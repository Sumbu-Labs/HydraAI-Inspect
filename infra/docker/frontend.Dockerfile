FROM node:20-alpine AS build
WORKDIR /app
COPY frontend-app ./frontend-app
WORKDIR /app/frontend-app
RUN npm install && npm run build

FROM nginx:1.25-alpine
COPY --from=build /app/frontend-app/dist /usr/share/nginx/html
