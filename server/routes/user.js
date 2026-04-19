import express from 'express';
import {myProfile, userLogin, verifyUser} from '../controller/user.js';
import { isAuth } from '../middlewares/isAuth.js';


const router = express.Router()

router.post('/user/login', userLogin);
router.post('/user/verify', verifyUser);
router.get('/user/me', isAuth, myProfile);


export default router;