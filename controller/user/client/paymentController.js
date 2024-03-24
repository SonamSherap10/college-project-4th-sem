const { default: axios } = require("axios");
const db = require("../../../model/index");
const User = db.User;
const Booking = db.Booking;
const Payment = db.Payment;


exports.initializePayment = async (req, res) => {
  const bookingId = req.params.id;

  if (!bookingId) 
    return res.status(404).json({
      message: "Please provide booking id"
    });

  const booking = await Booking.findAll({
    where: {
      id: bookingId
    }
  });

  if (booking.length === 0) {
    return res.status(404).json({
      message: "Booking not found"
    });
  }

  if (booking[0].customerId !== req.user[0].id) {
    return res.status(400).json({
      message: "You are not authorized"
    });
  }

  const paymentDetails = await Payment.findAll({
    where: {
      bookingId
    }
  });

  if (paymentDetails[0].paymentStatus !== "Pending") {
    return res.status(400).json({
      message: "Payment has already been initiated"
    });
  }
  
  const TotalCharge = paymentDetails[0].totalPayment * 100;
  console.log(bookingId, TotalCharge)
  const data = {
    return_url: "http://localhost:7878/success",
    purchase_order_id: bookingId,
    amount: TotalCharge ,
    website_url: "http://localhost:7878/",
    purchase_order_name: "orderName_" + bookingId
  };

 const response = await axios.post("https://a.khalti.com/api/v2/epayment/initiate/",data,{
  headers: {
    'Authorization': 'key ec3c7505a7c84b15a68f21b2f45508b3'
  }
 })

console.log(response.data)

  paymentDetails[0].pidx = response.data.pidx;
  await paymentDetails[0].save();
 
  return res.status(200).json({
    message: "Payment initiated successfully",
    payment_url : response.data.payment_url
  });
}



exports.verifyPayment = async(req,res)=>{
  const pidx = req.query.pidx

  const response = await axios.post("https://a.khalti.com/api/v2/epayment/lookup/",{pidx},
  {
        headers :{
          'Authorization': 'key ec3c7505a7c84b15a68f21b2f45508b3'
        }
  })

  if(response.data.status == "Completed" ){
    const payment = await Payment.findAll({ where: { pidx}})
    payment[0].paymentStatus = "Completed";
    payment[0].paymentMethod = "Khalti";
    await payment[0].save();
    return res.status(200).json({
      message: "Payment verified successfully. Thank you for your time"
    });
  }
}
