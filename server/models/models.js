const sequelize = require('.');
const { DataTypes } = require('sequelize');

const Property = sequelize.define('Property', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true }
},
{timestamps: false});;

const Message = sequelize.define('Message', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    message: { type: DataTypes.STRING, allowNull: true },
    date: { type: DataTypes.DATE, allowNull: true }
},
{timestamps: false});;

const Testimonial = sequelize.define('Testimonial', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: true },
    testimonial: { type: DataTypes.STRING, allowNull: true },
    date: { type: DataTypes.DATE, allowNull: true }
},
{timestamps: false});;

module.exports = {
    Property,
    Message,
    Testimonial
};