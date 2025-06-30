import express from 'express';
import { loginUser, logoutUser, registerUser, verifyUser, getUserWithToken, getAllUsers } from '../controllers/userController.js';
import authLimiter from '../middlewares/authLimiter.js';
// import { protect } from '../middleware/auth.js';

const userRoute = express.Router();

userRoute.post('/register', authLimiter, registerUser);
userRoute.post('/login', authLimiter, loginUser);
userRoute.post('/logout', logoutUser);
userRoute.post("/verify", verifyUser);
userRoute.get("/me", getUserWithToken);
userRoute.get("/getall", getAllUsers);
// router.get('/profile', protect, getProfile);
// router.put('/profile', protect, updateProfile);

export default userRoute;
