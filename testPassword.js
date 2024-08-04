const bcrypt = require('bcryptjs');

const testPassword = 'Balovemi';

// Hash the password
bcrypt.hash(testPassword, 10, (err, hash) => {
  if (err) throw err;
  console.log('Newly hashed password:', hash);

  // Compare the newly hashed password with the original hash
  bcrypt.compare(testPassword, hash, (err, result) => {
    if (err) throw err;
    console.log('Password match result with newly hashed password:', result);
  });
});
