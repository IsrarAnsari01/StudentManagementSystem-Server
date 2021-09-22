const db = require("../index");
/**
 * Add Meta Information
 * @param object studentData
 * @returns meta information
 */

module.exports.addInformation = async (studentData) => {
  try {
    var information = await db.Students.create(studentData);
  } catch (err) {
    console.log(err);
  }
  return information;
};

/**
 * Retrive All Meta Informations with pagination and sorting
 * @param int limit
 * @param int page
 * @param int sortingTechniquw
 * @returns informations
 */

module.exports.studentMetaInformation = async (
  limit,
  page,
  sortingTechnique
) => {
  const informationLimit = limit;
  technique = ["id", sortingTechnique];

  try {
    var allInformation = await db.Students.findAndCountAll({
      limit: informationLimit,
      offset: page * limit, // Skip Two records
      order: [technique],
      include: db.User,
    });
  } catch (err) {
    console.log(err);
  }
  if (allInformation.count > 1) {
    const totalPage = Math.ceil(allInformation.count / informationLimit);
    return { allInformation, totalPage };
  }
  return allInformation;
};

/**
 * Delete Meta information
 * @param int user id
 * @returns deletedInformation
 */
module.exports.deleteInformation = async (id) => {
  try {
    var deleteInformation = await db.Students.destroy({
      where: {
        user_id: id,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return deleteInformation;
};

/**
 * Return Single student information
 * @param int user id
 * @returns student information
 */

module.exports.studentInformation = async (id) => {
  try {
    var Student = await db.Students.findOne({
      where: {
        user_id: id,
      },
      include: [
        {
          model: db.User,
          include: [
            {
              model: db.Role,
            },
          ],
        },
      ],
    });
  } catch (err) {
    console.log(err);
  }
  return Student;
};

/**
 * Update student meta information
 * @param int user id
 * @param object studentInfo
 * @returns updatedInformation
 */

module.exports.updateStuInformation = async (studentInfo, id) => {
  try {
    var updatedInformation = await db.Students.update(studentInfo, {
      where: {
        user_id: id,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return updatedInformation;
};

/**
 * Return Student Enrolled Courses
 * @param int user id
 * @returns student with enrolledCourses
 */

module.exports.enrolledCourses = async (studentid) => {
  try {
    var student = await db.Students.findOne({
      where: {
        user_id: studentid,
      },
      include: [
        {
          model: db.Course,
          as: "Course",
        },
        {
          model: db.User,
          include: [
            {
              model: db.Role,
            },
          ],
        },
      ],
    });
  } catch (err) {
    console.log(err);
  }
  return student;
};

/**
 * Assign course to student
 * @param int user id
 * @param int course id
 * @returns true
 */

module.exports.assignCourse = async (studentid, courseid) => {
  let courseId = [courseid];
  try {
    var student = await db.Students.findOne({
      where: {
        user_id: studentid,
      },
    });
    student.addCourse(courseId);
    var getCourseDetails = await db.CourseRegistration.findOne({
      where: {
        courseId: courseid,
      },
    });
    const seats = getCourseDetails.seats;
    const changeSeatCount = seats - 1;
    const data = { seats: changeSeatCount };
    var updateCourseSeats = await db.CourseRegistration.update(data, {
      where: {
        courseId: courseid,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return true;
};

module.exports.getAllStudents = async () => {
  try {
    var students = await db.Students.findAll({
      include: db.User,
    });
  } catch (error) {
    console.log(error);
  }
  return students;
};
