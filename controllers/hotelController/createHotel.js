import Hotel from "../../models/hotelModel.js";
import asyncHandler from "express-async-handler";


const createHotel = asyncHandler( async(req, res) => {

    const { name, type, city, address, distance, title, desc, cheapestPrice } = req.body;
    
    //error handling
    if(!name || !type || !city || !address || !distance || !title || !desc || !cheapestPrice){
        res.status(400);
        throw new Error("Please input all required fields");
    }

    // check if user already exists by mail address
    const existingHotel = await Hotel.findOne({ name });
    if (existingHotel) {
        res.status(400)
        throw new Error ("Hotel already exists");
    }

    //create new hotel
    const hotel = await Hotel.create({
        name, 
        type,
        city,
        address,
        distance,
        title,
        desc,
        cheapestPrice
    });

    if (hotel){
        const { _id, name, type, city, address, distance, title, desc, cheapestPrice } = hotel;
        res.status(201)
        .json({
            _id,
            name,
            type,
            city,
            address,
            distance,
            title,
            desc,
            cheapestPrice
        });
    } else {
        res.status(400);
        throw new Error("Invalid hotel");
    }
});

export default createHotel;