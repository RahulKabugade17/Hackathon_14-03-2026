# Use Node.js 18 as the base image
FROM node:24.14.0-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Default command to run tests (can be overridden)
CMD ["npm", "run", "android"]