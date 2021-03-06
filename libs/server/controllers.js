`use strict`
const { Bucket, Subtask } = require('../mongoDB')
const { onerror } = require('x-utils-es/umd')

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

        this.models = {}
        try {
            if (this.config.models.Bucket instanceof Bucket) {
                this.models.Bucket = this.config.models.Bucket.model()
            }

            if (this.config.models.Subtask instanceof Subtask) {
                this.models.Subtask = this.config.models.Subtask.model()
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
        console.log('this.models/Bucket', this.models.Bucket)
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
     * (POST) REST/api
     * - Make new order
     * `example:  /bucket/create`
     * @returns newlly created bucket
     */
    createBucket(req, res) {

        /*
            accepting:
            ● title
 
            * */

        //if (o.error) return res.status(200).json({ ...o });
        return res.status(200).json({
            params: req.params,
            response: true, code: 200
        });
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