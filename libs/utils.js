const { reduce } = require('lodash')
const { copy, onerror, isEmpty } = require('x-utils-es/umd')

exports.listRoutes = (stack, appNameRoute) => {
    return reduce(stack, (n, el, k) => {
        if (el.route) {
            if (((el.route || {}).path || '').indexOf('/') !== -1) {
                n.push({ route: appNameRoute ? `${appNameRoute}${el.route.path}` : el.route.path })
            }
        }
        return n
    }, [])
}

exports.toJson = (data) => {
    try {
        return JSON.stringify(data, null, 2)
    } catch (err) {
        return ''
    }
}

/**
 * check if mongo _id is valid format
 * @param {*} id
 */
exports.validID = (id) => {
    try {
        let rgx = new RegExp('^[0-9a-fA-F]{24}$')
        return rgx.test(id)
    } catch (err) {
        return false
    }
}

exports.validStatus = (status = '') => ['pending', 'completed'].indexOf(status || '') !== -1

/**
 * - remove unwanted props from output
 * @param {*} o
 * @param {*} modelType bucket/subtask
 */
exports.cleanOut = (o = {}, modelType = 'bucket') => {
    try {
        o = copy(o)
        if (isEmpty(o)) return {}

        if (!modelType || modelType === 'bucket') {
            delete o.__v
            // REVIEW  delete o.updatedAt just keep it for not
            o.id = o._id
            delete o._id
            delete o.user
            if ((o.subtasks || []).length) {
                o.subtasks = o.subtasks.map(n => {
                    n.todo_id = n._id
                    // REVIEW  delete n.updatedAt just keep it for not
                    delete n.__v
                    delete n._id

                    return n
                })
            }
        } else {
            delete o.__v
            // REVIEW  delete o.updatedAt just keep it for not
            o.todo_id = o._id
            delete o._id
        }

        return o
    } catch (err) {
        onerror('[cleanOut]', err)
        return { error: 'output error' }
    }
}

/**
 * - accepting object of messages, example: `{'001':['SimpleOrder listStore is empty',001],...}`
 * - returns : {'001':{message,code},...}
 */
exports.onMessages = (messages) => {
    const msgs = {}

    for (let [k, v] of Object.entries(messages)) {
        msgs[k] = { message: v[0], code: v[1] }
    }
    return msgs
}
