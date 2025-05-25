const fs = require('fs');

class Message {
  constructor(id, recipient, text, num) {
    this.messages = [];
    this.numSent = 0;
    this.id = id;
    this.text = text;
    this.num = num;
  }

  checkMessageID(id) {
    return id.length <= 10;
  }

  checkRecipientCell(cell) {
    return /^\+\d{9,12}$/.test(cell); // Same as Login phone check
  }

  checkMessageLength(message) {
    return message.length <= 250;
  }

  generateMessageID() {
    // 10 digit random number as string
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  }

  createMessageHash(messageID, messageNum, message) {
    const firstWord = message.trim().split(' ')[0] || '';
    const lastWord = message.trim().split(' ').slice(-1)[0] || '';
    return `${messageID.slice(0, 2)}:${messageNum}:${(firstWord + lastWord).toUpperCase()}`;
  }

  sendMessageOption(option) {
    if (option === 1) return "Message successfully sent.";
    if (option === 2) return "Press 0 to delete message.";
    if (option === 3) return "Message successfully stored.";
    return "Invalid option.";
  }

  addMessage(recipient, messageText, option) {
    if (!this.checkRecipientCell(recipient)) {
      return "Cell phone number is incorrectly formatted or does not contain an international code. Please correct the number and try again.";
    }

    if (!this.checkMessageLength(messageText)) {
      const diff = messageText.length - 250;
      return `Message exceeds 250 characters by ${diff}, please reduce size.`;
    }

    const messageID = this.generateMessageID();
    if (!this.checkMessageID(messageID)) {
      return "Generated Message ID is invalid.";
    }

    this.numSent++;
    const messageHash = this.createMessageHash(messageID, this.numSent, messageText);

    const newMessage = {
      messageID,
      messageHash,
      recipient,
      messageText,
      numSent: this.numSent,
      status: this.sendMessageOption(option)
    };

    if (option === 1 || option === 3) {
      this.messages.push(newMessage);
      if (option === 3) {
        this.storeMessage(newMessage);
      }
    }

    return newMessage;
  }

  printMessages() {
    return this.messages.map(msg => 
      `MessageID: ${msg.messageID}\nMessage Hash: ${msg.messageHash}\nRecipient: ${msg.recipient}\nMessage: ${msg.messageText}`
    ).join('\n\n');
  }

  returnTotalMessages() {
    return this.numSent;
  }

  storeMessage(message) {
    // Save messages to messages.json file
    let messagesFromFile = [];
    try {
      const data = fs.readFileSync('messages.json', 'utf8');
      messagesFromFile = JSON.parse(data);
    } catch (err) {
      // file may not exist, proceed with empty array
    }
    messagesFromFile.push(message);
    fs.writeFileSync('messages.json', JSON.stringify(messagesFromFile, null, 2));
  }
}

module.exports = Message;