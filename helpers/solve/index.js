const { buildDependencyTrees } = require("../buildDependencyTrees");
const { displayHelpText } = require("../displayHelpText");

module.exports.solve = function solve(hint, targetDirectory) {
  if (hint && targetDirectory) {
    return buildDependencyTrees(hint, targetDirectory);
  } else {
    displayHelpText();
  }
};
