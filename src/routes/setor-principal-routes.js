const express = require('express');
const router = express.Router();
const setorPrincipalController = require('../controllers/setor-principal-controller');

router.get('/', setorPrincipalController.setorPrincipalGetAll);

router.get('/:id', setorPrincipalController.setorPrincipalGetById); 

// router.post('/', instituicaoController.instituicaoCreate);

// router.patch('/:id', instituicaoController.instituicaoUpdate);

// router.delete('/:id', instituicaoController.instituicaoDelete);

module.exports = router;