const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req,res) => {

    // Check for errors.
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    // Destructuring email and password from request.
    const { email, password } = req.body;

    try {
        // Check if user is unique.
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({msg: 'User already exist.'})
        }
        
        // Create new user.
        user = new User(req.body);

        // Hashing password.
        const salt = await bcryptjs.genSalt(10);

        user.password = await bcryptjs.hash(password,salt);
        // Save user.
        await user.save();

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
        console.log(error);
        res.status(400).send("Oops Something happens! :'( ");
    }
}