const { solve } = require("./index");
function writeResultsToFile(results) {
  const { existsSync, mkdirSync, writeFileSync } = require("fs");
  const baseDirectory = `${__dirname}/findings`;
  const targetDirectory = `${baseDirectory}/${process.argv[2]}`;
  if (!existsSync(baseDirectory)) {
    mkdirSync(baseDirectory);
  }
  if (!existsSync(targetDirectory)) {
    mkdirSync(targetDirectory);
  }
  writeFileSync(`${targetDirectory}/trees.json`, results);
}
writeResultsToFile(JSON.stringify(solve(process.argv[2], process.argv[3])));
