import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Hotelschema = mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    distance:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    photos:{
        type: [String], // multiple values
    },
    desc:{
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        min:0,
        max:5
    },
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: 'Room', // Reference to the Room model
    }],
    cheapestPrice :{
        type: Number,
        required: true,
    },
    features:{
        type: Boolean,
        default: false,
    },
  
}, { timestamps: true }
);

const Hotel = mongoose.model('Hotel', Hotelschema);

export default Hotel