import express from 'express';
import createHotel from '../controllers/hotelController/createHotel.js';
import updateHotel from '../controllers/hotelController/updateHotel.js';

const router = express.Router();

router.post('/createhotel', createHotel);
router.patch('/update/:id', updateHotel);

export default router;