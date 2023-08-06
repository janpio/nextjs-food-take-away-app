# Use the official Node.js 14 image as a base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available) to the container
COPY package*.json ./



# Install the dependencies in the container


# Copy the rest of the app to the container
COPY . .
RUN npx prisma generate --schema=./prisma/schema.prisma
# Build the Next.js app
RUN npm run build


 
# The app listens on port 3000, so let's expose that port
EXPOSE 3000

 # The command to run the app
CMD [ "npm", "start" ]
