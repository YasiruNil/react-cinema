# pull from a base image
From node:fermium

#use app as the working directory
WORKDIR /app

# copy files from current directory to working directory(app can be any name)
COPY . /app

# install dependencies 
RUN npm ci

# build production app
RUN npm run-script build

# listen to a specific port
EXPOSE 3000

# set node server
ENTRYPOINT npm run start

