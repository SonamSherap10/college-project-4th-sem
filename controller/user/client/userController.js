const db = require("../../../model/index");
const User = db.User;
const Rating = db.Rating;
const Booking = db.Booking;

exports.BookProfessional = async (req, res) => {
  const employeeId = req.params.id;
  const customerId = req.user[0].id;
  const { province, district, city } = req;
  const { jobDescription, WorkDay, address, wagePerDay } = req.body;
  
  const workDay = `${WorkDay}` + `T00:01:00`

  const isEmpAvilable = await User.findByPk(employeeId);
  if(isEmpAvilable.role != "Employee") {
    return res.status(404).json({
      message: "Employee not found"
    });
  }

  if(isEmpAvilable.isVerified === false){
    return res.status(404).json({
      message: "Employee not verified"
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
      isAccepted : "Pending" || "Accepted"
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
    workDay,
    province,
    district,
    city,
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
      message : "You are not authorized to cancel"
    })
  }
if(booking. isAccepted =="Declined"){
  return res.status(404).json({
    message : "You have already declined this request"
  })
}

  if(req.body.status == 'cancel'){
    await booking.update({
      isAccepted : "Declined",
      workStatus : "Dropped"
    })
    return res.status(200).json({
      message : "Booking cancelled successfully"
    })
  }
}



exports.viewBookedWorkers = async(req,res)=>{
  const customerId = req.user[0].id;
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
  workStatus : "Completed"
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

  if(booking.workStatus == "Dropped"){
    return res.status(400).json({
      message : "You cannot rate dropped work"
    })
  }

  if(booking.rating != null ){
    return res.status(400).json({
      message :"you have already rated this job"
    })
  }

  booking.rating = rating,
  booking.comment = comment
  await booking.save() 
 
 // updating the average rating of the employee
const employee = await Rating.findAll({where:{ empId : booking.employeeId}})
 //increment the job done by the employee
 employee[0].completedJobs += 1 
 employee[0].rating = employee[0].rating + rating
 employee[0].overallRating = employee[0].rating / employee[0].completedJobs 
 await employee[0].save()

return res.status(200).json({
  message :"Rating added Successfully. Thank you"
})
} 



