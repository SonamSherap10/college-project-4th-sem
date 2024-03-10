const extractLocationData = (req, res, next) => {
  req.province = req.body.province || req.user[0].province;
  req.city = req.body.city || req.user[0].city;
  req.zone = req.body.zone || req.user[0].zone;
  next();
};

module.exports = extractLocationData;