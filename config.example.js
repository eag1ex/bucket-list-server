/**
 * rename this file with `config.js` and add appropriate DB access uri
 * NOTE When using dbRemote = true, you must add remote uri
 */

const port = process.env.PORT || (process.argv[2] || 5000)
const dbRemote = false
const path = require('path')

module.exports = {
    // in production the authentication is enabled
    env: 'development', // development,production
    port: port,
    secret: 'abc', // NOTE provide your static token
    HOST: `http://localhost:${port}`, //  in localhost keep this line
    // HOST: !dbRemote ? `http://localhost:${port}` : `www`,
    viewsDir: path.join(__dirname, './views'),
    mongo: {
        remote: dbRemote,
        database: dbRemote ? `mongodb://localhost:27017/bucket_list` : `mongodb://localhost:27017/bucket_list`,
        defaultUser: 'johndoe' // our project database default user
    }
}
