const { buildMatchedFileList } = require("../buildMatchedFileList");
const { buildNewNode } = require("../buildNewNode");

module.exports.buildDependencyTrees = function buildDependencyTrees(
  hint,
  targetDirectory
) {
  function traverseTrees(
    hint,
    targetDirectory,
    dependencyTrees,
    children = null
  ) {
    console.group(`Hint: ${hint}`);
    buildMatchedFileList(hint, targetDirectory).forEach(match => {
      const isNotRouteFile = !match.name.includes("outes");
      if (isNotRouteFile) {
        console.group(" > Moving to next level...");
        traverseTrees(
          match.name,
          targetDirectory,
          dependencyTrees,
          buildNewNode(hint, children)
        );
        console.groupEnd();
      } else {
        console.log(`Reached route. [ ${match.path} ] Closing...`);
        dependencyTrees.push(buildNewNode(hint, children, match.path));
      }
    });
    console.groupEnd();
  }
  let dependencyTrees = [];
  traverseTrees(hint, targetDirectory, dependencyTrees);

  return { dependencyTrees, pages: buildPageDependencyTrees(dependencyTrees) };
};
