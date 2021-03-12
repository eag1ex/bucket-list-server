/**
 * rename this file with `config.js` and add appropriate DB access uri
 * NOTE When using dbRemote = true, you must add remote uri
 */

const port = process.env.PORT || (process.argv[2] || 5000)
const dbRemote = false

module.exports = {

    port: (typeof port === 'number') ? port : 5000,
    mongo: {
        remote: dbRemote,
        database: dbRemote ? `mongodb://localhost/bucket_list` : `mongodb://localhost/bucket_list`,
        defaultUser: 'johndoe' // our database default user
    }
}
