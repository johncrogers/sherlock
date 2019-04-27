module.exports = () => {
  console.log("What can I solve for you?");
  console.log(
    "Hint: Make sure your terminal is in the application root that you intend to search."
  );
  console.group("Syntax: ( ex: sherlock solve Card src )");
  console.group(`Target Component:`);
  console.log("ex: Card");
  console.groupEnd();
  console.group(`Target Path:`);
  console.log("ex: src");
  console.groupEnd();
  console.groupEnd();
};
