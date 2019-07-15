const userService = require('./user.service')

async function getUser(req, res) {
    const user = await userService.getById(req.params.id)
    res.send(user)
}
  
const getUsers = async (req, res) => {
    const users = await userService.query()
    res.send(users)
}

async function deleteUser(req, res) {
    await userService.remove(req.params.id)
    res.send({})
}

module.exports = {
    getUser,
    getUsers,
    deleteUser
}