const cTable = require("console.table");
const { readdirSync } = require("fs");
let helpersPath = "./helpers";
let testCoverage = {};
readdirSync(helpersPath, { encoding: "utf8" }).forEach(helper => {
  if (helper !== "index.js") {
    testCoverage[helper] = readdirSync(`${helpersPath}/${helper}`, {
      encoding: "utf8"
    }).includes("test.js");
  }
});
console.table(testCoverage);
