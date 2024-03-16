const db = require("../../model/index");
const User = db.User;

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


