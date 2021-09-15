const userModel = require("../../models/modelFunc/user.func");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { updateInformation } = require("../../models/modelFunc/teacher.func");
const { updateStuInformation } = require("../../models/modelFunc/student.func");
const { roleByName } = require("../../models/modelFunc/role.func");
const mail = require("../nodemailer/email");

/**
 * Add User
 */
module.exports.addUser = (req, res) => {
  let userData = req.body.userData;
  if (userData.roleId && !Number.isNaN(userData.roleId)) {
    userModel
      .addUser(userData)
      .then((succ) => {
        res.send({ status: true, userInfo: succ });
      })
      .catch((err) => {
        res.send({
          status: false,
          err: err,
          errMsg: "User Not Saved Something went wrong",
        });
      });
  }
};

/**
 * Retrive all users with pagination or sorting
 */
module.exports.allUsers = async (req, res) => {
  let userPerPageLimit = Number(req.query.limit);
  const pageNum = Number(req.query.page);
  let sort = req.query.sort;
  if (sort) sort = sort.toUpperCase();
  let limit = 2;
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
    let users = await userModel.allUsers(limit, page, sortingTechnique);

    res.send({ status: true, found: users });
  } catch (error) {
    res.send({ status: false, err: error });
  }
};

/**
 * Delete User
 */

module.exports.deleteUser = async (req, res) => {
  try {
    let deletedUser = await userModel.deleteUser(req.params.userId);
    res.send({ status: true, delete: true });
  } catch (error) {
    res.send({ status: false, err: error });
  }
};

/**
 * Update User basic information as well as Meta information
 */
module.exports.updateUserInfo = async (req, res) => {
  const userData = req.body.userData;
  const userRole = req.body.userData.metaInfo.role;
  const userMetaData = req.body.userData.metaInfo;
  const basicInfo = {
    name: userData.name,
    email: userData.email,
    password: userData.password,
  };
  try {
    let basicUpdate = await userModel.updateUser(basicInfo, req.params.userId);
    let advanceUpdate;
    switch (true) {
      case userRole == req.userRole && req.userRole == "Teacher":
        advanceUpdate = await updateInformation(
          userMetaData,
          req.params.userId
        );
        break;
      case userRole == req.userRole && req.userRole == "Student":
        advanceUpdate = await updateStuInformation(
          userMetaData,
          req.params.userId
        );
        break;
    }
    res.send({ status: true, save: true, data: advanceUpdate });
  } catch (error) {
    res.send({ status: false, err: error });
  }
};

/**
 * Login User
 */
module.exports.loginUser = async (req, res) => {
  const userData = req.body.userData;
  console.log(userData);
  if (userData.password.length < 6) {
    res.send({ status: false, Password: "Password Length too short" });
  }
  try {
    const loggedUser = await userModel.loginUser(userData);
    const userId = loggedUser.id;
    const token = jwt.sign({ id: userId }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "1440m",
    });
    res.send({ status: true, token: token, role: loggedUser.Role.name, id: userId });
  } catch (error) {
    res.send({
      status: false,
      err: error,
      errorMsg: "User Not Found Try Again later",
    });
  }
  return;
};

module.exports.teachers = async (req, res) => {
  let teachersLimit = Number(req.query.limit);
  const pageNum = Number(req.query.page);
  let limit = 5;
  let page = 0;
  if (teachersLimit && !Number.isNaN(teachersLimit) && teachersLimit > limit) {
    limit = teachersLimit;
  }
  if (pageNum && !Number.isNaN(pageNum) && pageNum > 0) {
    page = pageNum;
  }
  try {
    const role = await roleByName(req.params.roleName);
    const teachers = await userModel.teachers(role.id, limit, page);
    res.send({ status: true, teachers });
  } catch (error) {
    res.status(400).send({ status: false, err: error });
  }
};

module.exports.teacher = async (req, res) => {
  try {
    const teacher = await userModel.teacher(req.params.id);
    res.send({ status: true, teacher: teacher });
  } catch (error) {
    res.status(400).send({ status: false, err: error });
  }
};

/**
 * Reset Password
 * @param {string email} req
 * @param {status boolean , string massage} res
 * @returns
 */

module.exports.resetPassword = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const user = await userModel.getUserbyEmail(userEmail);
    const userId = user.id;
    const token = jwt.sign({ id: userId }, process.env.RESET_SECRET_KEY, {
      expiresIn: "20m",
    });
    let userInfo = { password: token };
    const updateUserPassword = await userModel.updateUser(userInfo, user.id);
    let sendMail = await mail.passwordMail(user.email, token);
    res.send({ status: true, success: "Mail Send Successfully" });
  } catch (err) {
    res.send({
      status: false,
      err: "Something went wrong Try Again Or Sign in Again",
    });
  }
  return;
};

/**
 * Generate New Password | First check send token is valid or not then generate password
 * @param {base64 token , string newPassword} req
 * @param {status boolean , string massage} res
 * @returns
 */

module.exports.generatePassword = async (req, res) => {
  let token = req.body.token;
  let newPassword = req.body.newPassword;
  let userId;
  if (token) {
    jwt.verify(token, process.env.RESET_SECRET_KEY, (err, succ) => {
      if (err) {
        res.send({
          status: false,
          err: "Invalid Token | Maybe token expired",
        });
        return;
      }
      userId = succ.id;
    });
    if (userId) {
      try {
        let data = { password: newPassword };
        const updatePassword = await userModel.updateUser(data, userId);
        res.send({ status: true, succMsg: "Password Changed Successfully " });
        return;
      } catch (error) {
        res.send({
          status: false,
          succMsg: "Something went wrong in changing password",
        });
      }
      return;
    }
    res.send({ status: false, err: "Unable to find User Please Sign in" });
    return;
  }
};
