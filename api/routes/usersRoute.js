import express from 'express';
import registerUser from '../controllers/usersController/register.js';
import { loginUser, logoutUser } from '../controllers/usersController/loginLogout.js';
import { getUser } from '../controllers/usersController/getUser.js';
import Protect from '../middleware/userAuth.js';
import updateUser from '../controllers/usersController/updateUser.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/getuser', Protect, getUser);
router.patch('/update', Protect, updateUser);



export default router;