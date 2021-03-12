const port = process.env.PORT || (process.argv[2] || 5000)
const dbRemote = true

module.exports = {

    port: (typeof port === 'number') ? port : 5000,
    mongo: {
        remote: dbRemote,
        database: dbRemote ? `mongodb://bucketlist-user1:uZff71XJqlq9d9x_0QyzlkHn8XcUVglcE3Kkd59P@cluster0-shard-00-00.ezid2.mongodb.net:27017,cluster0-shard-00-01.ezid2.mongodb.net:27017,cluster0-shard-00-02.ezid2.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-l1caqj-shard-0&authSource=admin&retryWrites=true&w=majority` : `mongodb://localhost/bucket_list`,
        defaultUser: 'johndoe' // our database default user
    }
}
