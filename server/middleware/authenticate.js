const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const secretKey = process.env.KEY;

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.Amazonweb;

    const verifyToken = jwt.verify(token, secretKey);
    // console.log(verifyToken);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    // console.log(rootUser);

    if (!rootUser) {
      throw new Error("user not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (error) {
    res.status(401).send("unautherized user:No token provide")
  }
};

module.exports=authenticate;
