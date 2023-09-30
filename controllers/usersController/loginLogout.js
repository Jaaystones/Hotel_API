import User from '../../models/userModel.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import genToken from '../../config/tokenGen.js';

const loginUser = asyncHandler( async(req, res) => {
    //request body
    const { email, password } = req.body;
    // validate fields
    if(!email || !password) {
        res.status(400);
        throw new Error("Invalid email or password");
    }
    //find existing user
    const user = await User.findOne({ email });

    if(!user) {
        res.status(404);
        throw new Error("User not found, please register");
    }

    //check if password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // generate token
    const token = genToken(user._id);

    if (isPasswordValid) {
        //send cookie to server
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 24 * 60 * 60),
            sameSite:"none",
            secure:true,
        });
    }
    //check if user and password are valid
    if (user && isPasswordValid){
        const { _id, name, email, dateOfBirth, address } = user;
        res.status(200)
        .json({
            _id,
            name,
            email,
            dateOfBirth,
            address,
        });
    } else {
        res.status(400);
        throw new Error('Invalid username or password');
    }

});

const logoutUser = asyncHandler( async (req, res) => {
    // expire the session
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite:"none",
        secure:true
    });
    return res.status(200).json({ message: "Sucessfully logged out"});
});


export { loginUser, logoutUser };