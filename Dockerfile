# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files from Angular project
COPY inventarios-angular/package*.json ./

# Install dependencies
RUN npm ci

# Copy Angular source code
COPY inventarios-angular . 

# Build Angular app
RUN npm run build

# Serve stage - Nginx
FROM nginx:alpine

# Copy built app from builder
COPY --from=builder /app/dist/inventarios-angular/browser /usr/share/nginx/html

# Copy Nginx configuration
COPY inventarios-angular/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80


# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
