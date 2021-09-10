const roleModel = require("../../models/modelFunc/role.func");

/* Add Role
 * Role data should be pass as a object named as roleData
 */

module.exports.addRole = async (req, res) => {
  try {
    let roleData = req.body.roleData;
    let role = await roleModel.addRole(roleData);
    res.send({ status: true, save: true, roleInfo: role });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};

/* Get Roles
 */

module.exports.findRoles = async (req, res) => {
  try {
    let roles = await roleModel.findRoles();
    res.send({ status: true, found: roles });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};

/* Delete Role
 */

module.exports.deleteRole = async (req, res) => {
  try {
    let deletedRole = await roleModel.deleteRole(req.params.roleId);
    res.send({ status: true, delete: true });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};

/* update Role
 */

module.exports.updateRole = async (req, res) => {
  try {
    const roleData = req.body.roleData;
    let updatedRole = await roleModel.updateRole(roleData, req.params.roleId);
    res.send({ status: true, save: true });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};
/**
 * Return Single Role
 */

module.exports.singleRole = async (req, res) => {
  try {
    let role = await roleModel.singleRole(req.params.roleId);
    res.send({ status: true, role: role });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};
