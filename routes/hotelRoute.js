import express from 'express';
import createHotel from '../controllers/hotelController/createHotel.js';
import updateHotel from '../controllers/hotelController/updateHotel.js';
import deleteHotel from '../controllers/hotelController/deleteHotel.js';
import { getHotel, getHotels } from '../controllers/hotelController/getHotels.js';

const router = express.Router();

router.get('/:id', getHotel);
router.get('/', getHotels);
router.post('/createhotel', createHotel);
router.patch('/update/:id', updateHotel);
router.delete('/delete/:id', deleteHotel);

export default router;