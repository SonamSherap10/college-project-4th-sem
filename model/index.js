const adminSeeder = require('../adminSeeder');
const dbConfig = require('./../dbConfig/dbConfig');
const { User } = require('./userModel');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: "",
    logging: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

// Custom
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Model Call
db.User = require('./userModel')(sequelize, Sequelize);
db.Booking = require('./bookingModel')(sequelize, Sequelize);
db.UserQualifications = require('./empQualificationsModel')(sequelize, Sequelize);
db.Rating = require('./ratingModel')(sequelize, Sequelize);
db.Payment = require('./paymentModel')(sequelize, Sequelize);

sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
        adminSeeder(db.User); // Pass the User model to the adminSeeder function
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = db;
