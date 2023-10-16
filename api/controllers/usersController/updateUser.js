import User from "../../models/userModel.js";
import asyncHandler from "express-async-handler";


const updateUser = asyncHandler( async(req, res) => {
    //find user by user_id
    const user = await User.findById(req.user._id);
    
    //handle error
    if (user) {
        const { name, email, dateOfBirth, address } = user;

        user.email = email;
        user.name = req.body.name || name;
        user.dateOfBirth = req.body.dateOfBirth || dateOfBirth;
        user.address = req.body.address || address;

        //save new user
        const updatedUser = await user.save();
        
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            dateOfBirth: updatedUser.dateOfBirth,
            address: updatedUser.address,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

export default updateUser;
