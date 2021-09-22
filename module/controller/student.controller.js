const studentMetaModel = require("../../models/modelFunc/student.func");
const {
  singleRegistration,
} = require("../../models/modelFunc/courseRegistration.func");

const { addSubject } = require("../../models/modelFunc/intrestedSubjects.func");
/**
 * Add Meta Information also add student interested subjects
 * Student information should be pass as a object named as studentInformation
 * Interested subjects should be passed as a array named as interestedSubjects
 */
module.exports.addInformation = async (req, res) => {
  try {
    let studentInformation = req.body.studentInformation;
    let interestedSubjects = req.body.interestedSubjects;
    studentInformation.joinDate = new Date();
    let studentMetaInformation = await studentMetaModel.addInformation(
      studentInformation
    );
    if (studentMetaInformation) {
      let data = {
        name: interestedSubjects,
        student_id: studentMetaInformation.id,
      };
      let addInterestedSubjects = await addSubject(data);
      if (addInterestedSubjects.status === "present") {
        res.send({
          status: false,
          repeatationErr: `${addInterestedSubjects.subName} already added you as your Interested Subjects`,
        });
        return;
      }
      res.send({
        status: true,
        save: true,
        studentMetaInformation: studentMetaInformation,
      });
      return;
    }
    res.send({ status: false, err: "Something went wrong in saving data" });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};

/**
 * List Of student Meta Information along with their basic information with pagination and sorting
 */

module.exports.studentsMetaInformation = async (req, res) => {
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
    let informations = await studentMetaModel.studentMetaInformation(
      limit,
      page,
      sortingTechnique
    );
    res.send({ status: true, found: informations });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};

/**
 * Delete Student meta information
 */

module.exports.deleteInformation = async (req, res) => {
  try {
    let deletedInformation = await studentMetaModel.deleteInformation(
      req.params.userId
    );
    res.send({ status: true, delete: true });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};

/**
 * Return Single Student Meta information
 */

module.exports.singleStudentInfo = async (req, res) => {
  try {
    let information = await studentMetaModel.studentInformation(
      req.params.userId
    );
    res.send({ status: true, information: information });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};
/**
 * Check Course Status and Registration Status
 * @param int courseid
 * @returns object courseStatus, registrationStatus
 */

const checkCourseStatus = async (courseid) => {
  let courseStatus = false;
  let registrationStatus = false;
  let todayTime = new Date();
  let todayTimeInSec = Math.ceil(todayTime.getTime() / 1000);
  try {
    let courseDetails = await singleRegistration(courseid);
    let registrationTime = courseDetails.RegistrationTimeLimit;
    let registrationLimitInSec = Math.ceil(registrationTime.getTime() / 1000);
    if (courseDetails.status && courseDetails.status) {
      courseStatus = true;
    }
    if (registrationLimitInSec && todayTimeInSec > registrationLimitInSec) {
      registrationStatus = true;
    }
  } catch (error) {
    console.log(error);
  }
  return { courseStatus, registrationStatus };
};

/**
 * Check via this course is already assigned or not
 * @param int studentid
 * @param int courseId
 * @returns boolean present
 */
const alreadyAsssigned = async (studentid, courseId) => {
  let present = false;
  try {
    let student = await studentMetaModel.enrolledCourses(studentid);
    for (let i = 0; i < student.Course.length; i++) {
      if (student.Course[i].id == courseId) {
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
 * Assign Course to student
 */
module.exports.assignCourse = async (req, res) => {
  const studentid = req.params.studentId;
  const courseid = req.params.courseId;
  const appilcable = await checkCourseStatus(courseid);
  const checkAlreadyApply = await alreadyAsssigned(studentid, courseid);
  if (!appilcable.courseStatus) {
    res.send({ status: false, statusError: "Course is inactive now" });
    return
  }
  if (appilcable.registrationStatus) {
    res.send({
      status: false,
      registrationError: "Registration time is over now",
    });
    return
  }
  if (checkAlreadyApply) {
    res.send({
      status: false,
      assignedErr: "You already Apply of this course ",
    });
    return
  }
  try {
    let assignedCourse = await studentMetaModel.assignCourse(
      studentid,
      courseid
    );
    res.send({ status: true, assiged: true });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};

/**
 * List of enrolled Courses
 */
module.exports.enrolledCourses = async (req, res) => {
  try {
    let enrolledCourses = await studentMetaModel.enrolledCourses(
      req.params.userId
    );
    res.send({ status: true, enrolledCourses: enrolledCourses });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};

module.exports.getAllStudents = async (req, res) => {
  try {
    let students = await studentMetaModel.getAllStudents();
    res.send({ students: students });
  } catch (error) {
    res.send({ err: error });
  }
};
