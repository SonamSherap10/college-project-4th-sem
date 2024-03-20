const extractLocationData = (req, res, next) => {
  req.province = req.body.province || req.user[0].province;
  req.district = req.body.district || req.user[0].district;
  req.city = req.body.city || req.user[0].city;
  next();
};

module.exports = extractLocationData;