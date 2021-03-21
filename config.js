const port = process.env.PORT || (process.argv[2] || 5000)
const dbRemote = true
const path = require('path')
module.exports = {

    // in production the authentication is enabled
    env: 'production', // development,production

    port: (typeof port === 'number') ? port : 5000,
    'secret': 'dsfkj89435klsdfj84543985kdsjflsy4875',
    // HOST: `http://localhost:${port}`, // in localhost keep this line
    HOST: !dbRemote ? `http://localhost:${port}` : `https://whispering-everglades-48688.herokuapp.com`,
    viewsDir: path.join(__dirname, './views'),
    mongo: {
        remote: dbRemote,
        database: dbRemote ? `mongodb://bucketlist-user1:uO_rkSspGQZbW4C0dbCY1i511Y4dOyGv40rGtC-2@cluster0-shard-00-00.ezid2.mongodb.net:27017,cluster0-shard-00-01.ezid2.mongodb.net:27017,cluster0-shard-00-02.ezid2.mongodb.net:27017/bucketList?ssl=true&replicaSet=atlas-l1caqj-shard-0&authSource=admin&retryWrites=true&w=majority` : `mongodb://localhost/bucket_list`,
        defaultUser: 'johndoe' // our database default user
    }
}
