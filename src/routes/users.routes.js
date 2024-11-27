//* el .routes es para encontrar este archivo mas rapido, pero simplemente podría llamarse users.js
import { Router } from 'express';
import { getUsers, getUser, createUsers, updateUser, deleteUser } from '../controllers/users.controllers.js'
const router = Router();


router.get('/users',getUsers)
// router.get('/users', (req,res)=>{
//     res.send('Obteniendo usuarios')
// })

// router.get('/users/:id', (req,res)=>{
//     const {id} = req.params;
//     res.send('Obteniendo un usuario' + id)
// })
router.get('/users/:id', getUser)

// router.post('/users', (req,res)=>{
//     res.send('Creando usuarios')
// })
router.post('/users', createUsers);
// router.put('/users/:id', (req,res)=>{
//     const {id} = req.params;
//     res.send('Actualizando un usuario' + id)
// })
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser)

// router.delete('/users/:id', (req,res)=>{
//     const {id} = req.params;
//     res.send('Eliminando un usuario' + id)
// })



export default router;