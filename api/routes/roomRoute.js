import express from 'express';
import createRoom from '../controllers/roomController/createRoom.js';
import Protect from '../middleware/userAuth.js'
import deleteRoom from '../controllers/roomController/deleteRoom.js';
import getBookedRooms from '../controllers/roomController/getRooms.js';
import updateRoom from '../controllers/roomController/updateRoom.js';

const router = express.Router();

router.post('/:hotelId',Protect, createRoom);
router.delete('/:id/:hotelId',Protect, deleteRoom);
router.get('/:hotelId/booked',Protect, getBookedRooms);
router.put('/:roomId/update',Protect, updateRoom);

export default router;
