# Stage 1: Build the app
FROM node:18 as builder

# Set working directory
WORKDIR /app

# Add build-time variables
ARG VITE_TMDB_API_KEY
ARG VITE_APPWRITE_PROJECT_ID
ARG VITE_APPWRITE_DATABASE_ID
ARG VITE_APPWRITE_COLLECTION_ID

ENV VITE_TMDB_API_KEY=$VITE_TMDB_API_KEY
ENV VITE_APPWRITE_PROJECT_ID=$VITE_APPWRITE_PROJECT_ID
ENV VITE_APPWRITE_DATABASE_ID=$VITE_APPWRITE_DATABASE_ID
ENV VITE_APPWRITE_COLLECTION_ID=$VITE_APPWRITE_COLLECTION_ID

# Copy files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build
COPY . .
RUN npm run build

# Stage 2: Serve the app with a lightweight web server
FROM nginx:alpine

# Copy build output to Nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy default Nginx config (optional, good for SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
