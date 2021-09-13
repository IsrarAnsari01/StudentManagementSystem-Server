const expertiseModel = require("../../models/modelFunc/expertises.func");

const checkAlreadyAddOrNot = async (name, id) => {
  let present = false;
  try {
    const check = await expertiseModel.check(name, id);
    if (check) {
      present = true;
      return present;
    }
  } catch (error) {
    console.error(error);
  }
  return present;
};
module.exports.addExpertise = async (req, res) => {
  try {
    let teacher_id = req.params.teacher_Id;
    let name = req.body.name;
    let data = { name, teacher_id };
    if (!(name && teacher_id)) {
      res.send({ status: false, err: "Something went wrong" });
      return;
    }
    let alreadyAdd = await checkAlreadyAddOrNot(name, teacher_id);
    if (alreadyAdd) {
      res.send({ status: false, err: "You already add this Skill " });
      return;
    }
    let expertise = await expertiseModel.addExpertise(data);
    res.send({ status: true, expertise: expertise });
  } catch (error) {
    res.send({ status: false, err: error });
  }
  return;
};
function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}
module.exports.getTeachers = async (req, res) => {
  try {
    let skills = req.body.skills;
    const getTeachers = await expertiseModel.getTeachers(skills);
    // let sortedList = getUniqueListBy(getTeachers, "teacher_id");
    res.send({ status: true, found: getTeachers });
  } catch (error) {
    res.send({ status: false, found: null });
  }
  return;
};
