import asyncHandler from "express-async-handler";
import Room from "../../models/rooms.js";

const updateRoom = asyncHandler(async (req, res) => {
  const { title, price, maxPeople, desc, roomNumbers } = req.body;
  const roomId = req.params.roomId;
  const userId = req.user._id; 

  // Find the room by ID and check if it exists
  const room = await Room.findById(roomId);

  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }

  // Check if the user is authorized to update the room (assuming createdBy is the user who created the room)
  if (room.createdBy.toString() !== userId.toString()) {
    return res.status(403).json({ message: "You are not authorized to update this room" });
  }

  // Update the room data
  room.title = title;
  room.price = price;
  room.maxPeople = maxPeople;
  room.desc = desc;
  room.roomNumbers = roomNumbers;

  // Save the updated room to the database
  const updatedRoom = await room.save();

  res.status(200).json({ message: "Room Updated Successfully", updatedRoom });
});

export default updateRoom;
