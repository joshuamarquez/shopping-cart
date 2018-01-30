FROM node:carbon

# Set the user to use when running this image
USER node

# Create app directory
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Install app dependencies
COPY package.json /home/node/app/
RUN npm install --only=production

# Bundle app source
COPY . /home/node/app

EXPOSE 3000

CMD ["node","./bin/www"]
