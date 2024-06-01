
# FROM node:20-alpine

# # RUN addgroup app && adduser -S -G app app
# # USER app

# WORKDIR /app

# COPY package*.json ./

# # USER root
# # RUN chown -R app:app .
# # USER app

# RUN npm install --legacy-peer-deps

# COPY . .

# EXPOSE 5002

# CMD npm start



# Use the official Node.js image.
FROM node:14

# Set the working directory.
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available).
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Expose the port the app runs on.
EXPOSE 5002

# Define the command to run the application.
CMD ["npm", "start"]
