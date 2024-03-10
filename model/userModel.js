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
      type: Sequelize.STRING,
      enum:["Employer","Employee"],
      defaultValue:"Employee"
    },
    jobTitle :{
      type : Sequelize.STRING,
      allowNull: false
    }
    ,
    phoneNumber: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
   province:{
    type: Sequelize.STRING,
    allowNull: false
   },
    city:{
      type: Sequelize.STRING,
      allowNull: false
    },
    zone:{
      type: Sequelize.STRING,
      allowNull: false
    }, 
    profilePicture: {
      type: Sequelize.STRING,
      allowNull: true
    },
    qualifications:{
      type: Sequelize.STRING,
      allowNull: true
    },
    description :{
      type: Sequelize.STRING,
      allowNull: true
    },
    dailyRate:{
      type: Sequelize.INTEGER,
      allowNull: true
    },
    isVerified:{
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    bookingStatus:{
      type: Sequelize.STRING,
      enum:["Available","Booked"],
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
