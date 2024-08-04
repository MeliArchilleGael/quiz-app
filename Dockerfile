FROM node:21.7.3

LABEL authors="DevMAG"

RUN apt update && apt install -y git sqlite3

WORKDIR /var/www

RUN git clone https://github.com/MeliArchilleGael/quiz-app.git

WORKDIR /var/www/quiz-app

RUN npm install

# RUN npx prisma migrate dev
RUN npx prisma migrate reset --force

RUN chmod -R 777 ./public

RUN npm run build

EXPOSE 3000

#ENTRYPOINT ["npm","run","dev"]
ENTRYPOINT ["npm","run","start"]
