module.exports.solve = function solve(hint, targetDirectory) {
  if (hint && targetDirectory) {
    return buildDependencyTrees(hint, targetDirectory);
  } else {
    displayHelpText();
  }
};
