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
       type: Sequelize.ENUM("Pending","Success"),
       defaultValue : "Pending"
     }
  });

  return Payment;
};



