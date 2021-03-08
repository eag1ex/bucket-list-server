/*
    mongo test runs, and DB population
 */

const { mongoDB, dbControllers, Bucket, Subtask } = require('./libs/mongoDB')
const { onerror, log, debug, attention } = require('x-utils-es/umd');
const { before } = require('lodash');

const populate = async () => {
    const MongoDB = mongoDB()
    const mongo = new MongoDB(true)
    await mongo.init()


    // const executes = {}
    const executes = dbControllers()

    // or indirectly this
    //const bucketModel = new Bucket().$
    // const subtaskModel = new Subtask().$

    const exec = async () => {
        let modelDocs //{bucketDoc,subtaskDoc}
        const defaultUser = {
            user: {
                name: 'oozou'
            }
        }

        // NOTE remove all data from bucket and subtask models
        // let purged = await executes.purgeDB()
        // attention('[buckets][subtasks][purged]', purged)

        // NOTE remove only subtasks
        // let deleted = await executes.removeSubtasks(['604636f6d0454c08fc4151e4'])
        // attention('[subtask][deleted]', deleted)

        // NOTE remove Bucket and any containing subtasks
        // let deleted = await executes.removeBucketWithSubtask('6046394a864a27230cb75502')
        // attention('[bucket][deleted]', deleted)
     
        

        let bucket = await executes.createBucket({
            ...defaultUser,
            title: 'Trim to Thanland',
            status: 'pending'
        })
    
        attention('[Bucket]:\n', bucket)

        // NOTE to update bucket
        // bucket = await executes.updateBucket(bucket._id, { status: 'completed' })
        // attention('[Bucket][completed]:\n', bucket)



        await executes.createSubtask(bucket._id, {
            title: 'Visit Bangkok',
            status: 'pending',
            user: { name: bucket.user.name }
        })

        await executes.createSubtask(bucket._id, {
            title: 'Visit Ko Pha-ngan',
            status: 'pending',
            user: { name: bucket.user.name }
        })

        await executes.createSubtask(bucket._id, {
            title: 'Visit Chatuchak Park',
            status: 'pending',
            user: { name: bucket.user.name }
        })

        await executes.createSubtask(bucket._id, {
            title: 'Visit Chiang Mai',
            status: 'pending',
            user: { name: bucket.user.name }
        })

        modelDocs = await executes.createSubtask(bucket._id, {
            title: 'Visit Phuket',
            status: 'pending',
            user: { name: bucket.user.name }
        })


        // NOTE to update subtask
        // bucket = modelDocs.bucketDoc 
        // subtask = modelDocs.subtaskDoc
        // subtask = await executes.updateSubtask(subtask._id, { status: 'completed' })
        // attention('[subtask][update]:\n', subtask)



        bucket = await executes.bucketWithTasks(bucket._id)
        attention('[Bucket][populated]:\n', bucket)

    };

    exec().catch(err => {
        onerror('[exec]', err)
    })

};

populate().catch(err => {
    onerror('[populate]', err)
})
