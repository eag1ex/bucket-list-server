const {onMessages} = require('./utils')


/**
 * - errors and messages
 * returns example :message[500]=> `{message,code}`
 */
module.exports = onMessages({
    '500':['Server error','500'],
    '600':['Mongo connection error','600'],
    '001':['Route is no available','001'],
    '002':['Issue with createing new bucket','002'], // createBucket
})