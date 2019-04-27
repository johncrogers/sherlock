function buildCommandString(query, directory) {
  return [
    {
      query: `import ${query} `,
      directory
    },
    {
      query: `src/components/pages/${query}/index`, // This is used to reach a route file that does not explicitly import the components.
      directory
    }
  ]
    .map(({ query, directory }) => {
      return ` grep '${query}' ${directory} -rl ||`;
    })
    .join("")
    .concat(" true");
}

function fileNameIncludesExceptions(fileName) {
  let flag = false;
  ["test", "icon.js"].forEach(exception => {
    if (fileName.includes(exception)) {
      flag = true;
    }
  });
  return flag;
}

function buildGrepResults(commandString) {
  const grepResult = require("child_process").execSync(commandString, {
    encoding: "utf8"
  });
  grepResult = grepResult.split("\n");
  if (grepResult.includes("")) {
    grepResult.pop();
  }
  return grepResult;
}

function buildFileObject(match, directoryName, fileName) {
  let fileObject = {};
  const fileIsNotNamedIndex = !fileName.includes("index");
  if (fileIsNotNamedIndex) {
    fileObject.name = fileName.split(".")[0];
  } else {
    fileObject.name = directoryName;
  }
  fileObject.path = match;
  return fileObject;
}

function buildMatchedFileList(query, directory) {
  console.group("Processing matches...");
  let fileList = [];
  const commandString = buildCommandString(query, directory);

  buildGrepResults(commandString).forEach(matchString => {
    const matchStringPathArray = matchString.split("/");
    const fileName = matchStringPathArray[matchStringPathArray.length - 1];
    const directoryName = matchStringPathArray[matchStringPathArray.length - 2];

    if (!fileNameIncludesExceptions(fileName)) {
      fileList.push(buildFileObject(matchString, directoryName, fileName));
    }
  });
  console.log("Matches:", JSON.stringify(fileList));
  console.groupEnd();
  return fileList;
}

function buildDependencyTrees(hint, targetDirectory, childrenTree = null) {
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
}

function buildPageDependencyTrees(dependencyTrees) {
  let pages = {};
  dependencyTrees.forEach(tree => {
    if (!pages[tree.name]) {
      pages[tree.name] = {
        name: tree.name,
        routeFiles: [],
        children: []
      };
    }
    pages[tree.name].children.push(tree.child);
    if (!pages[tree.name].routeFiles.includes(tree.routeFile)) {
      pages[tree.name].routeFiles.push(tree.routeFile);
    }
  });
  return pages;
}

function displayHelpText() {
  console.log("What can I solve for you?");
  console.log(
    "NOTE: Make sure your terminal is in the application root that you intend to search."
  );
  console.group("Syntax: ( ex: sherlock solve Card src )");
  console.group(`Target Component:`);
  console.log("ex: Card");
  console.groupEnd();
  console.group(`Target Path:`);
  console.log("ex: src");
  console.groupEnd();
  console.groupEnd();
}

function solve(hint, targetDirectory) {
  if (hint && targetDirectory) {
    return buildDependencyTrees(hint, targetDirectory);
  } else {
    displayHelpText();
  }
}

module.exports = {
  buildCommandString,
  fileNameIncludesExceptions,
  buildGrepResults,
  buildFileObject,
  buildMatchedFileList,
  buildDependencyTrees,
  buildPageDependencyTrees,
  displayHelpText,
  solve
};
