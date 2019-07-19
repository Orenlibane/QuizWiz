const logger = require('../services/logger.service')

async function requireAuth(req, res, next) {
  if (req.session.user) {
    console.log('we dont allow you to sign');
    res.status(401).end('Unauthorized');
    return;
  }
  next();
}

module.exports = requireAuth
