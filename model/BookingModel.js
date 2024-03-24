module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define('booking', {
    employeeId:{
      type: Sequelize.INTEGER,
      allowNull: false
    },
    customerId :{
      type: Sequelize.INTEGER,
      allowNull: false
    } ,
    job:{
      type: Sequelize.STRING,
      allowNull: false
    },
    jobDescription:{
      type: Sequelize.STRING,
      allowNull: false
    },
    workDay:{
      type: Sequelize.DATE,
      allowNull: false
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
    address:{
      type: Sequelize.STRING
    },
    isAccepted:{
      type: Sequelize.ENUM("Pending","Accepted","Declined","Concluded"),
      defaultValue : "Pending"
    },
    workStatus:{
      type: Sequelize.ENUM("Pending","InProgress","Completed","Dropped"),
      defaultValue : "Pending"
    },
    wagePerDay:{
      type: Sequelize.INTEGER,
      validate: {
        min: 500,
        max: 1000
    }
  },
    rating:{
      type: Sequelize.INTEGER,
      validate: {
        min: 1,
        max: 5
    },
    defaultValue: null
    },
    comment:{
      type: Sequelize.STRING
    },
    completedIn:{
      type: Sequelize.DATE,
      allowNull: true
    }
  });

  return Booking;
};
