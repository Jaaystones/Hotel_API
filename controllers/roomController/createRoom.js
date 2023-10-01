import Room from "../../models/rooms.js";
import asyncHandler from "express-async-handler";
import Hotel from "../../models/hotelModel.js";

const createRoom = asyncHandler(async(req, res)=>{
    //to get hotel ID
    const hotelId = req.params.hotelId;

    const { title, price, maxPeople, desc, roomNumbers } = req.body;
    //handle errors
    if(!title || !price || !maxPeople || !desc || !roomNumbers){
        res.status(404);
        throw new Error("Please input all required fields")
    }
      
    const newRoom = new Room(req.body);
    if (!newRoom) {
        res.status(400);
        throw new Error("room creation failed, please input all fields");
    
    }
    const savedRoom = await newRoom.save();
    if (savedRoom) {
        await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: savedRoom._id},});
    }else {
        res.status(404);
        throw new Error("room not found");
    }
    res.status(201)
    .json(savedRoom);
});

export default createRoom;