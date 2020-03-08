Prisma is basically a layer that sits on top of a database and that 

In the backend folder of the project, do the following commands:

1. `prisma login`

2. `prisma init`

3. Two files were generated:

   + `prisma.yml`. Change it to:

     ```
     endpoint: ${env:PRISMA_ENDPOINT}
     datamodel: datamodel.prisma
     # secret: ${env: PRISMA_SECRET}
     hooks:
       post-deploy:
       	- graphql get-schema -p prisma
     generate:
       - generator: graphql-schema
         output: ./src/generated/
     ```

     And create a file `.env` with the variables: (don't forget to include it in `.gitignore`!!)

     ```javascript
     FRONTEND_URL="putHereTheFrontendUrl"
     PRISMA_ENDPOINT="CheckInPrisma.yml"
     PRISMA_SECRET='justSomePassword'
     ```

     

   + `datamodel.prisma`, where the schemas of our project are gonna be defined. When we save and deploy it (`npm run deploy`), the `prisma.graphql` will be regenerated so that new CRUD APIs are available for the new content of what we just wrote in the file before saving. That's the big thing about Prisma.

     

This file contains all the variables that are readily accessible on all documents by doing `process.env.__`