import Room from "../../models/rooms.js";
import asyncHandler from "express-async-handler";
import Hotel from "../../models/hotelModel.js";

const deleteRoom = asyncHandler(async (req, res) => {
  try {
    const hotelId = req.params.hotelId;


    // Get the user's ID from the request or authentication (assuming you have user authentication)

    // Find the room by ID and the associated hotel

    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Check if the user attempting to delete the room is the owner
if (room.createdBy && room.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Permission denied" });
  }

    // If the user is the owner, delete the room
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);

    if (!deletedRoom) {
      return res.status(404).json({ message: "Room Deletion Unsuccessful" });
    }

    // Update the hotel document
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      { $pull: { rooms: req.params.id } },
      { new: true }
    ).populate("rooms");

    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({
      message: "Room has been deleted successfully",
      updatedHotel: updatedHotel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default deleteRoom;
