import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userschema = mongoose.Schema({

    name:{
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please insert a mail"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email",
        ],
    },
    password:{
        type: String,
        required:[true, "Please enter a valid password"],
        minLength:[6, "Password must not be less than 6 characters"]
    },    
    dateOfBirth:{
        type: String,
        required: true,
        default: "19xx"
    },
    address:{
        type: String,
        required: true,
        default: "Nigeria"
    },

},
{ timestamps: true },

);


// encrypt password every time you access it before saving it to dB
userschema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
});


export default mongoose.model('User', userschema);