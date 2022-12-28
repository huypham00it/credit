# FROM node:16-slim as build
# # Set working directory
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json before other files
# # Utilise Docker cache to save re-installing dependencies if unchanged
# COPY ./package*.json ./

# # Install dependencies
# RUN npm install --production

# # Copy all files
# COPY ./ ./

# # Build app
# RUN npm run build

# RUN mkdir /usr/src/next-app
# COPY --from=build /usr/src/next-app/dist /usr/src/next-app

# # Expose the listening port
# EXPOSE 3000

# # Run container as non-root (unprivileged) user
# # The node user is provided in the Node.js Alpine base image
# USER node

# # Run npm start script with PM2 when container starts
# CMD [ "pm2-runtime", "npm", "--", "start" ]

# FROM nginx:alpine

# # Remove any existing config files
# RUN rm /etc/nginx/conf.d/*

# # Copy config files
# # *.conf files in conf.d/ dir get included in main config
# COPY ./deploy/nginx.conf /etc/nginx/conf.d/

# # Expose the listening port
# EXPOSE 80

# # Launch NGINX
# CMD [ "nginx", "-g", "daemon off;" ]
# Specify the base image
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the application
RUN npm run build

# Set up the NGINX base image
FROM nginx:alpine

# Copy the built application from the previous image
COPY --from=0 /usr/src/app /usr/share/nginx/html

# Copy the NGINX configuration file
COPY ./deploy/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]