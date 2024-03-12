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
      enum :["Pending","Accepted","Declined","Concluded"],
      defaultValue : "Pending"
    },
    workStatus:{
      type: Sequelize.STRING,
      enum :["Pending","InProgress","Completed","Dropped"],
      defaultValue : "Pending"
    },
    wagePerDay:{
      type: Sequelize.INTEGER,
      validate: {
        min: 500,
        max: 10000
    }
  },
  payment:{
     type : Sequelize.INTEGER
  },
    paymentStatus:{
      type: Sequelize.STRING,
      enum :["Pending","Success"],
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
    },
    completedIn:{
      type: Sequelize.DATE,
      allowNull: true
    }
  });

  return Booking;
};
