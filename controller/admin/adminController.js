const db = require("../../model/index")
const User = db.User
const Rating = db.Rating;

exports.viewUnverifiedEmployee = async (req,res)=>{
  const allEmployees = await User.findAll({where:{role : 'Employee',isVerified : false},attributes: { exclude: ['password', 'otp','isOtpVerified','updatedAt'] }}) 
  if(allEmployees.length ==0){
    return res.status(404).json({
      message: "No unverified employees found"
    })
  }
  return res.status(200).json({
   data : allEmployees
  })
}     


exports.verifyEmployee = async (req,res)=>{
  const {id} = req.params
  if(!id){
    return res.status(400).json({
      message : "Please provide employee id"
    })
  }
  const employee = await User.findByPk(id)
  if(!employee){
    return res.status(404).json({
      message : "Employee not found"
    })
  }
  if(employee.isVerified){
    return res.status(400).json({
      message : "Employee already verified"
    })
  }

  if(employee.role != "Employee"){
    return res.status(404).json({
      message: "User is not a Employee"
    });
  }

const verified = req.body.verification
if (verified === true){
  employee.isVerified = verified
  employee.save()

  await Rating.create({
    empId : id,
    overallRating: 0,
    rating:0 ,
    completedJobs:0
  })

  return res.status(200).json({
    message :"employee has been verified"
  })
}
 
await User.destroy({where :{id:id}})
return res.status(200).json({
  message : "Employee has been deleted due to unverification"
}) 
}


exports.viewClients = async(req,res)=>{
  const allClients = await User.findAll({where:{role : 'Client',isVerified : true},
  attributes: { exclude: ['password', 'otp','isOtpVerified','updatedAt','jobTitle','qualifications','description','Wage','bookingStatus','overallRating','rating','completedJobs'] }}) 
  if(allClients.length ==0){
    return res.status(404).json({
      message: "No clients found"
    })
  }
  return res.status(200).json({
   data : allClients
  })
}

exports.viewEmployee = async(req,res)=>{
  const allEmployees = await User.findAll({where:{role : 'Employee',isVerified : true},attributes: { exclude: ['password', 'otp','isOtpVerified','updatedAt'] }}) 
  if(allEmployees.length ==0){
    return res.status(404).json({
      message: "No employees found"
    })
  }
  return res.status(200).json({
   data : allEmployees
  })
}


exports.deleteUser = async(req,res)=>{
  const {id} = req.params
  if(!id){
    return res.status(400).json({
      message : "Please provide user id"
    })
  }
  const user = await User.findByPk(id)
  if(!user){
    return res.status(404).json({
      message : "User not found"
    })
  }
  await User.destroy({where :{id:id}})
  return res.status(200).json({
    message : "User has been deleted"
  })
}

