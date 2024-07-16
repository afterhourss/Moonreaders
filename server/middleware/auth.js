const jwt = require('jsonwebtoken')
require('dotenv').config()

const middle = async(req, res, next) => {
    try {

        const jwtToken = req.header("token")
        if(!jwtToken){
            return res.status(401).json('token not auth')
        }

        //verifikasi apakah jwt token adalah asli dan tidak manual di inspect browser, mereturn payload
        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET)
        req.username = payload.username; //akses payload.user di jwt generator
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json('youre not authorized')
    }


}

module.exports = middle;