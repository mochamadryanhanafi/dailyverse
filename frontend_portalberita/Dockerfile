# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run dev

# Stage 2: Serve static content
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# expose port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
