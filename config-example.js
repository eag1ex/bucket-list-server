/**
 * rename this file with `config.js` and add appropriate DB access uri
 * NOTE When using dbRemote = true, you must add remote uri
 */

const port = process.env.PORT || (process.argv[2] || 5000)
const dbRemote = false

module.exports = {
    // in production the authentication is enabled
    env: 'development', // development,production

    port: (typeof port === 'number') ? port : 5000,
    'secret': '', // NOTE provide your static token
    HOST: `http://localhost:${port}`, //  in localhost keep this line
    // HOST: !dbRemote ? `http://localhost:${port}` : `www`,
    mongo: {
        remote: dbRemote,
        database: dbRemote ? `mongodb://localhost/bucket_list` : `mongodb://localhost/bucket_list`,
        defaultUser: 'johndoe' // our project database default user
    }
}
