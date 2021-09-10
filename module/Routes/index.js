module.exports.indexRouting = (app) => {
    app.use("/api/user", require("./user.routes"));
    app.use("/api/role", require("./role.routes"));
    app.use("/api/teacher", require("./teacher.routes"));
    app.use("/api/student", require("./student.routes"));
    app.use("/api/course", require("./course.route"));
    app.use("/api/courseRegistration", require("./courseRegistration.routes"));

    app.get("*", (req, res) => {
      res.send("<h2> Welcome to Test Server</h2>");
    });
  };
  