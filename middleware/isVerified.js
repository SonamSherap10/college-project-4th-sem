const { User } = require("../model");

async function verifyUserAndContinue(req, res, next) {
  try {
    const userFound = req.user;
    const verificationResult = await User.findByPk(userFound[0].id);
    if (verificationResult.isVerified === false) {
      return res.status(400).json({
        message: "You aren't verified please be patient"
      });
    }

    next();
  } catch (error) {
    console.error("Error during user verification:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

module.exports = verifyUserAndContinue;