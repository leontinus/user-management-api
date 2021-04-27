# user-management-api 
A backend API to use CRUD operations for user management (features) built using nodejs and expressjs

## Prerequisites
* Node.js : A JavaScript runtime built on Chrome's V8 JavaScript engine. Brings JavaScript to the server
* Express.js : A fast, minimalist web framework for Node.js
* [Postman](https://www.getpostman.com/) : For testing the HTTP endpoints 

Please make sure that the tech stack are installed before moving on.

*For database, currently I will be using a text-based (json format)*

## Initiating the application
To initiate the project create an empty folder for the project:

```shell
$ mkdir user-management-api
```

Change directory into that newly created folder:

```shell
$ cd user-management-api
```

Now let's create a **package.json** inside that folder:

```shell
$ npm init -y
```

### Node JS Dependencies
To first set up this application there are few dependencies that we will be using which are: 
* express : Fast, lightweight web framework for Node.js
* lodash : Lodash is a JavaScript library which provides utility functions for common programming tasks using the functional programming paradigm

Now that the **package.json** is available in the project folder, add the dependcies we needed :

```shell
$ npm install express lodash
```

# Built With
* Node.js
* Express.js
* lodash