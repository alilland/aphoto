# Stage 1: Building the code
FROM node:18-alpine as builder

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install
RUN npm install -g npm@10.2.1

COPY . .

RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine

WORKDIR /app/frontend

COPY --from=builder /app/frontend/next.config.js ./
COPY --from=builder /app/frontend/public ./public
COPY --from=builder /app/frontend/.next ./.next
COPY --from=builder /app/frontend/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "dev"]
