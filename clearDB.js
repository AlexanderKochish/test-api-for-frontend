const { Sequelize, Op, where } = require('sequelize')
const {User} = require('./models/models')
const sequelize = require('./db')

const deleteOldUsers = async() => {
    try {
        await User.destroy({where:{id: 12}})
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { deleteOldUsers }