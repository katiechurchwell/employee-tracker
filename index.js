var DB = require("./utils/db.js");
var userPrompts = require("./utils/userPrompts.js");

async function app() {
  const { menuChoice } = await userPrompts.promptHomeMenu();
  if (menuChoice === "Quit") return;
  DB[menuChoice.split(" ").join("")]();
}

app();