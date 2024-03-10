const db = require("../../model/index")
const User = db.User
const Booking = db.Booking
const schedule = require('node-schedule')

exports.viewBookingRequest = async(req,res)=>{
  const employeeId = req.user[0].id
  const allBookings = await Booking.findAll({where:{employeeId,isAccepted:"Pending"},
  attributes: { exclude: ['createdAt','updatedAt','paymentStaus','workStatus','rating','comment','id','employeeId'] }
   }) 
  if(allBookings.length ==0){
    return res.status(404).json({
      message: "No pending bookings found"
    })
  }
  return res.status(200).json({
    data : allBookings  
  })
}


exports.settleBookingRequest = async(req,res)=>{
  const {id} = req.params
  if(!id){
    return res.status(400).json({
      message : "Please provide booking id"
    })
  }
  const {willAccept} = req.body
  const booking = await Booking.findByPk(id)
  if(!booking){
    return res.status(404).json({
      message : "Booking not found"
    })
  }
  const startingDate = booking.from
  console.log(startingDate)

  if(willAccept == "Accept"){
    const updatedBooking = await booking.update({isAccepted : 'Accepted'})
    async function updateStatus(){
      const Employee = await User.findAll({where: {id: booking.employeeId}})
      Employee[0].bookingStatus = "Booked"
      Employee[0].save()
      booking.workStatus ="InProgress"
      console.log("nah id update")
    }      
    schedule.scheduleJob(startingDate,updateStatus)

    return res.status(200).json({
      message : "You have been booked successfully",
      data : updatedBooking
    })
    
   
  }
  return res.status(404).json({
    message : "Booking not accepted"
  })
}