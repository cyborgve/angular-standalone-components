FROM node:18-slim AS builder
WORKDIR /app
COPY . .
RUN npm i -g npm@9.4.2
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/* /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf