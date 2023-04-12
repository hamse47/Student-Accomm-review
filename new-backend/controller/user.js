const bcrypt = require("bcrypt");
const User = require("../modals/User");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  const { username, first_name, last_name, email, password } = req.body;
  let exists = await User.findOne({ username });
  if (exists) {
    return res.status(400).json({ msg: "username already exists" });
  }
  let existsEmail = await User.findOne({ email });
  if (existsEmail) {
    return res.status(400).json({ msg: "email already exists" });
  }
  let salt = await bcrypt.genSalt(10);
  let hashpassword = await bcrypt.hash(password, salt);
  let new_user = new User({
    username,
    first_name,
    last_name,
    email,
    password: hashpassword,
  });
  new_user.save();
  return res.status(201).json({ ...new_user.toObject() });
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username });
  if (user) {
    let stored_password = user.password;
    bcrypt
      .compare(password, stored_password)
      .then((match) => {
        if (match) {
          user = user.toObject();
          delete user.password;
          let token = jwt.sign({ id: user._id }, process.env.SECRET);
          res.json({ ...user, token });
        } else {
          res.status(400).json({ msg: "invalid username or password" });
        }
      })
      .catch((err) => console.log({ msg }));
  } else {
    return res.status(400).json({ msg: "user not found" });
  }
};
