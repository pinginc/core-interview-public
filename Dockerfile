# Dockerfile

# Packages are listed at https://hub.docker.com/_/node
# - Node version should be the current LTS: https://nodejs.org/en/about/releases/
# - Debian version should be current stable: https://www.debian.org/releases/
FROM node:18.7.0-alpine

# Add package.json before rest of repo, for Docker caching purposes
# See http://ilikestuffblog.com/2014/01/06/
ADD package.json /app/
ADD package-lock.json /app/
WORKDIR /app

# Install dependencies
RUN npm i -g npm
RUN npm ci

# Add everything to our working directory
ADD . .

# Build typescript files
RUN npm run build

# Expose port 80 (http)
ENV PORT 8080
EXPOSE 8080

CMD ["npm", "run", "start:prod"]
