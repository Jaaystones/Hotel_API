import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";


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

});