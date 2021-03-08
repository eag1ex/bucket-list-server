
/**
 * @dbControllers
 * our mongo executes live here
 */
function dbControllers(mongo, debug = false) {
    const { onerror, log, sq, copy } = require('x-utils-es/umd')
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
        return db.Bucket.create(bucketData)
    }

    /**
     * @memberof Bucket
     * grub list of available buckets
     * @param {*} limit
     * @returns [bucketDoc,...]
     */
    o.listBuckets = function(limit = -1) {
     
        return db.Bucket.find({})
            .populate({ path: 'subtasks', select: '-__v' })
            .select('-__v')
            .limit(limit).sort('updatedAt')
    }

    /**
     * @memberof Bucket
     * Find and return Bucket with subtasks
     * @param {*} bucketID
     */
    o.getBucket = (bucketID) => {
        return db.Bucket.findById(bucketID)
            .populate({ path: 'subtasks', select: '-__v' })
            .select('-__v')
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
            .then(doc => {
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
    o.bucketWithTasks = (id)=> {
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
    o.createSubtask = (bucketID, subtaskData = {}) =>{
        return db.Subtask.create(subtaskData).then(async(subtaskDoc) => {

            const bucketDoc = db.Bucket.findByIdAndUpdate(
                bucketID,
                {
                    $push: {
                        subtasks: {
                            _id: subtaskDoc._id,
                            title: subtaskDoc.title,
                            status: subtaskDoc.status,
                            user: { name: subtaskDoc.user.name }
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
     * Find and return subtask
     * @param {*} subtaskID
     */
    o.getSubtask = (subtaskID) => {
        return db.Subtask.findById(subtaskID)
            .select('-__v')
    }

    /**
     * @memberof Subtask
     * Updates existing Subtask
     * @param {*} subtaskID
     * @param {*} subtaskData
     * @returns subtaskDoc
     */
    o.updateSubtask = (subtaskID, subtaskData = {})=> {
        return db.Subtask.findByIdAndUpdate(subtaskID, {
            status: subtaskData.status
        }, { new: true, useFindAndModify: false })
    }

    o.removeBucketWithSubtask = async (bucketID) => {

        try {
            const doc = await db.Bucket.findById(bucketID)
            if (!doc) return {}

            const ids = doc.subtasks || []
            if (ids.length) await db.Subtask.deleteMany({ _id: { $in: ids } })
            return await { deleted: doc.delete() }
        } catch (err) {
            return Promise.reject(err)
        }
    }

    o.removeSubtasks =  (ids=[])=> {
        return db.Subtask.deleteMany({ _id: { $in: ids } })
    }

    o.removeBuckets =  (ids=[])=> {
        return db.Bucket.deleteMany({ _id: { $in: ids } })
    }

    /**
     * @memberof Bucket/Subtask
     * remove all data from Bucket and Subtask models
     */
    o.purgeDB = async () => {
        try {
            const subtasks = await db.Subtask.deleteMany({})
            const buckets = await db.Bucket.deleteMany({})
            return { buckets, subtasks }
        } catch (err) {
            return Promise.reject(err)
        }
    }   



    return o
}

module.exports = dbControllers
