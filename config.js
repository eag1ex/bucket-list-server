const port = process.env.PORT || 5000

// NOTE you can host mongoDB on local environment also, just need to se it up
const dbRemote = true // process.env.MY_APP === 'bucketlist' // true/false

const path = require('path')
module.exports = {

    // in production the authentication is enabled
    env: 'production', // development,production
    port: port,
    'secret': 'dsfkj89435klsdfj84543985kdsjflsy4875',
    // NOTE {MY_APP} is a custom var set on heroku to distinguish between environments
    HOST: process.env.MY_APP === 'bucketlist' ? `https://whispering-everglades-48688.herokuapp.com` : `http://localhost:${port}`,
    viewsDir: path.join(__dirname, './views'),
    mongo: {
        remote: dbRemote,
        database: dbRemote ? `mongodb://bucketlist-user1:uO_rkSspGQZbW4C0dbCY1i511Y4dOyGv40rGtC-2@cluster0-shard-00-00.ezid2.mongodb.net:27017,cluster0-shard-00-01.ezid2.mongodb.net:27017,cluster0-shard-00-02.ezid2.mongodb.net:27017/bucketList?ssl=true&replicaSet=atlas-l1caqj-shard-0&authSource=admin&retryWrites=true&w=majority` : `mongodb://localhost/bucket_list`,
        defaultUser: 'johndoe' // our database default user
    }
}
