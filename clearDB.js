const { Sequelize } = require('sequelize')
const {User} = require('./models/models')
const sequelize = require('./db')

const deleteOldUsers = async() => {
    try {
        const users = await User.findAll({
            order:[['createdAt', 'DESC']],
            offset: 10,
        });

        await User.destroy({
            where:{
                id: users.map(user => user.id)     
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { deleteOldUsers }