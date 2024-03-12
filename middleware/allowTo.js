const allowTo = (...roles)=>{
  return (req,res,next)=>{
     const userRole = req.user[0].role
     if(!roles.includes(userRole)){
      res.status(403).json({
          message : "you don't have permission to perform this action"
      })
     }else{
      next()
     }
  }

}

module.exports = allowTo