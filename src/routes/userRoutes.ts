import express from 'express'
import { addUser, authenticate, deleteUser, getAllUsers, getUser, updateUser } from '../handlers/usersHandler';
import authorization from '../utilities/authenticate_validation';


const userRoute =express.Router();

userRoute.get('/user',getAllUsers);
userRoute.get('/user/:id',getUser);
userRoute.post('/user',addUser);
userRoute.put('/user/:id',authorization,updateUser);
userRoute.delete('/user/:id',authorization,deleteUser);
userRoute.post('/user/authenticate',authenticate);
export default userRoute;