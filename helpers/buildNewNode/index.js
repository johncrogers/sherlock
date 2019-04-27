module.exports = (hint, children, path) => {
  let newNode = {
    name: hint,
    children: children
  };
  if (path) {
    newNode.routeFile = path;
  }
  return newNode;
};
