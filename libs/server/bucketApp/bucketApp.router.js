module.exports = (config = {}, db, mongo, jwt, DEBUG) => {
    const path = require('path')
    const { log } = require('x-utils-es/umd')
    const express = require('express')
    const bucketRouter = express.Router()
    const messages = require('../../messages')

    const ServerCtrs = require('./bucketApp.controllers')(db, mongo, jwt)

    // -------- Initialize our controllers
    const controllers = new ServerCtrs({}, DEBUG)

    bucketRouter.use(function timeLog(req, res, next) {
        log('Time: ', Date.now())
        next()
    })

    // app static routes
    // bucketRouter.use(express.static(path.join(config.viewsDir, './bucket-app')))

    // ---------- set server routes
    bucketRouter.get('/api/list', controllers.bucketList.bind(controllers))
    bucketRouter.post('/api/create', controllers.createBucket.bind(controllers))
    bucketRouter.post('/api/:id/update-status', controllers.updateBucketStatus.bind(controllers))
    bucketRouter.post('/api/:id/bucket-only-update-status', controllers.updateBucketOnly.bind(controllers))
    bucketRouter.post('/api/:id/rel/subtask/create', controllers.createSubtask.bind(controllers))
    bucketRouter.post('/api/rel/subtask/:todo_id/update-status', controllers.updateSubtaskStatus.bind(controllers))
    // render spa index file
    bucketRouter.get('/*', controllers.app.bind(controllers))
    // catch all other routes
    bucketRouter.all('/api/*', function(req, res) {
        res.status(400).json({ ...messages['001'], error: true })
    })

    return bucketRouter
}
