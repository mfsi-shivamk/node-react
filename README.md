## MovieApp 

### Introduction

Movie App using React.js, Node.js & GraphQL with real-time movie listing updates.

This allows a user to register in the database, login, add a movie & rate it.

### Tech Stack Used
``
GraphQL, ReactJS, NodeJS & Sequelize.
``
### Download

```
$ git clone https://github.com/mfsi-shivamk/node-react.git
```

# Frontend Client
## Setting up Environment variables 
Go to the client directory. 
Create a file named ".env" in the root directory and fill in its contents as mentioned in .env.example.

```
REACT_APP_NODE_URL=localhost
REACT_APP_NODE_PORT=4000
REACT_APP_NODE_SECURE=http
REACT_APP_NODE_SOCKET=ws

```
## Running Client

1. Go to client `cd client`.
2. Run `npm install`.
3. Run `npm run start`.

# Backend Server

## Setting Up Environment variables
Go to express-server directory. 
Create a file named ".env" in the root directory and fill in its contents as mentioned in .env.example.

```
APP_NAME="test"
APP_LOG="dev"
APP_PORT=4000
APP_URL=http://localhost
APP_SECURE=false

DB_CONNECTION=mysql
DB_HOST=
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

```

## Database Migration
Make sure you have installed all npm dependencies and in express-server directory.
1. Run `npm install` in express-server directory.
2. Run `npm run sequelize db:migrate`( Refer to [sequelize-cli doc](https://github.com/sequelize/cli#usage) )
3. Run `npm run sequelize db:seed:all` ( Refer to [sequelize-cli doc](https://github.com/sequelize/cli#usage) )

## Running Server

1. Go to express-server `cd express-server`.
2. Run `npm install`.
3. Run `npm run start`.

