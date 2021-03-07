/*
our mongo test runs and population
 */

const { mongoDB, Bucket, Subtask } = require('./libs/mongoDB')
const { onerror, log,debug,attention } = require('x-utils-es/umd')

const populate = async () => {
    const MongoDB = mongoDB()
    const mongo = new MongoDB(true)
    await mongo.init()

    // our models
    const db = {
        Bucket: new Bucket().$,
        Subtask: new Subtask().$
    }


    const createBucket = function (bucket) {
        return db.Bucket.create(bucket).then(doc => {
            log("Created Bucket:\n", doc);
            return doc;
        });
    };

    const updateBucket = function(bucketID,bucket){
            return db.Bucket.findByIdAndUpdate(bucketID,{
                ...(bucket.status ? {status:bucket.status }:{}),
                ...(bucket.title ? {title:bucket.title }:{})
            }, { new: true, useFindAndModify: false });
    }

    const createSubtask = function (bucketID, subtask) {
        return db.Subtask.create(subtask).then(async(subtaskDoc) => {

            log("Created Subtask:\n", subtaskDoc);

            const bucketDoc = db.Bucket.findByIdAndUpdate(
                bucketID,
                {
                    $push: {
                        subtasks: {
                            _id: subtaskDoc._id,
                            title: subtaskDoc.title,
                            status: subtaskDoc.status,
                            // created_at: subtaskDoc.created_at,
                            // updatedAt: subtaskDoc.updatedAt
                        }
                    }
                },
                { new: true, useFindAndModify: false }
            );

            return {
               bucketDoc: await bucketDoc,
               subtaskDoc
            }
        });
    };

    //  /bucket/:id/rel/subtask/:todo_id/update-status`
    const updateSubtask = function (subtaskID, subtask) {

        return db.Subtask.findByIdAndUpdate(subtaskID, {
            status: subtask.status
        }, { new: true, useFindAndModify: false }
        ).then(doc => {
            log('Updated Subtask')
            return doc
        })
    };


      const bucketWithPopulate = function(id) {
        return db.Bucket.findById(id)
          .populate("subtasks", "-_id -__v")
        //   .populate("category", "name -_id")
        .select("-__v"); // exclude from results
      };


    const exec = async () => {
        let bucket = await createBucket({
            user: {
                name: 'oozou'
            },
            title: 'Trim to Thanland',
            status: 'pending'
        })

        attention('[Bucket]:\n', bucket)

        bucket  = await updateBucket(bucket._id,{status:'completed'})
        attention('[Bucket][completed]:\n', bucket)

        const { bucketDoc, subtaskDoc } = await createSubtask(bucket._id, {
            title: 'Visit Bangkok',
            status: 'pending'
        })

        bucket = bucketDoc
        subtask = subtaskDoc
        subtask = await updateSubtask(subtask._id,{status:'completed'})
       

        attention('[subtask][update]:\n', subtask)

        bucket = await bucketWithPopulate(bucket._id)
        attention('[Bucket][populated]:\n', bucket)

    };

    exec().catch(err => {
        onerror('[exec]', err)
    })

};

populate().catch(err => {
    onerror('[populate]', err)
})
