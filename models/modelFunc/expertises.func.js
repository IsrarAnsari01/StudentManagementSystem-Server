const db = require("../index");
/**
 * Check Skill name already added or not crossponding to logged user id
 * @param object data
 * @returns boolean
 */

const checkSkillsALreadyAddOrNot = async (data) => {
  let hasSkill = false;
  try {
    var present = await db.Expertise.findOne({
      where: {
        name: data.name,
        teacher_id: data.teacher_id,
      },
    });
    if (present) {
      hasSkill = true;
      return hasSkill;
    }
  } catch (err) {
    console.log(err);
  }
  return hasSkill;
};

/**
 * Add Teacher Experties
 * @param object data || data should contain a property named as name and its datatype should be array also data contain teacher_id
 * @returns array addSkills
 */

module.exports.addExpertise = async (data) => {
  let addSkills = [];
  if (data.name.length) {
    data.name.forEach(async (skill) => {
      let singleObj = { name: skill, teacher_id: data.teacher_id };
      try {
        let check = await checkSkillsALreadyAddOrNot(singleObj);
        if (check) {
          return { skillName: singleObj.name, status: "present" };
        }
        var expertise = await db.Expertise.create(singleObj);
        addSkills.push(expertise);
      } catch (err) {
        console.log(err);
      }
    });
  }
  return addSkills;
};

/**
 * Return Teachers According to skills name
 * @param string skills
 * @returns array students
 */

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

module.exports.getSKills = async (id) => {
  try {
    var skills = await db.Expertise.findAll({
      where: {
        teacher_id: id,
      },
      group: ["name"],
    });
  } catch (error) {
    console.log(error);
  }
  return skills;
};

const deletePreviosSkills = async (id) => {
  let reMove = false;
  try {
    const deleted = db.Expertise.destroy({
      where: {
        teacher_id: id,
      },
    });

    if (deleted) {
      reMove = true;
      return reMove;
    }
  } catch (error) {
    console.log("Unable to delete some thing went Wrong");
  }
  return reMove;
};

module.exports.updateSkill = async (data) => {
  let updatedSkills = [];
  if (data.name.length) {
    const deleted = await deletePreviosSkills(data.teacher_id);
    if (deleted) {
      data.name.forEach(async (skill) => {
        let singleObj = { name: skill, teacher_id: data.teacher_id };
        try {
          var expertise = await db.Expertise.create(singleObj);
          updatedSkills.push(expertise);
        } catch (err) {
          console.log(err);
        }
      });
    }
  }
  return updatedSkills;
};
