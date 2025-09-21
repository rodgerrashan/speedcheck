# Use Node.js 20 LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy server code and public folder
COPY . .

# Expose port
EXPOSE 3001

# Run the server
CMD ["node", "index.js"]
