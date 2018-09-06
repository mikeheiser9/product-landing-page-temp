var express = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    // Creates a "Character" model that matches up with DB
    var product = sequelize.define("product", {
        // the name of the character (a string)
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        product_price: {
            type: DataTypes.DECIMAL(13,4),
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        producu_description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
    });
    return product;
};