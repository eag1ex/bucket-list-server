
/**
 * - ServerAuth extension
 */
module.exports = function(expressApp, jwt) {
    const q = require('q')
    const { log, warn, attention } = require('x-utils-es/umd')
    const config = require('../../config')
    const { validate, getToken, JWTverifyAccess } = require('../utils')

    return class ServerAuth {
        constructor(debug) {
            this.debug = debug
        }

        /**
         * allowed access without credentials
         *
         * @readonly
         */
        get allowed() {
            return ['/auth', '/login', '/signout', '/welcome', '/']
        }

        login(req, res, next) {
            res.setHeader('Content-Type', 'text/html')
            return res.render('login', {
            })
        }

        /**
         *authenticate your routes and generate new {token}
         *
         * @param {*} req
         * @param {*} res
         * @returns
         */
        postAuth(req, res) {
            const defer = q.defer()
            const auth = req.body
            // console.log('what is the auth.body',req.body);

            if (!auth) {
                warn('[postAuth]', 'wrong auth provided!')
                return res.status(400).json({ error: true, message: 'wrong auth provided!' })
            }

            // NOTE using fixed credentials, server session timeout
            if (auth.username.indexOf('eaglex') === -1 || auth.password.indexOf('eaglex') === -1) {
                return res.status(400).json({ error: true, message: 'wrong auth combination provided!' })
            }

            const authentication = {
                username: auth.username,
                password: auth.password,
                date: new Date()
            }

            // we are sending the profile in the token
            const token = jwt.sign(authentication, config.secret, { expiresIn: '30m' })
            req.session.accessToken = token

            // your "Authorization: Bearer {token}"
            attention('[header][authorization][token]', token)

            setTimeout(() => {
                log('[postAuth][success]')
                res.redirect(config.HOST + '/bucket/')
            }, 100)
        }

        async authCheck(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Allow-Methods', 'GET')
            res.header('Access-Control-Allow-Methods', 'POST')
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, token-expiry')
            res.header('Referrer-Policy', 'no-referrer') // for google external assets

            // allowed routes without auth
            const valid = validate(req.url, this.allowed)

            if (valid) return next()
            else {
                // check if token exists from server session or client supplied!
                const token = (req.session || {}).accessToken || getToken(req.headers)
                try {
                    await JWTverifyAccess(jwt, req, token)
                    return next()
                } catch (err) {
                    return res.status(400).send({ error: err })
                }
            }
        }

        AppUseAuth() {
            expressApp.use(this.authCheck.bind(this))
        }
    }
}
