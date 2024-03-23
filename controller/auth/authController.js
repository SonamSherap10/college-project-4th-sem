const db = require("../../model/index");
const User = db.User;
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken")
const sendEmail = require("../../services/sendEmail.js");

//create a new user
exports.createUser = async (req, res) => {
    const { username, email, Password, phoneNumber, province,district ,city, role, jobTitle, description,Wage} = req.body;
    const ProfilePicture = req.file
     
 if (!username || !email || !Password || !phoneNumber || !province || !district || !city ) {
    return res.status(404).json({
      message: "please provide all required data", 
    });
  }

  if(role == "Admin"){
    return res.status(400).json({
      message:"Cannot register as admin"
    })
  }

const addUser = await User.create({ 
    username,
    email,
    password: bcyrpt.hashSync(Password, 10),
    phoneNumber,
    province,
    district,
    city,
    profilePicture: process.env.BACKEND_URL + ProfilePicture.filename,
    role,
    jobTitle,
    description,
    Wage
  });

  if(role == "Client"){
    addUser.isVerified = true;
    await addUser.save();
  }
res.status(200).json({
  message: "user created successfully",
  data :User
})
};


//login user
exports.loginUser = async(req,res)=>{
  const {email,password} = req.body
  if(!email || !password){
      return res.status(400).json({
          message : "Please provide email and password"
      })
  }

  // check if that email user exists or not
  const userFound = await User.findAll({where: {email: email}})
  if(userFound.length == 0){
      return res.status(404).json({
          message : "User with that email is not Registered"
      }) 
  }
  
  // password check 
  const isMatched = bcyrpt.compareSync(password,userFound[0].password)
  if(isMatched){
     const token = jwt.sign({id : userFound[0].id},process.env.SECRET_KEY,{
      expiresIn : '30d'
     })
      res.status(200).json({
          message : "User logged in successfully",
         token : token
      })
  }else{
      res.status(400).json({
          message : "Invalid Password"
      })
  }
}

// forgot password
exports.forgotPassword = async (req,res)=>{
    const {email} = req.body;
    if(!email){
        return res.status(400).json({
            message : "Please provide email "
        })
    }

    // check if that email is registered or not
    const userExist = await User.findAll({where:{email : email}})
    
    if(userExist.length == 0){
        return res.status(404).json({
            message : "Email is not registered"
        })
    }

    // send otp to that email
    const otp = Math.floor(1000 + Math.random() * 90000);
    userExist[0].otp = otp  
    await userExist[0].save() 
   await sendEmail({
        email :email,
        subject : "Your Otp for forgetting your password",
        message : `Your otp is ${otp} . Please do not share`
    })
    res.status(200).json({
        message : "OTP sent successfully"
    })
  
}


// verify otp 
exports.verifyOtp = async(req,res)=>{
    const {email,otp} = req.body
    if(!email || !otp){
        return res.status(400).json({
            message : "Please provide email,otp"
        })
    }
    // check if that otp is correct or not of that email
   const userExists = await User.findAll({where:{email : email}})
   if(userExists.length == 0){
    return res.status(404).json({
        message : "Email is not registered"
    })
   }
   if(userExists[0].otp !== otp){
    res.status(400).json({
        message : "Invalid otp"
    })
   }else{
    // dispost the otp so cannot be used next time the same otp
    userExists[0].otp = null
    userExists[0].isOtpVerified = true
    await userExists[0].save()
    res.status(200).json({
        message : "Otp is Verified. Please reset your password"
    })
   }
  }

 
 //reset password 
exports.resetPassword = async (req,res)=>{
    const {email,newPassword,confirmPassword} = req.body
    if(!email || !newPassword || !confirmPassword){
        return res.status(400).json({
            message : "Please provide email,newPassword and confirmPassword"
        })
    }
    if(newPassword !== confirmPassword){
        return res.status(400).json({
            message : "newPassword and confirmPassword doesn't match"
        })
    }

    const userExists = await User.findAll({where:{email}})
    if(userExists.length == 0){
        return res.status(404).json({
            message : "User email not registered"
        })
    }
    if(userExists[0].isOtpVerified != true){
        return res.status(403).json({
            message : "You cannot perform this operation"
        })
    }

    userExists[0].password = bcyrpt.hashSync(newPassword,10)
    userExists[0].isOtpVerified = false;
    await userExists[0].save()

    res.status(200).json({
        message : "Password changed successfully"
    })
}