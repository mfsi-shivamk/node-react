### Backend Server

## Introduction

* Authentication is via REST-ful routing which uses **JWT** token for authenticity.
* Fetching Movies list, adding movie & rating movie is via GraphQL routing.

## Requirements

*   Node.js **10+**
*   MySql **8+**
## Features
*   Make movie and rate them.
*   User login, sign up, and authentication
*   CORS ready.
*   Pagination ready.
*   Testing with  jest for GQL endpoints.
*   NPM scripts for cleaning and seeding the MySQL database.
*   NPM script for keeping good source code formatting using prettier and ESLint.
*   Use of ESLint for good coding practices.
*   JWT Tokens, make requests with a token after login
*   Search with movie name.

## About Authentication
* Passport local handles user authencation for the unprotected routes, which are the user registration and login routes.
* Once the user has logged in a JWT token is created and sent to the client and storeed in local storage along with user data, Passport JWT takes over at this point and handles all further user authentication for protected routes.
* Each request from the client to the server must include the JWT as one of its authorization headers before the route can be accessed. If the JWT is missing, corrupted or expired (it has a 1 hour expiration date from the time it's created on login), the authentication will fail and the route cannot be accessed.

### How To Setup ?
## Environment Variables
* Go to express-server directory. 
* In the root this repository you will find a file named `.env.example`.
* Create a new file by copying and pasting the file and then renaming it to just `.env`
* The file `.env` is already ignored, so you never commit your credentials.

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

1. Run `npm install` in express-server directory.
2. Run `npm run sequelize db:migrate`( Refer to [sequelize-cli doc](https://github.com/sequelize/cli#usage) )
3. Run `npm run sequelize db:seed:all` ( Refer to [sequelize-cli doc](https://github.com/sequelize/cli#usage) )

# Running Backend Server 

1. Go to express-server `cd express-server`.
2. Run `npm install`.
3. Run `npm run start`.

