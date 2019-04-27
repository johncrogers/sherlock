module.exports.buildFileObject = function buildFileObject(
  match,
  directoryName,
  fileName
) {
  let fileObject = {};
  const fileIsNotNamedIndex = !fileName.includes("index");
  if (fileIsNotNamedIndex) {
    fileObject.name = fileName.split(".")[0];
  } else {
    fileObject.name = directoryName;
  }
  fileObject.path = match;
  return fileObject;
};
