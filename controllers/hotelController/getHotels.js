import Hotel from "../../models/hotelModel.js";
import asyncHandler from "express-async-handler";


//get hotel information
const getHotel = asyncHandler( async (req, res)=> {
    const id = req.params.id;
    
    if (!id){
        res.status(404);
        throw new Error("Hotel Id not found");
    }
    //find hotel by id
    const hotel = await Hotel.findById(id);

    if (!hotel) {
        res.status(404);
        throw new Error('No hotel found');    
    }
    res.status(200)
    .json({
        sucess: true,
        data: hotel,
    });
    
});

//get all hotels
const getHotels = asyncHandler( async (req, res) => {
    const hotel = await Hotel.find();

    if (!hotel) {
        res.status(404);
        throw new Error('No hotel found');
    }
    res.status(200)
    .json({
        sucess: true,
        data: hotel,
    });
});

export { getHotel, getHotels };