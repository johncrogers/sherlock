const { buildMatchedFileList } = require("../buildMatchedFileList");

module.exports.buildDependencyTrees = function buildDependencyTrees(
  hint,
  targetDirectory,
  childrenTree = null
) {
  function recursiveFunction(
    hint,
    targetDirectory,
    dependencyTrees,
    childrenTree = null
  ) {
    console.group(`Hint: ${hint}`);
    buildMatchedFileList(hint, targetDirectory).forEach(match => {
      const newNode = {
        name: hint,
        child: childrenTree
      };
      const isNotRouteFile = !match.name.includes("outes");
      if (isNotRouteFile) {
        console.group(" > Moving to next level...");
        recursiveFunction(
          match.name,
          targetDirectory,
          dependencyTrees,
          newNode
        );
        console.groupEnd();
      } else {
        console.log(`Reached route. [ ${match.path} ] Closing...`);
        newNode.routeFile = match.path;
        dependencyTrees.push(newNode);
      }
    });
    console.groupEnd();
  }
  let dependencyTrees = [];
  recursiveFunction(hint, targetDirectory, dependencyTrees);

  return { dependencyTrees, pages: buildPageDependencyTrees(dependencyTrees) };
};
