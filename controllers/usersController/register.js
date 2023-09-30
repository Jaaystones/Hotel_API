import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import genToken from "../../config/tokenGen.js"; 


//Register user
const registerUser = asyncHandler( async (req, res) => {
    //request body
    const { name, email, password } = req.body;

    //error handling
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please input all required fields");
    }
    if (password.length < 6){
        res.status(400);
        throw new Error("Password must be at least 6 characters");
    }
    //check if user already exists
    const existingUser = await User.findOne( { email} );
    if (existingUser){
        res.status(400);
        throw new Error("User already exists");
    }

    //create new user
    const user = await User.create({
        name,
        email,
        password
    });
    //generate token
    const token = genToken(user._id);

    //send Http only request
    res.cookie('token', token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 24 * 60 * 60 ), // expires 1day after
        sameSite: "none",
        secure: true
    });

    if(user){
        const { name, email, dateOfBirth, address } = user;
        res.status(201).json({
            name,
            email,
            dateOfBirth,
            address,
            token
        });
    }else{
        res.status(400).json({
            message: 'Invalid User'
        });
    }

});

export default registerUser;