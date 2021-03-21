
/**
* @Mongo
* Mongoose connection
* example usage `new MongoDB(true).init().then` > true/false
*  */
module.exports = function() {
    const CONFIG = require('../../config')
    const { onerror, sq, attention, delay } = require('x-utils-es/umd')
    const mongoose = require('mongoose')
    const { Subject } = require('rxjs')

    return class MongoDB {
        constructor(debug = false) {
            this.debug = debug
            this.presets() // mongoose presets
            this.connectionStatus() // .onReady
        }

        presets() {
            this.mongooseReady = sq()
            mongoose.Promise = Promise
            this.mongoose = mongoose
            this.DATABASE = CONFIG.mongo.database
        }

        get options() {
            return {
                // "loggerLevel": "info",
                // ssl: CONFIG.mongo.remote ? true:false,
                sslValidate: !!CONFIG.mongo.remote,
                poolSize: 30,
                mongos: true,
                // useMongoClient: true,
                keepAlive: 300000,
                // autoReconnect: true,
                connectTimeoutMS: 30000,
                // bufferMaxEntries :10,
                // bufferCommands :true,
                useUnifiedTopology: true,
                useNewUrlParser: true,
                promiseLibrary: this.mongoose.Promise
            }
        }

        async init() {
            try {
                this.connect()
                await this.mongooseReady.promise
                return true
            } catch (err) {
                onerror('[init]', err)
            }
            return Promise.reject()
        }

        connectionStatus() {
            if (this.conSubscribed) return this
            let conType = CONFIG.mongo.remote ? `[mongo][remote]` : `[mongo]`

            this.connectionStatus = new Subject()
            this.conSubscribed = this.connectionStatus.subscribe(v => {
                if (v.connect) attention(`${conType}[status]`, 'CONNECTED')
                if (v.open) {
                    attention(`${conType}[status]`, 'CONNECTION_OPEN')
                }

                if (v.error) onerror(`${conType}[status]`, v.error)
                this.conSubscribed.complete()
            }, err => {
                onerror(`${conType}[status]`, err)
                this.conSubscribed.complete()
            }, complete => {
                // done
            })

            return this
        }

        connect() {
            if (this.connectionSet) return this

            this.connectionSet = this.mongoose.connect(this.DATABASE, this.options).then(e => {
                this.connectionStatus.next({ connect: true })
                this.mongooseReady.resolve(true)
            }, err => {
                this.connectionStatus.next({ error: err })
                this.mongooseReady.reject(err)
            })

            this.mongoose.connection.on('open', ref => {
                this.connectionStatus.next({ open: true })
                this.mongooseReady.resolve(true)
            })

            this.mongoose.connection.on('error', err => {
                this.connectionStatus.next({ error: err })
                this.mongooseReady.reject(err)
            })

            return this
        }
    }
}
