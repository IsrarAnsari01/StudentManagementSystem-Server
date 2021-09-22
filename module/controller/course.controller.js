const courseModel = require("../../models/modelFunc/course.func");

/*
 * Add Course
 * data should be pass in object named as courseData
 */

module.exports.addCourse = async (req, res) => {
  try {
    let courseData = req.body.courseData;
    let assignCourse = await courseModel.addCourse(courseData);
    res.send({ status: true, save: true, courseData: assignCourse });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};

/*
 * List Of all Courses with pagination and sorting Technique
 * If API don't give any parameter it will choose default one
 */

module.exports.courses = (req, res) => {
  let coursesPerPage = Number(req.query.limit);
  const pageNum = Number(req.query.page);
  const sort = req.query.sort;
  let limit = 5;
  let page = 0;
  let sortingTechnique = "ASC";
  if (
    coursesPerPage &&
    !Number.isNaN(coursesPerPage) &&
    coursesPerPage > limit
  ) {
    limit = coursesPerPage;
  }
  if (pageNum && !Number.isNaN(pageNum) && pageNum > page) {
    page = pageNum;
  }
  if (
    sort &&
    (sort === "ASC" || sort === "asc" || sort === "DESC" || sort === "desc")
  ) {
    sortingTechnique = sort;
  }
  courseModel
    .courses(limit, page, sortingTechnique)
    .then((succ) => {
      res.send({ status: true, found: succ });
    })
    .catch((err) => {
      res.send({ status: false, err: err });
    });
  return;
};

/*
 * Delete Course
 */

module.exports.deleteCourse = async (req, res) => {
  try {
    let deletedCourse = await courseModel.deleteCourse(req.params.courseId);
    res.send({ status: true, delete: true });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};

/*
 * Update Course
 * data should be pass in object named as courseData
 */

module.exports.updateCourse = async (req, res) => {
  try {
    const courseData = req.body.courseData;
    let updatedCourse = await courseModel.updateCourse(
      courseData,
      req.params.courseId
    );
    res.send({ status: true, save: true });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};

/*
 * Return Single Course Details
 */

module.exports.singleCourse = async (req, res) => {
  try {
    let course = await courseModel.singleCourse(req.params.courseId);
    res.send({ status: true, data: course });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};

/*
 * Return Courses with teachers
 */

module.exports.courseTeachers = async (req, res) => {
  try {
    let course = await courseModel.courseTeachers();
    res.send({ status: true, data: course });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};

/*
 * Return Single Course With assigned Teacher
 */

module.exports.assignedCourse = async (req, res) => {
  try {
    let assignedTeacher = await courseModel.assignedCourse(req.params.courseId);
    res.send({ status: true, course: assignedTeacher });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};

/*
 * Assign Course to specific teacher
 */

module.exports.assignTeacher = async (req, res) => {
  try {
    let assignTeacher = await courseModel.assignTeacher(
      req.params.teacherId,
      req.params.courseId
    );
    res.send({ status: true, course: assignTeacher });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};

/*
 * Return Courses with Students
 */

module.exports.courseStudent = async (req, res) => {
  try {
    let courseStudents = await courseModel.courseStudent();
    res.send({ status: true, found: courseStudents });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};

module.exports.getAllCourses = async (req, res) => {
  try {
    var courses = await courseModel.genAllCourses();
    res.send({ courses: courses });
  } catch (error) {
    res.send({ err: error });
  }
};
