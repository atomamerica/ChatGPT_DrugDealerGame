// Game state
let player = {
  name: "",
  inventory: [],
  money: 100,
};

// Function to process player input
function processInput() {
  const input = document.getElementById("user-input").value.trim(); // Trim the input to remove leading/trailing whitespace
  document.getElementById("user-input").value = "";

  // Process input here and update game state
  const inputArray = input.split(" ");
  const command = inputArray[0].toLowerCase();
  const argument = inputArray.slice(1).join(" ");

  switch (command) {
    case "buy":
      buyDrug(argument);
      break;
    case "sell":
      sellDrug(argument);
      break;
    case "inventory":
      displayInventory();
      break;
    case "help":
      displayHelp();
      break;
    default:
      displayMessage("Invalid command. Type 'help' for a list of commands.");
      break;
  }

  // Display updated game state
  displayGameState();
}

// Function to buy drugs
function buyDrug(drug) {
  // Add the drug to the player's inventory
  player.inventory.push(drug);

  // Deduct the cost from the player's money
  player.money -= 50;

  // Display success message
  displayMessage(`You bought ${drug} for $50.`);
}

// Function to sell drugs
function sellDrug(drug) {
  // Check if the player has the drug in their inventory
  const drugIndex = player.inventory.indexOf(drug);
  if (drugIndex === -1) {
    displayMessage(`You don't have ${drug} in your inventory.`);
    return;
  }

  // Remove the drug from the player's inventory
  player.inventory.splice(drugIndex, 1);

  // Add money to the player's account
  player.money += 50;

  // Display success message
  displayMessage(`You sold ${drug} for $50.`);
}

// Function to display the player's inventory
function displayInventory() {
  if (player.inventory.length === 0) {
    displayMessage("Your inventory is empty.");
  } else {
    displayMessage(`Inventory: ${player.inventory.join(", ")}`);
  }
}

// Function to display the help menu
function displayHelp() {
  const helpText = `Available commands:
  - buy [drug]: Buy a drug for $50.
  - sell [drug]: Sell a drug for $50.
  - inventory: Display your inventory.
  - help: Display this help menu.`;

  displayMessage(helpText);
}

// Function to display a regular game message
function displayMessage(message) {
  const gameText = document.getElementById("game-text");
  gameText.innerHTML = message;
}

// Function to display game state
function displayGameState() {
  const gameText = document.getElementById("game-text");
  gameText.innerHTML = `Player: ${player.name}<br>
                        Money: $${player.money}<br>
                        Inventory: ${player.inventory.join(", ")}`;
}

// Initialize the game
function initGame() {
  player.name = prompt("Enter your name:");
  displayGameState();

  // Add event listener to the submit button
  const submitButton = document.getElementById("submit-button");
  submitButton.addEventListener("click", processInput);
}

// Call the initGame function when the page loads
window.onload = initGame;
