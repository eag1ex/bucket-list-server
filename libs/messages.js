const {onMessages} = require('./utils')


/**
 * - errors and messages
 * returns example : `{'001':{message,code},...}`
 */
module.exports = onMessages({
    '500':['Server error','500'],
    '001':['Route is no available','001']
})