import Hotel from "../../models/hotelModel.js";
import asyncHandler from "express-async-handler";

//Delete hotel from database
const deleteHotel = asyncHandler( async (req, res)=> {
    //get hotel by id.
    const hotel = await Hotel.findById(req.params.id);

     //if hotel doesn't exist
     if(!hotel) {
        res.status(404);
        throw new Error("No hotel found");
     }
     await hotel.remove();
     res.status(200)
     .json({ message: "hotel deleted successfully"});

});

export default deleteHotel;