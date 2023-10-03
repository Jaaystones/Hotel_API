import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
    desc: {
        type: String,
        required: true
    },
    roomNumbers: {
        type: [{number: Number, unavailableDate: {type: [Date]}}],
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
} ,
{timestamps: true});

// Define a compound unique index on 'title' and 'roomNumbers'
roomSchema.index({ title: 1, "roomNumbers.number": 1 }, { unique: true });

const Room = mongoose.model("Room", roomSchema);

export default Room;