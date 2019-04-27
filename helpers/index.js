require("fs")
  .readdirSync("./", { encoding: "utf8" })
  .forEach(helper => {
    module.exports[helper] = require(`./${helper}`);
  });
