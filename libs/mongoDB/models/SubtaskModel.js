
const validate = require('mongoose-validate')
const mongoose = require('mongoose')

/*
Subtask class
example: `new Subtask().model/$`
**/
class Subtask {
    constructor() {
        this.model = this.$ = null
        this.make()
    }

    make(name = 'Subtask') {
        const Model = mongoose.model(name, new mongoose.Schema(
            {
                title: {
                    type: String,
                    required: true
                },

                // [pending,completed]
                status: {
                    type: String,
                    required: true,
                    validate: [validate.alpha, 'Invalid status']
                }
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

        return this
    }
}

module.exports = Subtask
