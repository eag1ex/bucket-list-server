
/**
 * - ServerAuth extension
 */
module.exports = function(expressApp) {
    return class ServerAuth {
        constructor(debug) {
            this.debug = debug
        }

        authCheck(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Allow-Methods', 'GET')
            res.header('Access-Control-Allow-Methods', 'POST')
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, token-expiry')
            // if (this.debug) log(`-- calling url: ${req.url}`)
            return next()
        }

        AppUseAuth() {
            expressApp.use(this.authCheck.bind(this))
        }
    }
}
