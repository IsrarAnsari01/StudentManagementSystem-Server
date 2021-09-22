const db = require("../index");

/**
 * Add Student Interested subjects
 * @param object data || data should contain a property named as name and its datatype should be array also data contain student_id
 * @returns array addedSubjects
 */
module.exports.addSubject = async (data) => {
  let subs = [];
  if (data.name.length) {
    data.name.forEach(async (subName) => {
      let singleObj = { name: subName, student_id: data.student_id };
      try {
        let check = await checkSkillsALreadyAddOrNot(singleObj);
        if (check) {
          return { subName: singleObj.name, status: "present" };
        }
        var sub = await db.IntrestedSubjects.create(singleObj);
        subs.push(sub);
      } catch (err) {
        console.log(err);
      }
    });
  }
  return subs;
};

/**
 * Check Subject name already added or not crossponding to logged user id
 * @param object data
 * @returns boolean
 */

const checkSkillsALreadyAddOrNot = async (data) => {
  let hasInterested = false;
  try {
    var present = await db.IntrestedSubjects.findOne({
      where: {
        name: data.name,
        student_id: data.student_id,
      },
    });
    if (present) {
      hasInterested = true;
      return hasInterested;
    }
  } catch (err) {
    console.log(err);
  }
  return hasInterested;
};

/**
 * Return Students According to interestedSubName name
 * @param string interestedSubName
 * @returns array students
 */

module.exports.getStudents = async (interestedSubName) => {
  try {
    var present = await db.IntrestedSubjects.findAll({
      where: {
        name: interestedSubName,
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

module.exports.subjects = async (id) => {
  try {
    var subjects = await db.IntrestedSubjects.findAll({
      where: {
        student_id: id,
      },
    });
  } catch (error) {
    console.log("Error in fetching data");
  }
  return subjects;
};


const deletePreviousSubjects = async (id) => {
  let reMove = false;
  try {
    const deleted = db.IntrestedSubjects.destroy({
      where: {
        student_id: id,
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



module.exports.updateSubjects = async (data) => {
  let updateSubjects = [];
  if (data.name.length) {
    const deleted = await deletePreviousSubjects(data.student_id);
    if (deleted) {
      data.name.forEach(async (skill) => {
        let singleObj = { name: skill, student_id: data.student_id };
        try {
          var updateSubject = await db.IntrestedSubjects.create(singleObj);
          updateSubjects.push(updateSubject);
        } catch (err) {
          console.log(err);
        }
      });
    }
  }
  return updateSubjects;
};
