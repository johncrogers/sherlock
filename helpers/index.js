require("fs")
  .readdirSync(`${__dirname}`, { encoding: "utf8" })
  .forEach(helper => {
    module.exports[helper] = require(`./${helper}`);
  });
