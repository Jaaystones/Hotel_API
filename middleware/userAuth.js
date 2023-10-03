import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const Protect = asyncHandler( async(req, res, next) => {
    try {
        // retrive token from cookies
        const token = req.cookies.token;
        

        if(!token) {
            res.status(403);
            throw new Error('Not authorized, Please login');
        }
        //verify token
        const tokenVerification = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
        
        // extract id from token
        const user = await User.findById(tokenVerification.id).select("-password");
        //console.log("User:", user);

        if (!user) {
            res.status(401);
            throw new Error("User not found");
        }
        //provide user details to any one that uses this middleware.
        req.user = user;
       
        next();
    } catch (err) {
        res.status(401);
        throw new Error("Not authourized, Please login");
    }
    
    
    


});

export default Protect;