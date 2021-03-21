
### Bucket List (Server)
#### - [ Developed by Eaglex ](http://eaglex.net)


#### About
Full Rest API Express.js server with Mongoose/mongoDB integration, backend API implementation for Bucket List client app. 

* Mongoose DB One To Many (Many)
* Good Server and database separation
* Implemented Error codes  
* Authentication and user session


#### Demo
Full featured hosted demo of `bucket-list` on :
```sh
https://whispering-everglades-48688.herokuapp.com/login
# login: eaglex
# password: eaglex
```
- demo database is reset and pureged for every session
- limited session time, hosted on free dyno, initial load may take bit longer

#### Installation
Build in `Node.js 12.0.0` and `NPM 6.9.0` in strict mode, maybe supported on higher but not tested

* How to install mongoDB, please refer to installation guide: `https://docs.mongodb.com/manual/administration/install-community/` once ready, start your database `mongod --dbpath xxx`, run the install

```sh
/$ npm i 
/$ npm run populate # will purge then dump new data
```


#### Config
- Rename `./config-example.js` with `./config.js` and update your db access path before starting the server!
- Configuration defaults and database presets are located in `./config.js`


#### Start
Server starts on `port:5000` 

```sh
/$ npm start # http://localhost:5000/
```


#### Database
- Populate DB:
    - To populate database refer to `./mongo.populate.js` file where you will find handy functions to run db populate for you. Main functions are `executes.purgeDB()` and `executes.bucketCollectionInsert(dataInsert, defaultUser)`
    - dump file to populate is database: `./data.inserts.js`
    - to populate run: `npm run populate`
- APIs
    - controllers for bucketApp located in : `./libs/server/bucketApp/..`
  
```sh
    (GET)  http://localhost:5000/bucket/api/list
    (POST) body:{title}   http://localhost:5000/bucket/api/create # create initial bucket 
    (POST) body:{title}   http://localhost:5000/bucket/api/:id/update-status # update bucket status and all subtasks
    (POST) body:{status}  http://localhost:5000/bucket/api/:id/bucket-only-update-status # update only bucket status
    (POST) body:{title}   http://localhost:5000/bucket/api/:id/rel/subtask/create # create subtask in relation to bucket
    (POST) body:{status}  http://localhost:5000/bucket/api/rel/subtask/:todo_id/update-status # update subtask
```

* Mongoose controllers are located in `./libs/mongoDB/..`
* Express server runs the mini app for bucketApp routing to `/bucket`


#### Authentication
* Auth is time based and will expire
* All db data is reset on every new session
* The authentication is setup for all api routes `/bucket/api/` and the app at `./bucket/*`
* You need to login first at `./login` to gain access
* To disabled authnetication, change the env in `./config.js` to `development`


#### Production
* Simple production mode is set in `./config.js` to enable authentication of routes
* If you are running the `bucket-list-app` in development mode, or away from `bucket-list-server`, you have to set env=development in `./config.js` (_not the .env_ file!) 


#### Stack
Application stack: Express.js, Mongoose.js, MongoDB, REST/API, Javascript, jsonwebtoken, LINT


#### Code Hierarchy
- Mongoose/DB
  - connection
  - Models
  - db.controllers 
- Server
  - Auth
  - bucketApp
    - api.controllers



#### Tests

* For now there are no coverage and tests optimized, i will get around to it.


#### TODO

* NYC and Mocha for coverage
* Stage MongoDB on `https://www.mongodb.com/cloud/atlas`
* State server on Heroku. 



##### LICENSE

* LICENCE: CC BY-NC-ND 2.0
* SOURCE: https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode


##### Thank you

