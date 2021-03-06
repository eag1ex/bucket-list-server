const { reduce } = require('lodash')
const {copy} = require('x-utils-es/umd')
exports.listRoutes = (stack, appNameRoute) => {
    return reduce(stack, (n, el, k) => {
        if (el.route) {
            if (((el.route || {}).path || '').indexOf('/') !== -1) {
                n.push({ route: appNameRoute ? `${appNameRoute}/${el.route.path}` : el.route.path })
            }
        }
        return n
    }, [])
}

exports.toJson = (data) => {
    try {
        return JSON.stringify(data,null,2)
    } catch (err) {
        return ''
    }
}

/**
 * - remove unwanted props from output
 * @param {*} o
 */
exports.cleanOut = (o = {}) => { 
    try {
        o = copy(o)
        delete o.updatedAt
        delete o.__v
        o.id = o._id
        delete o._id
        return o
    } catch (err) {
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