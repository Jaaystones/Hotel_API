import express from 'express';
import createHotel from '../controllers/hotelController/createHotel.js';

const router = express.Router();

router.post('/createhotel', createHotel);

export default router;