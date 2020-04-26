# Use an official Node runtime as a parent image
FROM node:alpine

# Create app directory
WORKDIR /usr/src/app
# Copy package.json AND package-lock.json
COPY package*.json ./
# Install all dependencies
RUN npm i
# Copy the rest of the code
COPY . .
# Expose the port
EXPOSE 8000
# Define the command that should be executed
CMD [ "npm", "run", "start:prod" ]

