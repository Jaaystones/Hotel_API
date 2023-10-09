//import Room from "../../models/roomModel.js";
import Hotel from "../../models/hotelModel.js";
import asyncHandler from "express-async-handler";

// Controller to get rooms booked in a particular hotel by a user
const getBookedRooms = asyncHandler(async (req, res) => {
  try {
    const hotelId = req.params.hotelId; 
    const userId = req.user._id; 

    // Find the hotel by ID
    const hotel = await Hotel.findById(hotelId).populate("rooms");

    if (!hotel) {
      res.status(404);
      throw new Error("Hotel not found");
    }

    // Filter the rooms that belong to the hotel and were created by the user
    const bookedRooms = hotel.rooms.filter(room => room.createdBy.equals(userId));

    if (bookedRooms.length === 0) {
      // No rooms found for this hotel and user
      return res.status(404).json({ message: "No booked rooms found in this hotel" });
    }

    res.status(200).json(bookedRooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default getBookedRooms;
