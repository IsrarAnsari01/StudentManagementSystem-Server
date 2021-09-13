const db = require("../index");

module.exports.addSubject = async (data) => {
  try {
    var sub = await db.IntrestedSubjects.create(data);
  } catch (err) {
    console.log(err);
  }
  return sub;
};

module.exports.check = async (name, id) => {
  try {
    var present = await db.IntrestedSubjects.findOne({
      where: {
        name: name,
        student_id: id,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return present;
};

module.exports.getStudents = async (skills) => {
  try {
    var present = await db.Expertise.findAll({
      where: {
        name: skills,
      },
      include: [
        {
          model: db.Students,
          include: [
            {
              model: db.User,
            },
          ],
        },
      ],
      group: ["student_id"],
    });
  } catch (err) {
    console.log(err);
  }
  return present;
};
