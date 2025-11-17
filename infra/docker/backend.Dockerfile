FROM node:20-alpine AS build
WORKDIR /app
COPY ../../package.json ../../pnpm-lock.yaml* ./
RUN corepack enable && pnpm install --ignore-scripts
COPY ../../backend ./backend
WORKDIR /app/backend
RUN pnpm install && pnpm build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/backend/dist ./dist
COPY backend/package.json .
RUN npm install --omit=dev
CMD ["node", "dist/index.js"]
