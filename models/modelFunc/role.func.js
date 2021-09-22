const db = require("../index");

/**
 * Add Role
 * @param object roleData
 * @returns new Role
 */

module.exports.addRole = async (roleData) => {
  try {
    var role = await db.Role.create(roleData);
  } catch (err) {
    console.log(err);
  }
  return role;
};

/**
 * Delete Role
 * @param int role id
 * @returns Deleted Role
 */

module.exports.deleteRole = async (roleId) => {
  try {
    var delRole = await db.Role.destroy({
      where: {
        id: roleId,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return delRole;
};

/**
 * Return All Roles
 * @param NULL
 * @returns roles
 */

module.exports.findRoles = async () => {
  try {
    var allRole = await db.Role.findAll();
  } catch (err) {
    console.log(err);
  }
  return allRole;
};

/**
 * Update Role
 * @param object roleInfo, int roleId
 * @returns updated Role
 */

module.exports.updateRole = async (roleInfo, id) => {
  try {
    var updatedUser = await db.Role.update(roleInfo, {
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return updatedUser;
};

/**
 * Return Single Role
 * @param int role id
 * @returns role
 */

module.exports.singleRole = async (name) => {
  try {
    var singleRole = await db.Role.findOne({
      where: {
        name: name,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return singleRole;
};

/**
 * Return Single Role
 * @param string roleName
 * @returns role
 */

module.exports.roleByName = async (roleName) => {
  try {
    var singleRole = await db.Role.findOne({
      where: {
        name: roleName,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return singleRole;
};
