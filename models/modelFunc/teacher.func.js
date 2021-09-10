const db = require("../index");
/**
 * Add Teacher meta information
 * @param object roleData
 * @returns teacher meta data
 */
module.exports.addInformation = async (roleData) => {
  try {
    var information = await db.Teachers.create(roleData);
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

module.exports.teachersMetaInformation = async (
  limit,
  page,
  sortingTechnique
) => {
  const informationLimit = limit;
  let technique = ["id", sortingTechnique];
  try {
    var allInformation = await db.Teachers.findAndCountAll({
      limit: informationLimit,
      offset: page * limit, // Skip Two records
      order: [technique],
      include: {
        model: db.User,
      },
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
    var deleteInformation = await db.Teachers.destroy({
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
 * Update teacher meta information
 * @param int user id
 * @param object teacherInfo
 * @returns updatedInformation
 */

module.exports.updateInformation = async (teacherInfo, id) => {
  try {
    var updatedInformation = await db.Teachers.update(teacherInfo, {
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
 * Return Single teacher information
 * @param int user id
 * @returns teacher information
 */

module.exports.singleTeacherInfo = async (id) => {
  try {
    var Teacher = await db.Teachers.findOne({
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
  return Teacher;
};

/**
 * Assigned Course to teachers
 * @param int user id
 * @returns teacher with assigned courses
 */

module.exports.assignedCourses = async (id) => {
  try {
    var Teacher = await db.Teachers.findOne({
      where: {
        user_id: id,
      },
      include: [
        {
          model: db.Course,
          as: "course",
        },
        {
          model: db.User,
        },
      ],
    });
  } catch (err) {
    console.log(err);
  }
  return Teacher;
};

/**
 * Assign Course to teachers
 * @param int user id
 * @param array course Ids
 * @returns teacher
 */

module.exports.assignCourse = async (id, courseIds) => {
  let ids = JSON.parse(courseIds);
  try {
    var Teacher = await db.Teachers.findOne({
      where: {
        user_id: id,
      },
      include: db.User,
    });
  } catch (err) {
    console.log(err);
  }
  Teacher.addCourse(ids);
  return Teacher;
};

/**
 * Return Teacher Associate students
 * @param int user id
 * @returns teacher with enrolled students
 */

module.exports.enrolledStudents = async (id) => {
  try {
    var Teacher = await db.Teachers.findOne({
      where: {
        user_id: id,
      },
      include: [
        {
          model: db.Course,
          as: "course",
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
          ],
        },
        {
          model: db.User,
        },
      ],
    });
  } catch (err) {
    console.log(err);
  }
  return Teacher;
};
