import express from 'express';
import { loginUser, logoutUser, registerUser, verifyUser, getUserWithToken } from '../controllers/userController.js';
// import { protect } from '../middleware/auth.js';

const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.post('/logout', logoutUser);
userRoute.post("/verify", verifyUser);
userRoute.get("/me", getUserWithToken);
// router.get('/profile', protect, getProfile);
// router.put('/profile', protect, updateProfile);

export default userRoute;
