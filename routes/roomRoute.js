import express from 'express';
import createRoom from '../controllers/roomController/createRoom.js';
import Protect from '../middleware/userAuth.js'
import deleteRoom from '../controllers/roomController/deleteRoom.js';

const router = express.Router();

router.post('/:hotelId',Protect, createRoom);
router.delete('/:id/:hotelId',Protect, deleteRoom);

export default router;
