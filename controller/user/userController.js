const db = require("../../model/index");
const User = db.User;
const Booking = db.Booking;

exports.BookProfessional = async (req, res) => {
  const employeeId = req.params.id;
  const customerId = req.user[0].id;
  const { province, city, zone } = req;
  const { jobDescription, From, Till, address, wagePerDay } = req.body;
   
  const from = `${From}` + `T00:01:00`
  const till = `${Till}` + `T23:59:59`

  const isEmpAvilable = await User.findByPk(employeeId);
   
  if(isEmpAvilable.role != "Employee") {
    return res.status(404).json({
      message: "Employee not found"
    });
  }

  const job = isEmpAvilable.jobTitle;
  if (isEmpAvilable.bookingStatus == "Booked") {
    return res.status(404).json({
      message: "Employee not Available",
    });
  }
  const hasBooked = await Booking.findAll({
    where: {
      customerId,
      employeeId,
    },
  }); 
  if (hasBooked.length > 0) {
    return res.status(404).json({
      message: "Employee already booked",
    });
  }
  await Booking.create({
    employeeId,
    customerId,
    job,
    jobDescription,
    from,
    till,
    province,
    city,
    zone,
    address,
    wagePerDay,
  });
  return res.status(200).json({
    message:
      "Booking created successfully . Waiting for Employee to be accepted",
  });
};

exports.viewRequests = async(req,res)=>{
  const customerId = req.user[0].id;
  const bookings = await Booking.findAll({
    where:{
      customerId,
      isAccepted : "Pending"
    },
  attributes: { exclude: ['createdAt','updatedAt','paymentStaus','workStatus','rating','comment','employeeId'] }
  })
  if(bookings.length ==0){
    return res.status(404).json({
      message : "No Bookings found"
    })
  }
  return res.status(200).json({
    data : bookings
  })
}


exports.cancelBooking = async(req,res)=>{
  const bookingId = req.params.id;
  const customerId = req.user[0].id;
  const booking = await Booking.findByPk(bookingId);
  if(booking.customerId!= customerId){
    return res.status(404).json({
      message : "Booking not found"
    })
  }
  if(req.body.status == 'cancel'){
    await booking.update({
      isAccepted : "Declined"
    })
    return res.status(200).json({
      message : "Booking cancelled successfully"
    })
  }
}



exports.viewBookedWorkers = async(req,res)=>{
  const customerId = req.user[0].id;
  console.log(customerId)
  const bookings = await Booking.findAll({
    where:{
      customerId,
      isAccepted : "Accepted"
    },
  attributes: { exclude: ['createdAt','updatedAt','paymentStaus','workStatus','rating','comment','id','employeeId'] }
  })
  if(bookings.length ==0){
    return res.status(404).json({
      message : "No Bookings found"
    })
  }
  return res.status(200).json({
    data : bookings
  })
}


exports.viewCompletedWorks = async(req,res)=>{
  const userId = req.user[0].id
  const booking = await Booking.findAll({where:{
  customerId: userId,
  workStatus : "Completed",
  paymentStatus :"Pending"
  },
  attributes: { exclude: ['createdAt','updatedAt','paymentStaus','workStatus','rating','comment','id','customerId'] }})
  
  if(booking.length ==0){
    return res.status(404).json({
      message : "No Bookings found"
    })
  }
  return res.status(200).json({
    message:"Data fetched successfully",
    data : booking
  })
} 



exports.rateProfessional = async(req,res)=>{
  const bookingId = req.params.id
  const userId = req.user[0].id
  const {rating,comment} = req.body

  const booking = await Booking.findByPk(bookingId)

  // if(booking.rating != 0){
  //   return res.status(400).json({
  //     message:"you have already rated this request"
  //   })
  // }

  if(!booking){
    return res.status(404).json({
      message : "No Bookings found"
    })
  }

  if( booking.customerId != userId){
    return res.status(400).json({
      message : "You cannot perform this action"
    })
  }
  //payment will be integrated here 
  // booking.paymentStatus = "Success"

  
  booking.rating = rating,
  booking.comment = comment
  await booking.save() 
 
 // updating the average rating of the employee
const employee = await User.findAll({where:{id : booking.employeeId}})

 //increment the job done by the employee
 employee[0].completedJobs += 1 
 employee[0].rating = employee[0].rating + rating
 employee[0].overallRating = employee[0].rating / employee[0].completedJobs 
 await employee[0].save()

return res.status(200).json({
  message :"Rating added Successfully. Thank you"
})
} 