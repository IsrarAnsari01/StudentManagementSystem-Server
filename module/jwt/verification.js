const jwt = require("jsonwebtoken");
const { findSingleUser } = require("../../models/modelFunc/user.func");
module.exports.grantAccess = (roles) => {
  return (auth = (req, res, next) => {
    // For PostMan
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];
    // // console.log(token)
    // For UI
    const token = req.headers["authorization"];
    if (!token) return res.send({ status: false, err: "Unable to access it" });
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      const userId = verified.id;
      const user = { id: userId };
      const loggedInUser = findSingleUser(user).then((userInformation) => {
        req.userRole = userInformation.Role.name;
        let userRole = userInformation.Role.name;
        if (roles.includes(userRole)) {
          next();
          return;
        }
        res.send({
          status: false,
          permissionDenind: "You are not eligible for access it",
        });
      });
    } catch (err) {
      res.send({ status: false, tokenExp: "Invalid Token Try again" });
    }
  });
};
