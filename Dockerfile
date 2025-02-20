# Step 1: Use a node image as a base
FROM node:16 AS build

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy all project files to the container
COPY . .

# Step 6: Build the app for production
RUN npm run build

# Step 7: Use a smaller web server image to serve the built app
FROM nginx:alpine

# Step 8: Copy the build files from the previous build stage
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose the default port for nginx
EXPOSE 80

# Step 10: Start nginx server
CMD ["nginx", "-g", "daemon off;"]
