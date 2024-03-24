module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define('Payment', {
    bookingId:{
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
    },
    pidx:{
      type: Sequelize.STRING
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
     },
     paymentMethod :{
       type: Sequelize.ENUM("Khalti","COD"),
       defaultValue : "Khalti"
     }
  });

  return Payment;
};



