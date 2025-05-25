const readline = require('readline');
const Login = require('./Login');
const Message = require('./Message');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const loginSystem = new Login();
const messageSystem = new Message();

let loggedInUser = null;
let messagesToEnter = 0;
let messagesEntered = 0;

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function register() {
  console.log("Register User:");
  const username = await ask("Enter username: ");
  const password = await ask("Enter password: ");
  const cell = await ask("Enter South African cell phone number (with international code): ");
  const firstName = await ask("Enter first name: ");
  const lastName = await ask("Enter last name: ");

  const regMsg = loginSystem.registerUser(username, password, cell, firstName, lastName);
  console.log(regMsg);
}

async function login() {
  console.log("Login User:");
  const username = await ask("Enter username: ");
  const password = await ask("Enter password: ");

  const user = loginSystem.loginUser(username, password);
  const loginMsg = loginSystem.returnLoginStatus(user);

  console.log(loginMsg);
  if (user) {
    loggedInUser = user;
    return true;
  } else {
    return false;
  }
}

async function sendMessagesMenu() {
  console.log("Welcome to QuickChat.");

  while (true) {
    if (!loggedInUser) {
      console.log("You must be logged in to send messages.");
      return;
    }

    if (messagesEntered >= messagesToEnter) {
      console.log(`All ${messagesEntered} messages processed.`);
      return;
    }

    console.log("\nSelect option:");
    console.log("1) Send Messages");
    console.log("2) Show recently sent messages (Coming Soon)");
    console.log("3) Quit");

    const choice = await ask("Enter your choice: ");

    if (choice === '1') {
      const recipient = await ask("Enter recipient cell number (with international code): ");
      const messageText = await ask("Enter message (max 250 chars): ");

      if (messageText.length > 250) {
        console.log(`Please enter a message of less than 250 characters.`);
        continue;
      }

      console.log("Send options:");
      console.log("1) Send Message");
      console.log("2) Disregard Message");
      console.log("3) Store Message to send later");

      const option = parseInt(await ask("Select option (1/2/3): "), 10);

      const result = messageSystem.addMessage(recipient, messageText, option);

      if (typeof result === 'string') {
        console.log(result);
      } else {
        console.log("Message details:");
        console.log(`MessageID: ${result.messageID}`);
        console.log(`Message Hash: ${result.messageHash}`);
        console.log(`Recipient: ${result.recipient}`);
        console.log(`Message: ${result.messageText}`);
        console.log(result.status);
      }

      messagesEntered++;
    } else if (choice === '2') {
      console.log("Coming Soon.");
    } else if (choice === '3') {
      console.log("Exiting...");
      rl.close();
      process.exit(0);
    } else {
      console.log("Invalid option, try again.");
    }
  }
}

async function main() {
  await register();
  const loggedIn = await login();
  if (loggedIn) {
    messagesToEnter = parseInt(await ask("How many messages would you like to enter? "), 10);
    await sendMessagesMenu();
  }
  rl.close();
}

main();