const sequelize = require('sequelize'); //import sequelize
const { DataTypes } = require('sequelize'); //import DataTypes from sequelize
const db = require('../config/db'); //import the database connection

const order = new sequelize(db, { //define the order model
user:{
    type: DataTypes.ObjectId,   //define the user field as an ObjectId
    ref: 'User',
},
books:{
    type: DataTypes.ObjectId,
    ref: 'Book',
},
status:{
    type: String,
    default: "order Placed",
    enum: ["order Placed", "order Accepted", "order Delivered", "order Cancelled"], // define the status field as an enum
},
}, {timestamps: true});

module.exports = order;
