const db = require("../../model/index");
const User = db.User;
const Booking = db.Booking;

exports.viewProfessionals = async (req, res) => {
  const { jobTitle } = req.body;
  const { province, city, zone } = req;

  let searchOptions = {
    where: { jobTitle, isVerified: true },
    attributes: {
      exclude: [
        "password",
        "role",
        "isVerified",
        "otp",
        "isOtpVerified",
        "createdAt",
        "updatedAt",
      ],
    },
  };

  const Employees = await User.findAll(searchOptions);
  if (Employees.length == 0) {
    return res.status(404).json({
      message: "No Employees found",
    });
  }

  // Custom sorting logic
  Employees.sort((a, b) => {
    // Check if a and b match all three attributes (province, city, and zone)
    const aMatch =
      a.province === province && a.city === city && a.zone === zone;
    const bMatch =
      b.province === province && b.city === city && b.zone === zone;

    // Check if a and b match province and city only
    const aProvinceCityMatch =
      a.province === province && a.city === city && a.zone !== zone;
    const bProvinceCityMatch =
      b.province === province && b.city === city && b.zone !== zone;

    // Check if a and b match province only
    const aProvinceMatch =
      a.province === province && a.city !== city && a.zone !== zone;
    const bProvinceMatch =
      b.province === province && b.city !== city && b.zone !== zone;

    if (aMatch && !bMatch) return -1; // a comes before b if a matches and b does not
    if (!aMatch && bMatch) return 1; // b comes before a if b matches and a does not

    if (aProvinceCityMatch && !bProvinceCityMatch) return -1; // a comes before b if a matches province and city and b does not
    if (!aProvinceCityMatch && bProvinceCityMatch) return 1; // b comes before a if b matches province and city and a does not

    if (aProvinceMatch && !bProvinceMatch) return -1; // a comes before b if a matches province and b does not
    if (!aProvinceMatch && bProvinceMatch) return 1; // b comes before a if b matches province and a does not

    return 0; // leave the order unchanged if none of the conditions match
  });

  return res.status(200).json({
    data: Employees,
  });
};

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