module.exports = fileName => {
  const exclusions = require("./exclusions");

  let flag = false;
  exclusions.forEach(exception => {
    if (fileName.includes(exception)) {
      flag = true;
    }
  });
  return flag;
};
