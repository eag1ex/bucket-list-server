`use strict`


module.exports = function (expressApp) {

    const { } = require('x-utils-es/umd')
    const { toJson } = require('../utils')


    return class ServerController {
        constructor(debug) {
            this.debug = debug

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
            return res.status(200).json({ params: toJson(req.params), response: true, code: 200 });
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
         * `example:  /bucket/:id/rel/subtask/:todo_id/create`
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
}