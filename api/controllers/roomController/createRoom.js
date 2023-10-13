import Hotel from "../../models/hotelModel.js";
import Room from "../../models/rooms.js";
import asyncHandler from "express-async-handler";

const createRoom = asyncHandler(async (req, res) => {
  try {
    const hotelId = req.params.hotelId;
    const userId = req.user._id; // Assuming you can access the user's ID from authentication middleware

    const { title, price, maxPeople, desc, roomNumbers } = req.body;

    // Handle errors
    if (!title || !price || !maxPeople || !desc || !roomNumbers) {
      res.status(400);
      throw new Error("Please input all required fields");
    }

    // Check if a room with the same title already exists in the hotel
    const existingRoom = await Room.findOne({ hotel: hotelId, title });

    if (existingRoom) {
      res.status(400);
      throw new Error("A room with the same title already exists in this hotel.");
    }

    // Create a new room with user information
    const newRoom = new Room({
      ...req.body,
      createdBy: userId, // Associate the room with the logged-in user
      hotel: hotelId, // Set the hotel ID
    });

    // Save room information
    const savedRoom = await newRoom.save();

    if (!savedRoom) {
      res.status(400);
      throw new Error("Room creation failed, please input all fields");
    }

    // Update the hotel with the newly created room
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      { $push: { rooms: savedRoom._id } },
      { new: true }
    ).populate("rooms");

    if (!updatedHotel) {
      res.status(404);
      throw new Error("Hotel not found");
    }

    res.status(201).json(savedRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default createRoom;
