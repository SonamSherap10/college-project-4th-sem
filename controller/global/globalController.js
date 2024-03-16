const db = require("../../model/index");
const fs = require("fs")
const bcrypt = require("bcrypt")
const User = db.User;
const UserQualification = db.UserQualifications;

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

exports.viewProfessionalsQualifications = async(req,res)=>{
  const empId = req.params.id
  if(!empId){
    return res.status(400).json({
      message : "Please provide user id"
    })
  }

  const userQualifications = await UserQualification.findAll({
    where: { userId: empId },
    attributes: { exclude: ["id", "createdAt", "updatedAt"] }
  });

  const filteredQualifications = userQualifications.map(qualification => {
    const filtered = {};
    for (const key in qualification.dataValues) {
      if (qualification.dataValues[key] !== null) {
        filtered[key] = qualification.dataValues[key];
      }
    }
    return filtered;
  });

  return res.status(200).json({
    data: filteredQualifications
  });
}


exports.updateProfile = async(req,res)=>{
const { username, email, Password, phoneNumber, province,city ,zone, role, jobTitle, description,dailyRate} = req.body;
const {id} = req.params
const userId = req.user[0].id;
if(id!= userId) {
  return res.status(404).json({
    message : "You do not have permission to do this"
  })
}
const UserFound = await User.findByPk(userId);
const oldImage = UserFound.profilePicture
const lengthToCut = process.env.BACKEND_URL.length
//leko part lai old image bata cut garney so resulting name = 1706087002253-Criminal man.png
const finalFilePathAfterCut = oldImage.slice(lengthToCut)
// if file is incoming and the file has a appropriate file name  fs.ulink is used to delete the current image inside uploads folder - 1706087002253-Criminal man.png
if (req.file && req.file.filename) {
  fs.unlink("./uploads/" + finalFilePathAfterCut, (err) => {
    if (err) {
      console.log("error deleting file", err)
    } else {
      console.log("file deleted successfully")
    }
  })


  UserFound.set({
    username,
    password: bcrypt.hashSync(Password, 10),
    email,
    phoneNumber,
    province,
    city,
    zone,
    role,
    jobTitle,
    description,
    dailyRate,
    profilePicture: (req.file && req.file.filename) ? process.env.BACKEND_URL + req.file.filename : oldImage
  });
  
  await UserFound.save();
  
return res.status(200).json({
  message : "Profile updated successfully"
})
}

}