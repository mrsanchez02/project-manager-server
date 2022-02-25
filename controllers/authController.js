const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.userAuthentication = async (req,res) => {
    // Check for errors.
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    try {
        // Check if user is registered.
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: "User doesn't exist"});
        }

        const rightPass = await bcryptjs.compare(password, user.password);
        if(!rightPass){
            return res.status(400).json({msg:'Wrong password.'});
        }

        // Create and sign the JWT.
        const payload = {
            user:{
                id: user.id
            }
        };

        // Sign the JWT.
        jwt.sign(payload,process.env.SECRET, {
            expiresIn: 3600 // One hour
    }, (error,token)=> {
        if(error)throw error;
        // Confirmation mensage.
        res.json({ token:token })
    });
    
    } catch (error) {
        console.log(`Authentication error: ${error}`)
    }
}

// Get user authenticated
exports.userAuthenticated = async (req,res)=> {
    // Check for errors.
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Oops! Something happens!'})
    }

}