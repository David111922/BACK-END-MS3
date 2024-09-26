const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const Order = db.define('Order', {
   userId:{
       type: DataTypes.INTEGER,
       references: {
         model: 'Users', // 'Users' refers to table name
         key: 'id', // 'id' refers to column name in Users table
       }
    },
    bookId:{
        type: DataTypes.INTEGER,
        references: {
          model: 'Books', // 'Books' refers to table name
          key: 'id', // 'id' refers to column name in Books table
        }
    },
    status:{
        type: DataTypes.ENUM,
        values: ["order Placed", "order Accepted", "order Delivered", "order Cancelled"],
        defaultValue: "order Placed",
    },
}, {timestamps: true});

module.exports = Order;