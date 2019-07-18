const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    const { email, password } = req.body
    try {
        // console.log('we got req:', req.body);
        const user = await authService.login(email, password)
        // console.log('user frin authcontroller loginL', user);
        req.session.user = user;
        console.log('req.session when logging in:', req.session.user);
        res.json(user)
    }
    catch (err) {
        res.status(401).send({ error: err })
    }
}

async function signup(req, res) {
    // console.log('we got to the auth controller. the req is:', req.body);
    try {
        const { email, password, username } = req.body
        logger.debug(email + ", " + username)
        const user = await authService.signup(email, password, username)
        logger.debug(`auth.route - new user created: ` + JSON.stringify(user))
        req.session.user = user
        res.status(200).send(user)
    } catch (err) {
        logger.error('[SIGNUP] ' + err)
        res.status(500).send({ error: 'could not signup, please try later' })
    }
}

async function logout(req, res) {
    try {
        req.session.destroy()
        res.send({ message: 'logged out successfully' })
        this.$router.push('/welcome')
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

module.exports = {
    login,
    signup,
    logout
}