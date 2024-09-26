const { DataTypes } = require('sequelize');  //import DataTypes from sequelize
const db = require('../config/db');  //import the database connection

const Book = db.define('Book', {   //define the Book model
    url:{
        type: DataTypes.STRING,    //define the url field as a string
        allowNull: false,
    },
    title:{
        type: DataTypes.STRING,    //define the title field as a string
        allowNull: false,
    },
    author:{
        type: DataTypes.STRING,    //define the author field as a string
        allowNull: false,
    },
    price:{
        type: DataTypes.INTEGER,   //define the price field as an integer
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,    //define the description field as a string
        allowNull: false,
    },
}, {timestamps: true});           //enable timestamps

module.exports = Book; //export the Book model