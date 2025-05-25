const assert = require('assert');
const Login = require('./src/Login');

const login = new Login();

// Test Username correctly formatted (contains underscore and <= 5 chars)
assert.strictEqual(login.checkUserName('kyl_1'), true, 'Username should be correctly formatted');
assert.strictEqual(login.registerUser('kyl_1', 'Ch&&sec@ke99!', '+27838968976'), 'User registered successfully.');

// Test Username incorrectly formatted (no underscore or too long)
assert.strictEqual(login.checkUserName('kyle!!!!!!!'), false, 'Username should be incorrectly formatted');
assert.strictEqual(login.registerUser('kyle!!!!!!!', 'Ch&&sec@ke99!', '+27838968976'),
    'Username is not correctly formatted, please ensure that your username contains an underscore and is no more than five characters in length.');

// Test Password meets complexity
assert.strictEqual(login.checkPasswordComplexity('Ch&&sec@ke99!'), true, 'Password meets complexity');
assert.strictEqual(login.registerUser('kyl_1', 'Ch&&sec@ke99!', '+27838968976'), 'User registered successfully.');

// Test Password fails complexity
assert.strictEqual(login.checkPasswordComplexity('password'), false, 'Password does not meet complexity');
assert.strictEqual(login.registerUser('kyl_1', 'password', '+27838968976'),
    'Password is not correctly formatted; please ensure that the password contains at least eight characters, a capital letter, a number, and a special character.');

// Test Cell phone correctly formatted
assert.strictEqual(login.checkCellPhoneNumber('+27838968976'), true, 'Cell phone correctly formatted');
assert.strictEqual(login.registerUser('kyl_1', 'Ch&&sec@ke99!', '+27838968976'), 'User registered successfully.');

// Test Cell phone incorrectly formatted
assert.strictEqual(login.checkCellPhoneNumber('08966553'), false, 'Cell phone incorrectly formatted');
assert.strictEqual(login.registerUser('kyl_1', 'Ch&&sec@ke99!', '08966553'),
    'Cell phone number is incorrectly formatted or does not contain an international code. Please correct the number and try again.');

// Test login success and fail
login.registerUser('kyl_1', 'Ch&&sec@ke99!', '+27838968976');
assert.strictEqual(login.loginUser('kyl_1', 'Ch&&sec@ke99!'), true, 'Login should succeed');
assert.strictEqual(login.loginUser('kyl_1', 'wrongpassword'), false, 'Login should fail');
assert.strictEqual(login.returnLoginStatus(), 'Welcome kyl_1, it is great to see you again.', 'Successful login message');