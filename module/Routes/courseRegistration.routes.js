const express = require("express");
const { grantAccess } = require("../jwt/verification");
const router = express.Router();
const controller = require("../controller/courseRegistration.controller");
/**
 * Add Registation
 * Only admin can access this API
 */
router.post("/add", grantAccess(["admin"]), controller.addRegistaion);

/**
 * Return Active Courses
 * Only admin and Student can access this API
 */

router.get(
  "/active",
  grantAccess(["admin", "Student"]),
  controller.activeCourses
);

/**
 * Return Open Courses means whose status is active also their registration Time is less then today date
 * Only admin and Student can access this API
 */

router.get(
  "/openCourse",
  grantAccess(["admin", "Student"]),
  controller.openCourse
);

/**
 * List of all Registration
 * @params int limit, int pageNo, int sort
 * Note!
 * If you don't pass any of these parameters it will select default one
 * Sorting Technique
 * 0 = ASC by Id
 * 1 = DESC by Id
 * 2 = ASC by courseId
 * 3 = DESC by courseId
 * Only Admin access this API
 */

router.get("/all", grantAccess(["admin"]), controller.registrations);

/**
 * Return Single Registration along with course details
 * @params int course id
 * Only Admin access this API
 */

router.get("/:courseId", grantAccess(["admin"]), controller.singleRegistration);

/**
 * Update Course Registration
 * @params int course id
 * Only Admin access this API
 */

router.put("/:courseId", grantAccess(["admin"]), controller.updateRegistration);

/**
 * Delete Course Registration
 * @params int course id
 * Only Admin access this API
 */

router.delete(
  "/:courseId",
  grantAccess(["admin"]),
  controller.deleteRegistration
);

module.exports = router;
