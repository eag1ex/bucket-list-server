
Object.assign = require('object-assign')
module.exports = (DEBUG = true) => {
    let config

    try {
        config = require('../../config')
    } catch (err) {
        console.error('make sure to rename ./config-example.js to ./config.js')
        return
    }
    const path = require('path')
    const session = require('./express-sess')
    const { listRoutes } = require('../utils')
    const messages = require('../messages')
    const { log, attention, onerror } = require('x-utils-es/umd')
    const express = require('express')
    const app = express()
    const morgan = require('morgan')
    const bodyParser = require('body-parser')

    const jwt = require('jsonwebtoken')

    const cors = require('cors')
    const ejs = require('ejs')

    app.set('trust proxy', 1) // trust first proxy
    app.use(morgan('dev'))
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(cors())

    // for rendering html
    app.engine('html', ejs.__express) // ejs.renderFile
    app.set('view engine', 'html')
    app.set('views', path.join(config.viewsDir, 'app'))
    app.set('views', path.join(config.viewsDir, 'admin'))
    // static routes
    app.use('/login/', express.static(path.join(config.viewsDir, './admin')))
    app.use('/bucket/', express.static(path.join(config.viewsDir, './bucket-app')))
    // save logged in session and manage expiry
    session(app)

    // ------------ init mongo DB
    const { mongoDB, DBControllers } = require('../mongoDB')

    const MongoDB = mongoDB()
    const mongo = new MongoDB(DEBUG)
    const dbc = new DBControllers(mongo, /* debug: */false)

    // initialize and wait for init to resolve

    // ---------- Initialize auth check controllers
    try {
        const ServerAuth = require('./auth.controller')(app, dbc, jwt)
        let serverAuth = new ServerAuth(DEBUG)

        // validate login to ./app with post/auth credentials
        app.post('/auth', serverAuth.postAuth.bind(serverAuth))
        serverAuth.AppUseAuth()
        app.get('/login', serverAuth.login.bind(serverAuth))
    } catch (err) {
        onerror('[ServerAuth]', err)
        return
    }

    // ----- load our apps routes
    let bucketRouter
    try {
        bucketRouter = require('./bucketApp/bucketApp.router')(config, dbc, mongo, jwt, DEBUG)
        app.use('/bucket', bucketRouter)
    } catch (err) {
        onerror('[bucketApp]', err)
    }

    // -- add session validation to master app

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
        res.status(500).json({ error: true, ...messages['500'] })
    })

    mongo.init().then(n => {
        // ------ run server
        app.listen(config.port)
        if (config.mongo.remote) attention('[remote][server]', 'running on port:', config.port)
        else attention('[localhost][server]', 'running on port:', config.port)
    }).catch(err => {
        onerror('[mongo]', err)
        onerror('[mongo]', 'server did not start')
    })

    return app
}
