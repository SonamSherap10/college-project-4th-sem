module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      } 
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.ENUM("Client","Employee","Admin"), 
      defaultValue: "Client"
    },
    jobTitle :{
      type : Sequelize.STRING,
      allowNull: true
    }
    ,
    phoneNumber: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: true
    },
   province:{
    type: Sequelize.ENUM("Koshi","Madhes","Bagmati","Gandaki","Lumbini","Karnali","Sudurpashchim"),
    allowNull: false
   },
    district:{
      type: Sequelize.STRING,
      allowNull: false
    },
    city:{
      type: Sequelize.STRING,
      allowNull: false
    }, 
    profilePicture: {
      type: Sequelize.STRING,
      allowNull: true
    },
    description :{
      type: Sequelize.STRING,
      allowNull: true
    },
    Wage:{
      type: Sequelize.INTEGER,
      allowNull: true,
      validate: {
        min: 100,
        max: 900
    }
    },
    isVerified:{
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    bookingStatus:{
      type: Sequelize.ENUM("Available","Booked"),
      defaultValue:"Available"
    },
    otp:{
      type: Sequelize.INTEGER,
      allowNull: true
    },
    isOtpVerified:{
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });

  return User;
};
