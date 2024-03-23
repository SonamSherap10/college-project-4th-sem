module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define('Payment', {
    bookingId:{
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
    },
    pidx:{
      type: Sequelize.INTEGER
     },
    payment:{
      type : Sequelize.INTEGER
    },
    addedCharge:{
      type : Sequelize.INTEGER
    }
    ,
    totalPayment:{
     type : Sequelize.INTEGER
    },
     paymentStatus:{
       type: Sequelize.ENUM("Completed" ,"Pending" ,"Refunded", "Expired", "User canceled"),
       defaultValue : "Pending"
     }
  });

  return Payment;
};



