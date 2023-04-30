const { Sequelize, Op, where } = require('sequelize')
const {User} = require('./models/models')
const sequelize = require('./db')

const deleteOldUsers = async() => {
    try {
        const allUsers = await User.findAll({limit: 10})
        await User.destroy({where:{id:{[Op.gt]: 10}}})
        console.log(`delete users`);
        return allUsers
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { deleteOldUsers }