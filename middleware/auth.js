const jwt = require('jsonwebtoken');

module.exports = function(req,res,next) {
    // Read token from header.
    const token = req.header('x-auth-token');
    
    //Check if token exist.
    if(!token) {
        return res.status(401).json({msg:"There's no token, permission invalid."})
    }
    // Validate token.
    try {
        const encrypted = jwt.verify(token, process.env.SECRET);
        req.user = encrypted.user;
        next();
    } catch (error) {
        res.status(401).json({msg: "Invalid token"});
    }
}