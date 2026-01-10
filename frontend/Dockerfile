# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# 1. Accept the build argument
ARG VITE_API_URL

# 2. Set it as an environment variable for the build process
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm install
COPY . .

# 3. Build the app (Vite will now see the correct URL)
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]