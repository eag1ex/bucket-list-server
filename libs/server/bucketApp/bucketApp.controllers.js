module.exports = (dbc, mongo, jwt) => {
    const CONFIG = require('../../../config')
    const { onerror } = require('x-utils-es/umd')
    const { cleanOut, validID, validStatus } = require('../../utils')
    const messages = require('../../messages')
    // const debug = true
    const DBControllers = require('../../mongoDB/db.controllers')
    class ServerController {
        constructor(opts, debug) {
            this.debug = debug

            // adds intellisense support
            this.dbc = undefined
            if (dbc instanceof DBControllers) {
                // all good
                this.dbc = dbc
            } else {
                throw ('db is not of DBControllers')
            }
        }

        // async onMongoReady(req, res) {
        //     try {
        //         await mongo.mongooseReady.promise
        //         return true
        //     } catch (err) {
        //         onerror('[onMongoReady]', 'no db connection ?')
        //         // return res.status(400).json({ error: 'not connected to database' })
        //         throw new Error('no db connection')
        //     }
        // }
        /**
         * /bucket/app
         * render out app here
         * @param {*} req
         * @param {*} res
         */
        app(req, res, next) {
            if (req.url.indexOf('/api') !== -1) return next()
            else return res.render('../bucket-app/index')
        }

        /**
         * - (GET) REST/api
         * - `example:  /bucket/list`
         * -  return all items in the bucket for current user
         */
        async bucketList(req, res) {
            let limit = 50 // NOTE lets just set a static limit for now!
            // await this.onMongoReady(req, res)
            return this.dbc.db.listBuckets(limit)
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
        async createBucket(req, res) {
            //  await this.onMongoReady(req, res)
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

            return this.dbc.db.createBucket(bucketData)
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
        async updateBucketOnly(req, res) {
            //  await this.onMongoReady(req, res)
            const bucketID = req.params.id
            const body = req.body || {}

            if (!validID(bucketID)) return res.status(400).json({ error: 'Not a valid {id}' })
            if (!validStatus(body.status || '')) return res.status(400).json({ error: 'Not a valid {status} provided' })

            return this.dbc.db.updateBucketOnly(bucketID, { status: body.status })
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
        async updateBucketStatus(req, res) {
            // await this.onMongoReady(req, res)
            const bucketID = req.params.id
            const body = req.body || {}

            if (!validID(bucketID)) return res.status(400).json({ error: 'Not a valid {id}' })
            if (!validStatus(body.status || '')) return res.status(400).json({ error: 'Not a valid {status} provided' })

            return this.dbc.db.updateBucket(bucketID, { status: body.status })
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
        async createSubtask(req, res) {
            //   await this.onMongoReady(req, res)

            const bucketID = req.params.id
            const body = req.body

            if (!validID(bucketID)) return res.status(400).json({ error: 'Not a valid {id}' })
            if (!body.title || (body.title || '').length < 2) {
                return res.status(400).json({ error: 'Missing {title}, or too short' })
            }

            return this.dbc.db.createSubtask(bucketID, {
                user: { name: CONFIG.mongo.defaultUser },
                title: body.title,
                status: 'pending' })
                .then(({ subtaskDoc }) => this.dbc.db.getSubtask(subtaskDoc._id))
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
        async updateSubtaskStatus(req, res) {
            //  await this.onMongoReady(req, res)
            /*
                REVIEW
                following the last comment @createSubtask
                We can now retrieve our todo_id on an existing subtask from the client
            **/

            const subtaskID = req.params.todo_id
            const body = req.body || {}

            if (!validID(subtaskID)) return res.status(400).json({ error: 'Not a valid {todo_id}' })
            if (!validStatus(body.status || '')) return res.status(400).json({ error: 'Not a valid {status} provided' })

            return this.dbc.db.updateSubtask(subtaskID, { status: body.status })
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
