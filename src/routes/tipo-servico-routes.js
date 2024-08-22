const express = require('express');
const router = express.Router();
const tipoServicoController = require('../controllers/tipo-servico-controller');

router.get('/', tipoServicoController.tipoServicoGetAll);

router.get('/:id', tipoServicoController.tipoServicoGetById);

// router.post('/', categoriaController.categoriaCreate);

// router.patch('/:id', categoriaController.categoriaUpdate);

// router.delete('/:id', categoriaController.categoriaDelete);

module.exports = router;