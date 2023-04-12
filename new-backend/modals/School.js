const mogoose = require("mongoose");

const SchoolSchema = mogoose.Schema(
  {
    name: {
      type: String,
    },
    location: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mogoose.model("school", SchoolSchema);
