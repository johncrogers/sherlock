module.exports = dependencyTrees => {
  let pages = {};
  dependencyTrees.forEach(tree => {
    if (!pages[tree.name]) {
      pages[tree.name] = {
        name: tree.name,
        routeFiles: [],
        children: []
      };
    }
    pages[tree.name].children.push(tree.children);
    if (!pages[tree.name].routeFiles.includes(tree.routeFile)) {
      pages[tree.name].routeFiles.push(tree.routeFile);
    }
  });
  return pages;
};
