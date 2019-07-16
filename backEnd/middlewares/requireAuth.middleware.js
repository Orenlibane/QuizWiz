const logger = require('../services/logger.service')

async function requireAuth(req, res, next) {
  console.log('req session when doing auth:', req.session.user);
  if (req.session.user) {
    console.log('we dont allow you to sign');
    this.$router.push('/')
    res.status(401).end('Unauthorized');
    return;
  }
  next();
}

module.exports = requireAuth
