module.exports = (mongo) => {
    const CONFIG = require('../../../config')
    const { onerror } = require('x-utils-es/umd')
    const { cleanOut, validID, validStatus } = require('../../utils')
    const messages = require('../../messages')
    const debug = true
    const db = require('../../mongoDB').dbControllers(mongo, debug)

    class ServerController {
        constructor(opts, debug) {
            this.debug = debug
        }

        /**
         * - (GET) REST/api
         * - `example:  /bucket/list`
         * -  return all items in the bucket for current user
         */
        bucketList(req, res) {
            let limit = 50 // NOTE lets just set a static limit for now!

            return db.listBuckets(limit)
                .then(docs => docs.map(d => cleanOut(d)).filter(n => !n.error))
                .then(n => {
                    if (!n.length) return []
                    else return n
                })
                .then(d => {
                    return res.status(200).json({
                        response: d,
                        code: 200
                    })
                })
                .catch(err => {
                    onerror('[bucketList]', err)
                    return res.status(400).json({ ...messages['003'] })
                })
        }

        /**
         * - (POST) REST/api => /bucket/create
         * - Create new bucket
         * - Accepting: {title}
         */
        createBucket(req, res) {
            const body = req.body || {}

            if (!body.title || (body.title || '').length < 2) {
                return res.status(400).json({ error: 'missing title, or too short' })
            }

            const bucketData = {
                // NOTE assign static user to each request for now
                user: { name: CONFIG.mongo.defaultUser },
                status: 'pending',
                title: body.title
            }

            return db.createBucket(bucketData)
                .then((doc) => [cleanOut(doc)].filter(n => !n.error)[0])
                .then(n => {
                    if (n) return n
                    else return Promise.reject('cleanOut with no results')
                })
                .then(d => {
                    return res.status(200).json({
                        response: d,
                        code: 200
                    })
                })
                .catch(error => {
                    onerror('[createBucket]', error)
                    return res.status(400).json({ ...messages['002'] })
                })
        }

        /**
        * - (POST) REST/api
        * - update {status}
        * - Accepting {status}
        * - `example:  /bucket/:id/bucket-only-update-status`
        */
        updateBucketOnly(req, res) {
            const bucketID = req.params.id
            const body = req.body || {}

            if (!validID(bucketID)) return res.status(400).json({ error: 'Not a valid {id}' })
            if (!validStatus(body.status || '')) return res.status(400).json({ error: 'Not a valid {status} provided' })

            return db.updateBucketOnly(bucketID, { status: body.status })
                .then((doc) => [cleanOut(doc)].filter(n => !n.error)[0])
                .then(n => {
                    if (n) return n
                    else return Promise.reject('cleanOut with no results')
                })
                .then(d => {
                    return res.status(200).json({
                        response: d,
                        code: 200
                    })
                }).catch(error => {
                    onerror('[updateBucketOnly]', error)
                    return res.status(400).json({ ...messages['004'] })
                })
        }

        /**
        * - (POST) REST/api
        * - update {status}
        * - Accepting {status}
        * - `example:  /bucket/:id/update-status`
        */
        updateBucketStatus(req, res) {
            const bucketID = req.params.id
            const body = req.body || {}

            if (!validID(bucketID)) return res.status(400).json({ error: 'Not a valid {id}' })
            if (!validStatus(body.status || '')) return res.status(400).json({ error: 'Not a valid {status} provided' })

            return db.updateBucket(bucketID, { status: body.status })
                .then((doc) => [cleanOut(doc)].filter(n => !n.error)[0])
                .then(n => {
                    if (n) return n
                    else return Promise.reject('cleanOut with no results')
                })
                .then(d => {
                    return res.status(200).json({
                        response: d,
                        code: 200
                    })
                }).catch(error => {
                    onerror('[updateBucketStatus]', error)
                    return res.status(400).json({ ...messages['004'] })
                })
        }

        /**
         * - (POST) REST/api
         * - Create new subtask on current bucket
         * - Only return successfully added subtask on the bucket
         * - Accepting {title}
         * - `example:  /bucket/:id/rel/subtask/create`
         */
        createSubtask(req, res) {
            /* REVIEW
              client app should NOT be creating `ids` if we are use a database, correct ?
              Mongo will generate an id for us and we will return it in a request.
              PS: It would be bit silly to have two different ids on a subtask model, correct?
            **/

            const bucketID = req.params.id
            const body = req.body

            if (!validID(bucketID)) return res.status(400).json({ error: 'Not a valid {id}' })
            if (!body.title || (body.title || '').length < 2) {
                return res.status(400).json({ error: 'Missing {title}, or too short' })
            }

            return db.createSubtask(bucketID, {
                user: { name: CONFIG.mongo.defaultUser },
                title: body.title,
                status: 'pending' })
                .then(({ subtaskDoc }) => db.getSubtask(subtaskDoc._id))
                .then((doc) => [cleanOut(doc, 'subtask')].filter(n => !n.error)[0])
                .then(n => {
                    if (n) return n
                    else return Promise.reject('cleanOut with no results')
                })
                .then(d => {
                    return res.status(200).json({
                        response: d,
                        code: 200
                    })
                })
                .catch(error => {
                    onerror('[createSubtask]', error)
                    return res.status(400).json({ ...messages['005'] })
                })
        }

        /**
        * - (POST) REST/api
        * - Update subtask on current bucket
        * - `example: /bucket/rel/subtask/:todo_id/update-status`
        * - Accepting {status}
        */
        updateSubtaskStatus(req, res) {
            /*
                REVIEW
                following the last comment @createSubtask
                We can now retrieve our tod_id on an existing subtask from the client
            **/

            const subtaskID = req.params.todo_id
            const body = req.body || {}

            if (!validID(subtaskID)) return res.status(400).json({ error: 'Not a valid {todo_id}' })
            if (!validStatus(body.status || '')) return res.status(400).json({ error: 'Not a valid {status} provided' })

            return db.updateSubtask(subtaskID, { status: body.status })
                .then((doc) => [cleanOut(doc, 'subtask')].filter(n => !n.error)[0])
                .then(n => {
                    if (n) return n
                    else return Promise.reject('cleanOut with no results')
                })
                .then(d => {
                    return res.status(200).json({
                        response: d,
                        code: 200
                    })
                }).catch(error => {
                    onerror('[updateSubtaskStatus]', error)
                    return res.status(400).json({ ...messages['006'] })
                })
        }
    }
    return ServerController
}
