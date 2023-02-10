"use strict";
const jwt = require("jsonwebtoken");
const genAuthToken = (user) => {
    console.log(user, "genauth");
    const secretKey = `${process.env.JWT_SECRET_KEY}`;
    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, secretKey);
    return token;
};
module.exports = genAuthToken;
//# sourceMappingURL=genAuthToken.js.map