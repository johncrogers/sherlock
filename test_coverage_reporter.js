require("console.table");
const { readdirSync } = require("fs");
let helpersPath = "./helpers";
let testCoverage = [["Helper:", "Test File:"]];
readdirSync(helpersPath, { encoding: "utf8" }).forEach(helper => {
  if (helper !== "index.js") {
    testCoverage.push([
      helper,
      readdirSync(`${helpersPath}/${helper}`, {
        encoding: "utf8"
      }).includes("test.js")
    ]);
  }
});
console.group("Test Coverage:");
console.table(testCoverage[0], testCoverage.slice(1));
console.groupEnd();
