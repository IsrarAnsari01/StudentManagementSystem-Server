const db = require("../index");

module.exports.addExpertise = async (data) => {
  try {
    var expertise = await db.Expertise.create(data);
  } catch (err) {
    console.log(err);
  }
  return expertise;
};

module.exports.check = async (name, teacher_id) => {
  try {
    var present = await db.Expertise.findOne({
      where: {
        name: name,
        teacher_id: teacher_id,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return present;
};

module.exports.getTeachers = async (skills) => {
  try {
    var present = await db.Expertise.findAll({
      where: {
        name: skills,
      },
      include: [
        {
          model: db.Teachers,
          include: [
            {
              model: db.User,
            },
          ],
        },
      ],
      group: ["teacher_id"],
    });
  } catch (err) {
    console.log(err);
  }
  return present;
};
