const express = require("express");
const { grantAccess } = require("../jwt/verification");
const router = express.Router();
const controller = require("../controller/student.controller");

/**
 * Add Meta Information of student
 * Only Accessable by ADMIN and STUDENT
 */
router.post(
  "/addInformation",
  grantAccess(["admin", "Student"]),
  controller.addInformation
);

/**
 * Retrive All Students meta informations
 *  @params int limit, int pageNo, int sort
 * Note!
 * If you don't pass any of these parameters it will select default one
 * Sorting Technique
 * 0 = ASC by Id
 * 1 = DESC by Id
 * 2 = ASC by class
 * 3 = DESC by class
 * Only Accessable by ADMIN
 */

router.get(
  "/all",
  grantAccess(["admin"]),
  controller.studentsMetaInformation
);

/**
 * Delete Student Meta Information
 * User id pass as a URL parameter
 * Only Accessable by ADMIN and STUDENT
 */
router.delete(
  "/:userId",
  grantAccess(["admin", "Student"]),
  controller.deleteInformation
);

/**
 * Return Single Student Meta Information
 * User id pass as a URL parameter
 * Only Accessable by ADMIN and STUDENT
 */

router.get(
  "/information/:userId",
  grantAccess(["admin", "Student"]),
  controller.singleStudentInfo
);

/**
 * Assign Course to student
 * User id and course id pass as a URL parameter
 * Only Accessable by ADMIN and STUDENT
 */

router.get(
  "/assignCourse/:studentId/:courseId",
  grantAccess(["admin", "Student"]),
  controller.assignCourse
);

/**
 * List of enrolled Courses
 * User id pass as a URL parameter
 * Only Accessable by ADMIN and STUDENT
 */

router.get(
  "/enrolledCourses/:userId",
  grantAccess(["admin", "Student"]),
  controller.enrolledCourses
);

module.exports = router;
