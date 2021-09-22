const intrestSub = require("../../models/modelFunc/intrestedSubjects.func");

const checkAlreadyAddOrNot = async (name, id) => {
  let present = false;
  try {
    const check = await intrestSub.check(name, id);
    if (check) {
      present = true;
      return present;
    }
  } catch (error) {
    console.error(error);
  }
  return present;
};
module.exports.addSubject = async (req, res) => {
  try {
    let student_id = req.params.student_id;
    let name = req.body.name;
    let data = { name, student_id };
    if (!(name && student_id)) {
      res.send({ status: false, err: "Something went wrong" });
      return;
    }
    // let alreadyAdd = await checkAlreadyAddOrNot(name, student_id);
    // if (alreadyAdd) {
    //   res.send({ status: false, err: "You already add this Skill " });
    //   return;
    // }
    let sub = await intrestSub.addSubject(data);
    res.send({ status: true, save: true, sub: sub });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};

module.exports.getStudents = async (req, res) => {
  try {
    let skills = req.body.skills;
    const getStudents = await intrestSub.getStudents(skills);
    res.send({ status: true, found: getStudents });
  } catch (error) {
    res.send({ status: false, found: null });
  }
  return;
};

module.exports.getSubjects = async (req, res) => {
  try {
    let stuId = req.params.id;
    const subjects = await intrestSub.subjects(stuId);
    res.send({ status: true, found: subjects });
  } catch (error) {
    res.send({ status: false, found: null });
  }
  return;
};
