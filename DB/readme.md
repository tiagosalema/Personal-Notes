# SQL

**S**tructured **Query** **L**anguage is a 

SQL is characterized by tables with specific inputs that, once defined, have to be specified every time a new field is instantiated (schema).

SQL stores data in a relational way:

+ **One-to-one relation**: When there are 2 tables and they relation with only one another and not a third table.
  	ex: user (name, age...) related with contact (email, phone...)

+ **One-to-many**: When one table is related to many.

  ​	ex: user related with a product being ordered (title, description, price...)

+ **Many-to-many**: When many tables can be related with many others.

  ​	ex: users related with roles (one user can have many roles and one role can be assigned to many users)

# NoSQL

(MongoDB, AWS DynamoDB or Azure)

There is no relation between data i.e. a user may be defined and a product may be ordered by that user, but these 2 data are independent from each other. A big disadvantage of that is the fact that if one item is updated, it might be updated in only one place and conflict with the one that was forgotten to be updated. For this reason, it is a more adequate language where there are a lot of reads but few writes.

# Serverless Programming

Serverless allows you to build and run applications and services without thinking about servers.

BaaS (Backend as a Service) and FaaS (Function as a Service) are the 2 possible ways to provide serverless programming. The most notable companies who do it are Google (with Firebase BaaS and Google Cloud Functions for Firebase), Amazon (with AWS Lambda) and Microsoft (Azure). Other relevant ones are IBM OpenWhisk, Azure Functions and webtask.io.

![1551982271547](C:\Users\tiago\AppData\Roaming\Typora\typora-user-images\1551982271547.png)

BaaS providers offer a number of server-side capabilities. For instance:

- Database management
- Cloud storage (for user-generated content)
- User authentication
- Push notifications
- Remote updating
- Hosting
- Other platform- or vendor-specific functionalities; for instance, Firebase offers Google search indexing