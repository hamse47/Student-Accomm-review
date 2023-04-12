const express = require("express");
const DormController = require("../controller/dorm");
const authUser = require("../middleware/userAuth");
const adminAuth = require("../middleware/adminAuth");
const multer = require("multer");
const router = express.Router();
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/image");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});

let upload = multer({ storage: storage });

router.post(
  "/",
  authUser,
  upload.array("images"),
  DormController.create_review
);
router.get("/", DormController.get_dorm);
router.put(
  "/:id",
  adminAuth,
  upload.single("images"),
  DormController.update_dorm
);
router.delete("/", adminAuth, DormController.delete_dorm);
router.get("/school/:id", DormController.get_dorm_by_school);
router.get("/detail/:id", DormController.get_dorm_detail);
router.get("/my-review", authUser, DormController.my_review);
router.get("/school", DormController.get_school);
router.put(
  "/school/:id",
  adminAuth,
  upload.single("images"),
  DormController.update_school
);
router.delete("/school", adminAuth, DormController.delete_school);
router.delete("/review", adminAuth, DormController.delete_review);
router.get("/valid/:type/:id", authUser, DormController.check_valid);
module.exports = router;
