const express = require('express');
const router = express.Router();
const setorSecundarioController = require('../controllers/setor-secundario-controller');

router.get('/', setorSecundarioController.setorSecundarioGetAll);

router.get('/instituicao', setorSecundarioController.setorSecundarioGetBySetorPrincipal);

// router.post('/', setorController.setorCreate);

// router.patch('/:id', setorController.setorUpdate);

// router.delete('/:id', setorController.setorDelete);

module.exports = router;
