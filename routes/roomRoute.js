import express from 'express';
import createRoom from '../controllers/roomController/createRoom.js';
import Protect from '../middleware/userAuth.js'
const router = express.Router();

router.post('/:hotelId',Protect, createRoom);

export default router;
