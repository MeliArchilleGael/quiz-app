FROM node:21.7.3
LABEL authors="DevMAG"

RUN apt update && apt install git -y

WORKDIR /var/www

RUN git clone https://github.com/MeliArchilleGael/quiz-app.git

RUN cd quizz-app

RUN npm install && npx prisma migrate dev && npm run build

EXPOSE 3000

ENTRYPOINT ["npm","run","start"]