# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build Angular app
RUN npm run build

# Serve stage
FROM node:18-alpine

WORKDIR /app

# Install serve to run the static app
RUN npm install -g serve

# Copy built app from builder
COPY --from=builder /app/dist/inventarios-angular ./dist

# Expose port
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "dist", "-l", "3000"]
