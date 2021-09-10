const db = require("../index");
module.exports.findTeacher = async (teacher_id, course_id) => {
  try {
    var found = await db.courseTeacher.findOne({
      where: {
        teacher_id: teacher_id,
        course_id: course_id,
      },
    });
    console.log("Inside Model", found);
  } catch (err) {
    console.log(err);
  }
  return found;
};
