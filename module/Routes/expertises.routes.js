const express = require("express");
const { grantAccess } = require("../jwt/verification");
const router = express.Router();

const controller = require("../controller/expertise.countroller");

router.post("/add/:teacher_Id", grantAccess(["admin"]), controller.addExpertise);

router.post("/", grantAccess(["admin"]), controller.getTeachers);

router.get("/:id", grantAccess(["admin", "Teacher"]), controller.getTeacherSkills)

module.exports = router;
