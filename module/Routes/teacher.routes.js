const express = require("express");
const { grantAccess } = require("../jwt/verification");
const router = express.Router();
const controller = require("../controller/teacher.controller");

/**
 * Add Meta Information of teacher
 * Only Accessable by ADMIN and Teacher
 */

router.post(
  "/addInformation",
  grantAccess(["admin", "Teacher"]),
  controller.addInformation
);

/**
 * Retrive All Teacher meta informations
 *  @params int limit, int pageNo, int sort
 * Note!
 * If you don't pass any of these parameters it will select default one
 * Sorting Technique
 * 0 = ASC by Id
 * 1 = DESC by Id
 * 2 = ASC by education
 * 3 = DESC by education
 * Only Accessable by ADMIN
 */

router.get("/all", grantAccess(["admin"]), controller.teachersMetaInformation);
router.get("/allteachers", grantAccess(["admin"]), controller.getAllTeachers);

/**
 * Delete Teacher Meta Information
 * User id pass as a URL parameter
 * Only Accessable by ADMIN and Teacher
 */

router.delete(
  "/:userId",
  grantAccess(["admin", "Teacher"]),
  controller.deleteInformation
);

/**
 * Update Teacher Meta Information
 * User id pass as a URL parameter
 * Only Accessable by ADMIN and Teacher
 */

router.put(
  "/:userId",
  grantAccess(["admin", "Teacher"]),
  controller.updateInformation
);

/**
 * Return Single Teacher Meta Information
 * User id pass as a URL parameter
 * Only Accessable by ADMIN and Teacher
 */

router.get(
  "/information/:userId",
  grantAccess(["admin", "Teacher"]),
  controller.singleTeacherInfo
);

/**
 * Assign Course to Teacher
 * User id pass as a URL parameter
 * Only Accessable by ADMIN and Teacher
 */

router.post(
  "/assignCourses/:id",
  grantAccess(["admin"]),
  controller.assignCourse
);

/**
 * Assigned Courses of Teacher
 * User id pass as a URL parameter
 * Only Accessable by ADMIN and Teacher
 */

router.get(
  "/assignedCourses/:id",
  grantAccess(["admin", "Teacher"]),
  controller.assignedCourses
);

/**
 * Enrolled Students of specific Teacher
 * User id pass as a URL parameter
 * Only Accessable by ADMIN and Teacher
 */

router.get(
  "/enrolledStudents/:teacherId",
  grantAccess(["admin", "Teacher"]),
  controller.enrolledStudents
);

module.exports = router;
