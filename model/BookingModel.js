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
    from:{
      type: Sequelize.DATE,
      allowNull: false
    },
    till:{
      type: Sequelize.DATE,
      allowNull: false
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
    address:{
      type: Sequelize.STRING
    },
    isAccepted:{
      type: Sequelize.STRING,
      enum :["Pending","Accepted","Declined"],
      defaultValue : "Pending"
    },
    workStatus:{
      type: Sequelize.STRING,
      enum :["Pending","InProgress","Completed"],
      defaultValue : "Pending"
    },
    wagePerDay:{
      type: Sequelize.INTEGER,
      validate: {
        min: 500,
        max: 10000
    }
  },
    paymentStaus:{
      type: Sequelize.STRING,
      enum :["Pending","Completed"],
      defaultValue : "Pending"
    },
    rating:{
      type: Sequelize.INTEGER,
      validate: {
        min: 1,
        max: 5
    }
    },
    comment:{
      type: Sequelize.STRING
    }
  });

  return Booking;
};
