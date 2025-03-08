//* el .routes es para encontrar este archivo mas rapido, pero simplemente podría llamarse users.js
import { Router } from 'express'
import { getUsers, getUser, createUsers, updateUser, deleteUser, getUserByRol, login, logOut } from '../controllers/users.controllers.js'
import { validationToken } from '../middlewares/validationToken.js';
const router = Router()

//GET
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.get('/users/rol/:id', getUserByRol);
router.get('/validateSession', validationToken); //Valida si la session esta activa desde el front

//POST
router.post('/users', createUsers);
router.post('/logout', logOut);
//router.post('/register', login)

//PUT
router.put('/users/:id', updateUser);

//DELETE
router.delete('/users/:id', deleteUser);

export default router