module.exports = (DEBUG = true) => {
    const config = require('../../config')
    const { listRoutes } = require('../utils')
    const messages = require('../messages')
    const { log, attention, onerror } = require('x-utils-es/umd')
    const express = require('express')
    const app = express()
    const bucketRouter = express.Router()
    const morgan = require('morgan')
    const bodyParser = require('body-parser')

    const ServerAuth = require('./auth')(app)

    const cors = require('cors')
    const ejs = require('ejs')
    // const q = require('q')

    app.set('trust proxy', 1) // trust first proxy
    app.use(morgan('dev'))
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(cors())

    // for rendering html
    app.engine('html', ejs.__express)
    app.set('view engine', 'html')

    // ------------ init mongo DB
    const MongoDB = require('../mongoDB').mongoDB()
    // initialise and wait for init to resolve
    const mongo = new MongoDB(DEBUG)

    // ---------- Initialize auth check controllers
    try {
        new ServerAuth(DEBUG).AppUseAuth()
    } catch (err) {
        onerror('[ServerAuth]', err)
    }

    // ----- load our apps routes
    try {
        require('./bucketApp/bucketApp.router')(mongo, bucketRouter, DEBUG)
        app.use('/bucket', bucketRouter)
    } catch (err) {
        onerror('[bucketApp]', err)
    }

    // -----------------------------------

    app.use('/welcome', function(req, res) {
        return res.status(200).json({ success: true, message: 'works fine', url: req.url, available_routes: listRoutes(bucketRouter.stack, '/bucket'), status: 200 })
    })

    // catch all other routes
    app.all('*', function(req, res) {
        res.status(400).json({ ...messages['001'], error: true })
    })

    // -------- handle errors
    app.use(function(error, req, res, next) {
        onerror(error)
        res.status(500).json({ error: error.toString(), ...messages['500'] })
    })

    // ------ run server

    return mongo.init().then(async() => {
        const server = app.listen(config.port, function() {
            var host = (server.address().address || '').replace(/::/, 'localhost')
            var port = server.address().port
            log('[server]', `runnign on http://${host}:${port}`)
            attention('[server]', 'for available routes call: http://localhost:5000/welcome')
        })
        return server
    }).catch(err => {
        onerror('[mongo]', 'server did not start')
        log('[mongo]', 'make sure your database is running!')
    })
}
