const SchoolModel = require("../modals/School");
const DormModel = require("../modals/Dorm");
const ReviewModel = require("../modals/Review");
const mongoose = require("mongoose");
module.exports.create_review = async (req, res) => {
  let {
    school_id,
    school_name,
    dorm_id,
    dorm_name,
    roomRating,
    buildingRating,
    bathroomRating,
    locationRating,
    comment,
    classYear,
    roomType,
  } = req.body;

  let error = [
    "roomRating",
    "buildingRating",
    "bathroomRating",
    "locationRating",
    "comment",
    "classYear",
    "roomType",
  ]
    .map((key) => !req.body[key] && `${key} is required`)
    .filter((obj) => obj);
  if (error.length !== 0) {
    return res.status(400).json({ err: error });
  }
  let schoolObj;
  let dormObj;
  if (school_id || school_name) {
    if (school_id) {
      schoolObj = await SchoolModel.findOne({ _id: school_id });
    } else {
      schoolObj = await SchoolModel.findOne({ name: school_name });
      if (!schoolObj) {
        schoolObj = SchoolModel({ name: school_name });
        schoolObj.save();
      }
    }
  } else {
    return res
      .status(400)
      .json({ err: "school id or school name required !!" });
  }
  if (dorm_id || dorm_name) {
    if (dorm_id) {
      dormObj = await DormModel.findOne({ _id: dorm_id });
    } else {
      dormObj = await DormModel.findOne({ name: dorm_name });
      if (!dormObj) {
        dormObj = new DormModel({
          name: dorm_name,
          schoolId: schoolObj._id,
          schoolName: school_name,
        });
        dormObj.save();
      }
    }
  } else {
    return res.status(400).json({ err: "dorm_id or dorm_name required !!" });
  }
  let review = ReviewModel({
    user: req.user._id,
    roomRating,
    buildingRating,
    bathroomRating,
    locationRating,
    comment,
    classYear,
    roomType,
    schoolId: schoolObj._id,
    dormId: dormObj._id,
    images: req.files.map((file) => file.filename),
  });
  review.save();
  res.send(review);
};

module.exports.get_school = async (req, res) => {
  // let schools = await SchoolModel.find({});
  let data = await ReviewModel.aggregate([
    // Join the "dorms" and "schools" collections based on the "school" field
    {
      $lookup: {
        from: "schools",
        localField: "schoolId",
        foreignField: "_id",
        as: "school",
      },
    },
    // Unwind the "school" field to flatten the result set
    {
      $unwind: "$school",
    },
    // Group the result set by the school's _id and name, and count the dorms for each school
    {
      $group: {
        _id: "$school._id",
        name: { $first: "$school.name" },
        reviewCount: { $sum: 1 },
      },
    },
  ]);
  res.send(data);
};

module.exports.get_dorm = async (req, res) => {
  let dorm = await DormModel.find({});
  res.send(dorm);
};

module.exports.get_dorm_by_school = async (req, res) => {
  const { id } = req.params;
  let dorm = await DormModel.aggregate([
    { $match: { schoolId: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "dormId",
        as: "reviews",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        avg_room_rating: { $avg: "$reviews.roomRating" },
        avg_location_rating: { $avg: "$reviews.locationRating" },
        avg_building_rating: { $avg: "$reviews.buildingRating" },
        avg_bathroom_rating: { $avg: "$reviews.bathroomRating" },
        review_count: { $size: "$reviews" },
      },
    },
  ]);
  res.send(dorm);
};

module.exports.get_dorm_detail = async (req, res) => {
  const { id } = req.params;
  let dorm = await DormModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "dormId",
        as: "reviews",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        avg_room_rating: { $avg: "$reviews.roomRating" },
        avg_location_rating: { $avg: "$reviews.locationRating" },
        avg_building_rating: { $avg: "$reviews.buildingRating" },
        avg_bathroom_rating: { $avg: "$reviews.bathroomRating" },
        review_count: { $size: "$reviews" },
        juniorCount: "$juniorCount",
        graducateCount: "$graducateCount",
      },
    },
  ]);
  if (!dorm[0]) {
    return res.status(400).json({ msg: "dorm not found" });
  }
  dorm[0].total_first_year = await ReviewModel.find({
    dormId: id,
    classYear: /First Year/i,
  }).count();
  dorm[0].total_second_year = await ReviewModel.find({
    dormId: id,
    classYear: /Second Year/i,
  }).count();
  dorm[0].total_third_year = await ReviewModel.find({
    dormId: id,
    classYear: /Third Year/i,
  }).count();
  dorm[0].total_fourth_year = await ReviewModel.find({
    dormId: id,
    classYear: /Fourth Year/i,
  }).count();
  let review = await ReviewModel.find({ dormId: id });
  return res.json({ dorm, review });
};

module.exports.my_review = async (req, res) => {
  let my_review = ReviewModel.find({ user: req.user._id });
  return res.send(my_review);
};

module.exports.update_school = async (req, res) => {
  const { id } = req.params;
  let image = req.file.filename;
  SchoolModel.findByIdAndUpdate({ _id: id }, { ...req.body, image })
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err));
};

module.exports.update_dorm = async (req, res) => {
  const { id } = req.params;
  let image = req.file.filename;
  DormModel.findByIdAndUpdate({ _id: id }, { ...req.body, image })
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err));
};

module.exports.delete_school = async (req, res) => {
  const { id } = req.body;
  SchoolModel.findByIdAndDelete({ _id: id });
  return res.sendStus(204);
};

module.exports.delete_dorm = async (req, res) => {
  const { id } = req.body;
  DormModel.findByIdAndDelete({ _id: id });
  return res.sendStus(204);
};

module.exports.delete_review = async (req, res) => {
  const { id } = req.body;
  ReviewModel.findByIdAndDelete({ _id: id });
  return res.sendStus(204);
};

module.exports.check_valid = async (req, res) => {
  let { type, id } = req.params;
  if (type == "school") {
    let school = await SchoolModel.findOne({ _id: id });
    if (school !== null) {
      return res.send(school);
    }
  } else if (type == "dorm") {
    let dorm = await DormModel.findOne({ _id: id });
    if (dorm !== null) {
      return res.send(dorm);
    }
  }
  res.status(400).json({ msg: `invalid ${type} id` });
};
