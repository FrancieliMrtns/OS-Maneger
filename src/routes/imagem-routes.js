const express = require('express');
const router = express.Router();
const multer = require('multer');
const imagemController = require('../controllers/imagem-controller');
const upload = multer();

router.get('/all', imagemController.findAll);

router.get('/get/:img_key', imagemController.getImagem);

router.get('/find/:id', imagemController.findById);

router.get('/find/os/:os_id', imagemController.findByOsId);

router.post('/upload', upload.array('file', 5), imagemController.uploadImagem);

module.exports = router;