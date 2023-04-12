const jwt = require("jsonwebtoken");
const User = require("../modals/User");

const userAuth = async (req, res, next) => {
  let token = req.header("token");
  if (token) {
    try {
      let { id } = jwt.verify(token, process.env.SECRET);
      console.log(id);
      let user = await User.findOne({ _id: id });
      if (user == null) {
        return res.status(400).json({ msg: "account deleted " });
      }
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ msg: "invalid token" });
    }
  } else {
    res.status(401).json({ err: "auth token required !!" });
  }
};

module.exports = userAuth;
