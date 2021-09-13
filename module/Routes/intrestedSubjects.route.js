const express = require("express");
const { grantAccess } = require("../jwt/verification");
const router = express.Router();

const controller = require("../controller/intrestedSubjects.controller");

router.post("/add/:student_id", grantAccess(["admin"]), controller.addSubject);

router.post("/", grantAccess(["admin"]), controller.getStudents);

module.exports = router;
