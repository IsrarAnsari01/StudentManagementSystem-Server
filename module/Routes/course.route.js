const express = require("express");
const { grantAccess } = require("../jwt/verification");
const router = express.Router();

const controller = require("../controller/course.controller");

/*  *   Assign Course to teacher
 * Only Admin and teacher access this API
 */
router.get(
  "/assignedCourseToSpecficTeacher/:courseId",
  grantAccess(["admin", "Teacher"]),
  controller.assignedCourse
);

/*  *   List of courses with their respective teacher
 * Only Admin and teacher access this API
 */

router.get(
  "/coursesToTeachers",
  grantAccess(["admin", "Teacher"]),
  controller.courseTeachers
);

/*  *  Get single course with their assigned Teacher
 *  @param interger courseId
 * Only Admin and teacher access this API
 */
router.get(
  "/assignteacher/:teacherId/:courseId",
  grantAccess(["admin", "Teacher"]),
  controller.assignTeacher
);

/*  *  List of courses with their enrolled students
 * Only Admin access this API
 */

router.get("/coursestudent", grantAccess(["admin"]), controller.courseStudent);

/*  * Add Course
 * Only Admin access this API
 */

router.post("/addCourse", grantAccess(["admin"]), controller.addCourse);

/*  * List of course
 * @params int limit, int pageNo, int sort
 * Note!
 * If you don't pass any of these parameters it will select default one
 * Sorting Technique
 * 0 = ASC by Id
 * 1 = DESC by Id
 * 2 = ASC by name
 * 3 = DESC by name
 * Only Admin access this API
 */

router.get("/all", grantAccess(["admin"]), controller.courses);
router.get("/", grantAccess(["admin"]), controller.getAllCourses);

/*  * Return Single Course
 * @params int courseId
 * Only Admin access this API
 */

router.get("/:courseId", grantAccess(["admin"]), controller.singleCourse);

/*  * Delete Single Course
 * @params int courseId
 * Only Admin access this API
 */

router.delete("/:courseId", grantAccess(["admin"]), controller.deleteCourse);

/*  * Update Course
 * @params int courseId
 * Only Admin access this API
 */

router.put("/:courseId", grantAccess(["admin"]), controller.updateCourse);

module.exports = router;
