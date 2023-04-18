const jwt = require("jsonwebtoken");
const User = require("../modals/User");

const adminAuth = async (req, res, next) => {
  let token = req.header("token");
  if (token) {
    try {
      let { id } = jwt.verify(token, process.env.SECRET);
      let user = await User.findOne({ _id: id });
      if (user.is_admin) {
        req.user = user;
        next();
      } else {
        return res.status(401).json({ err: "unauthorized access" });
      }
    } catch (err) {
      return res.status(401).json({ err: "invalid token" });
    }
  } else {
    res.status(401).json({ err: "auth token required !!" });
  }
};

module.exports = adminAuth;
