const db = require('../config/connection');
const collection = require('../config/collection');
const bcrypt = require('bcrypt');

module.exports = {
    doSignup: (userData, callback) => {
        // Hash the user's password using bcrypt
        bcrypt.hash(userData.password, 10, (hashError, hashedPassword) => {
            if (hashError) {
                // If hashing fails, invoke the callback with the error
                return callback(hashError, null);
            }

            // Update userData with the hashed password
            userData.password = hashedPassword;

            // Insert the user data into the MongoDB collection
            db.get().collection(collection.USER_COLLECTIONS).insertOne(userData, (insertError, result) => {
                if (insertError) {
                    // If insertion fails, invoke the callback with the error
                    return callback(insertError, null);
                }

                // Invoke the callback with the inserted document's ID
                callback(null, result.insertedId);
            });
        });
    },
};
