
const validate = require('mongoose-validate')
const mongoose = require('mongoose')

/*
Bucket class
example: `new Bucket().model/$`
**/
class Bucket {
    constructor() {
        this.model = this.$ = null
        this.make()
    }

    make(name = 'Bucket') {
        const Model = mongoose.model(name, new mongoose.Schema(
            {
                user: {
                    name: { type: String, required: true, validate: [validate.alphanumeric, 'Invalid user/name'] }
                    // password:{type:String} // this would be a salt
                },

                title: {
                    type: String,
                    required: true
                },

                // [pending,completed]
                status: {
                    type: String,
                    required: true,
                    validate: [validate.alpha, 'Invalid status']
                },

                // NOTE referencing our Subtasks Model
                subtasks: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Subtask'
                }]
            },
            { timestamps: { createdAt: 'created_at' } }
        ))

        this.validators(Model, name)
        this.model = this.$ = Model
        return this
    }

    validators(Model, name) {
        Model.schema.path('status').validate(function(value) {
            return ['pending', 'completed'].indexOf(value) !== -1
        }, `Invalid status, refer to ${name} Schema`)

        Model.schema.path('title').validate(function(value) {
            return value.length > 1
        }, `Invalid title, refer to ${name} Schema`)
    }
}

module.exports = Bucket
