const { Sequelize, Op } = require('sequelize')
const {User} = require('./models/models')
const sequelize = require('./db')

const deleteOldUsers = async() => {
    try {
        const users = await User.findAll({where:{id:{[Op.gt]: 10}}});
        await User.destroy({where:{id:{[Op.gt]: 10}}})
        return users;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { deleteOldUsers }