const express = require("express");
const { grantAccess } = require("../jwt/verification");
const router = express.Router();

const controller = require("../controller/intrestedSubjects.controller");

router.post(
  "/add/:student_id",
  grantAccess(["admin", "Student"]),
  controller.addSubject
);

router.post("/", grantAccess(["admin", "Student"]), controller.getStudents);
router.get("/:id", grantAccess(["admin", "Student"]), controller.getSubjects);

module.exports = router;
