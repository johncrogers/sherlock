const buildCommandString = require("../buildCommandString");
const buildGrepResults = require("../buildGrepResults");
const fileNameIncludesExceptions = require("../fileNameIncludesExceptions");
const buildFileObject = require("../buildFileObject");

module.exports = (query, directory) => {
  console.group("Processing matches...");
  let fileList = [];
  const commandString = buildCommandString(query, directory);

  buildGrepResults(commandString).forEach(matchString => {
    if (!matchString.includes("node_modules")) {
      const matchStringPathArray = matchString.split("/");
      const fileName = matchStringPathArray[matchStringPathArray.length - 1];
      const directoryName =
        matchStringPathArray[matchStringPathArray.length - 2];

      if (!fileNameIncludesExceptions(fileName)) {
        fileList.push(buildFileObject(matchString, directoryName, fileName));
      }
    }
  });
  console.log("Matches:", JSON.stringify(fileList));
  console.groupEnd();
  return fileList;
};
