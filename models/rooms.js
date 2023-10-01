import mongoose from "mongoose";


const roomSchema = await mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    roomNumbers: {
        type: [{number: Number, unavailableDate: {type: [Date]}}],
        required: true
    }
} 
{timestamps: true});

const Room = mongoose.model("Room", roomSchema);

export default Room;