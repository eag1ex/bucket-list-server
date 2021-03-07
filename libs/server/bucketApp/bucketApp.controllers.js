`use strict`
module.exports = (mongo) => {
    const CONFIG = require('../../../config')
    const { onerror, log, copy } = require('x-utils-es/umd')
    const { cleanOut,validID,validStatus } = require('../../utils')
    const messages = require('../../messages')
    const debug = true
    const db = require('../../mongoDB').dbControllers(mongo,debug)

    class ServerController {
        constructor(opts, debug) {
            this.debug = debug
        }

        /**
         * (GET) REST/api
         * `example:  /bucket/list`
         * @returns all items in the bucket for current user
         */
        bucketList(req, res) {

            let limit = 50 //NOTE lets just set a static limit for now!

            return db.listBuckets(limit)
                .then(docs => docs.map(d => cleanOut(d)).filter(n => !n.error))
                .then(n => {
                    if (n.length) return n
                    else return Promise.reject('cleanOut with no results')
                })
                .then(d => {
                   return res.status(200).json({
                        response: d,
                        code: 200
                    })
                })
                .catch(err => {
                    onerror('[bucketList]',err)
                    return res.status(400).json({ ...messages['003'] })
                })
        }

        /**
         * (POST) REST/api => /bucket/create
         * create new bucket
         * accepting: {title}
         */
        createBucket(req, res) {
            const body = req.body || {}

            if (!body.title || (body.title || '').length < 2) {
                return res.status(400).json({ error: 'missing title, or too short' })
            }
           
            const bucketData = {
                // NOTE assing static user to each request for now
                user: { name: CONFIG.mongo.defaultUser },
                status: 'pending',
                title: body.title
            }

            return db.createBucket(bucketData)
                .then((doc) => [cleanOut(doc)].filter(n => !n.error)[0])
                .then(n=>{
                    if(n) return n
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
        * (POST) REST/api
        *  update {status}
        * `example:  /bucket/:id/update-status`
        */
        updateBucketStatus(req, res) {

            const bucketID = req.params.id
            const body = req.body || {}

            if (!validID(bucketID)) return res.status(400).json({ error: 'Not a valid {id}' })
            if (!validStatus(body.status || '')) return res.status(400).json({ error: 'Not a valid {status} provided' })

            db.updateBucket(bucketID, { status: body.status })
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
         * (POST) REST/api
         * - Create new subtask on current bucket,
         * `example:  /bucket/:id/rel/subtask/create`
         */
        createSubtask(req, res) {

            const bucketID = req.params.id
            
            const subtaskData = req.body
            if(!subtaskData.title || (subtaskData.title || '').length < 2){
                return res.status(400).json({ error: 'missing title, or too short' })
            }

           // db.createSubtask(bucketID,)

            /*
                accepting:
                ● title
                ● todo_id
            * */
            // if (o.error) return res.status(200).json({ ...o });
            return res.status(200).json({
                params: req.params,
                response: true,
                code: 200
            })
        }

        /**
        * (POST) REST/api
        * - Update subtask on current bucket
        * `example: /bucket/:id/rel/subtask/:todo_id/update-status`
        * @returns updated status for selected subtask
        */
        updateSubtaskStatus(req, res) {
            /*
                accepting:
                ● status
            * */
            // if (o.error) return res.status(200).json({ ...o });
            return res.status(200).json({
                params: req.params,
                response: true,
                code: 200
            })
        }
    }
    return ServerController
}
