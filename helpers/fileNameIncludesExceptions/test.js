const fileNameIncludesExclusions = require("./index");

test("Correctly asserts whether or not fileName is excluded.", () => {
  expect(fileNameIncludesExclusions("test")).toEqual(true);
  expect(fileNameIncludesExclusions("Card")).toEqual(false);
});
