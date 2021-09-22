const db = require("../index");
const { Op } = require("sequelize");

/**
 * Add New Registration
 * @param object registrationData
 * @returns new Registraion
 */
module.exports.addRegistaion = async (registrationData) => {
  try {
    var registration = await db.CourseRegistration.create(registrationData);
  } catch (err) {
    console.log(err);
  }
  return registration;
};

/**
 * Delete Registration
 * @param int course id
 * @returns deletedRegistration
 */

module.exports.deleteRegistration = async (courseId) => {
  try {
    var deleteRegistration = await db.CourseRegistration.destroy({
      where: {
        courseId: courseId,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return deleteRegistration;
};

/**
 * List of registrations
 * @param int limit, int page, int sortingTechnique
 * @returns registrations
 */

module.exports.registrations = async (limit, page, sortingTechnique) => {
  const perPageRegistrationLimit = limit;
  technique = ["id", sortingTechnique];
  try {
    var registrations = await db.CourseRegistration.findAndCountAll({
      limit: perPageRegistrationLimit,
      offset: page * limit, // Skip Two records
      order: [technique],
      include: db.Course,
    });
  } catch (err) {
    console.log(err);
  }

  if (registrations.count > 1) {
    const totalPage = Math.ceil(registrations.count / perPageRegistrationLimit);
    return { registrations, totalPage };
  }
  return registrations;
};

/**
 * Update registration
 * @param object registrationData, int courseId
 * @returns updatedRegistration
 */

module.exports.updateRegistration = async (data, id) => {
  try {
    var updatedRegistration = await db.CourseRegistration.update(data, {
      where: {
        courseId: id,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return updatedRegistration;
};

/**
 * Return Single registration
 * @param int course id
 * @returns single registration
 */

module.exports.singleRegistration = async (id) => {
  try {
    var singleRegistration = await db.CourseRegistration.findOne({
      where: {
        courseId: id,
      },
      include: db.Course,
    });
  } catch (err) {
    console.log(err);
  }
  return singleRegistration;
};

/**
 * Return Active Courses
 * @param NULL
 * @returns activeCourses
 */

module.exports.activeCourses = async () => {
  try {
    var activeCourses = await db.CourseRegistration.findAll({
      where: {
        status: 1,
      },
      include: db.Course,
    });
  } catch (err) {
    console.log(err);
  }
  return activeCourses;
};
/**
 * Return Open Courses
 * @param NULL
 * @returns openCourse
 */
module.exports.openCourse = async () => {
  try {
    var openCourse = await db.CourseRegistration.findAll({
      where: {
        RegistrationTimeLimit: {
          [Op.gte]: new Date(Date.now()),
        },
        status: 1,
      },
      include: db.Course,
    });
  } catch (err) {
    console.log(err);
  }
  return openCourse;
};
