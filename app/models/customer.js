var express = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    // Creates a "Character" model that matches up with DB
    var contact = sequelize.define("contact", {
        // the name of the character (a string)
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        phone: {
            type: DataTypes.BIGINT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'beginTime',
            defaultValue: sequelize.literal('NOW()')
          },
          updatedAt: {
            type: DataTypes.DATE,
            field: 'beginTime',
            defaultValue: sequelize.literal('NOW()')
          }
        }, {
          timestamps: true,
    });
    return contact;
};