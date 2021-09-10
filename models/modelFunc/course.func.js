const db = require("../index");

/**
 * Add Course in DB
 * @param object courseData
 * @returns object new Course
 */

module.exports.addCourse = async (courseData) => {
  try {
    var course = await db.Course.create(courseData);
  } catch (err) {
    console.log(err);
  }
  return course;
};

/**
 * Delete Course in DB
 * @param int courseId
 * @returns DeletedCourse
 */

module.exports.deleteCourse = async (courseId) => {
  try {
    var deleteCourse = await db.Course.destroy({
      where: {
        id: courseId,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return deleteCourse;
};

/**
 * List of courses with pagination and sorting
 * @param int limit, int page, int sortingTechnique
 * @returns courses
 */

module.exports.courses = async (limit, page, sortingTechnique) => {
  const perPageCourseLimit = limit;
  let technique = ["id", sortingTechnique];
  try {
    var courses = await db.Course.findAndCountAll({
      limit: perPageCourseLimit,
      offset: page * limit, // Skip Two records
      order: [technique],
    });
  } catch (err) {
    console.log(err);
  }

  if (courses.count > 1) {
    const totalPage = Math.ceil(courses.count / perPageCourseLimit);
    return { courses, totalPage };
  }
  return courses;
};

/**
 * Update Course
 * @param int courseId
 * @returns updatedCourse
 */

module.exports.updateCourse = async (courseInfo, id) => {
  try {
    var updateCourse = await db.Course.update(courseInfo, {
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return updateCourse;
};

/**
 * Get one course
 * @param int courseId
 * @returns single Course
 */

module.exports.singleCourse = async (id) => {
  try {
    var singleCourse = await db.Course.findOne({
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return singleCourse;
};

/**
 * List of all Courses with assigned Teachers and course metadata
 * @param NULL
 * @returns Courses
 */

module.exports.courseTeachers = async () => {
  try {
    var courseTeachers = await db.Course.findAll({
      include: [
        {
          model: db.Teachers,
          as: "Teacher",
        },
        {
          model: db.CourseRegistration,
          as: "courseDetails",
        },
      ],
    });
  } catch (err) {
    console.log(err);
  }

  return courseTeachers;
};

/**
 * Return Single Course with assigned Teacher
 * @param int courseId
 * @returns course
 */

module.exports.assignedCourse = async (courseId) => {
  try {
    var course = await db.Course.findOne({
      where: {
        id: courseId,
      },
      include: [
        {
          model: db.Teachers,
          as: "Teacher",
          include: [
            {
              model: db.User,
            },
          ],
        },
      ],
    });
  } catch (err) {
    console.log(err);
  }
  return course;
};

module.exports.assignTeacher = async (teacherid, courseId) => {
  try {
    var teacherCourse = await db.Course.findOne({
      where: {
        id: courseId,
      },
    });
    teacherCourse.getcourseTeacher();
  } catch (err) {
    console.log(err);
  }

  return;
};

/**
 * List Of Courses with enrolled Students with course Details
 * @param NULL
 * @returns courses
 */

module.exports.courseStudent = async () => {
  try {
    var courseStudent = await db.Course.findAll({
      include: [
        {
          model: db.Students,
          as: "Student",
          include: [
            {
              model: db.User,
            },
          ],
        },
        {
          model: db.CourseRegistration,
          as: "courseDetails",
        },
      ],
    });
  } catch (err) {
    console.log(err);
  }
  return courseStudent;
};
