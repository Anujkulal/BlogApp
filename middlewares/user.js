const { validateToken } = require("../services/user")

function checkForAuthenticationCookie(cookieName){
    return (req, res, next)=> {
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue) return next();

        try{
            const payload = validateToken(tokenCookieValue)
            req.user = payload;
            // console.log(req.user)
        }catch(error){}
        return next();
    }
}

module.exports = {checkForAuthenticationCookie}