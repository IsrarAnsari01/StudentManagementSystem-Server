const registrationModel = require("../../models/modelFunc/courseRegistration.func");
/**
 * Return Course start time
 * @param date startTime
 * @returns start time
 */

const courseStartTime = (startTime) => {
  let now = new Date();
  switch (startTime) {
    case 0:
      startTime = now.setDate(now.getDate() + 1); // Tomorrow
      break;
    case 1:
      startTime = now.setDate(now.getDate() + 183); // 6 months later
      break;
    case 1:
      startTime = now.setDate(now.getDate() + 365); // 1 year later
      break;
  }
  return startTime;
};

/**
 * Return Course end time
 * @param date endTime
 * @returns endTime
 */

const courseEndTime = (endTime, startTime) => {
  // let now = new Date();
  let startDate = new Date(startTime);

  // endTime = now.setDate(now.getDate());
  // endTime += startTime;
  switch (endTime) {
    case 0:
      endTime = startDate.setDate(startDate.getDate() + 30); // after 30 days
      break;
    case 1:
      endTime = startDate.setDate(startDate.getDate() + 183); // after 6 months
      break;
    case 2:
      endTime = startDate.setDate(startDate.getDate() + 365); // after one year
      break;
  }
  return endTime;
};

/**
 * Return Registration time limit
 * @param int RegistrationTimeLimit
 * @returns RegistrationTimeLimit
 */

const regiestrationTime = (RegistrationTimeLimit) => {
  let now = new Date();
  switch (RegistrationTimeLimit) {
    case 0:
      RegistrationTimeLimit = now.setDate(now.getDate() + 7); //  1 week
      break;
    case 1:
      RegistrationTimeLimit = now.setDate(now.getDate() + 14); // 14 days
      break;
    case 2:
      RegistrationTimeLimit = now.setDate(now.getDate() + 30); // 1 month
      break;
  }
  return RegistrationTimeLimit;
};

/**
 * Add Registration
 * Registration Details should be pass as a object named as RegistrationDetails
 */

module.exports.addRegistaion = async (req, res) => {
  let RegistrationDetails = req.body.registrationDetails;
  if (RegistrationDetails.startTime) {
    RegistrationDetails.startTime = new Date(RegistrationDetails.startTime);
  }
  if (RegistrationDetails.endTime) {
    RegistrationDetails.endTime = new Date(RegistrationDetails.endTime);
  }
  console.log();
  if (!(RegistrationDetails.endTime > RegistrationDetails.startTime)) {
    res.send({ status: false, err: "Inavlid Course Duration" });
  }
  if (RegistrationDetails.RegistrationTimeLimit) {
    RegistrationDetails.RegistrationTimeLimit = new Date(
      RegistrationDetails.RegistrationTimeLimit
    );
  }
  if (
    !(
      RegistrationDetails.RegistrationTimeLimit &&
      RegistrationDetails.RegistrationTimeLimit < RegistrationDetails.endTime
    )
  ) {
    res.send({
      status: false,
      registrationTimeERR: "Something went wrong with registration time limit",
    });
  }

  try {
    let registratedData = await registrationModel.addRegistaion(
      RegistrationDetails
    );
    res.send({ status: true, save: true, data: registratedData });
  } catch (error) {
    res.send({ status: false, gernalErr: error });
  }
  return;
};

/**
 * return List of Registraion with pagination and sorting
 */

module.exports.registrations = async (req, res) => {
  let registrationPerPage = Number(req.query.limit);
  const pageNum = Number(req.query.page);
  const sort = req.query.sort;
  let limit = 5;
  let page = 0;
  let sortingTechnique = "ASC";
  if (
    registrationPerPage &&
    !Number.isNaN(registrationPerPage) &&
    registrationPerPage > limit
  ) {
    limit = registrationPerPage;
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
    let registrations = await registrationModel.registrations(
      limit,
      page,
      sortingTechnique
    );
    res.send({ status: true, found: registrations });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};

/**
 * Delete Registration
 */

module.exports.deleteRegistration = async (req, res) => {
  try {
    let deletedRegistration = await registrationModel.deleteRegistration(
      req.params.courseId
    );
    res.send({ status: true, delete: true });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};
/**
 * Update Registration
 * Registration Details should be pass as a object named as RegistrationDetails
 */

module.exports.updateRegistration = async (req, res) => {
  const registrationDetails = req.body.registrationDetails;
  if (registrationDetails.startTime) {
    registrationDetails.startTime = new Date(registrationDetails.startTime);
  }
  if (registrationDetails.endTime) {
    registrationDetails.endTime = new Date(registrationDetails.endTime);
  }
  if (!(registrationDetails.endTime > registrationDetails.startTime)) {
    res.send({ status: false, err: "Inavlid Course Duration" });
  }
  if (registrationDetails.RegistrationTimeLimit) {
    registrationDetails.RegistrationTimeLimit = new Date(
      registrationDetails.RegistrationTimeLimit
    );
  }

  if (
    !(
      registrationDetails.RegistrationTimeLimit &&
      registrationDetails.RegistrationTimeLimit >=
        registrationDetails.startTime &&
      registrationDetails.RegistrationTimeLimit < registrationDetails.endTime
    )
  ) {
    res.send({
      status: false,
      err: "Something went wrong with registration time limit",
    });
  }
  if (registrationDetails.RegistrationTimeLimit) {
    registrationDetails.RegistrationTimeLimit = new Date(
      registrationDetails.RegistrationTimeLimit
    );
  }
  parseInt(registrationDetails.seats);
  try {
    let updatedRegistration = await registrationModel.updateRegistration(
      registrationDetails,
      req.params.courseId
    );
    res.send({
      status: true,
      save: true,
      updatedRegistration: updatedRegistration,
    });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};

/**
 * Return Single Registration
 * Accept Course id as a URL parameter
 */

module.exports.singleRegistration = async (req, res) => {
  try {
    let registration = await registrationModel.singleRegistration(
      req.params.courseId
    );
    res.send({ status: true, registration: registration });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};
/**
 * Return Active Courses whose status is true
 */

module.exports.activeCourses = async (req, res) => {
  try {
    let activeCources = await registrationModel.activeCourses();
    res.send({ status: true, activeCourses: activeCources });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};

/**
 * Return Open Courses
 */

module.exports.openCourse = async (req, res) => {
  try {
    let openCourse = await registrationModel.openCourse();
    res.send({ status: true, openCourse: openCourse });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};
