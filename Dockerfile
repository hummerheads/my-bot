# Use an official Node.js image
FROM node:18

# Create and set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application (if needed)
RUN npm run build

# Start the application
CMD ["node", "Bot.js"]