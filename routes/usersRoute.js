import express from 'express';
import registerUser from '../controllers/usersController/register.js';
import { loginUser, logoutUser } from '../controllers/usersController/loginLogout.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);


export default router;