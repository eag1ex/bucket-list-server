

const mongoose = require('mongoose')

/*
Bucket class
example: `new Bucket().model` 
**/
class Bucket {

    constructor() {
        this.model = null
        this.create()
    }

    create(name = "Bucket") {

        const Schema = new mongoose.Schema(
            {
                title: {
                    type: String,
                    required: true,
                },

                // [pending,completed]
                status: {
                    type: String,
                    required: true,
                },
                created: {
                    type: Date,
                    required: true,
                }
            })

        // Schema.set('autoIndex', false)
        // Schema.set('versionKey', false)

        const Model = mongoose.model(name, Schema);

        // this.statics(Model)   

        this.validators(Model,name)
        this.model = Model

        return this
    }

    validators(Model, name) {
        Model.schema.path('status').validate(function (value) {
            return ['pending', 'completed'].indexOf(value) !== -1
        }, `Invalid status, refer to ${name} Schema`)

        Model.schema.path('title').validate(function (value) {
            return value.length > 1
        }, `Invalid title, refer to ${name} Schema`)
    }

    statics(Model) {

        // source: https://riptutorial.com/mongoose/example/10574/schema-statics
        // BucketModel.statics.findByLogin = async function (login) {
        //     let user = await this.findOne({
        //         username: login,
        //     });

        //     if (!user) {
        //         user = await this.findOne({ email: login });
        //     }

        //     return user;
        // };

    }
}

module.exports = Bucket


