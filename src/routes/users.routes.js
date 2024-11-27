//* el .routes es para encontrar este archivo mas rapido, pero simplemente podría llamarse users.js
import { Router } from 'express';
import { getUsers, getUser, createUsers, updateUser, deleteUser, getUserByRol } from '../controllers/users.controllers.js'
const router = Router();

router.get('/users',getUsers)
router.get('/users/:id', getUser)
router.post('/users', createUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get("/users/rol/:id", getUserByRol)
export default router;

// router.get('/users', (req,res)=>{
//     res.send('Obteniendo usuarios')
// })

// router.get('/users/:id', (req,res)=>{
//     const {id} = req.params;
//     res.send('Obteniendo un usuario' + id)
// })
// router.post('/users', (req,res)=>{
//     res.send('Creando usuarios')
// })
// router.put('/users/:id', (req,res)=>{
//     const {id} = req.params;
//     res.send('Actualizando un usuario' + id)
// })

// router.delete('/users/:id', (req,res)=>{
//     const {id} = req.params;
//     res.send('Eliminando un usuario' + id)
// })


