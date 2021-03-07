/*
our mongo test runs and population
 */

const { mongoDB, dbControllers } = require('./libs/mongoDB')
const { onerror, log,debug,attention } = require('x-utils-es/umd')

const populate = async () => {
    const MongoDB = mongoDB()
    const mongo = new MongoDB(true)
    await mongo.init()
    const executes = dbControllers()


    const exec = async () => {
        let bucket = await executes.createBucket({
            user: {
                name: 'oozou'
            },
            title: 'Trim to Thanland',
            status: 'pending'
        })

        attention('[Bucket]:\n', bucket)

        bucket  = await executes.updateBucket(bucket._id,{status:'completed'})
        attention('[Bucket][completed]:\n', bucket)

        const { bucketDoc, subtaskDoc } = await executes.createSubtask(bucket._id, {
            title: 'Visit Bangkok',
            status: 'pending'
        })

        bucket = bucketDoc
        subtask = subtaskDoc
        subtask = await executes.updateSubtask(subtask._id,{status:'completed'})
       

        attention('[subtask][update]:\n', subtask)

        bucket = await executes.bucketWithPopulate(bucket._id)
        attention('[Bucket][populated]:\n', bucket)

    };

    exec().catch(err => {
        onerror('[exec]', err)
    })

};

populate().catch(err => {
    onerror('[populate]', err)
})
