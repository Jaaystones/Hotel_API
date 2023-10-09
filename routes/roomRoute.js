import express from 'express';
import createRoom from '../controllers/roomController/createRoom.js';
import Protect from '../middleware/userAuth.js'
import deleteRoom from '../controllers/roomController/deleteRoom.js';
import getBookedRooms from '../controllers/roomController/getRooms.js';

const router = express.Router();

router.post('/:hotelId',Protect, createRoom);
router.delete('/:id/:hotelId',Protect, deleteRoom);
router.get('/:hotelId/booked',Protect, getBookedRooms);

export default router;
