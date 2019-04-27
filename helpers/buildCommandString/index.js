module.exports.buildCommandString = function buildCommandString(
  targetComponent,
  directory
) {
  const queries = [
    (targetComponent => `import ${targetComponent} `)(),
    (targetComponent => `src/components/pages/${targetComponent}/index`)()
  ];

  return queries
    .map(query => {
      return ` grep '${query(targetComponent)}' ${directory} -rl ||`;
    })
    .join("")
    .concat(" true");
};
