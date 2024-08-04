This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).



# How RUN this on a new computer 

### clone the project 
```bash
    git clone https://github.com/MeliArchilleGael/quiz-app.git
# and 
    cd quiz-app
```

## Install the project dependencies 
**Before this make sure that you have the version 21.7.1 of Node JS**

``` bash
    npm run install 
```

## Database 
### Regenerate the database
** This will create a brand-new database with sample data**
```bash
    npx prisma migrate reset --force
```

### Default user : 

|name|email|password|role|
|----|-----|--------|----|
|User|user@gmail.com|password|user|
|Admin|admin@gmail.com|password|Admin|

## Start the project

**Give all the permission to the directory "public" of the project**
```bash 
    chmod -R 777 ./public
```
** Start the project **
```bash 
    npm run dev 
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Going to production 
```bash
    npm run build 
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
