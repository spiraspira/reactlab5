const Sequelize = require("sequelize");

module.exports = new Sequelize("nodelabsdb", "postgres", "1111", {
    dialect: "postgres",
    host: "localhost",
    port: "5432",
});