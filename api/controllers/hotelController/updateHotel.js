import Hotel from "../../models/hotelModel.js";
import asyncHandler from "express-async-handler";

const updateHotel = asyncHandler( async(req, res) => {
    const { name, type, city, address, distance, title, desc, cheapestPrice } = req.body;
    const { id } = req.params;

    const hotel = await Hotel.findById(id);

    // If the product does not exist
    if(!hotel) {
        res.status(404);
        throw new Error("hotel not found");
    }

    // update the hotel by id
    const updatedhotel = await Hotel.findByIdAndUpdate(
        {_id: id},
        {
            name,
            type,
            city,
            address,
            distance,
            title,
            desc,
            cheapestPrice
        },
        { new: true });
        res.status(200)
        .json({"updated sucessfully": updatedhotel});

});

export default updateHotel;