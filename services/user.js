const jwt = require("jsonwebtoken")
const secret = process.env.SECRET;
// console.log(process.env.SECRET)

function createTokenForUser(user){
    const payload = {
        _id: user._id,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
        username: user.username
    }
    const token = jwt.sign(payload, secret)
    return token;
}

function validateToken(token){
    const payload = jwt.verify(token, secret)
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken,
}