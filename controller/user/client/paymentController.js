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

  console.log(response.data);
}

