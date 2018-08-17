# rest-mock-server

Simple REST mock server on Express, Lowdb and Faker with fast configuration and less dependencies.

## Install and start

Project clone from GitHub

```
git clone https://github.com/sonnenkern/rest-mock-server.git 
```

Change to project directory `rest-mock-server` and run

```
npm install
```

Start mock server

```
npm run start
```

From that moment the server will watch for all changes in his files and automatically restart in case of any change (`nodemon`).

## Configuration

The configuration is quite simple over config.json file and has only two parameters at the moment. 

```
{
  "port": 8500,
  "prefix": "/api/v1"
}
```

## Structure of the project

```
server.js - Node.js starter
app.js - Express starter
nodemon.json - Nodemon configuration
config.json - project configuration
db.json - data base file (lowdb)
db-reset.json - default data base file for data base reset
db-reset.js - script for data base resetting

/views - folder with EJS-template for project's home page
/public - some static stuff for home page
/routes - main folder for REST mocks
```

## Home page

The home page is available at (starting with port 8500)

```
http://loclahost:8500
```

![Home page image](https://raw.githubusercontent.com/sonnenkern/rest-mock-server/master/public/homepage.png)

The home page lists all available REST pathes and methods.

## Data base reset



Usage

Dependencies

