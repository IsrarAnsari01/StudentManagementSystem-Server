module.exports.resetTemplateSubject = () => {
  return "<h2> Hello User Your Password Successfully reseted</h2>";
};
module.exports.resetTemplateBody = (token) => {
  return `<h5> Click on the link to change the password</h5><br /> 
link: http://localhost:3500/resetPasswordBtn?token=${token}
  `;
};
