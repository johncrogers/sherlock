module.exports = function buildCommandString(targetComponent, directory) {
  const queries = require("./queries");

  return queries
    .map(query => {
      return ` grep '${query(targetComponent)}' ${directory} -rl ||`;
    })
    .join("")
    .concat(" true");
};
