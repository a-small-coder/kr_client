FROM node:16-alpine 
# Set the working directory to /app inside the container
WORKDIR /client
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci

EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]