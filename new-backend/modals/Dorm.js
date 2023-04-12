const mogoose = require("mongoose");

const DormSchema = mogoose.Schema(
  {
    name: {
      type: String,
    },
    schoolId: {
      type: mogoose.Types.ObjectId,
    },
    schoolName: {
      type: String,
    },
    image: {
      type: String,
    },
    user: {
      type: mogoose.Types.ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = mogoose.model("dorm", DormSchema);
