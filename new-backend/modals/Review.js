const mogoose = require("mongoose");

const ReviewSchema = mogoose.Schema(
  {
    user: {
      type: mogoose.Types.ObjectId,
      required: true,
    },
    roomRating: {
      type: Number,
    },
    buildingRating: {
      type: Number,
    },
    bathroomRating: {
      type: Number,
    },
    locationRating: {
      type: Number,
    },
    comment: {
      type: String,
    },
    images: {
      type: [String],
    },
    classYear: {
      type: String,
    },
    roomType: {
      type: String,
    },
    dormId: {
      type: mogoose.Types.ObjectId,
    },
    schoolId: {
      type: mogoose.Types.ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = mogoose.model("review", ReviewSchema);
