const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const login = require('../middleware/login');
const roles = require('../middleware/roles');

router.get('/', login.verifyToken, roles.adminRole, userController.userGetAll);

router.get('/identify', userController.userIdentify);

router.get('/tecnico', login.verifyToken, roles.adminRole, userController.userGetAllTec);

router.get('/:id', login.verifyToken, roles.adminRole, userController.userGetById);

router.post('/create', login.verifyToken, roles.adminRole, userController.userCreate);

router.post('/login', userController.userLogin);

router.patch('/password/:id', login.verifyToken, roles.solicitanteRole, userController.userUpdatePassword);

router.patch('/:id', login.verifyToken, roles.adminRole, userController.userUpdate);

router.patch('/deletar/:id', login.verifyToken, roles.adminRole, userController.userDelete);

module.exports = router;