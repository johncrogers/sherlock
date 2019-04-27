module.exports.fileNameIncludesExceptions = function fileNameIncludesExceptions(
  fileName
) {
  const exceptions = ["test", "icon.js"];

  let flag = false;
  exceptions.forEach(exception => {
    if (fileName.includes(exception)) {
      flag = true;
    }
  });
  return flag;
};