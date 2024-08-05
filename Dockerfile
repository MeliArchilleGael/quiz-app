FROM node:21.7.3

LABEL authors="DevMAG"

# Install necessary packages in a single RUN command
RUN apt update && apt install -y git sqlite3

# Set the working directory
WORKDIR /var/www

# Clone the repository
RUN git clone https://github.com/MeliArchilleGael/quiz-app.git

# Set the working directory to the cloned app directory
WORKDIR /var/www/quiz-app

# Install dependencies
RUN npm install

# RUN npx prisma migrate dev

# Perform database migration
RUN npx prisma migrate reset --force

# Make public files executable (if needed)
RUN chmod -R 777 ./public

# Build the application
# RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

ENTRYPOINT ["npm","run","dev"]

# Start the application
# ENTRYPOINT ["npm", "run", "start"]
