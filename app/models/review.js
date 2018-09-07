var express = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    // Creates a "Character" model that matches up with DB
    var review = sequelize.define("review", {
        // the name of the character (a string)
            name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
            star_rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
            message: {
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
    return review;
};