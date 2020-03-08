# API Gateway

## 	Resources

It's where we create our API and test it. The API is a collection of resources. A resource is a string preceded by a `/`. A resource may contain methods (i.e. CRUD operations).
The API isn't public until we de deploy it to a stage that we choose.

### 		Method Request

It's here where we filter everything from what the client request in a way that we know what to expect so that we can work with it. We can define:

+ If there's any authentication for the request (API key necessary?)
+ what headers and url queries to expect, whether or not they are required.

### 		Integration Request

It's here where we decide how the request is going to be processed (if through a Lambda function, redirecting to another http, another AWS service, etc.). To use a **proxy** integration means that we are passing the request as is to be processed instead of just the body. It is possible to create **map templates** where we assign nested variables to something else so that they will get more easily accessible. These map templates use a specific language called [Velocity Template Language](<https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html>) (VLT), from Apache.

#### 			Lambda function

It's simple a function that receives the data, processes it and returns whatever. It can be written in `Node.js`, `Python`, `C#` or `Java`.

### 		Integration  Response

Here we can assign values to the headings (e.g. `'*'`to the `Access-Control-Allow-Origin` heading, which was defined in Method Response). We can also add a mapping template that will override the response returned in the lambda function.

### 		Method Response

All the statuses are defined here (e.g. 200 - OK), all of which have a Header that we want to receive as a response (e.g. CORS) and a model that will define the shape of the response we want.



## Stages

Where all our API deployments are organized.

## 	Authorizers

It's possible to add custom authorizers so that we can confirm if the user has privileges to fetch a certain API. These authorizers are inserted in the method request.

## 	Models

A model is a `json` that is appended to the method request that will restrict the input of what is being requested. The integration request know what to expect. 

Example of a model:

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "CompareData",
  "type": "object",
  "properties": {
    "age": {"type": "integer"},
    "height": {"type": "integer"},
    "income": {"type": "integer"}
  },
  "required": ["age", "height", "income"]
}
```

This model shapes its target (either the request or the response) as an object type (could instead be array, for example) with the properties age, height and income, all of which are required.





## Use the API

```javascript
const xhr = new XMLHttpRequest();
xhr.open("GET",".../");
xhr.send();
xhr.onreadystatechange = e => console.log(e.target.response);
```

If we need to send info as body, we put it inside send.

```javascript
xhr.setRequestHeader("content-type","application/json"); // *
xhr.send(JSON.stringify({age:15,income:1000,height:50}));
```

`*` This line is necessary when we send data because otherwise the format of the header will be the default one: `text/text` and will give a 403 error (or 415?). It's also necessary to `stringify` the object we are sending since the API is expecting a JSON instead of a javascript object.



# Dynamo DB

It's a NoSQL db.

Access DynamoDB through lambda using the sdk:

```javascript
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-2', apiVersion: '2012-08-10'});

exports.handler = (event,ctx,callback) => {
  const params = {
    Item: {
      UserId: { S: "lsjkdbfnsid;jkfs;n" },
      age: { N: "20" }
    },
    TableName: "MyDynamoTable"
  }

  dynamodb.putItem(params, function(err,data) {
    if(err) { console.log(err); callback(err); }
    else { console.log(data); callback(null,data); }
  })
}
```

For this code to work when we test it, we first have to give the role that the lambda function is using. We can do so in the IAM service > Roles (left sidebar) > Select the role > Attach policies > select the dynamo permissions we want to give (e.g. `AmazonDynamoDBFullAccess`).



# SDK

It's possible to access any of the AWS services using its sdk. If we are coming from a place outside the AWS, we need to import it using npm. [Here](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/index.html) is all the documentation on how to use it.