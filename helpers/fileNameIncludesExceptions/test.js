const fileNameIncludesExclusions = require("./index");

test("Returns true when exclusion is found.", () => {
  expect(fileNameIncludesExclusions("test")).toEqual(true);
});
test("Returns flase when exclusion is found.", () => {
  expect(fileNameIncludesExclusions("Card")).toEqual(false);
});
