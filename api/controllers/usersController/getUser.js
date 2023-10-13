import User from '../../models/userModel.js';
import asnycHandler from "express-async-handler";


//get user

const getUser = asnycHandler ( async(req, res) => {

    const user = await User.findById(req.user._id);

    if (user) {

        const { _id, name, email, dateOfBirth, address } = user;
        
        res.status(200)
        .json({
            _id,
            name,
            email,
            dateOfBirth,
            address
        });
    } else {   
        res.status(404);
        throw new Error(`User not found `);
    }
});

export { getUser};