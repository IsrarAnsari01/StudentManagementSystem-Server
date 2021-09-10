const express = require("express");
const { grantAccess } = require("../jwt/verification");
const router = express.Router();
const controller = require("../controller/role.controller");
/* Add Role
 * Only Admin access this API
 */

router.post("/addRole", grantAccess(["admin"]), controller.addRole);

/* List All Roles
 */

router.get("/", controller.findRoles);

/* Get Single Role
 * Accept Role id as a URL parameter | Only Admin access this API
 */

router.get("/:roleId", grantAccess(["admin"]), controller.singleRole);

/* Delete Role
 * Accept Role id as a URL parameter | Only Admin access this API
 */

router.delete("/:roleId", grantAccess(["admin"]), controller.deleteRole);

/* Update Role
 * Accept Role id as a URL parameter | Only Admin access this API
 */
router.put("/:roleId", grantAccess(["admin"]), controller.updateRole);
module.exports = router;
