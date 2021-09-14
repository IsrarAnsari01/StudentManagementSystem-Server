const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({

});

module.exports.passwordMail = function (userEmail, password) {
  console.log(transporter);
  const mainOption = {
    from: "noreply@codup.io",
    to: `${userEmail}`,
    subject: "Admin Added you in Student management system",
    html: ` <h2> Welcome User! <br /> <p> This is your new Password </p> <b>${password}</b></h2>`,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mainOption, (err, info) => {
      console.log(mainOption);
      if (err) {
        console.log("Error in sending Mail ", err);
        reject(err);
      }
      resolve(true);
    });
  });
};
