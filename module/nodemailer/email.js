let nodemailer = require("nodemailer");
let fs = require("fs");
let ejs = require("ejs");

const transporter = nodemailer.createTransport({
  host: "manta.websitewelcome.com",
  secure: true,
  port: 465,
  auth: {
    user: "testing@codup.io",
    pass: "",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports.passwordMail = function (userEmail, token) {
  let source = fs
    .readFileSync(`${__dirname}/templates/resetPassword.ejs`, "utf-8")
    .toString();
  let template = ejs.compile(source);
  let html = template({ token: token });
  const mainOption = {
    from: "testing@codup.io",
    to: `${userEmail}`,
    subject: `Click this link to change the password`,
    html: `${html}`,
  };
  return new Promise((resolve, reject) => {
    console.log(mainOption);
    transporter.sendMail(mainOption, (err, info) => {
      if (err) {
        console.log("Error in sending Mail ", err);
        reject(err);
      }
      resolve(true);
    });
    resolve(true);
  });
};
