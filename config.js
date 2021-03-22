
// NOTE KEEP this file secure, do not push to public repo
const port = process.env.PORT || 8080

// NOTE you can host mongoDB on local environment also, just need to se it up
const dbRemote = true // process.env.MY_APP === 'bucketlist' // true/false

const path = require('path')
module.exports = {

    // in production the authentication is enabled
    env: 'production', // development,production
    port: port,
    'secret': 'asd4556dfs34dsdsdf4667fdgdg67657',
    // NOTE {MY_APP} is a custom var set on heroku to distinguish between environments
    // to run app on local host in production, you need to rebuild it with localhost api
    HOST: process.env.MY_APP === 'bucketlist' ? `https://whispering-everglades-48688.herokuapp.com` : `http://localhost:${port}`,
    viewsDir: path.join(__dirname, './views'),
    mongo: {
        remote: dbRemote,
        database: dbRemote ? `mongodb://bucketlist-user1:PlFn1YGC6X1p93XNdyCDw4X3seGeG10pqyVtcwyt@cluster0-shard-00-00.ezid2.mongodb.net:27017,cluster0-shard-00-01.ezid2.mongodb.net:27017,cluster0-shard-00-02.ezid2.mongodb.net:27017/bucketList?ssl=true&replicaSet=atlas-l1caqj-shard-0&authSource=admin&retryWrites=true&w=majority` : `mongodb://localhost/bucket_list`,
        defaultUser: 'johndoe' // our database default user
    }
}
