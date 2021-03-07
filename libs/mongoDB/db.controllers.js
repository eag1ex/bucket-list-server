
/**
 * @dbControllers
 * our mongo executes live here
 */
function dbControllers(mongo,debug=false) {
    const { onerror, log, attention, sq,copy } = require('x-utils-es/umd')
    const { Bucket, Subtask } = require('./')
    const o = {}

    // our db models
    const db = {
        Bucket: new Bucket().$,
        Subtask: new Subtask().$
    }

    /**
     * @memberof Bucket
     * Create new initial Bucket
     * @param {*} bucketData data object, `{title,status}`
     * @returns bucketDoc
     */
    o.createBucket = function(bucketData = {}) {
        return db.Bucket.create(bucketData).then(doc => {
           if(debug) log('Bucket created', doc._id)
            return doc
        })
    }
    
     /**
     * @memberof Bucket
     * grub list of available buckets
     * @param {*} limit 
     * @returns [bucketDoc,...]
     */
    o.listBuckets = function (limit = -1) {
        if (!limit) limit = null
        const defer = sq()

        // https://stackoverflow.com/questions/11512965/mongoose-sort-query-by-populated-field
        db.Bucket.find({})
            .populate({path:'subtasks',select:'-__v'})
            .select('-__v')
            .limit(limit).sort('updatedAt')
            .exec(function (err, docList) {
                if (err) {
                    if (debug) onerror('[listBuckets]', err)
                    return defer.reject(err)
                }
                else {
                    if (debug) log('[listBuckets]', `size:${copy(docList).length}`)
                    defer.resolve(docList)
                }
            })
        return defer.promise
    }

    /**
     * @memberof Bucket
     * Updates existing Bucket
     * @param {*} bucketID `_id`
     * @param {*} bucketData data object, `{title,status}`
     * @returns bucketDoc
     */
    o.updateBucket = function(bucketID, bucketData = {}) {
        return db.Bucket.findByIdAndUpdate(bucketID, {
            ...(bucketData.status ? { status: bucketData.status } : {}),
            ...(bucketData.title ? { title: bucketData.title } : {})
        }, { new: true, useFindAndModify: false })
        .then(doc=>{
            log('Bucket updated', doc._id)
            return doc
        })
    }

    /**
     * @memberof Bucket
     * selects subtasks for this bucket in the output
     * @param {*} id `_id`
     * @returns bucketDoc
     */
    o.bucketWithPopulate = function(id) {
        return db.Bucket.findById(id)
            .populate('subtasks', '-_id -__v') // adds subtasks from by ref, excluding _id,__v
            .select('-__v') // exclude from Bucket in the results
    }

    /**
     * @memberof Subtask/Bucket
     * Create new initial Subtask belonging to Bucket
     * @param {*} bucketID `_id`
     * @param {*} subtaskData data object `{title,status}`
     * @returns {*} `{bucketDoc,subtaskDoc}`
     */
    o.createSubtask = function(bucketID, subtaskData = {}) {
        return db.Subtask.create(subtaskData).then(async(subtaskDoc) => {
            if(debug) log('Subtask created',subtaskDoc._id)

            const bucketDoc = db.Bucket.findByIdAndUpdate(
                bucketID,
                {
                    $push: {
                        subtasks: {
                            _id: subtaskDoc._id,
                            title: subtaskDoc.title,
                            status: subtaskDoc.status
                            // created_at: subtaskDoc.created_at,
                            // updatedAt: subtaskDoc.updatedAt
                        }
                    }
                },
                { new: true, useFindAndModify: false }
            )
            return Promise.all([bucketDoc, Promise.resolve(subtaskDoc)])
        }).then(docs => {
            let [bucketDoc, subtaskDoc] = Array.from(docs).values()
            return { bucketDoc, subtaskDoc }
        })
    }

    /**
     * @memberof Subtask
     * Updates existing Subtask
     * @param {*} subtaskID
     * @param {*} subtaskData
     * @returns subtaskDoc
     */
    o.updateSubtask = function(subtaskID, subtaskData = {}) {
        return db.Subtask.findByIdAndUpdate(subtaskID, {
            status: subtaskData.status
        }, { new: true, useFindAndModify: false }
        ).then(doc => {
            if(debug)  log('Subtask updated',doc._id)
            return doc
        })
    }

    return o
}

module.exports = dbControllers
