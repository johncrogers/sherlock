const buildDependencyTrees = require("../buildDependencyTrees");

module.exports = (hint, targetDirectory) => {
  if (hint && targetDirectory) {
    return buildDependencyTrees(hint, targetDirectory);
  } else {
    console.log(
      "Sherlock not used properly. Please refer to documentation: https://github.com/johncrogers/sherlock"
    );
  }
};
