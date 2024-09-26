const { Sequelize, DataTypes } = require('sequelize'); //import Sequelize and DataTypes from sequelize
const sequelize = new Sequelize('sqlite::memory:'); //connect to the database


const User = sequelize.define('User', {  //define the User model    
   username:{
       type: DataTypes.STRING,
       allowNull: false,
       unique: true,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar:{
        type: DataTypes.STRING,
        defaultValue: '', //add your link here
    },
    role:{
        type: DataTypes.STRING,
        defaultValue: 'user',
        validate: {
            isIn: [['user', 'admin']],
        },
    },
    // favourite, cart, and orders fields are removed for now as Sequelize does not support ObjectId type
}, {timestamps: true});

module.exports = User;