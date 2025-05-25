const assert = require('assert');
const Message = require('./src/Message');
const Login = require('./src/Login');

const messageObj = new Message();
const loginObj = new Login();

// Test message length success
assert.strictEqual(messageObj.checkMessageLength("Hello!"), true, "Message should be valid");

// Test message length failure (over 250 chars)
const longMessage = 'a'.repeat(251);
assert.strictEqual(messageObj.checkMessageLength(longMessage), false, "Message should be invalid");

// Test recipient number correctly formatted (reuse login check)
assert.strictEqual(loginObj.checkCellPhoneNumber("+27838968976"), true, "Recipient number correct");
assert.strictEqual(loginObj.checkCellPhoneNumber("0789654321"), false, "Recipient number incorrect");

// Test message ID length
assert.strictEqual(messageObj.checkMessageID("1234567890"), true, "Message ID valid length");
assert.strictEqual(messageObj.checkMessageID("12345678901"), false, "Message ID too long");

// Test createMessageHash
const msgID = "1234567890";
const msgNumber = 1;
const messageText = "Hi Mike, can you join us for dinner tonight";
const expectedHash = "12:1:HI TONIGHT";
assert.strictEqual(messageObj.createMessageHash(msgID, msgNumber, messageText), expectedHash, "Message hash generated correctly");

// Test sendMessage options
assert.strictEqual(messageObj.sendMessage("Send Message"), "Message successfully sent.");
assert.strictEqual(messageObj.sendMessage("Disregard Message"), "Press 0 to delete message.");
assert.strictEqual(messageObj.sendMessage("Store Message"), "Message successfully stored.");

// Test total messages sent
messageObj.totalMessagesSent = 5;
assert.strictEqual(messageObj.returnTotalMessages(), 5, "Total messages returned correctly");