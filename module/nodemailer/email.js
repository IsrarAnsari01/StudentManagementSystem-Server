const nodemailer = require("nodemailer");
const forgetEmaiTemplate = require("./templates/passwordResetTemplate");
const transporter = nodemailer.createTransport({
  host: "manta.websitewelcome.com",
  secure: true,
  port: 465,
  auth: {
    user: "testing@codup.io",
    pass: "click@12345",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports.passwordMail = function (userEmail, token, timeLimit) {
  let emailSubject = forgetEmaiTemplate.resetTemplateSubject();
  let emailBody = forgetEmaiTemplate.resetTemplateBody(token);
  const mainOption = {
    from: "testing@codup.io",
    to: `${userEmail}`,
    subject: `${emailSubject}`,
    html: `${emailBody}`,
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
