const buildCommandString = require("./index");

test("Builds a correct command string.", () => {
  expect(buildCommandString("Card", "src")).toEqual(
    " grep 'import Card ' src -rl || grep 'src/components/pages/Card/index' src -rl || true"
  );
});
