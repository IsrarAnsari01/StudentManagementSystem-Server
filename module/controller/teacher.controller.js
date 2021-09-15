const teacherMetaModel = require("../../models/modelFunc/teacher.func");
const {
  singleRegistration,
} = require("../../models/modelFunc/courseRegistration.func");

/**
 * Add Meta Information
 * Teacher information should be pass as a object named as teacherMetaData
 */

module.exports.addInformation = async (req, res) => {
  try {
    let teacherMetaData = req.body.teacherMetaData;
    teacherMetaData.joinDate = new Date();
    let information = await teacherMetaModel.addInformation(teacherMetaData);
    if (information) {
      res.send({ status: true, save: true, teacherInfo: information });
      return;
    }
    res.send({ status: false, err: "Something went wrong in saving data" });
  } catch (error) {
    res.status(400).send({ status: false, err: error });
  }
  return;
};

/**
 * List Of teacher Meta Information along with their basic information with pagination and sorting
 */

module.exports.teachersMetaInformation = async (req, res) => {
  let userPerPageLimit = Number(req.query.limit);
  const pageNum = Number(req.query.page);
  const sort = req.query.sort;
  if (sort) sort = sort.toUpperCase();
  let limit = 5;
  let page = 0;
  let sortingTechnique = "ASC";
  if (
    userPerPageLimit &&
    !Number.isNaN(userPerPageLimit) &&
    userPerPageLimit > limit
  ) {
    limit = userPerPageLimit;
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
  try {
    let informations = await teacherMetaModel.teachersMetaInformation(
      limit,
      page,
      sortingTechnique
    );
    res.send({ status: true, found: informations });
  } catch (error) {
    res.send({ status: false, err: error });
  }
};

/**
 * Delete Teacher meta information
 */

module.exports.deleteInformation = async (req, res) => {
  try {
    let deletedInformation = await teacherMetaModel.deleteInformation(
      req.params.userId
    );
    res.send({ status: true, delete: true });
  } catch (error) {
    res.send({ status: false, err: error });
  }
};

/**
 * Update Teacher meta information
 */

module.exports.updateInformation = async (req, res) => {
  const teacherMetaData = req.body.teacherMetaData;
  try {
    let updatedInformation = await teacherMetaModel.updateInformation(
      teacherMetaData,
      req.params.userId
    );
    res.send({ status: true, save: true });
  } catch (error) {
    res.send({ status: false, err: error });
  }
};

/**
 * Return Single Teacher Meta information
 */

module.exports.singleTeacherInfo = async (req, res) => {
  try {
    let information = await teacherMetaModel.singleTeacherInfo(
      req.params.userId
    );
    res.send({ status: true, information: information });
  } catch (error) {
    res.send({ status: false, err: err });
  }
};

/**
 * Check specific course already assigned to specific teacher
 * @param int courseIds
 * @param int teacherid
 * @returns boolean present
 */

const checkAlreadyAssigned = async (courseIds, teacherid) => {
  let id = JSON.parse(courseIds);
  let present = false;
  try {
    let assignedCourses = await teacherMetaModel.assignedCourses(teacherid);
    for (let i = 0; i < assignedCourses.course.length; i++) {
      if (assignedCourses.course[i].id == id) {
        present = true;
        return present;
      }
    }
  } catch (error) {
    console.log(error);
  }
  return present;
};

/**
 * Check Course Status
 * @param int courseId
 * @returns boolean active
 */
const checkCourseStatus = async (courseId) => {
  let id = JSON.parse(courseId);
  let active = false;
  try {
    let courseDetails = await singleRegistration(id);
    if (courseDetails) {
      active = true;
      return active;
    }
  } catch (error) {
    return active;
  }
  return active;
};

/**
 * Assign course to specific teacher
 */

module.exports.assignCourse = async (req, res) => {
  let courseIds = req.body.courseIds;
  let result = Object.values(courseIds);
  const checkCourseAlreadyPresent = await checkAlreadyAssigned(
    result[0],
    req.params.id
  );
  console.log("Course Id", result[0]);
  const courseStatus = await checkCourseStatus(result[0]);
  if (!courseStatus) {
    res.send({
      status: false,
      courseStatusErr:
        "This Course is not active right now // May Be something went wrong",
    });
    return;
  }
  if (checkCourseAlreadyPresent) {
    res.send({
      status: false,
      alreadyAssigned: "You already appointed for this course",
    });
    return;
  }
  try {
    const assign = await teacherMetaModel.assignCourse(
      req.params.id,
      result[0]
    );
    res.send({ status: true, assigned: true });
  } catch (error) {
    res.send({ status: false, gernalErr: error });
  }
  return;
};

/**
 * List of assigned courses
 */

module.exports.assignedCourses = async (req, res) => {
  try {
    let assignedCourses = await teacherMetaModel.assignedCourses(req.params.id);
    res.send({ status: true, assignedCourses: assignedCourses });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};

/**
 * List of Enrolled Students
 */

module.exports.enrolledStudents = async (req, res) => {
  try {
    let enrolledStudents = await teacherMetaModel.enrolledStudents(
      req.params.teacherId
    );
    res.send({ status: true, enrolledStudents: enrolledStudents });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};
