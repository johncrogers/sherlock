module.exports = {
  queries: [
    (targetComponent => `import ${targetComponent} `)(),
    (targetComponent => `src/components/pages/${targetComponent}/index`)()
  ],
  exceptions: ["test", "icon.js"]
};
