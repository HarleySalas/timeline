# Timeline Test

**Portfolio History**

- Utilizes the free API https://www.worldtradingdata.com/ for historial stock values.
- Allows you to enter the state of your assets portfolio at some day in the past and see how much it'd be worth today.
- Stores data in database to be retrieved later, or shared.

**Tech Stack**

- React / Hooks / Context
- SASS
- Node.js / Express
- MongoDB
- Docker

## Cloning

To view this project locally might be more trouble than it's worth, sadly.

1. Install dependencies
2. Set env variables

**Install Dependencies**

Run <code>npm install</code> at server folder

Run <code>npm install</code> at client folder

**Set env variables - Client**

Create <code>.env.development</code> and <code>.env.production</code> files inside <code>client</code> folder.

Use port `3002` for development and port `80` for production.

Example (include all of these)

HOST=0.0.0.0
PORT=3002
REACT_APP_HOST=localhost
REACT_APP_PORT=3001
SKIP_PREFLIGHT_CHECK=true
CHOKIDAR_USEPOLLING=true

Located at `client/.env.development`.

Note: if you change the ports, change them in the dockerfiles too.
(root, server).

**Set env variables - Server**

Create <code>test.config.env</code>, <code>development.config.env</code> and <code>production.config.env</code> files inside <code>server/.env/</code> folder.

Use port `3001` for test, development and port `80` for production.

Example (include all of these):

IP=0.0.0.0
HOST=localhost
PORT=3001
CLIENT_HOST=localhost
CLIENT_PORT=3002
DB_CONTAINER=mongo
DB_PORT=27017
DB_NAME=mongo-development
DB_USER=yourUsername
DB_PASS=yourPassword
TRADING_API_KEY=YOUR_WORLD_TRADING_DATA_API_KEY

Located at `server/.env/development.config.env`.

**Set env variables - Root (for Database config)**
Create <code>.env file inside <code>.<code> (Root file).

Example (include all of these):

DEV_MONGO_ROOT_USERNAME=root_username_1
DEV_MONGO_ROOT_PASSWORD=very_secure_password_1
DEV_MONGO_HOST=localhost
DEV_MONGO_PORT=27017

DEV_APP_MONGO_DB=mongo-development
DEV_APP_MONGO_USER=username
DEV_APP_MONGO_PASS=password

PROD_MONGO_ROOT_USERNAME=root_username_2
PROD_MONGO_ROOT_PASSWORD=very_secure_password_2
PROD_MONGO_HOST=localhost
PROD_MONGO_PORT=27017

PROD_APP_MONGO_DB=app_db
PROD_APP_MONGO_USER=app_user
PROD_APP_MONGO_PASS=app_password

## Usage

Note: use the following commands at the root folder.

Development

1. Start <code>docker-compose -f docker-compose.development.yml up</code>
2. Go to <code>https://localhost:3001</code> in browser for server
3. Go to <code>http://localhost:3002</code> in browser for client

Production

1. Run <code>npm run build</code>
1. Start <code>docker-compose -f docker-compose.production.yml up -d</code>
1. Go to <code>https://localhost:80</code> in browser

If you receive an error for SASS binaries, go inside of the client container, reinstall node-sass and restart the container.

While container is running...

<code>docker ps -a</code> (Note your container's client id)

<code>docker exec -it {Your container's client ID} /bin/bash<code>

<code>npm i node-sass<code>

Exit bash, restart your containers.
