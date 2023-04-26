const { Sequelize } = require('sequelize')
const {User} = require('./models/models')
const sequelize = require('./db')

const deleteOldUsers = async() => {
    try {
        await User.destroy({where:{
            id:{
                [Sequelize.Op.notIn]: sequelize.literal('(SELECT id FROM users ORDER BY id LIMIT 10)')}}})
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { deleteOldUsers }