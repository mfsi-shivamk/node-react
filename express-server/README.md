

### Enviroment variables (Backend Server)
Go to express-server directory. 
Create a file named ".env" in the root directory and fill its contents as mentioned in .env.example.

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

## Database migration

1. Run `npm install` in express-server directory.
2. Run `npm run sequelize db:migrate`( Refer to [sequelize-cli doc](https://github.com/sequelize/cli#usage) )
3. Run `npm run sequelize db:seed:all` ( Refer to [sequelize-cli doc](https://github.com/sequelize/cli#usage) )

# Running Backend Server 

1. Go to express-server `cd express-server`.
2. Run `npm install`.
3. Run `npm run start`.

