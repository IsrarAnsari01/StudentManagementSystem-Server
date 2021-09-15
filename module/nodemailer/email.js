let ejs = require("ejs");
let nodemailer = require("nodemailer");
const fs = require("fs");

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

module.exports.passwordMail = function (userEmail, token) {
  var data = fs.readFile('test.txt', 'utf8');
  console.log(data.toString());  
  // let filename = "resetPassword";
  // let content = fs.readFileSync(process.cwd() + "/" + filename).toString();
  // console.log(content);
  // try {
  //   const data = fs.readFileSync("./test.txt", "utf8");
  //   console.log(data);
  // } catch (err) {
  //   console.error(err);
  // }

  // const content = readFile("resetPassword");
  // html = ejs.renderFile("resetPassword", { token: token }, function (err, str) {
  //   console.log(str);
  // });
  // let template = ejs.compile("resetPassword", options);
  // console.log(template(data));
  const mainOption = {
    from: "testing@codup.io",
    to: `${userEmail}`,
    subject: `Test Mail`,
    html: `Hello world`,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mainOption, (err, info) => {
      console.log("mail option", mainOption);
      console.log("success Msg", info);
      if (err) {
        console.log("Error in sending Mail ", err);
        reject(err);
      }
      resolve(true);
    });
    resolve(true);
  });
};
