require('dotenv').config(3)

module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: "",
  DB: process.env.DB,
  dialect: "mysql",
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
  },
};