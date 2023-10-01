import Hotel from "../../models/hotelModel.js";
import asyncHandler from "express-async-handler";

// Delete hotel from the database
const deleteHotel = asyncHandler(async (req, res) => {
    try {
        // Attempt to delete the hotel document by its ID
        const result = await Hotel.deleteOne({ _id: req.params.id });

        // Check if the delete operation was successful
        if (result.deletedCount === 0){
            res.status(404);
            throw new Error("No hotel found");
        }

        // Document was successfully deleted
        res.status(200).json({ message: "Hotel deleted successfully" });
    } catch (error) {
        res.status(500);
        throw new Error("Error deleting hotel: " + error.message);
    }
});

export default deleteHotel;
