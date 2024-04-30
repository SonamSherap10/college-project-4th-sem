const extractLocationData = (req, res, next) => {
  req.province = req.query.province || req.user[0].province;
  req.district = req.query.district || req.user[0].district;
  req.city = req.query.city || req.user[0].city;
  next();
};

module.exports = extractLocationData;