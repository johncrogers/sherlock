module.exports = commandString => {
  let grepResult = require("child_process").execSync(commandString, {
    encoding: "utf8",
    stdio: "inherit"
  });
  grepResult = grepResult.split("\n");
  if (grepResult.includes("")) {
    grepResult.pop();
  }
  return grepResult;
};
