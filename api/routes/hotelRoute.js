import express from 'express';
import createHotel from '../controllers/hotelController/createHotel.js';
import updateHotel from '../controllers/hotelController/updateHotel.js';
import deleteHotel from '../controllers/hotelController/deleteHotel.js';
import { getHotel, getHotels } from '../controllers/hotelController/getHotels.js';
import Protect from '../middleware/userAuth.js';

const router = express.Router();

router.get('/:id', Protect, getHotel);
router.get('/', Protect, getHotels);
router.post('/createhotel', createHotel);
router.patch('/update/:id', Protect, updateHotel);
router.delete('/delete/:id', Protect, deleteHotel);

export default router;