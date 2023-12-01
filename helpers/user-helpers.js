const db = require('../config/connection');
const collection = require('../config/collection');
const bcrypt = require('bcrypt');

module.exports = {
    doSignup: (userdata) => {
        return new Promise(async(resolve, reject) => {
            let user = await db.get.collection(collection.USER_COLLECTIONS).findOne({ email: userdata.email })
            if (user) {
                let response = {}
                response.signupstatus = false
                resolve(response)
            } else {
                console.log(userdata);
                userdata.password = await bcrypt.hash(userdata.password, 10)
                db.get.collection(collection.USER_COLLECTIONS).insertOne(userdata).then((response) => {
                    response.signupstatus = true
                    response.user = userdata
                    resolve(response)
                })
            }
        })
    },
};
