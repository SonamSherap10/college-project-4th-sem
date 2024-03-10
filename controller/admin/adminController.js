const db = require("../../model/index")
const User = db.User

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
const verified = req.body.verification
if (verified === true){
  employee.isVerified = verified
  employee.save()
  return res.status(200).json({
    message :"employee has been verified"
  })
}
 
await User.destroy({where :{id:id}})
return res.status(200).json({
  message : "Employee has been deleted due to unverification"
}) 
}

