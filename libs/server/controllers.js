`use strict`
const { Bucket, Subtask } = require('../mongoDB')
const { onerror,log,copy } = require('x-utils-es/umd')
const {toJson,cleanOut} = require('../utils')
const messages = require('../messages')
class ControllerLibs {

    /**
     @external class declared from bucketApp.js   
    */
    constructor(opts, debug) {
        this.debug = debug

        this.config = {
            models: {
                Bucket: (opts.models || {}).Bucket,
                Subtask: (opts.models || {}).Subtask
            }
        }

        /**
         * to target and assing new model just call:
            new this.models.Subtask(data)
            new this.models.Bucket(data)
         */
        this.models = {}
        try {
            if (this.config.models.Bucket instanceof Bucket) {
                this.models.Bucket = this.config.models.Bucket.$
            }

            if (this.config.models.Subtask instanceof Subtask) {
                this.models.Subtask = this.config.models.Subtask.$
            }

            if (!this.models.Subtask || !this.models.Bucket) {
                throw ('Subtask or Bucket models not available, check your opts={}')
            }

        } catch (err) {
            onerror('[ControllerLibs][models]', err)
        }
    }
}

 class ServerController extends ControllerLibs {
    constructor(opts, debug) {
        super(opts, debug)
    }

    /**
     * (GET) REST/api
     * `example:  /bucket/list`
     * @returns all items in the bucket for current user
     */
    bucketList(req, res) {

        //if (o.error) return res.status(200).json({ ...o });
        return res.status(200).json({
            params: req.params,
            response: true,
            code: 200
        });
    }


    /**
     * (POST) REST/api => /bucket/create
     * - create new bucket
     * - accepting: {title}
     * @returns new bucket {title,id,created_at,subtasks[]}
     */
     createBucket(req, res) {

         const bodyData = req.body ||{}
        
         return (async () => {

             let payload = {
                 status: 'pending',
                 title: bodyData.title,
                 subtasks: []
             }

             let bucket = new this.models.Bucket(payload)

             try {
                 const data = await bucket.save()
                 return data
             } catch (err) {
                 return Promise.reject(err)
             }

         })().then((data) => {
             log('[createBucket][done]',data._id)
             res.status(200).json({
                 response: cleanOut(data),
                 code: 200
             });

         }).catch(error => {

             if(!bodyData.title || (bodyData.title ||'').length<2 ){
                 return res.status(400).json({ error:'missing title, or too short' });
             }

             onerror('[createBucket]', error)
             res.status(400).json({ ...messages['002'] });
         })

     }


    /**
    * (POST) REST/api
    * - uodate status
    * `example:  /bucket/:id/update-status`
    * @returns updated status for selected bucket
    */
    updateBucketStatus(req, res) {

        /*
            accepting:
            ● staus
 
        * */

        //if (o.error) return res.status(200).json({ ...o });
        return res.status(200).json({
            params: req.params,
            response: true,
            code: 200
        });
    }



    /**
     * (POST) REST/api
     * - Create new subtask on current bucket, 
     * `example:  /bucket/:id/rel/subtask/create`
     * @returns newlly created subtask
     */
    createSubtask(req, res) {
        /*
            accepting:
            ● title
            ● todo_id
        * */
        //if (o.error) return res.status(200).json({ ...o });
        return res.status(200).json({
            params: req.params,
            response: true,
            code: 200
        });
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
        //if (o.error) return res.status(200).json({ ...o });
        return res.status(200).json({
            params: req.params,
            response: true,
            code: 200
        });
    }
}

module.exports = ServerController