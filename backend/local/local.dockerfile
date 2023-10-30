FROM node:18-alpine

ARG NODE_ENV=${NODE_ENV}

# Installing pm2 globally
RUN apk add --no-cache bash
RUN npm install -g npm@10.2.1 pm2

# Create app directory
WORKDIR /app/backend

# Copy app
COPY . /app/backend
RUN yarn install

# Expose port
EXPOSE 3001

# Gracefully stop pm2 on docker stop
STOPSIGNAL SIGQUIT

ENV DOCKER='true'

# Docker command to run the app
# To specify the app to run, use --only APP
# APPs are defined in pm2-config.yml
# EXAMPLE: CMD ["pm2-runtime", "pm2-config.yml", "--only", "APP"]
CMD ["yarn", "dev"]
