const db = require("../../model/index");
const jwt = require("jsonwebtoken");
const {promisify} = require("util")
const User = db.User;
const UserQualification = db.UserQualifications;
const Rating = db.Rating;


exports.getAll = async (req, res) => {
  let searchOptions = {
    where: { isVerified: true, role:'Employee' },
    attributes: {
      exclude: [
        "password",
        "role",
        "isVerified",
        "otp",
        "role",
        "isOtpVerified",
        "createdAt",
        "updatedAt",
      ],
    },
  };

  const Employees = await User.findAll(searchOptions);

  // Filter out the user with username "admin"
  const filteredEmployees = Employees.filter(employee => employee.username !== 'Admin' );

  if (filteredEmployees.length === 0) {
    return res.status(404).json({
      message: "No Employees found"
    });
  } else {
    return res.status(200).json({
      data: filteredEmployees
    });
  }
};



exports.viewProfessionals = async (req, res) => {
  const  jobTitle  = req.params.job;
  const { province, district, city } = req.query;
  
  let searchOptions = {
    where: { jobTitle, isVerified: true },
    attributes: {
      exclude: [
        "password",
        "role",
        "isVerified",
        "otp",
        "role",
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
    // Check if a and b match all three attributes (province, district, and city)
    const aMatch =
      a.province === province && a.district === district && a.city === city;
    const bMatch =
      b.province === province && b.district === district && b.city === city;

    // Check if a and b match province and district only
    const aProvincedistrictMatch =
      a.province === province && a.district === district && a.city !== city;
    const bProvincedistrictMatch =
      b.province === province && b.district === district && b.city !== city;

    // Check if a and b match province only
    const aProvinceMatch =
      a.province === province && a.district !== district && a.city !== city;
    const bProvinceMatch =
      b.province === province && b.district !== district && b.city !== city;

    if (aMatch && !bMatch) return -1; // a comes before b if a matches and b does not
    if (!aMatch && bMatch) return 1; // b comes before a if b matches and a does not

    if (aProvincedistrictMatch && !bProvincedistrictMatch) return -1; // a comes before b if a matches province and district and b does not
    if (!aProvincedistrictMatch && bProvincedistrictMatch) return 1; // b comes before a if b matches province and district and a does not

    if (aProvinceMatch && !bProvinceMatch) return -1; // a comes before b if a matches province and b does not
    if (!aProvinceMatch && bProvinceMatch) return 1; // b comes before a if b matches province and a does not

    return 0; // leave the order unchanged if none of the conditions match
  });

  return res.status(200).json({
    data: Employees,
  });
};

exports.viewProfessionalsQualifications = async(req,res)=>{
  var empId = req.params.id
  if(!empId){
    return res.status(400).json({
      message : "Please provide user id"
    })
  }

  if(empId.length > 20){
    const decoded = await promisify(jwt.verify)(req.params.id,process.env.SECRET_KEY)
    var empId = decoded.id
  }

  const empFound = await User.findByPk(empId);
  if(!empFound){
    return res.status(404).json({
      message : "Employee not found"
    })
  }
  const userQualifications = await UserQualification.findAll({
    where: { userId: empId },
    attributes: { exclude: ["id","createdAt", "updatedAt"] }
  });
   
  if(userQualifications.length==0){
    return res.status(404).json({
      message : "No qualifications found"
    })
  }
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
    data: filteredQualifications,
    message : empFound.username
  });
}

exports.viewRating = async(req,res)=>{
  var {id} = req.params;
  
  if(id.length>30){
    const decoded = await promisify(jwt.verify)(req.params.id,process.env.SECRET_KEY)
    var id = decoded.id
  }

  const ratingFound = await Rating.findAll({where:{empId:id}})
  if(ratingFound.length==0){
    return res.status(404).json({
      message : "No ratings found"
    })
  }
 return res.status(200).json({
   data : ratingFound[0]
 })

}

