module.exports = (mongo, bucketRouter, DEBUG) => {
    const messages = require('../messages')
    const Bucket = require('../mongoDB').Bucket
    const Subtask  = require('../mongoDB').Subtask

    const ServerCtrs = require('./Controllers')

    // -------- Initialize our controllers

    const opts = {
        // this is our mongo instance
        mongo,
        // this is our models for this app
        models: {
            Bucket: new Bucket(),
            Subtask: new Subtask()
        }
    }
    
    const controllers = new ServerCtrs(opts, DEBUG)

    bucketRouter.use(function timeLog(req, res, next) {
        console.log('Time: ', Date.now())
        next()
    })


    //---------- set server routes
    bucketRouter.get('/list', controllers.bucketList.bind(controllers));
    bucketRouter.post('/create', controllers.createBucket.bind(controllers))
    bucketRouter.post('/:id/update-status', controllers.updateBucketStatus.bind(controllers));
    bucketRouter.post('/:id/rel/subtask/create', controllers.createSubtask.bind(controllers))
    bucketRouter.post('/:id/rel/subtask/:todo_id/update-status', controllers.updateSubtaskStatus.bind(controllers))

    // catch all other routes
    bucketRouter.all("*", function (req, res) {
        res.status(400).json({ ...messages['001'], error: true })
    })
}