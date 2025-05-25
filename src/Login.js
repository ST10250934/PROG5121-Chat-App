class Login {
    constructor(firstName, lastName, username, password, cellphone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.cellphone = cellphone;
    }

    checkUserName() {
        if (!this.username || typeof this.username !== 'string') {
            return false;
          }
        return this.username.includes("_") && this.username.length <= 15;
    }

    checkPasswordComplexity() {
        const hasUpperCase = /[A-Z]/.test(this.password);
        const hasNumber = /\d/.test(this.password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
        const isLongEnough = this.password.length >= 8;
        return hasUpperCase && hasNumber && hasSpecialChar && isLongEnough;
    }

    checkCellPhoneNumber() {
        const pattern = /^\+27\d{9}$/; // +27 followed by exactly 9 digits
        return pattern.test(this.cellphone);
    }

    registerUser() {
        if (!this.checkUserName()) {
            return "Username is not correctly formatted, please ensure that your username contains an underscore and is no more than 15 characters in length.";
        }
        if (!this.checkPasswordComplexity()) {
            return "Password is not correctly formatted, please ensure that the password contains at least eight characters, a capital letter, a number, and a special character.";
        }
        if (!this.checkCellPhoneNumber()) {
            return "Cell number is incorrectly formatted or does not contain an international code, please correct the number and try again.";
        }
        return "User has been successfully registered.";
    }

    loginUser(inputUsername, inputPassword) {
        return inputUsername === this.username && inputPassword === this.password;
    }

    returnLoginStatus(inputUsername, inputPassword) {
        if (this.loginUser(inputUsername, inputPassword)) {
            return `Welcome ${this.firstName}, ${this.lastName} it is great to see you again.`;
        } else {
            return "Username or password incorrect, please try again.";
        }
    }
}

module.exports = Login;