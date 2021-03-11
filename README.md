
### Bucket List Server
#### - [ Developed by Eaglex ](http://eaglex.net)

##### LICENSE

* LICENCE: CC BY-NC-ND
* SOURCE: https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode


#### About
Full Rest API Express.js server with Mongoose/mongoDB integration, backend API implementation for Bucket List client app. 
- Mongoose DB One To Many (Many)
- Good Server and database separation
- Implemented Error codes  



#### Installation
Build in `Node.js 12.0.0` and `NPM 6.9.0` in strict mode, maybe supported on higher but not tested
- How to install mongoDB, please refer to installation guide: `https://docs.mongodb.com/manual/administration/install-community/` once ready, run the install

```sh
/$ npm i 
/$ npm run populate # will purge then dump new data
```


#### Config
Configuration defaults and database presets are located in `./config.js`


#### Start
Server starts on `port:5000` 

```sh
/$ npm start # http://localhost:5000/
```


#### Database
* Populate DB:
  - To populate database refer to `./mongo.populate.js` file where you will find handy functions to run db populate for you. Main functions are `executes.purgeDB()` and `executes.bucketCollectionInsert(dataInsert, defaultUser)`
  - dump file to populate is database: `./data.inserts.js`

* APIs
  - controllers for bucketApp located in : `./libs/server/bucketApp/*`
  ```sh

    (GET)  http://localhost:5000/bucket/list
    (POST) body:{title}   http://localhost:5000/bucket/create # create initial bucket 
    (POST) body:{title}   http://localhost:5000/bucket/:id/update-status # update bucket status and all subtasks
    (POST) body:{status}  http://localhost:5000/bucket/:id/bucket-only-update-status # update only bucket status
    (POST) body:{title}   http://localhost:5000/bucket/:id/rel/subtask/create # create subtask in relation to bucket
    (POST) body:{status}  http://localhost:5000/bucket/rel/subtask/:todo_id/update-status # update subtask

  ```
* Mongoose controllers are located in `./libs/mongoDB/*`
* Express server runs the mini app for bucketApp routing to `/bucket`



#### Tests
* For now there are no coverage and tests optimized, i will get around to it.



#### Code Hierarchy
* Mongoose
  > connection 
* Server
    > bucketApp > modelSchema/db


#### TODO
* NYC and Mocha for coverage
* Stage MongoDB on `https://www.mongodb.com/cloud/atlas`
* State server on Heroku. 



##### Thank you