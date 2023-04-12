const mogoose = require("mongoose");

const userSchema = mogoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mogoose.model("user", userSchema);
